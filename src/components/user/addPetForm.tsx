'use client';

import React, { useState } from 'react';
import { CreatePetInput } from '@/types/generated/graphql';
import Button from '../ui/button';

// El formulario solo necesita saber qué datos enviar, sin el ownerId
type PetFormData = Omit<CreatePetInput, 'ownerId'>;

interface AddPetFormProps {
  onAddPet: (data: PetFormData) => void;
  onCancel: () => void;
  loading: boolean;
}

const AddPetForm: React.FC<AddPetFormProps> = ({ onAddPet, onCancel, loading }) => {
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    breed: '',
    age: 0,
    photoUrl: '',
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
    onAddPet(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Añadir Nueva Mascota</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre de la Mascota */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de la Mascota</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
        </div>
        {/* Raza */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Raza</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
        </div>
        {/* Edad */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
              min="0"
            />
        </div>
        {/* URL de la imagen */}
        <div>
            <label className="block text-sm font-medium text-gray-700">URL de la imagen (Opcional)</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Mascota'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;