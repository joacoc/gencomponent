import { ZodTypeAny } from 'zod'
import GenerativeComponent from '../primitives/generativeComponent'

interface Props {
  description: string
  transformations?: Array<string>
  schema?: ZodTypeAny
  locale?: string
  className?: string
}

const AdaptiveComponent = (props: Props) => {
  return (
    <GenerativeComponent
      prompt={props.description}
      revisions={props.transformations}
      base={{
        schema: props.schema,
      }}
      className={props.className}
    />
  )
}

export default AdaptiveComponent
