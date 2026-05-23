import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [activePlan, setActivePlan] = useState(1);

  const plans = [
    {
      name: "Starter",
      price: "0",
      features: [
        "Reply to leads automatically",
        "Basic AI responses",
        "Up to 2 active chats",
        "Email support"
      ],
      button: "Start for free"
    },
    {
      name: "Professional",
      price: isYearly ? "79" : "99",
      features: [
        "Unlimited conversations",
        "Human-like AI replies",
        "Instant response (<5s)",
        "Lead qualification automation",
        "Priority 24/7 support"
      ],
      button: "Start closing more deals",
      highlight: true
    },
    {
      name: "Enterprise",
      price: isYearly ? "159" : "199",
      features: [
        "Everything in Professional",
        "Custom AI trained for your business",
        "Multi-channel (WhatsApp, Instagram, Web)",
        "Dedicated success manager",
        "Advanced security & integrations"
      ],
      button: "Talk to sales"
    }
  ];

  return (
    <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-34 overflow-hidden">

      {/* BACKGROUND TITLE */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[15%] md:top-[25%] lg:top-[25%] w-full text-center pointer-events-none z-0">
        <h2 className="text-[24vw] md:text-[10rem] lg:text-[16rem] font-black text-white/9 uppercase tracking-tighter leading-none">
          Pricing
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-center "
        >
          Stop losing leads. <br className="hidden md:block" />
          Start closing more deals.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 max-w-xl mx-auto text-md md:text-lg text-center mb-12 lg:mb-16"
        >
          Reply faster. Close more. Grow automatically.
        </motion.p>


        {/* TOGGLE */}
        <div className="flex justify-center mb-14 lg:mb-20">
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isYearly
                ? 'bg-white text-black shadow-lg'
                : 'text-white/60 hover:text-white'
                }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isYearly
                ? 'bg-white text-black shadow-lg'
                : 'text-white/60 hover:text-white'
                }`}
            >
              Yearly
              <span className="ml-1 text-purple-400 font-black">-20%</span>
            </button>
          </div>
        </div>

        {/* PLANS */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 lg:gap-8 items-center md:items-stretch">

          {plans.map((plan, i) => {
            const isFocused = activePlan === i;

            return (
              <motion.div
                key={i}
                onClick={() => setActivePlan(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col w-full max-w-md md:max-w-none p-8 rounded-[2.5rem] border cursor-pointer transition-all duration-500 overflow-hidden ${isFocused
                  ? 'bg-white/[0.07] border-purple-500/50 shadow-[0_0_80px_rgba(168,85,247,0.15)] md:scale-105 z-30'
                  : 'bg-white/2 border-white/10 opacity-80 md:scale-95 z-10 hover:border-white/30'
                  } backdrop-blur-md`}
              >

                {/* TOP GLOW */}
                {isFocused && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent" />
                )}

                {/* BADGE */}
                {plan.highlight && (
                  <div className="mb-6 self-start bg-purple-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                    Best Choice
                  </div>
                )}

                {/* PRICE */}
                <div className="mb-8">
                  <h3 className={`text-sm font-bold mb-4 uppercase tracking-widest ${isFocused ? 'text-purple-400' : 'text-white/40'
                    }`}>
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl lg:text-6xl font-black text-white tracking-tighter">
                      ${plan.price}
                    </span>
                    <span className="text-white/40 text-sm">/mo</span>
                  </div>
                </div>

                {/* FEATURES */}
                <ul className="flex-1 space-y-5 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300/90">
                      <div className={`mt-1 w-4 h-4 flex items-center justify-center rounded-full ${isFocused ? 'bg-purple-500/20' : 'bg-white/5'
                        }`}>
                        <svg className={`w-2.5 h-2.5 ${isFocused ? 'text-purple-400' : 'text-white/20'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${isFocused
                  ? 'bg-purple-600 text-white shadow-[0_10px_20px_rgba(139,92,246,0.3)] hover:bg-purple-500 hover:-translate-y-1'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                  }`}>
                  {plan.button}
                </button>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Pricing;