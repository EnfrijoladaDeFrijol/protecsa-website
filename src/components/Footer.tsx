export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-blue-700 to-yellow-500 text-white py-10 px-6 mt-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} PROTECSA – Facultad de Ciencias, UNAM. Todos los derechos reservados.
          </p>
  
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Instagram
            </a>
            <a href="mailto:protecsa@ciencias.unam.mx" className="hover:underline">
              Correo
            </a>
          </div>
        </div>
      </footer>
    );
  }
  