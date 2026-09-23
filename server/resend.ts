const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'Hoducation Technologies <contact@email.hoduacademy.com>';
const ADMIN_ALERT_EMAIL = process.env.ADMIN_ALERT_EMAIL || 'hoducationtechnologies@gmail.com';
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || 'de430fe4-ed42-4d50-8a2c-4e6a3162ad0d';
const WHATSAPP_LINK = process.env.WHATSAPP_SUPPORT_URL || 'https://wa.me/919660034117';

export interface ContactLeadPayload {
  firstName: string;
  lastName?: string;
  workEmail: string;
  companyName: string;
  phoneCode?: string;
  phone?: string;
  industry?: string;
  estimatedSize?: string;
  context?: string;
}

/**
 * Step 1: Send instant lead alert to the admin team
 */
export async function sendAdminLeadNotification(lead: ContactLeadPayload) {
  const fullPhone = `${lead.phoneCode || '+91'} ${lead.phone || 'Not provided'}`;
  const cleanPhoneForWa = (lead.phone || '').replace(/[^0-9]/g, '');
  const waProspectLink = cleanPhoneForWa ? `https://wa.me/${cleanPhoneForWa.startsWith('91') ? cleanPhoneForWa : '91' + cleanPhoneForWa}` : WHATSAPP_LINK;
  const fullName = `${lead.firstName} ${lead.lastName || ''}`.trim();
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #800000 0%, #4a0000 100%); color: #ffffff; padding: 28px 32px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fef08a; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    .title { font-size: 22px; font-weight: 800; margin: 12px 0 4px 0; color: #ffffff; }
    .subtitle { font-size: 13px; color: #fecdd3; margin: 0; }
    .content { padding: 32px; }
    .grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .grid td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .grid td.label { font-weight: 600; color: #64748b; width: 35%; background: #f8fafc; }
    .grid td.value { font-weight: 600; color: #0f172a; }
    .highlight-box { background: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 16px; margin: 20px 0; }
    .highlight-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #92400e; margin-bottom: 6px; }
    .highlight-text { font-size: 13px; color: #78350f; margin: 0; line-height: 1.5; }
    .action-btn { display: inline-block; padding: 12px 22px; margin-right: 10px; margin-bottom: 10px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 13px; text-align: center; }
    .btn-wa { background: #16a34a; color: #ffffff; }
    .btn-email { background: #800000; color: #ffffff; }
    .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">🔥 High-Priority Lead Alert</span>
      <h1 class="title">New Demo Request Received</h1>
      <p class="subtitle">${fullName} from ${lead.companyName}</p>
    </div>
    <div class="content">
      <table class="grid">
        <tr>
          <td class="label">Prospect Name</td>
          <td class="value">${fullName}</td>
        </tr>
        <tr>
          <td class="label">Institution / Entity</td>
          <td class="value">${lead.companyName}</td>
        </tr>
        <tr>
          <td class="label">Work Email</td>
          <td class="value"><a href="mailto:${lead.workEmail}" style="color: #800000; text-decoration: none; font-weight: bold;">${lead.workEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="value"><a href="tel:${lead.phone}" style="color: #0284c7; text-decoration: none;">${fullPhone}</a></td>
        </tr>
        <tr>
          <td class="label">Target Modules</td>
          <td class="value"><span style="background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-weight: 700; color: #334155;">${lead.industry || 'All AcadOS Modules'}</span></td>
        </tr>
        <tr>
          <td class="label">Cohort / Size</td>
          <td class="value">${lead.estimatedSize || 'Not specified'}</td>
        </tr>
        <tr>
          <td class="label">Submission Time</td>
          <td class="value">${timestamp}</td>
        </tr>
      </table>

      ${lead.context ? `
      <div class="highlight-box">
        <div class="highlight-title">Prospect Notes & Context</div>
        <p class="highlight-text">${lead.context}</p>
      </div>
      ` : ''}

      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <a href="${waProspectLink}" class="action-btn btn-wa">💬 Chat on WhatsApp</a>
        <a href="mailto:${lead.workEmail}?subject=AcadOS%20Platform%20Demo%20for%20${encodeURIComponent(lead.companyName)}" class="action-btn btn-email">✉️ Reply via Email</a>
      </div>
    </div>
    <div class="footer">
      Automated via AcadOS Engine & Resend API &bull; Hoducation Technologies Pvt. Ltd.
    </div>
  </div>
</body>
</html>
`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to: [ADMIN_ALERT_EMAIL],
      reply_to: lead.workEmail,
      subject: `🔥 New Lead Alert: ${fullName} from ${lead.companyName}`,
      html
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Failed to send admin lead notification:', errText);
    throw new Error(`Resend API admin notification failed: ${errText}`);
  }

  return await res.json();
}

/**
 * Step 2: Auto-sync contact to Resend Audience/Newsletter list
 */
export async function syncContactToResendAudience(lead: ContactLeadPayload) {
  try {
    const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: lead.workEmail,
        first_name: lead.firstName,
        last_name: lead.lastName || '',
        unsubscribed: false
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Resend audience sync warning (non-blocking):', errText);
      return { success: false, error: errText };
    }

    return await res.json();
  } catch (err: any) {
    console.warn('Resend audience sync exception (non-blocking):', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Step 3: Send high-converting confirmation email to the prospect
 */
export async function sendProspectConfirmationEmail(lead: ContactLeadPayload) {
  const firstName = lead.firstName || 'Educator';
  const companyName = lead.companyName || 'your institution';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf9f6; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.06); }
    .header { background: #800000; padding: 36px 32px; text-align: center; color: #ffffff; }
    .brand-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #fbbf24; margin-bottom: 6px; }
    .brand-title { font-size: 26px; font-weight: 800; margin: 0; color: #ffffff; letter-spacing: -0.02em; }
    .brand-sub { font-size: 13px; color: #fecdd3; margin-top: 6px; }
    .body-content { padding: 36px 32px; }
    .salutation { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
    .lead-p { font-size: 14px; line-height: 1.65; color: #334155; margin-bottom: 20px; }
    .steps-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin: 24px 0; }
    .steps-heading { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #800000; margin-bottom: 14px; }
    .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
    .step-num { background: #800000; color: #ffffff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; margin-right: 12px; flex-shrink: 0; margin-top: 2px; }
    .step-text { font-size: 13px; color: #334155; line-height: 1.5; }
    .modules-banner { background: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 16px; margin: 24px 0; }
    .modules-title { font-size: 12px; font-weight: 700; color: #9f1239; margin-bottom: 8px; }
    .modules-list { font-size: 12px; color: #881337; margin: 0; padding-left: 18px; }
    .cta-container { text-align: center; margin: 32px 0 16px 0; }
    .primary-btn { display: inline-block; background: #16a34a; color: #ffffff; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(22,163,74,0.3); }
    .secondary-link { display: block; font-size: 12px; color: #800000; text-decoration: underline; margin-top: 12px; font-weight: 600; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; font-size: 12px; color: #64748b; line-height: 1.6; text-align: center; }
    .footer strong { color: #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand-eyebrow">ACADOS PLATFORM DEMO</div>
      <h1 class="brand-title">Walkthrough Confirmed</h1>
      <p class="brand-sub">Tailored for ${companyName}</p>
    </div>

    <div class="body-content">
      <div class="salutation">Dear ${firstName},</div>
      
      <p class="lead-p">
        Thank you for requesting a personalized platform walkthrough of <strong>AcadOS</strong> for <strong>${companyName}</strong>.
      </p>

      <p class="lead-p">
        Our academic solutions team has received your inquiry. We are setting up a custom sandbox tailored with your requested curriculum maps and institution parameters.
      </p>

      <div class="steps-box">
        <div class="steps-heading">What Happens Next:</div>
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Custom Sandbox Preparation:</strong> We configure your testing environment mapped to 15+ CBSE, ICSE, and competitive exam blueprints.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Branded Question Paper Sample:</strong> We generate a sample watermarked test paper and smartphone OMR sheet preview under your institution’s name.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text"><strong>1-on-1 Guided Demo:</strong> An academic technology specialist will connect with you to demonstrate instant test generation, smartphone OMR evaluation, and CBT mock exam execution.</div>
        </div>
      </div>

      ${lead.industry ? `
      <div class="modules-banner">
        <div class="modules-title">🎯 Requested Modules & Scope:</div>
        <div style="font-size: 13px; font-weight: 600; color: #881337;">${lead.industry}</div>
      </div>
      ` : ''}

      <div class="cta-container">
        <a href="${WHATSAPP_LINK}?text=${encodeURIComponent(`Hello AcadOS Team, I am ${firstName} from ${companyName}. I have booked a demo walkthrough and would like to connect.`)}" class="primary-btn" target="_blank">
          💬 Connect on WhatsApp (+91 96600 34117)
        </a>
        <a href="https://acados.app" class="secondary-link" target="_blank">
          Explore All AcadOS Modules on Web &rarr;
        </a>
      </div>

      <p class="lead-p" style="font-size: 13px; color: #64748b; margin-top: 24px; text-align: center;">
        Need urgent priority scheduling? Call us directly at <strong>+91 96600 34117</strong>.
      </p>
    </div>

    <div class="footer">
      <strong>Hoducation Technologies Pvt. Ltd.</strong><br>
      C-28, Vaishali Estate, Gandhi Path (W), Jaipur, Rajasthan 302021<br>
      Email: <a href="mailto:hoducationtechnologies@gmail.com" style="color: #800000;">hoducationtechnologies@gmail.com</a> &bull; Support: +91 96600 34117
    </div>
  </div>
</body>
</html>
`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to: [lead.workEmail],
      reply_to: ADMIN_ALERT_EMAIL,
      subject: `Your AcadOS Platform Demo Request — Hoducation Technologies`,
      html
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Failed to send prospect confirmation email:', errText);
    throw new Error(`Resend API prospect confirmation email failed: ${errText}`);
  }

  return await res.json();
}

/**
 * Orchestrate complete 3-step pipeline
 */
export async function processContactLeadPipeline(lead: ContactLeadPayload) {
  // Step 1: Admin Alert Email
  const adminEmailResult = await sendAdminLeadNotification(lead);

  // Step 2: Resend Audience Sync (Non-blocking safe execution)
  const audienceSyncResult = await syncContactToResendAudience(lead);

  // Step 3: Prospect Confirmation Email
  const prospectEmailResult = await sendProspectConfirmationEmail(lead);

  return {
    success: true,
    adminEmailId: adminEmailResult?.id,
    prospectEmailId: prospectEmailResult?.id,
    audienceSync: audienceSyncResult
  };
}
