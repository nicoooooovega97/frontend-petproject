'use client';
import { useEffect } from 'react';
// 1. Importa usePathname para saber en qué ruta estamos
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import LoadingSpinner from '../ui/LoadingSpinner'; // Usando tu componente de spinner

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // 2. Usamos isAuthenticated que es un booleano, más claro que chequear 'user'
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 3. Añadimos una condición para no redirigir si ya estamos en una página de autenticación
    const isAuthPage = pathname.startsWith('/auth');
    
    if (!loading && !isAuthenticated && !isAuthPage) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router, pathname]);

  // 4. Mostramos el spinner solo si la autenticación está en proceso
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // 5. Si está autenticado, o si estamos en una página pública, mostramos el contenido
  if (isAuthenticated || pathname.startsWith('/auth')) {
    return <>{children}</>;
  }

  // Si no está autenticado y no es una página de auth, no renderizamos nada
  // mientras la redirección ocurre.
  return null;
}