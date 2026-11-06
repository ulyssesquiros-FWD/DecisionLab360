// DecisionLab 360 - Caso A: Tueste (E-commerce DTC)
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Coffee,
  Sliders,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Package,
  DollarSign,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Gift
} from 'lucide-react';
import KPICard from '../../Components/KPICard/KPICard.jsx';
import MetricIndicator from '../../Components/MetricIndicator/MetricIndicator.jsx';
import ScenarioCard from '../../Components/ScenarioCard/ScenarioCard.jsx';
import CashCurveChart from '../../Components/Charts/CashCurveChart.jsx';
import LtvCacChart from '../../Components/Charts/LtvCacChart.jsx';
import InvestmentHistoryChart from '../../Components/Charts/InvestmentHistoryChart.jsx';
import TrapComparisonChart from '../../Components/Charts/TrapComparisonChart.jsx';
import CashFlowTable from '../../Components/CashFlowTable/CashFlowTable.jsx';
import DataTable from '../../Components/DataTable/DataTable.jsx';
import TuesteGrowthHub from '../Growth/Tueste/TuesteGrowthHub.jsx';

import { runTuesteModel, simulateTueste24Months } from '../../Engines/tuesteEngine.js';
import { tuesteOriginalData } from '../../Data/tuesteData.js';
import { formatCurrency, formatPercent, formatRatio, formatNumber } from '../../Services/calculationService.js';
import { storageService } from '../../Services/storageService.js';
import { exportService } from '../../Services/exportService.js';

