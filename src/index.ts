export type { Props as BlockProps } from './components/generativeComponent'
export type { Params, Response, ServerAction } from './types'
import { generate } from './actions'
import GenerativeComponent from './components/generativeComponent'
import useGenerativeComponent from './hooks/useGenerativeComponent'

export { generate, GenerativeComponent, useGenerativeComponent }
