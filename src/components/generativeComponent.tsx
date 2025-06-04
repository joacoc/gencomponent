'use client'
import IframeResizer from '@iframe-resizer/react'
import fastDeepEqual from 'fast-deep-equal'
import { memo, useCallback, useEffect, useId, useRef, useState } from 'react'
import useGenerativeComponent from '../hooks/useGenerativeComponent'
import { cn } from '../lib/utils'
import type { Params } from '../types'
import ExclamationTriangle from './exclamationTriangle'

export interface Props extends Params {
  initialState?: any
  className?: string
  onData?: (data: { id?: string; url?: string; status?: string }) => void
  onError?: (error: { message: string; status?: number }) => void
}

const ORIGIN = 'https://pub-d6adf32ab3b94607ba3b3402d7fd4d20.r2.dev'

const GenerativeComponent = memo(
  ({
    prompt,
    variants,
    initialState,
    className,
    base,
    extend,
    steps,
    onData,
    onError,
  }: Props) => {
    const ref = useRef<HTMLIFrameElement>(null)
    const [status, setStatus] = useState('LOADING')
    const id = useId()
    const { data, loading, error } = useGenerativeComponent({
      prompt,
      base,
      extend,
      variants,
      steps,
    })

    /**
     * Callbacks
     */
    const onMessageHandler = useCallback((e: any) => {
      // console.log('Received message from iframe:', e.data)
      const top = window.top
      if (top && top.onmessage) {
        top.onmessage = (e: MessageEvent) => {
          // console.log('Received TOP message:', e.data)
        }
      }
      window.onmessage = function (e) {
        // TOOD:
        // if (e.origin !== "https://cdn.r2") return;
        const { type, status } = e.data
        if (type === 'STATUS' && status === 'INIT') {
          // console.log('Iframe initialized')
          setStatus('INIT')
        }
        if (type === 'STATUS' && status === 'LOADED') {
          // console.log('Iframe loaded')
          setStatus('LOADED')
        }

        if (type === 'PARAMS_RECEIVED') {
          // console.log('Iframe params received')
        }
      }
      // console.log('Received message from iframe:', e.data)
      const { type, status } = e.data
      if (type === 'STATUS' && status === 'INIT') {
        // console.log('Iframe initialized')
        setStatus('INIT')
      }
      if (type === 'STATUS' && status === 'LOADED') {
        // console.log('Iframe loaded')
        setStatus('LOADED')
      }

      if (type === 'PARAMS_RECEIVED') {
        // console.log('Iframe params received')
      }
    }, [])

    /**
     * Effects
     */
    useEffect(() => {
      if (data && onData) {
        onData(data)
      }

      if (error && onError) {
        onError(error)
      }
    }, [data, error])

    useEffect(() => {
      const { top } = window
      if (top) {
        top.onmessage = (e) => {
          if (ref.current) {
            const refc: any = ref.current
            refc.sendMessage({
              type: 'INITIAL_STATE',
              payload: initialState,
            })
            refc.contentWindow?.postMessage(
              {
                type: 'INITIAL_STATE',
                payload: initialState,
              },
              '*',
            )
          }
        }
      }
    }, [])

    useEffect(() => {
      if (status === 'LOADED') {
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
            'mx-auto flex h-10 max-h-full w-full max-w-sm animate-pulse rounded-md border border-gray-200 bg-gray-200/50',
            className,
          )}
        />
      )
    }

    if (error) {
      return (
        <div
          className={cn(
            'mx-auto flex h-full max-h-full w-full max-w-sm rounded-md border border-gray-200 bg-gray-100/50',
            className,
          )}
        >
          {/* Heroicons Exclamation Triangle */}
          <ExclamationTriangle className="m-auto size-10 opacity-20" />
        </div>
      )
    }

    return (
      <IframeResizer
        license="GPLv3"
        forwardRef={ref}
        inPageLinks
        onMessage={onMessageHandler}
        src={data?.url}
        className={cn('h-full max-h-full min-h-8 w-full min-w-8', className)}
        checkOrigin={[ORIGIN]}
        id={id}
        key={id + '_' + 'iframe'}
        allow="fullscreen; camera; microphone; gyroscope; accelerometer; geolocation; clipboard-write; autoplay"
        loading="eager"
        sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups-to-escape-sandbox allow-pointer-lock allow-popups allow-modals"
        fetchPriority="high"
      />
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.prompt === nextProps.prompt &&
      prevProps.base === nextProps.base &&
      prevProps.extend === nextProps.extend &&
      fastDeepEqual(prevProps.variants, nextProps.variants) &&
      fastDeepEqual(prevProps.steps, nextProps.steps) &&
      fastDeepEqual(prevProps.initialState, nextProps.initialState)
    )
  },
)

export default GenerativeComponent
