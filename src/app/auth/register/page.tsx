// app/(auth)/register/page.tsx
'use client';

import RegisterForm from '@/components/auth/registerForm';

export default function RegisterPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#00527C' }}
    >
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}