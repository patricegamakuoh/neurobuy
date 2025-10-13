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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          is_vendor: boolean
          store_id: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          is_vendor?: boolean
          store_id?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          is_vendor?: boolean
          store_id?: string | null
        }
      }
      stores: {
        Row: {
          id: string
          owner: string | null
          name: string
          slug: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          owner?: string | null
          name: string
          slug?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          owner?: string | null
          name?: string
          slug?: string | null
          description?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          store_id: string | null
          title: string
          description: string | null
          price: number
          currency: string
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          store_id?: string | null
          title: string
          description?: string | null
          price: number
          currency?: string
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          store_id?: string | null
          title?: string
          description?: string | null
          price?: number
          currency?: string
          active?: boolean
          created_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string | null
          sku: string | null
          option_name: string | null
          price_override: number | null
          stock: number
          metadata: Json | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          sku?: string | null
          option_name?: string | null
          price_override?: number | null
          stock?: number
          metadata?: Json | null
        }
        Update: {
          id?: string
          product_id?: string | null
          sku?: string | null
          option_name?: string | null
          price_override?: number | null
          stock?: number
          metadata?: Json | null
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string | null
          storage_path: string | null
          order: number
        }
        Insert: {
          id?: string
          product_id?: string | null
          storage_path?: string | null
          order?: number
        }
        Update: {
          id?: string
          product_id?: string | null
          storage_path?: string | null
          order?: number
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          store_id: string | null
          total: number
          currency: string
          status: string
          shipping_info: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          store_id?: string | null
          total: number
          currency?: string
          status?: string
          shipping_info?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          store_id?: string | null
          total?: number
          currency?: string
          status?: string
          shipping_info?: Json | null
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          variant_id: string | null
          unit_price: number | null
          quantity: number | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          variant_id?: string | null
          unit_price?: number | null
          quantity?: number | null
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          variant_id?: string | null
          unit_price?: number | null
          quantity?: number | null
        }
      }
      product_requests: {
        Row: {
          id: string
          requester_id: string | null
          description: string | null
          product_link: string | null
          budget: number | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          requester_id?: string | null
          description?: string | null
          product_link?: string | null
          budget?: number | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          requester_id?: string | null
          description?: string | null
          product_link?: string | null
          budget?: number | null
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
