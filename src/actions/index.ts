import type { Params, Response } from '@/types'

/**
 * Server action to generate content.
 * This keeps your API endpoint secure by handling the request server-side
 */
export async function generate(params: Params): Promise<Response> {
  const apiUrl = process.env.GENERATIVE_API_URL

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
    console.error('Error in generate server action:', error)
    throw error
  }
}
