import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import deepinHero from "../assets/deepin.hero.png";

const ProductShowcase = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // ANIMAÇÕES DE ENTRADA (3D)
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [35, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.8, 1]);
  const translateZ = useTransform(scrollYProgress, [0, 0.35], [-300, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={targetRef}
      className="relative py-32 flex flex-col items-center justify-center bg-transparent"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-6 relative z-20"
      >
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-4">
          The Operating System for <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-indigo-500">
            Next-Gen SaaS
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Deepin AI automates your complex workflows, turning data into strategic advantages.
          The intelligence your business stack was missing.
        </p>
      </motion.div>

      {/* LUZES DE FUNDO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-[40%] right-[10%] w-150 h-150 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* O DASHBOARD */}
      <motion.div
        style={{ rotateX, scale, opacity, z: translateZ, transformStyle: "preserve-3d" }}
        className="relative z-10 md:max-w-7xl w-full px-2"
      >
        <div className="absolute -inset-px bg-linear-to-tr from-purple-500/20 via-transparent to-cyan-500/40 rounded-2xl blur-md opacity-20" />

        <div className="relative rounded-2xl overflow-hidden ">
          <div className="relative">
            {/* IMAGEM COM FILTRO DE DESFOQUE E ESCURECIMENTO */}
            <img
              src={deepinHero}
              alt="Dashboard"
              className="w-full h-auto block brightness-[0.6] blur-[0px]" 
            />
            
            {/* OVERLAY DE TEXTO CENTRALIZADO (WEB VISION) */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
                <motion.h3 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="text-white text-xl md:text-5xl font-sans mix-blend-overlay opacity-60 border bg-white/40 border-white/20 md:px-6 md:py-6 py-3 px-3 rounded-full"
                >
                  Chat Web - Deepin AI
                </motion.h3>
            </div>

          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default ProductShowcase;