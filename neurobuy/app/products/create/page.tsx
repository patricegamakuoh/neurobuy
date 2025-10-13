'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/button'
import { Container } from '../../components/layout/Container'
import { ImageUpload } from '../../components/ImageUpload'
import { auth } from '../../lib/auth'

interface Store {
  id: string
  name: string
  slug: string
  owner: string
}

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'XAF',
    active: true
  })
  const [productImages, setProductImages] = useState<string[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { user } = await auth.getCurrentUser()
        if (!user) {
          router.push('/auth/login')
          return
        }
        setUser(user)

        // Load user's stores
        const response = await fetch(`/api/stores?owner=${user.id}`)
        if (response.ok) {
          const data = await response.json()
          setStores(data.stores || [])
          if (data.stores && data.stores.length > 0) {
            setSelectedStoreId(data.stores[0].id)
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }

    loadUserData()
  }, [])

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!user) {
      setError('You must be logged in to create a product')
      setLoading(false)
      return
    }

    if (!selectedStoreId) {
      setError('Please select a store')
      setLoading(false)
      return
    }

    if (productImages.length === 0) {
      setError('Please upload at least one product image')
      setLoading(false)
      return
    }

    try {
      // Create product
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          store_id: selectedStoreId,
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          currency: formData.currency,
          active: formData.active
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product')
      }

      // Create product images
      for (const imageUrl of productImages) {
        await fetch('/api/product-images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: data.product.id,
            storage_path: imageUrl,
            order: productImages.indexOf(imageUrl)
          })
        })
      }

      // Redirect to product page or dashboard
      router.push(`/products/${data.product.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImagesUploaded = (urls: string[]) => {
    setProductImages(prev => [...prev, ...urls])
  }

  const handleUploadError = (error: string) => {
    setError(error)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.user_metadata?.full_name || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={() => auth.signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="section-padding">
        <Container className="max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
            <p className="text-muted-foreground">Create a new product for your store</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Store Selection */}
              <div>
                <label htmlFor="store" className="block text-sm font-medium mb-2">
                  Store *
                </label>
                <select
                  id="store"
                  name="store"
                  value={selectedStoreId}
                  onChange={(e) => setSelectedStoreId(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select a store</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Product Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Wireless Bluetooth Headphones"
                  required
                />
              </div>

              {/* Product Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your product..."
                />
              </div>

              {/* Price and Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-2">
                    Price *
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium mb-2">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="XAF">XAF (CFA Franc)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>
              </div>

              {/* Product Images */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Images *
                </label>
                <ImageUpload
                  bucket="PRODUCT_IMAGES"
                  onUploadComplete={handleImagesUploaded}
                  onUploadError={handleUploadError}
                  maxFiles={5}
                  maxSizeInMB={5}
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2">
                <input
                  id="active"
                  name="active"
                  type="checkbox"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="rounded border-input"
                />
                <label htmlFor="active" className="text-sm font-medium">
                  Product is active (visible to customers)
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Creating Product...' : 'Create Product'}
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </div>
  )
}
