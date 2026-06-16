import React, { useState } from 'react';
import Overview from './Overview';
import Connections from './Connections';
import Automation from './Automation';
import Chats from './Chats';
import Settings from './Settings';
import Sidebar from './Navbar'; 
import MobileDock from '../../components/MobileDock';
import MobileHeader from '../../components/MobileHeader';

export default function Layout() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const navigateTo = (nextTab) => {
  if (nextTab !== activeTab) {
    setHistory(prev => [...prev, activeTab]);
    setActiveTab(nextTab);
  }
};

const navigateBack = () => {
  if (history.length > 0) {
    const previousTab = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setActiveTab(previousTab);
  }
};

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview setActiveTab={setActiveTab} activeTab={activeTab} />;
      case 'connections': return <Connections setActiveTab={setActiveTab} activeTab={activeTab} />;
      case 'automation': return <Automation setActiveTab={setActiveTab} activeTab={activeTab} />;
      case 'chats': return <Chats setActiveTab={setActiveTab} activeTab={activeTab} />;
      case 'settings': return <Settings setActiveTab={setActiveTab} activeTab={activeTab} />;
      default: return <Overview setActiveTab={setActiveTab} activeTab={activeTab} />;
    }
  };

  return (
    // CONTAINER PRINCIPAL: Ocupa 100% da tela
    <div className="w-full min-h-screen bg-[#141923] flex flex-col antialiased font-sans text-white select-none">
      
    <MobileHeader />

      {/* BARRA DE NAVEGAÇÃO SUPERIOR: Alinhada ao topo */}
      <header className="w-full bg-[#141923] border-b border-white/4">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        
      </header>

      {/* ÁREA DE CONTEÚDO DO DASHBOARD: Onde os cards reais da aplicação serão renderizados */}
      <main className="flex-1 w-full p-6 pb-28 md:p-8 md:pb-8 overflow-y-auto bg-[#141923]">
        <div className="max-w-400 mx-auto w-full">
          {renderTabContent()}
        </div>
      </main>

    </div>
  );
}