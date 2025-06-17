import { areParamsEqual, cn, extractFns } from '@/lib/utils'
import fastDeepEqual from 'fast-deep-equal'
import { memo, useEffect, useState } from 'react'
import { ZodTypeAny } from 'zod'
import useGenerativeComponent from '../../hooks/useGenerativeComponent'
import type { FunctionProps, Params } from '../../types'
import ExclamationTriangle from '../icons/exclamationTriangle'
import IFrame from './_iFrame'

export interface Props extends Omit<Params, 'base' | 'extends'> {
  initState?: any
  className?: string
  // styling?: Styling
  autoResize?: 'vertical' | 'horizontal' | 'both' | 'none' | undefined
  schema?: ZodTypeAny
  extendSchema?: ZodTypeAny
  log?: boolean | 'expanded' | 'collapsed' | undefined
  onLoad?: (data: { id?: string; url?: string; status?: string }) => void
  onError?: (error: { message: string; status?: number }) => void
  onMessage?: (message: { type: string; data: unknown }) => void
}

const GenerativeComponent = memo(
  ({
    id,
    prompt,
    variants,
    initState,
    className,
    // styling,
    schema,
    extendSchema,
    steps,
    onLoad,
    onError,
    onMessage,
    autoResize,
    log,
    ...fns
  }: Props & FunctionProps) => {
    const { data, loading, error } = useGenerativeComponent({
      prompt,
      schema,
      extendSchema,
      variants,
      steps,
    })
    const [display, setDisplay] = useState(false)
    const displayLoading =
      !display || loading || error || (data && data.status !== 'ready')

    /**
     * Effects
     */
    useEffect(() => {
      if (data && onLoad) {
        onLoad(data)
      }

      if (error && onError) {
        onError(error)
      }
    }, [data, error])

    return (
      <>
        {displayLoading && (
          <div
            className={cn(
              'flex rounded-md border border-gray-200 bg-gray-100/50',
              className,
            )}
          >
            {/* Heroicons Exclamation Triangle */}
            {
              <ExclamationTriangle
                className={cn(
                  'm-auto size-10 opacity-20',
                  error ? 'visible' : 'invisible',
                )}
              />
            }
          </div>
        )}
        {data && data.status === 'ready' && !loading && !error && (
          <IFrame
            data={data}
            className={cn(className, display ? 'visible' : 'invisible')}
            initState={initState}
            onMessage={onMessage}
            // styling={styling}
            autoResize={autoResize}
            onInit={() => setDisplay(true)}
            log={false || log}
            {...fns}
          />
        )}
      </>
    )
  },
  (prevProps, nextProps) => {
    const fnsEq = extractFns(prevProps) != extractFns(nextProps)

    return (
      areParamsEqual(prevProps, nextProps) &&
      prevProps.className === nextProps.className &&
      prevProps.log === nextProps.log &&
      // fastDeepEqual(prevProps.styling, nextProps.styling) &&
      fastDeepEqual(prevProps.initState, nextProps.initState) &&
      fnsEq
    )
  },
)

export default GenerativeComponent
