import React from 'react';
import { Home, Zap, MessageSquare, Mic, Settings } from 'lucide-react';
import MobileDock from './components/MobileDock';

export default function Sidebar({ activeTab, setActiveTab }) {
    const navItems = [
        { name: 'Visão Geral', value: 'overview', icon: <Home size={20} strokeWidth={2} /> },
        { name: 'Automação', value: 'automation', icon: <Zap size={20} strokeWidth={2} /> },
        { name: 'Conversas', value: 'chats', icon: <MessageSquare size={20} strokeWidth={2} /> },
        { name: 'Conexões', value: 'connections', icon: <Mic size={20} strokeWidth={2} /> },
        { name: 'Configurações', value: 'settings', icon: <Settings size={20} strokeWidth={2} /> },
    ];

    return (
        <>
            {/* COMPONENTE MOBILE */}
            <MobileDock navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* VERSÃO DESKTOP (BARRA LATERAL VERTICAL */}
            <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center bg-black/20 backdrop-blur-xl border border-white/30 rounded-full p-1 py-4 shadow-2xl z-50 transition-all duration-300">
                <div className="flex flex-col items-center gap-4 relative">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.value;

                        return (
                            <div key={item.value} className="relative flex items-center group">
                                {/* Botão do Ícone */}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(item.value)}
                                    className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 z-10 ${isActive
                                            ? 'bg-white text-black shadow-lg scale-105'
                                            : 'bg-black/20 text-white/70 hover:text-white hover:bg-black/50'
                                        }`}
                                >
                                    {item.icon}
                                </button>

                                {/* Tag com o Nome da Página (Aparece apenas na Ativa ou no Hover) */}
                                <div
                                    className={`absolute left-16 flex items-center bg-black text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md whitespace-nowrap pointer-events-none transition-all duration-300 ${isActive
                                            ? 'opacity-100 translate-x-0 scale-100'
                                            : 'opacity-0 -translate-x-2 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:bg-white/80 group-hover:text-black'
                                        }`}
                                >
                                    {item.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}