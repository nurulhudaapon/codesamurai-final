export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      landfill: {
        Row: {
          capacity_tonnes: number
          closes_at: string
          created_at: string
          created_by_user_id: string
          id: string
          latitude: number
          longitude: number
          name: string
          opens_at: string
          updated_at: string
        }
        Insert: {
          capacity_tonnes: number
          closes_at: string
          created_at?: string
          created_by_user_id: string
          id: string
          latitude: number
          longitude: number
          name: string
          opens_at: string
          updated_at?: string
        }
        Update: {
          capacity_tonnes?: number
          closes_at?: string
          created_at?: string
          created_by_user_id?: string
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          opens_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "landfill_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      permission: {
        Row: {
          created_at: string
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      role: {
        Row: {
          created_at: string
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      role_permission: {
        Row: {
          created_at: string
          id: string
          permission_id: string
          role_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          permission_id: string
          role_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          permission_id?: string
          role_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permission_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permission"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permission_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
        ]
      }
      sts: {
        Row: {
          capacity_tonnes: number
          created_at: string
          created_by_user_id: string
          id: string
          latitude: number
          longitude: number
          manager_id: string
          name: string
          updated_at: string
          ward_number: string
        }
        Insert: {
          capacity_tonnes: number
          created_at?: string
          created_by_user_id: string
          id: string
          latitude: number
          longitude: number
          manager_id: string
          name: string
          updated_at?: string
          ward_number: string
        }
        Update: {
          capacity_tonnes?: number
          created_at?: string
          created_by_user_id?: string
          id?: string
          latitude?: number
          longitude?: number
          manager_id?: string
          name?: string
          updated_at?: string
          ward_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "sts_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      transportation: {
        Row: {
          arrival_time: string | null
          created_at: string
          created_by_user_id: string
          departure_time: string | null
          distance: number
          id: string
          landfill_id: string | null
          location_type:
            | Database["public"]["Enums"]["transportation_location_type"]
            | null
          padding: boolean
          sts_id: string | null
          updated_at: string
          vehicle_id: string
          volume: number
        }
        Insert: {
          arrival_time?: string | null
          created_at?: string
          created_by_user_id: string
          departure_time?: string | null
          distance: number
          id: string
          landfill_id?: string | null
          location_type?:
            | Database["public"]["Enums"]["transportation_location_type"]
            | null
          padding: boolean
          sts_id?: string | null
          updated_at?: string
          vehicle_id: string
          volume: number
        }
        Update: {
          arrival_time?: string | null
          created_at?: string
          created_by_user_id?: string
          departure_time?: string | null
          distance?: number
          id?: string
          landfill_id?: string | null
          location_type?:
            | Database["public"]["Enums"]["transportation_location_type"]
            | null
          padding?: boolean
          sts_id?: string | null
          updated_at?: string
          vehicle_id?: string
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "transportation_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportation_landfill_id_fkey"
            columns: ["landfill_id"]
            isOneToOne: false
            referencedRelation: "landfill"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportation_sts_id_fkey"
            columns: ["sts_id"]
            isOneToOne: false
            referencedRelation: "sts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportation_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_login_at: string | null
          last_name: string | null
          password: string | null
          phone: string
          role_id: string | null
          state: Database["public"]["Enums"]["user_state"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_login_at?: string | null
          last_name?: string | null
          password?: string | null
          phone: string
          role_id?: string | null
          state?: Database["public"]["Enums"]["user_state"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_login_at?: string | null
          last_name?: string | null
          password?: string | null
          phone?: string
          role_id?: string | null
          state?: Database["public"]["Enums"]["user_state"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle: {
        Row: {
          capacity: Database["public"]["Enums"]["vehicle_capacity"]
          created_at: string
          created_by_user_id: string
          id: string
          loaded_cost: number | null
          number: string
          sts_id: string
          type: Database["public"]["Enums"]["vehicle_type"]
          unloaded_cost: number | null
          updated_at: string
        }
        Insert: {
          capacity: Database["public"]["Enums"]["vehicle_capacity"]
          created_at?: string
          created_by_user_id: string
          id: string
          loaded_cost?: number | null
          number: string
          sts_id: string
          type: Database["public"]["Enums"]["vehicle_type"]
          unloaded_cost?: number | null
          updated_at?: string
        }
        Update: {
          capacity?: Database["public"]["Enums"]["vehicle_capacity"]
          created_at?: string
          created_by_user_id?: string
          id?: string
          loaded_cost?: number | null
          number?: string
          sts_id?: string
          type?: Database["public"]["Enums"]["vehicle_type"]
          unloaded_cost?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_sts_id_fkey"
            columns: ["sts_id"]
            isOneToOne: false
            referencedRelation: "sts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      distance: {
        Args: {
          lat1: number
          lon1: number
          lat2: number
          lon2: number
        }
        Returns: number
      }
    }
    Enums: {
      transportation_location_type: "sts" | "landfill"
      user_state: "active" | "inactive"
      vehicle_capacity: "three_ton" | "five_ton" | "seven_ton" | "fifteen_ton"
      vehicle_type:
        | "open_truck"
        | "dump_truck"
        | "compactor"
        | "container_carrier"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

