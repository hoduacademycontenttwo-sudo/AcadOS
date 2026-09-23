import type { IncomingMessage, ServerResponse } from 'http';
import { processContactLeadPipeline, ContactLeadPayload } from '../server/resend';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body: ContactLeadPayload = req.body || {};

    const { firstName, workEmail, companyName } = body;

    // Validate required fields
    if (!firstName || !workEmail || !companyName) {
      return res.status(400).json({
        error: 'Missing required fields: firstName, workEmail, and companyName are required.',
        required: ['firstName', 'workEmail', 'companyName']
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return res.status(400).json({
        error: 'Invalid workEmail format.'
      });
    }

    // Execute 3-step automated pipeline
    const result = await processContactLeadPipeline(body);

    return res.status(200).json({
      success: true,
      message: 'Lead registered successfully, admin notified and confirmation email dispatched.',
      data: result
    });
  } catch (error: any) {
    console.error('Error handling /api/contact:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while processing lead request.'
    });
  }
}
