import React from 'react';
import { LayoutDashboard, Zap, MessageSquare, QrCode } from 'lucide-react';

export default function MobileDock({ activeTab, setActiveTab }) {

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'connections', label: 'Whats', icon: QrCode },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'chats', label: 'Conversations', icon: MessageSquare },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm">

      {/* Background principal do Dock */}
      <div className="flex items-center justify-between bg-neutral-950/70 backdrop-blur-sm border border-white/9 p-1.5 rounded-[28px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)],inset_0_1px_0_rgba(255,255,255,0.45)] gap-1">

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              /* 
                - Se Ativo: Fundo cinza escuro sutil
                - Se Inativo: Ícone cinza apagado, integrado ao fundo
              */
              className={`h-11 flex items-center justify-center gap-2 rounded-full transition-all duration-300 relative cursor-pointer ${isActive
                  ? 'flex-1 px-4 bg-white/1 border border-white/8 text-purple-400 font-medium shadow-[0_4px_20px_rgba(168,85,247,0.15)]'
                  : 'w-11 text-zinc-500 hover:text-zinc-400 hover:bg-white/1'
                }`}
            >
              {/* Ícone interno adaptando a cor para roxo se estiver ativo */}
              <item.icon
                size={18}
                className={`transition-colors duration-300 shrink-0 ${isActive ? 'text-purple-400 stroke-[2px]' : 'text-zinc-400 stroke-[1.8px]'
                  }`}
              />

              {/* Texto condicional escuro e sofisticado */}
              {isActive && (
                <span className="text-xs tracking-wide text-zinc-200 whitespace-nowrap overflow-hidden max-w-21.25 transition-all duration-300">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
}