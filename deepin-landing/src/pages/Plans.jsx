import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Globe, Layers, ZapIcon, BarChart3, Lock } from 'lucide-react';
import logoIcon from "../assets/logo.icon.png";
import { Link } from 'react-router-dom';

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
    {
      name: "Starter",
      price: "0",
      features: [
        "Reply to leads automatically",
        "Basic AI responses",
        "Up to 2 active conversations",
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
        "Instant responses (<5s)",
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
        "Multi-channel support",
        "Dedicated success manager",
        "Advanced security & integrations"
      ],
      button: "Talk to sales"
    }
  ];

  const coreFeatures = [
    {
      title: "Instant Responses",
      desc: "Reply to every lead in seconds with AI-powered conversations that feel human.",
      icon: <ZapIcon size={24} />
    },

    {
      title: "Lead Qualification",
      desc: "Automatically identify high-intent customers and prioritize the best opportunities.",
      icon: <BarChart3 size={24} />
    },

    {
      title: "Multi-Channel Support",
      desc: "Manage conversations across WhatsApp, Instagram, and your website in one place.",
      icon: <Globe size={24} />
    },

    {
      title: "Secure Infrastructure",
      desc: "Enterprise-grade security and scalable architecture built for modern businesses.",
      icon: <Lock size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-purple-500/30 overflow-x-hidden pt-10 md:pt-20">

      {/* --- SECTION 1: HERO PRICING --- */}
      <section className="relative py-20 md:py-20 lg:py-26 bg-transparent overflow-hidden">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute left-1/2 -translate-x-1/2 top-[18%] md:top-[25%] lg:top-[25%] w-full text-center pointer-events-none z-0">
          <h2 className="text-[24vw] md:text-[10rem] lg:text-[16rem] font-black text-white/9 uppercase tracking-tighter leading-none">
            Pricing
          </h2>
        </motion.div>

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

        </div>

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
                className={`relative flex flex-col w-full max-w-md md:max-w-none p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] border cursor-pointer transition-all duration-500 ${activePlan === i ? 'bg-white/8 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)] md:scale-105 z-30' : 'bg-white/2 border-white/10 opacity-60 md:scale-95 z-10 hover:border-white/30'
                  } backdrop-blur-md`}
              >
                {activePlan === i && <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent" />}
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-purple-500 font-bold tracking-tighter mb-4 md:mb-6">Everything your sales team needs</h2>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }} className="text-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm">Built to automate conversations and increase conversions</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {coreFeatures.map((item, idx) => (
              <motion.div
                key={idx} variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-8 md:p-5 rounded-4xl bg-black border border-white/10 hover:border-purple-500/50 transition-all group"
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

          <motion.div initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col items-center mb-12 md:mb-20 text-center">

            {logoIcon && <img src={logoIcon} className="max-w-50 md:max-w-87.5 mb-4 w-auto object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" alt="Logo" />}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"> Built to scale with your business</h2>
          </motion.div>

          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-white/6er border-white/10 rounded-3xl md:rounded-[3rem] overflow-x-auto md:overflow-hidden backdrop-blur-2xl"
          >
            <div className="min-w-150 md:min-w-full">
              {[
                {
                  label: "Active Conversations",
                  v1: "100",
                  v2: "Unlimited",
                  v3: "Unlimited"
                },

                {
                  label: "AI Response Speed",
                  v1: "<10s",
                  v2: "<5s",
                  v3: "Priority Routing"
                },

                {
                  label: "Channels Supported",
                  v1: "1 Channel",
                  v2: "3 Channels",
                  v3: "Custom Channels"
                },

                {
                  label: "Automation Flows",
                  v1: "Basic",
                  v2: "Advanced",
                  v3: "Custom Workflows"
                },

                {
                  label: "Support",
                  v1: "Community",
                  v2: "24/7 Priority",
                  v3: "Dedicated Manager"
                }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 p-6 md:p-10 border-t border-white/5 first:border-none group hover:bg-white/3 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-white/80">{row.label}</div>
                  <div className="text-center text-xs md:text-sm text-white/30">{row.v1}</div>
                  <div className="text-center text-xs md:text-sm text-purple-400 font-bold">{row.v2}</div>
                  <div className="text-center text-xs md:text-sm text-white/60">{row.v3}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <p className="text-center text-white/20 text-[10px] mt-4 md:hidden">← Swipe to compare plans →</p>
        </div>
      </section>

      {/* --- SECTION 5: FAQ --- */}
      <section className="py-26 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-20 text-center tracking-tighter"
          >
            Questions before{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">
              you scale?
            </span>
          </motion.h2>

          <div className="grid gap-4 md:gap-6">
            {[{
              q: "Can I cancel anytime?",
              a: "Yes. You can upgrade, downgrade, or cancel your plan at any time without long-term contracts."
            },
            {
              q: "Which platforms does Deepin support?",
              a: "Deepin works with WhatsApp, Instagram, websites, and other communication channels depending on your plan."
            },
            {
              q: "Does the AI sound human?",
              a: "Yes. Deepin is designed to generate natural conversations that feel fast, contextual, and personalized."
            },
            {
              q: "Can I train the AI for my business?",
              a: "Absolutely. Enterprise plans include custom AI training tailored to your business, products, and workflows."
            }
            ].map((faq, i) => (

              <motion.div
                key={i}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group border border-white/10 bg-white/6 rounded-3xl md:rounded-4xl overflow-hidden backdrop-blur-xl"
              >

                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 md:p-10 flex justify-between items-center text-left hover:bg-white/3 transition-all duration-300"
                >

                  <span className="font-bold text-sm md:text-lg">
                    {faq.q}
                  </span>

                  <div
                    className={`transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''
                      }`}
                  >
                    <Plus
                      size={18}
                      className={
                        openFaq === i
                          ? 'text-purple-500'
                          : 'text-white/20'
                      }
                    />
                  </div>

                </button>

                <AnimatePresence>
                  {openFaq === i && (

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >

                      <p className="p-6 md:p-10 pt-0 text-white/40 leading-loose text-xs md:text-sm">
                        {faq.a}
                      </p>

                    </motion.div>

                  )}
                </AnimatePresence>

              </motion.div>

            ))}

          </div>
        </div>
      </section>

      {/* --- SECTION 6: FINAL CTA --- */}
      <section className="py-16 md:py-20 relative z-10 text-center overflow-hidden">

        {/* Glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_60%)] pointer-events-none" />

        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h2 className="text-[22vw] md:text-[14rem] lg:text-[18rem] font-bold text-white/3 tracking-tighter leading-none">
            DEEPIN
          </h2>
        </div>

        <div className="container mx-auto px-6 relative z-10">

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="max-w-4xl mx-auto"
          >

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-[10px] md:text-xs uppercase tracking-widest font-base mb-8">
              AI SALES AUTOMATION
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none mb-8">
              Your business
              <br />
              should reply
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">
                {" "}instantly.
              </span>
            </h2>

            <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/40 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              Deepin helps businesses answer faster, qualify leads automatically,
              and turn conversations into real revenue 24 hours a day.
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-block group"
            >
              <div className="absolute inset-0 bg-purple-600 blur-[70px] opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              <Link to="/register" className="relative px-10 md:px-16 py-5 md:py-6 rounded-2xl bg-white text-black font-bold uppercase tracking-[0.2em] text-xs md:text-sm border border-white hover:border-purple-500 transition-all duration-300 shadow-[0_20px_80px_rgba(255,255,255,0.15)]">
                Start Free Trial
              </Link>
            </motion.div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/20">
              <span>24/7 AI replies</span>
              <span>Lead qualification</span>
              <span>Instant automation</span>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Plans;