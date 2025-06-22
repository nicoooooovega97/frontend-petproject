// src/app/(user)/clinical-history/clinicalHistory/page.tsx
'use client';

import ClinicalHistory from '@/components/medical/clinicalHistory';
import { useParams } from 'next/navigation';
import Link from "next/link";


export default function ClinicalHistoryPage() {
  const { id: petId } = useParams();

  return (
    <div className="min-h-screen bg-[#00527c]">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/user" 
          className="bg-white text-[#00527c] px-4 py-2 rounded-lg inline-flex items-center mb-6 hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver atrás
        </Link>
        
        <ClinicalHistory petId={petId as string} showAddButton={true} />
      </div>
    </div>
  );
}