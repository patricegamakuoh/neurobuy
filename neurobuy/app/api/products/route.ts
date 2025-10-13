import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '../../../lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { store_id, title, description, price, currency, active } = body

    // Validate required fields
    if (!store_id || !title || price === undefined) {
      return NextResponse.json({ error: 'Store ID, title, and price are required' }, { status: 400 })
    }

    // Verify user owns the store
    const { data: store } = await supabase
      .from('stores')
      .select('owner')
      .eq('id', store_id)
      .single()

    if (!store || store.owner !== user.id) {
      return NextResponse.json({ error: 'You can only create products for your own stores' }, { status: 403 })
    }

    // Create the product
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        store_id,
        title,
        description: description || null,
        price: parseFloat(price),
        currency: currency || 'XAF',
        active: active !== undefined ? active : true
      })
      .select()
      .single()

    if (error) {
      console.error('Product creation error:', error)
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('store_id')
    const active = searchParams.get('active')

    let query = supabase.from('products').select(`
      *,
      stores (
        id,
        name,
        slug
      )
    `)

    if (storeId) {
      query = query.eq('store_id', storeId)
    }

    if (active !== null) {
      query = query.eq('active', active === 'true')
    }

    const { data: products, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Products fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
