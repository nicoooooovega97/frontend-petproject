// src/components/user/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="w-64 bg-blue-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Menú</h2>
      </div>
      <ul className="space-y-2">
        <li>
          <details>
            <summary className="cursor-pointer">Gestión Mascotas</summary>
            <ul className="pl-4 mt-2 space-y-2">
              <li><Link href="/gestion-mascotas/myPets">Mis Mascotas</Link></li>
              <li><Link href="/gestion-mascotas/addPet">Añadir Mascota</Link></li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary className="cursor-pointer">Historial Médico</summary>
            <ul className="pl-4 mt-2 space-y-2">
              <li><Link href="/historial-medico/clinicalHistory">Historial Clínico</Link></li>
              <li><Link href="/historial-medico/addEntry">Añadir Entrada</Link></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}