'use client'
import { useGenerativeContext } from '@/provider'
import { useEffect, useRef, useState } from 'react'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { isErrorResponse, Params, type ServerAction } from '../types'

interface Props extends Params {
  id?: string
  endpoint?: string
  serverAction?: ServerAction
}

export default function useGenerativeComponent(props: Props) {
  const { prompt, base, variants, steps, id } = props
  const context = useGenerativeContext()
  const endpoint = props.endpoint || context?.endpoint
  const serverAction = props.serverAction || context?.serverAction

  const [{ loading, data, error }, setState] = useState<{
    loading: boolean
    data: {
      id: string
      url: string
    } | null
    error: { message: string; status?: number } | null
  }>({ loading: true, data: null, error: null })

  const hasRunRef = useRef<Props | null>(null)

  useEffect(() => {
    const currentDeps = {
      prompt,
      base,
      variants,
      id,
      endpoint,
      steps,
      serverAction,
    }
    if (
      hasRunRef.current &&
      hasRunRef.current.prompt === currentDeps.prompt &&
      hasRunRef.current.base === currentDeps.base &&
      hasRunRef.current.variants === currentDeps.variants &&
      hasRunRef.current.id === currentDeps.id &&
      hasRunRef.current.endpoint === currentDeps.endpoint &&
      hasRunRef.current.steps === currentDeps.steps &&
      hasRunRef.current.serverAction === currentDeps.serverAction
    ) {
      return
    }

    hasRunRef.current = currentDeps

    const asyncOp = async () => {
      setState({ loading: true, data: null, error: null })
      const schemaString = base?.schema
        ? JSON.stringify(zodToJsonSchema(base?.schema, 'schema'))
        : undefined

      try {
        if (serverAction) {
          const response = await serverAction({
            prompt,
            base: {
              schema: schemaString,
            },
            variants,
            steps,
          })

          if (isErrorResponse(response)) {
            console.error('Error from server action: ', response.error.message)
            setState({ loading: false, data: null, error: response.error })
          } else {
            setState({ loading: false, data: response, error: null })
          }
        } else {
          const response = await fetch(endpoint || '/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt,
              schema: schemaString,
              variants,
              steps,
            }),
          })
          const data = await response.json()
          if (response.ok) {
            setState({ loading: false, data, error: null })
          } else {
            setState({ loading: false, data: null, error: data })
          }
        }
      } catch (err) {
        console.error('Error processing request: ', err)
        setState({
          loading: false,
          data: null,
          error: {
            message: 'Error processing request.',
          },
        })
      }
    }

    asyncOp()
  }, [serverAction, endpoint, prompt, base, id, variants, steps])

  return {
    loading,
    data,
    error,
  }
}
