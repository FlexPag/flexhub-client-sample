/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default (configEnvironment: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(configEnvironment.mode, path.join(process.cwd(), 'src')) };

  return defineConfig({
    root: './src',
    publicDir: './assets',
    appType: 'spa',

    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },

    plugins: [react(), svgr()],
    resolve: {
      alias: {
        app: path.resolve(__dirname, './src'),
        environment: path.resolve(__dirname, './src/environment.ts'),
      },
    },
    server: {
      proxy: {
        '/api/pix': {
          target: process.env.VITE_PIX_API_PROXY as string,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api\/pix/, ''),
        },
        '/api/transaction-status': {
          target: process.env.VITE_TRANSACTION_STATUS_API_PROXY as string,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/transaction-status/, ''),
        },
        '/api/payment': {
          target: process.env.VITE_PAYMENT_API_PROXY as string,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/payment/, ''),
        },
        '/api/debts': {
          target: process.env.VITE_DEBTS_API_PROXY as string,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/debts/, ''),
        },
        '/api/installments': {
          target: process.env.VITE_INSTALLMENTS_API_PROXY as string,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/installments/, ''),
        },
      },
    },
  });
};
