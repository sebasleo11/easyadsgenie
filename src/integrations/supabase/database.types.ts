
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
      assistant_responses: {
        Row: {
          id: string
          category: string
          mode: string
          tone: string
          trigger_point: string
          response_text: string
          created_at: string | null
        }
        Insert: {
          id?: string
          category: string
          mode: string
          tone: string
          trigger_point: string
          response_text: string
          created_at?: string | null
        }
        Update: {
          id?: string
          category?: string
          mode?: string
          tone?: string
          trigger_point?: string
          response_text?: string
          created_at?: string | null
        }
      }
      n8n_webhooks: {
        Row: {
          id: string
          user_id: string | null
          webhook_name: string
          webhook_url: string
          webhook_type: string
          is_active: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          webhook_name: string
          webhook_url: string
          webhook_type: string
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          webhook_name?: string
          webhook_url?: string
          webhook_type?: string
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string | null
          assistant_mode: string
          assistant_tone: string
          assistant_enabled: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          assistant_mode?: string
          assistant_tone?: string
          assistant_enabled?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          assistant_mode?: string
          assistant_tone?: string
          assistant_enabled?: boolean
          created_at?: string | null
          updated_at?: string | null
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
