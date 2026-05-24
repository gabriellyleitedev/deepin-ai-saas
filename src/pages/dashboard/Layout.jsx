import React, { useState } from 'react';
import Sidebar from './Sidebar';       
import MobileDock from './MobileDock'; 
import Automation from './Automation';
import Overview from './Overview';
import Connections from './Connections';
import Chats from './Chats';

export default function Layout({ children }) {
  // Inicializa na aba correta
  const [activeTab, setActiveTab] = useState('automation');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'connections':
        return <Connections />;
      case 'automation':
        return <Automation />;
      case 'chats':
        return <Chats />;
      default:
        // Caso ocorra qualquer erro de digitação de ID, esse aviso vai salvar mostrando o nome real
        return (
          <div className="text-zinc-500 text-sm font-medium flex items-center justify-center h-full">
            Aba ativa com erro de nome: "{activeTab}"
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-950 flex flex-col lg:flex-row text-zinc-300 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="hidden lg:flex h-full">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
      </div>

      {/* PAINEL PRINCIPAL */}
      <main className="grow bg-white/80 lg:my-2 lg:mr-2 border border-white/3 rounded-none lg:rounded-3xl overflow-y-auto relative p-6 pb-32 lg:pb-8 transition-all duration-300">
        {children || renderTabContent()}
      </main>

      {/* MOBILE DOCK */}
      <MobileDock activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}