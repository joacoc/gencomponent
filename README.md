# Shaper SDK for Next.js

Shaper builds generative components that adapt on the fly. Translation, structure, behavior, you name it. It reshapes in real time.

## Installation

```bash
# Using npm
npm install @shaper-sdk/next

# Using yarn
yarn add @shaper-sdk/next

# Using pnpm
pnpm add @shaper-sdk/next
```

## Prerequisites

Before using the library, ensure you have:

1. A Next.js project (version 13 or higher recommended)
2. An API endpoint set up to handle generation requests (default: `/api/endpoint`), or just use [the sample provided here](https://github.com/joacoc/shaper-sdk/blob/main/samples/api/index.ts)
3. Required environment variables:
   ```env
   SHAPER_ENDPOINT=shaper_endpoint
   SHAPER_API_KEY=your_api_key_here
   ```

## Quick Start

Here's a simple example to get you started:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return <GenerativeComponent prompt="Create a contact form" />
}
```

## Advanced Usage

### Incremental Refinement

You can refine your component through multiple steps:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      steps={['Make it more elegant', 'Add form validation']}
    />
  )
}
```

### Variants Support

Generate variants of the same component:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      variants={['Translate to German']}
    />
  )
}
```

### Type Safety with Zod

Help to define your component's data structure using Zod schemas:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'
import { z } from 'zod'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      schema={z.object({
        name: z.string().describe('The user name'),
        email: z.string().email().describe('The user email'),
        content: z.string().min(10).describe('The user contact content'),
        onSubmit: z
          .string()
          .url()
          .describe('The url to send the form after submit'),
      })}
    />
  )
}
```

### Initial State

Provide initial values for your component:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      initialState={{
        name: 'John Smith',
        email: 'John.smith@example.com',
      }}
    />
  )
}
```

## API Reference

### Props

| Prop           | Type         | Default                      | Required | Description                                     |
| -------------- | ------------ | ---------------------------- | -------- | ----------------------------------------------- |
| `prompt`       | `string`     | -                            | Yes      | The prompt describing the component to generate |
| `steps`        | `string[]`   | `[]`                         | No       | Array of refinement steps for the component     |
| `variants`     | `string[]`   | `[]`                         | No       | Array of variant prompts (e.g., translations)   |
| `initialState` | `any`        | -                            | No       | Initial state for the generated component       |
| `model`        | `string`     | `"claude-sonnet-4-20250514"` | No       | The AI model to use for generation              |
| `className`    | `string`     | -                            | No       | CSS classes to apply to the component container |
| `schema`       | `ZodTypeAny` | -                            | No       | Zod schema for type validation                  |

## Troubleshooting

### Common Issues

1. **Component not generating**

   - Check your API endpoint is correctly configured
   - Verify your API key is set in environment variables
   - Avoid using external or incompatibly libraries

2. **Type errors with schema**
   - Make sure your Zod schema matches the expected component structure
   - Verify all required fields are included in the schema
   - Check that field types match your requirements
