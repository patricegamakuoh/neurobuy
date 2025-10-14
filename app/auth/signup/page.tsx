import Link from 'next/link'
import Container from '@/app/components/layout/Container'
import { Button } from '@/app/components/ui/button'
import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'

export default function SignupPage() {
  async function action(formData: FormData) {
    'use server'
    const fullName = String(formData.get('full_name') || '')
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    const { error } = await auth.signUp(email, password, fullName)
    if (!error) {
      redirect('/products')
    }
    return { error: error?.message || 'Failed to sign up' }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-primary">NeuroBuy</Link>
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </Container>
      </header>

      <main className="section-padding">
        <Container>
          <div className="max-w-md mx-auto card p-6">
            <h1 className="text-2xl font-bold mb-2">Create account</h1>
            <p className="text-muted-foreground mb-6">Join NeuroBuy</p>
            <form action={action} className="space-y-4">
              <div>
                <label className="block text-sm mb-2" htmlFor="full_name">Full name</label>
                <input id="full_name" name="full_name" required className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <div>
                <label className="block text-sm mb-2" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <div>
                <label className="block text-sm mb-2" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <Button type="submit" className="w-full">Get Started</Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">
              Already have an account? <Link className="text-primary" href="/auth/login">Sign in</Link>
            </p>
          </div>
        </Container>
      </main>
    </div>
  )
}


