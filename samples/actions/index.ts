import type { Params, Response } from '@shaper-sdk/next'
const API_URL = process.env.SHAPER_ENDPOINT

/**
 * Server action to generate content.
 * This keeps your API endpoint secure by handling the request server-side
 */
export async function generate(params: Params): Promise<Response> {
  try {
    const response = await fetch(API_URL, {
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
