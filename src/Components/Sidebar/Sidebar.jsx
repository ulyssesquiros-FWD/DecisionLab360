// DecisionLab 360 - Sidebar Component
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Coffee,
  CalendarCheck,
  Sun,
  Calculator,
  Sliders,
  TrendingUp,
  GitCompare,
  Lightbulb,
  FileSpreadsheet,
  Settings,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const mainNav = [
    { name: 'Dashboard General', to: '/', icon: LayoutDashboard },
  ];

  const businessCases = [
    { name: 'Tueste (DTC)', to: '/tueste', icon: Coffee, color: 'text-amber-500', badge: 'E-commerce' },
    { name: 'Agendo (SaaS)', to: '/agendo', icon: CalendarCheck, color: 'text-blue-500', badge: 'Software B2B' },
    { name: 'Sol de Casa (Lead Gen)', to: '/sol-de-casa', icon: Sun, color: 'text-emerald-500', badge: 'Solar' },
  ];

  const analyticsModules = [
    { name: 'Calculadoras (N1)', to: '/calculadoras', icon: Calculator },
    { name: 'Tableros Vivos (N2)', to: '/tableros', icon: Sliders },
    { name: 'Simuladores 24M (N3)', to: '/simuladores', icon: TrendingUp },
    { name: 'Comparador Escenarios', to: '/escenarios', icon: GitCompare },
    { name: 'Recomendaciones', to: '/recomendaciones', icon: Lightbulb },
    { name: 'Reportes y Exportación', to: '/reportes', icon: FileSpreadsheet },
    { name: 'Ajuste de Supuestos', to: '/configuracion', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-18 px-5 border-b border-slate-800/80 bg-slate-950/40">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-white tracking-tight">DecisionLab</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold">360</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Modelado Financiero & SaaS</p>
            </div>
          </NavLink>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Vista Principal
            </div>
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* 3 Business Cases */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Casos Empresariales</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">3 Casos</span>
            </div>
            <div className="space-y-1">
              {businessCases.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-slate-800 text-white border-l-4 border-blue-500 shadow-inner'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                      {item.badge}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Analytical Modules */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Herramientas del Sistema
            </div>
            <div className="space-y-1">
              {analyticsModules.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs text-slate-500">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-slate-400">DecisionLab 360</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">v1.0 Ready</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Plataforma local autónoma. Fórmulas exactas y simulación en vivo.
          </p>
        </div>
      </aside>
    </>
  );
}
