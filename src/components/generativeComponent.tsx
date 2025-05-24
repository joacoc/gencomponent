'use client'

import useGenerativeUi from '@/hooks/useGenerativeComponent'
import { cn } from '@/lib/utils'
import type { ServerAction } from '@/types'
import IframeResizer from '@iframe-resizer/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { type ZodTypeAny } from 'zod'

export interface Props {
  prompt: string
  variants?: Array<string>
  initialState?: any
  model?: string
  className?: string
  schema?: ZodTypeAny
  serverAction?: ServerAction
}

const ORIGIN = 'https://pub-d6adf32ab3b94607ba3b3402d7fd4d20.r2.dev'

export default function GenerativeComponent({
  prompt,
  variants,
  initialState,
  model = 'claude-sonnet-4-20250514',
  className,
  schema,
  serverAction,
}: Props) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [status, setStatus] = useState('LOADING')
  const id = useId()
  const { data, loading } = useGenerativeUi({
    serverAction,
    prompt,
    model,
    schema,
    variants,
  })

  const onMessageHandler = useCallback((e: any) => {
    console.log('Received message from iframe:', e.data)
    const top = window.top
    if (top && top.onmessage) {
      top.onmessage = (e: MessageEvent) => {
        console.log('Received TOP message:', e.data)
      }
    }
    window.onmessage = function (e) {
      // TOOD:
      // if (e.origin !== "https://cdn.r2") return;
      const { type, status } = e.data
      if (type === 'STATUS' && status === 'INIT') {
        console.log('Iframe initialized')
        setStatus('INIT')
      }
      if (type === 'STATUS' && status === 'LOADED') {
        console.log('Iframe loaded')
        setStatus('LOADED')
      }

      if (type === 'PARAMS_RECEIVED') {
        console.log('Iframe params received')
      }
    }
    console.log('Received message from iframe:', e.data)
    const { type, status } = e.data
    if (type === 'STATUS' && status === 'INIT') {
      console.log('Iframe initialized')
      setStatus('INIT')
    }
    if (type === 'STATUS' && status === 'LOADED') {
      console.log('Iframe loaded')
      setStatus('LOADED')
    }

    if (type === 'PARAMS_RECEIVED') {
      console.log('Iframe params received')
    }
  }, [])

  useEffect(() => {
    if (ref.current && ref.current.contentWindow) {
      ref.current.contentWindow.onmessage = (e) => {
        console.log('EV: ', e)
      }
    }
  }, [ref.current])

  useEffect(() => {
    const { top } = window
    if (top) {
      top.onmessage = (e) => {
        console.log('TOP: ', e)
        ;(ref.current as any)?.sendMessage({
          type: 'INITIAL_STATE',
          payload: initialState,
        })
        ref.current?.contentWindow?.postMessage(
          {
            type: 'INITIAL_STATE',
            payload: initialState,
          },
          '*',
        )
      }
    }
  }, [])

  useEffect(() => {
    if (status === 'LOADED') {
      console.log('Sending initial state to iframe')
      ref.current?.contentWindow?.postMessage(
        {
          type: 'INITIAL_STATE',
          payload: initialState,
        },
        '*',
      )
    }
  }, [ref.current?.contentWindow, initialState, status])

  if (loading) {
    return (
      <div
        className={cn(
          'border-border/50 mx-auto flex h-full min-h-96 w-full max-w-sm animate-pulse rounded-md border bg-gray-50/5',
          className,
        )}
      />
    )
  }

  return (
    <IframeResizer
      license="GPLv3"
      log
      forwardRef={ref}
      inPageLinks
      onMessage={onMessageHandler}
      src={data?.url}
      className={cn(className, 'h-full w-full')}
      checkOrigin={[ORIGIN]}
      id={id}
      key={id + '_' + 'iframe'}
    />
  )
}
