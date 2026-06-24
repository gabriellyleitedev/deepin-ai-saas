import React from 'react';
import { Home, Zap, MessageSquare, Mic, Settings, FileText, History, HelpCircle, Bell, Plus } from 'lucide-react';
import MobileDock from './components/MobileDock';

export default function Sidebar({ activeTab, setActiveTab }) {
    const navItems = [
        { name: 'Visão Geral', value: 'overview', icon: <Home size={18} strokeWidth={2} /> },
        { name: 'Automação', value: 'automation', icon: <Zap size={18} strokeWidth={2} /> },
        { name: 'Conversas', value: 'chats', icon: <MessageSquare size={18} strokeWidth={2} /> },
        { name: 'Conexões', value: 'connections', icon: <Mic size={18} strokeWidth={2} /> },
        { name: 'Configurações', value: 'settings', icon: <Settings size={18} strokeWidth={2} /> },
    ];

    const secondaryIcons = [
        <FileText size={14} strokeWidth={1.8} />,
        <History size={14} strokeWidth={1.8} />,
        <HelpCircle size={14} strokeWidth={1.8} />
    ];

    return (
        <>
            {/* CHAMA O COMPONENTE MOBILE */}
            <MobileDock navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* VERSÃO DESKTOP  */}
            <nav className="hidden md:block relative bg-[#000000] text-white px-20 py-4 border-b border-white/4 w-full select-none z-40">
                <div className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-22 bg-linear-to-r from-transparent via-white/20 to-transparent blur-[60px] -rotate-12 '></div>

                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-0 cursor-pointer group">
                        </div>
                    </div>

                    <div className="flex items-center gap-3">

                        <div className="flex items-center bg-white rounded-full p-1 shadow-sm">
                            {navItems.map((item, index) => {
                        const isActive = activeTab === item.value;

                                if (index === 0) {
                        return (
                            <button
                                key={item.value}
                                            type="button"
                                onClick={() => setActiveTab(item.value)}
                                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all mr-2 ${isActive
                                                ? 'bg-[#a3e635] text-black shadow-sm'
                                                : 'bg-[#1a2333] text-gray-400 hover:text-white'
                                }`}
                            >
                                {item.icon}
                                        </button>
                                    );
                                }

                                return (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => setActiveTab(item.value)}
                                        className={`flex items-center gap-1 px-4.5 py-1 rounded-full text-[11px] font-semibold tracking-wide h-8 transition-all ${isActive
                                            ? 'bg-[#a3e635] text-black font-bold shadow-sm'
                                            : 'text-[#475569] hover:text-[#0f172a] hover:bg-gray-100/70'
                                            }`}
                                    >
                                        {isActive && <Plus size={11} strokeWidth={3} className="mr-0.5" />}
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </div>

                        <div className="hidden xl:flex items-center gap-1.5 pl-1">
                            {secondaryIcons.map((icon, idx) => (
                                <button key={idx} type="button" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/2 border border-white/4 text-gray-400 hover:text-white hover:bg-white/6 transition-all">
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-white/2 p-1 rounded-full border border-white/4">
                            <button type="button" className="flex items-center justify-center w-7 h-7 text-gray-400 hover:text-white hover:bg-white/6 rounded-full transition-all">
                                <Bell size={14} />
                            </button>
                            <button type="button" className="flex items-center justify-center w-7 h-7 text-gray-400 hover:text-white hover:bg-white/6 rounded-full transition-all">
                                <Settings size={14} />
                            </button>
                            <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center border border-white/10 cursor-pointer bg-gray-800">
                                <img
                                    src="https://github.com/gabriellyleitedev.png"
                                    alt="Gabrielly Leite"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=gabrielly";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}