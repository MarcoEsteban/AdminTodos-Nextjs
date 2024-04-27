'use client';

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

// Este componente nos va a Permitir solucionar el siguiente Error:
//! ERROR:
//? Error: [next-auth]: `useSession` must be wrapped in a <SessionProvider />

export const AuthProvider = ( { children }: Props ) => {
  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  );
};