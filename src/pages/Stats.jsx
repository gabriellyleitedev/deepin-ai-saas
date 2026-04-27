import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

const statsData = [
    { label: 'Active Users', target: 1200000, suffix: '+', format: 'compact' },
    { label: 'Projects Completed', target: 5000, suffix: '+', format: 'compact' },
    { label: 'Customer Satisfaction', target: 98, suffix: '%', format: 'plain' },
    { label: 'Global Reach', target: 150, suffix: '+', format: 'plain', extra: 'Countries' }
];

const useCountUp = (target, duration = 1.6, delay = 0) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, target, {
            duration,
            delay,
            ease: [0.25, 1, 0.5, 1], // Custom cubic-bezier para suavidade total
            onUpdate(latest) { setValue(Math.round(latest)); }
        });
        return () => controls.stop();
    }, [inView, target, duration, delay]);

    return [ref, value];
};

const formatCount = (value, stat) => {
    if (stat.format === 'plain') return `${value}${stat.suffix}`;
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1
    }).format(value) + stat.suffix;
};

const Stats = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Ambient Light - Mais sutil */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        Platform Impact
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Real-time metrics from our global neural network.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => {
                        const [ref, count] = useCountUp(stat.target, 1.6, index * 0.1);

                        return (
                            <motion.div
                                key={stat.label}
                                ref={ref}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Glow de Hover - Agora ele só aparece no hover e é suave */}
                                <div className="absolute inset-0 bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />

                                <div className="relative h-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.04]">
                                    <div className="text-center">
                                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-indigo-400">
                                            {formatCount(count, stat)}
                                        </h3>
                                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-purple-400 transition-colors">
                                            {stat.label}
                                        </p>
                                        {stat.extra && (
                                            <p className="mt-1 text-[10px] text-slate-600 font-medium italic">
                                                {stat.extra}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;