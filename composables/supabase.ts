import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tgoytyqbtznutsaekier.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnb3l0eXFidHpudXRzYWVraWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzUwOTIsImV4cCI6MjA2NDg1MTA5Mn0.7oWvQeQhGkokMSiD2dJsOK5XhmIqfnr8LOG1MAQGoLg'

export const supabase = createClient(supabaseUrl, supabaseKey)