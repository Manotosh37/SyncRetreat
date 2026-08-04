# Supabase Waitlist Setup

## Prerequisites
- Supabase account (free tier works)
- Project already created

## Step 1: Run the Migration

### Option A: Using Supabase Dashboard (Easiest)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/001_create_waitlist_table.sql`
5. Paste into the SQL editor
6. Click **Run** or press `Ctrl+Enter`
7. You should see "Success. No rows returned"

### Option B: Using Supabase CLI
```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Step 2: Get Your Supabase Credentials

1. Go to **Project Settings** (gear icon in left sidebar)
2. Click **API** section
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJh...`)

## Step 3: Add Environment Variables

Create or update `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 5: Restart Your Development Server

```bash
npm run dev
```

## Testing

1. Go to your waitlist page: http://localhost:3000/waitlist
2. Fill in the form and submit
3. Check your Supabase dashboard:
   - Go to **Table Editor**
   - Select **waitlist** table
   - You should see your entry with name, email, and timestamps

## Verify Database Setup

In Supabase SQL Editor, run:

```sql
-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'waitlist';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'waitlist';

-- View all entries
SELECT * FROM waitlist ORDER BY created_at DESC;
```

## View Waitlist Entries

### Using Supabase Dashboard
1. Go to **Table Editor**
2. Click on **waitlist** table
3. You'll see all entries with filters and export options

### Using SQL
```sql
-- Get all entries
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Count total entries
SELECT COUNT(*) FROM waitlist;

-- Export as CSV (in dashboard, click "..." → "Download as CSV")
```

## Security Notes

✅ **Row Level Security is enabled**
- Anonymous users can only INSERT (submit forms)
- Authenticated users can SELECT (view entries)
- No public DELETE or UPDATE

✅ **Email uniqueness**
- Duplicate emails are prevented by UNIQUE constraint
- API returns user-friendly error message

✅ **Timestamps**
- `created_at` auto-set on insert
- `updated_at` auto-updated on any change

## Common Issues

### "relation 'public.waitlist' does not exist"
- The migration wasn't run. Go back to Step 1

### "Invalid API key"
- Check that your anon key is correct in `.env.local`
- Make sure you copied the **anon/public** key, not the service_role key

### Form submits but no data appears
- Check the browser console for errors
- Verify RLS policies are set correctly
- Check Supabase logs: **Logs** → **API**

### "This email is already on the waitlist"
- Working as intended! Duplicate prevention is active
- Entry already exists in database

## Optional: Add Email Notifications

Want to get notified of new signups? Use Supabase Database Webhooks:

1. Go to **Database** → **Webhooks**
2. Create new webhook
3. Table: `waitlist`
4. Events: `INSERT`
5. Type: HTTP Request
6. URL: Your notification endpoint (e.g., Zapier, Make.com, or custom endpoint)

## Export Waitlist

To export all waitlist entries:

```sql
-- In Supabase SQL Editor
SELECT 
  name,
  email,
  created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' as created_at_ist
FROM waitlist
ORDER BY created_at DESC;
```

Then click "..." → "Download as CSV"
