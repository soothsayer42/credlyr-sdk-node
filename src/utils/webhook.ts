import { createHmac, timingSafeEqual } from 'crypto';
import { WebhookSignatureError } from '../errors.js';

export interface WebhookPayload {
  id: string;
  type: string;
  data: Record<string, unknown>;
  created_at: string;
}

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
  tolerance = 300
): WebhookPayload {
  if (!payload || !signature || !secret) {
    throw new WebhookSignatureError('Missing required parameters');
  }

  // Parse signature header: t=timestamp,v1=signature
  const parts = signature.split(',');
  let timestamp = 0;
  const signatures: string[] = [];

  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key === 't') timestamp = parseInt(value, 10);
    else if (key === 'v1') signatures.push(value);
  }

  if (!timestamp || signatures.length === 0) {
    throw new WebhookSignatureError('Invalid signature format');
  }

  // Check timestamp tolerance
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > tolerance) {
    throw new WebhookSignatureError('Timestamp outside tolerance');
  }

  // Compute expected signature
  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac('sha256', secret).update(signedPayload).digest('hex');

  // Constant-time comparison
  const valid = signatures.some(sig => {
    try {
      return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
    } catch {
      return false;
    }
  });

  if (!valid) {
    throw new WebhookSignatureError('Signature verification failed');
  }

  return JSON.parse(payload);
}

export function generateTestSignature(payload: string, secret: string, timestamp?: number): string {
  const ts = timestamp ?? Math.floor(Date.now() / 1000);
  const sig = createHmac('sha256', secret).update(`${ts}.${payload}`).digest('hex');
  return `t=${ts},v1=${sig}`;
}
