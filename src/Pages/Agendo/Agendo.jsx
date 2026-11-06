// DecisionLab 360 - Caso B: Agendo (Software SaaS)
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CalendarCheck,
  Sliders,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Users,
  DollarSign,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import KPICard from '../../Components/KPICard/KPICard.jsx';
import MetricIndicator from '../../Components/MetricIndicator/MetricIndicator.jsx';
import CashCurveChart from '../../Components/Charts/CashCurveChart.jsx';
import LtvCacChart from '../../Components/Charts/LtvCacChart.jsx';
import InvestmentHistoryChart from '../../Components/Charts/InvestmentHistoryChart.jsx';
import TrapComparisonChart from '../../Components/Charts/TrapComparisonChart.jsx';
import CashFlowTable from '../../Components/CashFlowTable/CashFlowTable.jsx';
import DataTable from '../../Components/DataTable/DataTable.jsx';
import AgendoGrowthHub from '../Growth/Agendo/AgendoGrowthHub.jsx';

import { runAgendoModel, simulateAgendo24Months } from '../../Engines/agendoEngine.js';
import { agendoOriginalData } from '../../Data/agendoData.js';
import { formatCurrency, formatPercent, formatRatio, formatNumber } from '../../Services/calculationService.js';
import { storageService } from '../../Services/storageService.js';
import { exportService } from '../../Services/exportService.js';

