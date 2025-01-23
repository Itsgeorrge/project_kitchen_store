import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const corsConfig = {
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedOrigins: ['https://project-kitchen-store.vercel.app'],
};
  
  supabase.rpc('enable_cors', corsConfig);
  
export default supabase;

