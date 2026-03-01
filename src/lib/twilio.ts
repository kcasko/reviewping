import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

export async function sendReviewSMS({
  to,
  customerName,
  businessName,
  reviewLink,
}: {
  to: string;
  customerName: string;
  businessName: string;
  reviewLink: string;
}): Promise<{ success: boolean; sid?: string; error?: string }> {
  const body = `Hi ${customerName}! Thanks for choosing ${businessName}. Could you take 60 seconds to share your experience? It means a lot to us 🙏\n\n${reviewLink}\n\nReply STOP to opt out.`;

  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: formatPhone(to),
    });
    return { success: true, sid: message.sid };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

export async function sendReviewEmail({
  to,
  customerName,
  businessName,
  reviewLink,
}: {
  to: string;
  customerName: string;
  businessName: string;
  reviewLink: string;
}): Promise<{ success: boolean; error?: string }> {
  // Using Resend for email (add resend package if needed)
  // For MVP, email is optional — SMS is the primary channel
  console.log(`Email would be sent to ${to} for ${businessName}`);
  return { success: true };
}
