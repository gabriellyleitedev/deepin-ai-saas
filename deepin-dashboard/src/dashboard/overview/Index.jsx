import React, { useState } from 'react';
import ParticleGlobe from '../components/ParticleGlobe';
import MiniChartCard from '../components/MiniChartCard';
import { Link } from 'react-router-dom';
import ActivityChartCard from '../components/ActivityChartCard';
import { DeepinAIEngine } from '../components/DeepinAIEngine';
import { RecentLeadsList } from '../components/RecentLeadsList';
import  OverviewCards  from '../components/OverviewCards';

export default function Index({ setActiveTab, navigateBack, activeTab }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);


  return (
    <div className="w-full hidden md:block min-h-screen bg-transparent font-sans text-[#1a1a1a] overflow-x-hidden pb-10">

      {/* Container Principal com compensação da sidebar lateral */}
      <div className="pl-6 pr-0 py-0 max-w-350 mx-auto flex flex-col gap-6">

        {/* Header */}
        <header className="w-full py-0 flex items-center justify-between">
          <div className="flex items-center flex-1 max-w-xs">
            <div className="relative w-full">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/50">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar processos, instâncias..."
                className="w-full pl-9 pr-4 py-2 text-[11px] text-black rounded-full bg-white/80 border border-transparent focus:border-black/10 outline-none transition placeholder-black/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-1.5">
              <div className="w-6 h-6 rounded-full border border-white bg-gray-300 overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="w-6 h-6 rounded-full border border-white bg-gray-300 overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="w-6 h-6 rounded-full border border-white bg-gray-300 overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="w-6 h-6 rounded-full border border-white bg-[#1a1a1a] flex items-center justify-center text-[9px] text-white font-semibold shadow-sm">
                +6
              </div>
            </div>

            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-gray-50 text-gray-600 text-[11px] font-medium rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-gray-200/40 transition">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Exportar
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200
                  ${showNotifications ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200/40 shadow-sm'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>

            <div className="relative flex items-center gap-2.5 pl-3 border-l border-gray-300/60">
              <button onClick={() => setShowProfile(!showProfile)} className="w-7 h-7 rounded-full overflow-hidden shadow-sm ring-2 ring-white">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" alt="Perfil" className="w-full h-full object-cover" />
              </button>
              <div className="flex flex-col text-left leading-tight cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
                <span className="text-[11px] font-semibold text-gray-800">Gabrielly Leite</span>
                <span className="text-[9px] text-gray-400">gabrielly@email.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* 1. Titulo */}
        <div className="mt-2 max-w-4xl">
          <h1 className="text-[36px] font-light tracking-tight text-gray-900 leading-[1.2]">
            Sua infraestrutura de agentes está <br />
            <span className="text-gray-400 font-normal">operando dentro dos <span className="text-gray-900 font-light">parâmetros</span> de estabilidade.</span>
          </h1>
        </div>

        {/* 2. Cards de Métricas */}
        <div className="w-full">
          <OverviewCards />
        </div>

        {/* =========================================================================
            3. COMPOSIÇÃO DOS CARDS JUNTOS (UM EMBAIXO DO OUTRO - COM GLOBO E VIDRO)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 -mt-3 items-start w-full">

          {/* Coluna 1: Globo + Glassmorphism */}
          <div className="w-full max-w-md mx-auto relative flex-col flex items-center ml-4 select-none">
            <div className="w-[90%] h-72 rounded-[28px] bg-linear-to-br from-[#111612] via-[#0b0e0c] to-[#050605] border border-white/5 shadow-2xl relative overflow-hidden p-6 z-0">
              <div className="flex flex-col gap-1 relative z-10">
                <span className="text-[11px] font-base tracking-widest text-white opacity-90">
                  Deepin IA <br /> Assistente
                </span>
              </div>
              <div className="flex items-center justify-center w-full">
                <ParticleGlobe />
              </div>
            </div>

            <div className="w-[90%] -mt-14 h-86 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] z-10 p-5 flex flex-col gap-4" style={{ backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(24px)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-base text-black tracking-wide block">Analítica</span>
                  <h3 className="text-xs font-semibold tracking-tight text-gray-900 mt-0.5">Volumetria de Requisições</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-white/40 border border-white/60 px-2 py-0.5 rounded-full shadow-sm">+14.2%</span>
              </div>
              <div className="w-full">
                <MiniChartCard />
              </div>
            </div>
          </div>
          {/* COLUNA 2 E 3 AGRUPADAS: Ocupam as duas colunas restantes e resolvem o vão */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Grid interna apenas para os dois cards superiores ficarem lado a lado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start w-full">
              {/* Gráfico Semanal */}
              <div className="w-full ">
                <ActivityChartCard />
              </div>

              {/* Engine */}
              <div className="w-full">
                <DeepinAIEngine />
              </div>
            </div>

            {/* A lista de leads entra bem aqui, colando logo abaixo deles e ignorando a altura do Globo! */}
            <div className="w-full -mt-4">
              <RecentLeadsList />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}