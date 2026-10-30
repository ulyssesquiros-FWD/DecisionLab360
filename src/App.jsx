// DecisionLab 360 - Main App Component
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Header from './Components/Header/Header.jsx';
import AppRoutes from './Routes/AppRoutes.jsx';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AppRoutes />
        </main>

        {/* SaaS Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="font-bold text-slate-700">DecisionLab 360</span> · Plataforma Integral de Análisis Financiero y Simulación Empresarial
            </div>
            <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
              <span>Tueste (DTC)</span>
              <span>•</span>
              <span>Agendo (SaaS)</span>
              <span>•</span>
              <span>Sol de Casa (Lead Gen)</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
