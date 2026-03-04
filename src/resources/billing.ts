import type { HttpClient } from '../utils/request.js';
import type { UsageRecord, Invoice, Subscription, ListResponse } from '../types.js';

export interface UsageParams {
  meter?: 'verifications' | 'issuances' | 'status_checks';
  period?: string; // YYYY-MM format
}

export class BillingResource {
  constructor(private client: HttpClient) {}

  async getUsage(params?: UsageParams): Promise<ListResponse<UsageRecord>> {
    const query = new URLSearchParams();
    if (params?.meter) query.set('meter', params.meter);
    if (params?.period) query.set('period', params.period);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const { data } = await this.client.get<{ usage: UsageRecord[] }>(`/v1/billing/usage${queryString}`);
    return { data: data.usage };
  }

  async getSubscription(): Promise<Subscription> {
    const { data } = await this.client.get<{ subscription: Subscription }>('/v1/billing/subscription');
    return data.subscription;
  }

  async listInvoices(params?: { limit?: number; offset?: number }): Promise<ListResponse<Invoice>> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const { data } = await this.client.get<{ invoices: Invoice[]; total: number }>(`/v1/billing/invoices${queryString}`);
    return { data: data.invoices, total: data.total };
  }

  async createPortalSession(returnUrl?: string): Promise<{ url: string }> {
    const { data } = await this.client.post<{ url: string }>('/v1/billing/portal', { return_url: returnUrl });
    return data;
  }
}
