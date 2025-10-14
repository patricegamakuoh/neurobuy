import Container from './components/layout/Container';
import Grid from './components/layout/Grid';
import Flex from './components/layout/Flex';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <Container>
          <Flex justify="between" align="center" className="py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">NeuroBuy</h1>
            </div>
            <nav className="hidden sm:flex gap-6">
              <a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</a>
              <a href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</a>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/auth/login" className="btn btn-ghost btn-sm">Sign In</a>
              <a href="/auth/signup" className="btn btn-primary btn-sm">Get Started</a>
            </div>
          </Flex>
        </Container>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose NeuroBuy?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of online shopping with our cutting-edge features
            </p>
          </div>
          
          <Grid cols={3} gap="lg" responsive>
            <div className="card p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">AI Recommendations</h4>
              <p className="text-muted-foreground">
                Get personalized product suggestions based on your browsing history and preferences.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
              <p className="text-muted-foreground">
                Optimized performance ensures your shopping experience is smooth and responsive.
              </p>
            </div>

            <div className="card p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure Shopping</h4>
              <p className="text-muted-foreground">
                Your data and transactions are protected with enterprise-grade security measures.
              </p>
            </div>
          </Grid>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Featured Products</h3>
            <p className="text-muted-foreground">Discover our most popular items</p>
          </div>
          
          <ProductGrid limit={8} showLoadMore={false} />
          
          <div className="text-center mt-12">
            <a href="/products" className="btn btn-primary btn-lg">
              View All Products
            </a>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience the Future of Shopping?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers who have discovered their perfect products with NeuroBuy.
            </p>
            <Flex justify="center" gap="md" className="flex-col sm:flex-row">
              <a href="/products" className="btn bg-white text-primary hover:bg-white/90 btn-lg">
                Start Shopping Now
              </a>
              <a href="/about" className="btn border-white text-white hover:bg-white hover:text-primary btn-lg">
                Learn More
              </a>
            </Flex>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
