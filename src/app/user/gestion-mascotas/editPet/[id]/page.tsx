// src/app/(user)/gestion-mascotas/editPet/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EditPetPage() {
  const { petId } = useParams();
  const router = useRouter();
  
  // Estado para los datos de la mascota
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: 0,
    gender: 'MALE',
    healthStatus: 'HEALTHY',
    species: '',
    birthDate: '',
    color: '',
    coatType: ''
  });

  // Cargar los datos de la mascota al montar el componente
  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los datos de la mascota
    // Esto es un ejemplo con datos mock
    const fetchPetData = async () => {
      // Simulando una llamada a la API
      const mockPets = [
        {
          id: '1',
          name: 'Max',
          breed: 'Golden Retriever',
          age: 3,
          gender: 'MALE',
          healthStatus: 'HEALTHY',
          species: 'Perro',
          birthDate: '2020-05-15',
          color: 'Dorado',
          coatType: 'Largo y ondulado'
        },
        // ... otras mascotas
      ];
      
      const pet = mockPets.find(p => p.id === petId);
      if (pet) {
        setPetData(pet);
      }
    };
    
    fetchPetData();
  }, [petId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aquí iría la llamada a tu API para actualizar la mascota
      console.log('Datos a enviar:', petData);
      
      // Simulando una respuesta exitosa
      alert('Mascota actualizada correctamente');
      router.push('/user/gestion-mascotas/myPets');
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      alert('Error al actualizar la mascota');
    }
  };

  return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Editar Mascota</h1>
            <Link 
              href="/user/gestion-mascotas/myPets" 
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={petData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                  required
                />
              </div>
              
              {/* Especie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                <input
                  type="text"
                  name="species"
                  value={petData.species}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                  required
                />
              </div>
              
              {/* Raza */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raza</label>
                <input
                  type="text"
                  name="breed"
                  value={petData.breed}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                  required
                />
              </div>
              
              {/* Edad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                <input
                  type="number"
                  name="age"
                  value={petData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                  min="0"
                  required
                />
              </div>
              
              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                <select
                  name="gender"
                  value={petData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                >
                  <option value="MALE">Macho</option>
                  <option value="FEMALE">Hembra</option>
                </select>
              </div>
              
              {/* Estado de salud */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado de salud</label>
                <select
                  name="healthStatus"
                  value={petData.healthStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                >
                  <option value="HEALTHY">Saludable</option>
                  <option value="TREATMENT">En tratamiento</option>
                </select>
              </div>
              
              {/* Fecha de nacimiento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="birthDate"
                  value={petData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                />
              </div>
              
              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={petData.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                />
              </div>
              
              {/* Tipo de pelaje */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de pelaje</label>
                <input
                  type="text"
                  name="coatType"
                  value={petData.coatType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00527c] focus:border-[#00527c]"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                className="bg-[#00527c] text-white px-6 py-2 rounded-lg hover:bg-[#003a5a] transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}