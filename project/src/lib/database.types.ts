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
          role: 'buyer' | 'seller' | 'admin'
          email: string
          first_name: string
          last_name: string
          mobile: string | null
          business_name: string | null
          business_type: 'individual' | 'small_business' | 'medium_business' | 'large_business' | null
          business_address: string | null
          business_license: string | null
          tax_id: string | null
          industry: string | null
          verification_status: 'pending' | 'under_review' | 'approved' | 'requires_more_info'
          profile_completion: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          role: 'buyer' | 'seller' | 'admin'
          email: string
          first_name: string
          last_name: string
          mobile?: string | null
          business_name?: string | null
          business_type?: 'individual' | 'small_business' | 'medium_business' | 'large_business' | null
          business_address?: string | null
          business_license?: string | null
          tax_id?: string | null
          industry?: string | null
          verification_status?: 'pending' | 'under_review' | 'approved' | 'requires_more_info'
          profile_completion?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'buyer' | 'seller' | 'admin'
          email?: string
          first_name?: string
          last_name?: string
          mobile?: string | null
          business_name?: string | null
          business_type?: 'individual' | 'small_business' | 'medium_business' | 'large_business' | null
          business_address?: string | null
          business_license?: string | null
          tax_id?: string | null
          industry?: string | null
          verification_status?: 'pending' | 'under_review' | 'approved' | 'requires_more_info'
          profile_completion?: number
          created_at?: string
          updated_at?: string
        }
      }
      materials: {
        Row: {
          id: string
          seller_id: string
          name: string
          category: string
          description: string | null
          price: number
          unit: string
          stock: number
          min_order: number
          specifications: Json
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          name: string
          category: string
          description?: string | null
          price: number
          unit: string
          stock?: number
          min_order?: number
          specifications?: Json
          images?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          name?: string
          category?: string
          description?: string | null
          price?: number
          unit?: string
          stock?: number
          min_order?: number
          specifications?: Json
          images?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          buyer_id: string | null
          seller_id: string | null
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_address: string
          delivery_method: string
          delivery_fee: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          buyer_id?: string | null
          seller_id?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_address: string
          delivery_method: string
          delivery_fee?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          buyer_id?: string | null
          seller_id?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          delivery_address?: string
          delivery_method?: string
          delivery_fee?: number
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          material_id: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          material_id?: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          material_id?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
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
      user_role: 'buyer' | 'seller' | 'admin'
      business_type: 'individual' | 'small_business' | 'medium_business' | 'large_business'
      verification_status: 'pending' | 'under_review' | 'approved' | 'requires_more_info'
      order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    }
  }
}