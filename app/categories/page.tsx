import Container from '../components/layout/Container'
import { Button } from '../components/ui/button'
import Link from 'next/link'

export default function CategoriesPage() {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Cutting-edge technology and gadgets',
      icon: '📱',
      productCount: 1250,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Trendy clothing and accessories',
      icon: '👗',
      productCount: 890,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      description: 'Everything for your home and garden',
      icon: '🏠',
      productCount: 650,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      description: 'Gear for active lifestyles',
      icon: '⚽',
      productCount: 420,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
    },
    {
      id: 'books',
      name: 'Books & Media',
      description: 'Books, movies, and digital content',
      icon: '📚',
      productCount: 1200,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop'
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      description: 'Personal care and wellness products',
      icon: '💄',
      productCount: 580,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      description: 'Car parts and accessories',
      icon: '🚗',
      productCount: 320,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'
    },
    {
      id: 'toys',
      name: 'Toys & Games',
      description: 'Fun for all ages',
      icon: '🧸',
      productCount: 450,
      image: 'https://images.unsplash.com/photo-1558060370-9e0b0d0b5b8c?w=600&h=400&fit=crop'
    }
  ]

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
              <Link href="/categories" className="text-foreground font-medium">Categories</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
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
            <span className="text-foreground">Categories</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Shop by Category
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our wide range of products organized by category. Find exactly what you're looking for with our AI-powered recommendations.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group block"
              >
                <div className="card overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                  {/* Category Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">
                        {category.icon}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-xs font-medium text-foreground">
                        {category.productCount} items
                      </span>
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Shop Now
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Featured Categories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">🔥</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Trending Now</h3>
                    <p className="text-muted-foreground">Most popular products this week</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Discover what's hot right now with our trending products. Updated daily based on customer preferences and market trends.
                </p>
                <Button asChild>
                  <Link href="/products?sort=trending">View Trending</Link>
                </Button>
              </div>

              <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">🆕</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">New Arrivals</h3>
                    <p className="text-muted-foreground">Fresh products just added</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Be the first to discover our latest products. New items are added daily across all categories.
                </p>
                <Button asChild>
                  <Link href="/products?sort=newest">View New Arrivals</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Search by Category */}
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Can't Find What You're Looking For?</h2>
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search for a specific category..."
                  className="flex-1 px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <Button size="lg">Search</Button>
              </div>
              <p className="text-center text-muted-foreground mt-4">
                Or browse our complete product catalog
              </p>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
