import PetCard from "@/components/user/petCard";
import Link from "next/link";

export default function MyPetsPage() {
  // Datos de ejemplo que cumplen con la interfaz Pet
  const pets = [
    {
      id: '1',
      name: 'Max',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'MALE',
      healthStatus: 'HEALTHY',
      photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600',
      ownerName: 'Juan Pérez' // Nuevo campo añadido
    },
    {
      id: '2',
      name: 'Luna',
      breed: 'Siamés',
      age: 2,
      gender: 'FEMALE',
      healthStatus: 'HEALTHY',
      photoUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
      ownerName: 'María García' // Nuevo campo añadido
    },
    {
      id: '3',
      name: 'Rocky',
      breed: 'Bulldog Francés',
      age: 5,
      gender: 'MALE',
      healthStatus: 'TREATMENT',
      photoUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
      ownerName: 'Carlos López' // Nuevo campo añadido
    }
  ];

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mis Mascotas</h1>
            <Link 
              href="/user/gestion-mascotas/addPet" 
              className="bg-[#00527c] text-white px-4 py-2 rounded-lg hover:bg-[#003a5a] transition-colors"
            >
              Añadir mascota
            </Link>
          </div>
          
          {pets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <p className="text-lg text-blue-800 mb-4">No tienes mascotas registradas aún</p>
              <Link 
                href="/user/gestion-mascotas/addPet" 
                className="inline-block bg-[#00527c] text-white px-4 py-2 rounded-lg hover:bg-[#003a5a] transition-colors"
              >
                Registrar mi primera mascota
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}