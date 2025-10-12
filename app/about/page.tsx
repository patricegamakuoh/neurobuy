import Container from '../components/layout/Container'
import { Button } from '../components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
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
              <Link href="/about" className="text-foreground font-medium">About</Link>
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
            <span className="text-foreground">About</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About NeuroBuy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing e-commerce with AI-powered recommendations and seamless shopping experiences.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At NeuroBuy, we believe shopping should be intelligent, personalized, and effortless. 
                Our AI-driven platform learns from your preferences to recommend products you'll love, 
                making every purchase decision easier and more satisfying.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to providing a seamless shopping experience that combines cutting-edge 
                technology with exceptional customer service, ensuring you find exactly what you need, 
                when you need it.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 flex items-center justify-center">
              <div className="text-8xl opacity-20">🧠</div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Precision</h3>
                <p className="text-muted-foreground">
                  We use advanced AI algorithms to deliver highly accurate product recommendations tailored to your unique preferences.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Speed</h3>
                <p className="text-muted-foreground">
                  Our platform is built for speed, ensuring lightning-fast page loads and instant search results.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Security</h3>
                <p className="text-muted-foreground">
                  Your data and transactions are protected with enterprise-grade security measures and encryption.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Sarah Chen", role: "CEO & Founder", avatar: "👩‍💼" },
                { name: "Marcus Johnson", role: "CTO", avatar: "👨‍💻" },
                { name: "Elena Rodriguez", role: "Head of AI", avatar: "👩‍🔬" },
                { name: "David Kim", role: "Lead Developer", avatar: "👨‍💻" },
                { name: "Amanda Foster", role: "UX Designer", avatar: "👩‍🎨" },
                { name: "James Wilson", role: "Marketing Director", avatar: "👨‍💼" }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Experience the Future?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered the power of AI-driven shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
