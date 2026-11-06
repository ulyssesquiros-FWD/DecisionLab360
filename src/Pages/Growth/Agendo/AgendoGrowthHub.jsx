// DecisionLab 360 - Hub Central de Growth: Agendo QuickStart (Sesión 2)
// Panel Integral para Valeria Ortiz: Diagnóstico, Onboarding Móvil, Admin, Gráficos, Conexión Financiera y Experimento

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  TrendingUp,
  AlertTriangle,
  Zap,
  Users,
  CheckCircle2,
  Sliders,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Target,
  BarChart3,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  Flame,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';

import KPICard from '../../../Components/KPICard/KPICard.jsx';
import MetricIndicator from '../../../Components/MetricIndicator/MetricIndicator.jsx';
import ChannelMatrix90Days from '../../../Components/Growth/ChannelMatrix90Days.jsx';

import { growthData } from '../../../Data/growthData.js';
import { evaluateAgendoQuickStart } from '../../../Engines/growthEngines.js';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import { formatCurrency, formatPercent, formatNumber, formatRatio } from '../../../Services/calculationService.js';

export default function AgendoGrowthHub() {
  const [agendoState, setAgendoState] = useState(growthStorageService.getAgendoState());
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'funnel', 'financial', 'cycle', 'experiment', 'matrix'
  const [simulatedShareRate, setSimulatedShareRate] = useState(65); // 65% en QuickStart
  const [simulatedHabitualRate, setSimulatedHabitualRate] = useState(60);

  const evalModel = evaluateAgendoQuickStart({
    shareDay1Rate: simulatedShareRate / 100,
    habitualUseFromBookingsRate: simulatedHabitualRate / 100
  });

  const handleReset = () => {
    const freshState = growthStorageService.resetAgendoState();
    setAgendoState(freshState);
  };

  // Datos para gráficos de Valeria
  const funnelComparisonData = [
    { pantalla: '1. Fiscales / Bienvenida', tradicional: 74, quickstart: 98, tiempoTrad: 4, tiempoQS: 0.5 },
    { pantalla: '2. Datos Negocio', tradicional: 70, quickstart: 96, tiempoTrad: 3, tiempoQS: 1.0 },
    { pantalla: '3. Servicios (Cortes)', tradicional: 65, quickstart: 94, tiempoTrad: 12, tiempoQS: 1.5 },
    { pantalla: '4. Horarios', tradicional: 62, quickstart: 92, tiempoTrad: 9, tiempoQS: 1.0 },
    { pantalla: '5. Compartir Día 1', tradicional: 30, quickstart: 65, tiempoTrad: 0, tiempoQS: 0.5 },
    { pantalla: '6. Primera Reserva', tradicional: 38, quickstart: 76, tiempoTrad: 0, tiempoQS: 0 },
    { pantalla: '7. Uso Habitual (20+)', tradicional: 22, quickstart: 39, tiempoTrad: 0, tiempoQS: 0 }
  ];

  const segmentedPaidConversionData = evalModel.segments.map((seg, idx) => ({
    name: seg.name,
    trials: seg.count,
    paid: Number(seg.paid.toFixed(2)),
    rate: seg.conv,
    fill: ['#94a3b8', '#38bdf8', '#3b82f6', '#10b981'][idx]
  }));

  const retentionComparisonData = [
    { segmento: 'Uso Habitual (≥20 citas)', retencion6m: 80, fill: '#10b981' },
    { segmento: 'Demás clientes pagados', retencion6m: 35, fill: '#f59e0b' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner Agendo Growth */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-blue-900/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <CalendarCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 font-mono">
              Sesión 2 · Solución de Growth
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-100 border border-blue-300/30 font-bold">
              [SIMULADO]
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Agendo QuickStart: Onboarding & Activación
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl mt-1 leading-relaxed">
            Reducir el tiempo de puesta en marcha a menos de 5 minutos desde el celular, llevar al barbero a su primera reserva y activar el loop de la insignia.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/agendo/quickstart"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-98"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Probar Onboarding QuickStart</span>
          </Link>
          <Link
            to="/agendo/reservar/barberia-el-galan"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Página de Reservas</span>
          </Link>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition-colors"
            title="Reiniciar datos simulados de Agendo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'dashboard', label: 'Panel Activación Valeria', icon: BarChart3 },
          { id: 'funnel', label: 'Diagnóstico Onboarding Tradicional', icon: Clock },
          { id: 'financial', label: 'Impacto Financiero en CAC & LTV', icon: TrendingUp },
          { id: 'cycle', label: 'Ciclo Viral de la Insignia', icon: Layers },
          { id: 'experiment', label: 'Experimento QuickStart A/B', icon: Target },
          { id: 'matrix', label: 'Plan y Matriz 90 Días', icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PANEL ADMINISTRATIVO DE VALERIA */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Main KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Negocios en Uso Habitual"
              value={formatNumber(evalModel.habitualUse * 5)}
              subvalue="≥ 20 citas en 14 días"
              badgeText="Aha Logrado"
              badgeType="success"
              helperText="El 39% de los trials alcanza uso habitual con QuickStart (vs 22% tradicional)"
            />
            <KPICard
              title="Tasa de Conversión a Pago"
              value={formatPercent(evalModel.effectivePaidConversionRate)}
              subvalue="Baseline: 14.0%"
              badgeText={`+${(evalModel.effectivePaidConversionRate - 13.88).toFixed(1)}% Mejora`}
              badgeType="success"
              helperText="Conversión efectiva escalada sobre los 500 trials de pauta mensual"
            />
            <KPICard
              title="CAC Paid Rediseñado"
              value={formatCurrency(evalModel.cacPaidReal)}
              subvalue={`Anterior: $180.00`}
              badgeText="Eficiencia"
              badgeType="success"
              helperText="($10,000 pauta + sueldo Mariela $1,200 + comisiones) ÷ clientes pagados"
            />
            <KPICard
              title="Retención a 6 Meses"
              value={formatPercent(evalModel.blendedRetention6m)}
              subvalue="Uso Habitual 80% / Otros 35%"
              badgeText="LTV Saludable"
              badgeType="info"
              helperText="Ponderación de clientes activos a 6 meses según su activación en el trial"
            />
          </div>

          {/* Secondary Activation Operational Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Trials Iniciados</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">500</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">QuickStart Completado</span>
              <span className="text-base font-extrabold text-blue-600 font-mono">92%</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Compartieron 24h</span>
              <span className="text-base font-extrabold text-emerald-600 font-mono">{simulatedShareRate}%</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">1ra Reserva</span>
              <span className="text-base font-extrabold text-indigo-600 font-mono">{evalModel.totalWithBooking}%</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Registros Insignia</span>
              <span className="text-base font-extrabold text-purple-600 font-mono">28 / mes</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Soporte Horarios</span>
              <span className="text-base font-extrabold text-emerald-600 font-mono">4 chats/sem</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Funnel de Onboarding y Activación (Tradicional vs QuickStart) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Embudo de Activación: Tradicional vs QuickStart
                  </h4>
                  <p className="text-[11px] text-slate-500">Supervivencia por cada 100 trials iniciados</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Por 100 Trials
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelComparisonData} margin={{ left: -10, right: 10, top: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="pantalla" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tradicional" name="Tradicional (28 min)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="quickstart" name="QuickStart (<5 min)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Conversión a Pago por Segmento Disyuntivo (Sin Doble Conteo) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Conversión a Pago por Segmento de Activación
                  </h4>
                  <p className="text-[11px] text-slate-500">Sin duplicar usuarios: la clave está en llevarlos a uso habitual</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  Segmentación Pura
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={segmentedPaidConversionData} layout="vertical" margin={{ left: 30, right: 30, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" unit=" pagados" />
                    <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 9 }} />
                    <Tooltip formatter={(val, name, props) => [`${val} clientes pagados (${props.payload.rate}% conv)`, props.payload.name]} />
                    <Bar dataKey="paid" radius={[0, 6, 6, 0]}>
                      {segmentedPaidConversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Real-Time Bookings Recorded in Barbería El Galán */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Citas Reservadas en Barbería El Galán (Página Pública)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Comprueba cómo los clientes reservan directamente sin duplicar horarios
                </p>
              </div>
              <Link
                to="/agendo/reservar/barberia-el-galan"
                target="_blank"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
              >
                Abrir página pública de reserva →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-semibold">
                    <th className="p-2">ID Reserva</th>
                    <th className="p-2">Cliente</th>
                    <th className="p-2">Teléfono</th>
                    <th className="p-2">Servicio</th>
                    <th className="p-2">Barbero</th>
                    <th className="p-2">Fecha y Hora</th>
                    <th className="p-2 text-right">Precio</th>
                    <th className="p-2">Origen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {agendoState.bookings.map((book) => (
                    <tr key={book.id} className="hover:bg-blue-50/40">
                      <td className="p-2 font-mono font-bold text-slate-800">{book.id}</td>
                      <td className="p-2 font-semibold text-slate-900">{book.clientName}</td>
                      <td className="p-2 text-slate-600 font-mono">{book.clientPhone}</td>
                      <td className="p-2 text-slate-800">{book.serviceName}</td>
                      <td className="p-2 text-blue-800">{book.barberName}</td>
                      <td className="p-2 font-mono font-semibold text-slate-900">{book.date} · {book.time}</td>
                      <td className="p-2 text-right font-mono font-bold text-slate-900">{formatCurrency(book.price)}</td>
                      <td className="p-2 text-[11px] text-slate-500">{book.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIAGNÓSTICO ONBOARDING TRADICIONAL */}
      {activeTab === 'funnel' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 font-mono">
              Fricción y Cuellos de Botella Detectados
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              ¿En qué paso se pierde más gente y en cuál se va más tiempo?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Datos auditados de las 4 pantallas tradicionales antes de tener lista la página de reservas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" />
                Pantalla 1: Fuga Crítica de Usuarios (-26% Abandono)
              </div>
              <p className="text-sm font-extrabold text-rose-950">
                Cédula jurídica, razón social y régimen fiscal obligatorio
              </p>
              <p className="text-xs text-rose-900 leading-relaxed">
                El 81% de los barberos se registra desde su teléfono móvil. Exigir información tributaria antes de que hayan visto el valor de la plataforma causa la pérdida inmediata de 26 de cada 100 barberos. Los datos fiscales solo son requeridos para facturar tras finalizar los 14 días.
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase">
                <Clock className="w-4 h-4" />
                Pantallas 3 y 4: Consumo Desmedido de Tiempo (21 minutos)
              </div>
              <p className="text-sm font-extrabold text-amber-950">
                Carga manual de 9 servicios (12 min) y horarios complejos (9 min)
              </p>
              <p className="text-xs text-amber-900 leading-relaxed">
                Obligar al usuario a cargar servicio por servicio con nombre, precio y duración genera fricción extrema. Además, Mariela recibe 40 chats por semana de barberos frustrados que no entienden cómo fijar horarios.
              </p>
            </div>
          </div>

          {/* Tabla de Fricción Pantalla a Pantalla */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b">
                  <th className="p-3">Pantalla Tradicional</th>
                  <th className="p-3 text-right">Llegan</th>
                  <th className="p-3 text-right">Terminan</th>
                  <th className="p-3 text-right">Tiempo Promedio</th>
                  <th className="p-3">Fricción Identificada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {growthData.agendo.baselineOnboardingFunnel.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{row.screen}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{row.arrived}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">{row.completed}</td>
                    <td className="p-3 text-right font-mono font-bold text-amber-700">{row.avgTimeMinutes} min</td>
                    <td className="p-3 text-slate-500">{row.friction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: IMPACTO FINANCIERO DINÁMICO */}
      {activeTab === 'financial' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              Sensibilidad y Modelado Económico
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Impacto de Agendo QuickStart sobre el Motor Financiero
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Conexión directa entre la activación de barberías y el CAC Paid, CAC Blended y LTV:CAC de la Sesión 1
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Tasa de Barberías que Comparten en 24h:</span>
                <span className="font-mono text-blue-600 font-bold">{simulatedShareRate}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="5"
                value={simulatedShareRate}
                onChange={(e) => setSimulatedShareRate(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>30% (Tradicional)</span>
                <span>65% (QuickStart)</span>
                <span>90% (Óptimo)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Proporción que llega a Uso Habitual (≥20 citas):</span>
                <span className="font-mono text-emerald-600 font-bold">{simulatedHabitualRate}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={simulatedHabitualRate}
                onChange={(e) => setSimulatedHabitualRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>35% (Bajo)</span>
                <span>60% (Esperado)</span>
                <span>80% (Máximo)</span>
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border bg-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Clientes Pagados Ads</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                {evalModel.scaledPaidFromAds}
              </span>
              <span className="text-[11px] text-slate-500 block">Anterior: 70 clientes (14%)</span>
            </div>

            <div className="p-4 rounded-xl border bg-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">CAC Paid Real</span>
              <span className="text-2xl font-extrabold text-blue-700 font-mono">
                {formatCurrency(evalModel.cacPaidReal)}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                Baja de $180.00 (-{Math.round(((180 - evalModel.cacPaidReal) / 180) * 100)}%)
              </span>
            </div>

            <div className="p-4 rounded-xl border bg-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">CAC Blended</span>
              <span className="text-2xl font-extrabold text-indigo-700 font-mono">
                {formatCurrency(evalModel.cacBlended)}
              </span>
              <span className="text-[11px] text-slate-500 block">Con 50 orgánicos mensuales</span>
            </div>

            <div className="p-4 rounded-xl border bg-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Ratio LTV : CAC Paid</span>
              <span className="text-2xl font-extrabold text-emerald-700 font-mono">
                {formatRatio(evalModel.ltvToCacPaid)}
              </span>
              <span className="text-[11px] text-slate-500 block">Sube de 1.40x a {formatRatio(evalModel.ltvToCacPaid)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CICLO VIRAL DE LA INSIGNIA */}
      {activeTab === 'cycle' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              Bucle Viral de Adquisición
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Ciclo de la Insignia «Reservado con Agendo»
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cómo cada barbería activa se convierte en una vitrina gratuita que atrae a colegas y nuevos negocios
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {growthData.agendo.growthCycle.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-2xl border border-blue-200/80 bg-gradient-to-b from-blue-50/50 to-white space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {step.actor}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm pt-1">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Impact of the Viral Badge */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs leading-relaxed">
            <span className="font-bold text-blue-400 block uppercase tracking-wider">
              ¿Por qué la insignia es un multiplicador silencioso?
            </span>
            <p className="text-slate-300">
              Cada barbería recibe un promedio de <strong>250 visitas al mes</strong> de clientes finales que agendan cortes. Muchos de estos clientes son dueños de negocios, barberos que trabajan en otros salones o profesionales independientes. La insignia anterior solo decía el nombre; la nueva insignia invita con un clic a <em>«Crea tu página de reservas gratis»</em>, convirtiendo 250 visitas en una fuente de 28 a 35 barberías nuevas mensuales a costo cero.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: EXPERIMENTO A/B AGENDO QUICKSTART */}
      {activeTab === 'experiment' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              Validación Experimental
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Experimento A/B: Onboarding Tradicional vs QuickStart Móvil
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Prueba controlada sobre 500 trials para validar la hipótesis de activación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hipótesis:</label>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  {growthData.agendo.defaultExperiment.hypothesis}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Grupo de Control vs Tratamiento:</label>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  <strong>Control (50%):</strong> Onboarding anterior de 4 pantallas pidiendo datos fiscales y carga manual.<br />
                  <strong>Tratamiento (50%):</strong> Agendo QuickStart de 8 pantallas móviles con plantillas y WhatsApp 1-tap.
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-200/80">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Métrica Principal:</span>
                  <span className="text-slate-900 font-semibold block">{growthData.agendo.defaultExperiment.primaryMetric}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Meta Numérica:</span>
                  <span className="text-emerald-700 font-mono font-bold block">
                    {growthData.agendo.defaultExperiment.initialValue} → {growthData.agendo.defaultExperiment.targetValue}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-200">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Contramétrica (Guardrail):</span>
                  <span className="text-slate-900 font-semibold block">{growthData.agendo.defaultExperiment.guardrailMetric}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Límite Aceptable:</span>
                  <span className="text-rose-700 font-mono font-bold block">{growthData.agendo.defaultExperiment.guardrailLimit}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-200">
                <span className="font-bold text-slate-800 block mb-1">Decisión de Producto:</span>
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{growthData.agendo.defaultExperiment.decision}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: MATRIZ DE CANALES A 90 DÍAS */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <ChannelMatrix90Days caseKey="agendo" />
        </div>
      )}
    </div>
  );
}

