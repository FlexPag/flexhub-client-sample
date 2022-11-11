import { GetCepResponse, GetCepResponseSchema } from './get-cep-response';

export async function getCep(cep: string): Promise<GetCepResponse> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!response.ok) {
    throw new Error(`Failed to get cep: ${cep}`);
  }

  const data = await response.json();

  if ('erro' in data) {
    throw 'cep-nao-encontrado';
  }

  return GetCepResponseSchema.parse(data);
}
