import React, { useState } from 'react';
import { Plus, Scissors, Crop, Wand2, Type, Music, Zap, Copy, Undo2, Share, Bookmark, Trash2 } from 'lucide-react';

export default function MobileDock({ navItems, activeTab, setActiveTab }) {
    const [isOpen, setIsOpen] = useState(false);

    // Itens organizados exatamente para o grid horizontal deitado com rótulos (Labels)
    const actionItems = [
        { name: 'Cortar', icon: <Scissors size={20} /> },
        { name: 'Enquadrar', icon: <Crop size={20} /> },
        { name: 'Melhorar', icon: <Wand2 size={20} /> },
        { name: 'Texto', icon: <Type size={20} /> },
        { name: 'Áudio', icon: <Music size={20} /> },
        { name: 'Velocidade', icon: <Zap size={20} /> },
        { name: 'Duplicar', icon: <Copy size={20} /> },
        { name: 'Desfazer', icon: <Undo2 size={20} /> },
        { name: 'Compartilhar', icon: <Share size={20} /> },
        { name: 'Salvar', icon: <Bookmark size={20} /> },
        { name: 'Excluir', icon: <Trash2 size={20} /> },
    ];

    // Curva de mola/pulinho (Efeito elástico realista ao abrir)
    const springTransition = {
        transitionTimingFunction: 'cubic-bezier(0.34, 1.6, 0.64, 1)'
    };

    return (
        <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex flex-col items-center gap-4 px-4 touch-none pointer-events-none">
            
            {/* PAINEL DE AÇÕES DEITADO (GRID HORIZONTAL COM TEXTO EMBAIXO) */}
            <div 
                style={springTransition}
                className={`pointer-events-auto w-full max-w-[360px] bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500 origin-bottom ${
                    isOpen 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-75 translate-y-12 pointer-events-none absolute h-0 overflow-hidden'
                }`}
            >
                {/* Grid dinâmico com 4 colunas  */}
                <div className="grid grid-cols-4 gap-x-2 gap-y-4 justify-items-center">
                    {actionItems.map((action, idx) => (
                        <button
                            key={idx}
                            type="button"
                            style={{ 
                                ...springTransition,
                                transitionDelay: isOpen ? `${idx * 25}ms` : '0ms' 
                            }}
                            onClick={() => {
                                console.log(`${action.name} executado`);
                                setIsOpen(false);
                            }}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                                isOpen ? 'scale-100 opacity-100' : 'scale-70 opacity-0'
                            }`}
                        >
                            {/* Círculo do Ícone secundário */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/5 text-black hover:bg-black/10 active:scale-90 transition-all duration-200">
                                {action.icon}
                            </div>
                            {/* Texto descritivo pequeno embaixo */}
                            <span className="text-[10px] font-medium text-black/60 tracking-tight">
                                {action.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* BARRA INFERIOR DE NAVEGAÇÃO E BOTÃO DE ATIVAÇÃO */}
            <div className="flex items-center justify-center gap-3 w-full">
                
                {/* DOCK PRINCIPAL DE CONTEÚDO */}
                <nav className="pointer-events-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                    <div className="flex items-center bg-white/80 backdrop-blur-lg border border-white/40 rounded-full p-1.5 h-14 gap-1">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.value;

                            return (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => {
                                        setActiveTab(item.value);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                                        isActive
                                            ? 'bg-black text-white shadow-md scale-105'
                                            : 'text-black/60 hover:text-black hover:bg-black/5'
                                    }`}
                                >
                                    {item.icon}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* BOTÃO PRINCIPAL (+) QUE SE TRANSFORMA EM (X) */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={springTransition}
                    className={`pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:scale-90 transition-all duration-500 ${
                        isOpen ? 'bg-white text-black border border-black/10' : 'bg-white text-black'
                    }`}
                >
                    <div 
                        style={springTransition}
                        className={`transition-transform duration-500 transform ${isOpen ? 'rotate-135' : 'rotate-0'}`}
                    >
                        <Plus size={24} strokeWidth={2.5} />
                    </div>
                </button>

            </div>
        </div>
    );
}