'use client';

// 1. Importamos el tipo generado para el perfil de usuario.
//    No necesitamos nada más de React ya que será de solo lectura.
import { UserDto } from '@/types/generated/graphql';
import Button from '@/components/ui/button'; // Mantenemos el botón por si quieres añadir acciones

// 2. La prop ahora es del tipo correcto y más seguro.
//    Usamos Pick para ser explícitos sobre qué campos esperamos.
interface ProfileCardProps {
  userData: Pick<UserDto, 'id' | 'name' | 'lastName' | 'email'>;
}

export default function ProfileCard({ userData }: ProfileCardProps) {

  // Si no hay datos de usuario, no renderizamos nada para evitar errores.
  if (!userData) {
    return null;
  }

  // 3. El JSX ahora solo muestra los campos que existen en UserDto.
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full">
      <h2 className="text-3xl font-bold text-[#00527C] border-b-2 border-gray-100 pb-4 mb-6 text-center">
        Perfil de Usuario
      </h2>
      
      {/* Avatar y nombre */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-24 h-24 bg-[#00527C] bg-opacity-10 rounded-full flex items-center justify-center text-[#00527C] text-4xl font-bold">
          {userData.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-center">{`${userData.name} ${userData.lastName ?? ''}`}</h3>
          <p className="text-gray-500 text-md text-center">{userData.email}</p>
        </div>
      </div>
      
      {/* Información del perfil (solo los campos disponibles) */}
      <div className="space-y-4">
        

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="font-medium text-gray-600">Nombre:</span>
          <span className="text-gray-800">{`${userData.name} ${userData.lastName ?? ''}`}</span>
        </div>
        
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="font-medium text-gray-600">Correo Electrónico:</span>
          <span className="text-gray-800">{userData.email}</span>
        </div>
      </div>
    </div>
  );
}