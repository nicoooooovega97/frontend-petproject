'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useRegisterMutation, useGetProfileLazyQuery, UserDto } from '@/types/generated/graphql';
import { client as apolloClient } from '@/lib/apollo-client';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

// El tipo de usuario que manejaremos en el contexto. Viene de los tipos generados.
type UserProfile = Pick<UserDto, 'id' | 'name' | 'lastName' | 'email'>;

type AuthContextType = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (variables: { email: string; password: string; }) => Promise<void>;
  register: (variables: { name: string, lastName: string, email: string, password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Solo para la carga inicial de la app
  const router = useRouter();

  // --- Hooks de Apollo generados por Codegen ---
  const [loginMutation, { loading: loginLoading }] = useLoginMutation();
  const [registerMutation, { loading: registerLoading }] = useRegisterMutation();
  
  // Usamos una "lazy query" para poder llamarla cuando queramos
  const [getProfile, { loading: profileLoading }] = useGetProfileLazyQuery();

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
    }
    apolloClient.resetStore();
    router.push('/auth/login');
  }, [router]);

  // Efecto para verificar la sesión al cargar la página
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        try {
          const { data } = await getProfile({ variables: { userId } });
          if (data?.getProfile) {
            setUser(data.getProfile);
          } else {
            // El token o el ID son inválidos, forzamos logout
            logout();
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          logout();
        }
      }
      setLoading(false);
    };
    
    initializeAuth();
  }, [getProfile, logout]);


  const login = async (variables: { email: string; password: string; }) => {
  try {
    const { data } = await loginMutation({ variables: { input: variables } });
    if (!data?.login.accessToken) throw new Error('No se recibió token');

    const token = data.login.accessToken;
    localStorage.setItem('authToken', token);

    // --- DECODIFICAR EL TOKEN PARA OBTENER EL USER ID ---
    // (Asumiendo que tu backend lo pone en el 'sub' claim, que es estándar)
    try {
      const decodedToken: { sub: string } = jwtDecode(token);
      const userId = decodedToken.sub;
      localStorage.setItem('userId', userId); // <-- GUARDAMOS EL ID

      // Opcional: Cargar el perfil inmediatamente
      const { data: profileData } = await getProfile({ variables: { userId } });
      if (profileData?.getProfile) {
        setUser(profileData.getProfile as UserProfile);
      }
    } catch (e) {
      console.error("Error decodificando token:", e);
      throw new Error("Token inválido recibido del servidor.");
    }
    
    toast.success('¡Inicio de sesión exitoso!');
    router.push('/user');
  } catch (error: any) {
    toast.error(error.message || 'Error al iniciar sesión');
    throw error;
  }
  };
  
  const register = async (variables: { name: string, lastName: string, email: string, password: string }) => {
    try {
      const { data } = await registerMutation({
        variables: { input: variables }
      });
      
      if (data?.register.id) {
        toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
        router.push('/auth/login');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error en el registro');
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading: loading || loginLoading || registerLoading || profileLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};