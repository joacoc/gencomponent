import GenerativeComponent from './components/generativeComponent'
import useGenerativeComponent from './hooks/useGenerativeComponent'
import './index.css'
import { GenerativeProvider, useGenerativeContext } from './provider'
export type { Props as BlockProps } from './components/generativeComponent'
export type {
  Base,
  DeserializedBase,
  DeserializedExtend,
  DeserializedParams,
  ErrorResponse,
  Extend,
  isErrorResponse,
  Params,
  Response,
  ServerAction,
  Variant,
  Variants,
} from './types'

export {
  GenerativeComponent,
  GenerativeProvider,
  useGenerativeComponent,
  useGenerativeContext,
}
