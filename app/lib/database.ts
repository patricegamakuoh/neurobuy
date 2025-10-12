import { supabase } from './supabase/client'
import { Database } from './supabase/types'

type Tables = Database['public']['Tables']

// User operations - using mock data for now
export const users = {
  // Get user
  async get(userId: string) {
    // Mock implementation
    return { data: null, error: null }
  },

  // Create user
  async create(user: Tables['users']['Insert']) {
    // Mock implementation
    return { data: user, error: null }
  },

  // Update user
  async update(userId: string, updates: Tables['users']['Update']) {
    // Mock implementation
    return { data: updates, error: null }
  },

  // Delete user
  async delete(userId: string) {
    // Mock implementation
    return { error: null }
  },
}

// Sample product data for development
const sampleProducts = [
  {
    id: '1',
    vendor_id: 'vendor-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    currency: 'XAF',
    category: 'electronics',
    image_urls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    stock: 50,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    vendor_id: 'vendor-1',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
    price: 299.99,
    currency: 'XAF',
    category: 'electronics',
    image_urls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    vendor_id: 'vendor-2',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
    price: 29.99,
    currency: 'XAF',
    category: 'fashion',
    image_urls: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
    stock: 100,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    vendor_id: 'vendor-1',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with built-in AI assistant and premium sound.',
    price: 149.99,
    currency: 'XAF',
    category: 'electronics',
    image_urls: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'],
    stock: 30,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    vendor_id: 'vendor-3',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials with carrying strap.',
    price: 49.99,
    currency: 'XAF',
    category: 'sports',
    image_urls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop'],
    stock: 75,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    vendor_id: 'vendor-3',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic coffee mugs with unique designs.',
    price: 39.99,
    currency: 'XAF',
    category: 'home',
    image_urls: ['https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop'],
    stock: 40,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    vendor_id: 'vendor-1',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 79.99,
    currency: 'XAF',
    category: 'electronics',
    image_urls: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop'],
    stock: 60,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    vendor_id: 'vendor-2',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with RFID blocking technology and multiple card slots.',
    price: 89.99,
    currency: 'XAF',
    category: 'fashion',
    image_urls: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
    stock: 35,
    created_at: new Date().toISOString()
  }
]

// Product operations
export const products = {
  // Get all products with pagination
  async getAll(page = 1, limit = 20) {
    if (!supabase) {
      console.warn('Supabase not configured, using sample data')
      const from = (page - 1) * limit
      const to = from + limit - 1
      const paginatedProducts = sampleProducts.slice(from, to + 1)
      return { 
        data: paginatedProducts, 
        error: null, 
        count: sampleProducts.length 
      }
    }

    try {
      const from = (page - 1) * limit
      const to = from + limit - 1
      
      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase error, falling back to sample data:', error)
        // Fallback to sample data if Supabase fails
        const paginatedProducts = sampleProducts.slice(from, to + 1)
        return { 
          data: paginatedProducts, 
          error: null, 
          count: sampleProducts.length 
        }
      }

      return { data, error, count }
    } catch (err) {
      console.warn('Database connection failed, using sample data:', err)
      // Fallback to sample data
      const from = (page - 1) * limit
      const to = from + limit - 1
      const paginatedProducts = sampleProducts.slice(from, to + 1)
      return { 
        data: paginatedProducts, 
        error: null, 
        count: sampleProducts.length 
      }
    }
  },

  // Get product by ID
  async getById(id: string) {
    if (!supabase) {
      console.warn('Supabase not configured, using sample data')
      const product = sampleProducts.find(p => p.id === id)
      return { data: product || null, error: product ? null : new Error('Product not found') }
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.warn('Supabase error, falling back to sample data:', error)
        // Fallback to sample data
        const product = sampleProducts.find(p => p.id === id)
        return { data: product || null, error: product ? null : new Error('Product not found') }
      }

      return { data, error }
    } catch (err) {
      console.warn('Database connection failed, using sample data:', err)
      // Fallback to sample data
      const product = sampleProducts.find(p => p.id === id)
      return { data: product || null, error: product ? null : new Error('Product not found') }
    }
  },

  // Search products
  async search(query: string, page = 1, limit = 20) {
    if (!supabase) {
      console.warn('Supabase not configured, using sample data')
      const filteredProducts = sampleProducts.filter(product => 
        product.name?.toLowerCase().includes(query.toLowerCase()) ||
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
    }

    try {
      const from = (page - 1) * limit
      const to = from + limit - 1
      
      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .range(from, to)
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase error, falling back to sample data:', error)
        // Fallback to sample data
        const filteredProducts = sampleProducts.filter(product => 
          product.name?.toLowerCase().includes(query.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
        )
        const paginatedProducts = filteredProducts.slice(from, to + 1)
        return { 
          data: paginatedProducts, 
          error: null, 
          count: filteredProducts.length 
        }
      }

      return { data, error, count }
    } catch (err) {
      console.warn('Database connection failed, using sample data:', err)
      // Fallback to sample data
      const filteredProducts = sampleProducts.filter(product => 
        product.name?.toLowerCase().includes(query.toLowerCase()) ||
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
    }
  },

  // Get products by category
  async getByCategory(category: string, page = 1, limit = 20) {
    if (!supabase) {
      console.warn('Supabase not configured, using sample data')
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
    }

    try {
      const from = (page - 1) * limit
      const to = from + limit - 1
      
      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('category', category)
        .range(from, to)
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase error, falling back to sample data:', error)
        // Fallback to sample data
        const filteredProducts = sampleProducts.filter(product => 
          product.category === category
        )
        const paginatedProducts = filteredProducts.slice(from, to + 1)
        return { 
          data: paginatedProducts, 
          error: null, 
          count: filteredProducts.length 
        }
      }

      return { data, error, count }
    } catch (err) {
      console.warn('Database connection failed, using sample data:', err)
      // Fallback to sample data
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
    }
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
