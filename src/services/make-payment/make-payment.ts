import { FLEXPAG_TOKEN, PAYMENT_API } from 'environment';

import { MakePaymentRequest, MakePaymentRequestSchema } from './make-payment-request';
import { MakePaymentResponse, MakePaymentResponseSchema } from './make-payment-response';

export async function makePayment(request: MakePaymentRequest): Promise<MakePaymentResponse> {
  const parsedRequest = MakePaymentRequestSchema.parse(request);
  const response = await fetch(`${PAYMENT_API}/v1/payment`, {
    headers: { 'Authorization': `Basic ${FLEXPAG_TOKEN}`, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(parsedRequest),
  });

  if (!response.ok) {
    throw new Error(`Failed to make payment: ${response.statusText}`);
  }

  try {
    const json = await response.json();
    return MakePaymentResponseSchema.parse(json);
  } catch {
    throw new Error(`Failed to parse payment response: ${response.statusText}`);
  }
}
