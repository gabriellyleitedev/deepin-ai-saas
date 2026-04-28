import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ScrollIndicator = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col items-center gap-4 group cursor-pointer relative"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            <div className="relative w-16 h-16 flex items-center justify-center">

                {/* Anel de Rastro */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                    className="absolute inset-0 border border-dashed border-purple-500 rounded-full group-hover:border-purple-400 group-hover:border-solid transition-all"
                />

                {/* Brilho Pulsante Interno */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-8 h-8 bg-purple-600/20 rounded-full blur-xl"
                />

                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                    }}
                    className="z-10"
                >
                    <ArrowDown
                        size={22}
                        className="text-purple-400 group-hover:text-white group-hover:scale-110 transition-all duration-300"
                    />
                </motion.div>
            </div>

            <motion.span
                className="text-[10px] uppercase tracking-[0.3em] text-slate-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0"
            >
                Scroll
            </motion.span>
        </motion.div>
    );
};

export default ScrollIndicator;