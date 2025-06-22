'use client';

import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import { AuthProvider } from '@/context/authContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider> {/* Proveedor de next-auth */}
      <ApolloProvider client={client}> {/* Proveedor de Apollo */}
        <AuthProvider> {/* Tu proveedor personalizado */}
          {children}
        </AuthProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}