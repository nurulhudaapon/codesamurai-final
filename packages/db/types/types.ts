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
      activity_log: {
        Row: {
          action: string
          id: number
          table_name: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: number
          table_name: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: number
          table_name?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blocked_words: {
        Row: {
          created_at: string
          id: string
          weight: number
          word: string
        }
        Insert: {
          created_at?: string
          id: string
          weight: number
          word: string
        }
        Update: {
          created_at?: string
          id?: string
          weight?: number
          word?: string
        }
        Relationships: []
      }
      contractor_company: {
        Row: {
          area_of_collection: string
          contact_number: string
          contract_duration: string
          contract_id: string
          id: string
          name: string
          payment_per_tonnage: number
          registration_date: string
          registration_id: string
          required_amount_per_day: number
          sts_id: string
          tin: string
          workforce_size: number
        }
        Insert: {
          area_of_collection: string
          contact_number: string
          contract_duration: string
          contract_id: string
          id: string
          name: string
          payment_per_tonnage: number
          registration_date: string
          registration_id: string
          required_amount_per_day: number
          sts_id: string
          tin: string
          workforce_size: number
        }
        Update: {
          area_of_collection?: string
          contact_number?: string
          contract_duration?: string
          contract_id?: string
          id?: string
          name?: string
          payment_per_tonnage?: number
          registration_date?: string
          registration_id?: string
          required_amount_per_day?: number
          sts_id?: string
          tin?: string
          workforce_size?: number
        }
        Relationships: [
          {
            foreignKeyName: "contractor_company_sts_id_fkey"
            columns: ["sts_id"]
            isOneToOne: false
            referencedRelation: "sts"
            referencedColumns: ["id"]
          },
        ]
      }
      issue: {
        Row: {
          attachments: string[] | null
          created_at: string
          created_by_user_id: string | null
          description: string
          id: string
          latitude: number | null
          longitude: number | null
          status: Database["public"]["Enums"]["issue_status"] | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string
          created_by_user_id?: string | null
          description: string
          id: string
          latitude?: number | null
          longitude?: number | null
          status?: Database["public"]["Enums"]["issue_status"] | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          created_at?: string
          created_by_user_id?: string | null
          description?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          status?: Database["public"]["Enums"]["issue_status"] | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
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
      notification: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id: string
          title: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_read: {
        Row: {
          id: string
          notification_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          id: string
          notification_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          id?: string
          notification_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_read_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_read_user_id_fkey"
            columns: ["user_id"]
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
      post: {
        Row: {
          attachments: string[] | null
          content: string
          created_at: string
          created_by_user_id: string | null
          flag_score: number | null
          id: string
          status: Database["public"]["Enums"]["post_status"] | null
          type: Database["public"]["Enums"]["post_type"]
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          created_at?: string
          created_by_user_id?: string | null
          flag_score?: number | null
          id: string
          status?: Database["public"]["Enums"]["post_status"] | null
          type: Database["public"]["Enums"]["post_type"]
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          created_at?: string
          created_by_user_id?: string | null
          flag_score?: number | null
          id?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          type?: Database["public"]["Enums"]["post_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
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
          contractor_id: string | null
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
          contractor_id?: string | null
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
          contractor_id?: string | null
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
            foreignKeyName: "transportation_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_company"
            referencedColumns: ["id"]
          },
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
      user_contractor_company: {
        Row: {
          contractor_company_id: string
          user_id: string
        }
        Insert: {
          contractor_company_id: string
          user_id: string
        }
        Update: {
          contractor_company_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_contractor_company_contractor_company_id_fkey"
            columns: ["contractor_company_id"]
            isOneToOne: false
            referencedRelation: "contractor_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_contractor_company_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user"
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
      workforce: {
        Row: {
          assigned_collection_route: string
          collection_route: string | null
          contact_information: string
          contractor_id: string
          dob: string
          full_name: string
          hired_at: string
          id: string
          job_title: string
          payment_rate: number
        }
        Insert: {
          assigned_collection_route: string
          collection_route?: string | null
          contact_information: string
          contractor_id: string
          dob: string
          full_name: string
          hired_at: string
          id: string
          job_title: string
          payment_rate: number
        }
        Update: {
          assigned_collection_route?: string
          collection_route?: string | null
          contact_information?: string
          contractor_id?: string
          dob?: string
          full_name?: string
          hired_at?: string
          id?: string
          job_title?: string
          payment_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "workforce_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_company"
            referencedColumns: ["id"]
          },
        ]
      }
      workforce_log: {
        Row: {
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          type: Database["public"]["Enums"]["workforce_log_type"]
          updated_at: string
          workforce_id: string
        }
        Insert: {
          created_at?: string
          id: string
          latitude?: number | null
          longitude?: number | null
          type: Database["public"]["Enums"]["workforce_log_type"]
          updated_at?: string
          workforce_id: string
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          type?: Database["public"]["Enums"]["workforce_log_type"]
          updated_at?: string
          workforce_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workforce_log_workforce_id_fkey"
            columns: ["workforce_id"]
            isOneToOne: false
            referencedRelation: "workforce"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      algorithm_sign: {
        Args: {
          signables: string
          secret: string
          algorithm: string
        }
        Returns: string
      }
      armor: {
        Args: {
          "": string
        }
        Returns: string
      }
      dearmor: {
        Args: {
          "": string
        }
        Returns: string
      }
      distance: {
        Args: {
          lat1: number
          lon1: number
          lat2: number
          lon2: number
        }
        Returns: number
      }
      gen_random_bytes: {
        Args: {
          "": number
        }
        Returns: string
      }
      gen_random_uuid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      gen_salt: {
        Args: {
          "": string
        }
        Returns: string
      }
      login: {
        Args: {
          email: string
          pass: string
        }
        Returns: Database["public"]["CompositeTypes"]["jwt_token"]
      }
      pgp_armor_headers: {
        Args: {
          "": string
        }
        Returns: Record<string, unknown>[]
      }
      pgp_key_id: {
        Args: {
          "": string
        }
        Returns: string
      }
      sign: {
        Args: {
          payload: Json
          secret: string
          algorithm?: string
        }
        Returns: string
      }
      url_decode: {
        Args: {
          data: string
        }
        Returns: string
      }
      url_encode: {
        Args: {
          data: string
        }
        Returns: string
      }
      user_role: {
        Args: {
          email: string
          pass: string
        }
        Returns: unknown
      }
      verify: {
        Args: {
          token: string
          secret: string
          algorithm?: string
        }
        Returns: {
          header: Json
          payload: Json
          valid: boolean
        }[]
      }
    }
    Enums: {
      issue_status: "reported" | "reviewed" | "resolved" | "flagged"
      post_status: "published" | "draft" | "spam" | "inappropriate"
      post_type: "event" | "announcement" | "post"
      transportation_location_type: "sts" | "landfill"
      user_state: "active" | "inactive"
      vehicle_capacity: "three_ton" | "five_ton" | "seven_ton" | "fifteen_ton"
      vehicle_type:
        | "open_truck"
        | "dump_truck"
        | "compactor"
        | "container_carrier"
      workforce_log_type: "start" | "end" | "track"
    }
    CompositeTypes: {
      jwt_token: {
        token: string | null
      }
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

