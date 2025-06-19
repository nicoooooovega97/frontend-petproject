// app/page.tsx
'use client';

export default function Home() {
  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#00527C' }}
    >
      {/* Contenido principal */}
      <div className="text-center space-y-6 z-10 px-8 py-12">
        <h1 className="text-5xl font-bold text-white mb-2">
          Bienvenido a PetVeterinary
        </h1>
        <p className="text-xl text-gray-100 mb-8">
          La mejor solución para gestionar tus mascotas
        </p>
        
        {/* Huellas animadas - versión mejorada */}
        <div className="flex justify-center space-x-6 mb-10">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i}
              className="text-4xl text-white opacity-90 animate-paw"
              style={{ 
                animationDelay: `${i * 0.15}s`,
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))'
              }}
            >
              🐾
            </span>
          ))}
        </div>
        
        <a 
          href="/auth/login" 
          className="mt-6 inline-block px-10 py-4 bg-white text-[#00527C] rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00527C]"
        >
          Iniciar Sesión
        </a>
      </div>

      {/* Estilos de animación mejorados */}
      <style jsx global>{`
        @keyframes pawBounce {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-12px) scale(1.15); 
            opacity: 1;
          }
        }
        
        .animate-paw {
          animation: pawBounce 1.8s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </main>
  );
}