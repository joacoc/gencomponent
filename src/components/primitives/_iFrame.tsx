import { useDarkMode } from '@/hooks/useDarkMode'
import { cn } from '@/lib/utils'
import IframeResizer from '@iframe-resizer/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Data, FunctionProps, Styling } from '../../types'

const ORIGIN = 'https://pub-d6adf32ab3b94607ba3b3402d7fd4d20.r2.dev'

type Props = {
  data: Data | null
  className?: string
  initState?: any
  styling?: Styling
  log?: boolean | 'expanded' | 'collapsed' | undefined
  onMessage?: (message: { type: string; data: unknown }) => void
  onInit?: () => void
  autoResize?: 'vertical' | 'horizontal' | 'both' | 'none'
} & FunctionProps

const IFrame = ({
  data,
  initState,
  className,
  log,
  styling,
  onMessage,
  onInit,
  autoResize = 'both',
  ...propsFns
}: Props) => {
  /**
   * Hooks
   */
  const darkMode = useDarkMode()

  /**
   * States
   */
  const [isReady, setIsReady] = useState<boolean>(false)

  /**
   * ID
   */
  const id = useId()

  /**
   * Refs
   */
  const ref = useRef<IframeResizer.IFrameComponent | null>(null)
  /**
   * Is initialized is used as a ref, not as a state as isReady
   * to avoid triggering SET_THEME after the INIT event.
   */
  const isInitialized = useRef<boolean | null>(null)

  // Simple way to check if there are params
  const hasInitParams = !!(data || styling || darkMode)

  // We use a ref. for functions
  // Replacing onMessageHandler has no effect on iFrame,
  // and continues using old props/fns. This way we can avoid this issue.
  const fnsRef = useRef<FunctionProps | null>(propsFns)

  /**
   * Effects
   */
  useEffect(() => {
    if (isReady && ref.current && !isInitialized.current) {
      ref.current.iFrameResizer.sendMessage(
        JSON.stringify({
          type: 'INIT',
          data: {
            state: initState,
            styling,
            darkMode,
          },
        }),
      )
      isInitialized.current = true

      if (onInit) {
        onInit()
      }
    }
  }, [onInit, isReady, initState, styling, darkMode, ref.current])

  useEffect(() => {
    fnsRef.current = propsFns
  }, [propsFns])

  // We have a separate useEffect to handle dynamic className changes.
  useEffect(() => {
    if (ref.current && isInitialized.current) {
      ref.current.iFrameResizer.sendMessage(
        JSON.stringify({
          type: 'SET_THEME',
          data: {
            styling,
            dark: darkMode,
          },
        }),
      )
    }
  }, [styling, darkMode, ref.current])

  useEffect(() => {
    const functionNames = Object.keys(propsFns) || []
    if (ref.current && isInitialized.current) {
      ref.current.iFrameResizer.sendMessage(
        JSON.stringify({
          type: 'REMOTE_CALL_REGISTER',
          data: {
            functionNames,
          },
        }),
      )
    }
  }, [propsFns, ref.current])

  /**
   * Callbacks
   */
  const onMessageHandler = useCallback(
    async ({ message }: { message?: string }) => {
      const fns = fnsRef.current

      if (message) {
        try {
          const { type, data } = JSON.parse(message)
          if (type === 'READY') {
            setIsReady(true)
          } else if (type === 'REMOTE_CALL') {
            const { functionName, params, id } = data

            if (fns && typeof fns[functionName] === 'function') {
              try {
                const response = await fns[functionName](...params)
                if (ref.current) {
                  ref.current.iFrameResizer.sendMessage(
                    JSON.stringify({
                      type: 'REMOTE_CALL_RESPONSE',
                      data: {
                        id,
                        response,
                      },
                    }),
                  )
                } else {
                  console.error(
                    '[Parent]',
                    'Invalid state. No iframe detected to send response.',
                  )
                }
              } catch (err) {
                if (ref.current) {
                  ref.current.iFrameResizer.sendMessage(
                    JSON.stringify({
                      type: 'REMOTE_CALL_RESPONSE',
                      data: {
                        id,
                        error: err,
                      },
                    }),
                  )
                } else {
                  console.error(
                    '[Parent]',
                    'Invalid state. No iframe detected to send response.',
                  )
                }
              }
            } else {
              console.warn('[Parent]', 'Remote call on undefined function.')
            }
          } else if (onMessage) {
            onMessage({ type, data })
          }
        } catch (err) {
          console.error('[Parent]', 'Error parsing message: ', err)
          console.error('[Parent]', 'Message: ', message)
        }
      }
    },
    [],
  )

  const onReadyHandler = useCallback(
    (iframe: IframeResizer.IFrameComponent) => {
      ref.current = iframe
    },
    [],
  )

  const url = data?.url || ''
  const params = new URLSearchParams()

  if (hasInitParams) {
    params.append('await_init', 'true')
  }

  if (log) {
    params.append('log', 'true')
  }

  const finalURL = url + (params.toString() ? `?${params.toString()}` : '')

  return (
    <IframeResizer
      license="GPLv3"
      inPageLinks
      onMessage={onMessageHandler}
      onReady={onReadyHandler}
      src={finalURL}
      className={cn('max-w-full', className)}
      checkOrigin={[ORIGIN]}
      bodyMargin={0}
      direction={autoResize}
      id={id}
      log={log}
      key={id + '_' + 'iframe'}
      allow="fullscreen; camera; microphone; gyroscope; accelerometer; geolocation; clipboard-write; autoplay"
      loading="eager"
      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups-to-escape-sandbox allow-pointer-lock allow-popups allow-modals"
      fetchPriority="high"
    />
  )
}

export default IFrame
