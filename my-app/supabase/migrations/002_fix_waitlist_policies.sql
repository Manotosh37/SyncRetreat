-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON public.waitlist;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.waitlist;

-- Recreate the policy to allow anonymous inserts
CREATE POLICY "Enable insert for anon users"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Enable read for authenticated users"
  ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Verify RLS is enabled
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
