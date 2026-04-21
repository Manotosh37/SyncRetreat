import { supabase } from "./supabase";

interface EmailData {
  to: string;
  name: string;
  type: "confirmation" | "approved" | "rejected" | "welcome" | "reminder";
  destination?: string;
  paymentLink?: string;
  password?: string;
  booking_id?: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("--- Email Debug Start ---");
    console.log("Payload:", data);
    
    const { data: result, error } = await supabase.functions.invoke("send-email", {
      body: data,
    });

    if (error) {
      console.error("Supabase Edge Function Invoke Error:", error);
      return { success: false, message: `Supabase Function Error: ${error.message}. Is the 'send-email' function deployed?` };
    }

    if (result?.error) {
      console.error("Email Provider Error:", result.error);
      return { success: false, message: `Email Provider Error: ${result.error}` };
    }

    console.log("Email Result:", result);
    console.log("--- Email Debug End ---");
    return { success: true, message: `Email sent to ${data.to}` };

  } catch (error) {
    console.error("Unexpected Email error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
};