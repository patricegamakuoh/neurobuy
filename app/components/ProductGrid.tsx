'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { products } from '../lib/database'
import { Button } from './ui/button'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  stock_quantity: number
}

interface ProductGridProps {
  category?: string
  searchQuery?: string
  limit?: number
  showLoadMore?: boolean
}

export default function ProductGrid({ 
  category, 
  searchQuery, 
  limit = 12, 
  showLoadMore = true 
}: ProductGridProps) {
  const [productList, setProductList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchProducts = async (pageNum: number, reset = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true)
        setError(null)
      } else {
        setLoadingMore(true)
      }

      let result
      
      if (searchQuery) {
        result = await products.search(searchQuery, pageNum, limit)
      } else if (category) {
        result = await products.getByCategory(category, pageNum, limit)
      } else {
        result = await products.getAll(pageNum, limit)
      }

      if (result.error) {
        throw new Error(typeof result.error === 'string' ? result.error : 'Failed to fetch products')
      }

      const newProducts = result.data || []
      
      if (reset || pageNum === 1) {
        setProductList(newProducts)
      } else {
        setProductList(prev => [...prev, ...newProducts])
      }

      setHasMore(newProducts.length === limit)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    setPage(1)
    fetchProducts(1, true)
  }, [category, searchQuery])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchProducts(nextPage)
  }

  const handleAddToCart = async (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Adding product to cart:', productId)
    // You can integrate with your cart state management here
  }

  if (loading) {
    return (
      <div className="container section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-6 bg-muted rounded w-1/3" />
                <div className="h-8 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container section-padding">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => fetchProducts(1, true)}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (productList.length === 0) {
    return (
      <div className="container section-padding">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? `No products match "${searchQuery}"`
              : category 
                ? `No products in "${category}" category`
                : 'No products available at the moment'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container section-padding">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center mt-12">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="outline"
            size="lg"
          >
            {loadingMore ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            ) : (
              'Load More Products'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
