# Shaper SDK for Next.js

Shaper builds infinite components that adapt on the fly. Translation, structure, behavior, you name it. It reshapes in real time.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

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

1. An API endpoint set up to handle generation requests (default: `/api/generate`), or use [the sample provided here](https://github.com/joacoc/shaper-sdk/blob/main/samples/api/route.ts)
2. Required environment variables:
   ```env
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

## Usage

### Basic Usage

The `GenerativeComponent` is the core component that generates React components based on your prompts:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function MyApp() {
  return (
    <div>
      <h1>My Generated Components</h1>
      <GenerativeComponent prompt="Create a beautiful login form with email and password fields" />
      <GenerativeComponent prompt="Create a navigation bar with Home, About, and Contact links" />
    </div>
  )
}
```

### Incremental Improvements with Steps

You can fix or add features to your component using steps. Steps are applied sequentially over the output of the previous step:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      steps={[
        'Add form validation',
        'Make it responsive for mobile devices',
        'Add loading states for form submission'
      ]}
    />
  )
}
```

### Variants Support

Generate multiple variants of the same component. Unlike steps, variants run all at once after all steps have been applied:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      steps={['Make it simpler']}
      variants={[
        'Translate to Japanese',
        'Use a dark theme'
      ]}
    />
  )
}
```

### Type Safety with Zod

Define your component's data structure using Zod schemas for better type safety and validation:

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

Provide initial values for your component's state:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      initState={{
        name: 'John Smith',
        email: 'john.smith@example.com',
        content: 'Hello, I would like to inquire about...'
      }}
    />
  )
}
```

### Event Callbacks

Handle events from your generated components:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      onSubmit={(formData) => {
        console.log('Form submitted:', formData)
        // Handle form submission
      }}
    />
  )
}
```

### Extending Schemas

You can extend existing schemas to add additional validation or fields:

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'
import { z } from 'zod'

const baseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

function ContactForm() {
  return (
    <GenerativeComponent
      prompt="Create a contact form"
      schema={baseSchema}
      extendSchema={z.object({
        phone: z.string().optional(),
        company: z.string().optional(),
      })}
    />
  )
}
```

## API Reference

### Props

| Prop           | Type         | Default | Required | Description                                   |
| -------------- | ------------ | ------- | -------- | --------------------------------------------- |
| `prompt`       | `string`     | -       | Yes      | The prompt describing the code to generate    |
| `steps`        | `string[]`   | `[]`    | No       | Array of steps for incremental improvements   |
| `variants`     | `string[]`   | `[]`    | No       | Array of variant prompts (e.g., translations) |
| `initState`    | `any`        | -       | No       | Initial state for the generated code          |
| `schema`       | `ZodTypeAny` | -       | No       | Base schema to use for type safety           |
| `extendSchema` | `ZodTypeAny` | -       | No       | Schema to extend the base schema             |

## Examples

### E-commerce Product Card

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'
import { z } from 'zod'

function ProductCard() {
  return (
    <GenerativeComponent
      prompt="Create a modern product card component"
      schema={z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        image: z.string().url(),
        description: z.string(),
        inStock: z.boolean(),
      })}
      initState={{
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://example.com/headphones.jpg',
        description: 'High-quality wireless headphones with noise cancellation',
        inStock: true,
      }}
    />
  )
}
```

### Dashboard Widget

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function DashboardWidget() {
  return (
    <GenerativeComponent
      prompt="Create a dashboard widget showing user statistics"
      steps={[
        'Add a chart visualization',
        'Include refresh functionality',
        'Make it collapsible'
      ]}
      variants={[
        'Use a dark theme',
        'Add animations',
        'Make it responsive'
      ]}
    />
  )
}
```

### Multi-language Support

```tsx
import { GenerativeComponent } from '@shaper-sdk/next'

function MultiLanguageForm() {
  return (
    <GenerativeComponent
      prompt="Create a user registration form"
      steps={['Add password confirmation field', 'Include terms and conditions checkbox']}
      variants={[
        'Translate all text to German'
      ]}
    />
  )
}
```

## Troubleshooting

### Common Issues

1. **Code not generating**
   - Check your API endpoint is correctly configured
   - Verify your API key is set in environment variables
   - Avoid using external or incompatible libraries in prompts

2. **Type errors with schema**
   - Make sure your Zod schema matches the expected code structure
   - Verify all required fields are included in the schema
   - Check that field types match your requirements
   - Use `.describe()` methods to provide clear field descriptions

3. **Component not rendering**
   - Check browser console for JavaScript errors (enable `log` prop)
   - Verify the generated code is valid React/JSX
   - Ensure all required dependencies are installed

### Best Practices

1. **Write clear, specific prompts** - Be descriptive about what you want to generate
2. **Use steps for iterative improvements** - Break down complex changes into smaller steps
3. **Leverage Zod schemas** - Define clear data structures for better type safety
4. **Test generated components** - Always verify the generated code works as expected

### Getting Help

- Check the [GitHub repository](https://github.com/joacoc/shaper-sdk) for issues and discussions
- Review the [sample API implementation](https://github.com/joacoc/shaper-sdk/blob/main/samples/api/route.ts)
