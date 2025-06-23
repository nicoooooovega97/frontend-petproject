'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import { Pet } from '@/types/generated/graphql'; // Importamos el tipo Pet
import { GET_PETS_BY_OWNER_QUERY } from '@/graphql/pets/pets.operations';
import PetCard from '@/components/user/petCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function MyPetsPage() {
  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_PETS_BY_OWNER_QUERY, {
    variables: { ownerId: user?.id! },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error al cargar mascotas: {error.message}</p>;
  }

  const pets = data?.petsByOwner || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/user" 
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Volver al Dashboard
        </Link>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mis Mascotas</h1>
            <Link 
              href="/user/gestion-mascotas/addPet" 
              className="bg-[#00527C] text-white px-4 py-2 rounded-lg hover:bg-[#003d5a] transition-colors"
            >
              + Añadir mascota
            </Link>
          </div>
          
          {pets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet: Pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500 mb-4">No tienes mascotas registradas.</p>
              <Link 
                href="/user/gestion-mascotas/addPet" 
                className="bg-[#00527C] text-white px-5 py-2 rounded-lg"
              >
                Registrar mi primera mascota
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}