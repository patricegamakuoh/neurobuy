import Link from 'next/link'
import { Button } from './components/ui/button'
import { Container } from './components/layout/Container'
import { ProductGrid } from './components/ProductGrid'
import { Footer } from './components/Footer'

export default function HomePage() {
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
            
            <nav className="hidden md:flex gap-6">
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <Link href="/stores" className="text-muted-foreground hover:text-foreground transition-colors">
                Stores
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to NeuroBuy
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate multi-vendor e-commerce platform. Shop from local stores, request products from China, and discover amazing deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/store/create">Open Store</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose NeuroBuy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of e-commerce with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Vendor Platform</h3>
              <p className="text-muted-foreground">
                Shop from multiple stores in one place. Each vendor manages their own products and orders.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">China Sourcing</h3>
              <p className="text-muted-foreground">
                Request products from China. Our vendors can source and deliver products you can't find locally.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-muted-foreground">
                Lightning-fast shopping experience with secure payments and reliable delivery.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-muted/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">
              Discover amazing products from our vendors
            </p>
          </div>

          <ProductGrid limit={8} showLoadMore={false} />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <Container>
          <div className="card p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of vendors on NeuroBuy and start your online business today. 
              No setup fees, no monthly costs - just success.
            </p>
            <Button size="lg" asChild>
              <Link href="/store/create">Create Your Store</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
