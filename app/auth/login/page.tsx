import Link from 'next/link'
import Container from '@/app/components/layout/Container'
import { Button } from '@/app/components/ui/button'
import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  async function action(formData: FormData) {
    'use server'
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    const { error } = await auth.signIn(email, password)
    if (error) {
      redirect(`/auth/login?error=${encodeURIComponent(error.message || 'Failed to sign in')}`)
    }
    redirect('/products')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-primary">NeuroBuy</Link>
            <Button variant="ghost" asChild>
              <Link href="/auth/signup">Create account</Link>
            </Button>
          </div>
        </Container>
      </header>

      <main className="section-padding">
        <Container>
          <div className="max-w-md mx-auto card p-6">
            <h1 className="text-2xl font-bold mb-2">Sign in</h1>
            <p className="text-muted-foreground mb-6">Access your account</p>
            <form action={action} className="space-y-4">
              <div>
                <label className="block text-sm mb-2" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <div>
                <label className="block text-sm mb-2" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required className="w-full px-3 py-2 border rounded-md bg-background" />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">
              Don&apos;t have an account? <Link className="text-primary" href="/auth/signup">Sign up</Link>
            </p>
          </div>
        </Container>
      </main>
    </div>
  )
}


