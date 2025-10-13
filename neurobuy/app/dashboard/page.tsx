'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/button'
import { Container } from '../components/layout/Container'
import { auth } from '../lib/auth'

interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  is_vendor: boolean
  store_id: string | null
}

interface Store {
  id: string
  name: string
  slug: string
  description: string | null
  owner: string
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get current user
        const { user } = await auth.getCurrentUser()
        if (!user) {
          router.push('/auth/login')
          return
        }
        setUser(user)

        // Get user profile
        const profileResponse = await fetch('/api/profiles')
        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          setProfile(profileData.profile)
        }

        // Get user's store if they're a vendor
        const storeResponse = await fetch(`/api/stores?owner=${user.id}`)
        if (storeResponse.ok) {
          const storeData = await storeResponse.json()
          if (storeData.stores && storeData.stores.length > 0) {
            setStore(storeData.stores[0])
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleSignOut = async () => {
    await auth.signOut()
    router.push('/')
  }

  if (loading) {
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
                {profile?.full_name || user?.user_metadata?.full_name || user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your account and store</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Section */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Name:</span>
                    <p className="text-sm">{profile?.full_name || user?.user_metadata?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Email:</span>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Phone:</span>
                    <p className="text-sm">{profile?.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Account Type:</span>
                    <p className="text-sm">
                      {profile?.is_vendor ? 'Vendor' : 'Customer'}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Edit Profile
                </Button>
              </div>

              {/* Store Section */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Store Management</h2>
                {store ? (
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Store Name:</span>
                      <p className="text-sm">{store.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Store URL:</span>
                      <p className="text-sm">neurobuy.com/store/{store.slug}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Description:</span>
                      <p className="text-sm">{store.description || 'No description'}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button asChild className="flex-1">
                        <Link href={`/store/${store.id}`}>Manage Store</Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1">
                        <Link href={`/products/create`}>Add Product</Link>
                      </Button>
                    </div>
                  </div>
                ) : profile?.is_vendor ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">You're marked as a vendor but don't have a store yet.</p>
                    <Button asChild>
                      <Link href="/store/create">Create Store</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">Create a store to start selling on NeuroBuy.</p>
                    <Button asChild>
                      <Link href="/store/create">Create Store</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/orders">View Orders</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
