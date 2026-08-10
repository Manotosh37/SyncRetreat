# Razorpay Standard Checkout Integration

## ✅ Completed

1. **RazorpayButton Component** - Full Standard Checkout integration
2. **API Routes** - Order creation & signature verification
3. **Environment Variables** - Key configuration template
4. **Security** - Server-side signature verification

## Setup Steps

### 1. Get API Keys

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **API Keys**
3. Generate keys for **Test Mode** first
4. Copy both Key ID and Secret

### 2. Add Environment Variables

Add to `.env.local`:

```env
# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

### 3. Test Integration

1. Use test mode keys
2. Click "Book Now" button
3. Use test card: **4111 1111 1111 1111**
4. Any future expiry, any CVV
5. Payment should complete successfully

### 4. Go Live

1. Switch to **Live Mode** in Razorpay Dashboard
2. Generate **Live API Keys**
3. Update `.env.local` with live keys
4. Test one real transaction
5. Ready to accept payments!

## Integration Features

### ✅ Implemented
- Standard Checkout (not payment button widget)
- Order creation with proper amount handling
- HMAC SHA256 signature verification
- Payment success/failure handling
- Toast notifications
- Loading states
- Modal dismiss handling
- Secure server-side verification

### Payment Flow

```
User clicks "Book Now"
    ↓
Create Order (API) → Get order_id
    ↓
Open Razorpay Checkout Modal
    ↓
User completes payment
    ↓
Verify Signature (API)
    ↓
Show Success/Failure Toast
```

## Security

- **Server-side verification**: Signature verified on backend
- **No key exposure**: Secret key never sent to client
- **HMAC SHA256**: Industry-standard signature algorithm
- **Order validation**: Each payment tied to unique order

## Test Cards

### Domestic (India)
- **Visa**: 4111 1111 1111 1111
- **Mastercard**: 5500 6700 0000 1002
- **RuPay**: 6527 6589 0000 1005

### Use any:
- Future expiry date
- Random CVV
- Success/Failure test flow available

## API Endpoints

### `/api/razorpay/create-order` (POST)
Creates Razorpay order

**Request:**
```json
{
  "amount": 1799,
  "currency": "INR",
  "receipt": "receipt_123"
}
```

**Response:**
```json
{
  "id": "order_xxx",
  "amount": 179900,
  "currency": "INR",
  "receipt": "receipt_123"
}
```

### `/api/razorpay/verify` (POST)
Verifies payment signature

**Request:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

**Response:**
```json
{
  "isValid": true
}
```

## Usage

```tsx
<RazorpayButton 
  amount={1799}  // Amount in INR
  destination="Varkala"
  onSuccess={(details) => {
    // Handle success
    console.log(details.razorpay_payment_id);
  }}
/>
```

## Troubleshooting

### "Payment system loading" error
- Wait a few seconds for Razorpay script to load
- Check browser console for script errors

### "Failed to create order" error
- Verify API keys in `.env.local`
- Check server console for errors
- Ensure `razorpay` npm package is installed

### "Payment verification failed" error
- Verify secret key is correct
- Check server logs for signature mismatch
- Ensure using same keys for create & verify

## Next Steps

1. ✅ Test with test keys
2. ⬜ Set up webhooks for payment confirmation
3. ⬜ Add payment logging to database
4. ⬜ Set up refund handling
5. ⬜ Enable auto-capture settings
