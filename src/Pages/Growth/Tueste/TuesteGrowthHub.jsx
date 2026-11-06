// DecisionLab 360 - Hub Central de Growth: Tueste Rewards (Sesión 2)
// Panel Integral para Diego Ramírez: Diagnóstico, Regla $25, Admin, Gráficos, Ciclo y Experimento

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Coffee,
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
  HelpCircle
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
  Cell
} from 'recharts';

import KPICard from '../../../Components/KPICard/KPICard.jsx';
import MetricIndicator from '../../../Components/MetricIndicator/MetricIndicator.jsx';
import TuesteRewardsConfig from '../../../Components/Growth/TuesteRewardsConfig.jsx';
import ChannelMatrix90Days from '../../../Components/Growth/ChannelMatrix90Days.jsx';

import { growthData } from '../../../Data/growthData.js';
import { evaluateTuesteRewards, calculateTuesteFunnelMetrics } from '../../../Engines/growthEngines.js';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import { formatCurrency, formatPercent, formatNumber } from '../../../Services/calculationService.js';

export default function TuesteGrowthHub() {
  const [tuesteState, setTuesteState] = useState(growthStorageService.getTuesteState());
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'rewards', 'funnel', 'experiment', 'matrix'
  const [experiment, setExperiment] = useState(growthData.tueste.defaultExperiment);

  const funnelMetrics = calculateTuesteFunnelMetrics();
  const evalRewards = evaluateTuesteRewards();

  const handleResetData = () => {
    const freshState = growthStorageService.resetTuesteState();
    setTuesteState(freshState);
  };

  // Datos para los 5 Gráficos Obligatorios de Diego:
  // 1. Embudo de referidos
  const funnelChartData = [
    { stage: '1. Reciben Correo', count: tuesteState.metrics.emailsSent, fill: '#78350f' },
    { stage: '2. Abren Correo', count: tuesteState.metrics.emailsOpened, fill: '#92400e' },
    { stage: '3. Entran Programa', count: tuesteState.metrics.programVisits, fill: '#b45309' },
    { stage: '4. Clientes Invitan', count: tuesteState.metrics.activeReferrers, fill: '#d97706' },
    { stage: '5. Visitas Amigos', count: tuesteState.metrics.storeVisits, fill: '#f59e0b' },
    { stage: '6. Compras Referidas', count: tuesteState.metrics.purchases, fill: '#10b981' }
  ];

  // 2. Conversión etapa a etapa
  const conversionByStageData = [
    { etapa: 'Apertura Correo', tasa: 35.0 },
    { etapa: 'Entrada al Programa', tasa: 34.3 },
    { etapa: 'Envío de Invitación', tasa: 83.3 },
    { etapa: 'Apertura de Tienda', tasa: 50.0 },
    { etapa: 'Compra Final Amigo', tasa: 40.0 }
  ];

  // 3. Clientes nuevos Meta vs Referidos (Mes 1 a Mes 6 Proyectado)
  const acquisitionComparisonData = [
    { mes: 'Mes 1', meta: 100, referidos: 60 },
    { mes: 'Mes 2', meta: 100, referidos: 85 },
    { mes: 'Mes 3', meta: 100, referidos: 110 },
    { mes: 'Mes 4', meta: 90, referidos: 130 },
    { mes: 'Mes 5', meta: 80, referidos: 145 },
    { mes: 'Mes 6', meta: 75, referidos: 160 }
  ];

  // 4. CAC Meta frente a CAC Referidos
  const cacComparisonData = [
    { canal: 'Meta Ads (Con Agencia)', cac: 50.0, limite: 25.0, fill: '#f43f5e' },
    { canal: 'Tueste Rewards (Referidos)', cac: evalRewards.avgReferralCAC, limite: 25.0, fill: '#10b981' }
  ];

  // 5. Evolución de recompensas entregadas y acumuladas
  const rewardsEvolutionData = [
    { mes: 'Semana 1', entregadas: 12, costoUSD: 38.4 },
    { mes: 'Semana 2', entregadas: 24, costoUSD: 76.8 },
    { mes: 'Semana 3', entregadas: 38, costoUSD: 121.6 },
    { mes: 'Semana 4', entregadas: 52, costoUSD: 166.4 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner de Growth Hub */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-amber-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Coffee className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200 font-mono">
              Sesión 2 · Solución de Growth
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-100 border border-amber-300/30 font-bold">
              [SIMULADO]
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tueste Rewards: Programa de Referidos
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl mt-1 leading-relaxed">
            Convertir a compradores satisfechos en promotores activos con costo inferior a la mitad de Meta (≤ $25 CAC).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/tueste/mi-programa"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-98"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Ver App del Cliente</span>
          </Link>
          <Link
            to="/tueste/referido/TUESTE-CAMILA-8K"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-700/60 hover:bg-amber-700 border border-amber-500/40 rounded-xl text-xs font-bold text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Landing Amigo</span>
          </Link>
          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900/60 hover:bg-slate-900 border border-amber-400/30 rounded-xl text-xs font-semibold text-amber-200 transition-colors"
            title="Reiniciar datos simulados de Tueste"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'dashboard', label: 'Panel Administrativo Diego', icon: BarChart3 },
          { id: 'rewards', label: 'Sistema de Recompensas ($25 Max)', icon: Gift },
          { id: 'funnel', label: 'Diagnóstico del Embudo Piloto', icon: Sliders },
          { id: 'cycle', label: 'Ciclo de Crecimiento', icon: Layers },
          { id: 'experiment', label: 'Experimento A/B', icon: Target },
          { id: 'matrix', label: 'Plan y Matriz 90 Días', icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PANEL ADMINISTRATIVO DE DIEGO */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Compras por Referidos"
              value={formatNumber(tuesteState.metrics.purchases)}
              subvalue="Amigos que pagaron"
              badgeText="6% Conversión Total"
              badgeType="success"
              helperText="60 compras generadas a partir de 1,000 correos de clientes iniciales"
            />
            <KPICard
              title="CAC Real de Referidos"
              value={formatCurrency(evalRewards.avgReferralCAC)}
              subvalue={`Límite Diego: ≤ $25.00`}
              badgeText="Ahorro del 84%"
              badgeType="success"
              helperText={`Costo promedio de recompensas por cliente referido que compra`}
            />
            <KPICard
              title="CAC Real Meta (Pauta)"
              value={formatCurrency(evalRewards.metaCAC)}
              subvalue="Inversión $4k + $1k agencia"
              badgeText="Referente"
              badgeType="warning"
              helperText="($4,000 pauta + $1,000 fee agencia) ÷ 100 clientes nuevos de Meta = $50"
            />
            <KPICard
              title="Recompensas Entregadas"
              value={formatCurrency(tuesteState.metrics.deliveredRewards * 3.20)}
              subvalue={`${tuesteState.metrics.deliveredRewards} premios otorgados`}
              badgeText="Control de Caja"
              badgeType="info"
              helperText="Inversión total acumulada en premios de café para invitadores y amigos"
            />
          </div>

          {/* Secondary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Correos Enviados</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">{tuesteState.metrics.emailsSent}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Abrieron Correo</span>
              <span className="text-base font-extrabold text-amber-700 font-mono">{tuesteState.metrics.emailsOpened}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Clientes Invitan</span>
              <span className="text-base font-extrabold text-blue-700 font-mono">{tuesteState.metrics.activeReferrers}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Invitaciones Totales</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">{tuesteState.metrics.totalInvitesSent}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Visitas Amigos</span>
              <span className="text-base font-extrabold text-indigo-700 font-mono">{tuesteState.metrics.storeVisits}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Suscripciones Ref.</span>
              <span className="text-base font-extrabold text-emerald-700 font-mono">{tuesteState.metrics.subscriptions}</span>
            </div>
          </div>

          {/* 5 Mandatory Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Embudo de referidos */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">1. Embudo Completo de Referidos</h4>
                  <p className="text-[11px] text-slate-500">Pérdida y avance en cada etapa (1,000 correos base)</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Volumen Absoluto
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelChartData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" width={110} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(val) => [formatNumber(val), 'Personas / Eventos']} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                      {funnelChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Conversión por etapa (%) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">2. Tasa de Conversión por Etapa (%)</h4>
                  <p className="text-[11px] text-slate-500">Porcentaje de usuarios que logran avanzar a la siguiente pantalla</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  Eficiencia %
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionByStageData} margin={{ left: 0, right: 20, top: 10, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="etapa" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" />
                    <YAxis unit="%" domain={[0, 100]} />
                    <Tooltip formatter={(val) => [`${val}%`, 'Tasa de Conversión']} />
                    <Bar dataKey="tasa" fill="#b45309" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Clientes nuevos Meta vs Referidos */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">3. Clientes Nuevos: Meta vs Referidos</h4>
                  <p className="text-[11px] text-slate-500">Proyección a 6 meses diversificando la adquisición</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  Volumen Mensual
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={acquisitionComparisonData} margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="meta" name="Clientes Meta ($4k)" stroke="#f43f5e" strokeWidth={2} />
                    <Line type="monotone" dataKey="referidos" name="Clientes Referidos" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: CAC Meta vs CAC Referidos */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">4. Comparación de Costo de Adquisición (CAC)</h4>
                  <p className="text-[11px] text-slate-500">Costo unitario frente a la regla de Diego (≤ $25)</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                  Regla de Plata
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cacComparisonData} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="canal" tick={{ fontSize: 10 }} />
                    <YAxis unit="$" domain={[0, 60]} />
                    <Tooltip formatter={(val) => [formatCurrency(val), 'CAC']} />
                    <Bar dataKey="cac" radius={[6, 6, 0, 0]}>
                      {cacComparisonData.map((entry, index) => (
                        <Cell key={`cac-cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Chart 5: Evolución de recompensas entregadas */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">5. Evolución de Recompensas Entregadas e Inversión en Café</h4>
                <p className="text-[11px] text-slate-500">Control de desembolso semanal acumulado en café de cortesía</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                Seguimiento Semanal
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rewardsEvolutionData} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" orientation="left" stroke="#6366f1" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" unit="$" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="entregadas" name="Recompensas Entregadas" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="costoUSD" name="Costo Total Recompensas ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Simulated Referral Purchases Log */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-slate-900 text-sm">
                Registro de Compras Referidas en Tiempo Real
              </h4>
              <span className="text-xs text-slate-400">
                {tuesteState.purchasesLog.length} pedidos registrados
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-semibold">
                    <th className="p-2">ID Orden</th>
                    <th className="p-2">Código Referido</th>
                    <th className="p-2">Comprador</th>
                    <th className="p-2">Producto</th>
                    <th className="p-2 text-right">Precio Lista</th>
                    <th className="p-2 text-right">Descuento</th>
                    <th className="p-2 text-right">Total Pagado</th>
                    <th className="p-2">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tuesteState.purchasesLog.map((log) => (
                    <tr key={log.id} className="hover:bg-amber-50/40">
                      <td className="p-2 font-mono font-bold text-slate-800">{log.id}</td>
                      <td className="p-2 font-mono text-amber-800">{log.codeUsed}</td>
                      <td className="p-2 font-semibold text-slate-900">{log.buyerName}</td>
                      <td className="p-2 text-slate-700">{log.product}</td>
                      <td className="p-2 text-right font-mono text-slate-500 line-through">{formatCurrency(log.listPrice)}</td>
                      <td className="p-2 text-right font-mono text-emerald-700 font-bold">-{formatCurrency(log.discountGiven)}</td>
                      <td className="p-2 text-right font-mono text-slate-900 font-extrabold">{formatCurrency(log.finalPaid)}</td>
                      <td className="p-2 text-slate-500">{log.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RECOMPENSAS Y REGLA DE DIEGO */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <TuesteRewardsConfig />
        </div>
      )}

      {/* TAB 3: DIAGNÓSTICO DEL EMBUDO PILOTO */}
      {activeTab === 'funnel' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 font-mono">
              Análisis Forense del Piloto «Regala una Bolsa»
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              ¿En cuál de los pasos de hoy se pierde más gente y por qué?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Desglose estricto sobre la cohorte de 1,000 primeros compradores de café
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" />
                Mayor Abandono Relativo (Pérdida Crítica)
              </div>
              <p className="text-sm font-extrabold text-rose-950">
                Paso 1 a Paso 2: Apertura de Correo a Entrada al Programa (-65.7% de caída)
              </p>
              <p className="text-xs text-rose-900 leading-relaxed">
                De los 350 clientes que abren el correo, solo 120 entran al enlace (se pierden 230 clientes, 65.7%).
                Además, de los 1,000 compradores iniciales, 650 ni siquiera abrieron el correo (65% de pérdida en el primer contacto).
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase">
                <HelpCircle className="w-4 h-4" />
                Causas Raíz Identificadas en el Caso
              </div>
              <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li><strong>Desincronización de entrega:</strong> El correo se envía al día siguiente de pagar, pero el café tarda 3 días en llegar. El cliente aún no ha probado el producto.</li>
                <li><strong>Fricción de código manual:</strong> Al entrar solo ven una pantalla vacía con un código que deben copiar y pegar a mano.</li>
                <li><strong>Falta de aviso al invitador:</strong> El 70% de quienes invitaron no sabía que tenía $8 a favor porque nunca recibieron notificación.</li>
                <li><strong>Mensaje frío para el amigo:</strong> El amigo recibe un código suelto sin el descuento pre-cargado.</li>
              </ul>
            </div>
          </div>

          {/* Tabla de Conversión Etapa por Etapa */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b">
                  <th className="p-3">Etapa del Embudo</th>
                  <th className="p-3 text-right">Cantidad</th>
                  <th className="p-3 text-right">% Sobre Cohorte Inicial</th>
                  <th className="p-3 text-right">Pérdida en Etapa</th>
                  <th className="p-3">Diagnóstico Operativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {growthData.tueste.baselineFunnel.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{row.stage}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">{formatNumber(row.count)}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{((row.count / 1000) * 100).toFixed(1)}%</td>
                    <td className="p-3 text-right font-mono text-rose-600 font-semibold">
                      {row.dropPercent > 0 ? `-${row.dropPercent}%` : '-'}
                    </td>
                    <td className="p-3 text-slate-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CICLO DE CRECIMIENTO */}
      {activeTab === 'cycle' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 font-mono">
              Arquitectura del Loop Viral
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Ciclo de Crecimiento de Tueste Rewards
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              De dónde sale cada cliente nuevo y cómo trae al siguiente cliente rentable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {growthData.tueste.growthCycle.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/60 to-white space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-amber-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {step.actor}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm pt-1">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Role of Meta Ads in the 90-Day Plan */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs leading-relaxed">
            <span className="font-bold text-amber-400 block uppercase tracking-wider">
              ¿Qué lugar le queda a Meta Ads en el plan de 90 días?
            </span>
            <p className="text-slate-300">
              Meta Ads pasa de ser la única fuente de subsistencia de Tueste (donde un bloqueo temporal de 6 horas paralizaba las ventas)
              a cumplir el rol de <strong>motor de arranque inicial (seed engine)</strong>. Tueste invierte $4,000 mensuales en prospección pura de alta calidad
              para adquirir 100 clientes nuevos; cada uno de ellos entra de inmediato al programa de referidos post-degustación,
              multiplicando el volumen orgánicamente sin elevar el gasto publicitario.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: EXPERIMENTO DE VALIDACIÓN A/B */}
      {activeTab === 'experiment' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 font-mono">
              Diseño Experimental con Contramétrica
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Experimento A/B: Timing Post-Degustación vs Correo Día 1
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Validar que el rediseño aumenta las compras referidas manteniendo el CAC por debajo de $25
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre del Experimento:</label>
                <input
                  type="text"
                  value={experiment.name}
                  onChange={(e) => setExperiment({ ...experiment, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hipótesis de Trabajo:</label>
                <textarea
                  rows="3"
                  value={experiment.hypothesis}
                  onChange={(e) => setExperiment({ ...experiment, hypothesis: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Grupo Objetivo / Muestra:</label>
                <input
                  type="text"
                  value={experiment.targetGroup}
                  onChange={(e) => setExperiment({ ...experiment, targetGroup: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Métrica Principal:</label>
                  <input
                    type="text"
                    value={experiment.primaryMetric}
                    onChange={(e) => setExperiment({ ...experiment, primaryMetric: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Meta Numérica:</label>
                  <input
                    type="text"
                    value={experiment.targetValue}
                    onChange={(e) => setExperiment({ ...experiment, targetValue: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contramétrica (Guardrail):</label>
                  <input
                    type="text"
                    value={experiment.guardrailMetric}
                    onChange={(e) => setExperiment({ ...experiment, guardrailMetric: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Límite de Seguridad:</label>
                  <input
                    type="text"
                    value={experiment.guardrailLimit}
                    onChange={(e) => setExperiment({ ...experiment, guardrailLimit: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white font-mono font-bold text-rose-700"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200">
                <span className="font-bold text-slate-800 block mb-1">Resultado Observado y Decisión:</span>
                <p className="text-slate-600 leading-relaxed">
                  Grupo Control (Flujo anterior día 1): <strong>30 compras</strong> (6% conv.) con CAC $16.00.<br />
                  Grupo Tratamiento (Flujo QuickShare día 4): <strong>75 compras</strong> (15% conv.) con CAC <strong>$8.40</strong>.
                </p>
                <div className="mt-2 font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{experiment.decision}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: MATRIZ DE CANALES A 90 DÍAS */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <ChannelMatrix90Days caseKey="tueste" />
        </div>
      )}
    </div>
  );
}

