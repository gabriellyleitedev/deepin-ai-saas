import { motion } from 'framer-motion';
import { Sparkles, Zap, BarChart3, Shield, Workflow, Brain } from 'lucide-react';
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />
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
                        Cutting-Edge Features
                    </h2>
                    <p className="text-md md:text-lg text-slate-400 max-w-2xl mx-auto">
                        Powerful tools designed to accelerate your workflow and maximize results
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
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Card Content */}
                                <div className="relative h-full bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">

                                    {/* Icon Container */}
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 mb-6 group-hover:from-purple-500/30 group-hover:to-pink-500/20 transition-all duration-300">
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
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-12 transition-all duration-300 rounded-full" />
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
        icon: Sparkles,
        title: "AI-Powered Insights",
        description: "Leverage advanced AI to unlock deep insights from your data and make smarter decisions faster.",
        colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Experience blazing-fast performance optimized for real-time operations and instant results.",
        colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
        icon: BarChart3,
        title: "Real-Time Analytics",
        description: "Monitor metrics and analyze trends as they happen with powerful real-time dashboards.",
        colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade encryption and compliance standards to protect your sensitive data.",
        colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
        icon: Workflow,
        title: "Seamless Integration",
        description: "Connect effortlessly with your existing tools and workflows through flexible APIs.",
        colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
        icon: Brain,
        title: "Smart Automation",
        description: "Automate repetitive tasks and let intelligent systems handle the heavy lifting.",
        colSpan: "md:col-span-1 lg:col-span-1"
    }
];

export default Features;