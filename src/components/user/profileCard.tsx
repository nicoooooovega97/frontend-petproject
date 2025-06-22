// src/components/user/profileCard.tsx
'use client';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_PROFILE } from '@/graphql/user/mutations';
import { UserProfile } from '@/types/user';
import Button from '@/components/ui/button';

interface ProfileCardProps {
  userData: UserProfile;
}

export default function ProfileCard({ userData }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    petsCount: 0
  });
  const [updateUser, { loading, error: updateError }] = useMutation(UPDATE_USER_PROFILE);

  // Inicializar formulario con datos del usuario
  useEffect(() => {
    if (userData) {
      setFormData({
        phone: userData.phone || '',
        petsCount: userData.petsCount || 0
      });
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'petsCount' ? parseInt(value) || 0 : value
    }));
  };

  const handleSave = async () => {
    // Validación básica
    if (!formData.phone.match(/^\+?[\d\s-]{7,15}$/)) {
      alert("Por favor ingrese un número de teléfono válido");
      return;
    }

    try {
      await updateUser({
        variables: {
          input: {
            phone: formData.phone,
            petsCount: formData.petsCount
          }
        },
        optimisticResponse: {
          updateUser: {
            __typename: "User",
            id: userData.id,
            name: userData.name,
            email: userData.email,
            rut: userData.rut,
            phone: formData.phone,
            petsCount: formData.petsCount,
            joinDate: userData.joinDate
          }
        }
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
    }
  };

  if (!userData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#00527C] border-b pb-2 mb-4">
        Perfil de Usuario
      </h2>
      
      {/* Avatar y nombre */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-[#00527C] bg-opacity-10 rounded-full flex items-center justify-center text-[#00527C] text-2xl font-bold">
          {userData.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{userData.name}</h3>
          <p className="text-gray-600 text-sm">{userData.email}</p>
        </div>
      </div>
      
      {/* Información del perfil */}
      <div className="space-y-4">
        {/* RUT (no editable) */}
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">RUT:</span>
          <span>{userData.rut || 'No especificado'}</span>
        </div>
        
        {/* Teléfono (editable) */}
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Teléfono:</span>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border rounded p-1 text-right w-40"
              placeholder="+56 9 1234 5678"
            />
          ) : (
            <span>{formData.phone || 'No especificado'}</span>
          )}
        </div>
        
        {/* Número de mascotas (editable) */}
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Mascotas registradas:</span>
          {isEditing ? (
            <input
              type="number"
              name="petsCount"
              value={formData.petsCount}
              onChange={handleInputChange}
              className="border rounded p-1 w-16 text-right"
              min="0"
            />
          ) : (
            <span>{formData.petsCount}</span>
          )}
        </div>
        
        {/* Fecha de registro (no editable) */}
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Miembro desde:</span>
          <span>
            {new Date(userData.joinDate).toLocaleDateString('es-CL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Mensaje de error */}
      {updateError && (
        <div className="mt-4 p-2 bg-red-50 text-red-600 text-sm rounded">
          Error: {updateError.message}
        </div>
      )}

      {/* Botones de acción */}
      <div className="mt-6">
        {isEditing ? (
          <div className="flex gap-3">
            <Button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#00527C] hover:bg-[#003d5a] text-white"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full bg-[#00527C] hover:bg-[#003d5a] text-white"
          >
            Editar perfil
          </Button>
        )}
      </div>
    </div>
  );
}