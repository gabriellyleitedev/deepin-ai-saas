import { createClient } from '@supabase/supabase-js';

// Aqui o React busca as chaves que foi colocado no arquivo .env automaticamente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;