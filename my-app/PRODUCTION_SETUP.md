# Production Environment Setup Guide

## Issue
The payment system is failing on the live site (www.syncretreat.com) with a 500 error because the Razorpay environment variables are not configured.

## Required Environment Variables

Add these environment variables to your production hosting platform (Vercel, Netlify, etc.):

### Razorpay Configuration

```bash
# Public Key (can be exposed to client-side)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_TNbT39MYdCLeoE

# Secret Key (must be kept private, server-side only)
RAZORPAY_KEY_SECRET=cyW5dV8BtkHv8nyhDdwhtyFo

# Alternative naming (backend will check both)
RAZORPAY_KEY_ID=rzp_test_TNbT39MYdCLeoE
```

### Database Configuration (if using Supabase)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Platform-Specific Instructions

### Vercel
1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - Value: `rzp_test_TNbT39MYdCLeoE`
   - Environment: Production (and Preview if needed)
4. Click **Save**
5. Repeat for `RAZORPAY_KEY_SECRET`
6. **Redeploy** your application for changes to take effect

### Netlify
1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add each variable with its value
4. **Rebuild and deploy** your site

### Other Platforms
Refer to your hosting platform's documentation for setting environment variables.

## Important Notes

⚠️ **Security**
- Never commit `.env.local` or `.env` files to Git
- The `RAZORPAY_KEY_SECRET` must remain private
- Use test keys for development, live keys for production

🔄 **After Adding Variables**
- You must redeploy/rebuild your application
- Environment variables are only available after a new build
- Clear your build cache if variables don't seem to work

## Testing Production Payment

### Test Mode (Current Setup)
- Key: `rzp_test_TNbT39MYdCLeoE`
- Test Card: `4111 1111 1111 1111`
- Any future expiry date
- Any CVV

### Live Mode (When Ready)
1. Get live API keys from Razorpay Dashboard
2. Update environment variables with live keys (starts with `rzp_live_`)
3. Test with real card details
4. Ensure webhook configuration is set up

## Verifying Setup

After deployment, check:
1. Visit your live site
2. Try to make a booking
3. Check browser console for errors
4. Check server logs in your hosting dashboard

If you still see the 500 error:
- Verify environment variables are saved correctly
- Confirm you redeployed after adding variables
- Check server logs for specific error messages
- Contact support at hello@syncretreat.com

## Current Status

✅ Local Development: Working
❌ Production (www.syncretreat.com): Environment variables not configured

## Next Steps

1. Add environment variables to production hosting
2. Redeploy the application
3. Test payment flow on live site
4. Switch to live Razorpay keys when ready to accept real payments
