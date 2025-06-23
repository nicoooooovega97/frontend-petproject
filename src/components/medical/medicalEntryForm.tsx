'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { toast } from 'react-hot-toast';

import Button from "../ui/button";
import LoadingSpinner from "../ui/LoadingSpinner";

// 1. Importar la mutación y los tipos correctos desde los archivos generados
import { CREATE_CLINICAL_HISTORY_MUTATION, GET_HISTORY_BY_PET_ID_QUERY } from "@/graphql/medical/medical.operations";
import { CreateClinicalHistoryDto } from "@/types/generated/graphql";

// Props que el formulario necesita para funcionar
interface MedicalEntryFormProps {
  petId: string;
  userId: string;
  onSuccess?: () => void;
}

export default function MedicalEntryForm({ petId, userId, onSuccess }: MedicalEntryFormProps) {
  const router = useRouter();

  // 2. Simplificamos el estado para que coincida con el DTO
  const [formData, setFormData] = useState<Omit<CreateClinicalHistoryDto, 'petId' | 'userId'>>({
    date: new Date().toISOString(), // Usamos ISO string
    description: '',
    diagnosis: '',
    treatmentType: 'Consulta', // Valor por defecto
    veterinarianName: '',
    veterinaryClinic: '',
  });

  // 3. Usamos el hook de mutación generado
  const [createClinicalHistory, { loading, error }] = useMutation(CREATE_CLINICAL_HISTORY_MUTATION, {
    onCompleted: () => {
      toast.success('Registro médico añadido correctamente.');
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/user/gestion-mascotas/petDetails/${petId}`);
      }
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
    // Refrescar la query del historial de esta mascota para ver el nuevo registro
    refetchQueries: [
      { 
        query: GET_HISTORY_BY_PET_ID_QUERY, 
        variables: { petId } 
      }
    ]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClinicalHistory({
        variables: {
          input: {
            ...formData,
            petId,  // Añadimos el petId de las props
            userId, // Añadimos el userId de las props
          }
        }
      });
    } catch (err) {
      // El error ya lo maneja el callback onError del hook
      console.error("Error al crear registro médico:", err);
    }
  };

  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="p-2">
      {error && <p className="text-red-500 mb-4">Error: {error.message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Usamos grid para un layout limpio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="datetime-local" // Usamos datetime-local para que sea compatible con el tipo DateTime de GraphQL
              name="date"
              value={formData.date.substring(0, 16)} // Formato para el input datetime-local
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border rounded-md" required
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Tratamiento</label>
            <input
              type="text" name="treatmentType" value={formData.treatmentType}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border rounded-md" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Veterinario</label>
            <input
              type="text" name="veterinarianName" value={formData.veterinarianName}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border rounded-md" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Clínica Veterinaria</label>
            <input
              type="text" name="veterinaryClinic" value={formData.veterinaryClinic}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border rounded-md" required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Diagnóstico</label>
          <textarea
            name="diagnosis" value={formData.diagnosis} onChange={handleInputChange}
            rows={3} className="mt-1 w-full px-3 py-2 border rounded-md" required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción / Notas</label>
          <textarea
            name="description" value={formData.description} onChange={handleInputChange}
            rows={4} className="mt-1 w-full px-3 py-2 border rounded-md" required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Registro'}
          </Button>
        </div>
      </form>
    </div>
  );
}