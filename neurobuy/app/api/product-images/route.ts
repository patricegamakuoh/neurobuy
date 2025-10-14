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
    const { product_id, storage_path, order } = body

    // Validate required fields
    if (!product_id || !storage_path) {
      return NextResponse.json({ error: 'Product ID and storage path are required' }, { status: 400 })
    }

    // Verify the requester owns the vendor for this product
    const { data: productRow, error: productFetchError } = await supabase
      .from('products')
      .select('id, vendor_id')
      .eq('id', product_id)
      .single()

    if (productFetchError || !productRow) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const { data: vendorRow, error: vendorFetchError } = await supabase
      .from('vendors')
      .select('id, owner_id')
      .eq('id', productRow.vendor_id)
      .single()

    if (vendorFetchError || !vendorRow) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    if (vendorRow.owner_id !== user.id) {
      return NextResponse.json({ error: 'You can only add images to your own products' }, { status: 403 })
    }

    // Create the product image
    const { data: productImage, error } = await supabase
      .from('product_images')
      .insert({
        product_id,
        storage_path,
        order: order || 0
      })
      .select()
      .single()

    if (error) {
      console.error('Product image creation error:', error)
      return NextResponse.json({ error: 'Failed to create product image' }, { status: 500 })
    }

    return NextResponse.json({ productImage }, { status: 201 })
  } catch (error) {
    console.error('Product image creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const { data: images, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('order', { ascending: true })

    if (error) {
      console.error('Product images fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch product images' }, { status: 500 })
    }

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Product images fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
