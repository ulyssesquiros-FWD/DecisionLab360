// DecisionLab 360 - Sidebar Component (V2.0)
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  X,
  Layers,
  FileText,
  Calendar,
  Gift,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  // Secciones colapsables de los 3 casos
  const [openCases, setOpenCases] = useState({
    tueste: true,
    agendo: true,
    solDeCasa: true
  });

  const toggleCase = (key) => {
    setOpenCases((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">V2.0</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Finanzas & Growth 360</p>
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
          
          {/* Vista Principal */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Vistas Principales
            </div>
            <NavLink
              to="/"
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard General</span>
            </NavLink>
          </div>

          {/* Growth Center Global (Sesión 2) */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>Growth Center (Global)</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">Sesión 2</span>
            </div>
            <div className="space-y-1">
              <NavLink
                to="/growth"
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Loops de Adquisición</span>
              </NavLink>

              <NavLink
                to="/growth/fichas"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Fichas de Growth (1 Pág)</span>
              </NavLink>

              <NavLink
                to="/growth/canales"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Matriz de Canales 90 Días</span>
              </NavLink>
            </div>
          </div>

          {/* 3 Casos Empresariales con Sesión 1 y Sesión 2 */}
          <div className="space-y-3">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Casos Empresariales</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">3 Empresas</span>
            </div>

            {/* CASO A: TUESTE */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/20">
              <button
                onClick={() => toggleCase('tueste')}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-800/40 hover:bg-slate-800/80 text-xs font-bold text-amber-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-500" />
                  <span>Tueste (DTC)</span>
                </div>
                {openCases.tueste ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openCases.tueste && (
                <div className="p-1 space-y-0.5 text-xs bg-slate-900/60">
                  <NavLink
                    to="/tueste"
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-amber-600/30 text-amber-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <span>• S1: Análisis Financiero</span>
                  </NavLink>
                  <NavLink
                    to="/tueste/growth"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-amber-600/30 text-amber-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <Gift className="w-3 h-3 text-amber-400" />
                    <span>S2: Tueste Rewards</span>
                  </NavLink>
                  <NavLink
                    to="/tueste/mi-programa"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1 text-[11px] text-slate-500 hover:text-amber-300 pl-6"
                  >
                    <span>↳ App Móvil Cliente</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* CASO B: AGENDO */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/20">
              <button
                onClick={() => toggleCase('agendo')}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-800/40 hover:bg-slate-800/80 text-xs font-bold text-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-blue-500" />
                  <span>Agendo (SaaS)</span>
                </div>
                {openCases.agendo ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openCases.agendo && (
                <div className="p-1 space-y-0.5 text-xs bg-slate-900/60">
                  <NavLink
                    to="/agendo"
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-600/30 text-blue-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <span>• S1: Análisis Financiero</span>
                  </NavLink>
                  <NavLink
                    to="/agendo/growth"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-600/30 text-blue-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <Zap className="w-3 h-3 text-blue-400" />
                    <span>S2: Agendo QuickStart</span>
                  </NavLink>
                  <NavLink
                    to="/agendo/quickstart"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1 text-[11px] text-slate-500 hover:text-blue-300 pl-6"
                  >
                    <span>↳ Onboarding Móvil &lt;5m</span>
                  </NavLink>
                  <NavLink
                    to="/agendo/reservar/barberia-el-galan"
                    target="_blank"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1 text-[11px] text-slate-500 hover:text-blue-300 pl-6"
                  >
                    <span>↳ Página de Reservas</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* CASO C: SOL DE CASA */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/20">
              <button
                onClick={() => toggleCase('solDeCasa')}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-800/40 hover:bg-slate-800/80 text-xs font-bold text-emerald-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-emerald-500" />
                  <span>Sol de Casa (Solar)</span>
                </div>
                {openCases.solDeCasa ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {openCases.solDeCasa && (
                <div className="p-1 space-y-0.5 text-xs bg-slate-900/60">
                  <NavLink
                    to="/sol-de-casa"
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-emerald-600/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <span>• S1: Análisis Financiero</span>
                  </NavLink>
                  <NavLink
                    to="/sol-de-casa/growth"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-emerald-600/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`
                    }
                  >
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>S2: Comunidad Solar</span>
                  </NavLink>
                  <NavLink
                    to="/sol-de-casa/familia/SOL-FAMILIA-MORA-9A"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1 text-[11px] text-slate-500 hover:text-emerald-300 pl-6"
                  >
                    <span>↳ Portal Familiar</span>
                  </NavLink>
                  <NavLink
                    to="/sol-de-casa/ahorro/SOL-FAMILIA-MORA-9A"
                    target="_blank"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1 text-[11px] text-slate-500 hover:text-emerald-300 pl-6"
                  >
                    <span>↳ Landing Vecino & Calc</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Analytical Modules Sesión 1 */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Herramientas del Sistema
            </div>
            <div className="space-y-1">
              {[
                { name: 'Calculadoras (N1)', to: '/calculadoras', icon: Calculator },
                { name: 'Tableros Vivos (N2)', to: '/tableros', icon: Sliders },
                { name: 'Simuladores 24M (N3)', to: '/simuladores', icon: TrendingUp },
                { name: 'Comparador Escenarios', to: '/escenarios', icon: GitCompare },
                { name: 'Recomendaciones', to: '/recomendaciones', icon: Lightbulb },
                { name: 'Reportes y Exportación', to: '/reportes', icon: FileSpreadsheet },
                { name: 'Ajuste de Supuestos', to: '/configuracion', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
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
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">v2.0 Ready</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Plataforma Integral Sesión 1 + Sesión 2. Fórmulas exactas y loops de Growth.
          </p>
        </div>
      </aside>
    </>
  );
}
