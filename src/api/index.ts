import type { Params } from '@/types'

/**
 * Server action to generate content.
 * This keeps your API endpoint secure by handling the request server-side
 */
export async function POST(req: Request): Promise<Response> {
  const apiUrl = process.env.GENERATIVE_API_URL
  const params: Params = await req.json()

  // TODO: Test prompt, should return nextjs 500 err.
  if (!params.prompt) {
    throw new Error('Prompt is required')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in generateContent server action:', error)
    throw error
  }
}
