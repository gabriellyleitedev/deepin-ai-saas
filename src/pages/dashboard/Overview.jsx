import React, { useState } from 'react';
import { MiniAreaChart, PerformancePieChart } from '../../components/DashboardCharts';
import AiPlasmaGlobe from '../../components/AiPlasmaGlobe';
import {
  LayoutDashboard,
  Settings,
  Rocket,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ArrowRight,
  User,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

const runsPrimary = [4000, 3200, 4800, 3100, 4600, 3400, 5200, 4400];
const runsSecondary = [3500, 3900, 3100, 4500, 3800, 4900, 4100, 4600];

const timePrimary = [30, 65, 40, 80, 50, 75, 45, 90];
const timeSecondary = [50, 45, 60, 55, 70, 60, 80, 65];

const jobsPrimary = [200, 450, 300, 600, 400, 550, 350, 700];
const jobsSecondary = [300, 350, 450, 400, 500, 420, 600, 510];

export default function Overview({ isDarkMode, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // CONTROLE REATIVO DO GLOBO: Gerencia se a IA está ativa ou ociosa
  const [isResponding, setIsResponding] = useState(false);

  const cardStyle = {
    backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 0.3)' : '#f4f4f5',
    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(24, 24, 27, 0.08)',
    color: isDarkMode ? '#f4f4f5' : '#18181b'
  };

  const miniCardStyle = {
    backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 0.3)' : '#f4f4f5',
    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(24, 24, 27, 0.06)'
  };

  return (
    <div className="w-full font-sans antialiased flex flex-col px-4 md:px-0 box-border">

      {/* Animações customizadas: mais lentas (0.8s), suaves */}
      <style>{`
        @keyframes gentleFadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }            
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-smooth-entry {
          animation: gentleFadeInUp 0.8s cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
        }
        .delay-card-1 { animation-delay: 150ms; opacity: 0; }
        .delay-card-2 { animation-delay: 300ms; opacity: 0; }
        .delay-card-3 { animation-delay: 450ms; opacity: 0; }
      `}</style>

      {/* HEADER CONTRASTADO */}
      <div
        style={{ borderColor: isDarkMode ? 'rgba(39, 39, 42, 0.6)' : 'rgba(228, 228, 231, 0.8)' }}
        className="w-full relative z-50 bg-transparent border-b border-white/10 animate-smooth-entry"
      >
        {/* DESKTOP HEADER */}
        <div className="hidden md:flex items-center justify-between w-full py-3 px-6">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600/10 p-2 rounded-lg shrink-0 border border-purple-500/20">
              <LayoutDashboard size={24} className="text-purple-600" />
            </div>
            <div className="flex flex-col">
              <h1 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-2xl font-semibold tracking-tight leading-none transition-colors">
                Dashboard Overview
              </h1>
              <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-xs mt-1 transition-colors">
                Real-time insights into your AI agent's performance and activity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">

            {/* SWITCH TOGGLE */}
            <button
              onClick={toggleTheme}
              className="group relative w-16 h-8 rounded-full cursor-pointer p-1 transition-all duration-500 ease-in-out border outline-none select-none shrink-0 flex items-center"
              style={{
                backgroundColor: isDarkMode ? 'rgba(9, 9, 11, 0.6)' : 'rgba(228, 228, 231, 0.6)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(24, 24, 27, 0.12)',
                backdropFilter: 'blur(8px)',
                boxShadow: isDarkMode
                  ? 'inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 0px rgba(255,255,255,0.05)'
                  : 'inset 0 2px 4px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* (Glow de Fundo) */}
              <div
                className={`absolute inset-0 rounded-full transition-opacity duration-500 blur-md pointer-events-none ${isDarkMode ? 'bg-cyan-500/10 opacity-100' : 'bg-amber-500/10 opacity-0'
                  }`}
              />

              {/* BOTÃO DESLIZANTE (The Orbe) */}
              <div
                className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isDarkMode ? 'translate-x-7' : '-translate-x-1'
                  }`}
                style={{
                  background: isDarkMode
                    ? 'radial-gradient(circle at 35% 35%, #1e1b4b 0%, #09090b 100%)'
                    : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e4e4e7 100%)',
                  boxShadow: isDarkMode
                    ? '0 0 12px rgba(6, 182, 212, 0.4), inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.5)'
                    : '0 0 8px rgba(245, 158, 11, 0.2), inset 0 1px 1px rgba(255,255,255,0.9), 0 4px 6px rgba(0,0,0,0.15)',
                  border: isDarkMode ? '1px solid rgba(6, 182, 212, 0.6)' : '1px solid rgba(245, 158, 11, 0.5)'
                }}
              >
                {/* Ícone único centralizado que se transforma de forma suave */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {isDarkMode ? (
                    <Moon
                      size={14}
                      className="text-cyan-500 drop-shadow-[0_0_4px_rgba(34,211,238,0.6)] transition-all duration-500 rotate-0 scale-100"
                      fill="currentColor"
                    />
                  ) : (
                    <Sun
                      size={14}
                      className="text-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.6)] transition-all duration-500 rotate-90 scale-100"
                      fill="currentColor"
                    />
                  )}
                </div>

                {/* Reflexo Realista */}
                <div className="absolute top-[1.5px] left-[2px] w-[5px] h-[2.5px] bg-white/50 rounded-full rotate-[-30deg] pointer-events-none" />
              </div> 
            </button> 

            <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-800 shadow-2xs shrink-0">
              <img src="https://github.com/gabriellyleitedev.png" alt="Perfil" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center justify-between py-3 w-full">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600/10 p-1.5 rounded-lg">
              <LayoutDashboard size={18} className="text-purple-600" />
            </div>
            <span style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-md font-semibold tracking-tight">Overview</span>
          </div>

          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer">
              <div className="w-7 h-7 rounded-full border border-purple-500 p-px shrink-0">
                <img src="https://github.com/gabriellyleitedev.png" className="w-full h-full rounded-full object-cover" alt="Perfil" />
              </div>
              <div className="flex items-center gap-0.5">
                <span style={{ color: isDarkMode ? '#e4e4e7' : '#27272a' }} className="font-semibold text-xs">Hi!</span>
                <ChevronDown size={14} className="text-zinc-500" />
              </div>
            </button>

            {/* DROPDOWN MOBILE */}
            {isMenuOpen && (
              <div
                style={{
                  backgroundColor: isDarkMode ? '#09090b' : '#ffffff',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(24, 24, 27, 0.1)'
                }}
                className="absolute top-full right-0 mt-2 w-48 rounded-xl border shadow-xl p-1.5 z-50 flex flex-col gap-0.5"
              >
                <button style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-zinc-100 rounded-lg transition-colors">
                  <User size={14} className="text-purple-600" /> Perfil
                </button>
                <button style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-zinc-100 rounded-lg transition-colors">
                  <Settings size={14} className="text-zinc-500" /> Settings
                </button>
                <div style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium">
                  <span className="flex items-center gap-2.5">
                    {isDarkMode ? <Moon size={14} className="text-purple-400" /> : <Sun size={14} className="text-amber-500" />} Interface
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); toggleTheme(); }} className="relative w-12 h-6 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 rounded-full p-0.5">
                    <div className={`absolute top-0.5 bottom-0.5 w-5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 shadow-xs transition-transform duration-300 ease-in-out ${!isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(24, 24, 27, 0.06)' }} className="h-px my-1" />
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 rounded-lg transition-colors">
                  <LogOut size={14} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ÁREA INTERNA DE CONTEÚDO */}
      <div className="w-full pt-2 pb-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 w-full">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* CARD ESQUERDO DA IA (Adicionado eventos de mouse para interatividade com o plasma) */}
            <div
              style={cardStyle}
              onMouseEnter={() => setIsResponding(true)}
              onMouseLeave={() => setIsResponding(false)}
              className="group lg:col-span-4 backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-between items-center relative overflow-visible border shadow-sm transition-all duration-300 hover:border-purple-500/30 animate-smooth-entry delay-card-1"
            >
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-100 h-32 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Container expandido para overflow-visible para o brilho fluir livremente */}
              <div className="relative w-full flex-1 flex items-center justify-center min-h-40 overflow-visible">
                <AiPlasmaGlobe isResponding={isResponding} />
              </div>

              <div className="text-center w-full z-10 mt-2">
                <h2 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-base font-semibold tracking-tight mb-1.5">
                  Deepin AI Assistant Core
                </h2>
                <p style={{ color: isDarkMode ? '#a1a1aa' : '#4b5563' }} className="text-[11px] leading-relaxed max-w-65 mx-auto mb-4">
                  Get full access to continuous training loops, real-time context optimizations, and next-gen autonomous workflows.
                </p>
                <button
                  onClick={() => setIsResponding(!isResponding)}
                  style={{ backgroundColor: isDarkMode ? '#ffffff' : '#09090b', color: isDarkMode ? '#09090b' : '#ffffff' }}
                  className="text-[11px] font-semibold px-5 py-2 rounded-full transition-all cursor-pointer hover:opacity-90 active:scale-95"
                >
                  {isResponding ? 'Processing core...' : 'Try deepin engine >'}
                </button>
              </div>
            </div>

            {/* CARD DE ATIVIDADE */}
            <div
              style={cardStyle}
              className="lg:col-span-8 backdrop-blur-xl rounded-3xl p-5 border shadow-sm flex flex-col justify-between transition-colors duration-300 animate-smooth-entry delay-card-1"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 style={{ color: isDarkMode ? '#a1a1aa' : '#4b5563' }} className="text-[11px] font-semibold uppercase tracking-wider">Agent Activity</h3>
                  <span style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#f4f4f5', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(24, 24, 27, 0.08)', color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-[10px] font-medium border px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    Today <span className="text-[8px] opacity-70">▼</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div style={miniCardStyle} className="border rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                    <div>
                      <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[11px] font-medium">Automations Executed</p>
                      <MiniAreaChart primaryPoints={runsPrimary} secondaryPoints={runsSecondary} variant="blue" gradientId="gr-runs" />
                    </div>
                    <h4 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-xl font-bold tracking-tight mt-2">8,835</h4>
                  </div>

                  <div style={miniCardStyle} className="border rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                    <div>
                      <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[11px] font-medium">Response Time</p>
                      <MiniAreaChart primaryPoints={timePrimary} secondaryPoints={timeSecondary} variant="yellow" gradientId="gr-time" />
                    </div>
                    <h4 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-xl font-bold tracking-tight mt-2">1h 48m</h4>
                  </div>

                  <div style={miniCardStyle} className="border rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                    <div>
                      <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[11px] font-medium">Jobs Executed</p>
                      <MiniAreaChart primaryPoints={jobsPrimary} secondaryPoints={jobsSecondary} variant="green" gradientId="gr-jobs" />
                    </div>
                    <h4 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-xl font-bold tracking-tight mt-2">850</h4>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.01)' : '#fafafa', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(24, 24, 27, 0.05)' }} className="rounded-xl p-3 flex items-center justify-between border">
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-3.5 h-3.5 text-zinc-400" />
                    <div>
                      <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-[9px] font-medium">Weekly AI Loops</p>
                      <p style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-xs font-semibold">56 deployments</p>
                    </div>
                  </div>
                  <div style={{ backgroundColor: isDarkMode ? '#27272a' : '#e4e4e7' }} className="w-24 h-1 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[55%]" />
                  </div>
                </div>

                <div style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.01)' : '#fafafa', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(24, 24, 27, 0.05)' }} className="rounded-xl p-3 flex items-center justify-between border">
                  <div className="flex items-center gap-2.5">
                    <Rocket className="w-3.5 h-3.5 text-zinc-400" />
                    <div>
                      <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-[9px] font-medium">Total Syncs Completed</p>
                      <p style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-xs font-semibold">236 executions</p>
                    </div>
                  </div>
                  <div style={{ backgroundColor: isDarkMode ? '#27272a' : '#e4e4e7' }} className="w-24 h-1 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[78%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO INFERIOR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* CARD DA TABELA */}
            <div
              style={cardStyle}
              className="lg:col-span-7 backdrop-blur-xl rounded-3xl p-5 border shadow-sm animate-smooth-entry delay-card-2"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-xs font-semibold">Top AI Pipelines & Flows</h4>
                <span style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[10px] font-semibold flex items-center gap-1 cursor-pointer hover:text-purple-600 transition-colors">
                  View all <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(24, 24, 27, 0.06)' }} className="text-zinc-400 border-b">
                    <th className="pb-2 font-medium">Pipeline / Flow</th>
                    <th className="pb-2 font-medium">Releases</th>
                    <th className="pb-2 font-medium">Trend</th>
                    <th className="pb-2 font-medium text-right">Uptime</th>
                  </tr>
                </thead>
                <tbody style={{ color: isDarkMode ? '#d4d4d8' : '#4b5563' }} className="divide-y divide-transparent">
                  <tr style={{ borderBottom: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(24, 24, 27, 0.04)' }} className="border-b">
                    <td style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="py-2.5 font-semibold">Core API Sync</td>
                    <td className="py-2.5 opacity-80">12,450</td>
                    <td className="py-2.5"><span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold">
                      <ArrowUpRight className="w-3 h-3" /> 32%
                    </span></td>
                    <td className="py-2.5 opacity-80 text-right">99.98%</td>
                  </tr>
                  <tr style={{ borderBottom: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(24, 24, 27, 0.04)' }} className="border-b">
                    <td style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="py-2.5 font-semibold">WhatsApp Webhook</td>
                    <td className="py-2.5 opacity-80">16,300</td>
                    <td className="py-2.5"><span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold">
                      <ArrowUpRight className="w-3 h-3" /> 26%
                    </span></td>
                    <td className="py-2.5 opacity-80 text-right">99.95%</td>
                  </tr>
                  <tr>
                    <td style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="py-2.5 font-semibold">Database RAG Context</td>
                    <td className="py-2.5 opacity-80">10,984</td>
                    <td className="py-2.5"><span className="inline-flex items-center gap-0.5 text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md font-semibold">
                      <ArrowDownRight className="w-3 h-3" /> 11%
                    </span></td>
                    <td className="py-2.5 opacity-80 text-right">99.10%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* COLUNA DE SCORE E READINESS */}
            <div className="lg:col-span-5 flex flex-col gap-4 animate-smooth-entry delay-card-3">
              <div
                style={cardStyle}
                className="backdrop-blur-xl rounded-3xl p-4 border flex items-center justify-between min-h-28.75 shadow-sm"
              >
                <div className="flex flex-col justify-between h-full py-0.5">
                  <div>
                    <h4 style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-xs font-semibold">AI Performance Score</h4>
                    <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-[10px] mt-0.5">Optimized and running smoothly</p>
                  </div>
                  <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[10px] mt-4">Target: <span className="text-purple-600 font-semibold">8.0 reliability</span></p>
                </div>
                <PerformancePieChart score="7.4" />
              </div>

              <div
                style={cardStyle}
                className="backdrop-blur-xl rounded-3xl p-4 border flex flex-col justify-between min-h-28.75 shadow-sm"
              >
                <div className="flex justify-between items-baseline">
                  <h4 style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-xs font-semibold">Prompt Readiness</h4>
                  <span style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[10px] font-semibold">80% completed</span>
                </div>
                <div style={{ backgroundColor: isDarkMode ? '#27272a' : '#e4e4e7' }} className="w-full h-1.5 rounded-full overflow-hidden my-3">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '80%' }} />
                </div>
                <div style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="flex justify-between text-[10px] font-medium">
                  <span>Code Freeze</span>
                  <span>Production</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}