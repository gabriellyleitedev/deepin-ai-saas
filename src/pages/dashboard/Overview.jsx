import React, { useState } from 'react';
import { MiniAreaChart, PerformancePieChart } from '../../components/DashboardCharts';
import AiPlasmaGlobe from '../../components/AiPlasmaGlobe';
import { LayoutDashboard, Settings, Rocket, ArrowUpRight, ArrowDownRight, ChevronDown, ArrowRight, User, LogOut, Sun, Moon } from 'lucide-react';

const runsPrimary = [4000, 3200, 4800, 3100, 4600, 3400, 5200, 4400];
const timePrimary = [30, 65, 40, 80, 50, 75, 45, 90];
const jobsPrimary = [200, 450, 300, 600, 400, 550, 350, 700];

export default function Overview({ isDarkMode, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cardStyle = {
    backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 0.3)' : '#ffffff',
    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(24, 24, 27, 0.08)',
    color: isDarkMode ? '#f4f4f5' : '#18181b',
    boxShadow: isDarkMode ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
  };

  const miniCardStyle = {
    backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 0.3)' : '#fafafa',
    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(24, 24, 27, 0.06)'
  };

  return (
    <div className="w-full font-sans antialiased flex flex-col px-4 md:px-2 box-border">
      <style>{`
        @keyframes gentleFadeInUp {
          from { opacity: 0; transform: translateY(16px); }            
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-smooth-entry { animation: gentleFadeInUp 0.8s cubic-bezier(0.215, 0.610, 0.355, 1) forwards; }
        .delay-card-1 { animation-delay: 150ms; opacity: 0; }
        .delay-card-2 { animation-delay: 300ms; opacity: 0; }
        .delay-card-3 { animation-delay: 450ms; opacity: 0; }
      `}</style>

      <div className="relative w-full flex flex-col">
        {/* DESKTOP HEADER */}
        <div className="hidden md:flex items-center justify-between w-full pb-2 px-6">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600/10 p-2 rounded-lg shrink-0 border border-purple-500/20">
              <LayoutDashboard size={24} className="text-purple-600" />
            </div>
            <div className="flex flex-col">
              <h1 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-2xl font-semibold tracking-tight leading-none">
                Dashboard Overview
              </h1>
              <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-xs mt-1">
                Real-time insights into your AI agent's performance and activity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="group relative w-16 h-8 rounded-full cursor-pointer p-1 border outline-none select-none shrink-0 flex items-center"
              style={{
                backgroundColor: isDarkMode ? 'rgba(9, 9, 11, 0.6)' : 'rgba(228, 228, 231, 0.6)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(24, 24, 27, 0.12)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-500 blur-md pointer-events-none ${isDarkMode ? 'bg-cyan-500/10 opacity-100' : 'bg-amber-500/10 opacity-0'}`} />
              <div
                className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${isDarkMode ? 'translate-x-7' : '-translate-x-1'}`}
                style={{
                  background: isDarkMode ? 'radial-gradient(circle at 35% 35%, #1e1b4b 0%, #09090b 100%)' : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e4e4e7 100%)',
                  border: isDarkMode ? '1px solid rgba(6, 182, 212, 0.6)' : '1px solid rgba(245, 158, 11, 0.5)'
                }}
              >
                {isDarkMode ? <Moon size={14} className="text-cyan-500" fill="currentColor" /> : <Sun size={14} className="text-amber-500" fill="currentColor" />}
              </div>
            </button>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-800 shrink-0">
              <img src="https://github.com/gabriellyleitedev.png" alt="Perfil" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center fixed top-0 left-0 right-0 z-50 px-4 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur bg-white/60 dark:bg-zinc-900/60 justify-between py-3 w-full">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600/10 p-1.5 rounded-lg">
              <LayoutDashboard size={20} className="text-purple-600" />
            </div>
            <span style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-md font-medium tracking-tight">Overview</span>
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

            {isMenuOpen && (
              <div
                style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(24, 24, 27, 0.08)' }}
                className={`absolute top-full right-0 mt-2 w-48 rounded-xl border shadow-xl p-1.5 z-50 flex flex-col gap-0.5 backdrop-blur-md ${isDarkMode ? 'bg-black/80' : 'bg-white/70'}`}
              >
                <button style={{ color: isDarkMode ? '#e4e4e7' : '#27272a' }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                  <User size={14} className="text-purple-500" /> Perfil
                </button>
                <button style={{ color: isDarkMode ? '#e4e4e7' : '#27272a' }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                  <Settings size={14} className="text-zinc-400" /> Settings
                </button>
                <div style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(24, 24, 27, 0.08)' }} className="h-px my-1" />
                <button className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-500 rounded-lg ${isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50/60'}`}>
                  <LogOut size={14} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            borderColor: isDarkMode ? 'rgba(39, 39, 42, 0.4)' : 'rgba(228, 228, 231, 0.6)',
            backgroundColor: isDarkMode ? '#121214' : '#ffffff'
          }}
          className="sticky top-0 z-40 -mx-6 border-b h-px w-[calc(100%+48px)]"
        />
      </div>

      {/* ÁREA INTERNA DE CONTEÚDO */}
      <div className="w-full md:pt-10 pt-20 pb-0 ">
        <div className="max-w-350 mx-auto flex flex-col gap-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

            {/* GLOBO */}
            <div style={cardStyle} className="group lg:col-span-4 backdrop-blur-xl rounded-3xl p-0 flex flex-col justify-between items-center relative overflow-visible border animate-smooth-entry delay-card-1">
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-100 h-32 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative w-full flex-1 flex items-center justify-center min-h-24 max-h-28 overflow-visible mt-2 md:mb-2">
                <AiPlasmaGlobe isResponding={false} />
              </div>
              <div className="text-center w-full z-10 pb-4">
                <h2 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-sm font-semibold tracking-tight mb-1">Deepin AI Assistant Core</h2>
                <p style={{ color: isDarkMode ? '#a1a1aa' : '#4b5563' }} className="text-[11px] leading-relaxed max-w-65 mx-auto mb-3 px-4">Real-time AI workflows for WhatsApp automation.</p>
                <div style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(24, 24, 27, 0.06)' }} className="border-t mx-4 my-3" />
                <div className="grid grid-cols-3 gap-8 md:gap-1 md:px-4 px-4 text-left">
                  <div>
                    <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-[9px] uppercase font-medium tracking-wider">Status</p>
                    <p className="text-xs font-medium text-emerald-500 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" /> Online
                    </p>
                  </div>
                  <div>
                    <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-[9px] uppercase font-medium tracking-wider">Active Agents</p>
                    <p style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-xs font-medium mt-0.5">08</p>
                  </div>
                  <div>
                    <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-[9px] font-medium uppercase tracking-wider">Messages Today</p>
                    <p style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-xs font-medium mt-0.5">3,281</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO DOS GRÁFICOS */}
            <div style={cardStyle} className="lg:col-span-8 backdrop-blur-xl rounded-3xl p-5 border flex flex-col justify-between animate-smooth-entry delay-card-1">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 style={{ color: isDarkMode ? '#a1a1aa' : '#4b5563' }} className="text-[13px] font-medium tracking-wider">Agent Activity</h3>
                  <span style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#f4f4f5', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(24, 24, 27, 0.08)', color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-[10px] font-medium border px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    Today <span className="text-[8px] opacity-70">▼</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div style={miniCardStyle} className="border rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[11px] font-semibold">Messages Processed</p>
                      <MiniAreaChart primaryPoints={runsPrimary} variant="purple" gradientId="gr-msg" isDarkMode={isDarkMode} />
                    </div>
                    <h4 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-xl font-bold tracking-tight mt-2">8,835</h4>
                  </div>

                  <div style={miniCardStyle} className="border rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[11px] font-semibold">Avg Response Time</p>
                      <MiniAreaChart primaryPoints={timePrimary} variant="green" gradientId="gr-time" isDarkMode={isDarkMode} />
                    </div>
                    <h4 style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-xl font-bold tracking-tight mt-2">18s</h4>
                  </div>

                  <div style={miniCardStyle} className="border rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[11px] font-semibold">Active Conversations</p>
                      <MiniAreaChart primaryPoints={jobsPrimary} variant="white" gradientId="gr-conv" isDarkMode={isDarkMode} />
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
                      <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-xs font-medium">Weekly AI Loops</p>
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
                      <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-xs font-medium">Total Syncs Completed</p>
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
            <div style={cardStyle} className="lg:col-span-7 backdrop-blur-xl rounded-3xl p-5 border animate-smooth-entry delay-card-2">
              <div className="flex justify-between items-center mb-3">
                <h4 style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-xs font-semibold">Top AI Pipelines & Flows</h4>
                <span style={{ color: isDarkMode ? '#a1a1aa' : '#71717a' }} className="text-[10px] font-semibold flex items-center gap-1 cursor-pointer  hover:text-purple-600 text-zinc-400 transition-colors">
                  View all <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(24, 24, 27, 0.06)' }} className="text-zinc-400 border-b">
                    <th className="pb-2 font-medium">Pipeline / Flow</th>
                    <th className="pb-2 font-medium">Releases</th>
                    <th className="pb-2 font-medium">Trend</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody style={{ color: isDarkMode ? '#d4d4d8' : '#4b5563' }} className="divide-y divide-transparent">
                  <tr style={{ borderBottom: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(24, 24, 27, 0.04)' }} className="border-b">
                    <td style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="py-2.5 font-semibold">Welcome Flow</td>
                    <td className="py-2.5 opacity-80">12,450</td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-500 font-semibold">
                        <ArrowUpRight className="w-3 h-3" /> 32%
                      </span>
                    </td>
                    <td className="py-2.5 font-medium text-emerald-500 text-right">Healthy</td>
                  </tr>
                  <tr style={{ borderBottom: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(24, 24, 27, 0.04)' }} className="border-b">
                    <td style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="py-2.5 font-semibold">Recovery Campaign</td>
                    <td className="py-2.5 opacity-80">16,300</td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-500 font-semibold">
                        <ArrowUpRight className="w-3 h-3" /> 26%
                      </span>
                    </td>
                    <td className="py-2.5 font-medium text-amber-500 text-right">Warning</td>
                  </tr>
                  <tr>
                    <td style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="py-2.5 font-semibold">Lead Qualification</td>
                    <td className="py-2.5 opacity-80">10,984</td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-rose-500 font-semibold">
                        <ArrowDownRight className="w-3 h-3" /> 11%
                      </span>
                    </td>
                    <td className="py-2.5 font-medium text-rose-600 text-right">Unstable</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 animate-smooth-entry delay-card-3">
              <div style={cardStyle} className="backdrop-blur-xl rounded-3xl p-4 border flex items-center justify-between min-h-24 max-h-24 shadow-sm">
                <div className="flex flex-col justify-between h-full py-0.5">
                  <div>
                    <h4 style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-base font-semibold">AI Accuracy</h4>
                    <p style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="text-xs mt-0.5">Optimized and running smoothly</p>
                  </div>
                </div>
                <PerformancePieChart score="92%" />
              </div>

              <div style={cardStyle} className="backdrop-blur-xl rounded-3xl p-4 border flex flex-col justify-center min-h-24 max-h-24 shadow-sm">
                <div className="flex justify-between items-baseline">
                  <h4 style={{ color: isDarkMode ? '#d4d4d8' : '#27272a' }} className="text-xs font-semibold">Prompt Readiness</h4>
                  <span style={{ color: isDarkMode ? '#ffffff' : '#09090b' }} className="text-lg font-semibold tracking-tight">80%</span>
                </div>
                <div style={{ backgroundColor: isDarkMode ? '#27272a' : '#e4e4e7' }} className="w-full h-1 rounded-full overflow-hidden my-2">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '80%' }} />
                </div>
                <div style={{ color: isDarkMode ? '#71717a' : '#a1a1aa' }} className="flex justify-between text-[11px] font-medium">
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