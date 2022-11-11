import { FLEXPAG_TOKEN, INSTALLMENTS_API } from 'app/environment';
import { z } from 'zod';

import { GetInstallmentsRequestSchema } from './get-installments-request';
import { GetInstallmentsResponse, GetInstallmentsResponseSchema } from './get-installments-response';

export async function getInstallments(
  request: z.input<typeof GetInstallmentsRequestSchema>
): Promise<GetInstallmentsResponse> {
  const parsedRequest = GetInstallmentsRequestSchema.parse(request);
  const response = await fetch(`${INSTALLMENTS_API}/v1/get-installments`, {
    headers: { 'Authorization': `Basic ${FLEXPAG_TOKEN}`, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(parsedRequest),
  });

  if (!response.ok) {
    throw new Error(`Failed to get installments: ${response.statusText}`);
  }

  try {
    const json = await response.json();
    return GetInstallmentsResponseSchema.parse(json);
  } catch {
    throw new Error(`Failed to parse installments response: ${response.statusText}`);
  }
}
