// src/components/medical/MedicalEntryForm.tsx
'use client';
import { useState } from "react";
import Button from "../ui/button";

type EntryType = 'consulta' | 'vacuna' | 'cirugia';

type BaseEntry = {
  date: string;
  petName: string;
};

type ConsultaEntry = BaseEntry & {
  type: 'consulta';
  diagnosis: string;
  treatment: string;
};

type VacunaEntry = BaseEntry & {
  type: 'vacuna';
  vaccineType: string;
  nextVaccinationDate: string;
};

type CirugiaEntry = BaseEntry & {
  type: 'cirugia';
  diagnosis: string;
  surgeryType: string;
  observations: string;
};

type MedicalEntry = ConsultaEntry | VacunaEntry | CirugiaEntry;

export default function MedicalEntryForm() {
  const [entryType, setEntryType] = useState<EntryType>('consulta');
  const [entry, setEntry] = useState<MedicalEntry>({
    type: 'consulta',
    date: new Date().toISOString().split('T')[0],
    petName: '',
    diagnosis: '',
    treatment: ''
  } as ConsultaEntry);

  const handleTypeChange = (type: EntryType) => {
    setEntryType(type);
    // Resetear el formulario al cambiar de tipo
    const base = {
      date: entry.date,
      petName: entry.petName,
      type
    };
    
    switch(type) {
      case 'consulta':
        setEntry({
          ...base,
          diagnosis: '',
          treatment: ''
        } as ConsultaEntry);
        break;
      case 'vacuna':
        setEntry({
          ...base,
          vaccineType: '',
          nextVaccinationDate: ''
        } as VacunaEntry);
        break;
      case 'cirugia':
        setEntry({
          ...base,
          diagnosis: '',
          surgeryType: '',
          observations: ''
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva entrada médica:", entry);
    // Lógica para guardar según el tipo
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex border-b mb-6">
        <button
          type="button"
          onClick={() => handleTypeChange('consulta')}
          className={`px-4 py-2 font-medium ${entryType === 'consulta' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Consulta
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('vacuna')}
          className={`px-4 py-2 font-medium ${entryType === 'vacuna' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Vacuna
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('cirugia')}
          className={`px-4 py-2 font-medium ${entryType === 'cirugia' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Cirugía
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              value={entry.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Nombre de la Mascota</label>
            <input
              type="text"
              name="petName"
              value={entry.petName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        {entryType === 'consulta' && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Diagnóstico</label>
              <textarea
                name="diagnosis"
                value={(entry as ConsultaEntry).diagnosis}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Tratamiento</label>
              <textarea
                name="treatment"
                value={(entry as ConsultaEntry).treatment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                rows={3}
                required
              />
            </div>
          </>
        )}

        {entryType === 'vacuna' && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Tipo de Vacuna</label>
              <input
                type="text"
                name="vaccineType"
                value={(entry as VacunaEntry).vaccineType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Próxima Vacunación</label>
              <input
                type="date"
                name="nextVaccinationDate"
                value={(entry as VacunaEntry).nextVaccinationDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </>
        )}

        {entryType === 'cirugia' && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Diagnóstico</label>
              <textarea
                name="diagnosis"
                value={(entry as CirugiaEntry).diagnosis}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Tipo de Cirugía</label>
              <input
                type="text"
                name="surgeryType"
                value={(entry as CirugiaEntry).surgeryType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Observaciones</label>
              <textarea
                name="observations"
                value={(entry as CirugiaEntry).observations}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                rows={3}
                required
              />
            </div>
          </>
        )}

        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 mt-4">
          Guardar Entrada
        </Button>
      </form>
    </div>
  );
}