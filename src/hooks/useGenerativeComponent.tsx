import { areParamsEqual } from '@/lib/utils'
import { useGenerativeContext } from '@/provider'
import { useEffect, useRef, useState } from 'react'
import { ZodTypeAny } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { Data, Params } from '../types'

interface Props extends Omit<Params, 'base' | 'extends'> {
  id?: string
  endpoint?: string
  schema?: ZodTypeAny
  extendSchema?: ZodTypeAny
}

interface State {
  loading: boolean
  data: Data | null
  error: { message: string; status?: number } | null
}

const SHAPER_ENDPOINT = 'https://api.shaper.build/generate'

const createOrGetId = async ({
  endpoint,
  body,
  skipLocalEndpoint,
}: {
  endpoint?: string
  body: string
  skipLocalEndpoint?: boolean
}): Promise<State> => {
  try {
    const response = await fetch(
      skipLocalEndpoint ? SHAPER_ENDPOINT : endpoint || '/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      },
    )
    if (response.ok) {
      const data = await response.json()
      if (data.status === 'ready') {
        return { loading: false, data, error: null }
      } else if (data.status === 'error') {
        return {
          loading: false,
          data,
          error: { message: 'Error processing prompt.' },
        }
      } else if (data.status === 'pending' || data.status === 'building') {
        return { loading: true, data, error: null }
      } else {
        return {
          loading: false,
          data,
          error: { message: 'Unknown state. ' },
        }
      }
    } else {
      const contentType = response.headers.get('content-type')
      let errorData

      /**
       * We need to differentiate between JSON and non-JSON responses.
       * Errors from the server are returned as JSON.
       * Those comming from network errs are as text
       */
      if (contentType && contentType.includes('application/json')) {
        try {
          errorData = await response.json()
        } catch (parseError) {
          errorData = { message: await response.text() }
        }
      } else {
        // Not JSON, read as text
        const errorText = await response.text()
        errorData = {
          message:
            errorText || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return { loading: false, data: null, error: errorData }
    }
  } catch (err) {
    console.error('Error processing request: ', err)
    return {
      loading: false,
      data: null,
      error: {
        message: 'Error processing request.',
      },
    }
  }
}

export default function useGenerativeComponent(props: Props) {
  const context = useGenerativeContext()
  const endpoint = props.endpoint || context?.endpoint

  const [state, setState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  })

  const hasRunRef = useRef<Props | null>(null)

  useEffect(() => {
    const { prompt, variants, steps, schema, extendSchema } = props

    if (!prompt) {
      setState({
        loading: false,
        data: null,
        error: { message: 'Prompt is missing' },
      })
    }

    if (hasRunRef.current && areParamsEqual(hasRunRef.current, props)) {
      return
    }

    // Prepare request
    const baseSchemaString = schema
      ? JSON.stringify(zodToJsonSchema(schema, 'schema'))
      : undefined
    const extendSchemaString = extendSchema
      ? JSON.stringify(zodToJsonSchema(extendSchema, 'schema'))
      : undefined
    const body = JSON.stringify({
      prompt,
      base: baseSchemaString ? { schema: baseSchemaString } : undefined,
      extend: extendSchemaString ? { schema: extendSchemaString } : undefined,
      variants,
      steps,
    })

    hasRunRef.current = props
    setState({ loading: true, data: null, error: null })
    let intervalId: NodeJS.Timeout

    const asyncOp = async () => {
      let state = await createOrGetId({ endpoint, body })
      setState(state)

      if (
        state.data?.status === 'pending' ||
        state.data?.status === 'processing'
      ) {
        intervalId = setInterval(async () => {
          try {
            const status = state.data?.status
            state = await createOrGetId({
              body,
              skipLocalEndpoint: status === 'pending' ? false : true,
            })
            setState(state)

            // Once it is no loading anymore it means:
            // 1. Ready
            // 2. Error'd
            // 3. Unknown state
            if (!state.loading) {
              clearInterval(intervalId)
            }
          } catch (err) {
            console.error('Error during request.')
          }
        }, 3000)
      }
    }

    asyncOp()

    // Then continue running every 3 seconds
    // const intervalId = setInterval(asyncOp, 3000)

    // Run once immediately
    // asyncOp()

    return () => {
      if (hasRunRef.current && areParamsEqual(hasRunRef.current, props)) {
        return
      }
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [hasRunRef.current, props])

  return state
}
