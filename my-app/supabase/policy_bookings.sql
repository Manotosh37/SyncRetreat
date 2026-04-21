-- RLS policies for bookings table
-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anon (public) to INSERT new bookings
CREATE POLICY "allow_insert" ON public.bookings FOR INSERT TO anon USING (true);

-- Allow authenticated users (admin) to SELECT all bookings
CREATE POLICY "allow_select" ON public.bookings FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to UPDATE any booking
CREATE POLICY "allow_update" ON public.bookings FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users to DELETE bookings
CREATE POLICY "allow_delete" ON public.bookings FOR DELETE TO authenticated USING (true);
