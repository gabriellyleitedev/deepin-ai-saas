import React from 'react';
import { motion } from 'framer-motion';
import Globe from '../components/Globe';

const Contact = () => {
  return (
    <section className="min-h-screen bg-black text-white py-32 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#9333EA]/20 blur-[120px] rounded-full z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Cabeçalho Monumental */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20 text-center md:text-left"
          >
            <h1 className="text-7xl md:text-9xl font-black mb-8 flex justify-center ">
              Contact me
            </h1>
            

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pt-10">
              <div className="space-y-4 text-gray-400 text-lg">
                <p className="hover:text-white transition-colors cursor-pointer">email@deepinai.com</p>
                <p className="hover:text-white transition-colors cursor-pointer">(555) 555-5555</p>
                <p>123 Deepin Street, Tech City, AI 12345</p>
              </div>
            </div>
          </motion.div>

          {/* Grid Principal: Globe + Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-start md:-mt-20">
                {/* LADO ESQUERDO: GLOBO (Visível apenas em Desktop ou centralizado em Mobile) */}
            <div className="flex justify-center items-center order-2 md:order-1">
              <div className="w-full max-w-[400px] md:max-w-[500px]">
                <Globe />
              </div>
            </div>
           

            {/* LADO DIREITO: FORMULÁRIO */}
            <motion.form 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-10 order-1 md:order-2"
            >
              {/* Name Field */}
              <div className="group relative md:-mt-32">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-[#9333EA] transition-colors">
                  Name (required)
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name"
                    className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-[#9333EA] transition-all placeholder:text-gray-700 text-white"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name"
                    className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-[#9333EA] transition-all placeholder:text-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-[#9333EA] transition-colors">
                  Email (required)
                </label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-[#9333EA] transition-all placeholder:text-gray-700 text-white"
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-[#9333EA] transition-colors">
                  Message (required)
                </label>
                <textarea 
                  rows="3"
                  placeholder="Tell us about your project..."
                  className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-[#9333EA] transition-all resize-none placeholder:text-gray-700 text-white"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#ffffff', color: '#000000' }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-16 py-4 border border-white text-white font-bold uppercase tracking-[0.3em] text-xs transition-all duration-300"
              >
                Submit
              </motion.button>
            </motion.form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;