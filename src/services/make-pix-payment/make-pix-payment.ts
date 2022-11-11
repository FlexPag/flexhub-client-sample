import { FLEXPAG_TOKEN, IS_DEV, PIX_API } from 'environment';

import { MakePixPaymentRequest, MakePixPaymentRequestSchema } from './make-pix-payment-request';
import { MakePixPaymentResponse, MakePixPaymentResponseSchema } from './make-pix-payment-response';

export async function makePixPayment(request: MakePixPaymentRequest): Promise<MakePixPaymentResponse> {
  const parsedRequest = MakePixPaymentRequestSchema.parse(request);
  const response = await fetch(`${PIX_API}/v1/external/pix/qr-codes`, {
    headers: { 'Authorization': `Basic ${FLEXPAG_TOKEN}`, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(parsedRequest),
  });

  if (!response.ok) {
    throw new Error(`Failed to make payment: ${response.statusText}`);
  }

  try {
    const json = await response.json();
    return MakePixPaymentResponseSchema.parse(json);
  } catch (error) {
    if (IS_DEV) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    throw new Error(`Failed to parse payment response: ${response.statusText}`);
  }
}
