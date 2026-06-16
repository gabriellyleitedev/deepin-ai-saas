import React from 'react';
import InvoicesList from "../../components/InvoicesList";

export default function Overview({ setActiveTab, onBack, historyLength }) {
  
  const teamSep = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80"
  ];

  const teamNov = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  ];

  const teamDec = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  ];

  return (
    <div className="w-full text-zinc-100 p-6 md:p-8 -mt-10 select-none">
      
      {/* Título Principal */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="flex items-center justify-center w-6 h-6 rounded-full bg-white/4 border border-white/8 text-zinc-400 text-xs hover:text-white transition-colors">
          ←
        </button>
        <h1 className="text-2xl font-light tracking-tight text-white">
          Visão geral<span className="font-normal text-zinc-300"></span>
        </h1>
      </div>

      {/* --- DIV DE GRID PRINCIPAL (PAI DOS DOIS CARDS) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

        {/* CARD 1: CARD PRINCIPAL UNIFICADO (Métricas e Etapas) - 100% INTOCADO */}
        <div className="lg:col-span-2 bg-[#11141e] border border-white/4 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Grid de Informações de Cima */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8 border-b border-white/6">
            
            {/* Coluna 1: Mensagens */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-zinc-500 tracking-wide">Mensagens</span>
              <div className="text-3xl md:text-4xl font-light tracking-tight text-white flex items-baseline gap-2">
                <span>1320</span>
                <span className="text-sm font-normal text-zinc-400 border border-white/10 rounded-full px-2.5 py-0.5">+18%</span>
              </div>
            </div>

            {/* Coluna 2: Áudios */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-zinc-500 tracking-wide">Áudios</span>
              <div className="text-3xl md:text-4xl font-light tracking-tight text-white flex items-baseline gap-2">
                <span>821</span>
                <span className="text-sm font-normal text-zinc-400 border border-white/10 rounded-full px-2.5 py-0.5">+24%</span>
              </div>
            </div>

            {/* Coluna 3: Conversão */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-zinc-500 tracking-wide">Conversão</span>
              <div className="text-3xl md:text-4xl font-light tracking-tight text-white flex items-baseline gap-2">
                <span>98.2%</span>
                <span className="text-sm font-normal text-zinc-500 border border-white/10 rounded-full px-2.5 py-0.5">OK</span>
              </div>
            </div>

          </div>

          {/* Linha do Tempo e Progresso Inferior */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 pt-8 items-start">
            
            {/* Etapa 1: Novos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <span className="text-xs font-medium text-zinc-500 tracking-wide">Novos Leads</span>
                <span className="text-[11px] font-medium text-zinc-500 tracking-wide">12 hoje</span>
              </div>
              <div className="h-1 w-full bg-[#a3e635] rounded-full"></div>
              <div className="flex items-center -space-x-2.5 overflow-hidden pt-1">
                {teamSep.map((src, i) => (
                  <img key={i} className="inline-block h-6 w-6 rounded-full ring-4 ring-[#11141e] object-cover" src={src} alt="Lead" />
                ))}
              </div>
            </div>

            {/* Etapa 2: Triagem */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <span className="text-xs font-medium text-zinc-500 tracking-wide">Em Triagem</span>
                <span className="text-[11px] font-medium text-zinc-500 tracking-wide">4 ativos</span>
              </div>
              <div className="h-1 w-full bg-[#a3e635] rounded-full"></div>
              <div className="flex items-center -space-x-2.5 overflow-hidden pt-1">
                {teamNov.slice(0, 2).map((src, i) => (
                  <img key={i} className="inline-block h-6 w-6 rounded-full ring-4 ring-[#11141e] object-cover" src={src} alt="Lead" />
                ))}
              </div>
            </div>

            {/* Etapa 3: Interesse Alto */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <span className="text-xs font-medium text-zinc-500 tracking-wide">Interesse Alto</span>
                <span className="text-[11px] font-medium text-zinc-500 tracking-wide">2 alertas</span>
              </div>
              <div className="h-1 w-full bg-[#a3e635] rounded-full"></div>
              <div className="flex items-center -space-x-2.5 overflow-hidden pt-1">
                {teamNov.slice(1, 3).map((src, i) => (
                  <img key={i} className="inline-block h-6 w-6 rounded-full ring-4 ring-[#11141e] object-cover" src={src} alt="Lead" />
                ))}
              </div>
            </div>

            {/* Etapa 4: Agendados */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <span className="text-xs font-medium text-zinc-500 tracking-wide">Agendados</span>
                <span className="text-[11px] font-medium text-zinc-500 tracking-wide">Finalizados</span>
              </div>
              <div className="h-1 w-full bg-white/8 rounded-full"></div>
              <div className="flex items-center -space-x-2.5 overflow-hidden pt-1">
                {teamDec.map((src, i) => (
                  <img key={i} className="inline-block h-6 w-6 rounded-full ring-4 ring-[#11141e] object-cover" src={src} alt="Lead" />
                ))}
              </div>
            </div>

          </div>

        </div> {/* <--- FIM DO CARD DE MÉTRICAS */}


        {/* CARD 2: ADAPTADO PARA SAÚDE DAS AUTOMAÇÕES */}
        <div className="bg-[#11141e] border border-white/4 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-85">
          
          {/* Topo do Card */}
          <div className="space-y-1">
            <div className="w-full flex justify-between items-start">
              <span className="text-xs text-zinc-400 tracking-wide font-normal block">
                Saúde das Automações
              </span>
              {/* Ícone de Seta inclinado dentro do mini círculo perfeito */}
              <div onClick={() => setActiveTab('automation')} className="w-7 h-7 rounded-full bg-white/3 border border-white/8 flex items-center justify-center text-zinc-400 text-[10px] cursor-pointer hover:text-white transition-colors">
                ↗
              </div>
            </div>
            
            {/* Taxa Operacional com indicador menor e Tag de Status */}
            <div className="text-3xl md:text-4xl font-light tracking-tight text-white flex items-baseline gap-0.5 pt-1">
              <span className="text-lg font-normal text-zinc-500 mr-0.5">%</span>
              <span>98.4</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-sans ml-2">
                Estável
              </span>
            </div>
          </div>

          {/* Centro: Grid de Mini Cartões de Status  */}
          <div className="grid grid-cols-3 gap-2.5 my-6">
            
            {/* Online */}
            <div className="bg-white/2 border border-white/4 rounded-2xl p-3 flex flex-col justify-between h-24">
              <span className="text-[14px] text-zinc-400 font-semibold tracking-wider">123</span>
              <span className="text-xs font-medium text-zinc-500">Ativas</span>
            </div>

            {/* Atenção / Pausadas (Ocupa o lugar de destaque do Stripe com o Verde Neon e Glow) */}
            <div className="bg-[#a3e635] rounded-2xl p-3 flex flex-col justify-between h-24 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
              <span className="text-[14px] text-zinc-950 font-bold tracking-wider">2</span>
              <span className="text-xs font-bold text-zinc-950">Pausadas</span>
            </div>

            {/* Falha / Desconectada */}
            <div className="bg-white/2 border border-white/4 rounded-2xl p-3 flex flex-col justify-between h-24">
              <span className="text-[14px] text-rose-500 font-semibold tracking-wider">1</span>
              <span className="text-xs font-medium text-zinc-500">Erro</span>
            </div>

          </div>

          {/* Base: Botão Ver Detalhes alinhado à direita */}
          <div className="w-full flex justify-end">
            <button 
              onClick={() => setActiveTab('automation')} 
              className="py-2.5 px-5 bg-white text-zinc-950 font-medium text-xs rounded-full hover:bg-zinc-200 transition-all shadow-md active:scale-[0.97]"
            >
              Ver fluxos
            </button>
          </div>

        </div>

      </div> {/* --- FIM DA DIV DE GRID PRINCIPAL --- */}

<InvoicesList />
    </div>
  );
}
