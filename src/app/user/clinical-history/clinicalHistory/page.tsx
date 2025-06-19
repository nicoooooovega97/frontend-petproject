// src/app/(user)/clinical-history/clinicalHistory/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClinicalHistoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/clinical-history');
        if (!response.ok) {
          throw new Error('Failed to fetch clinical history');
        }
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Historial Clínico</h1>
          
          {loading ? (
            <p>Cargando historial...</p>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : entries.length === 0 ? (
            <p>No hay registros clínicos disponibles</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium">{entry.date} - {entry.procedure}</h3>
                  <p className="text-gray-600">{entry.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}