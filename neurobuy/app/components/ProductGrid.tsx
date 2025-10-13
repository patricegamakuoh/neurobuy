'use client'

import { useState, useEffect } from 'react'
import { Container } from './layout/Container'
import { Button } from './ui/button'

interface Product {
  id: string
  store_id: string | null
  title: string
  description: string | null
  price: number
  currency: string
  active: boolean
  created_at: string
}

interface ProductGridProps {
  category?: string
  searchQuery?: string
  limit?: number
  showLoadMore?: boolean
}

export function ProductGrid({ category, searchQuery, limit = 8, showLoadMore = true }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // For now, we'll show a message that products are coming soon
        // In a real implementation, this would fetch from the API
        setProducts([])
      } catch (err) {
        setError('Failed to fetch products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, searchQuery, limit])

  if (loading) {
    return (
      <Container>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading products...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-destructive">{error}</p>
        </div>
      </Container>
    )
  }

  if (products.length === 0) {
    return (
      <Container>
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-20">📦</div>
          <h3 className="text-xl font-semibold mb-2">No Products Yet</h3>
          <p className="text-muted-foreground mb-6">
            Products will appear here once vendors start adding them to their stores.
          </p>
          <Button asChild>
            <a href="/products/create">Add Your First Product</a>
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card p-4">
            <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl opacity-20">📦</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            {product.description && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.currency === 'XAF' ? 'XAF' : 'USD'
                }).format(product.price)}
              </span>
              <Button size="sm">View Details</Button>
            </div>
          </div>
        ))}
      </div>

      {showLoadMore && products.length >= limit && (
        <div className="text-center mt-8">
          <Button variant="outline">Load More Products</Button>
        </div>
      )}
    </Container>
  )
}
