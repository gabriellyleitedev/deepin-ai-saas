import { motion } from "framer-motion";
import { useState } from "react";
import Globe from "../components/Globe";
import DotGridBackground from "../components/DotGridBackground";
import ScrollIndicator from "../components/ScrollIndicator";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Tempo entre o surgimento de cada item (0.2s)
            delayChildren: 0.3    // Espera um pouco antes de começar
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 }, // Começa menor e abaixo
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Uma curva mais elegante
    }
};

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-32">
            <DotGridBackground />

            {/* Efeito de Brilho no Fundo (Ambient Light) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full z-0"></div>

            <div className="max-w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

                {/* LADO ESQUERDO: TEXTO E BOTÕES */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col space-y-6"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-medium text-slate-300 tracking-wider uppercase"> The next era of AI v2.0</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold leading-tight">
                        Welcome to <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                            DEEPIN AI
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-lg leading-relaxed">
                        Seamlessly integrate cutting-edge AI into your business architecture. Deepin IA automates the heavy lifting, so your team can focus on high-impact strategy.
                    </motion.p>

                    {/* Container dos Botões */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-4">

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border hover:border-purple-500 bg-white text-black font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer transition duration-300"
                        >
                            Get Started
                        </motion.button>

                        <motion.button
                            whileHover={{
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                                borderColor: "rgba(168, 85, 247, 0.5)",
                                boxShadow: "0_0_15px_rgba(168,85,247,0.1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold transition-colors cursor-pointer cursor-pointer duration-300 "
                        >
                            View Documentation
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* LADO DIREITO: GLOBO */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} // Começa borrado "do nada"
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 1.2,
                        delay: 0.6, // Entra depois que o texto começou
                        ease: "easeOut"
                    }}
                    className="flex justify-center items-center relative"
                >
                    {/* Brilho extra atrás do globo */}
                    <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-[80px] rounded-full"></div>

                    <div className="w-full max-w-full lg:pl-10">
                        <Globe />
                    </div>

                </motion.div>

            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
                <ScrollIndicator />
            </div>
        </section>
    );
};

export default Hero;