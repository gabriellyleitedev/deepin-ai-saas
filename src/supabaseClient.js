import { createClient } from '@supabase/supabase-js';

// Deixamos as chaves comentadas para não buscar o .env quebrado
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Criamos um objeto vazio seguro para o React não quebrar ao tentar ler o arquivo
export const supabase = {
  auth: {
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      order: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      eq: () => Promise.resolve({ data: [], error: null }),
    }),
  }),
};

export default supabase;