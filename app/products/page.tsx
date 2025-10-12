import { Suspense } from 'react'
import Container from '../components/layout/Container'
import ProductGrid from '../components/ProductGrid'
import { Button } from '../components/ui/button'
import Link from 'next/link'

interface ProductsPageProps {
  searchParams: {
    category?: string
    search?: string
    page?: string
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search } = searchParams

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
              <Link href="/products" className="text-foreground font-medium">Products</Link>
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
          {/* Page Header */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Products</span>
            </nav>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {search ? `Search Results for "${search}"` : 
               category ? `${category} Products` : 
               'All Products'}
            </h1>
            
            <p className="text-muted-foreground">
              {search ? `Found products matching your search` :
               category ? `Browse our collection of ${category.toLowerCase()} products` :
               'Discover our complete collection of products'}
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 p-6 bg-card rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search for products..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  defaultValue={search || ''}
                />
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  defaultValue={category || ''}
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports</option>
                  <option value="books">Books</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-foreground mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" size="sm">
                Clear Filters
              </Button>
              <div className="text-sm text-muted-foreground">
                Showing results for your search
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
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
          }>
            <ProductGrid 
              category={category} 
              searchQuery={search}
              limit={20}
              showLoadMore={true}
            />
          </Suspense>
        </Container>
      </main>
    </div>
  )
}
