// DecisionLab 360 - Caso C: Sol de Casa (Lead Generation Solar)
import React, { useState } from 'react';
import {
  Sun,
  Sliders,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Users,
  DollarSign,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Zap
} from 'lucide-react';
import KPICard from '../../Components/KPICard/KPICard.jsx';
import MetricIndicator from '../../Components/MetricIndicator/MetricIndicator.jsx';
import ScenarioCard from '../../Components/ScenarioCard/ScenarioCard.jsx';
import CashCurveChart from '../../Components/Charts/CashCurveChart.jsx';
import LtvCacChart from '../../Components/Charts/LtvCacChart.jsx';
import InvestmentHistoryChart from '../../Components/Charts/InvestmentHistoryChart.jsx';
import TrapComparisonChart from '../../Components/Charts/TrapComparisonChart.jsx';
import FunnelChart from '../../Components/Charts/FunnelChart.jsx';
import CashFlowTable from '../../Components/CashFlowTable/CashFlowTable.jsx';
import DataTable from '../../Components/DataTable/DataTable.jsx';

import { runSolDeCasaModel, simulateSolDeCasa24Months } from '../../Engines/solDeCasaEngine.js';
import { solDeCasaOriginalData } from '../../Data/solDeCasaData.js';
import { formatCurrency, formatPercent, formatRatio, formatNumber } from '../../Services/calculationService.js';
import { storageService } from '../../Services/storageService.js';
import { exportService } from '../../Services/exportService.js';

