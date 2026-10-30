// DecisionLab 360 - Nivel 2: Tableros Interactivos en Vivo
import React, { useState } from 'react';
import {
  Sliders as SlidersIcon,
  Coffee,
  CalendarCheck,
  Sun,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import KPICard from '../../Components/KPICard/KPICard.jsx';
import MetricIndicator from '../../Components/MetricIndicator/MetricIndicator.jsx';
import CashCurveChart from '../../Components/Charts/CashCurveChart.jsx';
import LtvCacChart from '../../Components/Charts/LtvCacChart.jsx';
import InvestmentHistoryChart from '../../Components/Charts/InvestmentHistoryChart.jsx';
import TrapComparisonChart from '../../Components/Charts/TrapComparisonChart.jsx';
import FunnelChart from '../../Components/Charts/FunnelChart.jsx';

import { runTuesteModel } from '../../Engines/tuesteEngine.js';
import { runAgendoModel } from '../../Engines/agendoEngine.js';
import { runSolDeCasaModel } from '../../Engines/solDeCasaEngine.js';
import { formatCurrency, formatPercent, formatRatio, formatNumber } from '../../Services/calculationService.js';
import { storageService } from '../../Services/storageService.js';

export default function Analysis() {
  const [selectedCase, setSelectedCase] = useState('tueste');

  // Sliders Tueste
  const [tuesteSpend, setTuesteSpend] = useState(8000);
  const [tuesteDiscount, setTuesteDiscount] = useState(0);
  const [tuestePayShipping, setTuestePayShipping] = useState(false);
  const [tuesteSubShare, setTuesteSubShare] = useState(0.15);

  // Sliders Agendo
  const [agendoSpend, setAgendoSpend] = useState(10000);
  const [agendoConversion, setAgendoConversion] = useState(14.0);
  const [agendoPrice, setAgendoPrice] = useState(25.0);
  const [agendoAnnualShare, setAgendoAnnualShare] = useState(0.0);
  const [agendoChurn, setAgendoChurn] = useState(6.0);

  // Sliders Sol de Casa
  const [solMetaSpend, setSolMetaSpend] = useState(4000);
  const [solGoogleSpend, setSolGoogleSpend] = useState(4000);
  const [solExtraTechs, setSolExtraTechs] = useState(0);
  const [solFastResponse, setSolFastResponse] = useState(false);
  const [solBattery, setSolBattery] = useState(false);

  // Model outputs
  const tuesteModel = runTuesteModel({
    metaSpend: tuesteSpend,
    discountPercent: tuesteDiscount,
    customerPaysShipping: tuestePayShipping,
    singleOrderShare: 1 - tuesteSubShare
  });

  const agendoModel = runAgendoModel({
    adSpend: agendoSpend,
    trialConversionRate: agendoConversion,
    monthlyPrice: agendoPrice,
    annualPlanShare: agendoAnnualShare,
    monthlyChurnPercent: agendoChurn
  });

  const solModel = runSolDeCasaModel({
    metaSpend: solMetaSpend,
    googleSpend: solGoogleSpend,
    extraTechnicians: solExtraTechs,
    fastResponseActive: solFastResponse,
    batteryOfferActive: solBattery
  });

  const handleResetCase = () => {
    if (selectedCase === 'tueste') {
      setTuesteSpend(8000);
      setTuesteDiscount(0);
      setTuestePayShipping(false);
      setTuesteSubShare(0.15);
    } else if (selectedCase === 'agendo') {
      setAgendoSpend(10000);
      setAgendoConversion(14.0);
      setAgendoPrice(25.0);
      setAgendoAnnualShare(0.0);
      setAgendoChurn(6.0);
    } else {
      setSolMetaSpend(4000);
      setSolGoogleSpend(4000);
      setSolExtraTechs(0);
      setSolFastResponse(false);
      setSolBattery(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">
              <SlidersIcon className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 font-mono">
              Nivel 2: Tableros Interactivos Vivos
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Simulación Paramétrica en Tiempo Real
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mueve los controles deslizantes para ver la respuesta instantánea de unit economics, curvas de caja y umbrales
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setSelectedCase('tueste')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCase === 'tueste'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Tueste</span>
            </button>
            <button
              onClick={() => setSelectedCase('agendo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCase === 'agendo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Agendo</span>
            </button>
            <button
              onClick={() => setSelectedCase('solDeCasa')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCase === 'solDeCasa'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Sol de Casa</span>
            </button>
          </div>

          <button
            onClick={handleResetCase}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
            title="Restaurar parámetros originales"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Datos Originales</span>
          </button>
        </div>
      </div>

      {/* CASE A: TUESTE TABLERO */}
      {selectedCase === 'tueste' && (
        <div className="space-y-6">
          {/* Sliders Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Controles Deslizantes · Tueste
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Inversión Meta ($/mes):</span>
                  <span className="font-mono text-amber-700 font-bold">{formatCurrency(tuesteSpend, 0)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={tuesteSpend}
                  onChange={(e) => setTuesteSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>$0</span>
                  <span>$8k (Base)</span>
                  <span>$20k</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Descuento 1er Pedido:</span>
                  <span className="font-mono text-rose-600 font-bold">{tuesteDiscount}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="5"
                  value={tuesteDiscount}
                  onChange={(e) => setTuesteDiscount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>0%</span>
                  <span>30% (Agencia)</span>
                  <span>40%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Mix Suscriptores:</span>
                  <span className="font-mono text-blue-600 font-bold">{(tuesteSubShare * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={tuesteSubShare}
                  onChange={(e) => setTuesteSubShare(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>5%</span>
                  <span>15% (Base)</span>
                  <span>40%</span>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tuestePayShipping}
                    onChange={(e) => setTuestePayShipping(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Cliente Paga Envío ($4.50)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Live KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Margen Contribución 1er Pedido"
              value={formatCurrency(tuesteModel.firstSingleOrder.contribution)}
              subvalue={formatPercent(tuesteModel.firstSingleOrder.marginPercent)}
              badgeText="Margen Vivo"
            />
            <KPICard
              title="ROAS de Break-even"
              value={formatRatio(tuesteModel.roasBreakEvenSingle)}
              subvalue="1 ÷ Margen %"
              badgeText="Umbral Mínimo"
            />
            <KPICard
              title="CAC Real con Agencia"
              value={formatCurrency(tuesteModel.cacReal)}
              subvalue={`Ads: ${formatCurrency(tuesteModel.cacAds)}`}
              badgeText="Realidad"
            />
            <KPICard
              title="Ratio LTV : CAC Real"
              value={formatRatio(tuesteModel.ltvToCac)}
              subvalue={`LTV: ${formatCurrency(tuesteModel.ltvResults.blendedLTV)}`}
              badgeText={tuesteModel.ltvToCacStatus.toUpperCase()}
              badgeType={tuesteModel.ltvToCacStatus === 'green' ? 'success' : 'warning'}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CashCurveChart
              title="Curva de Caja del Cliente y Payback"
              data={tuesteModel.customerCashCurve}
              dataKey="cumulativeCash"
              paybackMonth={tuesteModel.paybackMonth}
            />
            <TrapComparisonChart caseKey="tueste" />
          </div>
        </div>
      )}

      {/* CASE B: AGENDO TABLERO */}
      {selectedCase === 'agendo' && (
        <div className="space-y-6">
          {/* Sliders Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Controles Deslizantes · Agendo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Inversión Ads:</span>
                  <span className="font-mono text-blue-700 font-bold">{formatCurrency(agendoSpend, 0)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="1000"
                  value={agendoSpend}
                  onChange={(e) => setAgendoSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Conversión Trials:</span>
                  <span className="font-mono text-emerald-600 font-bold">{agendoConversion}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="25"
                  step="0.5"
                  value={agendoConversion}
                  onChange={(e) => setAgendoConversion(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Precio Mensual:</span>
                  <span className="font-mono text-slate-900 font-bold">{formatCurrency(agendoPrice, 0)}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="35"
                  step="1"
                  value={agendoPrice}
                  onChange={(e) => setAgendoPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Mix Plan Anual:</span>
                  <span className="font-mono text-indigo-600 font-bold">{(agendoAnnualShare * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.40"
                  step="0.05"
                  value={agendoAnnualShare}
                  onChange={(e) => setAgendoAnnualShare(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Churn Mensual:</span>
                  <span className="font-mono text-rose-600 font-bold">{agendoChurn}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="0.5"
                  value={agendoChurn}
                  onChange={(e) => setAgendoChurn(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>
            </div>
          </div>

          {/* Live KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="CAC Paid (Anuncios)"
              value={formatCurrency(agendoModel.cacPaid)}
              subvalue={`Blended: ${formatCurrency(agendoModel.cacBlended)}`}
              badgeText="Paid"
              badgeType="danger"
            />
            <KPICard
              title="LTV a 24 Meses"
              value={formatCurrency(agendoModel.ltvData.blendedLTV)}
              subvalue={`Sin tope: ${formatCurrency(agendoModel.ltvData.ltvSinTope)}`}
              badgeText="24M"
            />
            <KPICard
              title="Ratio LTV:CAC Paid"
              value={formatRatio(agendoModel.ltvToCacPaid)}
              subvalue="Claim Valeria: 2.40x"
              badgeText={agendoModel.ltvToCacStatus.toUpperCase()}
              badgeType={agendoModel.ltvToCacStatus === 'green' ? 'success' : 'warning'}
            />
            <KPICard
              title="Vendedoras Necesarias"
              value={`${agendoModel.salesRepsNeeded} Reps`}
              subvalue={`Trials: ${agendoModel.trials}`}
              badgeText="Capacidad"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LtvCacChart
              title="LTV vs CAC Paid y Blended"
              categories={[
                { name: 'CAC Paid Actual', cac: agendoModel.cacPaid, ltv: agendoModel.ltvData.blendedLTV, ratio: agendoModel.ltvToCacPaid },
                { name: 'CAC Blended Actual', cac: agendoModel.cacBlended, ltv: agendoModel.ltvData.blendedLTV, ratio: agendoModel.ltvToCacBlended }
              ]}
            />
            <TrapComparisonChart caseKey="agendo" />
          </div>
        </div>
      )}

      {/* CASE C: SOL DE CASA TABLERO */}
      {selectedCase === 'solDeCasa' && (
        <div className="space-y-6">
          {/* Sliders Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Controles Deslizantes · Sol de Casa
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Gasto Meta:</span>
                  <span className="font-mono text-amber-700 font-bold">{formatCurrency(solMetaSpend, 0)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={solMetaSpend}
                  onChange={(e) => setSolMetaSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Gasto Google:</span>
                  <span className="font-mono text-emerald-700 font-bold">{formatCurrency(solGoogleSpend, 0)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8000"
                  step="500"
                  value={solGoogleSpend}
                  onChange={(e) => setSolGoogleSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Técnicos Extra:</span>
                  <span className="font-mono text-blue-700 font-bold">+{solExtraTechs}</span>
                </div>
                <select
                  value={solExtraTechs}
                  onChange={(e) => setSolExtraTechs(Number(e.target.value))}
                  className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                >
                  <option value={0}>0 (Capacidad 100)</option>
                  <option value={1}>1 (Capacidad 150)</option>
                  <option value={2}>2 (Capacidad 200)</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={solFastResponse}
                    onChange={(e) => setSolFastResponse(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Respuesta Rápida y Filtro
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={solBattery}
                    onChange={(e) => setSolBattery(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Batería Opcional ($3k)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Live KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="CAC Real Google vs Meta"
              value={formatCurrency(solModel.cacRealGoogle)}
              subvalue={`Meta: ${formatCurrency(solModel.cacRealMeta)}`}
              badgeText="Google Rentable"
              badgeType="success"
            />
            <KPICard
              title="Ventas Totales Mensuales"
              value={`${formatNumber(solModel.totalSales, 1)} ventas`}
              subvalue={`G: ${solModel.googleSales.toFixed(1)} | M: ${solModel.metaSales.toFixed(1)}`}
              badgeText="Cierre Real"
            />
            <KPICard
              title="Visitas Pedidas vs Capacidad"
              value={`${formatNumber(solModel.totalRequestedVisits, 1)} / ${solModel.totalCapacity}`}
              subvalue={solModel.capacityExceeded ? 'Desborde de agenda' : 'Capacidad Óptima'}
              badgeText={solModel.capacityExceeded ? 'ALERTA' : 'OK'}
              badgeType={solModel.capacityExceeded ? 'danger' : 'success'}
            />
            <KPICard
              title="Ratio LTV:CAC Real"
              value={formatRatio(solModel.ltvToCacTotal)}
              subvalue={`G: ${formatRatio(solModel.ltvToCacGoogle)} | M: ${formatRatio(solModel.ltvToCacMeta)}`}
              badgeText={solModel.ltvToCacStatus.toUpperCase()}
              badgeType={solModel.ltvToCacStatus === 'green' ? 'success' : 'warning'}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FunnelChart
              title="Embudo en Vivo: Meta vs Google"
              stages={[
                { stage: '1. Leads', meta: solModel.metaFunnel.leads, google: solModel.googleFunnel.leads },
                { stage: '2. Contactados', meta: solModel.metaFunnel.contactedLeads, google: solModel.googleFunnel.contactedLeads },
                { stage: '3. Visitas Agendadas', meta: solModel.metaFunnel.scheduledVisits, google: solModel.googleFunnel.scheduledVisits },
                { stage: '4. Visitas Hechas', meta: solModel.metaVisitsDone, google: solModel.googleVisitsDone },
                { stage: '5. Ventas', meta: solModel.metaSales, google: solModel.googleSales }
              ]}
            />
            <TrapComparisonChart caseKey="solDeCasa" />
          </div>
        </div>
      )}
    </div>
  );
}
