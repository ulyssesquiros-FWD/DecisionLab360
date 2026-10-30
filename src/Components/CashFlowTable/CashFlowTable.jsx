// DecisionLab 360 - CashFlowTable Component (24 Months Projection Table)
import React, { useState } from 'react';
import { formatCurrency, formatNumber } from '../../Services/calculationService.js';
import { AlertCircle, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

export default function CashFlowTable({
  caseKey = 'tueste',
  monthlyData = [],
  safetyFloor = 5000,
  initialCash = 35000,
  month1Details = null
}) {
  const [showMonth1Modal, setShowMonth1Modal] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Table Header and Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Flujo de Caja y Proyección a 24 Meses
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Evolución mes a mes con piso de seguridad de {formatCurrency(safetyFloor, 0)} y revisión de saldo
          </p>
        </div>

        {month1Details && (
          <button
            onClick={() => setShowMonth1Modal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Verificar Cuentas Mes 1</span>
          </button>
        )}
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-slate-100/90 text-slate-600 font-semibold sticky top-0 z-10 border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Mes</th>
              <th className="py-2.5 px-3 text-right">Inversión Ads</th>
              {caseKey === 'tueste' && (
                <>
                  <th className="py-2.5 px-3 text-right">Fee Agencia</th>
                  <th className="py-2.5 px-3 text-right">Clientes Nuevos</th>
                  <th className="py-2.5 px-3 text-right">Suscriptores</th>
                  <th className="py-2.5 px-3 text-right">Contribución Total</th>
                  <th className="py-2.5 px-3 text-right">Salidas</th>
                </>
              )}
              {caseKey === 'agendo' && (
                <>
                  <th className="py-2.5 px-3 text-right">Trials</th>
                  <th className="py-2.5 px-3 text-right">Vendedoras</th>
                  <th className="py-2.5 px-3 text-right">Nuevos Pagados</th>
                  <th className="py-2.5 px-3 text-right">Clientes Activos</th>
                  <th className="py-2.5 px-3 text-right">Entradas Margen</th>
                  <th className="py-2.5 px-3 text-right">Salidas Totales</th>
                </>
              )}
              {caseKey === 'solDeCasa' && (
                <>
                  <th className="py-2.5 px-3 text-right">Gasto Google</th>
                  <th className="py-2.5 px-3 text-right">Visitas Pedidas</th>
                  <th className="py-2.5 px-3 text-right">Capacidad</th>
                  <th className="py-2.5 px-3 text-right">Visitas Hechas</th>
                  <th className="py-2.5 px-3 text-right">Ventas</th>
                  <th className="py-2.5 px-3 text-right">Entradas (50/50)</th>
                  <th className="py-2.5 px-3 text-right">Salidas</th>
                </>
              )}
              <th className="py-2.5 px-3 text-right">Flujo Neto</th>
              <th className="py-2.5 px-3 text-right font-bold">Saldo Caja</th>
              <th className="py-2.5 px-3 text-center">Estado Piso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {monthlyData.map((row) => {
              const isBreached = row.endingCash < safetyFloor;
              const isMonth1 = row.month === 1;

              return (
                <tr
                  key={row.month}
                  className={`hover:bg-slate-50 transition-colors ${
                    isMonth1 ? 'bg-blue-50/40 font-medium' : ''
                  } ${isBreached ? 'bg-rose-50/60' : ''}`}
                >
                  <td className="py-2 px-3 font-mono font-bold text-slate-800 flex items-center gap-1.5">
                    <span>M{row.month}</span>
                    {isMonth1 && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-blue-600 text-white rounded font-sans font-bold">
                        Base
                      </span>
                    )}
                  </td>

                  <td className="py-2 px-3 text-right font-mono text-slate-700">
                    {formatCurrency(row.metaSpend || row.spend || 0, 0)}
                  </td>

                  {caseKey === 'tueste' && (
                    <>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">
                        {formatCurrency(row.agencyFee || 0, 0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-800">
                        {row.newCustomers}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-amber-700 font-semibold">
                        {row.activeSubscribers}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-700 font-semibold">
                        {formatCurrency(row.totalContribution, 0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">
                        {formatCurrency(row.totalOutflows, 0)}
                      </td>
                    </>
                  )}

                  {caseKey === 'agendo' && (
                    <>
                      <td className="py-2 px-3 text-right font-mono text-slate-700">
                        {row.trials}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">
                        {row.salesReps}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-blue-700 font-semibold">
                        {Number(row.totalNewPaid).toFixed(0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-900 font-bold">
                        {row.activeCustomers}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-700 font-semibold">
                        {formatCurrency(row.inflows, 0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">
                        {formatCurrency(row.outflows, 0)}
                      </td>
                    </>
                  )}

                  {caseKey === 'solDeCasa' && (
                    <>
                      <td className="py-2 px-3 text-right font-mono text-slate-700">
                        {formatCurrency(row.googleSpend, 0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">
                        {Number(row.requestedVisits).toFixed(0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-500">
                        {row.capacity}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-700 font-semibold">
                        {Number(row.visitsDone).toFixed(0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-700 font-bold">
                        {Number(row.sales).toFixed(1)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-700">
                        {formatCurrency(row.inflows, 0)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">
                        {formatCurrency(row.outflows, 0)}
                      </td>
                    </>
                  )}

                  <td
                    className={`py-2 px-3 text-right font-mono font-semibold ${
                      row.netCashFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {row.netCashFlow >= 0 ? '+' : ''}
                    {formatCurrency(row.netCashFlow, 0)}
                  </td>

                  <td
                    className={`py-2 px-3 text-right font-mono font-extrabold text-sm ${
                      isBreached ? 'text-rose-700' : 'text-slate-900'
                    }`}
                  >
                    {formatCurrency(row.endingCash, 0)}
                  </td>

                  <td className="py-2 px-3 text-center">
                    {isBreached ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        Piso Roto
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal / Panel de Verificación Manual del Mes 1 */}
      {showMonth1Modal && month1Details && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Auditoría y Revisión Manual: Mes 1</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono">
                  {caseKey.toUpperCase()}
                </span>
              </h4>
              <button
                onClick={() => setShowMonth1Modal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Verificación paso a paso para cotejar con la hoja de cálculo o calculadora manual. Cada partida explica cómo se genera el saldo de caja del primer mes:
            </p>

            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Saldo Inicial en Banco:</span>
                <span className="font-bold text-slate-900">{formatCurrency(initialCash)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>(+) Entradas / Contribución Mes 1:</span>
                <span className="font-bold">+{formatCurrency(month1Details.totalContribution || month1Details.inflows)}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>(-) Salidas Totales Mes 1:</span>
                <span className="font-bold">-{formatCurrency(month1Details.totalOutflows || month1Details.outflows)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-slate-900 font-extrabold text-sm">
                <span>(=) Saldo Final en Caja Mes 1:</span>
                <span className="text-blue-700">{formatCurrency(month1Details.endingCash)}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowMonth1Modal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Cerrar Verificación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
