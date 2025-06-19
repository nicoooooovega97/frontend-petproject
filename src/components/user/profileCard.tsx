"use client";

import { useState } from "react";
import Button from "../ui/button";

export default function ProfileCard() {
  // Estado inicial con datos simulados
  const [user, setUser] = useState({
    name: "Nicolas Vega",
    email: "nicoveegaa@gmail.com",
    rut: "12.345.678-9",
    phone: "+56 9 8765 4321",
    petsCount: 2,
    joinDate: "2023-01-15"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí podrías agregar lógica para guardar los cambios en tu backend
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#00527C] border-b pb-2">
        Perfil de Usuario
      </h2>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-[#00527C] bg-opacity-10 rounded-full flex items-center justify-center text-[#00527C] text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">RUT:</span>
          <span>{user.rut}</span>
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Teléfono:</span>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="border rounded p-1 text-right"
            />
          ) : (
            <span>{user.phone}</span>
          )}
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Nº de Mascotas:</span>
          {isEditing ? (
            <input
              type="number"
              name="petsCount"
              value={user.petsCount}
              onChange={handleInputChange}
              className="border rounded p-1 w-16 text-right"
              min="0"
            />
          ) : (
            <span>{user.petsCount}</span>
          )}
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Miembro desde:</span>
          <span>{new Date(user.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
      
      {isEditing ? (
        <div className="flex space-x-2">
          <Button 
            onClick={() => setIsEditing(false)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Guardar
          </Button>
        </div>
      ) : (
        <Button 
          onClick={() => setIsEditing(true)}
          className="w-full bg-[#00527C] hover:bg-[#003d5c] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Editar Perfil
        </Button>
      )}
    </div>
  );
}