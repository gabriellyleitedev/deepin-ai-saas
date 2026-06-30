import React, { useState } from 'react';

export function AbsolutePremiumChart() {
  const data = [
    { day: 'Seg', value: 40, date: 'Julho 20, 2026', activity: '240 ações', trend: '-5%' },
    { day: 'Ter', value: 75, date: 'Julho 21, 2026', activity: '1.500 pts', trend: '2h de economia' },
    { day: 'Qua', value: 50, date: 'July 22, 2026', activity: '3.100 pts', trend: '-5%' },
    { day: 'Qui', value: 92, date: 'July 23, 2026', activity: '5.520 pts', trend: '+24%' }, // Quinta é o dia atual (Today)
    { day: 'Sex', value: 60, date: 'July 24, 2026', activity: '3.800 pts', trend: '+8%' },
    { day: 'Sab', value: 28, date: 'July 25, 2026', activity: '1.680 pts', trend: '-15%' },
    { day: 'Dom', value: 45, date: 'July 26, 2026', activity: '2.700 pts', trend: '+4%' },
  ];

  const yLines = ['100%', '75%', '50%', '25%', '0%'];

  const TODAY_INDEX = 3; // Define o índice do dia atual (Thu)
  const [hoveredIndex, setHoveredIndex] = useState(TODAY_INDEX); // Barra verde começa no dia atual
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip começa escondido

  return (
    <div className="w-full max-w-2xl bg-white/60 text-white rounded-[22px] p-4 font-sans select-none shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-gray-200/20">

      {/* Topo do Painel */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] text-gray-400 font- tracking-wide">Análises Semanais</span>
          <h3 className="text-md font-medium tracking-tight text-[#121318]">+18% esta semana</h3>
        </div>

        <div className="flex items-center bg-[#EAECED] p-1 rounded-full border border-gray-300/30">
          <button className="text-[12px] font-bold px-4 py-1.5 rounded-full bg-[#a3e635] text-[#121318] shadow-sm">• Semanal</button>
          <button className="text-[12px] font-medium px-4 py-1.5 rounded-full text-gray-500 hover:text-gray-700 transition-colors">Mensal</button>
        </div>
      </div>

      {/* Grid do Gráfico */}
      <div className="relative h-56 flex items-stretch">



        {/* Canvas Central */}
        <div className="flex-1 relative h-full pb-8">

          {/* Linhas de Grade de Fundo Suaves */}
          <div className="absolute inset-0 flex flex-col justify-between h-full pb-8 pointer-events-none">
            {yLines.map((line) => (
              <div key={line} className="w-full border-t border-gray-200/60" />
            ))}
          </div>

          {/* Render das colunas gordas */}
          <div className="absolute inset-0 flex justify-between items-end px-2 h-full pb-8 z-10">
            {data.map((item, index) => {
              const isGreen = hoveredIndex === index;

              return (
                <div
                  key={item.day}
                  className={`flex flex-col items-center h-full w-14 justify-end relative cursor-pointer group transition-all ${isGreen ? 'z-30' : 'z-10'
                    }`}
                  // Ativa a barra verde e mostra o tooltip ao entrar com mouse/dedo
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setShowTooltip(true);
                  }}
                  onTouchStart={() => {
                    setHoveredIndex(index);
                    setShowTooltip(true);
                  }}
                  // Quando sai, mantém a barra verde ativa no dia atual (Today) e esconde o tooltip
                  onMouseLeave={() => {
                    setHoveredIndex(TODAY_INDEX);
                    setShowTooltip(false);
                  }}
                >

                  {/* TOOLTIP FLUTUANTE - Só aparece se o showTooltip for true E for a barra ativa do momento */}
                  {showTooltip && isGreen && (
                    <div className="absolute z-50 bg-black backdrop-blur-md text-white p-2.5 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.25)] flex flex-col gap-1 text-[11px] border border-white/20 whitespace-nowrap pointer-events-none"
                      style={{ bottom: `${item.value}%`, left: '115%', transform: 'translateY(50%)' }}>
                      <span className="text-gray-400 font-base tracking-wide">{item.date}</span>
                      <div className="flex justify-between gap-8 mt-1.5">
                        <span className="text-gray-400">Activity</span>
                        <span className="font-medium text-white">{item.activity}</span>
                      </div>

                      <div className="flex justify-between gap-8">

                        <span className="text-gray-400">Trend</span>
                        <span className={`font-medium ${item.trend.startsWith('+') ? 'text-[#a3e635]' : 'text-red-400'}`}>{item.trend}</span>
                      </div>
                      {/* Triângulo indicador do Tooltip */}
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-black absolute top-1/2 -left-1 transform -translate-y-1/2" />
                    </div>
                  )}

                  {/* A BARRA GORDA VERDE (Fica ligada dinamicamente) */}
                  <div
                    className={`w-12 rounded-md absolute bottom-0 transition-all duration-300 ease-out flex justify-center overflow-visible ${isGreen
                      ? 'bg-linear-to-t from-white via-[#a3e635] to-[#9CD22B] shadow-[0_8px_32px_rgba(174,230,56,0.35)]'
                      : 'bg-gray-300 hover:bg-[#E2E4E5]'
                      }`}
                    style={{ height: `${item.value}%` }}
                  >
                    {/* ADORNOS DO ESTADO ACESO */}
                    {isGreen && (
                      <>
                        {/* Linha guia interna branca bem fina */}
                        <div className="w-px h-full bg-white/30 absolute top-0 bottom-0 pointer-events-none" />

                        {/* Círculo com borda vazada no topo superior externo */}
                        <div className="absolute -top-3 w-6 h-6 rounded-full bg-[#9CD22B] border-4 border-white flex items-center justify-center shadow-lg z-30">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Legendas Horizontais (Eixo X) */}
      <div className="flex justify-between pl-2 px-4 text-[12px] text-gray-400 font-medium tracking-wide">
        {data.map((item, index) => (
          <span
            key={item.day}
            className={`w-14 text-center transition-colors duration-200 ${hoveredIndex === index ? 'text-[#121318] font-medium scale-105' : ''
              }`}
          >
            {item.day}
          </span>
        ))}
      </div>

    </div>
  );
}

export default AbsolutePremiumChart;