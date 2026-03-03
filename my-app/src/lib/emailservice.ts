import { supabase } from "./supabase";

interface EmailData {
  to: string;
  name: string;
  type: "confirmation" | "approved" | "rejected";
  destination?: string;
  paymentLink?: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: result, error } = await supabase.functions.invoke("send-email", {
      body: data,
    });

    if (error) {
      console.error("Edge function error:", error);
      return { success: false, message: error.message };
    }

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true, message: `Email sent to ${data.to}` };

  } catch (error) {
    console.error("Email error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to send email" };
  }
};