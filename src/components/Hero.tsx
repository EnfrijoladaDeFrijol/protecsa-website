export default function Hero() {
  return (
    <section className="bg-white py-20 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4 animate-fade-in-up transition-opacity duration-700">
        Bienvenido a <span className="text-yellow-500">PROTECSA</span>
      </h1>

      <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto animate-fade-in transition duration-700 delay-200">
        Cursos intersemestrales, asesorías, talleres, capacitación y mucho más.
      </p>

      <div className="space-x-4 animate-fade-in transition duration-700 delay-300">
        <a
          href="/cursos"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-105"
        >
          Ver cursos
        </a>
        <a
          href="/contacto"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-100 transition transform hover:scale-105"
        >
          Contáctanos
        </a>
      </div>
    </section>
  );
}
