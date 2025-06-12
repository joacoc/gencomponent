import z, { ZodTypeAny } from 'zod'
import GenerativeComponent from '../primitives/generativeComponent'

interface Props {
  for: string
  description?: string
  transformations?: Array<string>
  schema?: ZodTypeAny
  locale?: string
  onSubmit?: (formData: unknown) => void
  method?: string
  action?: string
}

const Form = (props: Props) => {
  const prompt = `Create a form for ${props.for}${props.description ? `and the following description ${props.description}` : ''}`
  return (
    <GenerativeComponent
      prompt={prompt}
      steps={props.transformations}
      base={{
        schema: props.schema
          ? z.object({
              onSubmit: z.function().optional().describe('onForm submit'),
              schema: props.schema,
            })
          : z.object({
              schema: z.undefined().describe('form schema'),
              props: z
                .object({
                  onSubmit: z.function().optional().describe('onForm submit'),
                  method: z.string().optional().describe('form submit method'),
                  action: z.string().optional().describe('form submit action'),
                })
                .describe('form props'),
            }),
      }}
      onMessage={({ type, data }) => {
        if (type === 'FORM_SUBMIT' && props.onSubmit) {
          props.onSubmit(data)
        }
      }}
      initState={{
        method: props.method,
        action: props.action,
      }}
    />
  )
}

export default Form
