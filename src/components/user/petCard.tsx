'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pet } from '@/types/generated/graphql';
import Button from '../ui/button'; // Asumiendo que tienes un componente Button

// La prop sigue siendo la misma: recibe el objeto pet completo.
interface PetCardProps {
  pet: Pick<Pet, 'id' | 'name' | 'breed' | 'age' | 'photoUrl'>;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  if (!pet) {
    return null;
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* La imagen sigue siendo un enlace a la página de detalles */}
      <Link href={`/user/gestion-mascotas/petDetails/${pet.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={pet.photoUrl || '/default-pet.jpg'}
            alt={`Foto de ${pet.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        {/* Información de la mascota */}
        <div className="mb-auto">
          <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {pet.breed} • {pet.age} {pet.age === 1 ? 'año' : 'años'}
          </p>
        </div>
        
        {/* --- ¡AQUÍ AÑADIMOS LOS BOTONES! --- */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-3">
          <Link
            href={`/user/gestion-mascotas/petDetails/${pet.id}`}
            className="flex-1"
          >
            <Button variant="secondary" className="w-full">
              Ver Detalles
            </Button>
          </Link>

          <Link
            href={`/user/gestion-mascotas/editPet/${pet.id}`}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              Editar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;