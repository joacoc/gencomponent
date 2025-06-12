import { areParamsEqual } from '@/lib/utils'
import { useGenerativeContext } from '@/provider'
import { useEffect, useRef, useState } from 'react'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { Data, Params } from '../types'

interface Props extends Params {
  id?: string
  endpoint?: string
}

export default function useGenerativeComponent(props: Props) {
  const { prompt, base, variants, steps } = props
  const context = useGenerativeContext()
  const endpoint = props.endpoint || context?.endpoint

  const [{ loading, data, error }, setState] = useState<{
    loading: boolean
    data: Data | null
    error: { message: string; status?: number } | null
  }>({ loading: true, data: null, error: null })

  const hasRunRef = useRef<Props | null>(null)

  useEffect(() => {
    if (!prompt) {
      return
    }

    if (hasRunRef.current && areParamsEqual(hasRunRef.current, props)) {
      return
    }

    hasRunRef.current = props
    setState({ loading: true, data: null, error: null })

    const asyncOp = async () => {
      const baseSchemaString = base?.schema
        ? JSON.stringify(zodToJsonSchema(base?.schema, 'schema'))
        : undefined

      try {
        const response = await fetch(endpoint || '/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            base: baseSchemaString ? { schema: baseSchemaString } : undefined,
            variants,
            steps,
          }),
        })
        if (response.ok) {
          const data = await response.json()
          if (data.status === 'completed') {
            clearInterval(intervalId)
            setState({ loading: false, data, error: null })
          } else if (data.status === 'error') {
            clearInterval(intervalId)
            setState({
              loading: false,
              data,
              error: { message: 'Error processing prompt.' },
            })
          } else if (data.status === 'pending' || data.status === 'building') {
            setState({ loading: true, data, error: null })
          } else {
            setState({
              loading: false,
              data,
              error: { message: 'Unknown state. ' },
            })
            clearInterval(intervalId)
          }
        } else {
          clearInterval(intervalId)

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

          setState({ loading: false, data: null, error: errorData })
        }
      } catch (err) {
        console.error('Error processing request: ', err)
        clearInterval(intervalId)
        setState({
          loading: false,
          data: null,
          error: {
            message: 'Error processing request.',
          },
        })
      }
    }

    // Then continue running every 3 seconds
    const intervalId = setInterval(asyncOp, 3000)

    // Run once immediately
    asyncOp()

    return () => {
      clearInterval(intervalId)
    }
  }, [hasRunRef.current, props])

  return {
    loading,
    data,
    error,
  }
}
