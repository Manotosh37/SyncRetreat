// src/lib/emailservice.ts

interface EmailData {
  to: string;
  name: string;
  type: "confirmation" | "approved" | "rejected" | "welcome" | "booking_confirmation" | "final_payment";
  destination?: string;
  paymentLink?: string;
  password?: string;
  booking_id?: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Construct the direct URL to your Edge Function
    // Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY match your .env file
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      throw new Error("Missing Supabase environment variables.");
    }

    const functionUrl = `${supabaseUrl}/functions/v1/send-email`;

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Server rejected request:", result);
      return { success: false, message: result.error || "Server returned an error." };
    }

    return { success: true, message: `Action successful for ${data.to}` };

  } catch (error: any) {
    console.error("Fetch Execution Error:", error);
    return { success: false, message: error.message || "An unexpected network error occurred." };
  }
};