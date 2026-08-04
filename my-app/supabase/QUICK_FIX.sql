-- QUICK FIX: Run this in Supabase SQL Editor to fix the RLS issue
-- This allows anyone to insert into the waitlist table

-- Option 1: Fix the policies (RECOMMENDED)
DROP POLICY IF EXISTS "Allow public inserts" ON public.waitlist;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.waitlist;

CREATE POLICY "Enable insert for everyone"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated"
  ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Option 2: Temporarily disable RLS for testing (NOT RECOMMENDED for production)
-- Uncomment the line below if you just want to test quickly:
-- ALTER TABLE public.waitlist DISABLE ROW LEVEL SECURITY;

-- Verify the setup
SELECT 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd 
FROM pg_policies 
WHERE tablename = 'waitlist';
