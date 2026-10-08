export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateContactEmail(payload: ContactEmailPayload) {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const rawSubject = payload.subject.trim();
  const message = payload.message.trim();

  const formattedSubject = rawSubject
    ? `[Portfolio Contact] ${rawSubject}`
    : `[Portfolio Contact] New Message`;

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedSubject = escapeHtml(rawSubject || "New Message");
  const escapedMessage = escapeHtml(message);

  const mailtoUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: ${formattedSubject}`
  )}`;

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #111827;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Email Container (max 600px) -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #E2E8F0;">
          
          <!-- 1. HEADER -->
          <tr>
            <td style="background-color: #0B0F19; background-image: linear-gradient(180deg, #0B0F19 0%, #111827 100%); padding: 28px 32px; border-bottom: 3px solid #2563EB;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.3;">
                      Dwi Ramdhona
                    </div>
                    <div style="font-size: 12px; font-weight: 600; color: #60A5FA; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px;">
                      Personal Portfolio
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <div style="width: 8px; height: 8px; background-color: #22C55E; border-radius: 50%; display: inline-block;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 2. BODY CONTENT -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <!-- Title & Subtitle -->
              <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #111827; letter-spacing: -0.02em;">
                New Contact Message
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #64748B;">
                Someone has contacted you through your portfolio website.
              </p>

              <!-- 3. CONTACT INFORMATION CARD -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 24px; border-collapse: separate;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #F1F5F9; width: 90px; vertical-align: top;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Name</span>
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #F1F5F9; vertical-align: top;">
                    <span style="font-size: 14px; font-weight: 600; color: #111827;">${escapedName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #F1F5F9; vertical-align: top;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #F1F5F9; vertical-align: top;">
                    <a href="mailto:${escapedEmail}" style="font-size: 14px; font-weight: 500; color: #2563EB; text-decoration: underline; word-break: break-all;">
                      ${escapedEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; vertical-align: top;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Subject</span>
                  </td>
                  <td style="padding: 14px 18px; vertical-align: top;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${escapedSubject}</span>
                  </td>
                </tr>
              </table>

              <!-- 4. MESSAGE CARD -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
                      Message
                    </div>
                    <div style="font-size: 14px; line-height: 1.65; color: #111827; word-break: break-word; overflow-wrap: break-word; white-space: pre-wrap;">${escapedMessage}</div>
                  </td>
                </tr>
              </table>

              <!-- 5. REPLY CTA BUTTON -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="left" style="border-radius: 8px; background-color: #2563EB;">
                    <a href="${mailtoUrl}" target="_blank" style="background-color: #2563EB; border: 1px solid #2563EB; border-radius: 8px; color: #FFFFFF; display: inline-block; font-size: 14px; font-weight: 600; padding: 12px 24px; text-decoration: none; text-align: center; box-sizing: border-box;">
                      Reply to ${escapedName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- 6. FOOTER SEPARATOR & DETAILS -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #E2E8F0; padding-top: 20px; margin-top: 16px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748B; line-height: 1.4;">
                      Sent from Dwi Ramdhona's Portfolio
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 1.4;">
                      <a href="https://dwiramdhona.vercel.app" target="_blank" style="color: #2563EB; text-decoration: underline;">
                        dwiramdhona.vercel.app
                      </a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #94A3B8; line-height: 1.4;">
                      &copy; 2026 Dwi Ramdhona. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `New Contact Message\nSomeone has contacted you through your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${rawSubject || "New Message"}\n\nMessage:\n${message}\n\n---\nReply to: ${email}\nSent from Dwi Ramdhona's Portfolio (https://dwiramdhona.vercel.app)\n© 2026 Dwi Ramdhona`;

  return {
    subject: formattedSubject,
    html,
    text,
  };
}
