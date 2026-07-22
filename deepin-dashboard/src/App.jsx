import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Imports da área do Dashboard (Ajuste o caminho conforme o nome correto dos seus arquivos)
import DashboardLayout from "./dashboard/Layout";      // O layout que tem a Sidebar/Header
import Overview from "./dashboard/overview";            // Tela de Visão Geral (Cards e Gráficos)
import Chats from "./dashboard/Chats";                  // Tela de Chat
import Connections from "./dashboard/Connections";      // Tela de Conexões/Instâncias
import Automation from "./dashboard/Automation";      // Tela de Automações
import Settings from "./dashboard/Settings";            // Tela de Configurações

export function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white selection:bg-purple-500/30 overflow-x-hidden">
        <Routes>
          {/* Redireciona a raiz do dashboard (localhost:5173/) direto para /app */}
          <Route path="/" element={<Navigate to="/app" replace />} />

          {/* Rota Pai do Dashboard (Aplica o Layout com Sidebar em todas as subrotas) */}
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="chats" element={<Chats />} />
            <Route path="connections" element={<Connections />} />
            <Route path="automations" element={<Automation />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Rota para páginas desconhecidas */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;