// DecisionLab 360 - Nivel 3: Simuladores Financieros de 24 Meses
import React, { useState } from 'react';
import {
  TrendingUp,
  Coffee,
  CalendarCheck,
  Sun,
  Trophy,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  Mic,
  DollarSign
} from 'lucide-react';
import KPICard from '../../Components/KPICard/KPICard.jsx';
import CashFlowTable from '../../Components/CashFlowTable/CashFlowTable.jsx';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend
} from 'recharts';
import { simulationService } from '../../Services/simulationService.js';
import { formatCurrency, formatNumber, formatPercent } from '../../Services/calculationService.js';

export default function Simulator() {
  const [selectedCase, setSelectedCase] = useState('tueste');

  // Obtener comparativa de 4 planes por caso
  const tuestePlansData = simulationService.getTuestePlansComparison();
  const agendoPlansData = simulationService.getAgendoPlansComparison();
  const solPlansData = simulationService.getSolDeCasaPlansComparison();

  const currentPlansData = selectedCase === 'tueste'
    ? tuestePlansData
    : selectedCase === 'agendo'
    ? agendoPlansData
    : solPlansData;

  const [activePlanId, setActivePlanId] = useState(currentPlansData.plans[0].id);

  // Obtener plan activo seleccionado
  const activePlan = currentPlansData.plans.find(p => p.id === activePlanId) || currentPlansData.plans[0];
  const simResults = activePlan.results;

  // Datos para el gráfico de caja mes a mes
  const cashChartData = simResults.monthlyBreakdown.map(r => ({
    month: r.month,
    endingCash: r.endingCash,
    inflows: r.inflows || r.totalContribution || 0,
    outflows: r.outflows || r.totalOutflows || 0,
    customersOrSales: r.activeCustomers || r.activeSubscribers || r.sales || 0
  }));

  const safetyFloor = selectedCase === 'tueste' ? 5000 : selectedCase === 'agendo' ? 10000 : 5000;
  const initialCash = selectedCase === 'tueste' ? 35000 : selectedCase === 'agendo' ? 60000 : 12000;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <TrendingUp className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 font-mono">
              Nivel 3: Simulación Proyectiva
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Simulador de Caja y Cohortes a 24 Meses
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rastreo cohorte por cohorte, validación de reglas de inversión y comparador de 4 planes competitivos
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => { setSelectedCase('tueste'); setActivePlanId('actual'); }}
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
            onClick={() => { setSelectedCase('agendo'); setActivePlanId('actual'); }}
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
            onClick={() => { setSelectedCase('solDeCasa'); setActivePlanId('actual'); }}
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
      </div>

      {/* 4-Plan Comparison Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 text-base">
            Comparativa de los 4 Planes Estratégicos
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Piso Mínimo Exigido: {formatCurrency(safetyFloor, 0)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentPlansData.plans.map((p) => {
            const isWinner = p.id === currentPlansData.winnerId;
            const isSelected = p.id === activePlan.id;

            return (
              <div
                key={p.id}
                onClick={() => setActivePlanId(p.id)}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 relative ${
                  isSelected
                    ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-50/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {isWinner && (
                  <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 font-mono uppercase tracking-wider">
                    <Trophy className="w-3 h-3" />
                    Ganador
                  </span>
                )}

                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                    {p.badge}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2 font-mono">
                  <div className="flex justify-between">
                    <span>Caja Mínima:</span>
                    <span className={`font-bold ${p.results.floorBreached ? 'text-rose-600' : 'text-slate-900'}`}>
                      {formatCurrency(p.results.minCash, 0)} (M{p.results.minCashMonth})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Caja Mes 24:</span>
                    <span className="font-bold text-emerald-700">
                      {formatCurrency(p.results.endingCash, 0)}
                    </span>
                  </div>
                  {selectedCase === 'tueste' && (
                    <div className="flex justify-between">
                      <span>Suscriptores M24:</span>
                      <span className="font-bold text-blue-700">
                        {p.results.finalActiveSubscribers} subs
                      </span>
                    </div>
                  )}
                  {selectedCase === 'agendo' && (
                    <div className="flex justify-between">
                      <span>Clientes M24:</span>
                      <span className="font-bold text-blue-700">
                        {p.results.finalActiveCustomers} negocios
                      </span>
                    </div>
                  )}
                  {selectedCase === 'solDeCasa' && (
                    <div className="flex justify-between">
                      <span>Ventas Totales:</span>
                      <span className="font-bold text-blue-700">
                        {Number(p.results.totalSalesOver24Months).toFixed(0)} casas
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span>Piso de Seguridad:</span>
                  <span className={p.results.floorBreached ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    {p.results.floorBreached ? 'ROTO' : 'RESPETADO'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plan Active Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Plan Activo en Tablero"
          value={activePlan.name}
          subvalue={activePlan.badge}
          badgeText="Visualizando"
          badgeType="info"
        />
        <KPICard
          title="Caja Final al Mes 24"
          value={formatCurrency(simResults.endingCash, 0)}
          subvalue={`Inicial: ${formatCurrency(initialCash, 0)}`}
          badgeText="Patrimonio Caja"
          badgeType={simResults.endingCash > initialCash ? 'success' : 'danger'}
        />
        <KPICard
          title="Punto Más Crítico de Caja"
          value={formatCurrency(simResults.minCash, 0)}
          subvalue={`Ocurre en Mes ${simResults.minCashMonth}`}
          badgeText={`Piso: ${formatCurrency(safetyFloor, 0)}`}
          badgeType={simResults.floorBreached ? 'danger' : 'success'}
        />
        <KPICard
          title="Regla Específica del Caso"
          value={simResults.ruleSpendBreached ? 'VIOLADA' : 'CUMPLIDA'}
          subvalue={selectedCase === 'tueste' ? 'Gasto M13 ≥ Promedio M1-12' : selectedCase === 'solDeCasa' ? 'Gasto M19 no decrece' : 'Horizonte 24 Meses'}
          badgeText={simResults.ruleSpendBreached ? 'Invalida Plan' : 'Válido'}
          badgeType={simResults.ruleSpendBreached ? 'danger' : 'success'}
        />
      </div>

      {/* Cash Chart With Safety Floor Line */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base">
              Evolución de Caja Mes a Mes (Línea del Piso: {formatCurrency(safetyFloor, 0)})
            </h4>
            <p className="text-xs text-slate-500">
              Observa si en algún mes la curva cruza por debajo de la línea de alerta roja
            </p>
          </div>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashChartData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickFormatter={(v) => `M${v}`} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => formatCurrency(v, 0)} />
              <Tooltip
                formatter={(val, name) => [formatCurrency(val), name]}
                labelFormatter={(m) => `Mes de proyección: ${m}`}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px'
                }}
              />
              <ReferenceLine
                y={safetyFloor}
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{ value: `Piso Seguridad (${formatCurrency(safetyFloor, 0)})`, fill: '#ef4444', fontSize: 11, position: 'top' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="endingCash"
                name="Saldo Final de Caja"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 2.5, fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 24-Month Table */}
      <CashFlowTable
        caseKey={selectedCase}
        monthlyData={simResults.monthlyBreakdown}
        safetyFloor={safetyFloor}
        initialCash={initialCash}
        month1Details={simResults.month1Verification}
      />

      {/* 2-Minute Investor Pitch Component */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Mic className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                Pitch de 2 Minutos
              </span>
              <h3 className="text-lg font-bold text-white">
                Defensa Ejecutiva de la Decisión ante Inversionistas
              </h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-bold">
            2 Minutos · Claridad Total
          </span>
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-slate-300 text-xs sm:text-sm space-y-2.5 leading-relaxed">
          {selectedCase === 'tueste' && (
            <>
              <p>
                <strong>«Tío, le pido que no me preste dinero para duplicar los anuncios como propone la agencia, sino que escuche esta estrategia:</strong> La agencia dice que tenemos ROAS de 3.0, pero eso es una ilusión porque gastan $2,400 en retargeting a gente que ya nos conocía. Cada cliente nuevo en su primer pedido nos deja un ROAS de apenas 0.70x, perdiendo dinero el día uno. Con un LTV a 12 meses de $54.88 frente a un CAC de $54.55, estamos empatando 1 a 1.»
              </p>
              <p>
                <strong>«Qué presupuesto propongo y por qué:</strong> Mantener la inversión en $8,000/mes pero cambiar dos reglas comerciales: hacer que el cliente pague los $4.50 de envío en pedidos de 2 bolsas y lanzar el pack de 3 bolsas a $48 con envío gratis. Esto eleva nuestro margen unitario a $20.39 y el LTV a $78.40 (ratio 1.44x). Terminamos los 24 meses con <strong>$112,000 en el banco</strong> y compramos la segunda tostadora en el mes 12 con nuestra propia caja, sin arriesgar el piso de $5,000 de Camila.»
              </p>
            </>
          )}

          {selectedCase === 'agendo' && (
            <>
              <p>
                <strong>«Ricardo, como inversionista de Agendo le presento los números reales:</strong> Valeria cerró el reporte diciendo que tenemos LTV:CAC de 2.4 y que debemos triplicar anuncios a $30k. Pero ese 2.4 sale de un CAC Blended de $105 que mezcla 50 barberías orgánicas que llegaron gratis. El CAC Paid real de los anuncios es de $180 y el LTV a 24 meses es de $251.29 (ratio de 1.40x). Si triplicamos, cada cliente nuevo nos costará $398 por saturación, y quemaremos los $60,000 restantes en 6 meses.»
              </p>
              <p>
                <strong>«La ruta ganadora:</strong> Invertir $12,000/mes, subir el precio a $29 (sigue bajo los $35 de CitaYa), mejorar onboarding para convertir el 16.5% de trials y cobrar el 20% en plan anual prepagado de $240. Eso nos da liquidez en el mes 1, evita contratar vendedoras innecesarias y nos deja con <strong>más de 1,900 barberías activas y $245,000 en el banco</strong> al mes 24.»
              </p>
            </>
          )}

          {selectedCase === 'solDeCasa' && (
            <>
              <p>
                <strong>«Estimado oficial del banco:</strong> Sol de Casa busca una línea de crédito para financiar la cuadrilla técnica, no para quemar dinero en anuncios de baja calidad. La agencia Leadly quiere pasar todo el presupuesto a Meta porque el lead cuesta $8 frente a $40 de Google. Pero el lead de Meta requiere 5.56 visitas para cerrar una venta y tiene 18% teléfonos falsos, mientras que Google cierra al 30% con solo 3.33 visitas. El cliente de Meta nos cuesta $718 y el de Google $535.»
              </p>
              <p>
                <strong>«Plan operativo:</strong> Mantenemos los $4,000 en Google, optimizamos Meta respondiendo en &lt; 5 minutos con dos filtros en el formulario, y contratamos un técnico extra de $1,800/mes en el Mes 2 para subir la capacidad a 150 visitas. Pasamos de 22 a 28 instalaciones mensuales, acumulamos <strong>$215,000 en caja</strong> al mes 24 y pagamos cualquier préstamo bancario cómodamente.»
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
