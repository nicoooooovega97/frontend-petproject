'use client';

import PetCard from "@/components/user/petCard";
import ClinicalHistory from "@/components/medical/clinicalHistory";
import Link from "next/link";
import { MedicalEntry } from "@/types/medical";
import { useState } from "react";

export default function PetDetailsPage() {
  // Datos de ejemplo de mascotas
  const petsData = [
    {
      id: '1',
      name: 'Max',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'MALE',
      healthStatus: 'HEALTHY',
      photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600',
      species: 'Perro',
      birthDate: '2020-05-15',
      color: 'Dorado',
      coatType: 'Largo y ondulado',
      ownerName: 'Juan Pérez' // Nuevo campo añadido
    },
    {
      id: '2',
      name: 'Luna',
      breed: 'Siamés',
      age: 2,
      gender: 'FEMALE',
      healthStatus: 'HEALTHY',
      photoUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
      species: 'Gato',
      birthDate: '2021-08-20',
      color: 'Crema con puntos oscuros',
      coatType: 'Corto',
      ownerName: 'María García' // Nuevo campo añadido
    },
    {
      id: '3',
      name: 'Rocky',
      breed: 'Bulldog Francés',
      age: 5,
      gender: 'MALE',
      healthStatus: 'TREATMENT',
      photoUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
      species: 'Perro',
      birthDate: '2018-11-10',
      color: 'Atigrado',
      coatType: 'Corto y liso',
      ownerName: 'Carlos López' // Nuevo campo añadido
    }
  ];

  // Historial médico de ejemplo (sin cambios)
  const medicalData: Record<string, MedicalEntry[]> = {
    '1': [
      {
        id: '101',
        petId: '1',
        date: '2023-10-15T10:30:00Z',
        diagnosis: 'Control de vacunación anual',
        treatment: 'Vacuna multivalente aplicada. Próximo control en 1 año.',
        vet: 'Dr. Rodríguez'
      },
      {
        id: '102',
        petId: '1',
        date: '2023-08-20T16:45:00Z',
        diagnosis: 'Dermatitis alérgica',
        treatment: 'Antihistamínicos cada 12h por 7 días. Champú medicado.',
        vet: 'Dra. Martínez'
      }
    ],
    '2': [
      {
        id: '201',
        petId: '2',
        date: '2023-11-05T09:15:00Z',
        diagnosis: 'Esterilización',
        treatment: 'Postoperatorio normal. Medicación analgésica por 5 días.',
        vet: 'Dr. González'
      }
    ],
    '3': [] // Rocky no tiene historial
  };

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const selectedPet = selectedPetId ? petsData.find(pet => pet.id === selectedPetId) : null;
  const medicalEntries = selectedPetId ? medicalData[selectedPetId] || [] : [];

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
            {petsData.map(pet => (
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
          {selectedPet && (
            <div className="mt-8 pt-8 border-t">
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
                      <p className="font-medium">{selectedPet.ownerName}</p>
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
                    <div>
                      <p className="text-sm text-gray-500">Color</p>
                      <p className="font-medium">{selectedPet.color}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tipo de pelaje</p>
                      <p className="font-medium">{selectedPet.coatType}</p>
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
                  {medicalEntries.length > 0 ? (
                    <ClinicalHistory 
                      petId={selectedPet.id}
                      entries={medicalEntries} 
                    />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Esta mascota no tiene registros médicos.</p>
                    </div>
                  )}
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
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Eliminar Mascota
                </button>
              </div>
            </div>               
          )}
        </div>
      </div>
    </div>
  );
}