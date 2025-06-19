// src/components/medical/ClinicalHistory.tsx
import { MedicalEntry } from "@/types/medical";
import Link from "next/link";

interface ClinicalHistoryProps {
  petId?: string; // Opcional: filtrar por mascota
  entries: MedicalEntry[];
}

export default function ClinicalHistory({ petId, entries }: ClinicalHistoryProps) {
  // Datos de ejemplo consistentes con las mascotas del PetCard
  const sampleEntries: MedicalEntry[] = [
    {
      id: '1',
      petId: '1', // Max (Golden Retriever)
      date: '2023-10-15T10:30:00Z',
      diagnosis: 'Control de vacunación anual',
      treatment: 'Vacuna multivalente aplicada. Próximo control en 1 año.',
      vet: 'Dr. Rodríguez',
      notes: 'El paciente se comportó excelentemente durante el procedimiento'
    },
    {
      id: '2',
      petId: '1', // Max
      date: '2023-08-20T16:45:00Z',
      diagnosis: 'Dermatitis alérgica',
      treatment: 'Antihistamínicos cada 12h por 7 días. Champú medicado.',
      vet: 'Dra. Martínez',
      notes: 'Revisar posible alergia alimentaria en próxima visita'
    },
    {
      id: '3',
      petId: '2', // Luna (Siamés)
      date: '2023-11-05T09:15:00Z',
      diagnosis: 'Esterilización',
      treatment: 'Postoperatorio normal. Medicación analgésica por 5 días.',
      vet: 'Dr. González',
      notes: 'Reposo absoluto por 10 días. Control de puntos en 1 semana'
    }
  ];

  // Usa los entries prop o los de ejemplo
  const displayedEntries = entries.length > 0 ? entries : sampleEntries;
  const filteredEntries = petId 
    ? displayedEntries.filter(entry => entry.petId === petId) 
    : displayedEntries;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Historial Clínico
          {petId && <span className="text-lg font-normal text-gray-600 ml-2">(Mascota ID: {petId})</span>}
        </h2>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <p className="text-lg text-blue-800">No hay registros médicos</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div 
              key={entry.id} 
              className="border-l-4 border-[#00527c] bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">
                  {new Date(entry.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {entry.vet}
                </span>
              </div>
              
              <div className="mt-3">
                <p className="font-medium text-gray-700">Diagnóstico:</p>
                <p className="text-gray-700 ml-2">{entry.diagnosis}</p>
              </div>
              
              <div className="mt-2">
                <p className="font-medium text-gray-700">Tratamiento:</p>
                <p className="text-gray-700 ml-2">{entry.treatment}</p>
              </div>
              
              {entry.notes && (
                <div className="mt-2">
                  <p className="font-medium text-gray-700">Notas:</p>
                  <p className="text-gray-600 text-sm ml-2">{entry.notes}</p>
                </div>
              )}
              
              <Link
                href={`/user/clinical-history/editEntry/${entry.id}`}
                className="inline-block mt-3 text-[#00527c] hover:underline text-sm"
              >
                Editar registro →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}