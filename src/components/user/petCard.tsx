import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  healthStatus: string;
  photoUrl?: string;
  ownerName: string; // Nuevo campo añadido
}

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={pet.photoUrl || '/default-pet.jpg'}
          alt={`${pet.name} the ${pet.breed}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="px-6 py-4">
        {/* Sección del dueño */}
        <div className="mb-2">
          <p className="text-sm text-gray-500">Dueño/a</p>
          <p className="text-gray-700 font-medium">{pet.ownerName}</p>
        </div>
        
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {pet.gender === 'MALE' ? '♂' : '♀'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {pet.breed} • {pet.age} {pet.age === 1 ? 'año' : 'años'}
        </p>
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
      </div>
    </div>
  );
};

export default PetCard;