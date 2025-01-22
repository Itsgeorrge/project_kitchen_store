import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const corsConfig = {
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedOrigins: ['http://localhost:3000'], // Update this to your app's URL
};
  
  supabase.rpc('enable_cors', corsConfig);
  
export default supabase;

