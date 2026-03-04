export interface WebhookPayload {
    id: string;
    type: string;
    data: Record<string, unknown>;
    created_at: string;
}
export declare function verifyWebhookSignature(payload: string, signature: string, secret: string, tolerance?: number): WebhookPayload;
export declare function generateTestSignature(payload: string, secret: string, timestamp?: number): string;
//# sourceMappingURL=webhook.d.ts.map