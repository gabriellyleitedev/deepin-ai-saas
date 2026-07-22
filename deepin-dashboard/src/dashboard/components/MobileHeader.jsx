import React, { useState } from 'react';

export default function MobileHeader() {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dados fictícios baseados no layout da imagem
  const user = {
    name: "Mark Willamson",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  };

  return (
    // md:hidden garante que só apareça em dispositivos móveis
    <div className="w-full md:hidden">
      
      {/* Header Fixo, Flutuante e Desgrudado das bordas */}
      <header className="fixed top-3 left-3 right-3 z-50 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* LADO ESQUERDO: Avatar + Saudação */}
          <div className="relative flex items-center gap-3">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                if (showNotifications) setShowNotifications(false);
              }}
              className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 hover:scale-105 active:scale-95 transition focus:outline-none"
            >
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </button>
            
            <div 
              className="flex flex-col text-left leading-tight cursor-pointer select-none"
              onClick={() => {
                setShowProfile(!showProfile);
                if (showNotifications) setShowNotifications(false);
              }}
            >
              <span className="text-[11px] text-zinc-400 font-medium">Good morning</span>
              <h1 className="text-sm font-semibold text-zinc-200">{user.name}</h1>
            </div>

            {/* Dropdown do Perfil (Tema Escuro) */}
            {showProfile && (
              <div className="absolute left-0 top-full mt-3 w-48 bg-[#141512] rounded-xl shadow-xl py-2 border border-zinc-800 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-zinc-800">
                  <p className="text-[11px] font-semibold text-zinc-200">{user.name}</p>
                  <p className="text-[10px] text-zinc-500 truncate">mark@email.com</p>
                </div>
                <button className="w-full text-left px-4 py-1.5 text-[11px] text-zinc-300 hover:bg-zinc-800 transition-colors">
                  Meu Perfil
                </button>
                <button className="w-full text-left px-4 py-1.5 text-[11px] text-zinc-300 hover:bg-zinc-800 transition-colors">
                  Configurações
                </button>
                <hr className="my-1 border-zinc-800" />
                <button className="w-full text-left px-4 py-1.5 text-[11px] text-red-400 hover:bg-red-950/30 transition-colors">
                  Sair da conta
                </button>
              </div>
            )}
          </div>

          {/* LADO DIREITO: Notificação e Busca */}
          <div className="flex items-center gap-2">
            
            {/* Botão Notificações */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (showProfile) setShowProfile(false);
                }}
                className={`relative w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 active:scale-90 focus:outline-none
                  ${showNotifications 
                    ? 'bg-zinc-100 text-black border-zinc-100 shadow-md' 
                    : 'bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-lime-400 rounded-full shadow-[0_0_8px_rgba(163,230,53,0.8)]"></span>
              </button>

              {/* Dropdown de Notificações (Tema Escuro) */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-64 bg-[#141512] rounded-xl shadow-xl p-3 border border-zinc-800 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between px-1 pb-2 border-b border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-wide uppercase">Notificações</span>
                    <span className="text-[9px] bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded-full font-semibold">2 Novas</span>
                  </div>
                  <div className="mt-2 flex flex-col gap-1.5">
                    <div className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                      <p className="text-[11px] text-zinc-300 font-medium leading-tight">Transferência recebida com sucesso.</p>
                      <span className="text-[9px] text-zinc-500 mt-1 block">Agora</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botão de Busca */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full border bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 border-zinc-800 active:scale-90 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

          </div>
        </div>
      </header>

      {/* Espaçador para o conteúdo do app não sumir por baixo do cabeçalho */}
      <div className="h-19 w-full" />
    </div>
  );
}