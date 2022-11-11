import { KEYCLOAK_TOKEN_ENDPOINT } from 'environment';

import { GetTokenRequest } from './get-token-request';
import { GetTokenResponse, GetTokenResponseSchema } from './get-token-response';

export async function getTokens(request: Omit<GetTokenRequest, 'grant_type'>): Promise<GetTokenResponse> {
  const endpoint = KEYCLOAK_TOKEN_ENDPOINT;
  const response = await fetch(endpoint, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: new URLSearchParams({
      ...request,
      grant_type: 'password',
    } as GetTokenRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }

  const data = await response.json();
  return GetTokenResponseSchema.parse(data);
}
