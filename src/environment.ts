/* eslint-disable prefer-destructuring */
export const IS_DEV = import.meta.env.DEV;
export const AUTHENTICATION_ENABLED = false;

export const DEBTS_API = import.meta.env.VITE_DEBTS_API as string;
export const INSTALLMENTS_API = import.meta.env.VITE_INSTALLMENTS_API as string;
export const PAYMENT_API = import.meta.env.VITE_PAYMENT_API as string;
export const TRANSACTION_STATUS_API = import.meta.env.VITE_TRANSACTION_STATUS_API as string;
export const KEYCLOAK_TOKEN_ENDPOINT = import.meta.env.VITE_KEYCLOAK_TOKEN_ENDPOINT as string;
export const PIX_API = import.meta.env.VITE_PIX_API as string;
export const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string;
export const FLEXPAG_TOKEN = import.meta.env.VITE_FLEXPAG_TOKEN as string;
