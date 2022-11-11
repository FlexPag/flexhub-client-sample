import { AUTHENTICATION_ENABLED } from 'environment';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthentication } from 'app/hooks';
import { CheckoutTemplate } from 'app/templates';

const BuscarFaturasPage = lazy(() => import('./buscar-faturas'));
const SelecionarFaturasPage = lazy(() => import('./selecionar-faturas'));
const DadosPagadorPage = lazy(() => import('./dados-pagador'));
const PagamentoPage = lazy(() => import('./pagamento'));
const AuthenticationPage = lazy(() => import('./authentication'));

export function Pages() {
  const authentication = useAuthentication();

  if (AUTHENTICATION_ENABLED && authentication.status === 'unauthenticated') {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <Suspense>
              <AuthenticationPage />
            </Suspense>
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<CheckoutTemplate />}>
        <Route
          path="buscar-faturas"
          element={
            <Suspense>
              <BuscarFaturasPage />
            </Suspense>
          }
        />

        <Route
          path="selecionar-faturas"
          element={
            <Suspense>
              <SelecionarFaturasPage />
            </Suspense>
          }
        />

        <Route
          path="dados-pagador"
          element={
            <Suspense>
              <DadosPagadorPage />
            </Suspense>
          }
        />

        <Route
          path="pagamento"
          element={
            <Suspense>
              <PagamentoPage />
            </Suspense>
          }
        />

        <Route path="*" element={<Navigate to="buscar-faturas" replace />} />
      </Route>
    </Routes>
  );
}
