import AuthGuard from "@/components/auth/authGuard";
import Sidebar from "@/components/dashboard/sidebar"; // Importamos el Sidebar aquí

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex">
        {/* El Sidebar ahora vive en este layout, así no tienes que repetirlo en cada página */}
        <Sidebar />
        {/* El 'children' será el contenido de cada página (dashboard, myPets, etc.) */}
        <main className="flex-1 ml-64 pt-16"> {/* Dejamos espacio para Sidebar y topbar */}
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}