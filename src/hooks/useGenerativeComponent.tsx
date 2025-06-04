'use client'
import { useGenerativeContext } from '@/provider'
import { useEffect, useRef, useState } from 'react'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { Params } from '../types'

interface Props extends Params {
  id?: string
  endpoint?: string
}

export default function useGenerativeComponent(props: Props) {
  const { prompt, base, variants, steps, id } = props
  const context = useGenerativeContext()
  const endpoint = props.endpoint || context?.endpoint

  const [{ loading, data, error }, setState] = useState<{
    loading: boolean
    data: {
      id: string | undefined
      url: string | undefined
      status: 'pending' | 'processing' | 'completed' | 'error'
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
    }
    if (
      hasRunRef.current &&
      hasRunRef.current.prompt === currentDeps.prompt &&
      hasRunRef.current.base === currentDeps.base &&
      hasRunRef.current.variants === currentDeps.variants &&
      hasRunRef.current.id === currentDeps.id &&
      hasRunRef.current.endpoint === currentDeps.endpoint &&
      hasRunRef.current.steps === currentDeps.steps
    ) {
      return
    }

    if (!prompt) {
      return
    }

    hasRunRef.current = currentDeps
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
        const data = await response.json()
        if (response.ok) {
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
          setState({ loading: false, data: null, error: data })
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
      if (
        hasRunRef.current &&
        hasRunRef.current.prompt === currentDeps.prompt &&
        hasRunRef.current.base === currentDeps.base &&
        hasRunRef.current.variants === currentDeps.variants &&
        hasRunRef.current.id === currentDeps.id &&
        hasRunRef.current.endpoint === currentDeps.endpoint &&
        hasRunRef.current.steps === currentDeps.steps
      ) {
        return
      } else {
        clearInterval(intervalId)
      }
    }
  }, [endpoint, prompt, base, id, variants, steps])

  return {
    loading,
    data,
    error,
  }
}
