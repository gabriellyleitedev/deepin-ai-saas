import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSuccess = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms and Privacy Policy.");
      return;
    }
    
    const newUser = {
      email,
      registered: true,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('deepin_registered_user', JSON.stringify(newUser));
    alert("Conta criada com sucesso! Dados salvos no localStorage. Redirecionando para Login...");
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#030712] px-4 py-12 overflow-hidden selection:bg-purple-500/30">
      
      {/* BOTÃO VOLTAR */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-4 left-4 z-20 flex cursor-pointer items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition duration-300 bg-white/5 border border-white/5 rounded-xl px-3 py-2 backdrop-blur-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span>Back</span>
      </button>

      {/* GLOWS */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-gradient-to-b from-purple-600/35 to-indigo-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md z-10 flex flex-col items-center">
        
        {/* LOGO */}
        <div className="mb-5 flex items-center gap-2 text-3xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">
          DEEPIN AI
        </div>

        {/* CARD COM BORDA DEGRADÊ */}
        <div className="w-full rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/5 to-white/0 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
          <div className="relative w-full bg-[#090d16]/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 overflow-hidden">
            
            <div 
              className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
              
              {/* 1º ONDA: ÍCONE DE CADASTRO (+user) */}
              <motion.div variants={itemVariants} className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </motion.div>

              {/* 2º ONDA: TEXTOS */}
              <motion.div variants={itemVariants} className="text-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">Ready to Build?</h2>
                <p className="text-sm text-slate-400 mt-1.5">Sign up and start building today.</p>
              </motion.div>

              {/* FORMULÁRIO */}
              <form onSubmit={handleRegisterSuccess} className="space-y-4">
                
                {/* 3º ONDA: EMAIL */}
                <motion.div variants={itemVariants}>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#030712] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition duration-200"
                    />
                  </div>
                </motion.div>

                {/* 4º ONDA: SENHA COM OLHO */}
                <motion.div variants={itemVariants}>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 00 2.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 00 2.25 2.25Z" /></svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#030712] border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* 5º ONDA: CHECKBOX DE TERMOS (Igual à imagem de referência) */}
                <motion.div variants={itemVariants} className="flex items-start gap-2 pt-1">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-white/10 bg-[#030712] text-purple-600 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-400 select-none cursor-pointer">
                    I agree to the <span className="text-purple-400 hover:underline font-medium">Terms and Privacy Policy</span>
                  </label>
                </motion.div>

                {/* 6º ONDA: BOTÃO DE CADASTRO */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] transition duration-300 mt-1"
                  >
                    Continue with Email
                  </button>
                </motion.div>
              </form>

              {/* 7º ONDA: DIVISOR */}
              <motion.div variants={itemVariants} className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-x-0 h-px bg-white/5" />
                <span className="relative z-10 bg-[#090d16] px-3 text-xs text-slate-500">Or sign up with</span>
              </motion.div>

              {/* 8º ONDA: SOCIAIS */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5">
                <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-2.5 text-xs font-bold text-white transition">
                  <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-4.5 h-4.5 invert" alt="github" />
                </button>
                <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-2.5 text-xs font-bold text-white transition">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4.5 h-4.5" alt="google" />
                </button>
                <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-2.5 text-xs font-bold text-white transition">
                  <img src="https://www.svgrepo.com/show/475446/facebook-color.svg" className="w-4.5 h-4.5" alt="facebook" />
                </button>
              </motion.div>

              {/* 9º ONDA: LINK VOLTAR PARA O LOGIN */}
              <motion.div variants={itemVariants} className="mt-8 text-center text-xs text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:underline font-semibold">Login</Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;