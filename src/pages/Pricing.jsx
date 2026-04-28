import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: isYearly ? "0" : "0",
      features: ["Up to 2 projects", "Basic AI insights", "Community support", "Limited exports"],
      button: "Get Started",
      highlight: false
    },
    {
      name: "Professional",
      price: isYearly ? "79" : "99",
      features: ["Unlimited projects", "Deepin AI Pro features", "Priority 24/7 support", "Advanced analytics", "Custom integrations"],
      button: "Try for Free",
      highlight: true
    },
    {
      name: "Enterprise",
      price: isYearly ? "159" : "199",
      features: ["Everything in Pro", "Dedicated Account Manager", "Custom AI training", "SSO & Security suite"],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section className="relative py-32 bg-transparent overflow-hidden">
      {/* --- TEXTO GIGANTE NO FUNDO (ESTILO REFERÊNCIA) --- */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="text-[12rem] lg:text-[20rem] font-black text-white/[0.03] leading-none uppercase">
          Pricing
        </h2>
      </div>

      {/* --- LUZ DE FUNDO --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Toggle Mensal/Anual */}
        <div className="flex flex-col items-center mb-20">
          <div className="flex items-center gap-4 bg-white/5 p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isYearly ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isYearly ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              Yearly <span className="text-[10px] ml-1 text-purple-400">-20%</span>
            </button>
          </div>
        </div>

        {/* Grid de Planos */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 ${
                plan.highlight 
                ? 'bg-white/[0.06] border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)] scale-105 z-20' 
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 z-10'
              } backdrop-blur-xl`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-white/60 text-sm font-medium mb-2 uppercase tracking-widest">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-white/40 text-sm">/mo</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                    <svg className={`w-5 h-5 ${plan.highlight ? 'text-purple-400' : 'text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.highlight 
                ? 'bg-white text-black hover:bg-purple-400 hover:text-white' 
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
              }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;