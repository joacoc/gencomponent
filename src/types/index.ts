export interface Params {
  prompt: string;
  variants?: Array<string>;
  schema?: string;
  theme?: string;
  version?: number;
  id?: string;
  model?: string;
}

export interface Response {
  id: string;
  url: string;
}

export type ServerAction = (params: Params) => Promise<Response>;
