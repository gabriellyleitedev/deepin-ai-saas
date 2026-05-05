import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Globe, Layers, ZapIcon, BarChart3, Lock } from 'lucide-react';
import logoIcon from "../assets/logo.icon.png";

const Plans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [activePlan, setActivePlan] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const plans = [
    { name: "Starter", price: "0", features: ["Up to 2 projects", "Basic AI insights", "Community support", "Limited exports"], button: "Get Started" },
    { name: "Professional", price: isYearly ? "79" : "99", features: ["Unlimited projects", "Deepin AI Pro features", "Priority 24/7 support", "Advanced analytics", "Custom integrations"], button: "Try for Free", highlight: true },
    { name: "Enterprise", price: isYearly ? "159" : "199", features: ["Everything in Pro", "Dedicated Account Manager", "Custom AI training", "SSO & Security suite"], button: "Contact Sales" }
  ];

  const coreFeatures = [
    { title: "Neural Latency", desc: "Global edge nodes ensure responses in under 400ms.", icon: <ZapIcon size={24} /> },
    { title: "Data Sovereignty", desc: "Isolated hardware layers for maximum security.", icon: <Lock size={24} /> },
    { title: "Visual Insights", desc: "Real-time monitoring of your AI operations.", icon: <BarChart3 size={24} /> },
    { title: "API Fabric", desc: "Robust endpoints that scale with your traffic.", icon: <Layers size={24} /> }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-purple-500/30 overflow-x-hidden pt-10 md:pt-20">

      {/* --- SECTION 1: HERO PRICING --- */}
      <section className="relative py-12 md:py-20 lg:py-32 bg-transparent overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-10 lg:top-18 md:top-14 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 w-full text-center px-4"
        >
          <h2 className="text-[20vw] md:text-[12rem] lg:text-[18rem] font-black text-white/[0.07] leading-none uppercase tracking-tighter break-words">
            Pricing
          </h2>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col items-center mb-12 lg:mb-24"
          >
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
              <button onClick={() => setIsYearly(false)} className={`px-4 md:px-8 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${!isYearly ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}>Monthly</button>
              <button onClick={() => setIsYearly(true)} className={`px-4 md:px-8 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${isYearly ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}>Yearly <span className="ml-1 text-purple-400 font-black">-20%</span></button>
            </div>
          </motion.div>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-center md:items-stretch">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                onClick={() => setActivePlan(i)}
                variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col w-full max-w-md md:max-w-none p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border cursor-pointer transition-all duration-500 ${activePlan === i ? 'bg-white/[0.08] border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)] md:scale-105 z-30' : 'bg-white/2 border-white/10 opacity-60 md:scale-95 z-10 hover:border-white/30'
                  } backdrop-blur-md`}
              >
                {activePlan === i && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />}
                {plan.highlight && <div className="mb-4 md:mb-6 self-start bg-purple-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Best Choice</div>}

                <div className="mb-6 md:mb-8">
                  <h3 className={`text-xs font-bold mb-2 uppercase tracking-widest ${activePlan === i ? 'text-purple-400' : 'text-white/40'}`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">${plan.price}</span>
                    <span className="text-white/40 text-xs md:text-sm font-medium">/mo</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-4 md:space-y-5 mb-8 md:mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300/90 leading-tight">
                      <div className={`mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${activePlan === i ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                        <svg className={`w-2.5 h-2.5 ${activePlan === i ? 'text-purple-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 ${activePlan === i ? 'bg-purple-600 text-white shadow-xl' : 'bg-white/5 text-white/60 border border-white/10'}`}>
                  {plan.button}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: BENTO GRID --- */}
      <section className="py-20 md:py-32 relative z-10 bg-white/90 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-7xl text-purple-500 font-black tracking-tighter mb-4 md:mb-6">Neural Capabilities</h2>
            <p className="text-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm">Standard across all layers</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {coreFeatures.map((item, idx) => (
              <motion.div
                key={idx} variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-8 md:p-10 rounded-[2rem] bg-black border border-white/10 hover:border-purple-500/50 transition-all group"
              >
                <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-700">{item.icon}</div>
                <h4 className="text-lg md:text-xl font-bold mb-3 ">{item.title}</h4>
                <p className="text-xs md:text-sm text-white/40 leading-relaxed ">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3:  --- */}
      <section className="py-20 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center mb-12 md:mb-20 text-center">
            {logoIcon && <img src={logoIcon} className="max-w-[200px] md:max-w-[350px] mb-4 w-auto object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" alt="Logo" />}
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter">Full Infrastructure</h2>
          </motion.div>

          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-white/[0.06] border border-white/10 rounded-[1.5rem] md:rounded-[3rem] overflow-x-auto md:overflow-hidden backdrop-blur-2xl"
          >
            <div className="min-w-[600px] md:min-w-full">
              {[
                { label: "Max Ops / Minute", v1: "5k", v2: "25k", v3: "Unlimited" },
                { label: "Context Window", v1: "128k", v2: "512k", v3: "1.5M+" },
                { label: "Global Edge Nodes", v1: "12", v2: "48", v3: "All Regions" },
                { label: "Dedicated IP", v1: "No", v2: "Optional", v3: "Included" },
                { label: "SLA Guarantee", v1: "99.5%", v2: "99.9%", v3: "99.999%" }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 p-6 md:p-10 border-t border-white/5 first:border-none group hover:bg-white/[0.03] transition-colors">
                  <div className="text-xs md:text-sm font-bold text-white/80">{row.label}</div>
                  <div className="text-center text-xs md:text-sm text-white/30">{row.v1}</div>
                  <div className="text-center text-xs md:text-sm text-purple-400 font-bold">{row.v2}</div>
                  <div className="text-center text-xs md:text-sm text-white/60">{row.v3}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <p className="text-center text-white/20 text-[10px] mt-4 md:hidden">← Swipe to see more →</p>
        </div>
      </section>

      {/* --- SECTION 5: FAQ --- */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-7xl font-black mb-12 md:mb-20 text-center tracking-tighter">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Questions</span>
          </motion.h2>
          <div className="grid gap-4 md:gap-6">
            {[
              { q: "How do Neural Ops work?", a: "Neural Operations (Ops) are the currency of compute on Deepin AI." },
              { q: "Can I switch plans mid-month?", a: "Absolutely. When you upgrade, the change is instant." },
              { q: "Do you offer custom training?", a: "Yes, for enterprise partners, we can fine-tune base models on proprietary data." }
            ].map((faq, i) => (
              <motion.div
                key={i} variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="group border border-white/10 bg-white/[0.06] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 md:p-10 flex justify-between items-center text-left hover:bg-white/[0.03] transition-all">
                  <span className="font-bold text-sm md:text-lg">{faq.q}</span>
                  <div className={`transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`}><Plus size={18} className={openFaq === i ? 'text-purple-500' : 'text-white/20'} /></div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="p-6 md:p-10 pt-0 text-white/40 leading-loose text-xs md:text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: CTA FINAL --- */}
      <section className="py-20 md:py-40 relative z-10 text-center overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.h2
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-5xl md:text-9xl font-black tracking-tighter mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500"
          >
            BE DEEPIN
          </motion.h2>
          <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative inline-block group">
            <div className="absolute inset-0 bg-purple-600 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <button className="relative px-10 md:px-20 py-6 md:py-8 bg-white text-black font-black uppercase tracking-[0.2em] md:tracking-[0.5em] text-xs md:text-sm rounded-full border hover:border-purple-500 shadow-2xl transition duration-300">
              Start Building Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Plans;