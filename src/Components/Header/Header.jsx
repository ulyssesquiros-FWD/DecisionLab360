// DecisionLab 360 - Header Component
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, RotateCcw, Download, Sparkles } from 'lucide-react';
import { storageService } from '../../Services/storageService.js';

export default function Header({ onToggleSidebar, onResetAll }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic titles and subtitles based on route
  const getHeaderInfo = (pathname) => {
    switch (pathname) {
      case '/':
        return {
          title: 'Dashboard General Ejecutivo',
          subtitle: 'Visión consolidada y comparativa de los tres casos empresariales',
          badge: 'Nivel Ejecutivo',
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        };
      case '/tueste':
        return {
          title: 'Caso A: Tueste · E-commerce DTC',
          subtitle: 'Café de especialidad, recurrencia, suscripción y economía unitaria real',
          badge: 'Caso DTC',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case '/agendo':
        return {
          title: 'Caso B: Agendo · Software SaaS B2B',
          subtitle: 'SaaS para salones: CAC Paid vs Blended, funnel de trials y retención a 24 meses',
          badge: 'Caso SaaS',
          badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case '/sol-de-casa':
        return {
          title: 'Caso C: Sol de Casa · Lead Generation',
          subtitle: 'Energía solar residencial: CPL vs CAC Real, calidad de leads y capacidad operativa',
          badge: 'Caso Lead Gen',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case '/calculadoras':
        return {
          title: 'Calculadoras Financieras (Nivel 1)',
          subtitle: 'Formularios interactivos, verificación manual paso a paso y auditoría de trampas de IA',
          badge: 'Nivel 1',
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case '/tableros':
        return {
          title: 'Tableros Interactivos en Vivo (Nivel 2)',
          subtitle: 'Controles deslizantes, umbrales de decisión, semáforos y gráficos comparativos',
          badge: 'Nivel 2',
          badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
        };
      case '/simuladores':
        return {
          title: 'Simuladores de Caja a 24 Meses (Nivel 3)',
          subtitle: 'Proyección mensual cohorte por cohorte, verificación del mes 1 y alertas de piso de caja',
          badge: 'Nivel 3',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      case '/escenarios':
        return {
          title: 'Comparador de Escenarios',
          subtitle: 'Análisis matricial de planes: inversión, CAC, LTV, márgenes y caja terminal',
          badge: 'Comparativa 360',
          badgeColor: 'bg-slate-100 text-slate-700 border-slate-300'
        };
      case '/recomendaciones':
        return {
          title: 'Motor de Recomendaciones Estratégicas',
          subtitle: 'Dictamen ejecutivo fundamentado matemáticamente: Escalar, Mantener, Optimizar, Reducir o Pausar',
          badge: 'Auditoría IA',
          badgeColor: 'bg-amber-50 text-amber-800 border-amber-300'
        };
      case '/reportes':
        return {
          title: 'Reportes y Centro de Exportación',
          subtitle: 'Exportación a hojas de cálculo Excel (.xlsx) y generación de reportes ejecutivos PDF',
          badge: 'Export Hub',
          badgeColor: 'bg-teal-50 text-teal-700 border-teal-200'
        };
      case '/configuracion':
        return {
          title: 'Configuración y Ajuste de Supuestos',
          subtitle: 'Control de parámetros globales, almacenamiento LocalStorage y restauración de fábrica',
          badge: 'Config',
          badgeColor: 'bg-slate-100 text-slate-600 border-slate-200'
        };
      default:
        return {
          title: 'DecisionLab 360',
          subtitle: 'Plataforma integral de análisis y simulación financiera',
          badge: 'SaaS',
          badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
        };
    }
  };

  const info = getHeaderInfo(location.pathname);

  const handleResetData = () => {
    if (window.confirm('¿Deseas restaurar todos los supuestos y datos originales del caso? Los cambios locales se restablecerán a los valores del documento.')) {
      storageService.resetAllAssumptions();
      if (onResetAll) onResetAll();
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Left side: hamburger + title info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-none">
              {info.title}
            </h1>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${info.badgeColor} hidden sm:inline-block`}>
              {info.badge}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-1">
            {info.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Global Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/reportes')}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          title="Exportar informes"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar</span>
        </button>

        <button
          onClick={handleResetData}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors shadow-xs"
          title="Restaurar datos originales del caso"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Restaurar Originales</span>
          <span className="sm:hidden">Restaurar</span>
        </button>
      </div>
    </header>
  );
}
