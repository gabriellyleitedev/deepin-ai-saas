import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom'; // useLocation para efeitos ativos

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Plans', href: '/plans' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

const animationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
}

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation(); // Útil se quiser destacar o link da página atual

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            transition={{ duration: 0.8 }}
            className="fixed inset-x-0 top-0 z-50 flex justify-center px-7 py-4"
        >
            {/* EFEITO DE LUZ (GLOW) */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-purple-600/20 blur-[100px] pointer-events-none"
            />

            <header className="w-full max-w-7xl border border-white/10 bg-white/1 backdrop-blur-md rounded-xl transition-all duration-300">
                <div className="mx-auto flex items-center justify-between px-5 py-3">

                    {/* Usei Link aqui também pra a logo voltar para a Home */}
                    <Link to="/" className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">
                        DEEPIN AI
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`text-sm font-medium transition duration-300 ${location.pathname === item.href ? 'text-purple-400' : 'text-slate-300 hover:text-purple-400'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-100 transition hover:bg-white/10 md:inline-flex duration-300 cursor-pointer">
                            Sign In
                        </button>

                        <Link to="/plans" className="relative hidden overflow-hidden rounded-full bg-[#8b5cf6] px-12 py-2.5 text-sm font-bold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] group md:inline-flex items-center justify-center">
                            <span className="relative z-10">Be Deepin</span>
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </Link>

                        {/* Botão Mobile */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100 md:hidden"
                        >
                            <span className="text-xl">{mobileOpen ? '×' : '☰'}</span>
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mx-4 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-2xl md:hidden"
                        >
                            <div className="flex flex-col gap-2 mb-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="px-4 py-3 text-lg font-medium text-slate-300 border-b border-white/5 last:border-none transition"
                                        onClick={() => setMobileOpen(false)} // Fecha o menu ao clicar
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Botões Mobile */}
                            <div className="flex flex-col gap-3">
                                <Link to="/login" className="w-full py-4 text-center rounded-xl border border-white/10 bg-white/5 text-slate-100 font-bold text-sm">
                                    Sign In
                                </Link>
                                <Link to="/plans" className="w-full py-4 text-center rounded-xl bg-[#8b5cf6] text-white font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                                    Be Deepin
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </motion.div>
    )
}

export default Header;