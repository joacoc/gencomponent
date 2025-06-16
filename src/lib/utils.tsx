import { Params } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import fastDeepEqual from 'fast-deep-equal'
import { twMerge } from 'tailwind-merge'
import { ZodTypeAny } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isSchemaEqual(
  prev: ZodTypeAny | undefined,
  next: ZodTypeAny | undefined,
): boolean {
  if (prev === next) {
    return true
  } else if (prev === undefined && next) {
    return false
  } else if (prev && next === undefined) {
    return false
  } else {
    try {
      return (
        JSON.stringify(zodToJsonSchema(prev as ZodTypeAny, 'schema')) ===
        JSON.stringify(zodToJsonSchema(next as ZodTypeAny, 'schema'))
      )
    } catch (err) {
      console.log('Error converting schemas')
      return false
    }
  }
}

export function areParamsEqual(prevParams: Params, nextParams: Params) {
  return (
    prevParams.prompt === nextParams.prompt &&
    isSchemaEqual(prevParams.base?.schema, nextParams.base?.schema) &&
    prevParams.extend === nextParams.extend &&
    fastDeepEqual(prevParams.variants, nextParams.variants) &&
    fastDeepEqual(prevParams.revisions, nextParams.revisions)
  )
}
