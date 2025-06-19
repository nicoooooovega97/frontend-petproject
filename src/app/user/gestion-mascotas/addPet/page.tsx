// src/app/(user)/gestion-mascotas/addPet/page.tsx
'use client'; // Añade esta directiva al inicio del archivo

import AddPetCard from "@/components/user/addPetCard";
import Link from "next/link";
import { useState } from "react";

export default function AddPetPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddPet = (newPetData: Omit<Pet, 'id'>) => {
    // Aquí iría la lógica para guardar en tu base de datos o API
    console.log('Nueva mascota:', newPetData);
    setShowSuccess(true);
    
    // Opcional: resetear el formulario después de 3 segundos
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/user/" 
          className="bg-white text-[#00527c] px-4 py-2 rounded-lg inline-flex items-center mb-6 hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver atrás
        </Link>
        
        <div className="bg-white rounded-lg p-6"> 
          {showSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
              <p className="font-medium">¡Mascota añadida correctamente!</p>
              <p className="text-sm">Redirigiendo a la lista de mascotas...</p>
            </div>
          ) : null}
          
          <AddPetCard 
            onAddPet={handleAddPet}
            onCancel={() => window.history.back()}
          />
        </div>
      </div>
    </div>
  );
}

// Definición de tipos
interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  color: string;
  coatType: string;
  age: number;
  imageUrl: string;
}