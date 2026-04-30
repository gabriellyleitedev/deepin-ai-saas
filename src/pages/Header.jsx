import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Plans', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' },
]

const animationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
}

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (

        <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            transition={{ duration: 0.8 }}
            className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 py-4">

            {/* EFEITO DE LUZ (GLOW) ATRÁS DO HEADER */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-purple-600/20 blur-[100px] pointer-events-none" />

            <header className={`w-full max-w-7xl border border-white/10 bg-white/1 backdrop-blur-md transition-all duration-300 ${mobileOpen ? 'rounded-xl' : 'rounded-xl'}`}>
                <div className="mx-auto flex items-center justify-between px-5 py-3">
                    <a href="#" className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500">
                        DEEPIN AI
                    </a>

                    <nav className="hidden items-center gap-8 lg:flex">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-purple-600">
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-100 transition hover:bg-white/10 md:inline-flex duration-300 cursor-pointer">
                            Sign In
                        </button>

                        <button className="relative hidden overflow-hidden rounded-full bg-[#8b5cf6] px-12 py-2.5 text-sm font-bold text-white transition-all duration-500 hover:scale-105 hover:bg-linear-to-r hover:from-[#8b5cf6] hover:via-slate-200 hover:to-[#d8b4fe] hover:text-purple-900 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] group cursor-pointer md:inline-flex items-center justify-center">
                            <span className="relative z-10">Be Deepin</span>
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </button>

                        {/* BOTÃO HAMBÚRGUER (Sempre visível no mobile, escondido no desktop) */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
                        >
                            <span className="text-xl">{mobileOpen ? '×' : '☰'}</span>
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mx-4 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-2xl md:hidden"
                        >
                            {/* Links de Navegação */}
                            <div className="flex flex-col gap-2 mb-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="px-4 py-3 text-lg font-medium text-slate-300 border-b border-white/5 last:border-none transition hover:text-purple-400"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                <button className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-slate-100 font-bold text-sm tracking-widest hover:bg-white/10 transition-all">
                                    Sign In
                                </button>

                                <button className="relative w-full overflow-hidden rounded-xl bg-[#8b5cf6] py-4 text-sm font-bold text-white tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                                    <span className="relative z-10">Be Deepin</span>
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </motion.div>
    )
}

export default Header;