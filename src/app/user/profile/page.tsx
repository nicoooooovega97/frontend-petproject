'use client';

import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import ProfileCard from "@/components/user/profileCard";
import Link from "next/link";
import { GET_PROFILE_QUERY } from '@/graphql/auth/auth.operations'; // Ajusta la ruta si es necesario
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Leemos el userId del localStorage cuando el componente se monta
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // 2. Ejecutamos la query SOLO si tenemos un userId
  const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
    variables: { userId: userId! }, // Le pasamos la variable
    skip: !userId, // MUY IMPORTANTE: No ejecuta la query si userId es null
    fetchPolicy: 'cache-and-network'
  });

  // El estado de carga ahora considera si estamos esperando el ID
  if (loading || !userId) return (
    <div className="min-h-screen flex items-center justify-center bg-[#00527C]">
      <LoadingSpinner size="lg" />
      <span className="sr-only">Cargando perfil...</span>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#00527C] px-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error al cargar perfil</h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <Link 
          href="/user" // Enlace corregido
          className="inline-block bg-[#00527C] text-white py-2 px-4 rounded-md hover:bg-[#003d5a] transition"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
  
  // 3. Verificamos que los datos existen y pasamos el objeto correcto
  if (!data?.getProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#00527C] px-4">
        <p>No se encontraron datos del perfil.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-[#00527C]">
      <Link 
        href="/user" // Enlace corregido
        className="absolute top-4 left-4 bg-white py-2 px-4 rounded-md shadow hover:bg-gray-100 transition duration-200 flex items-center text-[#00527C]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver
      </Link>
      
      <div className="w-full max-w-md">
        {/* 4. Pasamos `data.getProfile` en lugar de `data.me` */}
        <ProfileCard userData={data.getProfile} />
      </div>
    </div>
  );
}