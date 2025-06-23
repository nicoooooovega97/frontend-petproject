'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

import { GET_PET_DETAILS_QUERY, GET_PETS_BY_OWNER_QUERY } from '@/graphql/pets/pets.operations';
import { DELETE_PET_MUTATION } from '@/graphql/pets/pets.operations';
import ClinicalHistory from '@/components/medical/clinicalHistory'; // Componente que acabamos de corregir
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/button';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';

export default function PetDetailsPage() {
  const { id: petId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_PET_DETAILS_QUERY, {
    variables: { id: petId as string },
    skip: !petId,
  });

  const [deletePet, { loading: deleteLoading }] = useMutation(DELETE_PET_MUTATION, {
    onCompleted: () => {
      toast.success("Mascota eliminada.");
      router.push('/user/gestion-mascotas/myPets');
    },
    onError: (err) => toast.error(err.message),
    refetchQueries: [{ 
      query: GET_PETS_BY_OWNER_QUERY, 
      variables: { ownerId: user?.id } 
    }],
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      deletePet({ variables: { id: petId as string } });
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
  if (error) return <p>Error: {error.message}</p>;

  const pet = data?.pet;

  if (!pet) return <p>Mascota no encontrada.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-6">
            <div className='flex items-center gap-4'>
              <Image src={pet.photoUrl || '/default-pet.jpg'} alt={pet.name} width={80} height={80} className="rounded-full object-cover" />
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{pet.name}</h1>
                <p className="text-lg text-gray-500">{pet.breed} • {pet.age} años</p>
              </div>
            </div>
            <Link href="/user/gestion-mascotas/myPets" className="text-sm text-blue-600 hover:underline">
              ← Volver a Mis Mascotas
            </Link>
          </div>

          {/* Sección de Historial Clínico */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Historial Clínico</h2>
              <Link
                href={`/user/clinical-history/addEntry?petId=${pet.id}`}
                className="bg-[#00527C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#003d5a]"
              >
                + Añadir Entrada
              </Link>
            </div>
            {/* Renderizamos el componente que obtiene y muestra el historial */}
            <ClinicalHistory petId={pet.id} />
          </div>

          {/* Sección de Acciones */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <Link
              href={`/user/gestion-mascotas/editPet/${pet.id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
            >
              Editar Mascota
            </Link>
            <Button
              variant="secondary"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Eliminando...' : 'Eliminar Mascota'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}