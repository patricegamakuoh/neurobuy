import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '../../lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description, owner } = body

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    // Check if slug is already taken
    const { data: existingStore } = await supabase
      .from('stores')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingStore) {
      return NextResponse.json({ error: 'Store slug is already taken' }, { status: 400 })
    }

    // Create the store
    const { data: store, error } = await supabase
      .from('stores')
      .insert({
        name,
        slug,
        description: description || null,
        owner: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Store creation error:', error)
      return NextResponse.json({ error: 'Failed to create store' }, { status: 500 })
    }

    return NextResponse.json({ store }, { status: 201 })
  } catch (error) {
    console.error('Store creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const ownerId = searchParams.get('owner')

    let query = supabase.from('stores').select('*')

    if (ownerId) {
      query = query.eq('owner', ownerId)
    }

    const { data: stores, error } = await query

    if (error) {
      console.error('Stores fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 })
    }

    return NextResponse.json({ stores })
  } catch (error) {
    console.error('Stores fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
