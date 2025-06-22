// src/components/medical/ClinicalHistory.tsx
'use client';
import { useQuery } from '@apollo/client';
import Link from "next/link";
import { GET_MEDICAL_RECORDS } from '@/graphql/medical/queries';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { MedicalRecord } from '@/types/medical';

interface ClinicalHistoryProps {
  petId: string;
  showAddButton?: boolean;
}

export default function ClinicalHistory({ 
  petId, 
  showAddButton = true 
}: ClinicalHistoryProps) {
  const { data, loading, error } = useQuery(GET_MEDICAL_RECORDS, {
    variables: { petId },
    fetchPolicy: 'cache-and-network',
    pollInterval: 30000 // Actualiza cada 30 segundos
  });

  const entries = data?.medicalRecords || [];

  if (loading) return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-center py-8">
        <LoadingSpinner size="md" />
        <span className="sr-only">Cargando historial médico...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <ErrorMessage 
        title="Error al cargar historial médico"
        message={error.message}
        onRetry={() => window.location.reload()}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Historial Clínico
        </h2>
        
        {showAddButton && (
          <Link
            href={`/user/clinical-history/addEntry?petId=${petId}`}
            className="bg-[#00527c] text-white px-4 py-2 rounded hover:bg-[#003d5a] flex items-center transition-colors"
            aria-label="Añadir nuevo registro médico"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo Registro
          </Link>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-lg text-blue-800 mb-4">No hay registros médicos</p>
          {showAddButton && (
            <Link
              href={`/user/clinical-history/addEntry?petId=${petId}`}
              className="inline-block bg-[#00527c] text-white px-4 py-2 rounded-lg hover:bg-[#003d5a] transition-colors"
            >
              Crear primer registro
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4" role="list">
          {entries.map((entry: MedicalRecord) => (
            <article 
              key={entry.id} 
              className="border-l-4 border-[#00527c] bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-labelledby={`record-${entry.id}-title`}
            >
              <header className="flex justify-between items-start">
                <h3 
                  id={`record-${entry.id}-title`}
                  className="text-lg font-semibold text-gray-800"
                >
                  <time dateTime={entry.date}>
                    {new Date(entry.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {entry.vet}
                </span>
              </header>
              
              <div className="mt-3">
                <h4 className="font-medium text-gray-700">Diagnóstico:</h4>
                <p className="text-gray-700 ml-2">{entry.diagnosis}</p>
              </div>
              
              <div className="mt-2">
                <h4 className="font-medium text-gray-700">Tratamiento:</h4>
                <p className="text-gray-700 ml-2">{entry.treatment}</p>
              </div>
              
              {entry.notes && (
                <div className="mt-2">
                  <h4 className="font-medium text-gray-700">Notas:</h4>
                  <p className="text-gray-600 text-sm ml-2">{entry.notes}</p>
                </div>
              )}
              
              <footer className="flex justify-end gap-2 mt-3">
                <Link
                  href={`/user/clinical-history/editEntry/${entry.id}`}
                  className="text-[#00527c] hover:underline text-sm"
                  aria-label={`Editar registro del ${new Date(entry.date).toLocaleDateString()}`}
                >
                  Editar →
                </Link>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}