export default function Agendo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSession, setActiveSession] = useState(
    searchParams.get('session') === '2' ? 'session2' : 'session1'
  );
  // Estado de inputs para interactividad en vivo
  const [adSpend, setAdSpend] = useState(10000);
  const [trialConversionRate, setTrialConversionRate] = useState(14.0);
  const [monthlyPrice, setMonthlyPrice] = useState(25.0);
  const [annualPlanShare, setAnnualPlanShare] = useState(0.0);
  const [monthlyChurnPercent, setMonthlyChurnPercent] = useState(6.0);
  const [activeScenario, setActiveScenario] = useState('current');

  // Ejecución de motor financiero
  const model = runAgendoModel({
    adSpend,
    trialConversionRate,
    monthlyPrice,
    annualPlanShare,
    monthlyChurnPercent
  });

  // Ejecución de simulación 24 meses
  const simulation = simulateAgendo24Months({
    fixedAdSpend: adSpend,
    trialConversionRate,
    monthlyPrice,
    annualPlanShare,
    monthlyChurnPercent
  });

  // Aplicar escenarios predefinidos
  const applyScenario = (scenKey) => {
    setActiveScenario(scenKey);
    if (scenKey === 'current') {
      setAdSpend(10000);
      setTrialConversionRate(14.0);
      setMonthlyPrice(25.0);
      setAnnualPlanShare(0.0);
      setMonthlyChurnPercent(6.0);
    } else if (scenKey === 'valeriaProposal') {
      setAdSpend(30000);
      setTrialConversionRate(14.0);
      setMonthlyPrice(25.0);
      setAnnualPlanShare(0.0);
      setMonthlyChurnPercent(6.0);
    } else if (scenKey === 'recommendedOwn') {
      setAdSpend(12000);
      setTrialConversionRate(16.5);
      setMonthlyPrice(29.0);
      setAnnualPlanShare(0.20);
      setMonthlyChurnPercent(5.0);
    }
  };

  const handleReset = () => {
    storageService.resetCaseAssumptions('agendo');
    applyScenario('current');
  };

  const handleExportExcel = () => {
    exportService.exportCaseToExcel({
      caseKey: 'agendo',
      caseName: 'Agendo (Software SaaS)',
      modelData: model,
      simulationData: simulation,
      scenariosData: [
        {
          name: 'A. Situación Actual ($10k)',
          spend: 10000,
          customersOrSales: '70 ads / 120 total',
          cac: 180.00,
          ltv: 251.29,
          ltvToCac: 1.40,
          minCash: 48000,
          endingCash: 156741,
          riskNote: 'LTV:CAC 1.40x modesto, caja aguanta'
        },
        {
          name: 'B. Propuesta Valeria ($30k)',
          spend: 30000,
          customersOrSales: '126 ads / 176 total',
          cac: 277.14,
          ltv: 251.29,
          ltvToCac: 0.91,
          minCash: 0,
          endingCash: -45000,
          riskNote: 'Quiebra técnica por rendimientos decrecientes'
        },
        {
          name: 'C. Propuesta Propia ($12k + Mix Anual)',
          spend: 12000,
          customersOrSales: '95 ads / 145 total',
          cac: 158.00,
          ltv: 315.00,
          ltvToCac: 1.99,
          minCash: 55000,
          endingCash: 245000,
          riskNote: 'Escala rentable y flujo de caja robusto'
        }
      ]
    });
  };

  const handleExportPDF = () => {
    exportService.exportCaseToPDF({
      caseKey: 'agendo',
      caseName: 'Agendo',
      modelData: model,
      simulationData: simulation,
      recommendation: {
        decision: 'OPTIMIZAR',
        alternative: 'Rechazar tajantemente triplicar los anuncios a $30,000 como propone Valeria. En su lugar, optimizar la conversión de trials a 16.5%, introducir un 20% de plan anual ($240 adelantados) y ajustar precio a $29.',
        summary: 'Valeria confunde CAC Blended ($105) con CAC Paid ($180) y costo por trial ($20) con cliente pagado. Triplicar anuncios lleva el CAC Marginal a $398, agotando los $60,000 en 6 meses.'
      },
      trapAnalysis: agendoOriginalData.trapAnalysis
    });
  };

  // Datos para gráfico de historial y CAC marginal
  const historyData = [
    { spend: 0, customers: 0, marginalCAC: 0 },
    { spend: 5000, customers: 290 * 0.14, marginalCAC: 123.15 },
    { spend: 10000, customers: 500 * 0.14, marginalCAC: 170.07 },
    { spend: 15000, customers: 650 * 0.14, marginalCAC: 238.10 },
    { spend: 20000, customers: 760 * 0.14, marginalCAC: 324.68 },
    { spend: 30000, customers: 900 * 0.14, marginalCAC: 510.20 }
  ];

  // Datos para curva comparativa de caja (Mensual vs Anual)
  const cashCurveData = model.cashCurves.monthlyCurve.map((m, idx) => ({
    month: m.month,
    monthlyClient: m.cash,
    annualClient: model.cashCurves.annualCurve[idx]?.cash || 0
  }));

  // Paneles de anuncios para la tabla
  const channelData = [
    { channel: 'Meta Ads', spend: 6500, impressions: 812000, clicks: 9750, ctr: 1.2, trials: 433, costPerTrial: 15.01 },
    { channel: 'Google Ads', spend: 3500, impressions: 41000, clicks: 1480, ctr: 3.6, trials: 67, costPerTrial: 52.24 }
  ];

  const channelColumns = [
    { key: 'channel', label: 'Canal de Adquisición' },
    { key: 'spend', label: 'Inversión', align: 'right', render: (v) => formatCurrency(v, 0) },
    { key: 'clicks', label: 'Clics', align: 'right', render: (v) => formatNumber(v) },
    { key: 'ctr', label: 'CTR', align: 'right', render: (v) => formatPercent(v) },
    { key: 'trials', label: 'Trials Obtenidos', align: 'right', render: (v) => formatNumber(v) },
    { key: 'costPerTrial', label: 'Costo por Registro', align: 'right', render: (v) => formatCurrency(v) }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Selector de Sesión: Financiero (Sesión 1) vs Growth (Sesión 2) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => {
              setActiveSession('session1');
              setSearchParams({ session: '1' });
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeSession === 'session1'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SESIÓN 1 — Análisis Financiero (Nivel 1, 2 y 3)
          </button>
          <button
            onClick={() => {
              setActiveSession('session2');
              setSearchParams({ session: '2' });
            }}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSession === 'session2'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>SESIÓN 2 — Solución de Growth (Agendo QuickStart)</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">Nuevo</span>
          </button>
        </div>

        <div className="text-right pr-2">
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            {activeSession === 'session1' ? 'Modelado SaaS & LTV:CAC 24M' : 'Onboarding & Activación en 14 Días'}
          </span>
        </div>
      </div>

      {activeSession === 'session2' ? (
        <AgendoGrowthHub />
      ) : (
        <div className="space-y-8">
          {/* Top Banner with Brand Identity */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-md border border-blue-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <CalendarCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 font-mono">
              Caso B · Software SaaS B2B
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Agendo: Reservas y Cobros para Salones
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl mt-1 leading-relaxed">
            Dilema de Ricardo Méndez: Valeria quiere triplicar anuncios a $30,000 afirmando un LTV:CAC de 2.4x. ¿Cuánto aguanta la caja en realidad?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-700/60 hover:bg-blue-700 border border-blue-500/40 rounded-lg text-xs font-semibold text-white transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white shadow-sm transition-colors"
          >
            <span>Informe PDF</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900/40 hover:bg-slate-900/70 border border-blue-400/30 rounded-lg text-xs font-semibold text-blue-200 transition-colors"
            title="Restaurar a datos originales"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Escenario Activo:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyScenario('current')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'current'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            A. Situación Actual ($10k Ads)
          </button>
          <button
            onClick={() => applyScenario('valeriaProposal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'valeriaProposal'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            B. Propuesta Valeria ($30k Ads)
          </button>
          <button
            onClick={() => applyScenario('recommendedOwn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'recommendedOwn'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            C. Propuesta Propia ($12k + Mix Anual + $29)
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="CAC Paid Real (Anuncios)"
          value={formatCurrency(model.cacPaid)}
          subvalue={`Claim Valeria: $105`}
          badgeText="Realidad Paid"
          badgeType="danger"
          helperText="($10,000 ads + $1,200 Mariela + $1,400 comisión) ÷ 70 clientes pagados de ads"
        />

        <KPICard
          title="CAC Blended (Mezclado)"
          value={formatCurrency(model.cacBlended)}
          subvalue={`Incluye 50 orgánicos`}
          badgeText="Lámina Valeria"
          badgeType="warning"
          helperText="$12,600 ÷ (70 de ads + 50 orgánicos gratuitos). Disfraza el costo real publicitario."
        />

        <KPICard
          title="LTV a 24 Meses"
          value={formatCurrency(model.ltvData.blendedLTV)}
          subvalue={`Sin tope: ${formatCurrency(model.ltvData.ltvSinTope)}`}
          badgeText="24m Máximo"
          badgeType="info"
          helperText="Margen $19.50/mes x 12.89 meses efectivos con churn del 6% mensual"
        />

        <KPICard
          title="Ratio LTV : CAC Paid"
          value={formatRatio(model.ltvToCacPaid)}
          subvalue={`Claim Valeria: 2.40x`}
          badgeText={model.ltvToCacStatus.toUpperCase()}
          badgeType={model.ltvToCacStatus === 'green' ? 'success' : model.ltvToCacStatus === 'yellow' ? 'warning' : 'danger'}
          helperText="$251.29 LTV ÷ $180 CAC Paid. Lejos del estándar sano de 3.0x en SaaS."
        />
      </div>

      {/* Second Row of KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Trials Obtenidos"
          value={formatNumber(model.trials)}
          subvalue={`Costo/Trial: ${formatCurrency(model.costPerTrial)}`}
          badgeText="14% Convierte"
          badgeType="neutral"
          helperText="500 trials de anuncios generan solo 70 clientes pagados"
        />

        <KPICard
          title="Equipo Comercial Requerido"
          value={`${model.salesRepsNeeded} Vendedora${model.salesRepsNeeded > 1 ? 's' : ''}`}
          subvalue={`Costo: ${formatCurrency(model.totalSalesRepCost)}`}
          badgeText={`Máx ${model.salesRepsNeeded * 500} trials`}
          badgeType={model.salesRepsNeeded > 1 ? 'warning' : 'neutral'}
          helperText="Mariela ($1,200/mes) atiende hasta 500 trials. Si suben trials se contrata otra."
        />

        <KPICard
          title="Payback Cliente Mensual"
          value={model.cashCurves.paybackMonthly ? `${Number(model.cashCurves.paybackMonthly).toFixed(1)} meses` : '> 24 meses'}
          subvalue={`Anual: Inmediato (M1)`}
          badgeText="Recuperación"
          badgeType="info"
          helperText="Tarda 13 meses en recuperar los $180 gastados en adquirirlo"
        />

        <KPICard
          title="CAC Marginal al Triplicar"
          value={formatCurrency(model.marginalCAC)}
          subvalue="Tramo de Escala"
          badgeText="Muy Caro"
          badgeType="danger"
          helperText="De $10k a $30k cada cliente extra cuesta $398+ por saturación de anuncios"
        />
      </div>

      {/* Semaphores & Thresholds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricIndicator
          status={model.ltvToCacStatus}
          label="Semáforo de Salud LTV:CAC Paid"
          value={formatRatio(model.ltvToCacPaid)}
          description="Valeria cree que tiene 2.4x porque mezcla 50 clientes orgánicos gratuitos. El canal de anuncios solo tiene 1.40x. Triplicar inversión colapsa la caja."
          thresholds="< 1.0x (Rojo) | 1.0x - 3.0x (Amarillo) | ≥ 3.0x (Verde)"
        />

        <div className="rounded-xl border border-slate-200 p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Piso de Seguridad de Ricardo
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                $10,000 Mínimo
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {formatCurrency(simulation.minCash, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Caja mínima en 24 meses (Mes {simulation.minCashMonth}). Inicial: $60,000.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold flex items-center justify-between">
            <span>Estado de Caja:</span>
            <span className={simulation.floorBreached ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
              {simulation.floorBreached ? '¡Piso Perforado / Quiebra!' : 'Sólida y Segura'}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Clientes Activos Mes 24
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono">
                Base: 1,150
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {formatNumber(simulation.finalActiveCustomers)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Caja al Mes 24: {formatCurrency(simulation.endingCash, 0)}.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold flex items-center justify-between">
            <span>Evaluación Final:</span>
            <span className={simulation.finalActiveCustomers > 1500 ? 'text-emerald-600 font-bold' : 'text-slate-600 font-bold'}>
              {simulation.finalActiveCustomers > 1500 ? 'Crecimiento Alto' : 'Estable'}
            </span>
          </div>
        </div>
      </div>

      {/* Real-Time Interactive Sliders (Nivel 2) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Controles en Tiempo Real (Nivel 2)
            </h3>
            <p className="text-xs text-slate-500">
              Ajusta presupuesto publicitario, retención y estructura de planes para observar el impacto en caja
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            Restaurar originales
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Slider 1: Inversión en Anuncios */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Inversión en Anuncios:</span>
              <span className="font-mono text-blue-600 font-bold">{formatCurrency(adSpend, 0)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="30000"
              step="1000"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$0</span>
              <span>$10k (Base)</span>
              <span>$20k</span>
              <span>$30k (Valeria)</span>
            </div>
          </div>

          {/* Slider 2: Conversión de Trial */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Conversión de Trial:</span>
              <span className="font-mono text-emerald-600 font-bold">{trialConversionRate}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="25"
              step="0.5"
              value={trialConversionRate}
              onChange={(e) => setTrialConversionRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>10%</span>
              <span>14% (Base)</span>
              <span>18%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Slider 3: Precio Mensual */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Precio Mensual:</span>
              <span className="font-mono text-slate-900 font-bold">{formatCurrency(monthlyPrice, 0)}/mes</span>
            </div>
            <input
              type="range"
              min="20"
              max="35"
              step="1"
              value={monthlyPrice}
              onChange={(e) => setMonthlyPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$20</span>
              <span>$25 (Base)</span>
              <span>$29</span>
              <span>$35 (CitaYa)</span>
            </div>
          </div>

          {/* Slider 4: Mix de Plan Anual */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Proporción Plan Anual:</span>
              <span className="font-mono text-indigo-600 font-bold">{(annualPlanShare * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.40"
              step="0.05"
              value={annualPlanShare}
              onChange={(e) => setAnnualPlanShare(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0% (Base Supuesto)</span>
              <span>10% (Caso)</span>
              <span>20% (Propio)</span>
              <span>40%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashCurveChart
          title="Curva de Caja del Cliente: Mensual vs Anual"
          data={cashCurveData}
          dataKey="monthlyClient"
          dataKey2="annualClient"
          name1="Cliente Mensual ($25/mes, Payback M13)"
          name2="Cliente Anual ($240 Upfront, Payback M1)"
          paybackMonth={model.cashCurves.paybackMonthly}
        />

        <TrapComparisonChart caseKey="agendo" />
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LtvCacChart
          title="LTV vs CAC por Escenario"
          categories={[
            { name: 'A. Actual Paid', cac: 180.00, ltv: 251.29, ratio: 1.40 },
            { name: 'A. Actual Blended', cac: 105.00, ltv: 251.29, ratio: 2.39 },
            { name: 'B. Valeria ($30k)', cac: 277.14, ltv: 251.29, ratio: 0.91 }
          ]}
        />

        <InvestmentHistoryChart
          title="Inversión en Ads y Rendimientos Decrecientes"
          data={historyData}
          xKey="spend"
          yKey1="customers"
          yKey2="marginalCAC"
          label1="Clientes Pagados Ads"
          label2="CAC Marginal ($/cliente)"
        />
      </div>

      {/* Panel de Anuncios de Septiembre */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Canales de Anuncios de Septiembre (Meta vs Google)
          </h3>
          <p className="text-xs text-slate-500">
            Costo por registro reportado: $20.00 promedio (confundido erróneamente con costo por cliente pagado)
          </p>
        </div>
        <DataTable
          columns={channelColumns}
          data={channelData}
        />
      </div>

      {/* 24-Month Projection Table */}
      <CashFlowTable
        caseKey="agendo"
        monthlyData={simulation.monthlyBreakdown}
        safetyFloor={10000}
        initialCash={60000}
        month1Details={simulation.month1Verification}
      />

      {/* Mandatory Section: "EN QUÉ SE EQUIVOCÓ O NOS CONFUNDIÓ LA IA" */}
      <div className="bg-blue-50/80 rounded-2xl border border-blue-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-blue-700" />
          <h3 className="text-base font-bold text-blue-950 uppercase tracking-wide">
            En qué se equivocó o nos confundió la IA en el Caso Agendo
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-blue-200/60 space-y-2">
            <span className="font-bold text-slate-800 block">1. Resultado presentado por Valeria / IA:</span>
            <p className="text-slate-600 leading-relaxed">
              «CAC de $105 y LTV:CAC de 2.4. Cada dólar en marketing vuelve 2.4 veces. Con $30,000 tendríamos 1,500 registros y la plataforma escala sin problemas.»
            </p>
            <span className="font-bold text-rose-700 block pt-1">Problema detectado:</span>
            <p className="text-slate-600 leading-relaxed">
              Valeria comete tres errores metodológicos graves: 1) Confunde trial ($20) con cliente pagado; 2) Usa CAC Blended mezclando 50 clientes orgánicos gratuitos para bajar artificialmente el CAC de anuncios; 3) Asume LTV sin tope de tiempo o escala lineal sin rendimientos decrecientes.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-200/60 space-y-2">
            <span className="font-bold text-slate-800 block">2. Razón por la que estaba equivocado:</span>
            <p className="text-slate-600 leading-relaxed">
              El CAC Paid real de los anuncios es de <strong>$180.00</strong> ($10k ads + $1.2k vendedora + $1.4k comisión entre 70 clientes). El LTV a 24 meses es de $251.29. Por tanto, el LTV:CAC Paid real es de <strong>1.40x</strong>, no 2.4x. Además, con $30,000 en el historial solo se consiguen 900 trials (126 clientes pagados), disparando el CAC marginal a $398 y el CAC promedio a $277 (LTV:CAC 0.91x).
            </p>
            <span className="font-bold text-emerald-700 block pt-1">Resultado Corregido y Fórmula:</span>
            <p className="text-slate-600 font-mono">
              CAC Paid = ($10,000 + $1,200 + $1,400) / 70 = $180.00.<br />
              LTV:CAC Paid = $251.29 / $180 = 1.40x. Triplicar quema los $60k en 6 meses.
            </p>
          </div>
        </div>
      </div>

      {/* One-Page Executive Recommendation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              Dictamen para el Inversionista Ángel
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Recomendación Ejecutiva para Ricardo Méndez: «NO TRIPLICAR · OPTIMIZAR FUNNEL»
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold font-mono">
            RECHAZAR APUESTA DE $30K
          </span>
        </div>

        <div className="prose prose-sm text-slate-700 max-w-none space-y-3 leading-relaxed text-xs sm:text-sm">
          <p>
            <strong>1. Diagnóstico para Ricardo:</strong> Valeria no tiene razón. Su lámina de LTV:CAC 2.4 está viciada porque oculta que el 42% de los clientes son orgánicos gratuitos. Los anuncios pagados rinden solo 1.40x y tardan 13 meses en recuperar el CAC. Si Agendo triplica el gasto a $30,000, los rendimientos decrecientes del historial reducen el LTV:CAC a 0.91x, quemando los $60,000 restantes en menos de medio año.
          </p>
          <p>
            <strong>2. Qué tendría que pasar para que la apuesta funcione:</strong> Para poder escalar el gasto publicitario con salud, Agendo necesita elevar su LTV:CAC Paid por encima de 2.0x antes de aumentar la inversión.
          </p>
          <p>
            <strong>3. Plan de Dos Cambios Propuestos:</strong>
            <br />
            • <em>Cambio 1: Empujar el Plan Anual ($240 adelantados)</em> al 20% de los clientes nuevos. El cliente anual devuelve el CAC en el Mes 1 con $187.20 de margen inmediato, eliminando el agujero de caja del payback de 13 meses.
            <br />
            • <em>Cambio 2: Optimizar onboarding y subir conversión de trial del 14% al 16.5%</em>, además de subir precio a $29/mes (el competidor CitaYa cobra $35).
          </p>
          <p>
            <strong>4. Resultado Financiero:</strong> Con esta optimización y una inversión moderada de $12,000/mes, Agendo genera $245,000 de caja al Mes 24, mantiene a raya la necesidad de vendedoras adicionales y alcanza más de 1,900 clientes activos sin poner en riesgo los $10,000 de piso de seguridad.
          </p>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
