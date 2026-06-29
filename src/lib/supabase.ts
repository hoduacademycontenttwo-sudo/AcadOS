import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bgaidfuzvcrjbxmpfvym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYWlkZnV6dmNyamJ4bXBmdnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NjYzODQsImV4cCI6MjA5NzQ0MjM4NH0.eBnqwRMd-S23ys8GmR1-NA0WGXiWxkce4LNG3jwRV7U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
