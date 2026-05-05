import { motion } from 'framer-motion';
import { Sparkles, Zap, BarChart3, Shield, Workflow, Brain, Globe } from 'lucide-react';
import React from 'react';

const Features = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: custom * 0.1,
                ease: "easeOut"
            }
        })
    };

    return (
        <section className="relative py-20 overflow-hidden">

            {/* Radial Gradient Glow Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Never lose a lead again
                    </h2>
                    <p className="text-md md:text-lg text-slate-400 max-w-2xl mx-auto">
                        Deepin AI replies to your leads instantly, qualifies them, and helps you close more deals automatically.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {featureData.map((feature, index) => { // Array para não se perder
                        const IconComponent = feature.icon; // Puxa os icones do array e localiza o componente correto sem precisar de um switch case gigante
                        const colSpan = feature.colSpan || 'col-span-1';
                        const rowSpan = feature.rowSpan || 'row-span-1';

                        return (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.1)"
                                }}
                                className={`group relative ${colSpan} ${rowSpan} md:${colSpan} lg:${colSpan}`}
                            >
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Card Content */}
                                <div className="relative h-full bg-white/2 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/4">

                                    {/* Icon Container */}
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/10 mb-6 group-hover:from-purple-500/30 group-hover:to-pink-500/20 transition-all duration-300">
                                        <IconComponent className="w-7 h-7 text-purple-300" />
                                    </div>

                                    {/* Text Content */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xs">
                                        {feature.description}
                                    </p>

                                    {/* Hover Accent */}
                                    <div className="absolute bottom-0 left-2 w-0 h-1 bg-linear-to-r from-purple-500 to-pink-500 group-hover:w-12 transition-all duration-300 rounded-full" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const featureData = [
  {
    icon: Zap,
    title: "Instant Replies",
    description: "Respond to every lead in seconds, even when you're offline."
  },
  {
    icon: Brain,
    title: "AI That Understands",
    description: "Deepin AI understands what your lead wants and replies like a human."
  },
  {
    icon: BarChart3,
    title: "Lead Qualification",
    description: "Automatically identify serious clients and filter out time-wasters."
  },
  {
    icon: Workflow,
    title: "Automated Conversations",
    description: "Handle full conversations without lifting a finger."
  },
  {
    icon: Globe,
    title: "Works 24/7",
    description: "Your business never sleeps — and neither does your AI."
  },
  {
    icon: Shield,
    title: "No Missed Opportunities",
    description: "Every message gets answered. Every lead gets a chance."
  }
];

export default Features;