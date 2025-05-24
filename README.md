A utils library to generate components using prompts.

## Installation

```bash
npm install gencomponents
```

## Usage

```tsx
import { GenerativeComponent } from 'gencomponents'

function MyComponent() {
  return <GenerativeComponent prompt="Create a card component" />
}
```

## Props

| Prop           | Type            | Default                      | Description                                      |
| -------------- | --------------- | ---------------------------- | ------------------------------------------------ |
| `prompt`       | `string`        | -                            | The prompt for generating the UI                 |
| `variants`     | `Array<string>` | -                            | Optional variants for the generation             |
| `initialState` | `any`           | -                            | Initial state to pass to the generated component |
| `model`        | `string`        | `"claude-sonnet-4-20250514"` | The model to use for generation                  |
| `className`    | `string`        | -                            | CSS classes to apply to the component            |
| `schema`       | `ZodTypeAny`    | -                            | Zod schema for validation                        |
| `serverAction` | `ServerAction`  | -                            | NextJS Server action configuration               |

## Development

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting

```bash
npm run lint
```

## License

MIT
