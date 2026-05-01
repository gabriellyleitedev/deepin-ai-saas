import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {

    // Variants animation 
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Um card aparece depois do outro
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
            text: "Deepin AI transformed our workflow. The automation features saved us countless hours and boosted our productivity. Highly recommend!",
            name: "John Doe",
            role: "CEO, Tech Innovators",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            text: "The insights we gained from Deepin AI's analytics were game-changing. It helped us make data-driven decisions that significantly improved our bottom line.",
            name: "Jane Smith",
            role: "Marketing Director, Brand Solutions",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            text: "Implementing Deepin AI was one of the best decisions we made. The user-friendly interface and comprehensive support made the transition seamless.",
            name: "Mike Johnson",
            role: "CTO, Data Driven Inc.",
            image: "https://randomuser.me/api/portraits/men/55.jpg"
        },
        {
            text: "Deepin AI's customer support is outstanding. They were always available to help us with any questions or issues we had, making our experience even better.",
            name: "Emily Davis",
            role: "Customer Success Manager, SaaS Solutions",
            image: "https://randomuser.me/api/portraits/women/66.jpg"
        },

        {
            text: "Deepin AI's automation features have revolutionized our operations. We've seen a significant increase in efficiency and a reduction in manual errors since we started using it.",
            name: "David Lee",
            role: "Operations Manager, Efficiency Experts",
            image: "https://randomuser.me/api/portraits/men/77.jpg"
        },

        {
            text: "The insights we gained from Deepin AI's analytics were invaluable. It helped us identify new opportunities and optimize our strategies for better results.",
            name: "Sarah Wilson",
            role: "Data Analyst, Insightful Analytics",
            image: "https://randomuser.me/api/portraits/women/88.jpg"
        }
    ];

    return (
        <section className="py-20 bg-transparent relative z-10">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-20 text-center text-white">
                        What Our Customers Say
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            variants={cardVariants}
                            className="
                          bg-white/3
                          border border-white/10
                          p-8
                          rounded-2xl
                          backdrop-blur-sm
                          hover:bg-white/5
                          transition-all
                          duration-300
                        "
                        >
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center">
                                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border border-purple-500/30" />
                                <div>
                                    <p className="font-bold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-purple-400/80">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Testimonials;