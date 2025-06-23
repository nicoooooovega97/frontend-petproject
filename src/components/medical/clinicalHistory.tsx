'use client';

import { useState } from 'react'; // Importamos useState para el buscador
import { useQuery } from '@apollo/client';
import Link from "next/link";
import { FiEdit, FiSearch, FiX } from "react-icons/fi"; // Importamos iconos

import { GET_HISTORY_BY_PET_ID_QUERY } from '@/graphql/medical/medical.operations';
import { ClinicalHistoryDto } from '@/types/generated/graphql';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface ClinicalHistoryProps {
  petId: string;
}

export default function ClinicalHistory({ petId }: ClinicalHistoryProps) {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador

  const { data, loading, error, refetch } = useQuery(GET_HISTORY_BY_PET_ID_QUERY, {
    variables: { petId },
    skip: !petId,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div className="..."><LoadingSpinner /></div>;
  if (error) return <ErrorMessage title="Error" message={error.message} onRetry={() => refetch()} />;

  const allEntries = data?.getClinicalHistoryByPetId || [];

  // Filtramos las entradas basándonos en el término de búsqueda
  const filteredEntries = allEntries.filter((entry: ClinicalHistoryDto) => 
    entry.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.treatmentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Barra de Búsqueda */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por diagnóstico, tratamiento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
            <FiX />
          </button>
        )}
      </div>

      {/* Lista de Entradas */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {searchTerm ? 'No se encontraron registros que coincidan con tu búsqueda.' : 'Esta mascota aún no tiene registros médicos.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry: ClinicalHistoryDto) => (
            <article key={entry.id} className="border-l-4 border-[#00527C] p-4 bg-gray-50 rounded-r-lg shadow-sm">
              <header className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {new Date(entry.date).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Atendido por: {entry.veterinarianName}</p>
                </div>
                {/* Botón de Editar */}
                <Link
                  href={`/user/clinical-history/editEntry/${entry.id}?petId=${petId}`}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FiEdit />
                  Editar
                </Link>
              </header>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p><strong className="font-medium">Diagnóstico:</strong> {entry.diagnosis}</p>
                <p><strong className="font-medium">Tratamiento:</strong> {entry.treatmentType}</p>
                <p><strong className="font-medium">Descripción:</strong> {entry.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}