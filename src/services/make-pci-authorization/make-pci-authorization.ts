import { PCI_AUTHORIZE_API } from 'app/environment';

import { MakePCIAuthorizationRequest, MakePCIAuthorizationRequestSchema } from './make-pci-authorization-request';

export async function makePciAuthorization(request: MakePCIAuthorizationRequest, referenceId: string) {
  const parsedRequest = MakePCIAuthorizationRequestSchema.parse(request);

  const response = await fetch(`${PCI_AUTHORIZE_API}/sales/authorize`, {
    headers: { 'ReferenceId': referenceId, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(parsedRequest),
  });

  return response.ok;
}
