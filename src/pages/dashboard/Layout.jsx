import React, { useState } from 'react';
import { Home, Zap, MessageSquare, Mic, Settings as SettingsIcon } from 'lucide-react'; // Ícones necessários para os navItems funcionarem
import Overview from './overview/Index';
import Connections from './Connections';
import Automation from './Automation';
import Chats from './Chats';
import Settings from './Settings';
import Navbar from './Navbar';

// Ajustado para a nova pasta local dentro do dashboard
import MobileDock from './components/MobileDock';
import MobileHeader from './components/MobileHeader';

// Lista criada externamente apenas para alimentar o map do MobileDock e sumir com o erro do console
const navItems = [
  { name: 'Visão Geral', value: 'overview', icon: <Home size={18} strokeWidth={2} /> },
  { name: 'Automação', value: 'automation', icon: <Zap size={18} strokeWidth={2} /> },
  { name: 'Conversas', value: 'chats', icon: <MessageSquare size={18} strokeWidth={2} /> },
  { name: 'Conexões', value: 'connections', icon: <Mic size={18} strokeWidth={2} /> },
  { name: 'Configurações', value: 'settings', icon: <SettingsIcon size={18} strokeWidth={2} /> },
];

export default function Layout() {
  const [activeTab, setActiveTab] = useState('overview');
  // Criado o estado de histórico que estava faltando e quebrando o app
  const [history, setHistory] = useState([]); // Estado que guarda uma lista (array) de strings. Cada vez que o usuário navega para outra aba, essa lista recebe o nome da aba atual. É "salvo"

  const handleTabChange = (tabName) => {
    if (tabName !== activeTab) {
      setHistory(prev => [...prev, activeTab]); // Pegou a aba atual e jogou no histórico.
      setActiveTab(tabName); // Mudou para a nova aba
    }
  };

  const navigateBack = () => {
    if (history.length > 0) {
      const previousTab = history[history.length - 1]; // Pega a última página salva 
      setHistory(prev => prev.slice(0, -1)); // Remove ela do histórico 
      setActiveTab(previousTab); // Força o app a voltar para ela
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview setActiveTab={handleTabChange} activeTab={activeTab} navigateBack={navigateBack} />;
      case 'connections': return <Connections setActiveTab={handleTabChange} activeTab={activeTab} navigateBack={navigateBack} />;
      case 'automation': return <Automation setActiveTab={handleTabChange} activeTab={activeTab} navigateBack={navigateBack} />;
      case 'chats': return <Chats setActiveTab={handleTabChange} activeTab={activeTab} navigateBack={navigateBack} />;
      case 'settings': return <Settings setActiveTab={handleTabChange} activeTab={activeTab} navigateBack={navigateBack} />;
      default: return <Overview setActiveTab={handleTabChange} activeTab={activeTab} navigateBack={navigateBack} />;
    }
  };

  return (
    // CONTAINER PRINCIPAL: Ocupa 100% da tela
    <div className="w-full min-h-screen bg-black flex flex-col antialiased font-sans text-white select-none relative">

      {/* Header visível apenas no mobile */}
      <MobileHeader activeTab={activeTab} navigateBack={navigateBack} canGoBack={history.length > 0} />

      {/* BARRA DE NAVEGAÇÃO SUPERIOR: Desktop */}
      <header className="w-full bg-black border-b border-white/10 hidden md:block">
        <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      </header>

      {/* ÁREA DE CONTEÚDO DO DASHBOARD */}
      <main className="flex-1 w-full overflow-y-auto bg-black">
        {renderTabContent()}
      </main>

      {/* Menu inferior grudado na tela para navegação mobile */}
      <MobileDock navItems={navItems} activeTab={activeTab} setActiveTab={handleTabChange} />

    </div>
  );
}