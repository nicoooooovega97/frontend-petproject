'use client';

import Sidebar from '@/components/dashboard/sidebar';
import AuthGuard from '@/components/auth/authGuard';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_PETS_BY_OWNER_QUERY } from '@/graphql/pets/pets.operations';
import { useAuth } from '@/context/authContext';
import PetCard from '@/components/user/petCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Pet } from '@/types/generated/graphql'; // Importamos el tipo Pet para mayor seguridad

export default function DashboardPage() {
  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_PETS_BY_OWNER_QUERY, {
    variables: { ownerId: user?.id! },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const renderPetList = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500">Error al cargar las mascotas: {error.message}</p>;
    }

    const pets = data?.petsByOwner || [];

    if (pets.length === 0) {
      return (
        <div className="text-center py-8 px-4 bg-gray-50 rounded-lg mt-6">
          <p className="text-gray-600 mb-4">Aún no has registrado ninguna mascota.</p>
          <Link 
            href="/user/gestion-mascotas/addPet"
            className="inline-block bg-[#00527C] text-white px-5 py-2 rounded-lg hover:bg-[#003d5c] transition-colors font-semibold"
          >
            Añadir mi primera mascota
          </Link>
        </div>
      );
    }

    const recentPets = pets.slice(0, 3);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {recentPets.map((pet: Pet) => ( // Tipado explícito con 'Pet'
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    );
  };

  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 ml-64 bg-gray-50 min-h-screen">
          <div className="space-y-8">
            
            {/* Encabezado Principal */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Bienvenido a tu Panel, {user?.name}!</h1>
              <p className="text-gray-500 mt-1">Aquí tienes un resumen rápido de tu actividad.</p>
            </div>

            {/* Sección de Mascotas */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              
              {/* --- ENCABEZADO DE LA SECCIÓN CORREGIDO --- */}
              <div className="flex items-start mb-6">
                
                {/* 1. Este div del título crecerá para ocupar el espacio */}
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800">Tus Mascotas</h2>
                  <p className="text-sm text-gray-500 mt-1">Un vistazo a tus compañeros más recientes.</p>
                </div>
                
                {/* 2. El div del enlace se alinea a la derecha */}
                <div>
                  <Link 
                    href="/user/gestion-mascotas/myPets"
                    className="text-sm font-medium text-white bg-[#00527C] hover:bg-[#003d5c] px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Ver todas
                  </Link>
                </div>
              </div>
              {/* ----------------------------------------- */}
              
              {renderPetList()}
            </div>
            
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}