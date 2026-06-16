import React from 'react';
import { Plus } from 'lucide-react';

export default function MobileDock({ navItems, activeTab, setActiveTab }) {
    return (
        <div className="md:hidden fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 touch-none pointer-events-none">
          
            <nav className="w-auto pointer-events-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
                
                {/* O VISUAL DO NOTEBOOK (Pílula branca limpa, sem bordas duplas por fora) */}
                <div className="flex items-center bg-white/80 backdrop-blur-md rounded-full p-1 h-12 max-w-[320px] overflow-x-auto overflow-y-hidden no-scrollbar snap-x touch-pan-x gap-1">
                    {navItems.map((item, index) => {
                        const isActive = activeTab === item.value;

                        // Ícone isolado 
                        if (index === 0) {
                            return (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setActiveTab(item.value)}
                                    className={`flex items-center justify-center min-w-[40px] h-10 rounded-full snap-center transition-all flex-shrink-0 ${
                                        isActive
                                            ? 'bg-[#a3e635] text-black shadow-sm'
                                            : 'bg-[#1a2333] text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {item.icon}
                                </button>
                            );
                        }

                        // Botões de Texto + Ícone (Estilo dos demais botões do Notebook)
                        return (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setActiveTab(item.value)}
                                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[12px] font-semibold tracking-wide h-8 snap-center transition-all flex-shrink-0 whitespace-nowrap ${
                                    isActive
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
            </nav>

            {/* Remove as barras de rolagem nativas */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { 
                    -ms-overflow-style: none; 
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch;
                }
            `}</style>
        </div>
    );
}