import React, { useState, useRef, useEffect } from 'react';

const computeMonotonePath = (points) => {
  if (!points || points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const n = points.length;
  const dx = [];
  const dy = [];
  const ms = [];

  for (let i = 0; i < n - 1; i++) {
    // 1. Ela calcula a distância deitada (dx) e em pé (dy) entre cada bolinha do gráfico.
    dx[i] = points[i + 1].x - points[i].x;
    dy[i] = points[i + 1].y - points[i].y;
    ms[i] = dy[i] / (dx[i] || 1);
  }

  // 2. Ela acha a inclinação (tangents) perfeita para a curva passar exatamente por dentro da bolinha...
  // ...sem fazer curvas bizarras para cima ou para baixo do valor real.
  const tangents = [ms[0]];
  for (let i = 1; i < n - 1; i++) {
    const m = ms[i - 1];
    const nextM = ms[i];
    if (m * nextM <= 0) {
      tangents[i] = 0;
    } else {
      const alpha = m / (nextM || 1);
      tangents[i] = (3 * nextM) / (alpha + 2);
    }
  }
  tangents.push(ms[n - 2]);

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX1 = p0.x + dx[i] / 3;
    const cpY1 = p0.y + (dx[i] * tangents[i]) / 3;
    const cpX2 = p1.x - dx[i] / 3;
    const cpY2 = p1.y - (dx[i] * tangents[i + 1]) / 3;

    // 3. Ela monta o comando "C" (Cubic Bézier) que o navegador entende para desenhar vetores (SVG).
    path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }
  return path;
};