export default function Tueste() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSession, setActiveSession] = useState(
    searchParams.get('session') === '2' ? 'session2' : 'session1'
  );
  // Estado de inputs para interactividad
  const [metaSpend, setMetaSpend] = useState(8000);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [customerPaysShipping, setCustomerPaysShipping] = useState(false);
  const [packActive, setPackActive] = useState(false);
  const [singleOrderShare, setSingleOrderShare] = useState(0.85);
  const [activeScenario, setActiveScenario] = useState('current');

  // Ejecutar motor financiero
  const model = runTuesteModel({
    metaSpend,
    discountPercent,
    customerPaysShipping,
    packActive,
    singleOrderShare
  });

  // Ejecutar simulación 24 meses
  const simulation = simulateTueste24Months({
    fixedMetaSpend: metaSpend,
    customerPaysShipping,
    discountMonth1Only: discountPercent > 0,
    singleOrderShare
  });

  // Cambiar de escenario predefinido
  const applyScenario = (scenKey) => {
    setActiveScenario(scenKey);
    const scen = tuesteOriginalData.scenarios[scenKey];
    if (scenKey === 'current') {
      setMetaSpend(8000);
      setDiscountPercent(0);
      setCustomerPaysShipping(false);
      setPackActive(false);
      setSingleOrderShare(0.85);
    } else if (scenKey === 'agencyProposal') {
      setMetaSpend(16000);
      setDiscountPercent(30);
      setCustomerPaysShipping(false);
      setPackActive(false);
      setSingleOrderShare(0.85);
    } else if (scenKey === 'recommendedOwn') {
      setMetaSpend(8000);
      setDiscountPercent(0);
      setCustomerPaysShipping(true);
      setPackActive(true);
      setSingleOrderShare(0.80);
    }
  };

  const handleReset = () => {
    storageService.resetCaseAssumptions('tueste');
    applyScenario('current');
  };

  const handleExportExcel = () => {
    exportService.exportCaseToExcel({
      caseKey: 'tueste',
      caseName: 'Tueste (E-commerce DTC)',
      modelData: model,
      simulationData: simulation,
      scenariosData: [
        {
          name: 'A. Situación Actual ($8k)',
          spend: 8000,
          customersOrSales: '165 nuevos',
          cac: 54.55,
          ltv: 54.88,
          ltvToCac: 1.01,
          minCash: 24447,
          endingCash: 79596,
          riskNote: 'Empate 1:1, vulnerable'
        },
        {
          name: 'B. Propuesta Agencia ($16k)',
          spend: 16000,
          customersOrSales: '235 nuevos',
          cac: 72.34,
          ltv: 45.12,
          ltvToCac: 0.62,
          minCash: 5200,
          endingCash: 12400,
          riskNote: 'LTV:CAC 0.62x destruye caja'
        },
        {
          name: 'C. Propuesta Propia (Pack & Envío)',
          spend: 8000,
          customersOrSales: '165 nuevos',
          cac: 54.55,
          ltv: 78.40,
          ltvToCac: 1.44,
          minCash: 28000,
          endingCash: 112000,
          riskNote: 'Margen robusto y caja segura'
        }
      ]
    });
  };

  const handleExportPDF = () => {
    exportService.exportCaseToPDF({
      caseKey: 'tueste',
      caseName: 'Tueste',
      modelData: model,
      simulationData: simulation,
      recommendation: {
        decision: 'OPTIMIZAR',
        alternative: 'Rechazar la propuesta de la agencia de duplicar a $16k con 30% de descuento. En su lugar, cobrar $4.50 de envío en pedidos de 2 bolsas y lanzar el pack de 3 bolsas a $48 con envío gratis.',
        summary: 'La duplicación de presupuesto con descuento reduciría el LTV a $45.12 frente a un CAC de $72.34 (ratio 0.62x), destruyendo $25,000 de caja en 6 meses.'
      },
      trapAnalysis: tuesteOriginalData.trapAnalysis
    });
  };

  // Historial de inversión con CAC marginal formateado para gráfico
  const historyChartData = [
    { spend: 0, customers: 0, marginalCAC: 0 },
    { spend: 4000, customers: 100, marginalCAC: 40 },
    { spend: 8000, customers: 165, marginalCAC: 61.54 },
    { spend: 12000, customers: 210, marginalCAC: 88.89 },
    { spend: 16000, customers: 235, marginalCAC: 160.00 },
    { spend: 20000, customers: 250, marginalCAC: 266.67 }
  ];

  // Campañas de septiembre para la tabla
  const campaignColumns = [
    { key: 'name', label: 'Campaña Meta Ads' },
    { key: 'spend', label: 'Inversión', align: 'right', render: (v) => formatCurrency(v, 0) },
    { key: 'purchases', label: 'Compras Atribuidas', align: 'right', render: (v) => formatNumber(v) },
    { key: 'revenue', label: 'Ingresos Atribuidos', align: 'right', render: (v) => formatCurrency(v, 0) },
    { key: 'roas', label: 'ROAS Meta', align: 'right', render: (v) => formatRatio(v) },
    { key: 'ctr', label: 'CTR', align: 'right', render: (v) => formatPercent(v) }
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
                ? 'bg-amber-600 text-white shadow-sm'
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
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>SESIÓN 2 — Solución de Growth (Tueste Rewards)</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">Nuevo</span>
          </button>
        </div>

        <div className="text-right pr-2">
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
            {activeSession === 'session1' ? 'Modelado Financiero 24M' : 'Loop de Referidos & Adquisición'}
          </span>
        </div>
      </div>

      {activeSession === 'session2' ? (
        <TuesteGrowthHub />
      ) : (
        <div className="space-y-8">
          {/* Top Banner with Brand Identity */}
          <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 rounded-2xl p-6 sm:p-8 text-white shadow-md border border-amber-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Coffee className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200 font-mono">
              Caso A · E-commerce DTC
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tueste: Café de Especialidad
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl mt-1 leading-relaxed">
            Dilema de Diego: ¿Firmar la propuesta de Black Friday para duplicar anuncios a $16,000 con 30% de descuento en el primer pedido?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-700/60 hover:bg-amber-700 border border-amber-500/40 rounded-lg text-xs font-semibold text-white transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-xs font-semibold text-white shadow-sm transition-colors"
          >
            <span>Informe PDF</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900/40 hover:bg-slate-900/70 border border-amber-400/30 rounded-lg text-xs font-semibold text-amber-200 transition-colors"
            title="Restaurar a datos originales de septiembre"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar</span>
          </button>
        </div>
      </div>

      {/* Selector de Escenarios Rápidos */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Escenario de Análisis:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyScenario('current')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'current'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            A. Situación Actual ($8,000)
          </button>
          <button
            onClick={() => applyScenario('agencyProposal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'agencyProposal'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            B. Propuesta Agencia ($16k + 30% desc)
          </button>
          <button
            onClick={() => applyScenario('recommendedOwn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'recommendedOwn'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            C. Propuesta Propia (Pack $48 + Envío)
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Margen Contribución (Pedido Suelto)"
          value={formatCurrency(model.regularSingleOrder.contribution)}
          subvalue={`${formatPercent(model.regularSingleOrder.marginPercent)}`}
          badgeText={customerPaysShipping ? 'Envío Cobrado' : 'Envío Gratis'}
          badgeType={customerPaysShipping ? 'success' : 'neutral'}
          helperText="Precio $34 - Café $10.88 - Pasarela $1.53 - Empaque $1.20 - Envío Tueste"
        />

        <KPICard
          title="ROAS Break-even (Equilibrio)"
          value={formatRatio(model.roasBreakEvenSingle)}
          subvalue={`1 ÷ ${formatPercent(model.regularSingleOrder.marginPercent)}`}
          badgeText="Umbral Mínimo"
          badgeType="info"
          helperText="ROAS publicitario mínimo necesario para no perder dinero en el primer pedido"
        />

        <KPICard
          title="ROAS Real 1er Pedido"
          value={formatRatio(model.roasRealFirstOrder)}
          subvalue={`Claim Meta: ${formatRatio(model.metaReportedROAS)}`}
          badgeText="Crítico / Pérdida"
          badgeType="danger"
          helperText="165 clientes nuevos x $34 ÷ $8,000 invertidos en Meta. Pierde dinero en 1er pedido."
        />

        <KPICard
          title="CAC Real (Con Agencia)"
          value={formatCurrency(model.cacReal)}
          subvalue={`CAC Ads: ${formatCurrency(model.cacAds)}`}
          badgeText="Costo Real"
          badgeType="warning"
          helperText="($8,000 en Meta + $1,000 Fee Agencia) ÷ 165 clientes nuevos reales"
        />
      </div>

      {/* Second Row of KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="LTV a 12 Meses"
          value={formatCurrency(model.ltvResults.blendedLTV)}
          subvalue={`Suelto: ${formatCurrency(model.ltvResults.singleCustomerLTV)} | Sub: ${formatCurrency(model.ltvResults.subscriberLTV)}`}
          badgeText="Sobre Margen"
          badgeType="info"
          helperText="Calculado estrictamente sobre contribución (3 pedidos en 12m y churn 9% en suscripción)"
        />

        <KPICard
          title="Ratio LTV : CAC Real"
          value={formatRatio(model.ltvToCac)}
          subvalue={model.ltvToCac >= 3.0 ? 'Saludable' : model.ltvToCac >= 1.0 ? 'Al Límite' : 'Destructor'}
          badgeText={model.ltvToCacStatus.toUpperCase()}
          badgeType={model.ltvToCacStatus === 'green' ? 'success' : model.ltvToCacStatus === 'yellow' ? 'warning' : 'danger'}
          helperText="$54.88 LTV ÷ $54.55 CAC Real. Apenas empata en un año completo de vida del cliente."
        />

        <KPICard
          title="Payback de un Cliente"
          value={model.paybackMonth ? `${Number(model.paybackMonth).toFixed(1)} meses` : '> 12 meses'}
          subvalue="Punto de Equilibrio"
          badgeText={model.paybackMonth && model.paybackMonth <= 6 ? 'Rápido' : 'Lento'}
          badgeType={model.paybackMonth && model.paybackMonth <= 6 ? 'success' : 'warning'}
          helperText="Mes exacto en que la contribución acumulada del cliente recupera los $54.55 del CAC"
        />

        <KPICard
          title="CAC Marginal (Tramo Actual)"
          value={formatCurrency(model.marginalCAC)}
          subvalue="Costo de Cliente Extra"
          badgeText="Decreciente"
          badgeType="danger"
          helperText="Subir de $8k a $12k cuesta $88.89/cliente. Subir a $16k cuesta $160/cliente."
        />
      </div>

      {/* Traffic light / Semaphore Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricIndicator
          status={model.ltvToCacStatus}
          label="Semáforo de Salud LTV:CAC"
          value={formatRatio(model.ltvToCac)}
          description="Un ratio de 1.01x significa que Tueste tarda 12 meses en empatar el costo de adquisición de un cliente nuevo. Duplicar la inversión con este ratio destruye capital."
          thresholds="< 1.0x (Rojo) | 1.0x - 3.0x (Amarillo) | ≥ 3.0x (Verde)"
        />

        <div className="rounded-xl border border-slate-200 p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Piso Mínimo de Seguridad (Camila)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                $5,000 Mínimo
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {formatCurrency(simulation.minCash, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Caja mínima alcanzada en la simulación a 24 meses (Mes {simulation.minCashMonth}).
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold flex items-center justify-between">
            <span>Estado de Respaldo:</span>
            <span className={simulation.floorBreached ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
              {simulation.floorBreached ? '¡Piso Perforado!' : 'Caja Segura'}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Saldo Final de Caja (Mes 24)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono">
                Horizonte 24M
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {formatCurrency(simulation.endingCash, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Termina con {simulation.finalActiveSubscribers} suscriptores activos recurrentes.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold flex items-center justify-between">
            <span>Regla Mes 13 Inversión:</span>
            <span className={simulation.ruleSpendBreached ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
              {simulation.ruleSpendBreached ? 'Violada' : 'Cumplida'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Real-Time Sliders */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Controles en Tiempo Real (Nivel 2)
            </h3>
            <p className="text-xs text-slate-500">
              Modifica los supuestos para recalcular inmediatamente unit economics, LTV, semáforos y simulación
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            Reestablecer valores base
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Slider 1: Inversión Meta */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Inversión Mensual Meta:</span>
              <span className="font-mono text-blue-600 font-bold">{formatCurrency(metaSpend, 0)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={metaSpend}
              onChange={(e) => setMetaSpend(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$0</span>
              <span>$8,000 (Base)</span>
              <span>$16,000 (Agencia)</span>
              <span>$20,000</span>
            </div>
          </div>

          {/* Slider 2: Descuento 1er Pedido */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Descuento 1er Pedido Suelto:</span>
              <span className="font-mono text-rose-600 font-bold">{discountPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0% (Base)</span>
              <span>30% (Agencia)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Toggle: Envío Cobrado en 2 Bolsas */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={customerPaysShipping}
                onChange={(e) => setCustomerPaysShipping(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Cliente Paga Envío ($4.50)
                </span>
                <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                  En pedidos de 2 bolsas, el cliente asume el envío. Aumenta margen a 52.4%.
                </span>
              </div>
            </label>
          </div>

          {/* Toggle: Pack de 3 Bolsas */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={packActive}
                onChange={(e) => setPackActive(e.target.checked)}
                className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Activar Pack 3 Bolsas ($48)
                </span>
                <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                  Envío gratis desde $45. Contribución sube a $23.62 por pack.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Core Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashCurveChart
          title="Curva de Caja del Cliente (Payback Mes a Mes)"
          data={model.customerCashCurve}
          dataKey="cumulativeCash"
          name1="Caja Acumulada del Cliente"
          paybackMonth={model.paybackMonth}
        />

        <TrapComparisonChart caseKey="tueste" />
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LtvCacChart
          title="LTV vs CAC Real por Escenario"
          categories={[
            { name: 'A. Actual ($8k)', cac: 54.55, ltv: 54.88, ratio: 1.01 },
            { name: 'B. Agencia ($16k + 30%)', cac: 72.34, ltv: 45.12, ratio: 0.62 },
            { name: 'C. Propia (Pack & Envío)', cac: 54.55, ltv: 78.40, ratio: 1.44 }
          ]}
        />

        <InvestmentHistoryChart
          title="Historial de Inversión Meta y CAC Marginal"
          data={historyChartData}
          xKey="spend"
          yKey1="customers"
          yKey2="marginalCAC"
          label1="Clientes Nuevos Meta"
          label2="CAC Marginal ($/cliente)"
        />
      </div>

      {/* Campañas de Septiembre & Realidad de Atribución */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Desglose de Campañas de Septiembre (Ads Manager vs Shopify)
          </h3>
          <p className="text-xs text-slate-500">
            Observa cómo el 30% del presupuesto se gastó en Retargeting a personas que ya habían comprado
          </p>
        </div>
        <DataTable
          columns={campaignColumns}
          data={tuesteOriginalData.septemberBaseline.campaigns}
        />
      </div>

      {/* 24-Month Cash Flow Projection Table */}
      <CashFlowTable
        caseKey="tueste"
        monthlyData={simulation.monthlyBreakdown}
        safetyFloor={5000}
        initialCash={35000}
        month1Details={simulation.month1Verification}
      />

      {/* Mandatory Section: "EN QUÉ SE EQUIVOCÓ O NOS CONFUNDIÓ LA IA" */}
      <div className="bg-amber-50/80 rounded-2xl border border-amber-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h3 className="text-base font-bold text-amber-950 uppercase tracking-wide">
            En qué se equivocó o nos confundió la IA en el Caso Tueste
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-2">
            <span className="font-bold text-slate-800 block">1. Resultado presentado por la IA / Agencia:</span>
            <p className="text-slate-600 leading-relaxed">
              «Con un ROAS de 3.0 cada dólar invertido devuelve $3. Duplicar la inversión a $16,000 en Black Friday permitirá comprar la segunda tostadora en diciembre.»
            </p>
            <span className="font-bold text-rose-700 block pt-1">Problema detectado:</span>
            <p className="text-slate-600 leading-relaxed">
              La IA toma el ROAS reportado por Meta de forma acrítica sin verificar las compras reales en Shopify ni el costo de adquisición de clientes genuinamente nuevos.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-2">
            <span className="font-bold text-slate-800 block">2. Razón por la que estaba equivocado:</span>
            <p className="text-slate-600 leading-relaxed">
              Meta usa ventana de atribución de 7 días clic / 1 día visualización y se atribuye 706 compras ($24,000 de los $28,000 totales de la tienda). $2,400 se gastan en retargeting de compradores recientes. El ROAS real de clientes nuevos en su primer pedido es de apenas <strong>0.70x</strong>, perdiendo dinero con cada compra inicial.
            </p>
            <span className="font-bold text-emerald-700 block pt-1">Resultado Corregido y Fórmula:</span>
            <p className="text-slate-600 font-mono">
              ROAS Real Primer Pedido = (165 clientes nuevos x $34) / $8,000 = 0.70x.<br />
              LTV:CAC real = 1.01x. Escalar con 30% de descuento colapsaría la empresa.
            </p>
          </div>
        </div>
      </div>

      {/* One-Page Executive Recommendation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              Dictamen de Comité de Inversión
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Recomendación Ejecutiva para Diego Ramírez: «OPTIMIZAR Y CONDICIONAR ESCALA»
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
            NO FIRMAR CON AGENCIA
          </span>
        </div>

        <div className="prose prose-sm text-slate-700 max-w-none space-y-3 leading-relaxed text-xs sm:text-sm">
          <p>
            <strong>1. Diagnóstico Clínico:</strong> Camila tiene razón. Aunque Meta reporta un ROAS de 3.0, el saldo bancario de Tueste cayó $3,200 en septiembre. La razón matemática es que el ROAS real del cliente nuevo es de solo 0.70x (por debajo del equilibrio de 2.14x) y el LTV a 12 meses ($54.88) apenas cubre el CAC real con agencia ($54.55), dejando un margen nulo (ratio 1.01x).
          </p>
          <p>
            <strong>2. Rechazo de la Propuesta de Black Friday:</strong> Duplicar a $16,000 con un 30% de descuento en el primer pedido reduce el margen de dicho pedido a $6.15 (25.8% de margen), eleva el CAC marginal a $114-$160 por cliente y derrumba el ratio LTV:CAC a 0.62x. Tueste consumiría sus $35,000 en 4 meses y se quedaría sin liquidez antes de fin de año.
          </p>
          <p>
            <strong>3. Los Dos Cambios Propuestos:</strong>
            <br />
            • <em>Cambio 1: Hacer que el cliente pague el envío de $4.50 en pedidos de 2 bolsas</em>, ofreciendo envío gratis únicamente a partir de $45. Esto eleva el margen de contribución del pedido suelto de $15.89 a $20.39 (+28% de margen neto).
            <br />
            • <em>Cambio 2: Lanzar el Pack de 3 bolsas a $48 con envío gratis</em>. Genera $23.62 de contribución unitaria (49.2% de margen) e incentiva a aumentar el ticket promedio sin recurrir a descuentos destructivos.
          </p>
          <p>
            <strong>4. Impacto Proyectado:</strong> Con estos dos ajustes, el LTV a 12 meses sube a $78.40, elevando el ratio LTV:CAC a 1.44x. La caja a 24 meses alcanza los <strong>$112,000</strong>, permitiendo comprar la segunda tostadora de $14,000 en el mes 12 sin poner en riesgo el piso de seguridad de $5,000.
          </p>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
