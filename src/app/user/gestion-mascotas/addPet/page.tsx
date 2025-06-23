'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { toast } from 'react-hot-toast';

// 1. Importar desde el archivo de operaciones correcto
import { CREATE_PET_MUTATION } from "@/graphql/pets/pets.operations";
// 2. Importar los tipos generados para el input
import { CreatePetInput, GetPetsByOwnerDocument } from '@/types/generated/graphql';
import { useAuth } from '@/context/authContext'; // Para obtener el ID del dueño
import AddPetForm from '@/components/user/addPetForm'; // Separamos el formulario

export default function AddPetPage() {
  const router = useRouter();
  const { user } = useAuth(); // Obtenemos el usuario logueado del contexto

  const [createPet, { loading }] = useMutation(CREATE_PET_MUTATION, {
    onCompleted: () => {
      toast.success('¡Mascota añadida correctamente!');
      router.push('/user/gestion-mascotas/myPets');
    },
    onError: (error) => {
      toast.error(`Error al añadir mascota: ${error.message}`);
    },
    // Actualiza la caché de Apollo para que la lista de mascotas se refresque
    refetchQueries: [{ query: GetPetsByOwnerDocument }],
  });

  const handleAddPet = async (formData: Omit<CreatePetInput, 'ownerId'>) => {
    if (!user?.id) {
      toast.error("Debes estar logueado para añadir una mascota.");
      return;
    }

    try {
      await createPet({
        variables: {
          input: {
            ...formData,
            ownerId: user.id, // 3. Añadimos el ID del dueño automáticamente
          }
        }
      });
    } catch (err) {
      // El error ya se maneja en el callback onError
      console.error("Error al añadir mascota:", err);
    }
  };
  
  // Hemos movido el JSX del formulario a su propio componente para mayor limpieza.
  // La página ahora solo se encarga de la lógica.
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/user" 
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Volver 
        </Link>
        <AddPetForm 
          onAddPet={handleAddPet}
          onCancel={() => router.push('/user/gestion-mascotas/myPets')}
          loading={loading}
        />
      </div>
    </div>
  );
}