// COMPONENTE DO GRÁFICO DE ÁREA 
export function MiniAreaChart({ primaryPoints = [], secondaryPoints = [], gradientId, variant = 'white', isDarkMode }) {
  const width = 260;
  const height = 75;
  const paddingY = 2;

  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [activePoint, setActivePoint] = useState(null);
  const [strokeLength, setStrokeLength] = useState(0);

  const colorSchemes = {
    purple: {
      stroke: "#a855f7",
      strokeClass: "stroke-[#a855f7]",
      area: "#a855f7",
      dotFill: "#e9d5ff",
      label: "Messages"
    },
    green: {
      stroke: "#6ee7b7",
      strokeClass: "stroke-[#6ee7b7]",
      area: "#34d399",
      dotFill: "#a7f3d0",
      label: "Latency"
    },
    white: {
      stroke: "var(--chart-white-stroke, #94a3b8)",
      strokeClass: "stroke-slate-400 dark:stroke-zinc-400",
      area: "#64748b",
      areaClass: "text-slate-400/20 dark:text-zinc-500/20",
      dotFill: "var(--chart-white-dot, #64748b)",
      label: "Value"
    }
  };

  const colors = colorSchemes[variant] || colorSchemes.white;
  const inlineStrokeColor = variant === 'white' ? 'rgba(148, 163, 184, 0.85)' : colors.stroke;

  const maxVal = Math.max(...primaryPoints, ...secondaryPoints);
  const minVal = Math.min(...primaryPoints, ...secondaryPoints);
  const range = maxVal - minVal || 1;

  const getCoordinates = (points) => points.map((val, index) => ({
    x: (index / (points.length - 1)) * width,
    y: height - ((val - minVal) / range) * (height - paddingY * 2) - paddingY,
    originalValue: val
  }));

  const pCoords = getCoordinates(primaryPoints);
  const sCoords = getCoordinates(secondaryPoints);

  const primaryLinePath = computeMonotonePath(pCoords);
  const secondaryLinePath = computeMonotonePath(sCoords);

  const areaPath = pCoords.length > 0 ? `${primaryLinePath} L ${width} ${height} L 0 ${height} Z` : "";

  useEffect(() => {
    if (pathRef.current) {
      setStrokeLength(pathRef.current.getTotalLength());
    }
  }, [primaryLinePath]);

  const handleMouseMove = (e) => {
    if (!svgRef.current || pCoords.length === 0) return;

    const rect = svgRef.current.getBoundingClientRect();
    const mouseXInSvg = ((e.clientX - rect.left) / rect.width) * width;

    let closestIndex = 0;
    let minDiff = Infinity;
    pCoords.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - mouseXInSvg);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    const pt = pCoords[closestIndex];
    const pixelX = (pt.x / width) * rect.width;
    const pixelY = (pt.y / height) * rect.height;

    setActivePoint({
      x: pt.x,
      y: pt.y,
      pixelX,
      pixelY,
      value: pt.originalValue
    });
  };

  return (
    <div
      className="w-full h-14 my-2 relative overflow-visible select-none"
      onMouseLeave={() => setActivePoint(null)}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --chart-white-stroke: #94a3b8;
          --chart-white-dot: #64748b;
        }
        .dark {
          --chart-white-stroke: rgba(244, 244, 245, 0.6);
          --chart-white-dot: #94a3b8;
        }
        @keyframes drawLine-${gradientId} {
          from { stroke-dashoffset: ${strokeLength || 1000}; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes revealArea-${gradientId} {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .motion-line-${gradientId} {
          stroke-dasharray: ${strokeLength || 1000};
          stroke-dashoffset: ${strokeLength || 1000};
          animation: drawLine-${gradientId} 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .motion-area-${gradientId} {
          transform-origin: bottom;
          animation: revealArea-${gradientId} 2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
      `}} />

      <svg
        ref={svgRef}
        className="w-full h-full cursor-crosshair overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
      >
        <defs>
          <linearGradient id={`fumet-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.area} stopOpacity="0.15" />
            <stop offset="40%" stopColor={colors.area} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colors.area} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gradiente preenchido com animação de reveal */}
        {areaPath && (
          <path
            d={areaPath}
            fill={`url(#fumet-${gradientId})`}
            className={`motion-area-${gradientId} ${variant === 'white' ? colors.areaClass : ''}`}
            style={{ opacity: 0 }}
          />
        )}

        {/* LINHA DE TRACINHOS DE FUNDO CURVADA (FALTA CORRIGIR) */}
        {secondaryLinePath && (
          <path
            d={secondaryLinePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="text-slate-400/30 dark:text-zinc-600/50"
          />
        )}

        {/* Linha principal com animação */}
        {primaryLinePath && (
          <path
            ref={pathRef}
            d={primaryLinePath}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`motion-line-${gradientId} ${colors.strokeClass}`}
          />
        )}

        {/* Linha vertical auxiliar do Tooltip */}
        {activePoint && (
          <line
            x1={activePoint.x}
            y1={0}
            x2={activePoint.x}
            y2={height}
            stroke={variant === 'white' ? 'var(--chart-white-stroke)' : colors.stroke}
            strokeWidth="0.75"
            strokeDasharray="2 2"
            opacity="0.3"

            style={{
              filter: isDarkMode ? `drop-shadow(0px 2px 6px ${colors.stroke}66)` : 'none'
            }}
          />
        )}

        {/* Nós da linha secundária (opcional, sutil atrás dos tracinhos) 
        {sCoords.map((pt, idx) => (idx % 2 === 0) && (
          <circle 
            key={`s-dot-${idx}`} 
            cx={pt.x} 
            cy={pt.y} 
            r="1" 
            className="fill-slate-400/30 dark:fill-zinc-600/60"
          />
        ))}

        {/* Nós da linha principal */}
        {pCoords.map((pt, idx) => (idx % 2 === 0) && (
          <circle
            key={`p-dot-${idx}`}
            cx={pt.x}
            cy={pt.y}
            r="2.2"
            fill={variant === 'white' ? 'var(--chart-white-dot)' : colors.dotFill}
            fillOpacity="0.65"
            stroke="#131316"
            strokeWidth="1"
          />
        ))}

        {/* Ponto focal no Hover */}
        {activePoint && (
          <g>
            <circle cx={activePoint.x} cy={activePoint.y} r="5" fill={variant === 'white' ? 'var(--chart-white-stroke)' : colors.stroke} fillOpacity="0.25" />
            <circle cx={activePoint.x} cy={activePoint.y} r="2.5" className="fill-white dark:fill-[#131316]" stroke={variant === 'white' ? 'var(--chart-white-stroke)' : colors.stroke} strokeWidth="1.2" />
          </g>
        )}
      </svg>

      {/* Estrutura do Tooltip customizado */}
      {activePoint && (
        <div
          className="absolute z-50 pointer-events-none rounded-md p-[0.5px] -translate-x-1/2 -translate-y-full shadow-2xl transition-all duration-75"
          style={{
            left: `${activePoint.pixelX}px`,
            top: `${activePoint.pixelY - 14}px`,
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.0) 60%, ${inlineStrokeColor} 100%)`,
          }}
        >
          <div className="bg-white dark:bg-[#121215]/70 backdrop-blur-md border border-zinc-200 dark:border-transparent text-zinc-800 dark:text-zinc-100 rounded-md px-3.5 py-2 flex items-start gap-2.5 min-w-30">
            <div
              className="w-[2.5px] self-stretch rounded-full shrink-0"
              style={{ backgroundColor: inlineStrokeColor }}
            />
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-base tracking-tight text-zinc-900 dark:text-white leading-none">
                {colors.label}
              </span>
              <span className="text-[10px] font-medium text-zinc-400 leading-none">
                Current:
              </span>
              <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-200 leading-none mt-0.5">
                {activePoint.value.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente Overview.jsx Pie Chart
export function PerformancePieChart({ score }) {
  const radius = 34;
  const strokeWidth = 4.5;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - ((parseFloat(score) || 0) / 10) * arcLength;

  return (
    <div className="flex justify-center items-center relative w-20 h-20 select-none">
      <svg className="w-full h-full transform rotate-135" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={radius} fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth={strokeWidth} strokeDasharray={`${arcLength} ${circumference - arcLength}`} strokeLinecap="round" />
        <circle cx="45" cy="45" r={radius} fill="none" stroke="#10B981" strokeWidth={strokeWidth} strokeDasharray={`${arcLength} ${circumference - arcLength}`} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold tracking-tight text-zinc-100">{score}</span>
      </div>
    </div>
  );
}