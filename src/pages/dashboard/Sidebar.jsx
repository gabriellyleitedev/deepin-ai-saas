import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Zap, MessageSquare, Settings, ChevronRight, ChevronFirst, ChevronLast, QrCode, } from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed, activeTab, setActiveTab }) { // IsCollapsed e setIsCollapsed agora vêm como props do Layout

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'connections', label: 'Connections (Whats)', icon: QrCode },
        { id: 'automation', label: 'Automation (AI)', icon: Zap },
        { id: 'chats', label: 'Conversations', icon: MessageSquare },
    ];

    return (
        <aside className={`h-full flex flex-col pt-8 pb-6 px-4 justify-between select-none shrink-0 bg-neutral-900 relative transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
            }`}>

            <div>
                {/* TOPO: LOGO DA DEEPIN AI + BOTÃO DA SETA */}
                <div className={`flex items-center px-3 mb-8 -mt-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>

                    {/* Só mostra o texto da logo se NÃO estiver colapsada */}
                    {!isCollapsed && (
                        <Link to="/dashboard" className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-500 whitespace-nowrap">
                            DEEPIN AI
                        </Link>
                    )}

                    {/* BOTÃO DA SETA */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 text-zinc-400 hover:text-white transition-all cursor-pointer"
                    >
                        {isCollapsed ? <ChevronLast size={18} /> : <ChevronFirst size={18} />}
                    </button>
                </div>

                {/* linha divisória sutil */}
                <div className="h-px mb-8 flex w-full bg-linear-to-r from-transparent via-white/15 to-transparent" />

                {/* SEÇÃO: MAIN MENU */}
                <div className="mb-8">

                    {/* Só mostra o título se NÃO estiver colapsada */}
                    {!isCollapsed && (
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-600 mb-3 px-3">
                            Main Menu
                        </p>
                    )}

                    <nav className="space-y-1">

                        {menuItems.map((item) => {
                            const isActive = activeTab === item.id;
                            return (

                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full group flex items-center px-3 py-2.5 rounded-xl relative transition-all duration-200 ${isCollapsed ? 'justify-center' : 'justify-between'
                                        } ${isActive
                                            ? 'bg-linear-to-r from-white/4 to-transparent text-white'
                                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/1'
                                        }`}
                                    style={isActive ? { borderLeft: '1px solid rgba(255, 255, 255, 0.35)', boxShadow: 'inset 4px 0 12px -2px rgba(168, 85, 247, 0.15)' } : {}}
                                >

                                    {/* INDICADOR LATERAL ROXO NEON */}
                                    {isActive && (
                                        <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full shadow-[4px_0_16px_#a855f7,8px_0_32px_rgba(168,85,247,0.9)]" />
                                    )}

                                    <div className="flex items-center gap-3">
                                        <item.icon size={18} className={isActive ? 'text-purple-400' : 'text-zinc-500 group-hover:text-zinc-400'} />

                                        {/* Só renderiza o texto se tiver espaço */}
                                        {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                    </div>

                                    {/* Só renderiza a seta da direita se tiver aberta */}
                                    {!isCollapsed && (
                                        <ChevronRight
                                            size={14}
                                            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isActive ? 'text-zinc-400 opacity-100' : 'text-zinc-600'}`}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* RODAPÉ: CARD COM ANIMAÇÃO */}
            <div className="pt-4 border-t border-white/2 relative z-10">
                {isCollapsed ? (

                    <div className="flex justify-center items-center py-2 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-[#16161a] border border-white/6 flex items-center justify-center relative shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-purple-500/30">

                            {/* O Cubo com animação de pulsação suave */}
                            <div className="w-3.5 h-3.5 bg-linear-to-tr from-purple-600 to-indigo-400 rounded-sm shadow-[0_0_12px_rgba(139,92,246,0.8)] animate-pulse" />

                            <span className="absolute left-14 bg-[#0c0c0e] border border-white/8 text-zinc-300 text-[11px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                                Plano Atual: Free
                            </span>
                        </div>
                    </div>
                ) : (


                    <div className="bg-[#111113]/90 border border-white/4 rounded-2xl p-4 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] group">

                        {/* LINHA ILUMINADA NO TOPO (BORDER GLOW) */}
                        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-purple-500/60 to-transparent shadow-[0_1px_8px_rgba(168,85,247,0.4)] pointer-events-none" />

                        {/* 1. GLOW DE FUNDO PULSANTE */}
                        <div className="absolute -top-12 -left-12 w-28 h-28 bg-purple-600/30 blur-[32px] rounded-full pointer-events-none animate-pulse duration-4000" />

                        {/* 2. SISTEMA DE PARTÍCULAS (Bolinhas com posições corrigidas e randômicas) */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

                            {/* Bolinha 1 */}
                            <div
                                className="absolute -bottom-2.5 left-[15%] w-1 h-1 bg-purple-400/40 rounded-full blur-[0.5px] animate-float"
                                style={{ animationDelay: '0s', animationDuration: '4s' }}
                            />
                            {/* Bolinha 2 */}
                            <div
                                className="absolute -bottom-2.5 left-[35%] w-2 h-2 bg-indigo-400/30 rounded-full blur-[0.5px] animate-float"
                                style={{ animationDelay: '1.2s', animationDuration: '5.5s' }}
                            />
                            {/* Bolinha 3 */}
                            <div
                                className="absolute -bottom-2.5 left-[55%] w-1.5 h-1.5 bg-purple-300/40 rounded-full blur-[0.5px] animate-float"
                                style={{ animationDelay: '0.5s', animationDuration: '3.8s' }}
                            />
                            {/* Bolinha 4 */}
                            <div
                                className="absolute -bottom-2.5 left-[72%] w-1 h-1 bg-indigo-400/50 rounded-full blur-[0.5px] animate-float"
                                style={{ animationDelay: '2.1s', animationDuration: '4.2s' }}
                            />
                            {/* Bolinha 5 */}
                            <div
                                className="absolute -bottom-2.5 left-[85%] w-2 h-2 bg-purple-500/20 rounded-full blur-[0.5px] animate-float"
                                style={{ animationDelay: '1.7s', animationDuration: '6s' }}
                            />
                            {/* Bolinha 6 */}
                            <div
                                className="absolute -bottom-2.5 left-[45%] w-1 h-1 bg-white/30 rounded-full blur-[0.5px] animate-float"
                                style={{ animationDelay: '2.8s', animationDuration: '4.8s' }}
                            />
                        </div>

                        {/* Elemento estático superior direito */}
                        <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/2 border border-white/3 pointer-events-none" />

                        <div className="relative z-10">

                            {/* Cubo centralizado no topo esquerdo */}
                            <div className="w-8 h-8 rounded-lg bg-[#1a1a1e] border border-white/8 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.4)] mb-4">
                                <div className="w-2.5 h-2.5 bg-linear-to-tr from-purple-500 to-white rounded-[3px] shadow-[0_0_10px_rgba(139,92,246,0.9)]" />
                            </div>

                            <h4 className="text-xs font-bold text-white tracking-wide">Free Plan</h4>

                            <div className="mt-1 flex items-baseline gap-0.5">
                                <span className="text-lg font-bold text-white tracking-tight">$0</span>
                                <span className="text-[10px] text-zinc-500 font-medium font-mono">/month</span>
                            </div>

                            <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed max-w-40">
                                Explore a plataforma e inicie sua jornada de automação.
                            </p>

                            <button className="w-full mt-4 bg-[#1c1c1f] hover:bg-[#252529] border border-white/4 hover:border-purple-700 text-zinc-300 hover:text-white text-[10px] font-semibold py-2 px-3 rounded-xl transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.3)] active:scale-[0.98] cursor-pointer">
                                Start for Free
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </aside>
    );
}