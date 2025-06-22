// src/app/providers.tsx
'use client'; // ¡Esto es crucial!

import { AuthProvider } from '@/context/authContext';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
}