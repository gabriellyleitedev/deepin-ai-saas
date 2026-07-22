import React from 'react';

export function MiniChartCard({ apiData }) {
  const defaultData = [
    { id: 1, ageGroup: '30-45', labelAge: 'age', saleValue: '12,233', growthValue: '6%' },
    { id: 2, ageGroup: '12-21', labelAge: 'age', saleValue: '33,337', growthValue: '9%' },
  ];

  const chartData = apiData || defaultData;

  return (
    <div className="w-full font-sans select-none text-left px-2 ">
      
      {/* 1. Títulos do Topo e Colunas Alinhadas */}
      <div className="grid grid-cols-2 gap-4 h-52 items-end">
        
        {/* COLUNA 1 (30-45 age) */}
        <div className="flex flex-col h-full justify-between">
          {/* Título da Coluna 1 */}
          <div className="pl-1">
            <span className="text-3xl font-medium text-[#2D3134]">{chartData[0]?.ageGroup}</span>
            <span className="text-xs text-[#8A9095] ml-1">{chartData[0]?.labelAge}</span>
          </div>

          {/* Gráfico da Coluna 1 (Lado a Lado de forma limpa) */}
          <div className="flex items-end gap-2 h-47">
            {/* Barra Verde */}
            <div className="w-[35%] bg-[#a3e635]  rounded-xl h-[75%] flex flex-col justify-between p-3 shadow-sm">
              <span className="text-xs font-medium text-black">{chartData[0]?.saleValue}</span>
              <span className="text-[11px] text-[#617315] font-medium tracking-wider">sale</span>
            </div>
            {/* Badge de Growth */}
            <div className="w-[35%] bg-[#EAEBED]/60 backdrop-blur-md rounded-xl h-[45%] flex flex-col justify-center p-4.5">
              <span className="text-xs font-medium text-[#1C1F22]">{chartData[0]?.growthValue}</span>
              <span className="text-[8px] text-[#8A9095] font-semibold mt-0.5">Growth</span>
            </div>
          </div>
        </div>

        {/* COLUNA 2 (12-21 age) */}
        <div className="flex flex-col h-full justify-between">
          {/* Título da Coluna 2 */}
          <div className="pl-1">
            <span className="text-3xl font-medium text-[#2D3134]">{chartData[1]?.ageGroup}</span>
            <span className="text-xs text-[#8A9095] ml-1">{chartData[1]?.labelAge}</span>
          </div>

          {/* Gráfico da Coluna 2 */}
          <div className="flex items-end gap-2 h-32">
            {/* Barra Verde */}
            <div className="w-[35%] bg-[#a3e635] rounded-xl h-[95%] flex flex-col justify-between p-3 shadow-sm">
              <span className="text-xs font-bold text-[#1C1F22]">{chartData[1]?.saleValue}</span>
              <span className="text-[9px] text-[#617315] font-bold uppercase tracking-wider">sale</span>
            </div>
            {/* Badge de Growth */}
            <div className="w-[35%] bg-[#EAEBED]/60 backdrop-blur-md rounded-xl h-[60%] flex flex-col justify-center p-2.5">
              <span className="text-xs font-bold text-[#1C1F22]">{chartData[1]?.growthValue}</span>
              <span className="text-[8px] text-[#8A9095] font-semibold mt-0.5">Growth</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MiniChartCard;