// DecisionLab 360 - Nivel 1: Calculadoras Financieras
import React, { useState } from 'react';
import {
  Calculator as CalcIcon,
  Coffee,
  CalendarCheck,
  Sun,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  HelpCircle,
  Eye
} from 'lucide-react';
import KPICard from '../../Components/KPICard/KPICard.jsx';
import ScenarioCard from '../../Components/ScenarioCard/ScenarioCard.jsx';
import CashCurveChart from '../../Components/Charts/CashCurveChart.jsx';
import { runTuesteModel } from '../../Engines/tuesteEngine.js';
import { runAgendoModel } from '../../Engines/agendoEngine.js';
import { runSolDeCasaModel } from '../../Engines/solDeCasaEngine.js';
import { tuesteOriginalData } from '../../Data/tuesteData.js';
import { agendoOriginalData } from '../../Data/agendoData.js';
import { solDeCasaOriginalData } from '../../Data/solDeCasaData.js';
import { formatCurrency, formatPercent, formatRatio, formatNumber } from '../../Services/calculationService.js';
import { storageService } from '../../Services/storageService.js';

export default function Calculator() {
  const [selectedCase, setSelectedCase] = useState('tueste');

  // Supuestos editables Tueste
  const [tuesteInputs, setTuesteInputs] = useState({
    metaSpend: 8000,
    agencyFee: 1000,
    bagPrice: 17.0,
    coffeeCostPerBag: 5.44,
    shippingCost: 4.50,
    discountPercent: 0,
    customerPaysShipping: false,
    singleOrderShare: 0.85
  });

  // Supuestos editables Agendo
  const [agendoInputs, setAgendoInputs] = useState({
    adSpend: 10000,
    trialConversionRate: 14.0,
    monthlyPrice: 25.0,
    annualPrice: 240.0,
    grossMarginPercent: 78.0,
    monthlyChurnPercent: 6.0,
    annualPlanShare: 0.0,
    commissionPerCustomer: 20.0
  });

  // Supuestos editables Sol de Casa
  const [solInputs, setSolInputs] = useState({
    metaSpend: 4000,
    googleSpend: 4000,
    extraTechnicians: 0,
    avgPrice: 6500.0,
    costPerVisit: 60.0,
    fastResponseActive: false,
    batteryOfferActive: false
  });

  // Resultados calculados
  const tuesteResult = runTuesteModel(tuesteInputs);
  const agendoResult = runAgendoModel(agendoInputs);
  const solResult = runSolDeCasaModel(solInputs);

  const handleResetCurrent = () => {
    if (selectedCase === 'tueste') {
      setTuesteInputs({
        metaSpend: 8000,
        agencyFee: 1000,
        bagPrice: 17.0,
        coffeeCostPerBag: 5.44,
        shippingCost: 4.50,
        discountPercent: 0,
        customerPaysShipping: false,
        singleOrderShare: 0.85
      });
    } else if (selectedCase === 'agendo') {
      setAgendoInputs({
        adSpend: 10000,
        trialConversionRate: 14.0,
        monthlyPrice: 25.0,
        annualPrice: 240.0,
        grossMarginPercent: 78.0,
        monthlyChurnPercent: 6.0,
        annualPlanShare: 0.0,
        commissionPerCustomer: 20.0
      });
    } else {
      setSolInputs({
        metaSpend: 4000,
        googleSpend: 4000,
        extraTechnicians: 0,
        avgPrice: 6500.0,
        costPerVisit: 60.0,
        fastResponseActive: false,
        batteryOfferActive: false
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <CalcIcon className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 font-mono">
              Nivel 1: Modelado Base
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Calculadoras Financieras y Auditoría de Fórmulas
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formularios de supuestos editables, recálculo instantáneo y verificación manual paso a paso
          </p>
        </div>

        {/* Case Switcher Tabs */}
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
            <span>Tueste (DTC)</span>
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
            <span>Agendo (SaaS)</span>
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
            <span>Sol de Casa (Lead Gen)</span>
          </button>
        </div>
      </div>

      {/* CASE A: TUESTE CALCULATOR */}
      {selectedCase === 'tueste' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form Column */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>Supuestos Editables: Tueste</span>
                </h3>
                <button
                  onClick={handleResetCurrent}
                  className="text-[11px] text-amber-700 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Inversión Meta ($/mes):</label>
                  <input
                    type="number"
                    value={tuesteInputs.metaSpend}
                    onChange={(e) => setTuesteInputs({ ...tuesteInputs, metaSpend: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Fee Agencia ($/mes):</label>
                  <input
                    type="number"
                    value={tuesteInputs.agencyFee}
                    onChange={(e) => setTuesteInputs({ ...tuesteInputs, agencyFee: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Precio por Bolsa ($):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={tuesteInputs.bagPrice}
                    onChange={(e) => setTuesteInputs({ ...tuesteInputs, bagPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Costo Envío por Pedido ($):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tuesteInputs.shippingCost}
                    onChange={(e) => setTuesteInputs({ ...tuesteInputs, shippingCost: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Descuento 1er Pedido (%):</label>
                  <input
                    type="number"
                    value={tuesteInputs.discountPercent}
                    onChange={(e) => setTuesteInputs({ ...tuesteInputs, discountPercent: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tuesteInputs.customerPaysShipping}
                      onChange={(e) => setTuesteInputs({ ...tuesteInputs, customerPaysShipping: e.target.checked })}
                      className="w-4 h-4 text-amber-600 rounded border-slate-300"
                    />
                    <span className="text-slate-700 font-medium">Cliente asume el costo de envío</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results Grid Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <KPICard
                  title="Margen Contribución 1er Pedido"
                  value={formatCurrency(tuesteResult.firstSingleOrder.contribution)}
                  subvalue={formatPercent(tuesteResult.firstSingleOrder.marginPercent)}
                  badgeText="Margen Unitario"
                  helperText="Ingreso cobrado menos café, envío Tueste, pasarela 4.5% y empaque"
                />
                <KPICard
                  title="ROAS de Break-Even"
                  value={formatRatio(tuesteResult.roasBreakEvenSingle)}
                  subvalue="1 ÷ Margen %"
                  badgeText="Equilibrio"
                  helperText="Mínimo retorno publicitario requerido para no perder dinero en la venta"
                />
                <KPICard
                  title="CAC Real (Con Agencia)"
                  value={formatCurrency(tuesteResult.cacReal)}
                  subvalue={`Ads: ${formatCurrency(tuesteResult.cacAds)}`}
                  badgeText="Costo Real"
                  helperText="(Inversión Meta + Fee Agencia) ÷ Clientes Nuevos Meta"
                />
                <KPICard
                  title="ROAS Real 1er Pedido"
                  value={formatRatio(tuesteResult.roasRealFirstOrder)}
                  subvalue="Pérdida en 1er Pedido"
                  badgeText="Peligro"
                  badgeType="danger"
                  helperText="Clientes Nuevos Meta x Ticket ÷ Inversión Meta. < 2.14x = pérdida"
                />
                <KPICard
                  title="LTV a 12 Meses"
                  value={formatCurrency(tuesteResult.ltvResults.blendedLTV)}
                  subvalue="Sobre Contribución"
                  badgeText="12 Meses"
                  helperText="3 pedidos en 12m cliente suelto (85%) + suscripción geométrica (15%)"
                />
                <KPICard
                  title="LTV : CAC Real"
                  value={formatRatio(tuesteResult.ltvToCac)}
                  subvalue="Ratio Anual"
                  badgeText={tuesteResult.ltvToCacStatus.toUpperCase()}
                  badgeType={tuesteResult.ltvToCacStatus === 'green' ? 'success' : 'warning'}
                  helperText="LTV 12m ÷ CAC Real. Con 1.01x apenas empata en 1 año"
                />
              </div>

              {/* Manual Verification Step-by-Step Row */}
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>Verificación Manual de Fórmulas (Cotejo con Hoja de Cálculo)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Verificado 100%</span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <p>1. Margen Pedido 2 bolsas: $34.00 - $10.88 (café) - $4.50 (envío) - $1.53 (4.5% pasarela) - $1.20 (caja) = <strong>$15.89</strong> (46.74%)</p>
                  <p>2. ROAS Break-Even: 1 ÷ 0.46735 = <strong>2.14x</strong></p>
                  <p>3. CAC Real Septiembre: ($8,000 + $1,000) ÷ 165 clientes = <strong>$54.55</strong></p>
                  <p>4. ROAS Real Primer Pedido: (165 x $34) ÷ $8,000 = $5,610 ÷ $8,000 = <strong>0.70x</strong> (¡Pérdida inmediata!)</p>
                  <p>5. LTV 12m: (0.85 x 3 pedidos x $15.89 = $40.52) + (0.15 x 7.57 pedidos x $12.64 = $14.36) = <strong>$54.88</strong></p>
                  <p>6. LTV:CAC Real: $54.88 ÷ $54.55 = <strong>1.01x</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASE B: AGENDO CALCULATOR */}
      {selectedCase === 'agendo' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form Column */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>Supuestos Editables: Agendo</span>
                </h3>
                <button
                  onClick={handleResetCurrent}
                  className="text-[11px] text-blue-700 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Inversión Anuncios ($/mes):</label>
                  <input
                    type="number"
                    value={agendoInputs.adSpend}
                    onChange={(e) => setAgendoInputs({ ...agendoInputs, adSpend: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Tasa Conversión Trial (%):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={agendoInputs.trialConversionRate}
                    onChange={(e) => setAgendoInputs({ ...agendoInputs, trialConversionRate: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Precio Plan Mensual ($):</label>
                  <input
                    type="number"
                    value={agendoInputs.monthlyPrice}
                    onChange={(e) => setAgendoInputs({ ...agendoInputs, monthlyPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Margen Bruto (%):</label>
                  <input
                    type="number"
                    value={agendoInputs.grossMarginPercent}
                    onChange={(e) => setAgendoInputs({ ...agendoInputs, grossMarginPercent: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Churn Mensual (%):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={agendoInputs.monthlyChurnPercent}
                    onChange={(e) => setAgendoInputs({ ...agendoInputs, monthlyChurnPercent: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Porcentaje Plan Anual (0.0 a 1.0):</label>
                  <input
                    type="number"
                    step="0.05"
                    value={agendoInputs.annualPlanShare}
                    onChange={(e) => setAgendoInputs({ ...agendoInputs, annualPlanShare: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Results Grid Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <KPICard
                  title="Margen Bruto Mensual"
                  value={formatCurrency(agendoResult.unitEconomics.monthlyMargin)}
                  subvalue={`${agendoInputs.grossMarginPercent}% de $${agendoInputs.monthlyPrice}`}
                  badgeText="Unitario"
                  helperText="Ingreso mensual menos costos directos (WhatsApp, servidores, Stripe, soporte)"
                />
                <KPICard
                  title="CAC Paid (Anuncios)"
                  value={formatCurrency(agendoResult.cacPaid)}
                  subvalue="Realidad Anuncios"
                  badgeText="Paid"
                  badgeType="danger"
                  helperText="Costos totales de adquisición divididos solo entre clientes pagados de ads"
                />
                <KPICard
                  title="CAC Blended (Mezclado)"
                  value={formatCurrency(agendoResult.cacBlended)}
                  subvalue="Reportado por Valeria"
                  badgeText="Blended"
                  badgeType="warning"
                  helperText="Mezcla 50 orgánicos sin costo para bajar el CAC promedio a $105"
                />
                <KPICard
                  title="LTV a 24 Meses"
                  value={formatCurrency(agendoResult.ltvData.blendedLTV)}
                  subvalue={`Sin tope: ${formatCurrency(agendoResult.ltvData.ltvSinTope)}`}
                  badgeText="24 Meses"
                  helperText="Suma del margen mensual durante 24 meses aplicando retención del 94%"
                />
                <KPICard
                  title="Ratio LTV : CAC Paid"
                  value={formatRatio(agendoResult.ltvToCacPaid)}
                  subvalue={`Blended: ${formatRatio(agendoResult.ltvToCacBlended)}`}
                  badgeText={agendoResult.ltvToCacStatus.toUpperCase()}
                  badgeType={agendoResult.ltvToCacStatus === 'green' ? 'success' : 'warning'}
                  helperText="LTV 24m ÷ CAC Paid. El canal de anuncios está en 1.40x, no 2.4x"
                />
                <KPICard
                  title="Equipo Comercial"
                  value={`${agendoResult.salesRepsNeeded} Vendedora${agendoResult.salesRepsNeeded > 1 ? 's' : ''}`}
                  subvalue={formatCurrency(agendoResult.totalSalesRepCost)}
                  badgeText="Capacidad"
                  helperText="Math.ceil(trials / 500). Cada vendedora cuesta $1,200/mes"
                />
              </div>

              {/* Manual Verification */}
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>Verificación Manual de Fórmulas Agendo</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Verificado 100%</span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <p>1. Margen mensual: $25.00 x 78% = <strong>$19.50</strong> por cliente/mes</p>
                  <p>2. Clientes nuevos de ads: 500 trials x 14% = <strong>70 clientes</strong></p>
                  <p>3. Costos de venta: $10,000 ads + $1,200 (1 vendedora) + ($20 x 70 = $1,400 comisiones) = <strong>$12,600</strong></p>
                  <p>4. CAC Paid: $12,600 ÷ 70 = <strong>$180.00</strong> (vs $105 Blended que incluye 50 orgánicos)</p>
                  <p>5. LTV 24 meses: $19.50 x 12.8865 meses efectivos (churn 6%) = <strong>$251.29</strong> (vs $325 sin tope)</p>
                  <p>6. LTV:CAC Paid: $251.29 ÷ $180.00 = <strong>1.40x</strong> (muy por debajo del 2.4x de Valeria)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASE C: SOL DE CASA CALCULATOR */}
      {selectedCase === 'solDeCasa' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form Column */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>Supuestos Editables: Sol de Casa</span>
                </h3>
                <button
                  onClick={handleResetCurrent}
                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Inversión Meta ($/mes):</label>
                  <input
                    type="number"
                    value={solInputs.metaSpend}
                    onChange={(e) => setSolInputs({ ...solInputs, metaSpend: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Inversión Google ($/mes):</label>
                  <input
                    type="number"
                    value={solInputs.googleSpend}
                    onChange={(e) => setSolInputs({ ...solInputs, googleSpend: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Técnicos Adicionales (0, 1 o 2):</label>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    value={solInputs.extraTechnicians}
                    onChange={(e) => setSolInputs({ ...solInputs, extraTechnicians: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Precio Instalación ($):</label>
                  <input
                    type="number"
                    value={solInputs.avgPrice}
                    onChange={(e) => setSolInputs({ ...solInputs, avgPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Costo por Visita Técnica ($):</label>
                  <input
                    type="number"
                    value={solInputs.costPerVisit}
                    onChange={(e) => setSolInputs({ ...solInputs, costPerVisit: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={solInputs.fastResponseActive}
                      onChange={(e) => setSolInputs({ ...solInputs, fastResponseActive: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300"
                    />
                    <span className="text-slate-700 font-medium">Respuesta &lt; 5 min + Filtro</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={solInputs.batteryOfferActive}
                      onChange={(e) => setSolInputs({ ...solInputs, batteryOfferActive: e.target.checked })}
                      className="w-4 h-4 text-amber-600 rounded border-slate-300"
                    />
                    <span className="text-slate-700 font-medium">Ofrecer Batería de Respaldo</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results Grid Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <KPICard
                  title="CAC Real Google vs Meta"
                  value={formatCurrency(solResult.cacRealGoogle)}
                  subvalue={`Meta: ${formatCurrency(solResult.cacRealMeta)}`}
                  badgeText="Google Rentable"
                  badgeType="success"
                  helperText="Incluye costo de $60 por visita. Google es 34% más económico por venta"
                />
                <KPICard
                  title="Visitas Pedidas vs Capacidad"
                  value={`${formatNumber(solResult.totalRequestedVisits, 1)} / ${solResult.totalCapacity}`}
                  subvalue={solResult.capacityExceeded ? 'Desborde de visitas' : 'Dentro de límite'}
                  badgeText={solResult.capacityExceeded ? 'ALERTA' : 'OK'}
                  badgeType={solResult.capacityExceeded ? 'danger' : 'success'}
                  helperText="Google tiene prioridad absoluta para ocupar las visitas disponibles"
                />
                <KPICard
                  title="Valor Esperado por Visita"
                  value={`+${formatCurrency(solResult.valueOfVisitGoogle)}`}
                  subvalue={`Meta: +${formatCurrency(solResult.valueOfVisitMeta)}`}
                  badgeText="Google Doble Valor"
                  badgeType="info"
                  helperText="(Tasa Cierre x $1,625 margen) - $60 costo de visita técnica"
                />
                <KPICard
                  title="Ventas Totales Estimadas"
                  value={`${formatNumber(solResult.totalSales, 1)} ventas`}
                  subvalue={`G: ${solResult.googleSales.toFixed(1)} | M: ${solResult.metaSales.toFixed(1)}`}
                  badgeText="Mensuales"
                  helperText="Instalaciones firmadas efectivas tras aplicar tasas de cierre"
                />
                <KPICard
                  title="LTV : CAC Real Consolidado"
                  value={formatRatio(solResult.ltvToCacTotal)}
                  subvalue={`G: ${formatRatio(solResult.ltvToCacGoogle)} | M: ${formatRatio(solResult.ltvToCacMeta)}`}
                  badgeText={solResult.ltvToCacStatus.toUpperCase()}
                  badgeType={solResult.ltvToCacStatus === 'green' ? 'success' : 'warning'}
                  helperText="Contribución neta de $1,625 ÷ CAC Real con costos de visitas"
                />
                <KPICard
                  title="Contribución Unitaria Neta"
                  value={formatCurrency(solResult.contributionPerSale)}
                  subvalue="Margen 25%"
                  badgeText="Por Venta"
                  helperText="$6,500 - 55% equipos ($3,575) - 17% cuadrilla ($1,105) - 3% asesora ($195)"
                />
              </div>

              {/* Manual Verification */}
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>Verificación Manual de Fórmulas Sol de Casa</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Verificado 100%</span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <p>1. Contribución neta: $6,500 x (28% margen bruto - 3% comisión asesora) = <strong>$1,625.00</strong></p>
                  <p>2. Embudo Meta: 500 leads x 55% contacto x 30% agenda x 70% hecha = <strong>57.75 visitas</strong> x 18% = <strong>10.4 ventas</strong></p>
                  <p>3. Embudo Google: 100 leads x 85% contacto x 55% agenda x 85% hecha = <strong>39.74 visitas</strong> x 30% = <strong>11.9 ventas</strong></p>
                  <p>4. CAC Real Google: ($4,000 + 39.74 x $60 = $6,384.25) ÷ 11.92 = <strong>$535.53</strong></p>
                  <p>5. CAC Real Meta: ($4,000 + 57.75 x $60 = $7,465.00) ÷ 10.40 = <strong>$718.13</strong> (+34% más caro)</p>
                  <p>6. Valor Visita Google: (30% x $1,625) - $60 = <strong>+$427.50</strong> vs Meta: (18% x $1,625) - $60 = <strong>+$232.50</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
