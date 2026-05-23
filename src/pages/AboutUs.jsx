import React from 'react';
import { motion } from 'framer-motion';
import DotGridBackground from '../components/DotGridBackground';
import AboutImage from "../assets/aboutUs.jpg";
import ProductDesign from "../assets/design.png";
import { Link } from 'react-router-dom';

const AboutUs = () => {
  // Configuração padrão para animar leve e uma única vez
  const animateIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  return (
    <div className="w-full bg-black text-white">

      {/* --- SECTION 1 --- */}
      <section className="py-32 bg-black overflow-hidden relative min-h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <DotGridBackground />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[#9333EA] opacity-20 blur-[100px] rounded-full" />

          <motion.div className="text-center" {...animateIn}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium bg-clip-text text-transparent bg-linear-to-b from-white to-gray-500">
              About Us
            </h2>

            <p className="mt-4 text-gray-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
              Helping businesses reply faster, convert more leads, and scale customer conversations with AI.
            </p>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-linear-to-r from-transparent via-[#9333EA] to-transparent mx-auto mt-6"
            />
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2 --- */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Imagem com opacidade suave controlada */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group will-change-transform"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900">
                <img
                  src={AboutImage}
                  alt="Deepin AI Office"
                  className="w-full h-125 object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 will-change-auto"
                  loading="eager"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6"
            >
              <span className="text-[#9333EA] font-bold tracking-[0.3em] uppercase text-xs">
                Our Mission
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight">
                Built for modern <br />
                <span className="text-[#9333EA]">customer communication</span>
              </h2>

              <p className="text-gray-600 text-md md:text-lg leading-relaxed">
                Deepin helps businesses automate conversations, reply instantly, and convert more visitors into customers without losing the human touch.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em]">
                    Global Remote Team
                  </h3>
                  <p className="text-gray-800 font-medium mt-2 leading-relaxed">
                    Built for modern <br /> businesses worldwide
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em]">
                    Contact
                  </h3>
                  <p className="text-gray-800 font-medium mt-2 leading-relaxed">
                    contact@deepinai.dev
                  </p>
                </div>
              </div>

              <Link to="/register" className="w-fit">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-10 py-4 border border-[#A855F7] hover:bg-[#A855F7]/5 text-black font-medium rounded-xl cursor-pointer transition-colors duration-300"
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3 --- */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9333EA]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div {...animateIn}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Designed for businesses <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#9333EA] to-[#A855F7]">
                that move fast
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-md md:text-lg leading-relaxed">
              Deepin was created to help companies scale conversations, reduce response time, and create better customer experiences with AI.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
              {[
                { title: "Instant Replies", desc: "Respond to customers in seconds, not hours." },
                { title: "Human Conversations", desc: "Natural AI responses designed to feel personal." },
                { title: "Smart Automation", desc: "Qualify leads and automate repetitive tasks." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9333EA]/40 transition-colors duration-300 cursor-pointer group"
                >
                  <h4 className="text-white font-bold text-xl mb-2 group-hover:text-[#A855F7] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link to="/register" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-16 px-12 py-4 bg-white text-black font-bold rounded-full cursor-pointer shadow-lg"
              >
                Start Building
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4 --- */}
      <section className="py-24 bg-black relative overflow-hidden flex flex-col items-center">
        <div className="container mx-auto px-6 text-center relative z-20 mb-12">
          <motion.div {...animateIn}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter">
              AI communication <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#9333EA] to-[#A855F7]">
                in your pocket
              </span>
            </h2>
            <p className="text-gray-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
              Manage conversations, automate replies, and track leads from anywhere with Deepin AI.
            </p>
          </motion.div>
        </div>

        <div className="w-full max-w-6xl px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-white rounded-[3rem] overflow-hidden min-h-125 flex flex-col items-center justify-center will-change-transform shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/35 z-10 mix-blend-multiply" />

            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-10 pointer-events-none">
              <h3 className="text-5xl md:text-8xl font-black text-white opacity-95 tracking-tighter uppercase text-center leading-none">
                DEEPIN <br className="md:hidden" /> AI
              </h3>

              <p className="text-sm md:text-lg font-medium text-white opacity-90 mt-4 text-center">
                Smarter conversations. Faster conversions.
              </p>

              <Link to="/register" className="pointer-events-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-10 py-3 bg-white text-black rounded-full font-medium text-md shadow-xl cursor-pointer"
                >
                  Explore Now
                </motion.button>
              </Link>
            </div>

            {/* Imagem do Mockup do Celular */}
            <div className="relative z-20 flex justify-center w-full translate-y-20 select-none pointer-events-none">
              <img
                src={ProductDesign}
                alt="Deepin AI Mobile App"
                className="w-full md:translate-y-0 translate-y-20 md:max-w-145 h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                loading="eager"
              />
            </div>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[#9333EA]/20 blur-[80px] z-0 pointer-events-none" />
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#9333EA]/5 blur-[120px] -z-10 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;