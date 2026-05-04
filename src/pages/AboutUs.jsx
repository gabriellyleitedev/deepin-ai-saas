import React from 'react';
import { motion } from 'framer-motion';
import DotGridBackground from '../components/DotGridBackground';
import AboutImage from "../assets/aboutUs.jpg"; 7
import ProductDesign from "../assets/design.png";

const AboutUs = () => {
  return (
    <div className="w-full">

      {/* --- SECTION 1: HERO ABOUT (DARK + DOT GRID) --- */}
      <section className="py-32 bg-black overflow-hidden relative min-h-[60vh] flex items-center">
        {/* Fundo de Pontos apenas aqui */}
        <div className="absolute inset-0 z-0 opacity-60">
          <DotGridBackground />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Aura Roxa de Fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[#9333EA] opacity-20 blur-[100px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h2
              animate={{
                textShadow: [
                  "0 0 10px #9333EA00",
                  "0 0 20px #9333EA66",
                  "0 0 10px #9333EA00"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl md:text-7xl font-medium tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-gray-500"
            >
              About Us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Empowering the next generation of intelligence with
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500 font-medium"> Deepin AI</span>.
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-1 bg-linear-to-r from-transparent via-[#9333EA] to-transparent mx-auto mt-4"
            />
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2:  --- */}
      <section className="py-24 bg-white/95 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src={AboutImage}
                  alt="Deepin AI Leadership"
                  className="w-full h-125 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            {/* Direita: Copy em Inglês */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6"
            >
              <span className="text-[#9333EA] font-bold tracking-widest uppercase text-sm">
                Corporate Vision
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                We Always Make <br />
                <span className="text-[#9333EA]">The Best Choice</span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Empowering modern enterprises with autonomous AI agents and deep data intelligence.
                Our mission is to bridge the gap between complex neural processing and intuitive business decision-making.
              </p>

              {/* Stats / Info Sede */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Global Headquarters</h3>
                  <p className="text-gray-800 font-medium mt-1">
                    123 Innovation Drive, Suite 400<br />
                    Silicon Valley, CA 94025
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Contact Inquiries</h3>
                  <p className="text-gray-800 font-medium mt-1">
                    contact@deepinai.dev<br />
                    +1 (555) 000-1234
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit mt-4 px-10 py-4 border border-[#A855F7] hover:border-purple-500 bg-white text-black font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer transition duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-black relative overflow-hidden">

        {/* Elementos de fundo para profundidade */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9333EA]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A855F7]/10 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Join Our Team of <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#9333EA] to-[#A855F7]">
                Creative Minds
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We're building the infrastructure of the future. If you're passionate about
              <span className="text-white"> Neural Networks</span>, <span className="text-white">Autonomous Agents</span>,
              and high-scale data, your place is here.
            </p>

            {/* Grid de benefícios rápidos (O "que mais" colocar) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
              {[
                { title: "Remote First", desc: "Work from anywhere in the world." },
                { title: "Latest Tech", desc: "Access to private LLMs and H100 clusters." },
                { title: "Innovation", desc: "20% of your time for personal R&D." }
              ].map((item, index) => (
                <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9333EA]/50 transition-colors group">
                  <h4 className="text-white font-bold text-xl mb-2 group-hover:text-[#A855F7] transition-colors">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 px-12 py-4 bg-white text-black font-extrabold rounded-full transition duration-300"
            >
              View Open Roles
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: FINAL CALL TO ACTION --- */}
      <section className="py-24 bg-black relative overflow-hidden flex flex-col items-center">

        <div className="container mx-auto px-6 text-center relative z-20 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
              Intelligence in the <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#9333EA] to-[#A855F7]">
                Palm of Your Hand
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Our mobile interface brings complex neural processing to a simple, intuitive touch.
            </p>
          </motion.div>
        </div>

        {/* Container da Imagem com Efeito Fumê */}
        <div className="w-full max-w-6xl px-6 relative">
          <motion.div
            className="relative bg-white/95 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.2)] min-h-125 flex flex-col items-center justify-center"
          >
            {/* 1. CAMADA DE FUMÊ (Overlay)  */}
            <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />

            {/* 2. TEXTO CENTRAL */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none p-10">
              <h3 className="text-4xl md:text-8xl font-black text-white opacity-90 tracking-tighter uppercase text-center">
                DEEPIN <br className="md:hidden" /> INTELLIGENCE
              </h3>

              <p className="text-sm md:text-lg font-bold text-white opacity-90 mt-2">
                Your Neural Network, Now in Your Pocket.
              </p>

              {/* Botão de ação dentro da moldura */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-8 px-10 py-3 bg-white text-black rounded-full font-bold text-lg shadow-2xl pointer-events-auto"
              >
                Explore Now
              </motion.button>
            </div>

            {/* 3. IMAGEM DO CELULAR */}
            <div className="relative z-20 flex justify-center w-full translate-y-16">
              <img
                src={ProductDesign}
                alt="Deepin AI Mobile"
                className="w-full max-w-[700px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-110"
              />
            </div>

            {/* 4. O ROXINHO EMBAIXO  */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[#9333EA]/40 blur-[100px] z-0" />
          </motion.div>

          {/* Glow externo de fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#9333EA]/10 blur-[150px] -z-10" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;