// Store at: /app/api/generate/route.tsx
import type { Params } from '@shaper-sdk/next'
import { NextResponse } from 'next/server'
const API_KEY = process.env.SHAPER_API_KEY

/**
 * Server action to generate content.
 * This keeps your API endpoint secure by handling the request server-side
 */
export async function POST(req: Request): Promise<Response> {
  const params: Params = await req.json()

  if (!params.prompt) {
    return NextResponse.json(
      {
        error: {
          message: 'Prompt is required',
        },
      },
      { status: 400 },
    )
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (API_KEY) {
      headers['x-api-key'] = API_KEY
    }

    const response = await fetch('https://api.shaper.build/generate', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          error: {
            message: errorText,
          },
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 500 },
    )
  }
}