export default function SolDeCasa() {
  // Estado de inputs para interactividad
  const [metaSpend, setMetaSpend] = useState(4000);
  const [googleSpend, setGoogleSpend] = useState(4000);
  const [extraTechnicians, setExtraTechnicians] = useState(0);
  const [fastResponseActive, setFastResponseActive] = useState(false);
  const [batteryOfferActive, setBatteryOfferActive] = useState(false);
  const [activeScenario, setActiveScenario] = useState('current');

  // Ejecución de motor financiero
  const model = runSolDeCasaModel({
    metaSpend,
    googleSpend,
    extraTechnicians,
    fastResponseActive,
    batteryOfferActive
  });

  // Ejecución de simulación 24 meses
  const simulation = simulateSolDeCasa24Months({
    fixedMetaSpend: metaSpend,
    fixedGoogleSpend: googleSpend,
    extraTechHires: extraTechnicians > 0 ? [2] : [],
    fastResponseActive
  });

  // Aplicar escenarios predefinidos
  const applyScenario = (scenKey) => {
    setActiveScenario(scenKey);
    if (scenKey === 'current') {
      setMetaSpend(4000);
      setGoogleSpend(4000);
      setExtraTechnicians(0);
      setFastResponseActive(false);
      setBatteryOfferActive(false);
    } else if (scenKey === 'agencyProposal') {
      setMetaSpend(8000);
      setGoogleSpend(0);
      setExtraTechnicians(0);
      setFastResponseActive(false);
      setBatteryOfferActive(false);
    } else if (scenKey === 'recommendedOwn') {
      setMetaSpend(4000);
      setGoogleSpend(4000);
      setExtraTechnicians(1);
      setFastResponseActive(true);
      setBatteryOfferActive(true);
    }
  };

  const handleReset = () => {
    storageService.resetCaseAssumptions('solDeCasa');
    applyScenario('current');
  };

  const handleExportExcel = () => {
    exportService.exportCaseToExcel({
      caseKey: 'solDeCasa',
      caseName: 'Sol de Casa (Lead Gen Solar)',
      modelData: model,
      simulationData: simulation,
      scenariosData: [
        {
          name: 'A. Situación Actual ($4k M / $4k G)',
          spend: 8000,
          customersOrSales: `${model.totalSales.toFixed(1)} ventas`,
          cac: model.cacRealTotal,
          ltv: model.contributionPerSale,
          ltvToCac: model.ltvToCacTotal,
          minCash: 12000,
          endingCash: 117273,
          riskNote: 'Capacidad al 97%, Google indispensable'
        },
        {
          name: 'B. Propuesta Leadly ($8k M / $0 G)',
          spend: 8000,
          customersOrSales: '17.5 ventas',
          cac: 718.13,
          ltv: 1625.00,
          ltvToCac: 2.26,
          minCash: 3500,
          endingCash: 42000,
          riskNote: 'Ventas caen 21%, satura visitas baratas'
        },
        {
          name: 'C. Propuesta Propia (Filtro + 1 Técnico)',
          spend: 8000,
          customersOrSales: '28.2 ventas',
          cac: 495.00,
          ltv: 1701.50,
          ltvToCac: 3.44,
          minCash: 15000,
          endingCash: 215000,
          riskNote: 'Máxima conversión y capacidad ampliada'
        }
      ]
    });
  };

  const handleExportPDF = () => {
    exportService.exportCaseToPDF({
      caseKey: 'solDeCasa',
      caseName: 'Sol de Casa',
      modelData: model,
      simulationData: simulation,
      recommendation: {
        decision: 'OPTIMIZAR',
        alternative: 'Rechazar la propuesta de Leadly de mover todo a Meta. Conservar Google Ads ($4,000), implementar respuesta rápida (< 5 min) con filtro de dos preguntas en Meta y contratar 1 técnico extra ($1,800) en el Mes 2 para expandir capacidad a 150 visitas.',
        summary: 'Leadly vende la ilusión del lead de $8, pero el cliente cerrado de Meta cuesta $718 (34% más caro que Google con $535). Mover todo a Meta reduce las ventas de 22 a 17.5 por mes y asfixia la capacidad.'
      },
      trapAnalysis: solDeCasaOriginalData.trapAnalysis
    });
  };

  // Etapas del embudo comparativo
  const funnelStages = [
    { stage: '1. Leads', meta: model.metaFunnel.leads, google: model.googleFunnel.leads },
    { stage: '2. Contactados', meta: model.metaFunnel.contactedLeads, google: model.googleFunnel.contactedLeads },
    { stage: '3. Visitas Agendadas', meta: model.metaFunnel.scheduledVisits, google: model.googleFunnel.scheduledVisits },
    { stage: '4. Visitas Hechas', meta: model.metaVisitsDone, google: model.googleVisitsDone },
    { stage: '5. Ventas Cerradas', meta: model.metaSales, google: model.googleSales }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner with Brand Identity */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-md border border-emerald-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sun className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 font-mono">
              Caso C · Lead Generation Solar
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sol de Casa: Paneles Solares Residenciales
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mt-1 leading-relaxed">
            Dilema de Andrés Villalobos: La agencia Leadly quiere mover todo el presupuesto a Meta porque el lead cuesta $8 vs $40 en Google. «¿Más leads siempre es mejor?»
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-500/40 rounded-lg text-xs font-semibold text-white transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-semibold text-white shadow-sm transition-colors"
          >
            <span>Informe PDF</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900/40 hover:bg-slate-900/70 border border-emerald-400/30 rounded-lg text-xs font-semibold text-emerald-200 transition-colors"
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
            Escenario de Evaluación:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyScenario('current')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'current'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            A. Situación Actual ($4k Meta / $4k Google)
          </button>
          <button
            onClick={() => applyScenario('agencyProposal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'agencyProposal'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            B. Propuesta Leadly ($8k Meta / $0 Google)
          </button>
          <button
            onClick={() => applyScenario('recommendedOwn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeScenario === 'recommendedOwn'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            C. Propuesta Propia (Filtro + 1 Técnico Extra)
          </button>
        </div>
      </div>

      {/* Alerta de Capacidad si excede 100 */}
      {model.capacityExceeded && (
        <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-900 leading-relaxed">
            <span className="font-bold">¡Cuello de Botella Operativo Detectado!</span> Se solicitaron{' '}
            <strong>{formatNumber(model.totalRequestedVisits, 1)} visitas</strong> pero la capacidad técnica es de solo{' '}
            <strong>{model.totalCapacity} visitas</strong>. Siguiendo la regla del caso, se priorizan las visitas de Google
            y se pierden <strong>{formatNumber(model.visitsLostToCapacity, 1)} visitas de Meta</strong> por falta de técnicos.
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="CAC Real Google vs Meta"
          value={formatCurrency(model.cacRealGoogle)}
          subvalue={`Meta: ${formatCurrency(model.cacRealMeta)} (+34%)`}
          badgeText="Google Más Barato"
          badgeType="success"
          helperText="Incluye costo de $60 por visita técnica. Google cuesta menos por venta cerrada."
        />

        <KPICard
          title="CPL Meta vs Google"
          value={formatCurrency(model.metaFunnel.cpl)}
          subvalue={`Google: ${formatCurrency(model.googleFunnel.cpl)}`}
          badgeText="Métrica Trampa"
          badgeType="warning"
          helperText="El lead de Meta es 5x más barato, pero tiene 18% teléfonos inválidos y cierra a solo 18%."
        />

        <KPICard
          title="Valor de una Visita Técnica"
          value={`+${formatCurrency(model.valueOfVisitGoogle)}`}
          subvalue={`Meta: +${formatCurrency(model.valueOfVisitMeta)}`}
          badgeText="Google Prioritario"
          badgeType="info"
          helperText="(Tasa Cierre x $1,625 margen) - $60 costo visita. Una visita de Google vale casi el doble."
        />

        <KPICard
          title="Ventas Totales Proyectadas"
          value={`${formatNumber(model.totalSales, 1)} ventas`}
          subvalue={`Google: ${model.googleSales.toFixed(1)} | Meta: ${model.metaSales.toFixed(1)}`}
          badgeText={model.totalSales >= 22 ? 'Crecimiento' : 'Caída'}
          badgeType={model.totalSales >= 22 ? 'success' : 'danger'}
          helperText="Ventas mensuales generadas dentro de la capacidad disponible de visitas"
        />
      </div>

      {/* Second Row of KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Capacidad de Visitas Usada"
          value={formatPercent(model.capacityUsagePercent)}
          subvalue={`${Number(model.totalVisitsDone).toFixed(0)} / ${model.totalCapacity} visitas`}
          badgeText={model.capacityExceeded ? 'SATURADA' : 'HOLGADA'}
          badgeType={model.capacityExceeded ? 'danger' : 'success'}
          helperText="Base: 100 visitas (2 técnicos). Cada técnico extra suma +50 visitas/mes."
        />

        <KPICard
          title="Visitas Requeridas por Venta"
          value={`${model.visitsPerSaleGoogle.toFixed(1)} visitas (G)`}
          subvalue={`Meta: ${model.visitsPerSaleMeta.toFixed(1)} visitas`}
          badgeText="Eficiencia Google"
          badgeType="info"
          helperText="Google requiere 3.33 visitas por venta. Meta requiere 5.56 visitas ($333 en viáticos)."
        />

        <KPICard
          title="LTV : CAC Real (Consolidado)"
          value={formatRatio(model.ltvToCacTotal)}
          subvalue={`G: ${formatRatio(model.ltvToCacGoogle)} | M: ${formatRatio(model.ltvToCacMeta)}`}
          badgeText={model.ltvToCacStatus.toUpperCase()}
          badgeType={model.ltvToCacStatus === 'green' ? 'success' : 'warning'}
          helperText="Margen de venta $1,625 dividido entre el CAC Real con visitas técnicas"
        />

        <KPICard
          title="Contribución Unitaria Neta"
          value={formatCurrency(model.contributionPerSale)}
          subvalue="Por Instalación"
          badgeText="Margen 25%"
          badgeType="neutral"
          helperText="Precio $6,500 - Equipos 55% ($3,575) - Instalación 17% ($1,105) - Comisión 3% ($195)"
        />
      </div>

      {/* Semaphores & Thresholds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricIndicator
          status={model.ltvToCacStatus}
          label="Semáforo de Salud LTV:CAC"
          value={formatRatio(model.ltvToCacTotal)}
          description="Google opera en zona verde saludable (3.03x). Meta opera en zona amarilla (2.26x). Si se elimina Google, el retorno de Sol de Casa se deteriora."
          thresholds="< 1.0x (Rojo) | 1.0x - 3.0x (Amarillo) | ≥ 3.0x (Verde)"
        />

        <div className="rounded-xl border border-slate-200 p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Piso de Seguridad de Sofía
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                $5,000 Mínimo
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {formatCurrency(simulation.minCash, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Caja mínima en 24 meses (Mes {simulation.minCashMonth}). Inicial: $12,000.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold flex items-center justify-between">
            <span>Estado de Caja:</span>
            <span className={simulation.floorBreached ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
              {simulation.floorBreached ? '¡Peligro: Piso Roto!' : 'Caja Respaldada'}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Instalaciones Totales (24M)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono">
                Horizonte 24 Meses
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {Number(simulation.totalSalesOver24Months).toFixed(0)} casas
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Caja final generada al Mes 24: {formatCurrency(simulation.endingCash, 0)}.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold flex items-center justify-between">
            <span>Regla Mes 19 Inversión:</span>
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
              Modifica presupuesto por canal, contratación de técnicos y mejoras de embudo en vivo
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            Restaurar valores base
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Slider 1: Meta Spend */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Gasto Meta:</span>
              <span className="font-mono text-amber-600 font-bold">{formatCurrency(metaSpend, 0)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={metaSpend}
              onChange={(e) => setMetaSpend(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$0</span>
              <span>$4k (Base)</span>
              <span>$8k</span>
              <span>$10k</span>
            </div>
          </div>

          {/* Slider 2: Google Spend */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Gasto Google:</span>
              <span className="font-mono text-emerald-600 font-bold">{formatCurrency(googleSpend, 0)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="8000"
              step="500"
              value={googleSpend}
              onChange={(e) => setGoogleSpend(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>$0 (Leadly)</span>
              <span>$4k (Base)</span>
              <span>$8k (Tope)</span>
            </div>
          </div>

          {/* Selector: Técnicos Extra */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Técnicos Extra:</span>
              <span className="font-mono text-blue-600 font-bold">+{extraTechnicians} ({100 + extraTechnicians * 50} vis.)</span>
            </div>
            <select
              value={extraTechnicians}
              onChange={(e) => setExtraTechnicians(Number(e.target.value))}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value={0}>0 Técnicos Extra (Capacidad 100)</option>
              <option value={1}>1 Técnico Extra ($1,800 · Cap 150)</option>
              <option value={2}>2 Técnicos Extra ($3,600 · Cap 200)</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Operativo mes siguiente a contratación.
            </span>
          </div>

          {/* Toggle: Respuesta Rápida y Filtro */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={fastResponseActive}
                onChange={(e) => setFastResponseActive(e.target.checked)}
                className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Respuesta &lt; 5 min + Filtro
                </span>
                <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                  -20% leads Meta pero sube contacto al 80% y cierre al 22%.
                </span>
              </div>
            </label>
          </div>

          {/* Toggle: Batería Opcional */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={batteryOfferActive}
                onChange={(e) => setBatteryOfferActive(e.target.checked)}
                className="mt-1 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Ofrecer Batería ($3,000)
                </span>
                <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                  15% adopción, suma +$76.50 de margen promedio por venta.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Core Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelChart
          title="Embudo Comparativo: Meta vs Google (Septiembre)"
          stages={funnelStages}
          name1="Meta Ads (Lead $8)"
          name2="Google Ads (Lead $40)"
        />

        <TrapComparisonChart caseKey="solDeCasa" />
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LtvCacChart
          title="LTV vs CAC Real por Canal y Escenario"
          categories={[
            { name: 'Google Ads (Actual)', cac: 535.53, ltv: 1625.00, ratio: 3.03 },
            { name: 'Meta Ads (Actual)', cac: 718.13, ltv: 1625.00, ratio: 2.26 },
            { name: 'Propuesta Leadly ($8k M)', cac: 718.13, ltv: 1625.00, ratio: 2.26 }
          ]}
        />

        <CashCurveChart
          title="Desfase de Flujo de Caja en una Instalación"
          data={model.clientCashCurve}
          dataKey="cash"
          name1="Saldo Acumulado de la Venta"
        />
      </div>

      {/* 24-Month Projection Table */}
      <CashFlowTable
        caseKey="solDeCasa"
        monthlyData={simulation.monthlyBreakdown}
        safetyFloor={5000}
        initialCash={12000}
        month1Details={simulation.month1Verification}
      />

      {/* Mandatory Section: "EN QUÉ SE EQUIVOCÓ O NOS CONFUNDIÓ LA IA" */}
      <div className="bg-emerald-50/80 rounded-2xl border border-emerald-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-bold text-emerald-950 uppercase tracking-wide">
            En qué se equivocó o nos confundió la IA en el Caso Sol de Casa
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-emerald-200/60 space-y-2">
            <span className="font-bold text-slate-800 block">1. Resultado presentado por Leadly / IA:</span>
            <p className="text-slate-600 leading-relaxed">
              «En Meta el lead cuesta $8 y en Google $40. Meta es 5 veces más eficiente. Pasemos los $4,000 de Google a Meta: con los $8,000 en Meta tendríamos 1,000 leads al mes, casi el doble que hoy. Más leads = más ventas.»
            </p>
            <span className="font-bold text-rose-700 block pt-1">Problema detectado:</span>
            <p className="text-slate-600 leading-relaxed">
              Optimización ingenua por costo por contacto (CPL). La IA ignoró la tasa de conversión final, los teléfonos inválidos y el cuello de botella físico de las visitas técnicas de $60.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200/60 space-y-2">
            <span className="font-bold text-slate-800 block">2. Razón por la que estaba equivocado:</span>
            <p className="text-slate-600 leading-relaxed">
              El lead de Meta cierra a solo 18% y exige 5.56 visitas por venta ($333 en costos operativos), dando un CAC Real de <strong>$718.13</strong>. Google cierra al 30% con solo 3.33 visitas por venta ($200), dando un CAC Real de <strong>$535.53</strong>. ¡El cliente de Meta es 34% más caro! Si se pasa todo a Meta, se colapsa la capacidad de 100 visitas y las ventas caen de 22 a 17.5 por mes, destruyendo la caja.
            </p>
            <span className="font-bold text-emerald-700 block pt-1">Resultado Corregido y Fórmula:</span>
            <p className="text-slate-600 font-mono">
              CAC Real = (Gasto Anuncios + $60 x Visitas Hechas) / Ventas.<br />
              Valor Visita Google = +$427.50 vs Meta = +$232.50. Google es indispensable.
            </p>
          </div>
        </div>
      </div>

      {/* One-Page Executive Recommendation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 font-mono">
              Dictamen Estratégico Operativo
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Recomendación Ejecutiva para Andrés Villalobos: «RECHAZAR LEADLY · EXPANDIR CAPACIDAD»
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold font-mono">
            NO PASAR TODO A META
          </span>
        </div>

        <div className="prose prose-sm text-slate-700 max-w-none space-y-3 leading-relaxed text-xs sm:text-sm">
          <p>
            <strong>1. Diagnóstico Fundamental:</strong> Sofía tiene razón al advertir sobre la caja. La propuesta de Leadly de mover todo el presupuesto a Meta provocaría una pérdida neta de 4.8 ventas al mes y colapsaría el flujo financiero. Aunque el lead parece barato ($8), la baja conversión de Meta y los costos de viáticos de visitas técnicas ($60 c/u) encarecen el cliente real en un 34% en comparación con Google.
          </p>
          <p>
            <strong>2. Google es el Motor de Alta Rentabilidad:</strong> Cada visita técnica a un lead de Google genera un valor esperado de +$427.50, mientras que en Meta es de +$232.50. Google debe priorizarse siempre para copar la agenda de visitas.
          </p>
          <p>
            <strong>3. Plan de Dos Cambios Propuestos:</strong>
            <br />
            • <em>Cambio 1: Optimizar el embudo de Meta reduciendo el tiempo de respuesta a &lt; 5 minutos y agregando dos filtros al formulario</em> («¿Es dueño?» y «¿Recibo &gt; $80?»). Esto depura los teléfonos inválidos, sube el contacto al 80% y el cierre al 22%.
            <br />
            • <em>Cambio 2: Contratar 1 técnico adicional ($1,800/mes) en el Mes 2</em>, ampliando la capacidad de 100 a 150 visitas a partir del Mes 3, y ofrecer la batería opcional de $3,000 (+$76.50 de margen extra).
          </p>
          <p>
            <strong>4. Impacto Proyectado en Caja:</strong> Sol de Casa eleva sus ventas a más de 28 instalaciones al mes, acumula <strong>$215,000 en el banco</strong> al Mes 24 y mantiene su piso de $5,000 completamente a salvo en todos los períodos.
          </p>
        </div>
      </div>
    </div>
  );
}
