'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import MedicalEntryForm from '@/components/medical/medicalEntryForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AuthGuard from '@/components/auth/authGuard';

export default function AddEntryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const petId = searchParams.get('petId');
  
  // Usamos nuestro propio AuthContext
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Si no hay petId, mostramos un error claro.
  if (!petId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg text-center">
          <h1 className="text-xl font-bold text-red-600">Error: Falta el ID de la mascota.</h1>
          <p className="my-4">No se puede añadir un historial sin saber a qué mascota pertenece.</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link 
            href={`/user/gestion-mascotas/petDetails/${petId}`} 
            className="text-blue-600 hover:underline mb-6 inline-block"
          >
            ← Volver a los Detalles de la Mascota
          </Link>
          
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Nueva Entrada Médica</h1>
            <p className="text-gray-600 mb-6">Completa los detalles del procedimiento médico.</p>
            
            <MedicalEntryForm 
              petId={petId}
              userId={user!.id} // Sabemos que el usuario existe gracias a AuthGuard
              onSuccess={() => {
                // Redirigimos a la página de detalles de la mascota después del éxito
                router.push(`/user/gestion-mascotas/petDetails/${petId}`);
              }}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}