import React, { useState } from 'react';

export function RecentLeadsList() {
  const [filter, setFilter] = useState('');

  const leads = [
    { id: 1, name: 'Marcos Silva', time: 'Há 2 min', status: 'Sucesso', value: 'R$ 250,00' },
    { id: 2, name: 'Ana Beatriz', time: 'Há 5 min', status: 'Sucesso', value: 'R$ 1.200,00' },
    { id: 3, name: 'Carlos Eduardo', time: 'Há 12 min', status: 'Pendente', value: 'R$ 450,00' },
    { id: 4, name: 'Mariana Costa', time: 'Há 20 min', status: 'Sucesso', value: 'R$ 890,00' },
  ];

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    // md:col-span-3 faz com que o container ocupe todas as 3 colunas da sua grid inferior de ponta a ponta
    <div className="md:col-span-3 w-full bg-white/60 border border-white/[0.05] rounded-[24px] p-6 font-sans select-none shadow-2xl flex flex-col gap-4 mt-2">
      
      {/* Topo: Título e Filtro lado a lado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Últimos Leads Captados</span>
          <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse" />
        </div>
        
        {/* Barra de pesquisa compacta na direita */}
        <div className="relative w-full sm:w-64">
          <input 
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar por nome..." 
            className="w-full bg-[#16171D] border border-white/[0.06] text-white placeholder-gray-500 rounded-full py-1.5 pl-3 pr-8 text-[11px] outline-none focus:border-white/20 transition-all"
          />
          <svg className="w-3 h-3 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Lista Disposta na Horizontal (Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#16171D]/40 border border-white/[0.02] hover:bg-[#16171D]/80 transition-all">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-medium text-white tracking-tight truncate max-w-[120px]">{lead.name}</span>
                <span className="text-[9px] text-gray-500">{lead.time}</span>
              </div>
              
              <div className="text-right flex flex-col gap-0.5">
                <span className="text-[12px] font-semibold text-[#a3e635]">{lead.value}</span>
                <span className={`text-[9px] font-medium ${lead.status === 'Sucesso' ? 'text-gray-400' : 'text-amber-500/80'}`}>
                  {lead.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-2 text-[11px] text-gray-600">
            Nenhum lead corresponde à busca.
          </div>
        )}
      </div>

    </div>
  );
}