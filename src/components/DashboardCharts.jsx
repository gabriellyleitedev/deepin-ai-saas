import React from 'react';

// --- CORREÇÃO AQUI: Nome da função restaurado ---
const computeMonotonePath = (points) => {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const n = points.length;
  const dx = [];
  const dy = [];
  const ms = [];

  for (let i = 0; i < n - 1; i++) {
    dx[i] = points[i + 1].x - points[i].x;
    dy[i] = points[i + 1].y - points[i].y;
    ms[i] = dy[i] / (dx[i] || 1);
  }

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

    path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }
  return path;
};

// --- COMPONENTE DO GRÁFICO DE ÁREA ---
export function MiniAreaChart({ primaryPoints, secondaryPoints, gradientId, variant = 'blue' }) {
  const width = 260;
  const height = 55;
  const paddingY = 12;

  const colorSchemes = {
    blue: {
      stroke: "rgba(148, 163, 184, 0.7)", 
      area: "#64748b",
      dotFill: "#cbd5e1"
    },
    yellow: {
      stroke: "rgba(175, 179, 155, 0.65)", 
      area: "#9a9e87",
      dotFill: "#e2e4d8"
    },
    green: {
      stroke: "rgba(143, 163, 155, 0.65)", 
      area: "#738780",
      dotFill: "#d8e2de"
    }
  };

  const colors = colorSchemes[variant] || colorSchemes.blue;

  const maxVal = Math.max(...primaryPoints, ...secondaryPoints);
  const minVal = Math.min(...primaryPoints, ...secondaryPoints);
  const range = maxVal - minVal || 1;

  const getCoordinates = (points) => points.map((val, index) => ({
    x: (index / (points.length - 1)) * width,
    y: height - ((val - minVal) / range) * (height - paddingY * 2) - paddingY
  }));

  const pCoords = getCoordinates(primaryPoints);
  const sCoords = getCoordinates(secondaryPoints);

  const primaryLinePath = computeMonotonePath(pCoords);
  const secondaryLinePath = computeMonotonePath(sCoords);
  
  const areaPath = `${primaryLinePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="w-full h-14 my-2 relative overflow-visible select-none">
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`fumet-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.area} stopOpacity="0.12" />
            <stop offset="40%" stopColor={colors.area} stopOpacity="0.04" />
            <stop offset="100%" stopColor={colors.area} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        <path d={areaPath} fill={`url(#fumet-${gradientId})`} />
        <path d={secondaryLinePath} fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.2" />
        <path d={primaryLinePath} fill="none" stroke={colors.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {sCoords.map((pt, idx) => (idx % 2 === 0) && (
          <circle key={`s-dot-${idx}`} cx={pt.x} cy={pt.y} r="1.2" fill="#475569" opacity="0.25" />
        ))}

        {pCoords.map((pt, idx) => (idx % 2 === 0) && (
          <circle key={`p-dot-${idx}`} cx={pt.x} cy={pt.y} r="2.2" fill={colors.dotFill} fillOpacity="0.85" stroke="#131316" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}

// --- ADICIONADO: Componente que o seu Overview.jsx estava pedindo ---
export function PerformancePieChart({ score }) {
  const radius = 34;
  const strokeWidth = 4.5;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - ((parseFloat(score) || 0) / 10) * arcLength;

  return (
    <div className="flex justify-center items-center relative w-20 h-20 select-none">
      <svg className="w-full h-full transform rotate-[135deg]" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={radius} fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth={strokeWidth} strokeDasharray={`${arcLength} ${circumference - arcLength}`} strokeLinecap="round" />
        <circle cx="45" cy="45" r={radius} fill="none" stroke="#93c5fd" strokeWidth={strokeWidth} strokeDasharray={`${arcLength} ${circumference - arcLength}`} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold tracking-tight text-zinc-100">{score}</span>
      </div>
    </div>
  );
}