import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import Container from '../../components/layout/Container'
import { products } from '../../lib/database'
import { Metadata } from 'next'

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { data: product } = await products.getById(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - NeuroBuy`,
    description: product.description || `Shop ${product.name} at NeuroBuy`,
    openGraph: {
      title: product.name,
      description: product.description || `Shop ${product.name} at NeuroBuy`,
      images: product.image_url ? [product.image_url] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data: product, error } = await products.getById(params.id)

  if (error || !product) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const isOutOfStock = product.stock_quantity <= 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-bold text-primary">NeuroBuy</span>
            </Link>
            <nav className="hidden sm:flex gap-6">
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="section-padding">
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-8xl opacity-20">📦</div>
                  </div>
                )}
              </div>
              
              {/* Image gallery placeholder */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-2xl opacity-40">📷</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Category and Stock */}
              <div className="flex items-center justify-between">
                {product.category && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                )}
                {isOutOfStock ? (
                  <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    In Stock ({product.stock_quantity} available)
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Key Features:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    High-quality materials and construction
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Fast and reliable shipping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    30-day money-back guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    24/7 customer support
                  </li>
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="font-medium text-foreground">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    className="border border-input rounded-md px-3 py-2 bg-background text-foreground"
                    defaultValue="1"
                  >
                    {Array.from({ length: Math.min(product.stock_quantity, 10) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={isOutOfStock}
                  >
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    disabled={isOutOfStock}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>🚚</span>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>↩️</span>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder for related products */}
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="card p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl opacity-40">📦</span>
                  </div>
                  <h3 className="font-semibold mb-2">Related Product {index}</h3>
                  <p className="text-muted-foreground text-sm mb-3">Product description</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">$99.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
