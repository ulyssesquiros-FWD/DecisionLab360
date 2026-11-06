// DecisionLab 360 - Hub Central de Growth: Sol de Casa Comunidad Solar (Sesión 2)
// Panel Integral para Andrés Villalobos: Diagnóstico, Regla $300, Capacidad, Retención Continua, Gráficos y Experimento

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  TrendingUp,
  AlertTriangle,
  Gift,
  Share2,
  DollarSign,
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
  Wrench,
  Activity,
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
import SolDeCasaRewardsConfig from '../../../Components/Growth/SolDeCasaRewardsConfig.jsx';
import ChannelMatrix90Days from '../../../Components/Growth/ChannelMatrix90Days.jsx';

import { growthData } from '../../../Data/growthData.js';
import {
  evaluateSolDeCasaRewards,
  calculateSolarSavings,
  calculateSolDeCasaCapacity
} from '../../../Engines/growthEngines.js';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import { formatCurrency, formatPercent, formatNumber, formatRatio } from '../../../Services/calculationService.js';

export default function SolDeCasaGrowthHub() {
  const [solState, setSolState] = useState(growthStorageService.getSolState());
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'rewards', 'capacity', 'retention', 'funnel', 'experiment', 'matrix'
  const [extraTechs, setExtraTechs] = useState(1); // Simulación de 1 técnico extra

  const evalRewards = evaluateSolDeCasaRewards();
  const capacityModel = calculateSolDeCasaCapacity({ extraTechnicians: extraTechs });

  const handleReset = () => {
    const freshState = growthStorageService.resetSolState();
    setSolState(freshState);
  };

  // Datos para los 5 Gráficos Obligatorios de Andrés:
  // 1. Embudo de compartir a instalación
  const funnelSolarData = [
    { etapa: '1. Tarjetas Compartidas', cantidad: 164, fill: '#ca8a04' },
    { etapa: '2. Usaron Calculadora', cantidad: 120, fill: '#d97706' },
    { etapa: '3. Solicitudes Visita', cantidad: 48, fill: '#059669' },
    { etapa: '4. Visitas Realizadas', cantidad: 43, fill: '#10b981' },
    { etapa: '5. Ventas Cerradas', cantidad: 19, fill: '#047857' }
  ];

  // 2. Ahorro acumulado de las familias (Mes a Mes)
  const cumulativeSavingsData = [
    { mes: 'Mes 1', ahorroMes: 22000, acumulado: 22000 },
    { mes: 'Mes 2', ahorroMes: 24500, acumulado: 46500 },
    { mes: 'Mes 3', ahorroMes: 27000, acumulado: 73500 },
    { mes: 'Mes 4', ahorroMes: 30000, acumulado: 103500 },
    { mes: 'Mes 5', ahorroMes: 32340, acumulado: 135840 },
    { mes: 'Mes 6', ahorroMes: 35000, acumulado: 170840 }
  ];

  // 3. Leads por origen (Google vs Meta vs Referidos)
  const leadsOriginData = [
    { name: 'Meta Ads ($4k)', leads: 500, fill: '#f43f5e' },
    { name: 'Google Ads ($4k)', leads: 100, fill: '#3b82f6' },
    { name: 'Comunidad Referidos', leads: 48, fill: '#10b981' }
  ];

  // 4. Instalaciones firmadas provenientes de referidos en el tiempo
  const salesEvolutionData = [
    { mes: 'Mes 1', ventasReferidos: 6, ventasAnuncios: 26 },
    { mes: 'Mes 2', ventasReferidos: 11, ventasAnuncios: 26 },
    { mes: 'Mes 3', ventasReferidos: 19, ventasAnuncios: 24 },
    { mes: 'Mes 4', ventasReferidos: 25, ventasAnuncios: 22 },
    { mes: 'Mes 5', ventasReferidos: 30, ventasAnuncios: 20 },
    { mes: 'Mes 6', ventasReferidos: 35, ventasAnuncios: 18 }
  ];

  // 5. Costo de adquisición frente al límite de $300
  const cacVersusLimitData = [
    { canal: 'Meta Ads (Real)', cac: 718.13, limite: 300, fill: '#f43f5e' },
    { canal: 'Google Ads (Real)', cac: 535.54, limite: 300, fill: '#3b82f6' },
    { canal: 'Comunidad Solar (Visitas + Premios)', cac: evalRewards.totalExpectedCAC, limite: 300, fill: '#10b981' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner Sol de Casa Growth */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sun className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 font-mono">
              Sesión 2 · Solución de Growth
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 font-bold">
              [SIMULADO]
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sol de Casa: Comunidad Solar y Ahorro Compartido
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mt-1 leading-relaxed">
            Activar a las 420 familias instaladas para que conozcan su ahorro, lo compartan con sus vecinos y generen visitas técnicas de alta conversión.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/sol-de-casa/familia/SOL-FAMILIA-MORA-9A"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-98"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Portal Familia Mora</span>
          </Link>
          <Link
            to="/sol-de-casa/ahorro/SOL-FAMILIA-MORA-9A"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-800/80 hover:bg-teal-700 border border-teal-600 rounded-xl text-xs font-bold text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Landing Vecino & Calc</span>
          </Link>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900/60 hover:bg-slate-900 border border-emerald-400/30 rounded-xl text-xs font-semibold text-emerald-200 transition-colors"
            title="Reiniciar datos simulados de Sol de Casa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'dashboard', label: 'Panel Administrativo Andrés', icon: BarChart3 },
          { id: 'rewards', label: 'Sistema de Recompensas (≤ $300)', icon: Gift },
          { id: 'capacity', label: 'Capacidad de Visitas & Técnicos', icon: Wrench },
          { id: 'retention', label: 'Retención Continua en Solar', icon: Activity },
          { id: 'funnel', label: 'Diagnóstico Web Actual vs Referidos', icon: Sliders },
          { id: 'experiment', label: 'Experimento Piloto (50 Familias)', icon: Target },
          { id: 'matrix', label: 'Plan y Matriz 90 Días', icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PANEL ADMINISTRATIVO DE ANDRÉS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Instalaciones por Referidos"
              value="19 ventas"
              subvalue="En el último mes"
              badgeText="39.5% Conversión"
              badgeType="success"
              helperText="19 cierres de $6,500 generados por el boca a boca de familias activas"
            />
            <KPICard
              title="CAC Real de Referidos"
              value={formatCurrency(evalRewards.totalExpectedCAC)}
              subvalue="Límite Andrés: ≤ $300.00"
              badgeText="Cumple Regla"
              badgeType="success"
              helperText="Incluye $133.33 en visitas técnicas obligatorias + $144.00 en premios de mantenimiento"
            />
            <KPICard
              title="CAC Meta vs CAC Referidos"
              value={`${formatCurrency(718.13)} vs ${formatCurrency(evalRewards.totalExpectedCAC)}`}
              subvalue="Meta Ads cuesta +159% más"
              badgeText="Ahorro Masivo"
              badgeType="info"
              helperText="Un cliente por referido cuesta menos de la mitad que un cliente cerrado por Meta"
            />
            <KPICard
              title="Capacidad Técnica Utilizada"
              value="86%"
              subvalue="86 de 100 visitas base"
              badgeText="Cerca de Saturación"
              badgeType="warning"
              helperText="Capacidad operativa de los 2 técnicos actuales al borde de demandar el 3er técnico"
            />
          </div>

          {/* Operational Numbers Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Familias Instaladas</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">420</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Revisan Ahorros</span>
              <span className="text-base font-extrabold text-emerald-700 font-mono">285 (68%)</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Tarjetas Compartidas</span>
              <span className="text-base font-extrabold text-blue-700 font-mono">164</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Uso Calculadora</span>
              <span className="text-base font-extrabold text-indigo-700 font-mono">340</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Visitas Agendadas</span>
              <span className="text-base font-extrabold text-amber-700 font-mono">48</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Visitas Realizadas</span>
              <span className="text-base font-extrabold text-emerald-700 font-mono">43</span>
            </div>
          </div>

          {/* 5 Mandatory Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Embudo de compartir a instalación */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">1. Embudo de Compartir a Instalación Firmada</h4>
                  <p className="text-[11px] text-slate-500">De la tarjeta compartida por WhatsApp al contrato de $6,500</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  Embudo Solar
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelSolarData} layout="vertical" margin={{ left: 30, right: 30, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="etapa" type="category" width={120} tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Bar dataKey="cantidad" radius={[0, 6, 6, 0]}>
                      {funnelSolarData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Ahorro acumulado de las familias */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">2. Ahorro Económico Acumulado por las Familias</h4>
                  <p className="text-[11px] text-slate-500">Prueba social tangible que sustenta el loop de referidos</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Ahorro en Dólares
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cumulativeSavingsData} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                    <YAxis unit="$" />
                    <Tooltip formatter={(val) => [formatCurrency(val), 'Dólares Ahorrados']} />
                    <Legend />
                    <Line type="monotone" dataKey="ahorroMes" name="Ahorro del Mes" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="acumulado" name="Ahorro Total Acumulado" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Leads por origen (Google vs Meta vs Referidos) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">3. Distribución de Leads por Canal de Captación</h4>
                  <p className="text-[11px] text-slate-500">Naturaleza de los contactos comerciales mensuales</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                  Volumen Mensual
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadsOriginData} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" radius={[6, 6, 0, 0]}>
                      {leadsOriginData.map((entry, index) => (
                        <Cell key={`lead-cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Evolución de ventas de referidos frente a anuncios */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">4. Evolución de Instalaciones: Referidos vs Anuncios</h4>
                  <p className="text-[11px] text-slate-500">Transición paulatina hacia adquisición orgánica y boca a boca</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Ventas Cerradas
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesEvolutionData} margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ventasAnuncios" name="Ventas por Anuncios" stroke="#f43f5e" strokeWidth={2} />
                    <Line type="monotone" dataKey="ventasReferidos" name="Ventas por Referidos" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Chart 5: Costo de Adquisición frente al límite de $300 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">5. CAC Real de Cada Canal frente al Límite de Andrés ($300)</h4>
                <p className="text-[11px] text-slate-500">Comprobación del cumplimiento inquebrantable de la Regla de Oro</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                Regla de Oro Andrés
              </span>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cacVersusLimitData} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="canal" tick={{ fontSize: 10 }} />
                  <YAxis unit="$" domain={[0, 800]} />
                  <Tooltip formatter={(val) => [formatCurrency(val), 'CAC']} />
                  <Bar dataKey="cac" radius={[6, 6, 0, 0]}>
                    {cacVersusLimitData.map((entry, index) => (
                      <Cell key={`cac-cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Solicitudes Recientes de Visitas Técnicas de Vecinos */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-slate-900 text-sm">
                Solicitudes de Visitas Técnicas Registradas (Leads de Vecinos)
              </h4>
              <span className="text-xs text-slate-400">
                {solState.visitRequests.length} solicitudes activas
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-semibold">
                    <th className="p-2">ID Solicitud</th>
                    <th className="p-2">Vecino Prospecto</th>
                    <th className="p-2">Teléfono</th>
                    <th className="p-2">Dirección a Medir</th>
                    <th className="p-2">Referido por Código</th>
                    <th className="p-2">Fecha y Hora</th>
                    <th className="p-2 text-right">Ahorro Anual Est.</th>
                    <th className="p-2">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {solState.visitRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-emerald-50/40">
                      <td className="p-2 font-mono font-bold text-slate-800">{req.id}</td>
                      <td className="p-2 font-semibold text-slate-900">{req.neighborName}</td>
                      <td className="p-2 text-slate-600 font-mono">{req.neighborPhone}</td>
                      <td className="p-2 text-slate-700 truncate max-w-[180px]">{req.address}</td>
                      <td className="p-2 font-mono text-emerald-800 font-bold">{req.referralCode}</td>
                      <td className="p-2 font-mono text-slate-800">{req.preferredDate} · {req.preferredTime}</td>
                      <td className="p-2 text-right font-mono font-bold text-emerald-700">{formatCurrency(req.estimatedAnnualSavings)}</td>
                      <td className="p-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RECOMPENSAS Y REGLA DE ANDRÉS */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <SolDeCasaRewardsConfig />
        </div>
      )}

      {/* TAB 3: CAPACIDAD TÉCNICA Y MODELO DE LETREROS */}
      {activeTab === 'capacity' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
              Operación y Cuello de Botella Físico
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Capacidad de Visitas Técnicas y Extrapolación de Letreros
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ¿Cuántos leads referidos hacen falta para llenar 50 visitas adicionales y cuántas familias se requieren?
            </p>
          </div>

          {/* Model Controls */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-800 block">Técnicos Adicionales Contratados ($1,800/mes c/u):</span>
              <span className="text-slate-500">Cada técnico nuevo suma exactamente 50 visitas mensuales</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExtraTechs(Math.max(0, extraTechs - 1))}
                className="px-3 py-1 bg-white border rounded-lg font-bold"
              >
                -
              </button>
              <span className="font-mono font-extrabold text-lg text-emerald-800 px-3">
                {extraTechs} (+{extraTechs * 50} visitas)
              </span>
              <button
                onClick={() => setExtraTechs(Math.min(3, extraTechs + 1))}
                className="px-3 py-1 bg-white border rounded-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Capacidad Total Mensual</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                {capacityModel.totalCapacity} visitas
              </span>
              <span className="text-[11px] text-slate-500 block">100 base + {extraTechs * 50} extras</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Sueldo Extra Mensual</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                {formatCurrency(capacityModel.extraSalaries)}
              </span>
              <span className="text-[11px] text-slate-500 block">$1,800 por técnico extra</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Leads Necesarios / 50 Visitas</span>
              <span className="text-2xl font-extrabold text-emerald-800 font-mono">
                {capacityModel.leadsNeededFor50Visits} leads
              </span>
              <span className="text-[11px] text-emerald-700 block">50 ÷ 0.72675 visitas/lead</span>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Familias Compartiendo Requeridas</span>
              <span className="text-2xl font-extrabold text-amber-800 font-mono">
                {capacityModel.familiesNeededFor50Visits} familias
              </span>
              <span className="text-[11px] text-amber-700 block">Con tasa letrero (0.15 leads/mes)</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs space-y-2 leading-relaxed">
            <span className="font-bold text-amber-400 uppercase tracking-wider block">
              Nota Metodológica Obligatoria sobre la Hipótesis de Extrapolación:
            </span>
            <p className="text-slate-300">
              El caso documenta que 20 letreros físicos de jardín en Curridabat produjeron 6 leads en 2 meses (0.15 leads por letrero al mes).
              Al extrapolar matemáticamente esta tasa al portal digital, llenar la capacidad de 50 visitas de un técnico adicional requeriría <strong>~459 familias compartiendo activamente</strong>. Dado que Sol de Casa cuenta actualmente con 420 familias instaladas, esta extrapolación demuestra con claridad que <em>se necesitaría activar a más del 100% de la base existente bajo la tasa pasiva del letrero, o bien el portal digital interactivo debe ser 2.5x más eficiente que el letrero físico</em> (generando al menos 0.35 a 0.40 leads por familia al mes) para no dejar capacidad ociosa.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: DEFINICIÓN DE RETENCIÓN EN SOLAR */}
      {activeTab === 'retention' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
              Diseño de Métricas de Negocio No Convencionales
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              ¿Qué significa «Retener una Familia» si la compra es cada 20 años?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Superar la trampa de medir recompra en bienes duraderos mediante indicadores de relación continua
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <span className="font-bold text-rose-900 block uppercase">El Error Convencional:</span>
              <p className="text-rose-950 leading-relaxed">
                Intentar medir la retención como recompra de paneles solares es un absurdo financiero: una familia compra paneles una sola vez cada 15 a 20 años. Si Andrés espera la siguiente compra para saber si el cliente está retenido, tardará dos décadas en enterarse.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <span className="font-bold text-emerald-900 block uppercase">La Definición Correcta (Relación Continua):</span>
              <p className="text-emerald-950 leading-relaxed">
                Una familia está «retenida» cuando <strong>mantiene contacto mensual activo con Sol de Casa</strong>, consulta sus ahorros en la plataforma, actúa como embajador compartiendo su tarjeta y mantiene activo su plan de mantenimiento anual ($12/mes).
              </p>
            </div>
          </div>

          {/* Indicador Semanal Principal */}
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Indicador Semanal Principal para Andrés Villalobos
              </span>
              <span className="text-xs font-mono font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                KPI ESTRELLA
              </span>
            </div>

            <h4 className="text-lg font-black text-emerald-950">
              «Familias Activas que Comparten su Ahorro al Menos 1 Vez al Mes» (FAS)
            </h4>

            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Justificación Estratégica:</strong> Este indicador encapsula la salud total del negocio:
              1) Si la familia consulta su ahorro, el inversor está funcionando y el cliente está satisfecho;
              2) Si la familia comparte el ahorro con un vecino, el boca a boca está encendido y alimenta el embudo sin pauta publicitaria;
              3) Mantiene la barrera de entrada alta contra competidores y asegura la tasa de renovación del plan de mantenimiento de $12/mes.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: DIAGNÓSTICO WEB ACTUAL VS REFERIDOS */}
      {activeTab === 'funnel' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 font-mono">
              Diagnóstico de Conversión
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Embudo Web Frío vs Embudo de Referidos de Vecinos
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Por qué los leads de pauta son lentos y caros frente a la recomendación entre vecinos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 block">Página Web Actual (Tráfico de Anuncios):</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4 leading-relaxed">
                <li>100 visitas a la web con fotos genéricas y botón «Cotice».</li>
                <li>Solo 14 personas abren el formulario de 6 campos obligatorios.</li>
                <li>Solo 6 personas dejan sus datos (86% abandono en la página).</li>
                <li>Las asesoras tardan <strong>31 horas promedio</strong> en llamar a un lead.</li>
                <li>No hay videos, testimonios ni datos de ahorro verificable.</li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <span className="font-bold text-emerald-950 block">Embudo de Referidos (Comunidad Solar):</span>
              <ul className="space-y-1 text-emerald-900 list-disc pl-4 leading-relaxed">
                <li>El vecino ve la tarjeta real con nombre de la casa vecina.</li>
                <li>Usa la calculadora solar interactiva y ve su propio ahorro potencial.</li>
                <li>El <strong>95%</strong> de los referidos es contactado con éxito.</li>
                <li>El <strong>85%</strong> agenda una visita técnica de medición.</li>
                <li>El <strong>90%</strong> de las visitas agendadas se realiza efectivamente.</li>
                <li>El <strong>45%</strong> de las visitas realizadas termina en compra de $6,500.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: EXPERIMENTO PILOTO (50 FAMILIAS) */}
      {activeTab === 'experiment' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
              Diseño Experimental Controlado
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Experimento Piloto con 50 Familias en Curridabat y Escazú
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Validar que dar acceso al portal familiar genera referidos a costo ≤ $300
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hipótesis:</label>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  {growthData.solDeCasa.defaultExperiment.hypothesis}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Muestra Seleccionada:</label>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  50 familias que ya tienen paneles instalados:<br />
                  • <strong>Grupo Tratamiento (25 familias):</strong> Reciben acceso a «Mi Ahorro Solar» y tarjeta para WhatsApp.<br />
                  • <strong>Grupo Control (25 familias):</strong> Permanece con la experiencia actual (cero mensajes).
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Métrica Principal:</span>
                  <span className="text-slate-900 font-semibold block">{growthData.solDeCasa.defaultExperiment.primaryMetric}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Meta Numérica:</span>
                  <span className="text-emerald-700 font-mono font-bold block">
                    {growthData.solDeCasa.defaultExperiment.initialValue} → {growthData.solDeCasa.defaultExperiment.targetValue}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-200">
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Contramétrica (Guardrail):</span>
                  <span className="text-slate-900 font-semibold block">{growthData.solDeCasa.defaultExperiment.guardrailMetric}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Límite Permitido:</span>
                  <span className="text-rose-700 font-mono font-bold block">{growthData.solDeCasa.defaultExperiment.guardrailLimit}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200">
                <span className="font-bold text-slate-800 block mb-1">Resultados Observados:</span>
                <p className="text-slate-700 leading-relaxed">
                  Control: 1 lead, 0 ventas.<br />
                  Tratamiento: 19 tarjetas compartidas, 42 usos calculadora, 9 leads, 7 visitas realizadas, <strong>3 ventas firmadas ($19,500)</strong> con CAC real de $277.33.
                </p>
                <div className="mt-2 font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{growthData.solDeCasa.defaultExperiment.decision}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: MATRIZ DE CANALES A 90 DÍAS */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <ChannelMatrix90Days caseKey="solDeCasa" />
        </div>
      )}
    </div>
  );
}

