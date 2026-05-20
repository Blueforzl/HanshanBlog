import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || '';

// 只在环境变量有效时创建客户端
let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey && supabaseAnonKey !== 'placeholder-key') {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
