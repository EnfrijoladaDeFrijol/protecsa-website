'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function ContactoSection() {
  return (
    <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-white to-blue-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.h2
          className="text-4xl font-bold text-center text-[#003ce5] mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contáctanos
        </motion.h2>

        <motion.p
          className="text-center max-w-2xl mx-auto mb-12 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          ¿Tienes dudas, sugerencias o quieres colaborar con nosotros? Estamos para ayudarte.
        </motion.p>

        {/* Contenido: formulario + datos */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Formulario */}
          <motion.form
            className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            />
            <textarea
              placeholder="Escribe tu mensaje..."
              rows={5}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003ce5]"
            ></textarea>
            <button
              type="submit"
              className="bg-[#003ce5] hover:bg-[#4959ff] text-white px-6 py-3 rounded-full shadow-md transition"
            >
              Enviar mensaje
            </button>
          </motion.form>

          {/* Información de contacto + redes */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#003ce5] text-xl" />
              <span>contacto@protecsa.mx</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#003ce5] text-xl" />
              <span>+52 55 1234 5678</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#003ce5] text-xl" />
              <span>Facultad de Ciencias, UNAM</span>
            </div>

            {/* Redes Sociales */}
            <div className="pt-6">
              <h3 className="text-xl font-semibold text-[#003ce5] mb-2">Síguenos en redes:</h3>
              <div className="flex space-x-5 text-2xl">
                <a
                  href="https://www.facebook.com/proteco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#003ce5] hover:bg-[#4959ff] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/protecsaunam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E4B045] hover:bg-yellow-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
