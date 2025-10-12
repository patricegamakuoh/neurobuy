import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  // For now, just redirect to the home page since Supabase is disabled
  // This will be re-enabled when Supabase is properly configured
  return NextResponse.redirect(`${origin}${next}`)
}
