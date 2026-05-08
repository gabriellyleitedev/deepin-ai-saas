import React from 'react';
import { motion } from 'framer-motion';
import DotGridBackground from '../components/DotGridBackground';
import AboutImage from "../assets/aboutUs.jpg";
import ProductDesign from "../assets/design.png";

const AboutUs = () => {
  return (
    <div className="w-full">

      {/* --- SECTION 1 --- */}
      <section className="py-32 bg-black overflow-hidden relative min-h-[10vh] flex items-center">

        <div className="absolute inset-0 z-0 opacity-60">
          <DotGridBackground />
        </div>

        <div className="container mx-auto px-6 relative z-10">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[#9333EA] opacity-20 blur-[100px] rounded-full" />

          <motion.div className="text-center">

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium bg-clip-text text-transparent bg-linear-to-b from-white to-gray-500"
            >
              About Us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-gray-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Helping businesses reply faster, convert more leads,
              and scale customer conversations with AI.
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-1 bg-linear-to-r from-transparent via-[#9333EA] to-transparent mx-auto mt-6"
            />
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2 --- */}
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
                  alt="Deepin AI"
                  className="w-full h-125 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6"
            >
              <span className="text-[#9333EA] font-bold tracking-[0.3em] uppercase text-xs">
                Our Mission
              </span>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight"
              >
                Built for modern <br />
                <span className="text-[#9333EA]">
                  customer communication
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-600 text-md md:text-lg leading-relaxed"
              >
                Deepin helps businesses automate conversations,
                reply instantly, and convert more visitors into customers
                without losing the human touch.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">

                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em]">
                    Global Remote Team
                  </h3>

                  <p className="text-gray-800 font-medium mt-2 leading-relaxed">
                    Built for modern <br />
                    businesses worldwide
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit mt-4 px-10 py-4 border border-[#A855F7] hover:border-purple-500 bg-white text-black font-medium rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] cursor-pointer transition duration-300"
              >
                Get Started
              </motion.button>

            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3 --- */}
      <section className="py-24 bg-black relative overflow-hidden">

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9333EA]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A855F7]/10 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Designed for businesses <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#9333EA] to-[#A855F7]">
                that move fast
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto text-md md:text-lg leading-relaxed"
            >
              Deepin was created to help companies scale conversations,
              reduce response time, and create better customer experiences with AI.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">

              {[
                {
                  title: "Instant Replies",
                  desc: "Respond to customers in seconds, not hours."
                },
                {
                  title: "Human Conversations",
                  desc: "Natural AI responses designed to feel personal."
                },
                {
                  title: "Smart Automation",
                  desc: "Qualify leads and automate repetitive tasks."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9333EA]/50 transition-colors group duration-300 cursor-pointer"
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

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 px-12 py-4 bg-white text-black font-bold rounded-full transition duration-300 cursor-pointer"
            >
              Start Building
            </motion.button>

          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4 --- */}
      <section className="py-24 bg-black relative overflow-hidden flex flex-col items-center">

        <div className="container mx-auto px-6 text-center relative z-20 mb-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter"
            >
              AI communication <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#9333EA] to-[#A855F7]">
                in your pocket
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-md md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Manage conversations, automate replies,
              and track leads from anywhere with Deepin AI.
            </motion.p>

          </motion.div>
        </div>

        <div className="w-full max-w-6xl px-6 relative">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative bg-white/95 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.15)] min-h-125 flex flex-col items-center justify-center"
          >

            <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />

            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none p-10">

              <h3 className="text-4xl md:text-8xl font-black text-white opacity-90 tracking-tighter uppercase text-center">
                DEEPIN <br className="md:hidden" /> AI
              </h3>

              <p className="text-sm md:text-lg font-medium text-white opacity-90 mt-3 text-center">
                Smarter conversations. Faster conversions.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-8 px-10 py-3 bg-white text-black rounded-full font-medium text-lg shadow-2xl pointer-events-auto"
              >
                Explore Now
              </motion.button>

            </div>

            <div className="relative z-20 flex justify-center w-full translate-y-16">

              <img
                src={ProductDesign}
                alt="Deepin AI Mobile"
                className="w-full max-w-[700px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-110"
              />

            </div>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[#9333EA]/40 blur-[100px] z-0" />

          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#9333EA]/10 blur-[150px] -z-10" />

        </div>
      </section>
    </div>
  );
};

export default AboutUs;