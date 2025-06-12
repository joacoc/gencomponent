import { ZodTypeAny } from 'zod'

export type Status = 'pending' | 'processing' | 'completed' | 'error'

export interface Error {
  message: string
  status?: number
}

export interface Data {
  id: string | undefined
  url: string | undefined
  status: Status
}

export type FunctionProps = Record<
  `on${string}` | `handle${string}`,
  undefined | ((...args: any[]) => Promise<any | void> | void)
>

export interface DeserializedParams {
  prompt: string
  steps?: Array<string>
  variants?: Variants
  base?: DeserializedBase
  extend?: DeserializedExtend
  id?: string
}

export type Params = {
  prompt: string
  steps?: Array<string>
  variants?: Variants
  base?: Base
  extend?: Extend
  id?: string
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
