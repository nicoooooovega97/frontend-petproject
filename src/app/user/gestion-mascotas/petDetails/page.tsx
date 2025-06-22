'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import PetCard from "@/components/user/petCard";
import ClinicalHistory from "@/components/medical/clinicalHistory";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GET_MY_PETS, GET_PET_DETAILS } from '@/graphql/pets/queries';
import { DELETE_PET_MUTATION } from '@/graphql/pets/mutations';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PetDetailsPage() {
  const router = useRouter();
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // 1. Obtener lista de mascotas
  const { data: petsData, loading: petsLoading, error: petsError } = useQuery(GET_MY_PETS);

  // 2. Obtener detalles de mascota seleccionada
  const { data: petData, loading: petLoading } = useQuery(GET_PET_DETAILS, {
    variables: { id: selectedPetId },
    skip: !selectedPetId
  });

  // 3. Mutación para eliminar mascota
  const [deletePet] = useMutation(DELETE_PET_MUTATION, {
    refetchQueries: [{ query: GET_MY_PETS }],
    onCompleted: () => {
      setSelectedPetId(null);
      router.refresh();
    }
  });

  const handleDeletePet = async (petId: string) => {
    if (confirm('¿Estás seguro de eliminar esta mascota? Esta acción no se puede deshacer.')) {
      await deletePet({ variables: { id: petId } });
    }
  };

  if (petsLoading) return (
    <div className="min-h-screen bg-[#00527c] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  if (petsError) return (
    <div className="min-h-screen bg-[#00527c] flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error al cargar mascotas</h2>
        <p className="mb-4">{petsError.message}</p>
        <button 
          onClick={() => router.refresh()}
          className="bg-[#00527c] text-white px-4 py-2 rounded-lg"
        >
          Reintentar
        </button>
      </div>
    </div>
  );

  const pets = petsData?.myPets || [];
  const selectedPet = petData?.pet;

  return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 space-y-8">
          {/* Título y botón de volver */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Mis Mascotas</h1>
            <Link 
              href="/user/" 
              className="bg-[#00527c] text-white px-4 py-2 rounded-lg inline-flex items-center hover:bg-[#003a5a] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver atrás
            </Link>
          </div>

          {/* Lista de todas las mascotas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map(pet => (
              <div key={pet.id} className="border rounded-lg overflow-hidden shadow-sm">
                <PetCard pet={pet} />
                <div className="p-4 bg-gray-50">
                  <button
                    onClick={() => setSelectedPetId(pet.id)}
                    className="w-full bg-[#00527c] text-white py-2 rounded-lg hover:bg-[#003a5a] transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detalles de la mascota seleccionada */}
          {selectedPetId && (
            <div className="mt-8 pt-8 border-t">
              {petLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : selectedPet ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Detalles de {selectedPet.name}</h2>
                    <button 
                      onClick={() => setSelectedPetId(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cerrar detalles
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Información básica */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Información básica</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Dueño/a</p>
                          <p className="font-medium">{selectedPet.owner?.name || 'No especificado'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Especie</p>
                          <p className="font-medium">{selectedPet.species}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Raza</p>
                          <p className="font-medium">{selectedPet.breed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Edad</p>
                          <p className="font-medium">{selectedPet.age} años</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Género</p>
                          <p className="font-medium">
                            {selectedPet.gender === 'MALE' ? 'Macho' : 'Hembra'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estado de salud</p>
                          <p className="font-medium">
                            {selectedPet.healthStatus === 'HEALTHY' ? 'Saludable' : 'En tratamiento'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Historial clínico */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Historial Clínico</h3>
                        <Link 
                          href={`/user/clinical-history/addEntry?petId=${selectedPet.id}`}
                          className="bg-[#00527c] text-white px-4 py-2 rounded-lg hover:bg-[#003a5a] transition-colors"
                        >
                          Nuevo Registro Médico
                        </Link>
                      </div>
                      <ClinicalHistory 
                        petId={selectedPet.id}
                        entries={selectedPet.medicalRecords || []} 
                      />
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex justify-end gap-4 pt-6 mt-6 border-t">
                    <Link
                      href={`/user/gestion-mascotas/editPet/${selectedPet.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Editar Mascota
                    </Link>
                    <button 
                      onClick={() => handleDeletePet(selectedPet.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Eliminar Mascota
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No se encontraron detalles para esta mascota.</p>
                </div>
              )}
            </div>               
          )}
        </div>
      </div>
    </div>
  );
}