-- COPY AND PASTE THIS INTO SUPABASE SQL EDITOR
-- This will disable RLS and allow public inserts to the waitlist table

-- Disable RLS on the waitlist table
ALTER TABLE public.waitlist DISABLE ROW LEVEL SECURITY;

-- Verify it's disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';

-- The rowsecurity column should show 'false'
