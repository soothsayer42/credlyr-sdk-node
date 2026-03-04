"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhookSignature = verifyWebhookSignature;
exports.generateTestSignature = generateTestSignature;
const crypto_1 = require("crypto");
const errors_js_1 = require("../errors.js");
function verifyWebhookSignature(payload, signature, secret, tolerance = 300) {
    if (!payload || !signature || !secret) {
        throw new errors_js_1.WebhookSignatureError('Missing required parameters');
    }
    // Parse signature header: t=timestamp,v1=signature
    const parts = signature.split(',');
    let timestamp = 0;
    const signatures = [];
    for (const part of parts) {
        const [key, value] = part.split('=');
        if (key === 't')
            timestamp = parseInt(value, 10);
        else if (key === 'v1')
            signatures.push(value);
    }
    if (!timestamp || signatures.length === 0) {
        throw new errors_js_1.WebhookSignatureError('Invalid signature format');
    }
    // Check timestamp tolerance
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > tolerance) {
        throw new errors_js_1.WebhookSignatureError('Timestamp outside tolerance');
    }
    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`;
    const expected = (0, crypto_1.createHmac)('sha256', secret).update(signedPayload).digest('hex');
    // Constant-time comparison
    const valid = signatures.some(sig => {
        try {
            return (0, crypto_1.timingSafeEqual)(Buffer.from(expected), Buffer.from(sig));
        }
        catch {
            return false;
        }
    });
    if (!valid) {
        throw new errors_js_1.WebhookSignatureError('Signature verification failed');
    }
    return JSON.parse(payload);
}
function generateTestSignature(payload, secret, timestamp) {
    const ts = timestamp ?? Math.floor(Date.now() / 1000);
    const sig = (0, crypto_1.createHmac)('sha256', secret).update(`${ts}.${payload}`).digest('hex');
    return `t=${ts},v1=${sig}`;
}
//# sourceMappingURL=webhook.js.map