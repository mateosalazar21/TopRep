import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sxfiqbwnnyzvoneudbgn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZmlxYndubnl6dm9uZXVkYmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2Mzg2NDQsImV4cCI6MjA1NzIxNDY0NH0.ZVLXN149gAWXKFCcHudNj7rwKxWzG4NZVELgsuNvj1I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})