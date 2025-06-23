'use client';

// Importa los proveedores que realmente usas
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import { AuthProvider } from '@/context/authContext'; // Asegúrate de que la ruta sea correcta

// Este es el componente que envuelve a toda la aplicación
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // El orden es importante: Apollo primero, luego Auth que puede depender de él.
    <ApolloProvider client={client}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
}