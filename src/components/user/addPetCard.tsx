'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  color: string;
  coatType: string;
  age: number;
  imageUrl: string;
  ownerName: string; // Nuevo campo añadido
}

interface AddPetCardProps {
  onAddPet: (pet: Omit<Pet, 'id'>) => void;
  onCancel: () => void;
}

const AddPetCard: React.FC<AddPetCardProps> = ({ onAddPet, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Pet, 'id'>>({
    name: '',
    species: '',
    breed: '',
    color: '',
    coatType: '',
    age: 0,
    imageUrl: '',
    ownerName: '' // Inicializado como string vacío
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => value === '' || (typeof value === 'number' && isNaN(value)))) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }
    onAddPet(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Añadir Nueva Mascota</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Nuevo campo: Nombre del Dueño */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nombre del Dueño</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nombre de la Mascota</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Especie</label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Raza</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tipo de pelaje</label>
            <input
              type="text"
              name="coatType"
              value={formData.coatType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              min="0"
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">URL de la imagen</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00527c] text-white rounded-lg hover:bg-[#003d5a] transition-colors"
          >
            Guardar Mascota
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetCard;