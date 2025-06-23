'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import EditMedicalEntryForm from '@/components/medical/editMedicalEntryForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EditEntryPage() {
  const { id: historyId } = useParams();
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId');

  // Validar que tenemos los IDs necesarios
  if (!historyId || !petId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-red-500 text-xl">Error: Faltan los IDs necesarios.</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href={`/user/gestion-mascotas/petDetails/${petId}`} 
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Volver a los Detalles de la Mascota
        </Link>
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Entrada Médica</h1>
          <EditMedicalEntryForm 
            historyId={historyId as string} 
            petId={petId as string}
          />
        </div>
      </div>
    </div>
  );
}