// src/app/(user)/historial-medico/addEntry/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import MedicalEntryForm from '@/components/medical/medicalEntryForm';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AddEntryPage() {
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId');
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#00527c] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!petId) {
    return (
      <div className="min-h-screen bg-[#00527c]">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error: Falta ID de mascota</h1>
            <Link 
              href="/user" 
              className="bg-[#00527c] text-white px-4 py-2 rounded-lg inline-flex items-center hover:bg-[#003d5a] transition-colors"
            >
              Volver al dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user?.vetId) {
    return (
      <div className="min-h-screen bg-[#00527c]">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso no autorizado</h1>
            <p className="mb-4">Solo los veterinarios pueden agregar entradas médicas.</p>
            <Link 
              href="/user" 
              className="bg-[#00527c] text-white px-4 py-2 rounded-lg inline-flex items-center hover:bg-[#003d5a] transition-colors"
            >
              Volver al dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href={`/user/historial-medico?petId=${petId}`} 
          className="bg-white text-[#00527c] px-4 py-2 rounded-lg inline-flex items-center mb-6 hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver al historial
        </Link>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nueva Entrada Médica</h1>
          <p className="text-gray-600 mb-6">Complete los detalles del procedimiento médico</p>
          
          <MedicalEntryForm 
            petId={petId} 
            vetId={session.user.vetId} 
            onSuccess={() => {
              // Redirige al historial médico después de crear el registro
              window.location.href = `/user/historial-medico?petId=${petId}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}