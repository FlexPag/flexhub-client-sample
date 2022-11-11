import { DEBTS_API } from 'environment';

import { GetDebtsRequest, GetDebtsRequestSchema } from './get-debts-request';
import { Debt, GetDebtsResponseSchema } from './get-debts-response';

export async function getDebts(request: GetDebtsRequest): Promise<Debt[]> {
  const endpoint = `${DEBTS_API}/debts`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(GetDebtsRequestSchema.parse(request)),
  });

  if (!response.ok) {
    throw new Error(`Failed to get debts: ${response.statusText}`);
  }

  const data = await response.json();
  return GetDebtsResponseSchema.parse(data);
}
