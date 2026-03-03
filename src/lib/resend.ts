import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

export async function sendReviewEmail({
  to,
  customerName,
  businessName,
  reviewLink,
  fromEmail,
}: {
  to: string;
  customerName: string;
  businessName: string;
  reviewLink: string;
  fromEmail: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: `${businessName} <${fromEmail}>`,
      to,
      subject: `How was your experience with ${businessName}?`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a;">Hi ${customerName}!</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">
            Thank you for choosing ${businessName}. We hope you had a great experience!
          </p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">
            Could you take 60 seconds to share your experience? It means the world to us and helps other customers find us.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${reviewLink}"
               style="background-color: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold;">
              ⭐ Leave a Google Review
            </a>
          </div>
          <p style="color: #888; font-size: 13px;">
            Takes less than 60 seconds. Thank you so much!
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #bbb; font-size: 12px;">
            ${businessName} · <a href="mailto:${fromEmail}" style="color: #bbb;">${fromEmail}</a>
          </p>
        </div>
      `,
    });

    if (error) return { success: false, error: error.message };
    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
