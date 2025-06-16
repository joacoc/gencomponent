import { areParamsEqual, cn } from '@/lib/utils'
import fastDeepEqual from 'fast-deep-equal'
import { memo, useEffect, useState } from 'react'
import useGenerativeComponent from '../../hooks/useGenerativeComponent'
import type { FunctionProps, Params } from '../../types'
import ExclamationTriangle from '../icons/exclamationTriangle'
import IFrame from './_iFrame'

export interface Props extends Params {
  initState?: any
  className?: string
  innerClassName?: string
  autoResize?: 'vertical' | 'horizontal' | 'both' | 'none' | undefined
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
    innerClassName,
    base,
    extend,
    revisions,
    onLoad,
    onError,
    onMessage,
    autoResize,
    ...fns
  }: Props & FunctionProps) => {
    const { data, loading, error } = useGenerativeComponent({
      prompt,
      base,
      extend,
      variants,
      revisions,
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

    console.log('Error: ', error)

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
            innerClassName={innerClassName}
            autoResize={autoResize}
            onInit={() => setDisplay(true)}
            {...fns}
          />
        )}
      </>
    )
  },
  (prevProps, nextProps) => {
    return (
      areParamsEqual(prevProps, nextProps) &&
      prevProps.className === nextProps.className &&
      prevProps.innerClassName === nextProps.innerClassName &&
      fastDeepEqual(prevProps.initState, nextProps.initState)
    )
  },
)

export default GenerativeComponent
