import { ZodTypeAny } from 'zod'

export interface DeserializedParams {
  prompt: string
  steps?: Array<string>
  variants?: Variants
  base?: DeserializedBase
  extend?: DeserializedExtend
  theme?: string
  version?: number
  id?: string
  model?: string
}

export type Params = {
  prompt: string
  steps?: Array<string>
  variants?: Variants
  base?: Base
  extend?: Extend
  theme?: string
  version?: number
  id?: string
  model?: string
}

export interface Response {
  id: string
  url: string
}

export interface ErrorResponse {
  error: {
    message: string
    status: number
  }
}

export const isErrorResponse = (
  response: Response | ErrorResponse,
): response is ErrorResponse => {
  return (response as ErrorResponse).error !== undefined
}

export type ServerAction = (
  params: DeserializedParams,
) => Promise<Response | ErrorResponse>

export type Variants = Array<Variant>
export type Variant = string
export type Base = {
  schema?: ZodTypeAny
}
export type Extend = Base
export type DeserializedBase = {
  schema?: string
}

export type DeserializedExtend = DeserializedBase
