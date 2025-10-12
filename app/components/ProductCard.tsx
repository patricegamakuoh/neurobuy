'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  stock_quantity: number
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = async () => {
    if (!onAddToCart) return
    
    setIsAdding(true)
    try {
      await onAddToCart(product.id)
    } finally {
      setIsAdding(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const isOutOfStock = product.stock_quantity <= 0

  return (
    <div className="card group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
          {product.image_url && !imageError ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl opacity-20">📦</div>
            </div>
          )}
          
          {/* Stock indicator */}
          {isOutOfStock && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
          
          {/* Category badge */}
          {product.category && (
            <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          
          {!isOutOfStock && (
            <span className="text-xs text-muted-foreground">
              {product.stock_quantity} in stock
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link 
            href={`/products/${product.id}`}
            className="btn btn-outline btn-sm flex-1"
          >
            View Details
          </Link>
          
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            className="btn btn-primary btn-sm flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </div>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
