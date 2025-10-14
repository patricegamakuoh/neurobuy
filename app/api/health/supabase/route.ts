import { NextResponse } from 'next/server'
import { createServerClient } from '../../../lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from('products').select('id').limit(1)
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true, count: Array.isArray(data) ? data.length : 0 })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}


