'use client';

import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* CÍRCULOS ESTÁTICOS GRANDES CON TAMAÑOS FIJOS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Círculo dorado enorme arriba izquierda */}
        <div
          className="absolute w-[450px] h-[450px] bg-[#E4B045] rounded-full opacity-30 animate-float1"
          style={{ top: '-80px', left: '-100px' }}
        />

        {/* Círculo azul gigante al centro derecha */}
        <div
          className="absolute w-[600px] h-[600px] bg-[#003ce5] rounded-full opacity-25 animate-float2"
          style={{ top: '25%', right: '-180px' }}
        />

        {/* Círculo azul claro grande abajo */}
        <div
          className="absolute w-[500px] h-[500px] bg-[#4a9ae9] rounded-full opacity-25 animate-float3"
          style={{ bottom: '-120px', left: '20%' }}
        />
      </div>

      {/* CONTENIDO DEL LOGIN */}
      <div className="z-10 w-full max-w-md px-6">
        <LoginForm />
      </div>
    </main>
  );
}
