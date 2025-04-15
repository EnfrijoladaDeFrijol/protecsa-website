export default function Hero() {
  return (
    <section
      className="bg-white py-30 text-center px-4"
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-duration="800"
      data-aos-easing="ease-in-out"
    >
      <h1
        className="text-5xl md:text-5xl font-bold text-blue-800 mb-4"
        data-aos="fade-up"
        data-aos-delay="10"
      >
        Bienvenido a <span className="text-yellow-500">PROTECSA</span>
      </h1>

      <p
        className="text-gray-600 text-xl mb-8 max-w-xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Cursos intersemestrales, asesorías, talleres, capacitación y mucho más.
      </p>

      <div
        className="space-x-4 flex justify-center mt-6"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <a
          href="/cursos"
          className="text-xl px-8 py-4 rounded-full text-white bg-gradient-to-r from-[#4a9ae9] via-[#4959ff] to-[#003ce5] bg-[length:200%_200%] animate-gradient-x shadow-lg hover:scale-105 hover:-translate-y-1 transition duration-300 ease-in-out"

        >
          Ver cursos
        </a>
        <a
          href="/contacto"
          className="text-xl px-8 py-4 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-100 hover:scale-105 hover:shadow-md hover:-translate-y-1 transform transition duration-300 ease-in-out animate-pulse"
        >
          Contáctanos
        </a>
      </div>
    </section>
  );
}
