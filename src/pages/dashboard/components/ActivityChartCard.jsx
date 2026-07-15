import React, { useState, useEffect } from 'react';

export function AbsolutePremiumChart({ externalData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('weekly');

  useEffect(() => {
    if (externalData) {
      setData(externalData);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const API = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin);

        const response = await fetch(`${API}/dashboard`);
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const result = await response.json();
        if (result.weeklyChart && Array.isArray(result.weeklyChart)) {
          setData(result.weeklyChart);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error('Falha ao carregar gráfico:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewMode, externalData]);

  const chartData = data.map((item, index, arr) => {
    const dayName = item.day || 'Dia';
    const today = new Date();
    const dayOffset = (index - (arr.length - 1));
    const dateObj = new Date(today);
    dateObj.setDate(today.getDate() + dayOffset);
    const dateStr = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });

    let trend = '0%';
    if (index > 0) {
      const prev = arr[index - 1].leadsCaptured || 0;
      const curr = item.leadsCaptured || 0;
      if (prev > 0) {
        const diff = ((curr - prev) / prev) * 100;
        trend = (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%';
      } else if (curr > 0) {
        trend = '+100%';
      } else {
        trend = '0%';
      }
    } else {
      trend = 'base';
    }

    return {
      day: dayName,
      value: item.leadsCaptured || 0,
      date: dateStr,
      activity: `${item.leadsCaptured || 0} capturados, ${item.leadsLost || 0} perdidos`,
      trend: trend,
      leadsCaptured: item.leadsCaptured || 0,
      leadsLost: item.leadsLost || 0,
    };
  });

  const maxValue = Math.max(...chartData.map(d => d.value), 0);
  const hasData = chartData.some(d => d.value > 0 || d.leadsLost > 0);
  const MIN_BAR_HEIGHT = 15;

  const yLines = ['100%', '75%', '50%', '25%', '0%'];
  const TODAY_INDEX = chartData.length - 1;
  const [hoveredIndex, setHoveredIndex] = useState(TODAY_INDEX);
  const [showTooltip, setShowTooltip] = useState(false);

  let headerMessage = '+0% esta semana';
  if (hasData && chartData.length > 0) {
    const lastTrend = chartData[TODAY_INDEX]?.trend;
    if (lastTrend && lastTrend !== 'base') {
      headerMessage = lastTrend + ' esta semana';
    } else {
      headerMessage = 'Estável esta semana';
    }
  } else {
    headerMessage = 'Sem dados nesta semana';
  }

  if (loading) {
    return (
      <div className="w-full max-w-2xl bg-white/60 text-white rounded-[22px] p-4 font-sans select-none shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-gray-200/20 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl bg-white/60 text-white rounded-[22px] p-4 font-sans select-none shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-gray-200/20">
        <div className="text-red-500 text-sm p-4">Erro ao carregar dados: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white/60 text-white rounded-[22px] p-4 font-sans select-none shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-gray-200/20">
      {/* Topo */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] text-gray-400 font-base tracking-wide">Análises Semanais</span>
          <h3 className="text-md font-medium tracking-tight text-[#121318]">{headerMessage}</h3>
        </div>
        <div className="flex items-center bg-[#EAECED] p-1 rounded-full border border-gray-300/30">
          <button
            className={`text-[12px] font-bold px-4 py-1.5 rounded-full transition-all ${viewMode === 'weekly' ? 'bg-[#a3e635] text-[#121318] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setViewMode('weekly')}
          >
            • Semanal
          </button>
          <button
            className={`text-[12px] font-medium px-4 py-1.5 rounded-full transition-all ${viewMode === 'monthly' ? 'bg-[#a3e635] text-[#121318] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setViewMode('monthly')}
          >
            Mensal
          </button>
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative h-54 flex items-stretch">
        <div className="flex-1 relative h-full pb-8">
          {/* Linhas de grade */}
          <div className="absolute inset-0 flex flex-col justify-between h-full pb-8 pointer-events-none">
            {yLines.map((line) => (
              <div key={line} className="w-full border-t border-gray-200/60" />
            ))}
          </div>

          {/* Barras */}
          <div className="absolute inset-0 flex justify-between items-end px-2 h-full pb-8 z-10">
            {chartData.map((item, index) => {
              const isGreen = hoveredIndex === index;
              let barHeight = MIN_BAR_HEIGHT;
              if (maxValue > 0) {
                const proporcional = (item.value / maxValue) * 100;
                barHeight = Math.max(proporcional, MIN_BAR_HEIGHT);
              }

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center h-full w-10 md:w-14 justify-end relative cursor-pointer group transition-all ${isGreen ? 'z-30' : 'z-10'}`}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setShowTooltip(true);
                  }}
                  onTouchStart={() => {
                    setHoveredIndex(index);
                    setShowTooltip(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(TODAY_INDEX);
                    setShowTooltip(false);
                  }}
                >
                  {/* Tooltip */}
                  {showTooltip && isGreen && (
                    <div
                      className="absolute z-50 bg-black backdrop-blur-md text-white p-2.5 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.25)] flex flex-col gap-1 text-[11px] border border-white/20 whitespace-nowrap pointer-events-none"
                      style={{
                        bottom: `${barHeight}%`,
                        left: index >= 4 ? 'auto' : '115%',
                        right: index >= 4 ? '115%' : 'auto',
                        transform: 'translateY(50%)'
                      }}
                    >
                      <span className="text-gray-400 font-base tracking-wide">{item.date}</span>
                      <div className="flex justify-between gap-8 mt-1.5">
                        <span className="text-gray-400">Capturados</span>
                        <span className="font-medium text-white">{item.leadsCaptured}</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-gray-400">Perdidos</span>
                        <span className="font-medium text-white">{item.leadsLost}</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-gray-400">Variação</span>
                        <span className={`font-medium ${item.trend.startsWith('+') ? 'text-[#a3e635]' : item.trend === 'base' ? 'text-gray-400' : 'text-red-400'}`}>
                          {item.trend}
                        </span>
                      </div>
                      <div
                        className={`w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent absolute top-1/2 transform -translate-y-1/2
                          ${index >= 4
                            ? 'border-l-[5px] border-l-black -right-1'
                            : 'border-r-[5px] border-r-black -left-1'
                          }`}
                      />
                    </div>
                  )}

                  {/* BARRA */}
                  <div
                            className={`w-10 md:w-12 rounded-md absolute bottom-0 transition-all duration-300 ease-out flex justify-center overflow-visible
                      ${isGreen
                        ? 'bg-[#a3e635] shadow-[0_8px_32px_rgba(174,230,56,0.35)]'
                        : 'bg-gray-300 hover:bg-[#E2E4E5]'
                      }`}
                    style={{ height: `${barHeight}%` }}
                  >
                    {isGreen && (
                      <>
                        <div className="w-px h-full bg-white/30 absolute top-0 bottom-0 pointer-events-none" />
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

      {/* Legendas */}
      <div className="flex justify-between pl-2 px-4 text-[12px] text-gray-400 font-medium tracking-wide">
        {chartData.map((item, index) => (
          <span
            key={index}
            className={`w-10 md:w-14 text-center transition-colors duration-200 ${hoveredIndex === index ? 'text-[#121318] font-medium scale-105' : ''}`}
          >
            {item.day}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AbsolutePremiumChart;