import React, { useState } from "react";
import Index from "./Index";
import Automation from "./Automation";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("overview"); 

  return (
    <div className="flex h-screen w-screen bg-[#09090b] text-white font-base overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0c0c0e] border-r border-zinc-800 flex flex-col justify-between">
        <div>
            <h2 className="text-2xl font-bold mb-8">SIDEBAR IN CONSTRUCTION</h2>
        </div>

        {/* Footer da Sidebar */}
        <div className="border-t border-zinc-800 pt-4 px-2 text-xs text-zinc-500">
          © 2026 Deepin AI.
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "overview" && <Index />}
        {activeTab === "automation" && <Automation />}
      </main>
    </div>
  );
}