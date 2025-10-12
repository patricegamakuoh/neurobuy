import { supabase } from './supabase/client'
import { createServerClient } from './supabase/server'
import { User } from '@supabase/supabase-js'

// Client-side authentication functions
export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string, fullName?: string) {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign in with Google
  async signInWithGoogle() {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    if (!supabase) {
      return { error: new Error('Supabase not configured') }
    }
    
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    if (!supabase) {
      return { user: null, error: new Error('Supabase not configured') }
    }
    
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  async getCurrentSession() {
    if (!supabase) {
      return { session: null, error: new Error('Supabase not configured') }
    }
    
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    if (!supabase) {
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
    
    return supabase.auth.onAuthStateChange(callback)
  },

  // Reset password
  async resetPassword(email: string) {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { data, error }
  },

  // Update password
  async updatePassword(password: string) {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    const { data, error } = await supabase.auth.updateUser({
      password,
    })
    return { data, error }
  },

  // Update user profile
  async updateProfile(updates: { full_name?: string; avatar_url?: string }) {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    })
    return { data, error }
  },
}

// Server-side authentication functions
export const serverAuth = {
  // Get user from server-side
  async getUser() {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session from server-side
  async getSession() {
    const supabase = createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },
}

// Helper function to check if user is authenticated
export const isAuthenticated = (user: User | null): boolean => {
  return user !== null && user !== undefined
}

// Helper function to get user display name
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'Guest'
  
  // Try to get name from user metadata first
  const fullName = user.user_metadata?.full_name
  if (fullName) return fullName
  
  // Fallback to email
  return user.email || 'User'
}

// Helper function to get user avatar
export const getUserAvatar = (user: User | null): string | null => {
  if (!user) return null
  
  // Try to get avatar from user metadata
  const avatarUrl = user.user_metadata?.avatar_url
  if (avatarUrl) return avatarUrl
  
  // Fallback to Gravatar or default avatar
  return null
}
