'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export default function SupabaseTestPage() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.from('products').select('id').limit(1)
      if (error) setError(error.message)
      else setResult(data)
    }
    run()
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-4">Supabase Client Probe</h1>
      <pre className="p-4 border rounded bg-card text-sm overflow-auto">
        {error ? `Error: ${error}` : JSON.stringify(result, null, 2)}
      </pre>
    </div>
  )
}


