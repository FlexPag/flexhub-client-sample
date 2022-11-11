import { createContext, useCallback, useMemo, useState, ReactNode, useContext } from 'react';

export type AuthenticationContextData =
  | {
      status: 'authenticated';
      accessToken: string;
      refreshToken: string;
      deauthenticate: () => void;
    }
  | {
      status: 'unauthenticated';
      authenticate: (accessToken: string, refreshToken: string) => void;
    };

const AuthenticationContext = createContext<AuthenticationContextData>({} as AuthenticationContextData);

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<{ accessToken: string; refreshToken: string }>();

  const authenticate = useCallback(
    (accessToken: string, refreshToken: string) => {
      setTokens({ accessToken, refreshToken });
    },
    [setTokens]
  );

  const deauthenticate = useCallback(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setTokens(undefined);
  }, [setTokens]);

  const value = useMemo<AuthenticationContextData>(() => {
    if (tokens) {
      return {
        status: 'authenticated',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        deauthenticate,
      };
    }

    return {
      status: 'unauthenticated',
      authenticate,
    };
  }, [tokens, authenticate, deauthenticate]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
