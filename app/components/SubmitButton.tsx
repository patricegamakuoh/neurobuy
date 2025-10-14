'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../components/ui/button'

export default function SubmitButton({ idleText, pendingText, className }: { idleText: string; pendingText: string; className?: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className={className} disabled={pending}>
      {pending ? pendingText : idleText}
    </Button>
  )
}


