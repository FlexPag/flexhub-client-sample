import { FLEXPAG_TOKEN, TRANSACTION_STATUS_API } from 'app/environment';

import { GetTransactionStatusRequest, GetTransactionStatusRequestSchema } from './get-transaction-status-request';
import { GetTransactionStatusResponse, GetTransactionStatusResponseSchema } from './get-transaction-status-response';

export async function getTransactionStatus(
  request: GetTransactionStatusRequest
): Promise<GetTransactionStatusResponse> {
  const parsedRequest = GetTransactionStatusRequestSchema.parse(request);
  const response = await fetch(`${TRANSACTION_STATUS_API}/v1/transaction-status`, {
    headers: { 'Authorization': `Basic ${FLEXPAG_TOKEN}`, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(parsedRequest),
  });

  if (!response.ok) {
    throw new Error(`Failed to get transaction status: ${response.statusText}`);
  }

  try {
    const json = await response.json();
    return GetTransactionStatusResponseSchema.parse(json);
  } catch {
    throw new Error(`Failed to parse transaction status response: ${response.statusText}`);
  }
}
