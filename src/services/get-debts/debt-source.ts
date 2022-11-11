export const DebtSources = ['CELPE', 'DETRAN_PE'] as const;

export type Field = 'document' | 'contract_account' | 'license_plate';

export const DebtSourceOptionsMap = {
  CELPE: {
    name: 'CELPE (Neoenergia Pernambuco)',
    requiredFields: ['document', 'contract_account'] as Field[],
  },
  DETRAN_PE: {
    name: 'DETRAN Pernambuco',
    requiredFields: ['document', 'license_plate'] as Field[],
  },
  ALGAS: {
    name: 'Algás',
    requiredFields: ['contract_account'] as Field[],
  },
  BAHIAGAS: {
    name: 'Bahiagás',
    requiredFields: ['document'] as Field[],
  },
} as const;
