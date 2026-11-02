// DecisionLab 360 - Dashboard General
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Coffee,
  CalendarCheck,
  Sun,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  Calculator,
  Sliders,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import KPICard from '../../Components/KPICard/KPICard.jsx';
import TrapComparisonChart from '../../Components/Charts/TrapComparisonChart.jsx';
import { formatCurrency, formatPercent, formatRatio } from '../../Services/calculationService.js';
import { runTuesteModel } from '../../Engines/tuesteEngine.js';
import { runAgendoModel } from '../../Engines/agendoEngine.js';
import { runSolDeCasaModel } from '../../Engines/solDeCasaEngine.js';

export default function Dashboard() {
  const navigate = useNavigate();

  const [selectedTrapTab, setSelectedTrapTab] = useState('all');

  const tueste = runTuesteModel();
  const agendo = runAgendoModel();
  const solDeCasa = runSolDeCasaModel();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20 font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
            <span>Auditoría Financiera y Detección de Métricas Trampa</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
            DecisionLab 360
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-6">
            Plataforma integral de inteligencia financiera, modelado unitario y simulación proyectiva para los 3 casos empresariales: <strong>Tueste (DTC)</strong>, <strong>Agendo (SaaS)</strong> y <strong>Sol de Casa (Lead Gen)</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/tableros')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs sm:text-sm text-white shadow-md shadow-blue-600/30 transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>Explorar Tableros Interactivos (Nivel 2)</span>
            </button>
            <button
              onClick={() => navigate('/simuladores')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs sm:text-sm text-slate-200 border border-slate-700 transition-all"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Simuladores de Caja 24M (Nivel 3)</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Global Macro KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Casos Modelados"
          value="3 Negocios"
          subvalue="DTC, SaaS, Lead Gen"
          badgeText="100% Funcional"
          badgeType="success"
          helperText="Tres motores financieros desacoplados con fórmulas de negocio exactas"
        />
        <KPICard
          title="Caja Total Supervisada"
          value={formatCurrency(35000 + 60000 + 12000, 0)}
          subvalue="Capital en Bancos"
          badgeText="Pisos Activos"
          badgeType="info"
          helperText="Tueste ($35k), Agendo ($60k), Sol de Casa ($12k) con pisos de seguridad"
        />
        <KPICard
          title="Gasto Publicitario Base"
          value={formatCurrency(8000 + 10000 + 8000, 0)}
          subvalue="/mes consolidado"
          badgeText="Meta + Google"
          badgeType="neutral"
          helperText="Inversión mensual total bajo auditoría estricta de CAC real y LTV"
        />
        <KPICard
          title="Alertas de Trampa IA"
          value="3 Trampas"
          subvalue="Detectadas y Corregidas"
          badgeText="Crítico"
          badgeType="warning"
          helperText="Métricas infladas: ROAS 3.0x de Meta, CAC $105 de Valeria y CPL $8 de Leadly"
        />
      </div>

      {/* 3 Main Flagship Business Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Los Tres Módulos Empresariales
            </h3>
            <p className="text-xs text-slate-500">
              Selecciona un caso para ingresar a su análisis financiero especializado, calculadoras y simuladores
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Tueste */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                  <Coffee className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono">
                  E-COMMERCE DTC
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                TUESTE
              </h4>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                Café de especialidad en internet (DTC). Decisión de Black Friday: ¿duplicar anuncios a $16k con 30% de descuento?
              </p>

              {/* Metrics preview */}
              <div className="space-y-2 bg-amber-50/40 p-3.5 rounded-xl border border-amber-100 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">ROAS Break-even:</span>
                  <span className="font-bold font-mono text-slate-800">{formatRatio(tueste.roasBreakEvenSingle)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ROAS Real 1er Pedido:</span>
                  <span className="font-bold font-mono text-rose-600">{formatRatio(tueste.roasRealFirstOrder)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CAC Real (con Agencia):</span>
                  <span className="font-bold font-mono text-slate-800">{formatCurrency(tueste.cacReal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ratio LTV : CAC:</span>
                  <span className="font-bold font-mono text-amber-600">{formatRatio(tueste.ltvToCac)}</span>
                </div>
              </div>

              {/* Warning note */}
              <div className="text-[11px] text-amber-950 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>La trampa:</strong> Meta reporta ROAS 3.0 inflando ventas con retargeting. El cliente nuevo da ROAS 0.70x.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Caja inicial: $35,000</span>
              <button
                onClick={() => navigate('/tueste')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 group-hover:translate-x-1 transition-all"
              >
                <span>Ver Caso Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Agendo */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-mono">
                  SOFTWARE SAAS
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                AGENDO
              </h4>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                SaaS de reservas para barberías. Propuesta de Valeria: ¿triplicar inversión publicitaria de $10k a $30k?
              </p>

              {/* Metrics preview */}
              <div className="space-y-2 bg-blue-50/40 p-3.5 rounded-xl border border-blue-100 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">CAC Paid Real:</span>
                  <span className="font-bold font-mono text-rose-600">{formatCurrency(agendo.cacPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CAC Blended (Valeria):</span>
                  <span className="font-bold font-mono text-slate-800">{formatCurrency(agendo.cacBlended)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">LTV Real a 24 Meses:</span>
                  <span className="font-bold font-mono text-slate-800">{formatCurrency(agendo.ltvData.ltvMonthly24m)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ratio LTV : CAC Paid:</span>
                  <span className="font-bold font-mono text-amber-600">{formatRatio(agendo.ltvToCacPaid)}</span>
                </div>
              </div>

              {/* Warning note */}
              <div className="text-[11px] text-blue-950 bg-blue-50 p-2.5 rounded-lg border border-blue-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>La trampa:</strong> Valeria usa CAC Blended ($105) y confunde costo por trial ($20) con cliente pagado.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Caja inicial: $60,000</span>
              <button
                onClick={() => navigate('/agendo')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-900 group-hover:translate-x-1 transition-all"
              >
                <span>Ver Caso Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Sol de Casa */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono">
                  LEAD GENERATION
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                SOL DE CASA
              </h4>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                Paneles solares residenciales. Propuesta de Leadly: ¿mover todo el presupuesto a Meta por su CPL de $8?
              </p>

              {/* Metrics preview */}
              <div className="space-y-2 bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">CPL Meta vs Google:</span>
                  <span className="font-bold font-mono text-slate-800">{formatCurrency(solDeCasa.metaFunnel.cpl)} vs {formatCurrency(solDeCasa.googleFunnel.cpl)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CAC Real Meta vs Google:</span>
                  <span className="font-bold font-mono text-rose-600">{formatCurrency(solDeCasa.cacRealMeta)} vs {formatCurrency(solDeCasa.cacRealGoogle)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valor Visita Google:</span>
                  <span className="font-bold font-mono text-emerald-700">+{formatCurrency(solDeCasa.valueOfVisitGoogle)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Uso Capacidad Visitas:</span>
                  <span className="font-bold font-mono text-slate-800">{formatPercent(solDeCasa.capacityUsagePercent)}</span>
                </div>
              </div>

              {/* Warning note */}
              <div className="text-[11px] text-emerald-950 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>La trampa:</strong> El lead de Meta es $8 pero el cliente cuesta $718 (+34% que Google) y colapsa técnicos.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Caja inicial: $12,000</span>
              <button
                onClick={() => navigate('/sol-de-casa')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 group-hover:translate-x-1 transition-all"
              >
                <span>Ver Caso Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Analysis: The 3 Traps Exposed Side-by-Side */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Auditoría de Trampas Financieras
            </h3>
            <p className="text-xs text-slate-500">
              Comparativa directa entre la ilusión propuesta por agencias/fundadores y el cálculo matemático verificado
            </p>
          </div>

          {/* Trap Case Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setSelectedTrapTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedTrapTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos los Casos
            </button>
            <button
              onClick={() => setSelectedTrapTab('tueste')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedTrapTab === 'tueste'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tueste (DTC)
            </button>
            <button
              onClick={() => setSelectedTrapTab('agendo')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedTrapTab === 'agendo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Agendo (SaaS)
            </button>
            <button
              onClick={() => setSelectedTrapTab('solDeCasa')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedTrapTab === 'solDeCasa'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sol de Casa (Lead Gen)
            </button>
          </div>
        </div>

        {selectedTrapTab === 'all' ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <TrapComparisonChart caseKey="tueste" />
            <TrapComparisonChart caseKey="agendo" />
            <TrapComparisonChart caseKey="solDeCasa" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <TrapComparisonChart caseKey={selectedTrapTab} />
          </div>
        )}
      </div>
    </div>
  );
}
