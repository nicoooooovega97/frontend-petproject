'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

// 1. Importar las operaciones y tipos generados
import { GET_PET_DETAILS_QUERY, GET_PETS_BY_OWNER_QUERY } from '@/graphql/pets/pets.operations';
import { UPDATE_PET_MUTATION } from '@/graphql/pets/pets.operations';
import { UpdatePetInput } from '@/types/generated/graphql';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/button';

export default function EditPetPage() {
  // useParams en App Router devuelve un objeto, por eso extraemos 'id'
  const { id: petId } = useParams();
  const router = useRouter();
  
  // 2. Estado para el formulario, alineado con el DTO UpdatePetInput
  const [formData, setFormData] = useState<UpdatePetInput>({
    name: '',
    breed: '',
    age: 0,
    photoUrl: '',
  });

  // 3. Obtener los datos actuales de la mascota
  const { data: petData, loading: queryLoading, error: queryError } = useQuery(GET_PET_DETAILS_QUERY, {
    variables: { id: petId as string },
    skip: !petId, // No ejecutar si el ID no está disponible
    onCompleted: (data) => {
      // 4. Rellenar el formulario cuando los datos se cargan
      if (data?.pet) {
        setFormData({
          name: data.pet.name,
          breed: data.pet.breed,
          age: data.pet.age,
          photoUrl: data.pet.photoUrl || '',
        });
      }
    },
  });

  // 5. Mutación para actualizar la mascota
  const [updatePet, { loading: mutationLoading }] = useMutation(UPDATE_PET_MUTATION, {
    onCompleted: () => {
      toast.success('¡Mascota actualizada correctamente!');
      router.push('/user/gestion-mascotas/myPets'); // O a la página de detalles de la mascota
    },
    onError: (error) => {
      toast.error(`Error al actualizar: ${error.message}`);
    },
    // Refrescar la lista de mascotas después de editar
    refetchQueries: [{ query: GET_PETS_BY_OWNER_QUERY }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Convertir 'age' a número
      [name]: name === 'age' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePet({
        variables: {
          id: petId as string,
          input: {
            name: formData.name,
            breed: formData.breed,
            age: formData.age,
            photoUrl: formData.photoUrl,
          },
        },
      });
    } catch (error) {
      console.error('Error en el submit de actualización:', error);
    }
  };
  
  // 6. Manejar estados de carga y error de la query inicial
  if (queryLoading) return <div className="..."><LoadingSpinner /></div>;
  if (queryError) return <div className="...">Error al cargar datos: {queryError.message}</div>;
  if (!petData?.pet) return <div className="...">Mascota no encontrada.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          
          {/* --- Encabezado --- */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Editar a <span className="text-[#00527C]">{petData.pet.name}</span>
            </h1>
            <Link 
              href="/user/gestion-mascotas/myPets" 
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </Link>
          </div>
          
          {/* --- Formulario con nuevos estilos --- */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Campo Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Mascota
                </label>
                <input
                  id="name"
                  type="text" 
                  name="name"
                  value={formData.name ?? ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00527C] focus:border-transparent transition" 
                  required
                />
              </div>
              
              {/* Campo Raza */}
              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
                  Raza
                </label>
                <input
                  id="breed"
                  type="text" 
                  name="breed"
                  value={formData.breed ?? ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00527C] focus:border-transparent transition" 
                  required
                />
              </div>
            </div>

            {/* Campo Edad */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Edad (años)
              </label>
              <input
                id="age"
                type="number" 
                name="age"
                value={formData.age ?? 0}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00527C] focus:border-transparent transition" 
                min="0" required
              />
            </div>

            {/* Campo Photo URL */}
            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                URL de la Foto (Opcional)
              </label>
              <input
                id="photoUrl"
                type="text" 
                name="photoUrl"
                value={formData.photoUrl ?? ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00527C] focus:border-transparent transition"
              />
            </div>
            
            {/* --- Botones de Acción --- */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={mutationLoading}
              >
                {mutationLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}