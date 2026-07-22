import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {

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

    const [index, setIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 768) setItemsPerView(1);
            else if (window.innerWidth < 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - itemsPerView);

    const next = () => {
        setIndex((prev) => Math.min(prev + itemsPerView, maxIndex));
    };

    const prev = () => {
        setIndex((prev) => Math.max(prev - itemsPerView, 0));
    };

    return (
        <section className="py-24 relative">

            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        What happens when you reply instantly
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}

                        className="text-slate-400 max-w-xl md:text-lg text-md mx-auto">
                        Faster replies. More conversations. More revenue.
                    </motion.p>
                </motion.div>

                <div className="relative">

                    {/* BOTÃO ESQUERDA */}
                    <button
                        onClick={prev}
                        disabled={index === 0}
                        className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 
                        w-10 h-10 rounded-full border border-white/10 bg-white/5 
                        flex items-center justify-center text-white hover:bg-white/10 
                        disabled:opacity-30 transition"
                    >
                        <ChevronLeft />
                    </button>

                    {/* BOTÃO DIREITA */}
                    <button
                        onClick={next}
                        disabled={index >= maxIndex}
                        className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 
                        w-10 h-10 rounded-full border border-white/10 bg-white/5 
                        flex items-center justify-center text-white hover:bg-white/10 
                        disabled:opacity-30 transition"
                    >
                        <ChevronRight />
                    </button>

                    {/* VIEWPORT */}
                    <div className="overflow-hidden">

                        <motion.div
                            animate={{
                                x: `-${index * (100 / itemsPerView)}%`
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="flex"
                        >

                            {testimonials.map((testimonial, i) => (
                                <div
                                    key={i}
                                    className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] flex px-4 md:px-3"
                                >

                                    <div className="group h-full flex flex-col justify-between bg-white/3 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/5 hover:border-purple-500/30 transition">

                                        {/* RESULT */}
                                        <div className="inline-block mb-3 px-3 py-1 text-xs font-bold rounded-full 
                                            bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                            {testimonial.result}
                                        </div>

                                        {/* STARS */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-purple-400 fill-purple-400" />
                                            ))}
                                        </div>

                                        {/* TEXT */}
                                        <p className="text-slate-300 text-lg mb-8">
                                            "{testimonial.text}"
                                        </p>

                                        {/* USER */}
                                        <div className="flex items-center">
                                            <img
                                                src={testimonial.image}
                                                alt=""
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

                                    </div>

                                </div>
                            ))}

                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;