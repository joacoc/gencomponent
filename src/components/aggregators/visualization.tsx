import z, { ZodTypeAny } from 'zod'
import GenerativeComponent from '../primitives/generativeComponent'

interface Props {
  transformations?: Array<string>
  schema: ZodTypeAny
  locale?: string
  data: unknown
}

const Chart = (props: Props) => {
  return (
    <GenerativeComponent
      prompt={'Generate a chart for the defined schema.'}
      revisions={props.transformations}
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

export default Chart
