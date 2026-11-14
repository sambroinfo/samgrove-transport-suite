export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      attendance_records: {
        Row: {
          event_type: string
          id: string
          notes: string | null
          organization_id: string
          recorded_at: string
          recorded_by: string | null
          trip_passenger_id: string
        }
        Insert: {
          event_type: string
          id?: string
          notes?: string | null
          organization_id: string
          recorded_at?: string
          recorded_by?: string | null
          trip_passenger_id: string
        }
        Update: {
          event_type?: string
          id?: string
          notes?: string | null
          organization_id?: string
          recorded_at?: string
          recorded_by?: string | null
          trip_passenger_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_trip_passenger_id_organization_id_fkey"
            columns: ["trip_passenger_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trip_passengers"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_profile_id: string | null
          created_at: string
          details: Json
          entity_id: string | null
          entity_type: string
          id: number
          organization_id: string
        }
        Insert: {
          action: string
          actor_profile_id?: string | null
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type: string
          id?: never
          organization_id: string
        }
        Update: {
          action?: string
          actor_profile_id?: string | null
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type?: string
          id?: never
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_profile_id_fkey"
            columns: ["actor_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_groups: {
        Row: {
          created_at: string
          group_name: string
          id: string
          is_active: boolean
          organization_id: string
          trip_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          group_name: string
          id?: string
          is_active?: boolean
          organization_id: string
          trip_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          group_name?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          trip_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_groups_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_groups_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "chat_groups_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      chat_members: {
        Row: {
          group_id: string
          joined_at: string
          left_at: string | null
          organization_id: string
          profile_id: string
        }
        Insert: {
          group_id: string
          joined_at?: string
          left_at?: string | null
          organization_id: string
          profile_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string
          left_at?: string | null
          organization_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_members_group_id_organization_id_fkey"
            columns: ["group_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "chat_groups"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "chat_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          attachment_path: string | null
          created_at: string
          deleted_at: string | null
          group_id: string
          id: string
          message_text: string | null
          message_type: string
          organization_id: string
          sender_profile_id: string
        }
        Insert: {
          attachment_path?: string | null
          created_at?: string
          deleted_at?: string | null
          group_id: string
          id?: string
          message_text?: string | null
          message_type?: string
          organization_id: string
          sender_profile_id: string
        }
        Update: {
          attachment_path?: string | null
          created_at?: string
          deleted_at?: string | null
          group_id?: string
          id?: string
          message_text?: string | null
          message_type?: string
          organization_id?: string
          sender_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_group_id_organization_id_fkey"
            columns: ["group_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "chat_groups"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "chat_messages_sender_profile_id_fkey"
            columns: ["sender_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          code: string | null
          id: string
          is_active: boolean
          name: string
          organization_id: string
        }
        Insert: {
          code?: string | null
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
        }
        Update: {
          code?: string | null
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          created_at: string
          emergency_contact: string | null
          id: string
          is_active: boolean
          licence_expiry: string | null
          licence_number: string | null
          member_id: string
          organization_id: string
        }
        Insert: {
          created_at?: string
          emergency_contact?: string | null
          id?: string
          is_active?: boolean
          licence_expiry?: string | null
          licence_number?: string | null
          member_id: string
          organization_id: string
        }
        Update: {
          created_at?: string
          emergency_contact?: string | null
          id?: string
          is_active?: boolean
          licence_expiry?: string | null
          licence_number?: string | null
          member_id?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_member_id_organization_id_fkey"
            columns: ["member_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "drivers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_incidents: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          created_at: string
          description: string | null
          id: string
          incident_type: string
          latitude: number | null
          location_recorded_at: string | null
          longitude: number | null
          organization_id: string
          reporter_profile_id: string
          resolved_at: string | null
          resolved_by: string | null
          severity: Database["public"]["Enums"]["incident_severity"]
          status: Database["public"]["Enums"]["incident_status"]
          trip_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          created_at?: string
          description?: string | null
          id?: string
          incident_type: string
          latitude?: number | null
          location_recorded_at?: string | null
          longitude?: number | null
          organization_id: string
          reporter_profile_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"]
          status?: Database["public"]["Enums"]["incident_status"]
          trip_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          created_at?: string
          description?: string | null
          id?: string
          incident_type?: string
          latitude?: number | null
          location_recorded_at?: string | null
          longitude?: number | null
          organization_id?: string
          reporter_profile_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"]
          status?: Database["public"]["Enums"]["incident_status"]
          trip_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_incidents_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_incidents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_incidents_reporter_profile_id_fkey"
            columns: ["reporter_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_incidents_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_incidents_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "emergency_incidents_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      emergency_updates: {
        Row: {
          actor_profile_id: string | null
          created_at: string
          id: string
          incident_id: string
          note: string | null
          organization_id: string
          update_type: string
        }
        Insert: {
          actor_profile_id?: string | null
          created_at?: string
          id?: string
          incident_id: string
          note?: string | null
          organization_id: string
          update_type: string
        }
        Update: {
          actor_profile_id?: string | null
          created_at?: string
          id?: string
          incident_id?: string
          note?: string | null
          organization_id?: string
          update_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_updates_actor_profile_id_fkey"
            columns: ["actor_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_updates_incident_id_organization_id_fkey"
            columns: ["incident_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "emergency_incidents"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      employee_transport_allocations: {
        Row: {
          created_at: string
          effective_from: string
          effective_until: string | null
          employee_id: string
          id: string
          is_active: boolean
          organization_id: string
          pickup_point_id: string
          pickup_sequence: number | null
          preferred_vehicle_id: string | null
          route_id: string
        }
        Insert: {
          created_at?: string
          effective_from: string
          effective_until?: string | null
          employee_id: string
          id?: string
          is_active?: boolean
          organization_id: string
          pickup_point_id: string
          pickup_sequence?: number | null
          preferred_vehicle_id?: string | null
          route_id: string
        }
        Update: {
          created_at?: string
          effective_from?: string
          effective_until?: string | null
          employee_id?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          pickup_point_id?: string
          pickup_sequence?: number | null
          preferred_vehicle_id?: string | null
          route_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_transport_allocation_pickup_point_id_organization_fkey"
            columns: ["pickup_point_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "pickup_points"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "employee_transport_allocation_preferred_vehicle_id_organiz_fkey"
            columns: ["preferred_vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "employee_transport_allocations_employee_id_organization_id_fkey"
            columns: ["employee_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "employee_transport_allocations_route_id_organization_id_fkey"
            columns: ["route_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          department_id: string | null
          designation: string | null
          dropoff_address: string | null
          id: string
          is_active: boolean
          is_transport_eligible: boolean
          member_id: string
          organization_id: string
          pickup_address: string | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          shift_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          designation?: string | null
          dropoff_address?: string | null
          id?: string
          is_active?: boolean
          is_transport_eligible?: boolean
          member_id: string
          organization_id: string
          pickup_address?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          shift_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          designation?: string | null
          dropoff_address?: string | null
          id?: string
          is_active?: boolean
          is_transport_eligible?: boolean
          member_id?: string
          organization_id?: string
          pickup_address?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          shift_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_id_organization_id_fkey"
            columns: ["department_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "employees_member_id_organization_id_fkey"
            columns: ["member_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "employees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_shift_id_organization_id_fkey"
            columns: ["shift_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      geofence_events: {
        Row: {
          accuracy_m: number | null
          detected_at: string
          event_type: string
          id: string
          idempotency_key: string
          latitude: number | null
          longitude: number | null
          organization_id: string
          pickup_point_id: string
          processed_at: string | null
          processing_status: string
          trip_id: string
          trip_passenger_id: string
        }
        Insert: {
          accuracy_m?: number | null
          detected_at?: string
          event_type: string
          id?: string
          idempotency_key: string
          latitude?: number | null
          longitude?: number | null
          organization_id: string
          pickup_point_id: string
          processed_at?: string | null
          processing_status?: string
          trip_id: string
          trip_passenger_id: string
        }
        Update: {
          accuracy_m?: number | null
          detected_at?: string
          event_type?: string
          id?: string
          idempotency_key?: string
          latitude?: number | null
          longitude?: number | null
          organization_id?: string
          pickup_point_id?: string
          processed_at?: string | null
          processing_status?: string
          trip_id?: string
          trip_passenger_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "geofence_events_pickup_point_id_organization_id_fkey"
            columns: ["pickup_point_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "pickup_points"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "geofence_events_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "geofence_events_trip_passenger_id_organization_id_fkey"
            columns: ["trip_passenger_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trip_passengers"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      gps_devices: {
        Row: {
          created_at: string
          credential_hash: string
          device_identifier: string
          device_type: string
          id: string
          is_active: boolean
          last_seen_at: string | null
          organization_id: string
          provider: string | null
          source_priority: number
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          credential_hash: string
          device_identifier: string
          device_type: string
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          organization_id: string
          provider?: string | null
          source_priority?: number
          vehicle_id: string
        }
        Update: {
          created_at?: string
          credential_hash?: string
          device_identifier?: string
          device_type?: string
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          organization_id?: string
          provider?: string | null
          source_priority?: number
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gps_devices_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      gps_location_history: {
        Row: {
          accuracy_m: number | null
          gps_device_id: string | null
          heading: number | null
          id: number
          latitude: number
          longitude: number
          organization_id: string
          received_at: string
          recorded_at: string
          source: Database["public"]["Enums"]["gps_source"]
          speed_kph: number | null
          trip_id: string | null
          vehicle_id: string
        }
        Insert: {
          accuracy_m?: number | null
          gps_device_id?: string | null
          heading?: number | null
          id?: never
          latitude: number
          longitude: number
          organization_id: string
          received_at?: string
          recorded_at: string
          source: Database["public"]["Enums"]["gps_source"]
          speed_kph?: number | null
          trip_id?: string | null
          vehicle_id: string
        }
        Update: {
          accuracy_m?: number | null
          gps_device_id?: string | null
          heading?: number | null
          id?: never
          latitude?: number
          longitude?: number
          organization_id?: string
          received_at?: string
          recorded_at?: string
          source?: Database["public"]["Enums"]["gps_source"]
          speed_kph?: number | null
          trip_id?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gps_location_history_gps_device_id_organization_id_fkey"
            columns: ["gps_device_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "gps_devices"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "gps_location_history_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "gps_location_history_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      member_roles: {
        Row: {
          created_at: string
          member_id: string
          organization_id: string
          role_id: string
        }
        Insert: {
          created_at?: string
          member_id: string
          organization_id: string
          role_id: string
        }
        Update: {
          created_at?: string
          member_id?: string
          organization_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_roles_member_id_organization_id_fkey"
            columns: ["member_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "member_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          event_type: string
          id: string
          organization_id: string
          profile_id: string
          push_enabled: boolean
          quiet_hours: Json | null
          sound_enabled: boolean
        }
        Insert: {
          event_type: string
          id?: string
          organization_id: string
          profile_id: string
          push_enabled?: boolean
          quiet_hours?: Json | null
          sound_enabled?: boolean
        }
        Update: {
          event_type?: string
          id?: string
          organization_id?: string
          profile_id?: string
          push_enabled?: boolean
          quiet_hours?: Json | null
          sound_enabled?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          event_type: string
          id: string
          organization_id: string
          payload: Json
          profile_id: string
          read_at: string | null
          title: string
        }
        Insert: {
          body: string
          created_at?: string
          event_type: string
          id?: string
          organization_id: string
          payload?: Json
          profile_id: string
          read_at?: string | null
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          event_type?: string
          id?: string
          organization_id?: string
          payload?: Json
          profile_id?: string
          read_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          employee_code: string | null
          id: string
          joined_at: string | null
          organization_id: string
          profile_id: string
          status: Database["public"]["Enums"]["member_status"]
        }
        Insert: {
          created_at?: string
          employee_code?: string | null
          id?: string
          joined_at?: string | null
          organization_id: string
          profile_id: string
          status?: Database["public"]["Enums"]["member_status"]
        }
        Update: {
          created_at?: string
          employee_code?: string | null
          id?: string
          joined_at?: string | null
          organization_id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["member_status"]
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          default_locale: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          settings: Json
          slug: string
          timezone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_locale?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          settings?: Json
          slug: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_locale?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          settings?: Json
          slug?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          description: string
          id: string
          permission_key: string
        }
        Insert: {
          description: string
          id?: string
          permission_key: string
        }
        Update: {
          description?: string
          id?: string
          permission_key?: string
        }
        Relationships: []
      }
      pickup_points: {
        Row: {
          address: string | null
          created_at: string
          geofence_radius_m: number
          id: string
          is_active: boolean
          latitude: number
          longitude: number
          organization_id: string
          point_code: string | null
          point_name: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          geofence_radius_m?: number
          id?: string
          is_active?: boolean
          latitude: number
          longitude: number
          organization_id: string
          point_code?: string | null
          point_name: string
        }
        Update: {
          address?: string | null
          created_at?: string
          geofence_radius_m?: number
          id?: string
          is_active?: boolean
          latitude?: number
          longitude?: number
          organization_id?: string
          point_code?: string | null
          point_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "pickup_points_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          display_name: string
          id: string
          is_system_role: boolean
          organization_id: string | null
          role_key: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          is_system_role?: boolean
          organization_id?: string | null
          role_key: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          is_system_role?: boolean
          organization_id?: string | null
          role_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      route_stops: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          pickup_point_id: string
          planned_arrival: string | null
          route_version_id: string
          stop_sequence: number
          stop_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          pickup_point_id: string
          planned_arrival?: string | null
          route_version_id: string
          stop_sequence: number
          stop_type?: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          pickup_point_id?: string
          planned_arrival?: string | null
          route_version_id?: string
          stop_sequence?: number
          stop_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "route_stops_pickup_point_id_organization_id_fkey"
            columns: ["pickup_point_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "pickup_points"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "route_stops_route_version_id_organization_id_fkey"
            columns: ["route_version_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "route_versions"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      route_versions: {
        Row: {
          created_at: string
          created_by: string | null
          effective_from: string | null
          id: string
          organization_id: string
          route_geometry: Json | null
          route_id: string
          version_number: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          effective_from?: string | null
          id?: string
          organization_id: string
          route_geometry?: Json | null
          route_id: string
          version_number: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          effective_from?: string | null
          id?: string
          organization_id?: string
          route_geometry?: Json | null
          route_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "route_versions_route_id_organization_id_fkey"
            columns: ["route_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      routes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          organization_id: string
          route_code: string
          route_name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          organization_id: string
          route_code: string
          route_name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          organization_id?: string
          route_code?: string
          route_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      seat_assignments: {
        Row: {
          assigned_at: string
          assignment_status: string
          employee_id: string
          id: string
          organization_id: string
          released_at: string | null
          trip_id: string
          vehicle_seat_id: string
        }
        Insert: {
          assigned_at?: string
          assignment_status?: string
          employee_id: string
          id?: string
          organization_id: string
          released_at?: string | null
          trip_id: string
          vehicle_seat_id: string
        }
        Update: {
          assigned_at?: string
          assignment_status?: string
          employee_id?: string
          id?: string
          organization_id?: string
          released_at?: string | null
          trip_id?: string
          vehicle_seat_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seat_assignments_employee_id_organization_id_fkey"
            columns: ["employee_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "seat_assignments_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "seat_assignments_vehicle_seat_id_organization_id_fkey"
            columns: ["vehicle_seat_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicle_seats"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      shifts: {
        Row: {
          ends_at: string | null
          id: string
          is_active: boolean
          name: string
          organization_id: string
          starts_at: string | null
          timezone: string
          working_days: number[]
        }
        Insert: {
          ends_at?: string | null
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
          starts_at?: string | null
          timezone?: string
          working_days?: number[]
        }
        Update: {
          ends_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
          starts_at?: string | null
          timezone?: string
          working_days?: number[]
        }
        Relationships: [
          {
            foreignKeyName: "shifts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_events: {
        Row: {
          actor_profile_id: string | null
          event_payload: Json
          event_type: string
          id: string
          occurred_at: string
          organization_id: string
          trip_id: string
        }
        Insert: {
          actor_profile_id?: string | null
          event_payload?: Json
          event_type: string
          id?: string
          occurred_at?: string
          organization_id: string
          trip_id: string
        }
        Update: {
          actor_profile_id?: string | null
          event_payload?: Json
          event_type?: string
          id?: string
          occurred_at?: string
          organization_id?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_events_actor_profile_id_fkey"
            columns: ["actor_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_events_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      trip_passengers: {
        Row: {
          absence_reason: string | null
          boarded_at: string | null
          created_at: string
          dropped_at: string | null
          employee_id: string
          id: string
          notified_at: string | null
          organization_id: string
          passenger_snapshot: Json
          pickup_point_id: string
          status: Database["public"]["Enums"]["passenger_status"]
          stop_sequence: number
          trip_id: string
        }
        Insert: {
          absence_reason?: string | null
          boarded_at?: string | null
          created_at?: string
          dropped_at?: string | null
          employee_id: string
          id?: string
          notified_at?: string | null
          organization_id: string
          passenger_snapshot: Json
          pickup_point_id: string
          status?: Database["public"]["Enums"]["passenger_status"]
          stop_sequence: number
          trip_id: string
        }
        Update: {
          absence_reason?: string | null
          boarded_at?: string | null
          created_at?: string
          dropped_at?: string | null
          employee_id?: string
          id?: string
          notified_at?: string | null
          organization_id?: string
          passenger_snapshot?: Json
          pickup_point_id?: string
          status?: Database["public"]["Enums"]["passenger_status"]
          stop_sequence?: number
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_passengers_employee_id_organization_id_fkey"
            columns: ["employee_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "trip_passengers_pickup_point_id_organization_id_fkey"
            columns: ["pickup_point_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "pickup_points"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "trip_passengers_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      trips: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          direction: Database["public"]["Enums"]["trip_direction"]
          driver_id: string
          driver_snapshot: Json
          id: string
          organization_id: string
          route_snapshot: Json
          route_version_id: string
          scheduled_at: string
          started_at: string | null
          status: Database["public"]["Enums"]["trip_status"]
          vehicle_id: string
          vehicle_snapshot: Json
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          direction: Database["public"]["Enums"]["trip_direction"]
          driver_id: string
          driver_snapshot: Json
          id?: string
          organization_id: string
          route_snapshot: Json
          route_version_id: string
          scheduled_at: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          vehicle_id: string
          vehicle_snapshot: Json
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          direction?: Database["public"]["Enums"]["trip_direction"]
          driver_id?: string
          driver_snapshot?: Json
          id?: string
          organization_id?: string
          route_snapshot?: Json
          route_version_id?: string
          scheduled_at?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          vehicle_id?: string
          vehicle_snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: "trips_driver_id_organization_id_fkey"
            columns: ["driver_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "trips_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_route_version_id_organization_id_fkey"
            columns: ["route_version_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "route_versions"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "trips_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      vehicle_current_locations: {
        Row: {
          accuracy_m: number | null
          gps_device_id: string | null
          heading: number | null
          health: Database["public"]["Enums"]["gps_health"]
          latitude: number
          longitude: number
          organization_id: string
          received_at: string
          recorded_at: string
          source: Database["public"]["Enums"]["gps_source"]
          speed_kph: number | null
          trip_id: string | null
          vehicle_id: string
        }
        Insert: {
          accuracy_m?: number | null
          gps_device_id?: string | null
          heading?: number | null
          health?: Database["public"]["Enums"]["gps_health"]
          latitude: number
          longitude: number
          organization_id: string
          received_at?: string
          recorded_at: string
          source: Database["public"]["Enums"]["gps_source"]
          speed_kph?: number | null
          trip_id?: string | null
          vehicle_id: string
        }
        Update: {
          accuracy_m?: number | null
          gps_device_id?: string | null
          heading?: number | null
          health?: Database["public"]["Enums"]["gps_health"]
          latitude?: number
          longitude?: number
          organization_id?: string
          received_at?: string
          recorded_at?: string
          source?: Database["public"]["Enums"]["gps_source"]
          speed_kph?: number | null
          trip_id?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_current_locations_gps_device_id_organization_id_fkey"
            columns: ["gps_device_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "gps_devices"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "vehicle_current_locations_trip_id_organization_id_fkey"
            columns: ["trip_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "vehicle_current_locations_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      vehicle_driver_assignments: {
        Row: {
          created_at: string
          driver_id: string
          effective_from: string
          effective_until: string | null
          id: string
          organization_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          driver_id: string
          effective_from: string
          effective_until?: string | null
          id?: string
          organization_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          driver_id?: string
          effective_from?: string
          effective_until?: string | null
          id?: string
          organization_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_driver_assignments_driver_id_organization_id_fkey"
            columns: ["driver_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "vehicle_driver_assignments_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      vehicle_maintenance: {
        Row: {
          completed_at: string | null
          cost: number | null
          created_at: string
          currency: string | null
          description: string | null
          id: string
          maintenance_type: string
          organization_id: string
          scheduled_at: string | null
          status: string
          vehicle_id: string
        }
        Insert: {
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          maintenance_type: string
          organization_id: string
          scheduled_at?: string | null
          status?: string
          vehicle_id: string
        }
        Update: {
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          maintenance_type?: string
          organization_id?: string
          scheduled_at?: string | null
          status?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      vehicle_seats: {
        Row: {
          column_number: number | null
          created_at: string
          id: string
          is_active: boolean
          organization_id: string
          row_number: number | null
          seat_number: string
          seat_type: string | null
          vehicle_id: string
        }
        Insert: {
          column_number?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id: string
          row_number?: number | null
          seat_number: string
          seat_type?: string | null
          vehicle_id: string
        }
        Update: {
          column_number?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          row_number?: number | null
          seat_number?: string
          seat_type?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_seats_vehicle_id_organization_id_fkey"
            columns: ["vehicle_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      vehicles: {
        Row: {
          capacity: number
          created_at: string
          id: string
          notes: string | null
          organization_id: string
          photo_url: string | null
          registration_number: string
          seat_mode: Database["public"]["Enums"]["seat_mode"]
          status: Database["public"]["Enums"]["vehicle_status"]
          updated_at: string
          vehicle_code: string
          vehicle_name: string | null
          vehicle_type: string | null
        }
        Insert: {
          capacity: number
          created_at?: string
          id?: string
          notes?: string | null
          organization_id: string
          photo_url?: string | null
          registration_number: string
          seat_mode?: Database["public"]["Enums"]["seat_mode"]
          status?: Database["public"]["Enums"]["vehicle_status"]
          updated_at?: string
          vehicle_code: string
          vehicle_name?: string | null
          vehicle_type?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string
          photo_url?: string | null
          registration_number?: string
          seat_mode?: Database["public"]["Enums"]["seat_mode"]
          status?: Database["public"]["Enums"]["vehicle_status"]
          updated_at?: string
          vehicle_code?: string
          vehicle_name?: string | null
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gps_health: "live" | "delayed" | "stale" | "offline"
      gps_source: "driver_app" | "hardware"
      incident_severity: "low" | "medium" | "high" | "critical"
      incident_status:
        | "open"
        | "acknowledged"
        | "in_progress"
        | "resolved"
        | "closed"
        | "false_alarm"
      member_status: "invited" | "active" | "suspended" | "left"
      passenger_status:
        | "waiting"
        | "notified"
        | "approaching"
        | "arrived"
        | "boarded"
        | "absent"
        | "missed"
        | "dropped_off"
        | "cancelled"
      seat_mode: "fixed" | "free_selection"
      seat_status: "available" | "reserved" | "occupied" | "inactive"
      trip_direction: "to_office" | "from_office" | "special"
      trip_status:
        | "scheduled"
        | "ready"
        | "in_progress"
        | "paused"
        | "completed"
        | "cancelled"
        | "failed"
      vehicle_status: "active" | "inactive" | "maintenance" | "unavailable"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gps_health: ["live", "delayed", "stale", "offline"],
      gps_source: ["driver_app", "hardware"],
      incident_severity: ["low", "medium", "high", "critical"],
      incident_status: [
        "open",
        "acknowledged",
        "in_progress",
        "resolved",
        "closed",
        "false_alarm",
      ],
      member_status: ["invited", "active", "suspended", "left"],
      passenger_status: [
        "waiting",
        "notified",
        "approaching",
        "arrived",
        "boarded",
        "absent",
        "missed",
        "dropped_off",
        "cancelled",
      ],
      seat_mode: ["fixed", "free_selection"],
      seat_status: ["available", "reserved", "occupied", "inactive"],
      trip_direction: ["to_office", "from_office", "special"],
      trip_status: [
        "scheduled",
        "ready",
        "in_progress",
        "paused",
        "completed",
        "cancelled",
        "failed",
      ],
      vehicle_status: ["active", "inactive", "maintenance", "unavailable"],
    },
  },
} as const
