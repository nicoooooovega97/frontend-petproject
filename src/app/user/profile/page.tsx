import ProfileCard from "@/components/user/profileCard";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ backgroundColor: '#00527C' }}
    >
      {/* Botón Volver */}
      <Link 
        href="/user/" 
        className="absolute top-4 left-4 bg-white py-2 px-4 rounded-md shadow hover:bg-gray-100 transition duration-200"
        style={{ color: '#00527C' }}
      >
        Volver atrás
      </Link>
      
      <div className="w-full max-w-md">
        <ProfileCard />
      </div>
    </div>
  );
}