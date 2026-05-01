import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Zap, Shield, Cpu, Plus, Minus, Globe, Layers, ZapIcon, BarChart3, Lock } from 'lucide-react';

const Plans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [activePlan, setActivePlan] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      name: "Aurora", level: "Lvl 01", tagline: "Emerging neural stream", price: isYearly ? "19" : "29",
      features: ["200 Neural Ops/mo", "Live prompt tuning", "Core analytics", "Secure snapshots", "Community Access"],
      button: "Deploy Core", glow: "#8b5cf6",
    },
    {
      name: "Ion", level: "Lvl 02", tagline: "Responsive reasoning layer", price: isYearly ? "59" : "79",
      features: ["560 Neural Ops/mo", "Adaptive API endpoints", "Priority support", "Team control center", "Custom Integrations"],
      button: "Scale Now", highlight: true, glow: "#0ea5e9",
    },
    {
      name: "Zenith", level: "Lvl 03", tagline: "Enterprise neural fabric", price: isYearly ? "129" : "159",
      features: ["Unlimited Neural Ops", "Dedicated private cluster", "Custom AI training", "99.99% Uptime SLA", "24/7 Architect Support"],
      button: "Contact Architect", glow: "#8b5cf6",
    }
  ];

  const coreFeatures = [
    { title: "Neural Latency", desc: "Global edge nodes ensure responses in under 400ms.", icon: <ZapIcon size={24} /> },
    { title: "Data Sovereignty", desc: "Isolated hardware layers for maximum security.", icon: <Lock size={24} /> },
    { title: "Visual Insights", desc: "Real-time monitoring of your AI operations.", icon: <BarChart3 size={24} /> },
    { title: "API Fabric", desc: "Robust endpoints that scale with your traffic.", icon: <Layers size={24} /> }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 overflow-hidden">
      
      {/* --- SECTION 1: HERO & PRICING --- */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ backgroundColor: plans[activePlan].glow, opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-24 top-20 h-[600px] w-[600px] rounded-full blur-[140px]" />
        </div>

        <div className="absolute top-48 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 w-full text-center">
          <h2 className="text-[20vw] font-black text-white/[0.02] leading-none uppercase tracking-tighter">DEEPIN</h2>
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.6em] text-purple-500 mb-8 font-bold">The Future of Compute</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black tracking-tight mb-12">Pricing <span className="text-white/20">Models</span></motion.h1>

          <div className="flex justify-center mb-20">
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <button onClick={() => setIsYearly(false)} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!isYearly ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>Monthly</button>
              <button onClick={() => setIsYearly(true)} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isYearly ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>Yearly <span className="text-purple-500 ml-1 font-black">SAVE 20%</span></button>
            </div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i} onMouseEnter={() => setActivePlan(i)}
                className={`relative flex flex-col p-12 rounded-[3.5rem] border transition-all duration-700 backdrop-blur-3xl ${activePlan === i ? 'bg-white/[0.08] border-purple-500/40 shadow-2xl md:scale-105 z-30' : 'bg-white/[0.02] border-white/5 opacity-40 md:scale-95 z-10'}`}
              >
                <div className="mb-10 text-left">
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] block mb-2 ${activePlan === i ? 'text-purple-400' : 'text-white/20'}`}>{plan.level}</span>
                  <h3 className="text-4xl font-bold mb-6">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-black tracking-tighter">${plan.price}</span>
                    <span className="text-white/30 text-sm">/mo</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-5 mb-12 text-left">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-sm text-white/70">
                      <div className={`w-1.5 h-1.5 rounded-full ${activePlan === i ? 'bg-purple-500' : 'bg-white/20'}`} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${activePlan === i ? 'bg-purple-600 text-white shadow-[0_20px_40px_rgba(139,92,246,0.3)] hover:bg-purple-500' : 'bg-white/5 text-white/30 border border-white/10'}`}>{plan.button}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: BENTO GRID CAPABILITIES --- */}
      <section className="py-32 relative z-10 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Neural Capabilities</h2>
            <p className="text-white/40 uppercase tracking-[0.5em] text-xs">Standard across all layers</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {coreFeatures.map((item, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                <div className="text-purple-500 mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FULL SPECS TABLE (DETALHADA) --- */}
      <section className="py-40 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col items-center mb-20 text-center">
            <Globe className="text-purple-500 mb-6 animate-pulse" size={40} />
            <h2 className="text-5xl font-black tracking-tighter">Full Infrastructure</h2>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-2xl">
            {[
              { label: "Max Ops / Minute", v1: "5k", v2: "25k", v3: "Unlimited" },
              { label: "Context Window", v1: "128k", v2: "512k", v3: "1.5M+" },
              { label: "Global Edge Nodes", v1: "12", v2: "48", v3: "All Regions" },
              { label: "Dedicated IP", v1: "No", v2: "Optional", v3: "Included" },
              { label: "Training Layer", v1: "Basic", v2: "Advanced", v3: "Proprietary" },
              { label: "Compliance", v1: "SOC2", v2: "SOC2 + HIPAA", v3: "Full Suite" },
              { label: "SLA Guarantee", v1: "99.5%", v2: "99.9%", v3: "99.999%" }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-2 md:grid-cols-4 p-10 border-t border-white/5 first:border-none group hover:bg-white/[0.03] transition-colors">
                <div className="text-sm font-bold text-white/80">{row.label}</div>
                <div className="hidden md:block text-center text-sm text-white/30">{row.v1}</div>
                <div className="text-center md:text-center text-sm text-purple-400 font-bold">{row.v2}</div>
                <div className="hidden md:block text-center text-sm text-white/60">{row.v3}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ENTERPRISE TRUST --- */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto p-16 rounded-[4rem] bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-md">
            <h3 className="text-4xl font-bold mb-8 italic">"The most responsive AI infrastructure we've ever deployed."</h3>
            <div className="flex items-center justify-center gap-4 text-sm uppercase tracking-widest font-black">
              <span className="text-purple-500">CTO at NeuralLink</span>
              <span className="text-white/20">/</span>
              <span>Deepin Enterprise Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FAQ --- */}
      <section className="py-40 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-black mb-20 text-center tracking-tighter">Frequently Asked <span className="text-white/20">Questions</span></h2>
          <div className="grid gap-6">
            {[
              { q: "How do Neural Ops work?", a: "Neural Operations (Ops) are the currency of compute on Deepin AI. Every generation, reasoning step, or training cycle consumes a specific amount of Ops based on model complexity." },
              { q: "Can I switch plans mid-month?", a: "Absolutely. When you upgrade, the change is instant. When downgrading, the change takes effect at the start of your next billing cycle." },
              { q: "What is a Dedicated Private Cluster?", a: "Zenith users get their own isolated hardware stack. This means zero interference from other users and the absolute lowest latency physically possible." },
              { q: "Do you offer custom training?", a: "Yes, for Lvl 03 partners. We can fine-tune our base models on your proprietary data within a secure, encrypted sandbox." }
            ].map((faq, i) => (
              <div key={i} className="group border border-white/5 bg-white/[0.01] rounded-[2rem] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-10 flex justify-between items-center text-left hover:bg-white/[0.03] transition-all">
                  <span className="font-bold text-lg">{faq.q}</span>
                  <div className={`transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <Plus size={20} className={openFaq === i ? 'text-purple-500' : 'text-white/20'} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="p-10 pt-0 text-white/40 leading-loose text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: CTA FINAL --- */}
      <section className="py-40 relative z-10 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 opacity-10">BE DEEPIN</h2>
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-purple-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <button className="relative px-20 py-8 bg-white text-black font-black uppercase tracking-[0.5em] text-sm rounded-full hover:scale-105 transition-transform">
              Start Building Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;