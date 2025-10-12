// Temporarily disable Supabase imports to get the site working
// import { supabase } from './supabase/client'
// import { Database } from './supabase/types'

// Define types locally for now
type Tables = {
  profiles: {
    Row: any
    Insert: any
    Update: any
  }
  products: {
    Row: any
    Insert: any
    Update: any
  }
  orders: {
    Row: any
    Insert: any
    Update: any
  }
  order_items: {
    Row: any
    Insert: any
    Update: any
  }
}

// Profile operations - using mock data for now
export const profiles = {
  // Get user profile
  async get(userId: string) {
    // Mock implementation
    return { data: null, error: null }
  },

  // Create user profile
  async create(profile: Tables['profiles']['Insert']) {
    // Mock implementation
    return { data: profile, error: null }
  },

  // Update user profile
  async update(userId: string, updates: Tables['profiles']['Update']) {
    // Mock implementation
    return { data: updates, error: null }
  },

  // Delete user profile
  async delete(userId: string) {
    // Mock implementation
    return { error: null }
  },
}

// Sample product data for development
const sampleProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    image_url: null,
    category: 'electronics',
    stock_quantity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
    price: 299.99,
    image_url: null,
    category: 'electronics',
    stock_quantity: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
    price: 29.99,
    image_url: null,
    category: 'fashion',
    stock_quantity: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with built-in AI assistant and premium sound.',
    price: 149.99,
    image_url: null,
    category: 'electronics',
    stock_quantity: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials with carrying strap.',
    price: 49.99,
    image_url: null,
    category: 'sports',
    stock_quantity: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic coffee mugs with unique designs.',
    price: 39.99,
    image_url: null,
    category: 'home',
    stock_quantity: 40,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 79.99,
    image_url: null,
    category: 'electronics',
    stock_quantity: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with RFID blocking technology and multiple card slots.',
    price: 89.99,
    image_url: null,
    category: 'fashion',
    stock_quantity: 35,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Product operations
export const products = {
  // Get all products with pagination
  async getAll(page = 1, limit = 20) {
    // For development, return sample data
    // In production, this would query the actual Supabase database
    const from = (page - 1) * limit
    const to = from + limit - 1
    const paginatedProducts = sampleProducts.slice(from, to + 1)
    
    return { 
      data: paginatedProducts, 
      error: null, 
      count: sampleProducts.length 
    }

    // Uncomment this when you have the database set up:
    /*
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false })

    return { data, error, count }
    */
  },

  // Get product by ID
  async getById(id: string) {
    // For development, return sample data
    const product = sampleProducts.find(p => p.id === id)
    return { data: product || null, error: product ? null : new Error('Product not found') }

    // Uncomment this when you have the database set up:
    /*
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
    */
  },

  // Search products
  async search(query: string, page = 1, limit = 20) {
    // For development, return filtered sample data
    const filteredProducts = sampleProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
    )
    
    const from = (page - 1) * limit
    const to = from + limit - 1
    const paginatedProducts = filteredProducts.slice(from, to + 1)
    
    return { 
      data: paginatedProducts, 
      error: null, 
      count: filteredProducts.length 
    }

    // Uncomment this when you have the database set up:
    /*
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .range(from, to)
      .order('created_at', { ascending: false })

    return { data, error, count }
    */
  },

  // Get products by category
  async getByCategory(category: string, page = 1, limit = 20) {
    // For development, return filtered sample data
    const filteredProducts = sampleProducts.filter(product => 
      product.category === category
    )
    
    const from = (page - 1) * limit
    const to = from + limit - 1
    const paginatedProducts = filteredProducts.slice(from, to + 1)
    
    return { 
      data: paginatedProducts, 
      error: null, 
      count: filteredProducts.length 
    }

    // Uncomment this when you have the database set up:
    /*
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('category', category)
      .range(from, to)
      .order('created_at', { ascending: false })

    return { data, error, count }
    */
  },

  // Create product (admin only) - using mock data for now
  async create(product: Tables['products']['Insert']) {
    // Mock implementation
    return { data: product, error: null }
  },

  // Update product (admin only) - using mock data for now
  async update(id: string, updates: Tables['products']['Update']) {
    // Mock implementation
    return { data: updates, error: null }
  },

  // Delete product (admin only) - using mock data for now
  async delete(id: string) {
    // Mock implementation
    return { error: null }
  },
}

// Order operations - using mock data for now
export const orders = {
  // Get user orders
  async getUserOrders(userId: string, page = 1, limit = 20) {
    // Mock implementation
    return { data: [], error: null, count: 0 }
  },

  // Get order by ID
  async getById(id: string) {
    // Mock implementation
    return { data: null, error: null }
  },

  // Create order
  async create(order: Tables['orders']['Insert']) {
    // Mock implementation
    return { data: order, error: null }
  },

  // Update order status
  async updateStatus(id: string, status: string) {
    // Mock implementation
    return { data: { id, status }, error: null }
  },
}

// Order items operations - using mock data for now
export const orderItems = {
  // Create order item
  async create(item: Tables['order_items']['Insert']) {
    // Mock implementation
    return { data: item, error: null }
  },

  // Get order items by order ID
  async getByOrderId(orderId: string) {
    // Mock implementation
    return { data: [], error: null }
  },
}

// Utility functions - using mock data for now
export const utils = {
  // Upload file to Supabase Storage
  async uploadFile(bucket: string, path: string, file: File) {
    // Mock implementation
    return { data: `https://example.com/${bucket}/${path}`, error: null }
  },

  // Delete file from Supabase Storage
  async deleteFile(bucket: string, path: string) {
    // Mock implementation
    return { error: null }
  },

  // Get file URL
  getFileUrl(bucket: string, path: string) {
    // Mock implementation
    return `https://example.com/${bucket}/${path}`
  },
}
