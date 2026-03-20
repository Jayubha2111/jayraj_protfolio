import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Env-based settings
    let host = process.env.SMTP_HOST;
    let port = Number(process.env.SMTP_PORT || 587);
    let secure = process.env.SMTP_SECURE === "true";
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;

    // escape user-provided content for safe insertion into HTML
    const esc = (s: any) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    const escName = esc(name);
    const escEmail = esc(email);
    const escSubject = esc(subject || "—");
    const escMessage = esc(message).replace(/\n/g, "<br/>");

    const siteName = esc(process.env.NEXT_PUBLIC_SITE_TITLE || "Jayraj");
    const portfolioUrl = esc(process.env.NEXT_PUBLIC_PORTFOLIO_URL || "#");
    const contactEmail = esc(process.env.CONTACT_TO || user || "");
    const socialLinkedIn = esc(process.env.SOCIAL_LINKEDIN || "#");
    const fromAddress = esc(process.env.SENDGRID_FROM || process.env.CONTACT_TO || user || "no-reply@localhost");

    // Owner (notification) HTML — modern dark SaaS-style, table layout for email clients
    const ownerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#050505;padding:28px 16px;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#070707;border-radius:12px;overflow:hidden;border:1px solid #151515;">
        <tr>
          <td style="background:linear-gradient(90deg,#8B5CF6,#EC4899);padding:14px 20px;color:#050505;">
            <strong style="font-size:16px;display:block;">New Contact Message</strong>
            <span style="font-size:12px;opacity:0.95;">Notification • <span style="font-weight:600">${siteName}</span></span>
          </td>
        </tr>
        <tr>
          <td style="padding:20px;background:#050505;color:#f0f0f0;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
              <tr>
                <td style="padding:6px 0;">
                  <div style="font-size:12px;color:#888;margin-bottom:6px;">Name</div>
                  <div style="font-size:16px;font-weight:700;color:#f0f0f0;">${escName}</div>
                </td>
                <td style="padding:6px 0;text-align:right;">
                  <div style="font-size:12px;color:#888;margin-bottom:6px;">Email</div>
                  <div style="font-size:14px;font-weight:600;"><a href="mailto:${escEmail}" style="color:#8B5CF6;text-decoration:none;">${escEmail}</a></div>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:12px 0 0 0;">
                  <div style="font-size:12px;color:#888;margin-bottom:6px;">Subject</div>
                  <div style="display:inline-block;background:#0d0d0d;border:1px solid #1c1c1c;padding:8px 12px;border-radius:8px;font-weight:600;color:#f0f0f0;">${escSubject}</div>
                </td>
              </tr>
            </table>
            <div style="height:1px;background:#111;margin:18px 0;border-radius:1px;"></div>
            <div style="background:linear-gradient(180deg,#080808,#0d0d0d);border:none;padding:14px;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,0.6);">
              <div style="font-size:12px;color:#888;margin-bottom:8px;font-weight:600;">Message</div>
              <div style="font-size:14px;color:#e8e8e8;line-height:1.45;">${escMessage}</div>
            </div>
            <div style="margin-top:18px;font-size:13px;color:#aaa;display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
              <div style="padding:8px 10px;background:#0b0b0b;border:1px solid #1c1c1c;border-radius:8px;font-size:12px;color:#8B5CF6;">Received via portfolio</div>
              <div style="font-size:12px;color:#888;">ID: <span style="color:#bbb;font-family:monospace;">${new Date().toISOString()}</span></div>
              <div style="margin-left:auto;font-size:12px;color:#888;"><a href="${portfolioUrl}" style="color:#8B5CF6;text-decoration:none;">View portfolio</a></div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#050505;padding:12px 20px;text-align:center;font-size:12px;color:#666;">
            <span>© ${new Date().getFullYear()} ${siteName}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

    const replySubject = `Thanks for contacting ${siteName}`;

    // Reply (thank-you) HTML — friendly, modern, with footer and preview
    const replyHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#050505;padding:28px 16px;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#070707;border-radius:12px;overflow:hidden;border:1px solid #151515;">
        <tr>
          <td style="background:linear-gradient(90deg,#8B5CF6,#EC4899);padding:14px 20px;color:#050505;">
            <strong style="font-size:16px;display:block;">Thank you — message received</strong>
            <span style="font-size:12px;opacity:0.95;">${siteName} • We’ll be in touch</span>
          </td>
        </tr>
        <tr>
          <td style="padding:20px;background:#050505;color:#f0f0f0;">
            <div style="font-size:16px;font-weight:700;margin-bottom:8px;">Hi ${escName},</div>
            <div style="font-size:14px;color:#cfcfcf;line-height:1.5;margin-bottom:12px;">Thanks for reaching out. I appreciate you taking the time to send a message — I’ve received your request and will reply as soon as possible.</div>
            <div style="background:linear-gradient(180deg,#080808,#0d0d0d);border:none;padding:12px;border-radius:10px;margin-bottom:12px;box-shadow:0 6px 18px rgba(0,0,0,0.6);">
              <div style="font-size:12px;color:#888;margin-bottom:6px;font-weight:600;">Your message preview</div>
              <div style="font-size:14px;color:#e8e8e8;line-height:1.45;">${escMessage}</div>
            </div>
            <div style="font-size:13px;color:#cfcfcf;margin-bottom:14px;">Meanwhile, feel free to browse my portfolio or share any additional details by replying to this email.</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <a href="${portfolioUrl}" style="display:inline-block;padding:10px 14px;border-radius:10px;background:#8B5CF6;color:#050505;text-decoration:none;font-weight:600;font-size:13px;">Visit portfolio</a>
              <a href="mailto:${contactEmail}" style="display:inline-block;padding:10px 14px;border-radius:10px;background:#0b0b0b;border:1px solid #1c1c1c;color:#8B5CF6;text-decoration:none;font-weight:600;font-size:13px;">Contact</a>
            </div>
            <div style="height:1px;background:#111;margin:18px 0;border-radius:1px;"></div>
            <div style="display:flex;align-items:center;gap:10px;justify-content:space-between;flex-wrap:wrap;">
              <div style="font-size:12px;color:#888;"><strong style="color:#f0f0f0">${siteName}</strong><br/><span style="color:#777;font-size:12px;">${contactEmail}</span></div>
              <div style="font-size:12px;color:#888;">Follow: <a href="${socialLinkedIn}" style="color:#8B5CF6;text-decoration:none;margin-left:6px;">LinkedIn</a></div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#050505;padding:12px 20px;text-align:center;font-size:12px;color:#666;"><span>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</span></td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

    // If SendGrid is configured, prefer SendGrid API (better deliverability)
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const sgFrom = process.env.SENDGRID_FROM || fromAddress;

      const msgOwner = {
        to: to,
        from: sgFrom,
        subject: subject || `New message from ${name}`,
        text: message,
        html: ownerHtml,
      } as any;

      const msgReply = {
        to: email,
        from: sgFrom,
        subject: replySubject,
        text: `Thanks ${name}! I received your message and will reply soon.`,
        html: replyHtml,
      } as any;

      await Promise.all([sgMail.send(msgOwner), sgMail.send(msgReply)]);

      return new Response(JSON.stringify({ ok: true, sendgrid: true }), { status: 200 });
    }

    // Fallback to Nodemailer (use Ethereal if SMTP not configured)
    let transporter;
    let usingTestAccount = false;
    if (!host || host.includes("example.com") || !user || !pass) {
      console.warn("SMTP not configured or using example host — falling back to Ethereal test account for local dev.");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      usingTestAccount = true;
    } else {
      transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
    }

    const mailOptions = {
      from: `${name} <${email}>`,
      to,
      subject: subject || `New message from ${name}`,
      text: message,
      html: ownerHtml,
    } as any;

    const infoMain = await transporter.sendMail(mailOptions);

    const replyOptions = {
      from: `${siteName} <${fromAddress}>`,
      to: email,
      subject: replySubject,
      text: `Thanks ${name}! I received your message and will reply soon.`,
      html: replyHtml,
    } as any;

    const infoReply = await transporter.sendMail(replyOptions);

    if (usingTestAccount) {
      const previewUrlMain = nodemailer.getTestMessageUrl(infoMain);
      const previewUrlReply = nodemailer.getTestMessageUrl(infoReply);
      console.info("Ethereal preview main:", previewUrlMain);
      console.info("Ethereal preview reply:", previewUrlReply);
      return new Response(JSON.stringify({ ok: true, previewUrlMain, previewUrlReply }), { status: 200 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error("/api/contact error", err);
    const message = err?.message || "Failed to send message";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
