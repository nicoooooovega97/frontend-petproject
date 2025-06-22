// src/components/medical/MedicalEntryForm.tsx
'use client';

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { CREATE_MEDICAL_RECORD } from "@/graphql/medical/mutations";
import { MedicalRecordType } from "@/types/medical";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";

type EntryType = MedicalRecordType;

interface BaseEntry {
  date: string;
  petId: string;
  vetId: string;
  notes?: string;
}

interface ConsultaEntry extends BaseEntry {
  type: 'CONSULTATION';
  diagnosis: string;
  treatment: string;
}

interface VacunaEntry extends BaseEntry {
  type: 'VACCINATION';
  vaccineType: string;
  nextVaccinationDate: string;
}

interface CirugiaEntry extends BaseEntry {
  type: 'SURGERY';
  diagnosis: string;
  surgeryType: string;
}

type MedicalEntry = ConsultaEntry | VacunaEntry | CirugiaEntry;

interface MedicalEntryFormProps {
  petId: string;
  vetId: string;
  onSuccess?: () => void;
}

export default function MedicalEntryForm({ petId, vetId, onSuccess }: MedicalEntryFormProps) {
  const router = useRouter();
  const [entryType, setEntryType] = useState<EntryType>('CONSULTATION');
  const [entry, setEntry] = useState<MedicalEntry>({
    type: 'CONSULTATION',
    date: new Date().toISOString().split('T')[0],
    petId,
    vetId,
    diagnosis: '',
    treatment: ''
  } as ConsultaEntry);

  const [createMedicalRecord, { loading, error }] = useMutation(CREATE_MEDICAL_RECORD, {
    onCompleted: () => {
      onSuccess ? onSuccess() : router.push(`/user/clinical-history?petId=${petId}`);
    },
    refetchQueries: ['GetMedicalRecords']
  });

  const handleTypeChange = (type: EntryType) => {
    setEntryType(type);
    const base = {
      date: entry.date,
      petId,
      vetId,
      notes: entry.notes,
      type
    };
    
    switch(type) {
      case 'CONSULTATION':
        setEntry({
          ...base,
          diagnosis: '',
          treatment: ''
        } as ConsultaEntry);
        break;
      case 'VACCINATION':
        setEntry({
          ...base,
          vaccineType: '',
          nextVaccinationDate: ''
        } as VacunaEntry);
        break;
      case 'SURGERY':
        setEntry({
          ...base,
          diagnosis: '',
          surgeryType: ''
        } as CirugiaEntry);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntry({
      ...entry,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createMedicalRecord({
        variables: {
          input: {
            ...entry,
            date: new Date(entry.date).toISOString()
          }
        }
      });
    } catch (err) {
      console.error("Error creating medical record:", err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;
  if (error) return <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Nuevo Registro Médico</h2>
      
      <div className="flex border-b mb-6">
        <button
          type="button"
          onClick={() => handleTypeChange('CONSULTATION')}
          className={`px-4 py-2 font-medium ${
            entryType === 'CONSULTATION' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Consulta
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('VACCINATION')}
          className={`px-4 py-2 font-medium ${
            entryType === 'VACCINATION' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Vacuna
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('SURGERY')}
          className={`px-4 py-2 font-medium ${
            entryType === 'SURGERY' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Cirugía
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Fecha *</label>
            <input
              type="date"
              name="date"
              value={entry.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {entryType === 'CONSULTATION' && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Diagnóstico *</label>
              <textarea
                name="diagnosis"
                value={(entry as ConsultaEntry).diagnosis}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Tratamiento *</label>
              <textarea
                name="treatment"
                value={(entry as ConsultaEntry).treatment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
          </>
        )}

        {entryType === 'VACCINATION' && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Tipo de Vacuna *</label>
              <input
                type="text"
                name="vaccineType"
                value={(entry as VacunaEntry).vaccineType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Próxima Vacunación *</label>
              <input
                type="date"
                name="nextVaccinationDate"
                value={(entry as VacunaEntry).nextVaccinationDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}

        {entryType === 'SURGERY' && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Diagnóstico *</label>
              <textarea
                name="diagnosis"
                value={(entry as CirugiaEntry).diagnosis}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Tipo de Cirugía *</label>
              <input
                type="text"
                name="surgeryType"
                value={(entry as CirugiaEntry).surgeryType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700 mb-1">Notas Adicionales</label>
          <textarea
            name="notes"
            value={entry.notes || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Registro'}
          </Button>
        </div>
      </form>
    </div>
  );
}