'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

type ToastVariant = 'default' | 'success' | 'error'

type Toast = {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
}

type ToastContextValue = {
  toast: (options: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <Toaster/>')
  return ctx
}

export function Toaster({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, ...options }])
    // Auto-dismiss after 3.5s
    setTimeout(() => remove(id), 3500)
  }, [remove])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[1000] space-y-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className={
              `min-w-[260px] max-w-sm rounded-md border p-3 shadow-lg bg-card text-foreground ` +
              (t.variant === 'success' ? 'border-green-400' : t.variant === 'error' ? 'border-red-400' : 'border-border')
            }
            role="status"
            aria-live="polite"
          >
            {t.title && <div className="font-semibold mb-1">{t.title}</div>}
            {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}


