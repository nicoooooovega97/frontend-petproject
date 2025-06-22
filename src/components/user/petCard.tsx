'use client';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { GET_PET_DETAILS } from '@/graphql/pets/queries';

interface PetCardProps {
  petId: string; // Ahora recibe solo el ID
}

const PetCard: React.FC<PetCardProps> = ({ petId }) => {
  // 1. Obtener datos completos de la mascota
  const { data, loading, error } = useQuery(GET_PET_DETAILS, {
    variables: { id: petId },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="animate-pulse">
        <div className="h-48 w-full bg-gray-200"></div>
        <div className="p-6 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 text-red-500">
      Error: {error.message}
    </div>
  );

  const pet = data?.pet;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Imagen con enlace a detalles */}
      <Link href={`/user/gestion-mascotas/petDetails/${petId}`}>
        <div className="relative h-48 w-full">
          <Image
            src={pet.photoUrl || '/default-pet.jpg'}
            alt={`${pet.name} - ${pet.breed}`}
            fill
            className="object-cover hover:opacity-90 transition-opacity"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </Link>

      <div className="px-6 py-4">
        {/* Sección del dueño */}
        <div className="mb-2">
          <p className="text-sm text-gray-500">Dueño/a</p>
          <p className="text-gray-700 font-medium">
            {pet.owner?.name || 'No especificado'}
          </p>
        </div>
        
        {/* Nombre y género */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {pet.gender === 'MALE' ? '♂' : '♀'}
          </span>
        </div>

        {/* Raza y edad */}
        <p className="text-gray-600 text-sm mt-1">
          {pet.breed} • {pet.age} {pet.age === 1 ? 'año' : 'años'}
        </p>

        {/* Estado de salud */}
        <div className="mt-3">
          <span
            className={`inline-block px-2 py-1 text-xs rounded-full ${
              pet.healthStatus === 'HEALTHY'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {pet.healthStatus === 'HEALTHY' ? 'Saludable' : 'En tratamiento'}
          </span>
        </div>

        {/* Botón de acción */}
        <div className="mt-4">
          <Link
            href={`/user/gestion-mascotas/petDetails/${petId}`}
            className="inline-block bg-[#00527C] hover:bg-[#003d5c] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center w-full"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;