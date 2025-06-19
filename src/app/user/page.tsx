import Sidebar from '@/components/dashboard/sidebar';

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenido principal */}
      <main className="flex-1 p-6 ml-64"> {/* ml-64 para dejar espacio al sidebar */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Bienvenido a tu Panel</h1>

          {/* Sección de mascotas recientes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Tus mascotas</h2>
            <div className="space-y-4">
              <p>Aún no has registrado mascotas.</p>
              <a 
                href="/user/gestion-mascotas/addPet"
                className="inline-block bg-[#00527C] text-white px-4 py-2 rounded-lg hover:bg-[#003d5c] transition-colors"
              >
                Añadir mascota
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}