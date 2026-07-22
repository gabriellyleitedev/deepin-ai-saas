import React, { useState } from 'react';

export function RecentLeadsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');

  // Banco de dados simulado com duplicidade para teste de caso de uso (Múltiplas Fernandas)
  const mockLeads = [
    { id: 1, name: 'Fernanda Silva', agent: 'Halle Griffiths', date: '2026-06-30', displayDate: 'Hoje, 14:32', sentiment: 'Positive', type: 'Inbound', value: 'R$ 4.500,00', duration: '02:56', text: 'Olá, gostaria de entender mais sobre o plano enterprise de vocês.' },
    { id: 2, name: 'Marcus Vance', agent: 'Alex Rivera', date: '2026-06-30', displayDate: 'Hoje, 11:15', sentiment: 'Neutral', type: 'Outbound', value: 'R$ 1.200,00', duration: '01:45', text: 'Proposta comercial enviada para análise da diretoria.' },
    { id: 3, name: 'Fernanda Silva', agent: 'Self Service', date: '2026-06-29', displayDate: 'Ontem, 18:10', sentiment: 'Negative', type: 'Inbound', value: 'R$ 0,00', duration: '00:52', text: 'Estou tendo problemas com a integração da API de vocês, preciso de suporte urgente.' },
    { id: 4, name: 'Fernanda Ramos', agent: 'Halle Griffiths', date: '2026-06-15', displayDate: '15 de Junho', sentiment: 'Positive', type: 'WhatsApp', value: 'R$ 8.900,00', duration: '03:10', text: 'Quero fechar o contrato ainda essa semana, como faço o pagamento?' },
  ];

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSentiment = selectedSentiment === 'All' || lead.sentiment === selectedSentiment;
    const matchesDate = selectedDateFilter === 'All' || 
                        (selectedDateFilter === 'Today' && lead.date === '2026-06-30') ||
                        (selectedDateFilter === 'Yesterday' && lead.date === '2026-06-29');

    return matchesSearch && matchesSentiment && matchesDate;
  });

  return (
    <>
      {/* ================= COMPONENTE ANTES DE ABRIR (VISÃO COMPRIMIDA 220PX) ================= */}
      <div className="w-full max-w-[1200px] mx-auto p-5 font-sans select-none bg-white/60 dark:bg-[#1a2333]/40 border border-black/5 dark:border-white/5 rounded-[24px] grid grid-cols-1 lg:grid-cols-12 gap-5 h-[220px] max-h-[220px] overflow-hidden backdrop-blur-md">
        
        {/* Bloco de Texto Esquerdo */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full py-0.5">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">Últimos Leads Captados</h3>
            <p className="text-xs text-gray-500 dark:text-white/40 mt-1 font-light">Métricas de triagem e volumetria recente</p>
          </div>
          <div className="bg-black/[0.03] dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-xl p-3 flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-white/50">Fluxo ativo</span>
            <span className="font-semibold text-[#83c625] bg-[#83c625]/10 px-2 py-0.5 rounded-md border border-[#83c625]/20">
              +{mockLeads.length} registros
            </span>
          </div>
        </div>

        {/* Tabela Comprimida Direita */}
        <div className="lg:col-span-8 relative h-full bg-white dark:bg-[#1c2a38]/60 border border-black/[0.08] dark:border-white/10 rounded-xl p-3 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pb-12 scrollbar-none">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.06] dark:border-white/5 text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-white/30">
                  <th className="pb-2 font-medium">Lead</th>
                  <th className="pb-2 font-medium">Origem</th>
                  <th className="pb-2 font-medium text-right">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/5">
                {mockLeads.slice(0, 3).map((lead) => (
                  <tr key={lead.id} className="text-xs text-gray-700 dark:text-white/90">
                    <td className="py-2.5 font-medium">{lead.name}</td>
                    <td className="py-2.5 text-gray-500 dark:text-white/40 font-light">{lead.type}</td>
                    <td className="py-2.5 text-right text-gray-400 dark:text-white/30 font-light">{lead.displayDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Efeito Fade out para manter harmonia visual */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#192432] to-transparent pointer-events-none z-10" />

          {/* Gatilho para abrir a listagem completa */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-full text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white text-xs font-medium px-5 py-2 rounded-lg border border-black/10 dark:border-white/10 backdrop-blur-md transition-all active:scale-98 shadow-sm"
            >
              Abrir Transcrição e Filtros
            </button>
          </div>
        </div>
      </div>

      {/* ================= TELA EXPANDIDA (ESTILO TABELA DASHBOARD LIMPA) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#f8f9fa] dark:bg-[#141f2b] border border-black/10 dark:border-white/10 rounded-2xl w-full max-w-6xl h-[85vh] flex flex-col text-gray-900 dark:text-white shadow-2xl overflow-hidden">
            
            {/* Header Limpo Sem Emojis */}
            <div className="p-6 border-b border-black/[0.08] dark:border-white/10 flex justify-between items-center bg-white dark:bg-[#172433]">
              <div>
                <h2 className="text-base font-semibold tracking-tight">Central de Auditoria de Leads</h2>
                <p className="text-xs text-gray-500 dark:text-white/40 mt-1 font-light">Gerenciamento completo, cruzamento de dados, filtros por período e análise textual.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-lg bg-black/[0.05] hover:bg-black/[0.08] dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center border border-black/5 dark:border-white/10 text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Corpo Split */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              
              {/* Barra Lateral Esquerda: Inputs e Controles de Filtros */}
              <div className="lg:col-span-3 border-r border-black/[0.08] dark:border-white/10 p-5 bg-white dark:bg-[#111a24] flex flex-col gap-5 overflow-y-auto">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider block mb-2">Buscar Cliente ou Agente</label>
                  <input 
                    type="text" 
                    placeholder="Filtrar por nome..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/[0.02] dark:bg-white/5 placeholder-gray-400 dark:placeholder-white/20 text-gray-900 dark:text-white text-xs rounded-lg py-2 px-3 outline-none border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider block mb-2">Período de Captura</label>
                  <div className="flex flex-col gap-1">
                    {[
                      { key: 'All', label: 'Qualquer data' },
                      { key: 'Today', label: 'Captados hoje' },
                      { key: 'Yesterday', label: 'Captados ontem' }
                    ].map((d) => (
                      <button
                        key={d.key}
                        onClick={() => setSelectedDateFilter(d.key)}
                        className={`text-left text-xs py-2 px-3 rounded-lg transition-all ${
                          selectedDateFilter === d.key 
                            ? 'bg-black/[0.05] dark:bg-white/10 text-gray-900 dark:text-white font-medium border border-black/[0.08] dark:border-white/10 shadow-sm' 
                            : 'text-gray-500 dark:text-white/60 hover:bg-black/[0.02] dark:hover:bg-white/5'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider block mb-2">Sentimento</label>
                  <div className="flex flex-col gap-1">
                    {['All', 'Positive', 'Neutral', 'Negative'].map((sent) => (
                      <button
                        key={sent}
                        onClick={() => setSelectedSentiment(sent)}
                        className={`text-left text-xs py-2 px-3 rounded-lg transition-all ${
                          selectedSentiment === sent 
                            ? 'bg-black/[0.05] dark:bg-white/10 text-gray-900 dark:text-white font-medium border border-black/[0.08] dark:border-white/10 shadow-sm' 
                            : 'text-gray-500 dark:text-white/60 hover:bg-black/[0.02] dark:hover:bg-white/5'
                        }`}
                      >
                        {sent === 'All' ? 'Todos os sentimentos' : sent}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Table Completa Analítica (Estilo Starline) */}
              <div className="lg:col-span-9 p-6 overflow-y-auto bg-white dark:bg-[#141f2b] scrollbar-none">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-white/30">
                    Resultados Encontrados ({filteredLeads.length})
                  </span>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 text-xs text-gray-400 dark:text-white/30 border border-dashed border-black/10 dark:border-white/5 rounded-xl">
                    Nenhum lead corresponde aos filtros selecionados.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                        <tr className="border-b border-black/[0.08] dark:border-white/5 text-[11px] font-medium text-gray-400 dark:text-white/40 tracking-wider">
                          <th className="pb-3 font-medium">Nome do Lead</th>
                          <th className="pb-3 font-medium">Agente Atribuído</th>
                          <th className="pb-3 font-medium">Canal</th>
                          <th className="pb-3 font-medium">Data de Registro</th>
                          <th className="pb-3 font-medium">Valor Contratual</th>
                          <th className="pb-3 font-medium text-right">Análise</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.04] dark:divide-white/5 text-xs text-gray-700 dark:text-white/90">
                        {filteredLeads.map((lead) => (
                          <React.Fragment key={lead.id}>
                            {/* Linha Principal de Dados */}
                            <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                              <td className="py-3.5 font-semibold text-gray-900 dark:text-white">{lead.name}</td>
                              <td className="py-3.5 text-gray-500 dark:text-white/50 font-light">{lead.agent}</td>
                              <td className="py-3.5 text-gray-500 dark:text-white/50 font-light">{lead.type}</td>
                              <td className="py-3.5 text-gray-400 dark:text-white/40 font-light">{lead.displayDate}</td>
                              <td className="py-3.5 font-medium text-gray-900 dark:text-white">{lead.value}</td>
                              <td className="py-3.5 text-right">
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-medium border ${
                                  lead.sentiment === 'Positive' 
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                                    : lead.sentiment === 'Negative' 
                                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' 
                                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                }`}>
                                  {lead.sentiment}
                                </span>
                              </td>
                            </tr>
                            {/* Linha Interna de Transcrição Vinculada Diretamente */}
                            <tr>
                              <td colSpan="6" className="pb-4 pt-1 px-1">
                                <div className="bg-black/[0.02] dark:bg-black/30 rounded-lg p-3 border border-black/[0.05] dark:border-white/5 text-xs text-gray-600 dark:text-white/70 font-light whitespace-normal leading-relaxed">
                                  <span className="text-[10px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider block mb-1">
                                    Trecho Auditado ({lead.duration})
                                  </span>
                                  "{lead.text}"
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}