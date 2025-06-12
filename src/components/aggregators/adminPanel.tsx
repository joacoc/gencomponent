import z, { ZodTypeAny } from 'zod'
import GenerativeComponent from '../primitives/generativeComponent'

interface Props {
  description?: string
  transformations?: Array<string>
  schema: ZodTypeAny
  locale?: string
  data?: unknown
}

const AdaptiveAdminPanelComponent = (props: Props) => {
  const prompt =
    'Generate an admin panel' + props.description
      ? ` with the following description: ${props.description}`
      : ''
  return (
    <GenerativeComponent
      prompt={prompt}
      steps={props.transformations}
      variants={props.locale ? [props.locale] : undefined}
      base={{
        schema: z.object({
          data: props.schema,
        }),
      }}
      initState={{
        data: props.data,
      }}
    />
  )
}

export default AdaptiveAdminPanelComponent
