export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          role: 'customer' | 'vendor' | 'admin'
          address: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name?: string | null
          email?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          address?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          address?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      vendors: {
        Row: {
          id: string
          owner_id: string
          store_name: string | null
          description: string | null
          logo_url: string | null
          rating: number
          status: string
          joined_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          store_name?: string | null
          description?: string | null
          logo_url?: string | null
          rating?: number
          status?: string
          joined_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          store_name?: string | null
          description?: string | null
          logo_url?: string | null
          rating?: number
          status?: string
          joined_at?: string
        }
      }
      products: {
        Row: {
          id: string
          vendor_id: string
          name: string | null
          category: string | null
          description: string | null
          price: number | null
          currency: string
          stock: number
          image_urls: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          name?: string | null
          category?: string | null
          description?: string | null
          price?: number | null
          currency?: string
          stock?: number
          image_urls?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          name?: string | null
          category?: string | null
          description?: string | null
          price?: number | null
          currency?: string
          stock?: number
          image_urls?: string[] | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          vendor_id: string
          total_amount: number | null
          payment_status: string
          logistics_tracking: string | null
          shipping_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vendor_id: string
          total_amount?: number | null
          payment_status?: string
          logistics_tracking?: string | null
          shipping_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vendor_id?: string
          total_amount?: number | null
          payment_status?: string
          logistics_tracking?: string | null
          shipping_address?: string | null
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price?: number | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number | null
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          user_id: string
          amount: number | null
          currency: string
          method: string | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          user_id: string
          amount?: number | null
          currency?: string
          method?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          user_id?: string
          amount?: number | null
          currency?: string
          method?: string | null
          status?: string | null
          created_at?: string
        }
      }
      requests: {
        Row: {
          id: string
          user_id: string
          product_link: string | null
          details: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_link?: string | null
          details?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_link?: string | null
          details?: string | null
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}