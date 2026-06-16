import React, { useState } from 'react';
import { LayoutGrid, MoreHorizontal, ArrowUpRight, CheckSquare, Plus, Briefcase, Search } from 'lucide-react';

export default function InvoicesPixelPerfect() {
  const [activeInvoice, setActiveInvoice] = useState('#427-012');
  const [activeFilter, setActiveFilter] = useState('Unpaid');

  const invoices = [
    { id: '#404-002', date: 'In 2 days', status: 'Unsent', amount: '80,770.00', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: '#426-001', date: 'In 4 days', status: 'Viewed', amount: '27,114.00', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: '#427-012', date: 'In 5 days', status: 'Unsent', amount: '53,154.00', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: '#424-112', date: 'In 16 days', status: 'Viewed', amount: '61,223.00', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: '#417-020', date: 'In 19 days', status: 'Viewed', amount: '7,311.00', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100' },
  ];

  return (
    <div className="w-full p-6 text-white min-h-screen font-sans antialiased flex flex-col items-center justify-center">
      <div className="w-full max-w-280 flex-col">
        
        {/* =========================================================================
            1. BARRA DE FILTROS SUPERIOR (INTEGRADA E PIXEL PERFECT)
            ========================================================================= */}
        <div className="w-full h-14 px-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-gray-400 tracking-wide">Active filters</span>
            <span className="bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90">2</span>
            
            <div className="flex items-center gap-1 ml-3">
              <button className="bg-[#202430] text-[11px] px-3 py-1.5 rounded-xl text-gray-300 flex items-center gap-2 border border-white/2">
                All customers <span className="text-[8px] text-gray-500">▼</span>
              </button>
              <button className="bg-[#202430] text-[11px] px-3 py-1.5 rounded-xl text-gray-300 flex items-center gap-2 border border-white/2">
                All statuses <span className="text-[8px] text-gray-500">▼</span>
              </button>
              <button className="bg-[#202430] text-[11px] px-3 py-1.5 rounded-xl text-gray-300 flex items-center gap-2 border border-white/2">
                November 2023 <span className="text-[10px] opacity-60">📅</span>
              </button>
              <button className="bg-[#202430] text-[11px] px-3 py-1.5 rounded-xl text-gray-300 flex items-center gap-2 border border-white/2">
                December 2023 <span className="text-[10px] opacity-60">📅</span>
              </button>
            </div>
          </div>

          {/* BOTÃO DE SEARCH REFEITO NO LUGAR CERTO */}
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Enter invoice #" 
              className="bg-[#202430] border border-white/1 text-[11px] pl-4 pr-8 py-1.5 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none w-44"
            />
            <Search size={12} className="absolute right-3 text-gray-400" />
          </div>
        </div>

        {/* =========================================================================
            2. LINHA DE TRANSIÇÃO (ONDE A ABA ENCAIXA NA BARRA DE FILTROS)
            ========================================================================= */}
        <div className="w-full flex items-start bg-white relative z-20 h-12 -mt-px">
          {/* Preenchimento esquerdo que dita o início da curva */}
          <div className="w-[36%] bg-white h-full"></div>
          
          {/* A Caixa da Aba que "entra" para dentro da barra escura */}
          <div className="bg-[#141923] h-full flex items-center px-5 rounded-b-3xl relative">
            
            {/* Curva Invertida Esquerda de encaixe */}
            <div className="absolute -left-5 top-0 w-5 h-5 overflow-hidden pointer-events-none">
              <div className="w-10 h-10 rounded-full border-20 border-transparent border-t-white border-r-white"></div>
            </div>

            {/* Curva Invertida Direita de encaixe */}
            <div className="absolute -right-5 top-0 w-5 h-5 overflow-hidden pointer-events-none">
              <div className="w-10 h-10 rounded-full border-20 border-transparent border-t-white border-l-white"></div>
            </div>

            {/* Sub-abas arredondadas */}
            <div className="flex items-center gap-1 bg-[#161920] p-1 rounded-xl border border-white/2">
              {['All invoices', 'Draft 3', 'Unpaid 5'].map((tab) => {
                const isUnpaid = tab.includes('Unpaid');
                const cleanName = tab.split(' ')[0];
                const count = tab.split(' ')[1];
                const isActive = activeFilter === cleanName;

                return (
                  <button
                    key={cleanName}
                    onClick={() => setActiveFilter(cleanName)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all flex items-center gap-1
                      ${isActive 
                        ? isUnpaid 
                          ? 'bg-[#a3ff1a] text-black shadow-sm' 
                          : 'bg-white text-black'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <span>{cleanName}</span>
                    {count && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/10 text-black font-bold' : 'bg-white/5 text-gray-500'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lado Direito da transição com os botões de utilidade ovais */}
          <div className="flex-1 bg-white h-full flex items-center justify-end px-6">
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-full">
              <button className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors rounded-full bg-white shadow-sm">
                <LayoutGrid size={12} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors px-2">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. CONTAINER DO CONTEÚDO PRINCIPAL (MOLDURA BRANCA 
            ========================================================================= */}
        <div className="w-full bg-white rounded-b-3xl p-3 flex gap-3 items-stretch relative z-10">
          
          {/* LISTA DA ESQUERDA */}
          <div className="w-[36%] p-2 flex flex-col justify-between bg-white">
            <div>
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Unpaid Invoices</h2>
              <div className="space-y-1">
                {invoices.map((inv) => {
                  const isSelected = activeInvoice === inv.id;
                  return (
                    <div
                      key={inv.id}
                      onClick={() => setActiveInvoice(inv.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150
                        ${isSelected ? 'bg-[#121418] text-white shadow-lg' : 'bg-transparent text-gray-900 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={inv.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className={`text-xs font-bold tracking-tight ${isSelected ? 'text-white' : 'text-gray-900'}`}>{inv.id}</div>
                          <div className="text-[10px] text-gray-400 font-medium">{inv.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border text-center min-w-13.75
                          ${isSelected ? 'bg-white/10 border-white/10 text-white' : 'bg-gray-100 border-gray-200 text-gray-600'}`}
                        >
                          {inv.status}
                        </span>
                        <span className={`text-xs font-bold tracking-tight ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          <span className="text-[10px] font-normal text-gray-400 mr-0.5">$</span>{inv.amount}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PAINEL ESCURO DE DETALHES DA DIREITA */}
          <div className="flex-1 bg-[#121418] rounded-[20px] p-6 flex flex-col justify-between border border-white/1">
            
            {/* Infos do Topo */}
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-medium text-gray-500 block mb-1 uppercase tracking-wider">Invoice details</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white">#427-012</span>
                    <span className="text-[9px] font-bold bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">Unsent</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-medium text-gray-500 block mb-1 uppercase tracking-wider">Company</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight text-white mt-1">
                    <Briefcase size={14} className="text-gray-400" />
                    <span>BlueRock</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-medium text-gray-500 block mb-1 uppercase tracking-wider">Customer</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" alt="" className="w-7 h-7 rounded-full object-cover" />
                    <div className="text-left leading-none">
                      <span className="text-[11px] font-bold block text-white">Maria Jones</span>
                      <span className="text-[9px] text-gray-500 block mt-0.5">CEO BlueRock Pvt Ltd</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid de Serviços */}
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { label: 'Concept Development', val: '10,630.80' },
                  { label: 'CRM Development', val: '31,892.40' },
                  { label: 'CRM Integration', val: '10,630.80' }
                ].map((item, i) => (
                  <div key={i} className="bg-[#161920] p-4 rounded-xl flex flex-col justify-between h-24 border border-white/1 relative">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-bold tracking-tight text-white">
                        <span className="text-[10px] text-gray-500 font-normal mr-0.5">$</span>{item.val}
                      </span>
                      <ArrowUpRight size={12} className="text-gray-500 absolute top-3 right-3" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium leading-tight">{item.label}</span>
                  </div>
                ))}

                {/* Slot pontilhado */}
                <div className="bg-[#161920] rounded-xl flex items-center justify-center opacity-25 border border-dashed border-gray-600 cursor-pointer hover:opacity-50 transition-opacity">
                  <span className="text-lg font-light text-gray-400">+</span>
                </div>
              </div>
            </div>

            {/* Rodapé de Valores e Ações */}
            <div className="pt-5 mt-6 border-t border-white/4 flex items-center justify-between">
              <div className="flex gap-8">
                <div>
                  <span className="text-[10px] text-gray-500 block font-medium mb-0.5">Sub Total</span>
                  <span className="text-sm font-bold text-white"><span className="text-[10px] text-gray-400 mr-0.5">$</span>53,154.00</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block font-medium mb-0.5">Total</span>
                  <span className="text-sm font-bold text-white"><span className="text-[10px] text-gray-400 mr-0.5">$</span>53,154.00</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block font-medium mb-0.5">Balance Due</span>
                  <span className="text-sm font-bold text-white"><span className="text-[10px] text-gray-400 mr-0.5">$</span>53,154.00</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 bg-[#161920] border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors">
                  <CheckSquare size={14} />
                </button>
                <button className="p-2.5 bg-[#161920] border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors">
                  <Plus size={14} />
                </button>
                <button className="bg-[#a3ff1a] hover:bg-[#92eb13] text-black text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm ml-1">
                  Pay out now
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}