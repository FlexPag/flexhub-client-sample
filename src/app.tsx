import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import { ScreenClassProvider, setConfiguration } from 'react-grid-system';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { QueryLoadingIndicator } from 'app/components';

import { Head } from './head';
import { AuthenticationProvider } from './hooks';
import { Pages } from './pages';
import { theme } from './theme';

export function App() {
  const queryClient = useRef(new QueryClient());

  useEffect(() => {
    const remInPixels = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    setConfiguration({ gutterWidth: remInPixels });
  }, []);

  return (
    <QueryClientProvider client={queryClient.current}>
      <AuthenticationProvider>
        <ThemeProvider theme={theme}>
          <ScreenClassProvider>
            <Head />

            <QueryLoadingIndicator />

            <BrowserRouter>
              <Pages />
            </BrowserRouter>
          </ScreenClassProvider>
        </ThemeProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
