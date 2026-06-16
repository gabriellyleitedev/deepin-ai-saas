import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import DotGridBackground from '../components/DotGridBackground';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isYearly, setIsYearly] = useState(false);
  const [error, setError] = useState('');

  // Estados para controlar a visibilidade das senhas (olho)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar o envio do formulário

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessType: '',
    customBusinessType: '',
    selectedPlan: 'Professional'
  });

  const plans = [
    {
      name: "Starter",
      price: "0",
      features: ["Reply to leads automatically", "Basic AI responses", "Up to 2 active chats", "Email support"]
    },
    {
      name: "Professional",
      price: isYearly ? "79" : "99",
      features: ["Unlimited conversations", "Human-like AI replies", "Instant response (<5s)", "Lead qualification automation", "Priority 24/7 support"],
      highlight: true
    },
    {
      name: "Enterprise",
      price: isYearly ? "159" : "199",
      features: ["Everything in Professional", "Custom AI trained for your business", "Multi-channel (WhatsApp, Instagram, Web)", "Dedicated success manager", "Advanced security & integrations"]
    }
  ];

  // Variantes de animação em onda/cascata (Framer Motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 } // Animação em cascata AQUI NO STAGGER
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) { // Verifica se todos os campos obrigatórios foram preenchidos!!!
        setError("Please fill in all required fields.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (formData.password.length < 8) { // Verificação de força de senha (mínimo 8 caracteres)
        setError("Password must be at least 8 characters long.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.companyName || !formData.businessType) { // Verifica se o nome da empresa e o setor foram preenchidos
        setError("Please provide your company name and industry.");
        return;
      }

      if (formData.businessType === 'other' && !formData.customBusinessType) { // Se "Other" for selecionado, o campo extra deve ser preenchido
        setError("Please especify your industry.");
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => { // Volta para o passo anterior
    setError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalBusinessType = formData.businessType === 'other' ? formData.customBusinessType : formData.businessType;

    // CORREÇÃO SEGURANÇA: Não printamos a senha em texto limpo no console do navegador
    const safeDataToLog = { ...formData, businessType: finalBusinessType, billingCycle: isYearly ? 'yearly' : 'monthly' };
    delete safeDataToLog.password;
    delete safeDataToLog.confirmPassword;

    console.log("Submitting secure data context to Supabase:", safeDataToLog);

    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-purple-500/30">

      {/* PAINEL ESQUERDO: */}
      <div className="hidden lg:flex w-[35%] bg-[#030712] backdrop-blur-md p-16 flex-col justify-between border-r border-white/4 relative z-10">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">
            Deepin AI
          </h2>
        </div>

        {/* LUZES DE FUNDO PREMIUM */}
        <div className="absolute -top-37.5 left-1/2 -translate-x-1/2 w-150 h-112.5 bg-linear-to-b from-purple-600/35 to-indigo-600/5 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute -top-12.5 left-1/2 -translate-x-1/2 w-75 h-50 bg-purple-500/25 blur-[60px] pointer-events-none rounded-full" />

        <div className="my-auto space-y-12 max-w-xs">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-3">Scale your <br /><span className="font-normal text-purple-400">operation</span></h1>
            <p className="text-zinc-500 text-sm font-normal leading-relaxed">Complete these quick steps to get your AI assistant fully configured.</p>
          </div>

          <div className="space-y-8 relative border-l border-zinc-800/80 ml-3 pl-6">
            <div className={`flex items-center gap-4 transition-all duration-500 ${step === 1 ? 'text-purple-400 font-medium' : 'text-zinc-500'}`}>
              <span className={`absolute left-0 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold transition-all duration-500 ${step === 1 ? 'border-purple-500 bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]' : step > 1 ? 'border-purple-500/40 bg-purple-950/20 text-purple-400' : 'border-zinc-800 bg-zinc-900'}`}>1</span>
              <span className="text-xs uppercase tracking-widest font-normal">Personal Info</span>
            </div>

            <div className={`flex items-center gap-4 transition-all duration-500 ${step === 2 ? 'text-purple-400 font-medium' : 'text-zinc-500'}`}>
              <span className={`absolute left-0 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold transition-all duration-500 ${step === 2 ? 'border-purple-500 bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]' : step > 2 ? 'border-purple-500/40 bg-purple-950/20 text-purple-400' : 'border-zinc-800 bg-zinc-900'}`}>2</span>
              <span className="text-xs uppercase tracking-widest font-normal">Workspace</span>
            </div>

            <div className={`flex items-center gap-4 transition-all duration-500 ${step === 3 ? 'text-purple-400 font-medium' : 'text-zinc-500'}`}>
              <span className={`absolute left-0 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold transition-all duration-500 ${step === 3 ? 'border-purple-500 bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]' : 'border-zinc-800 bg-zinc-900'}`}>3</span>
              <span className="text-xs uppercase tracking-widest font-normal">Plan Tier</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
          &copy; {new Date().getFullYear()} Deepin AI.
        </div>
      </div>

      {/* PAINEL DIREITO: Área do Formulário */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between px-6 py-12 md:p-16 lg:p-24 relative z-10 w-full">
        <div />

        <div className="w-full max-w-xl mx-auto">
          <AnimatePresence mode="wait">

            {isSubmitted ? (
              <motion.div key="success-screen" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="text-center space-y-6 py-8">
                <motion.div variants={itemVariants} className="w-20 h-20 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(147,51,234,0.15)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.79 1.79 0 0415 21l-4.58-4.58M15.75 9l-3.375-3.375M19.5 12l-2.25-2.25m-10.5 6l2.25 2.25M6.75 6.75L12 12m0 0l-5.25 5.25M12 12l5.25-5.25M12 12h.008v.008H12V12zm0 4.5h.008v.008H12V16.5zm0-9h.008v.008H12V7.5zM7.5 12h.008v.008H7.5V12zm9 0h.008v.008H16.5V12z" />
                  </svg>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight text-white">Account Prepared!</h3>
                  <p className="text-purple-400 font-medium text-sm">Produto em construção, aguarde.</p>
                  <p className="text-zinc-500 text-xs max-w-sm mx-auto font-light leading-relaxed">
                    Sua estrutura de workspace e dados organizacionais foram validados com sucesso. Estamos preparando o seu dashboard de IA.
                  </p>
                </motion.div>
              </motion.div>
            ) : null}

            {/* PASSO 1: Informações Pessoais */}
            {step === 1 && (
              <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full">
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl font-bold tracking-tight text-white">Create your <span className="font-normal text-purple-400">account</span></h3>
                  <p className="text-zinc-400 text-sm font-normal mt-1.5">Enter your credentials to initiate platform activation.</p>
                </motion.div>

                {error && <motion.div variants={itemVariants} className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-light rounded-xl">{error}</motion.div>}

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">First Name</label>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-4 bg-white/2 hover:bg-white/4 border border-white/6 focus:border-purple-500/80 rounded-xl text-sm font-light outline-none transition duration-200" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Last Name</label>
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-4 bg-white/2 hover:bg-white/4 border border-white/6 focus:border-purple-500/80 rounded-xl text-sm font-light outline-none transition duration-200" required />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Email Address</label>
                  <input type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} className="w-full p-4 bg-white/2 hover:bg-white/4 border border-white/6 focus:border-purple-500/80 rounded-xl text-sm font-light outline-none transition duration-200" required />
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* INPUT SENHA COM OLHO */}
                  <div className="space-y-2 relative">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full p-4 pr-12 bg-white/2 hover:bg-white/4 border border-white/6 focus:border-purple-500/80 rounded-xl text-sm font-light outline-none transition duration-200" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition">
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* INPUT CONFIRMAR SENHA COM OLHO */}
                  <div className="space-y-2 relative">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Confirm Password</label>
                    <div className="relative">
                      <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="w-full p-4 pr-12 bg-white/2 hover:bg-white/4 border border-white/6 focus:border-purple-500/80 rounded-xl text-sm font-light outline-none transition duration-200" required />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition">
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.button variants={itemVariants} type="button" onClick={nextStep} className="w-full py-4 bg-purple-500 hover:bg-purple-500/80 font-semibold rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.35)] hover:scale-[1.01] active:scale-[0.99] transition duration-300 cursor-pointer">
                  Continue
                </motion.button>
              </motion.div>
            )}

            {/* PASSO 2: Configurações Corporativas */}
            {step === 2 && (
              <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full">
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl font-bold tracking-tight text-white">Setup your <span className="font-normal text-purple-400">workspace</span></h3>
                  <p className="text-zinc-400 text-sm font-normal mt-1.5">Provide some information about your current organization.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Company Name</label>
                  <input type="text" name="companyName" placeholder="Ex: Acme Corp" value={formData.companyName} onChange={handleChange} className="w-full p-4 bg-white/2 hover:bg-white/4 border border-white/6 focus:border-purple-500/80 rounded-xl text-sm font-light outline-none transition duration-200" required />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Industry Segment</label>
                  <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full p-4 bg-[#09090b] border border-white/6 focus:border-purple-500/80 rounded-xl text-sm font-light outline-none text-zinc-300 transition duration-200" required>
                    <option value="" disabled>Select your core industry</option>
                    <option value="realestate">Real Estate & Property Agents</option>
                    <option value="healthcare">Healthcare & Clinical Centers</option>
                    <option value="ecommerce">E-commerce & Digital Retail</option>
                    <option value="other">Other Business Model (Specify)</option>
                  </select>
                </motion.div>

                {/* CAMPO EXTRA CASO OUTROS ESTEJA ATIVO */}
                {formData.businessType === 'other' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Specify your industry</label>
                    <input type="text" name="customBusinessType" placeholder="E.g., Consulting, Logistics..." value={formData.customBusinessType} onChange={handleChange} className="w-full p-4 bg-white/1 border border-purple-500/30 rounded-xl text-sm font-light focus:border-purple-500 outline-none transition duration-200" required />
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="flex gap-4 pt-2">
                  <button type="button" onClick={prevStep} className="w-1/2 py-4 bg-white/2 hover:bg-white/5 font-semibold rounded-xl border border-white/6 transition duration-300 cursor-pointer">Back</button>
                  <button type="button" onClick={nextStep} className="w-1/2 py-4 bg-purple-500 hover:bg-purple-500/80 font-semibold rounded-xl shadow-[0_0_25px_rgba(147,51,234,0.2)] transition duration-300 cursor-pointer">Continue</button>
                </motion.div>
              </motion.div>
            )}

            {/* PASSO 3: Modelos de Planos (Pricing) */}
            {step === 3 && (
              <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full">
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-white">Select <span className="font-normal text-purple-400">tier plan</span></h3>
                    <p className="text-zinc-400 text-sm font-normal mt-1.5">Your AI capabilities scale with your selected model.</p>
                  </div>

                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/6 self-end sm:self-auto backdrop-blur-md">
                    <button type="button" onClick={() => setIsYearly(false)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${!isYearly ? 'bg-white text-black shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}>Monthly</button>
                    <button type="button" onClick={() => setIsYearly(true)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${isYearly ? 'bg-white text-black shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}>Yearly <span className="text-purple-500 font-black ml-0.5">-20%</span></button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 max-h-85 overflow-y-auto pr-1 border border-white/2 bg-white/1 rounded-2xl p-2">
                  {plans.map((plan, idx) => {
                    const isSelected = formData.selectedPlan === plan.name;
                    return (
                      <div key={idx} onClick={() => setFormData({ ...formData, selectedPlan: plan.name })} className={`group relative p-5 border rounded-xl cursor-pointer transition-all duration-300 ${isSelected ? 'border-purple-500/80 bg-purple-500/2 shadow-[0_0_30px_rgba(147,51,234,0.1)]' : 'border-white/4 bg-transparent hover:border-white/10'}`}>
                        {plan.highlight && (
                          <span className="absolute top-5 right-5 bg-purple-500 text-[9px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-widest text-white shadow-md">Best Choice</span>
                        )}

                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-base text-zinc-100">{plan.name}</span>
                          <div className="flex items-baseline text-zinc-500 text-xs">
                            <span className="text-zinc-100 font-bold text-lg">${plan.price}</span>/mo
                          </div>
                        </div>

                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-zinc-500 group-hover:text-zinc-400 transition">
                          {plan.features.slice(0, 4).map((f, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5 truncate font-normal">
                              <span className="text-purple-500 font-bold text-xs">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-4 pt-2">
                  <button type="button" onClick={prevStep} className="w-1/2 py-4 bg-white/2 hover:bg-white/5 font-semibold rounded-xl border border-white/6 transition duration-300 cursor-pointer">Back</button>
                  <button type="submit" className="w-1/2 py-4 bg-purple-500 hover:bg-purple-500/80 font-bold rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.4)] transition duration-300 cursor-pointer">Complete Order</button>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* REDIRECIONAMENTO NO RODAPÉ */}
        <div className="text-center text-xs text-zinc-500 font-normal relative z-10 lg:pt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-500 font-normal hover:text-purple-400 transition underline underline-offset-4 ml-0.5 cursor-pointer duration-300 ">
            Sign in
          </Link>
        </div>
      </form>

    </div>
  );
}

export default Register;