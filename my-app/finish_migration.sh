#!/bin/bash

# Create Next.js app directory structure and move pages
echo "Creating Next.js App Router structure..."

mkdir -p src/app/account
mkdir -p src/app/admin
mkdir -p src/app/blog
mkdir -p src/app/bookings
mkdir -p src/app/checkout
mkdir -p src/app/community
mkdir -p src/app/faqs
mkdir -p src/app/goa
mkdir -p src/app/howitworks
mkdir -p src/app/ladakh
mkdir -p src/app/login
mkdir -p src/app/privacy
mkdir -p src/app/refer
mkdir -p src/app/signup
mkdir -p src/app/terms

# Move and rename files to page.tsx (Next.js convention)
# Note: About.tsx is already moved.
[ -f src/pages/Account.tsx ] && mv src/pages/Account.tsx src/app/account/page.tsx
[ -f src/pages/admin.tsx ] && mv src/pages/admin.tsx src/app/admin/page.tsx
[ -f src/pages/BlogPage.tsx ] && mv src/pages/BlogPage.tsx src/app/blog/page.tsx
[ -f src/pages/Bookings.tsx ] && mv src/pages/Bookings.tsx src/app/bookings/page.tsx
[ -f src/pages/Checkout.tsx ] && mv src/pages/Checkout.tsx src/app/checkout/page.tsx
[ -f src/pages/Community-Rules.tsx ] && mv src/pages/Community-Rules.tsx src/app/community/page.tsx
[ -f src/pages/FAQs.tsx ] && mv src/pages/FAQs.tsx src/app/faqs/page.tsx
[ -f src/pages/Goa.tsx ] && mv src/pages/Goa.tsx src/app/goa/page.tsx
[ -f src/pages/Howitworks.tsx ] && mv src/pages/Howitworks.tsx src/app/howitworks/page.tsx
[ -f src/pages/Ladakh.tsx ] && mv src/pages/Ladakh.tsx src/app/ladakh/page.tsx
[ -f src/pages/Login.tsx ] && mv src/pages/Login.tsx src/app/login/page.tsx
[ -f src/pages/Privacy.tsx ] && mv src/pages/Privacy.tsx src/app/privacy/page.tsx
[ -f src/pages/Refer.tsx ] && mv src/pages/Refer.tsx src/app/refer/page.tsx
[ -f src/pages/Signup.tsx ] && mv src/pages/Signup.tsx src/app/signup/page.tsx
[ -f src/pages/Terms.tsx ] && mv src/pages/Terms.tsx src/app/terms/page.tsx
[ -f src/pages/notfound.tsx ] && mv src/pages/notfound.tsx src/app/not-found.tsx

# Create dynamic route for blog posts
mkdir -p src/app/blog/\[slug\]
[ -f src/pages/BlogPost.tsx ] && mv src/pages/BlogPost.tsx src/app/blog/\[slug\]/page.tsx

# Run the Next.js migration script for hooks and imports
echo "Updating React Router DOM imports to Next.js..."
node migrate.js

# Cleanup old React Router entry points
echo "Cleaning up old Vite/React Router entry files..."
rm -f src/App.tsx src/main.tsx src/App.css src/index.css

echo "Migration script completed successfully."
