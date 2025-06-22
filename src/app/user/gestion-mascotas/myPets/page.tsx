'use client';
import { useQuery } from '@apollo/client';
import PetCard from "@/components/user/petCard";
import Link from "next/link";
import { GET_MY_PETS } from '@/graphql/pets/queries';

export default function MyPetsPage() {
  // 1. Obtener mascotas desde GraphQL
  const { data, loading, error } = useQuery(GET_MY_PETS, {
    fetchPolicy: 'cache-and-network'
  });

  // 2. Manejar estados de carga y error
  if (loading) return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 text-red-500">
          Error al cargar mascotas: {error.message}
        </div>
      </div>
    </div>
  );

  const pets = data?.myPets || [];

  return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/user/" 
          className="bg-white text-[#00527c] px-4 py-2 rounded-lg inline-flex items-center mb-6 hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver atrás
        </Link>
        
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mis Mascotas</h1>
            <Link 
              href="/user/gestion-mascotas/addPet" 
              className="bg-[#00527c] text-white px-4 py-2 rounded-lg hover:bg-[#003a5a] transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Añadir mascota
            </Link>
          </div>
          
          {pets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet: any) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <p className="text-lg text-blue-800 mb-4">No tienes mascotas registradas aún</p>
              <Link 
                href="/user/gestion-mascotas/addPet" 
                className="inline-block bg-[#00527c] text-white px-4 py-2 rounded-lg hover:bg-[#003a5a] transition-colors"
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