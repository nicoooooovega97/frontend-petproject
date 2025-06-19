// src/app/(auth)/login/page.tsx
'use client';

import LoginForm from "@/components/auth/loginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4" // Añadido px-4 aquí
      style={{ backgroundColor: '#00527C' }}
    >
      <div className="w-full max-w-md mx-auto"> {/* Añadido mx-auto para centrar */}
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}