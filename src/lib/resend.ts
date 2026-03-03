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
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;">
          <tr><td align="center" style="padding: 40px 16px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; max-width:600px;">
              <!-- Header -->
              <tr>
                <td style="background:#2563eb; padding:24px 32px;">
                  <p style="margin:0; color:#ffffff; font-size:20px; font-weight:bold; font-family:Arial,sans-serif;">⭐ ${businessName}</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:32px; font-family:Arial,sans-serif;">
                  <h2 style="margin:0 0 16px; color:#111827; font-size:22px;">Hi ${customerName}!</h2>
                  <p style="margin:0 0 12px; color:#374151; font-size:16px; line-height:1.6;">
                    Thank you for choosing <strong>${businessName}</strong>. We hope you had a great experience!
                  </p>
                  <p style="margin:0 0 28px; color:#374151; font-size:16px; line-height:1.6;">
                    Could you take 60 seconds to share your experience? It means the world to us and helps other customers find us.
                  </p>
                  <!-- Gmail-safe button using table -->
                  <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
                    <tr>
                      <td align="center" style="background:#2563eb; border-radius:8px;">
                        <a href="${reviewLink}"
                           target="_blank"
                           style="display:inline-block; padding:16px 36px; color:#ffffff; font-size:16px; font-weight:bold; text-decoration:none; font-family:Arial,sans-serif;">
                          ⭐ Leave a Google Review
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0; color:#6b7280; font-size:14px; text-align:center;">
                    Takes less than 60 seconds — we truly appreciate it!
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding:16px 32px; border-top:1px solid #f3f4f6;">
                  <p style="margin:0; color:#9ca3af; font-size:12px; font-family:Arial,sans-serif;">
                    ${businessName} · If you did not visit us recently, you can ignore this email.
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      `,
    });

    if (error) return { success: false, error: error.message };
    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
