'use client';

//import { useState } from 'react';
import Image from 'next/image';
// import { supabase } from '@/lib/supabase';
// import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function CambiarPasswordForm() {
  // const [password, setPassword] = useState('');
  // const [confirmar, setConfirmar] = useState('');
  // const [show, setShow] = useState(false);
  // const [mensaje, setMensaje] = useState('');
  // const [tipo, setTipo] = useState<'error' | 'ok' | ''>('');

  // const handleCambiarContrasena = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMensaje('');
  //   setTipo('');

  //   if (!password || password.length < 6) {
  //     setMensaje('La contraseña debe tener al menos 6 caracteres.');
  //     setTipo('error');
  //     return;
  //   }

  //   if (password !== confirmar) {
  //     setMensaje('Las contraseñas no coinciden.');
  //     setTipo('error');
  //     return;
  //   }

  //   const { error } = await supabase.auth.updateUser({ password });

  //   if (error) {
  //     console.error('❌ Error al cambiar contraseña:', error.message);
  //     setMensaje('Error al cambiar contraseña.');
  //     setTipo('error');
  //   } else {
  //     setMensaje('Contraseña actualizada correctamente.');
  //     setTipo('ok');
  //     setPassword('');
  //     setConfirmar('');
  //   }
  // };

  return (
    <>
      <h1 className="text-4xl font-bold text-[#003ce5] mb-4">Cambiar contraseña</h1>
      <p className="text-gray-700 mb-10 text-base">
        No disponible todavía, estamos trabajando en ello.
      </p>

      <div className="flex justify-center mt-4">
        <Image
          src="/animalitos/puppy_soon.png"
          alt="Función en desarrollo"
          width={420}
          height={420}
          
        />
      </div>
    </>
  );
}
