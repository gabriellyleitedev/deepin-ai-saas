import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';       
import MobileDock from './MobileDock'; 
import Automation from './Automation';
import Overview from './Overview';
import Connections from './Connections';
import Chats from './Chats';

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState('overview'); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      case 'connections':
        return <Connections isDarkMode={isDarkMode} />;
      case 'automation':
        return <Automation isDarkMode={isDarkMode} />;
      case 'chats':
        return <Chats isDarkMode={isDarkMode} />;
      default:
        return (
          <div className="text-zinc-500 text-sm font-medium flex items-center justify-center h-full">
            Aba ativa com erro de nome: "{activeTab}"
          </div>
        );
    }
  };

  return (
    // Fundo externo absoluto (Outer body) ligeiramente mais escuro para destacar o miolo
    <div className="w-full h-screen bg-neutral-900 flex flex-col lg:flex-row text-zinc-300 font-sans overflow-hidden">

      {/* SIDEBAR */}
      <div className="hidden lg:flex h-full shrink-0">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
      </div>

      {/* MIOLO CENTRAL REFINADO */}
      <main 
        style={{ 
          // Ajustado para o tom exato do painel 1: um cinza/preto profundo mas sutil
          backgroundColor: isDarkMode ? '#0d0e12' : '#f8f9fa',
          color: isDarkMode ? '#f4f4f5' : '#18181b',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(24, 24, 27, 0.08)'
        }}
  
        className="flex-1 min-w-0 h-full relative lg:h-[calc(100vh-12px)] rounded-2xl lg:my-1.5 lg:mr-1.5  overflow-y-auto p-4 lg:p-4 pb-24 lg:pb-5 transition-colors duration-300 shadow-2xl"
      >
        {children 
          ? React.Children.map(children, child => 
              React.isValidElement(child) 
                ? React.cloneElement(child, { isDarkMode, toggleTheme }) 
                : child
            )
          : renderTabContent()
        }
      </main>

      {/* MOBILE DOCK */}
      <div className="lg:hidden shrink-0">
        <MobileDock activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

    </div>
  );
}