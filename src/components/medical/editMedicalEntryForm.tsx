'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from 'react-hot-toast';

import Button from "../ui/button";
import LoadingSpinner from "../ui/LoadingSpinner";
import { GET_HISTORY_BY_PET_ID_QUERY, UPDATE_CLINICAL_HISTORY_MUTATION } from "@/graphql/medical/medical.operations";

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
// Usamos el nombre correcto de la query generado por codegen.
import { 
  UpdateClinicalHistoryDto, 
  GetClinicalHistoryByPetIdQuery, // <-- Nombre corregido
  ClinicalHistoryDto 
} from "@/types/generated/graphql";

interface EditFormProps {
  historyId: string;
  petId: string;
}

export default function EditMedicalEntryForm({ historyId, petId }: EditFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<UpdateClinicalHistoryDto>({});

  // Tipamos el hook con el nombre correcto
  const { loading: queryLoading } = useQuery<GetClinicalHistoryByPetIdQuery>(GET_HISTORY_BY_PET_ID_QUERY, {
    variables: { petId },
    skip: !petId,
    onCompleted: (queryData) => {
      // Usamos el nombre correcto para acceder a los datos
      const entry = queryData.getClinicalHistoryByPetId.find(
        (e: ClinicalHistoryDto) => e.id === historyId
      );
      
      if (entry) {
        setFormData({
          date: entry.date,
          description: entry.description,
          diagnosis: entry.diagnosis,
          treatmentType: entry.treatmentType,
          veterinarianName: entry.veterinarianName,
          veterinaryClinic: entry.veterinaryClinic,
        });
      }
    }
  });

  const [updateHistory, { loading: mutationLoading }] = useMutation(UPDATE_CLINICAL_HISTORY_MUTATION, {
    onCompleted: () => {
      toast.success('Registro actualizado correctamente.');
      router.push(`/user/gestion-mascotas/petDetails/${petId}`);
    },
    onError: (err) => toast.error(err.message),
    refetchQueries: [{ query: GET_HISTORY_BY_PET_ID_QUERY, variables: { petId } }]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHistory({
      variables: {
        id: historyId,
        input: {
          ...formData,
          date: new Date(formData.date!).toISOString(),
        }
      }
    });
  };

  if (queryLoading) return <div className="p-10 flex justify-center"><LoadingSpinner /></div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tu JSX no cambia, solo las importaciones y tipos de arriba */}
      {/* ... */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="datetime-local" name="date"
              value={formData.date ? new Date(formData.date).toISOString().substring(0, 16) : ''}
              onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Tratamiento</label>
            <input
              type="text" name="treatmentType" value={formData.treatmentType ?? ''}
              onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Veterinario</label>
            <input
              type="text" name="veterinarianName" value={formData.veterinarianName ?? ''}
              onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Clínica Veterinaria</label>
            <input
              type="text" name="veterinaryClinic" value={formData.veterinaryClinic ?? ''}
              onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required
            />
          </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Diagnóstico</label>
        <textarea
          name="diagnosis" value={formData.diagnosis ?? ''} onChange={handleInputChange}
          rows={3} className="mt-1 w-full p-2 border rounded-md" required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción / Notas</label>
        <textarea
          name="description" value={formData.description ?? ''} onChange={handleInputChange}
          rows={4} className="mt-1 w-full p-2 border rounded-md" required
        />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
        <Button type="submit" disabled={mutationLoading}>
          {mutationLoading ? 'Actualizando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </form>
  );
}