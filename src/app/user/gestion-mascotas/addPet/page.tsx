// src/app/(user)/gestion-mascotas/addPet/page.tsx
'use client';
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddPetCard from "@/components/user/addPetCard";
import { useMutation } from "@apollo/client";
import { ADD_PET_MUTATION } from "@/graphql/pets/mutations";

export default function AddPetPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [addPet, { loading, error }] = useMutation(ADD_PET_MUTATION);

  const handleAddPet = async (newPetData: Omit<Pet, 'id'>) => {
    try {
      const { data } = await addPet({
        variables: {
          input: {
            name: newPetData.name,
            species: newPetData.species,
            breed: newPetData.breed,
            color: newPetData.color,
            coatType: newPetData.coatType,
            age: newPetData.age,
            photoUrl: newPetData.imageUrl,
            gender: 'MALE', // Valor por defecto, ajusta según tu formulario
            healthStatus: 'HEALTHY' // Valor por defecto
          }
        }
      });

      setShowSuccess(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/user/gestion-mascotas/myPets');
      }, 2000);

    } catch (err) {
      console.error("Error al añadir mascota:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/user/gestion-mascotas/myPets" 
          className="bg-white text-[#00527c] px-4 py-2 rounded-lg inline-flex items-center mb-6 hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver a Mis Mascotas
        </Link>
        
        <div className="bg-white rounded-lg p-6">
          {/* Mensaje de éxito */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
              <p className="font-medium">¡Mascota añadida correctamente!</p>
              <p className="text-sm">Redirigiendo a la lista de mascotas...</p>
            </div>
          )}

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
              <p className="font-medium">Error al añadir mascota</p>
              <p className="text-sm">{error.message}</p>
            </div>
          )}

          {/* Componente AddPetCard */}
          <AddPetCard 
            onAddPet={handleAddPet}
            onCancel={() => router.push('/user/gestion-mascotas/myPets')}
          />
        </div>
      </div>
    </div>
  );
}

// Definición de tipos (mejor moverlos a un archivo types.ts)
interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  color: string;
  coatType: string;
  age: number;
  imageUrl: string;
}