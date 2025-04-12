import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer
    className="animate-gradient-flow sticky top-0 z-50 text-white py-5 px-6 md:px-12 flex items-center justify-between backdrop-blur shadow-md"

      style={{
        backgroundImage: `linear-gradient(to right, #003ce5, #4959ff, #E4B045, #E4B045, #003ce5)`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo + nombre */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo_blan.png"
            alt="Logo PROTECSA"
            width={45}
            height={45}
            className="object-contain"
          />
          <span className="text-lg font-bold">PROTECSA</span>
        </div>

        {/* Texto legal */}
        <p className="text-sm text-center md:text-left">
          © 2025 PROTECSA – Facultad de Ciencias, UNAM. Todos los derechos reservados.
        </p>

        {/* Íconos sociales */}
        <div className="flex space-x-4 text-2xl">
          <a href="https://www.facebook.com/proteco" target="_blank" className="hover:text-yellow-300 transition">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/protecsaunam/" target="_blank" className="hover:text-yellow-300 transition">
            <FaInstagram />
          </a>
          <a href="mailto:contacto@proteksa.mx" className="hover:text-yellow-300 transition">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
