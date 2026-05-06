import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        },
    };

    const testimonials = [
        {
            text: "We used to lose leads daily. Now Deepin replies in seconds and we close way more clients without lifting a finger.",
            name: "Michael Carter",
            role: "Owner, Local Services",
            result: "+42% conversions",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            text: "Response time went from minutes to seconds. That alone increased our conversions by a lot.",
            name: "Sarah Nguyen",
            role: "Marketing Lead",
            result: "-85% response time",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            text: "It feels like having a sales assistant working 24/7. No missed opportunities anymore.",
            name: "James Walker",
            role: "Founder, Agency",
            result: "+37% conversion rate",
            image: "https://randomuser.me/api/portraits/men/55.jpg"
        },
        {
            text: "Before Deepin, we couldn't keep up with messages. Now everything is handled instantly.",
            name: "Emily Davis",
            role: "Customer Success",
            result: "2x more leads answered",
            image: "https://randomuser.me/api/portraits/women/66.jpg"
        },
        {
            text: "The biggest impact? We stopped losing clients just because we were too slow to reply.",
            name: "David Lee",
            role: "Operations Manager",
            result: "0 missed leads",
            image: "https://randomuser.me/api/portraits/men/77.jpg"
        },
        {
            text: "It’s simple: faster replies = more sales. Deepin made that automatic.",
            name: "Lucas Martins",
            role: "Small Business Owner",
            result: "24/7 replies",
            image: "https://randomuser.me/api/portraits/women/88.jpg"
        }
    ];

    return (
        <section className="py-20 bg-transparent relative z-10">
            <div className="container mx-auto px-6">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-10 text-white">
                        What happens when you reply instantly
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto mb-10">
                        Businesses using Deepin reply faster, close more deals, and never miss a lead again.
                    </p>
                </motion.div>

                {/* GRID */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.name}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="
                                group
                                bg-white/3
                                border border-white/10
                                p-8
                                rounded-2xl
                                backdrop-blur-sm
                                hover:bg-white/5
                                hover:border-purple-500/30
                                transition-all
                                duration-300
                            "
                        >

                            {/* RESULT BADGE */}
                            <div className="inline-block mb-3 px-3 py-1 text-xs font-bold rounded-full 
                                bg-purple-500/10 text-purple-300 border border-purple-500/20
                                group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]
                                transition">
                                {testimonial.result}
                            </div>

                            {/* STARS */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 text-purple-400 fill-purple-400"
                                    />
                                ))}
                            </div>

                            {/* TEXT */}
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                "{testimonial.text}"
                            </p>

                            {/* USER */}
                            <div className="flex items-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4 border border-purple-500/30"
                                />
                                <div>
                                    <p className="font-bold text-white">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-purple-400/80">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;