import * as react_jsx_runtime from 'react/jsx-runtime';
import { ServerAction as ServerAction$1, Params as Params$1, Response as Response$1 } from '@/types';
import { ZodTypeAny } from 'zod';

interface Props$1 {
    prompt: string;
    variants?: Array<string>;
    initialState?: any;
    model?: string;
    className?: string;
    schema?: ZodTypeAny;
    serverAction?: ServerAction$1;
}
declare function GenerativeComponent({ prompt, variants, initialState, model, className, schema, serverAction, }: Props$1): react_jsx_runtime.JSX.Element;

interface Params {
    prompt: string;
    variants?: Array<string>;
    schema?: string;
    theme?: string;
    version?: number;
    id?: string;
    model?: string;
}
interface Response {
    id: string;
    url: string;
}
type ServerAction = (params: Params) => Promise<Response>;

/**
 * Server action to generate content through genblock
 * This keeps your API endpoint secure by handling the request server-side
 */
declare function generate(params: Params$1): Promise<Response$1>;

interface Props {
    prompt: string;
    schema?: ZodTypeAny;
    variants?: Array<string>;
    model?: string;
    id?: string;
    endpoint?: string;
    serverAction?: ServerAction$1;
}
declare function useGenerativeBlock<T>({ serverAction, endpoint, schema, prompt, variants, model, id, }: Props): {
    loading: boolean;
    data: {
        id: string;
        url: string;
    } | null;
};

export { GenerativeComponent, generate, useGenerativeBlock as useGenerativeComponent };
export type { Props$1 as BlockProps, Params, Response, ServerAction };
