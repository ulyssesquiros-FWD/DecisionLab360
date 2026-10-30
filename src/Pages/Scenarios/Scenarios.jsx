// DecisionLab 360 - Comparador de Escenarios
import React, { useState } from 'react';
import {
  GitCompare,
  Coffee,
  CalendarCheck,
  Sun,
  ShieldAlert,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { formatCurrency, formatPercent, formatRatio } from '../../Services/calculationService.js';
import { exportService } from '../../Services/exportService.js';

export default function Scenarios() {
  const [selectedCase, setSelectedCase] = useState('tueste');

  // Master scenarios data for the 3 businesses
  const scenariosData = {
    tueste: [
      {
        id: 'tueste_actual',
        name: 'A. Situación Actual',
        spend: 8000,
        customers: '165 nuevos',
        cac: 54.55,
        ltv: 54.88,
        ltvToCac: 1.01,
        margin: '46.7%',
        minCash: 24447,
        endingCash: 79596,
        risk: 'Empate 1:1 tras 12 meses; alta vulnerabilidad a cancelaciones'
      },
      {
        id: 'tueste_agencia',
        name: 'B. Propuesta Agencia ($16k + 30% desc)',
        spend: 16000,
        customers: '235 nuevos',
        cac: 72.34,
        ltv: 45.12,
        ltvToCac: 0.62,
        margin: '25.8%',
        minCash: 5200,
        endingCash: 12400,
        risk: 'Destrucción de capital (0.62x); riesgo inminente de quiebra'
      },
      {
        id: 'tueste_propio',
        name: 'C. Propuesta Propia (Pack & Envío Cobrado)',
        spend: 8000,
        customers: '165 nuevos',
        cac: 54.55,
        ltv: 78.40,
        ltvToCac: 1.44,
        margin: '52.4%',
        minCash: 28000,
        endingCash: 112000,
        risk: 'Supone adopción de clientes del pack a $48'
      }
    ],
    agendo: [
      {
        id: 'agendo_actual',
        name: 'A. Situación Actual ($10k)',
        spend: 10000,
        customers: '70 ads / 120 total',
        cac: 180.00,
        ltv: 251.29,
        ltvToCac: 1.40,
        margin: '78.0%',
        minCash: 48000,
        endingCash: 156741,
        risk: 'Crecimiento lento con CAC Paid elevado'
      },
      {
        id: 'agendo_valeria',
        name: 'B. Propuesta Valeria ($30k)',
        spend: 30000,
        customers: '126 ads / 176 total',
        cac: 277.14,
        ltv: 251.29,
        ltvToCac: 0.91,
        margin: '78.0%',
        minCash: 0,
        endingCash: -45000,
        risk: 'CAC Marginal se dispara a $398; colapso de caja en 6 meses'
      },
      {
        id: 'agendo_propio',
        name: 'C. Propuesta Propia ($12k + Mix Anual)',
        spend: 12000,
        customers: '95 ads / 145 total',
        cac: 158.00,
        ltv: 315.00,
        ltvToCac: 1.99,
        margin: '78.0%',
        minCash: 55000,
        endingCash: 245000,
        risk: 'Requiere disciplina en onboarding y conversión 16.5%'
      }
    ],
    solDeCasa: [
      {
        id: 'sol_actual',
        name: 'A. Situación Actual ($4k M / $4k G)',
        spend: 8000,
        customers: '22.3 ventas',
        cac: 598.00,
        ltv: 1625.00,
        ltvToCac: 2.72,
        margin: '25.0%',
        minCash: 12000,
        endingCash: 117273,
        risk: 'Capacidad de visitas saturada al 97%'
      },
      {
        id: 'sol_leadly',
        name: 'B. Propuesta Leadly ($8k M / $0 G)',
        spend: 8000,
        customers: '17.5 ventas',
        cac: 718.13,
        ltv: 1625.00,
        ltvToCac: 2.26,
        margin: '25.0%',
        minCash: 3500,
        endingCash: 42000,
        risk: 'Caída de ventas del 21%; satura visitas baratas de baja conversión'
      },
      {
        id: 'sol_propio',
        name: 'C. Propuesta Propia (Filtro + 1 Técnico Extra)',
        spend: 8000,
        customers: '28.2 ventas',
        cac: 495.00,
        ltv: 1701.50,
        ltvToCac: 3.44,
        margin: '26.2%',
        minCash: 15000,
        endingCash: 215000,
        risk: 'Supone cumplimiento de tiempos de respuesta < 5 min'
      }
    ]
  };

  const currentScenarios = scenariosData[selectedCase];

  // Datos para el gráfico de barras comparativo
  const comparisonChartData = currentScenarios.map(s => ({
    name: s.name.split(' (')[0],
    cac: s.cac,
    ltv: s.ltv,
    endingCash: s.endingCash / 1000 // miles de USD
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-300">
              <GitCompare className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
              Análisis Matricial
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Comparador de Escenarios
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cotejo multidimensional: inversión, volumen, CAC Real, LTV, ratios, pisos de caja y riesgos
          </p>
        </div>

        {/* Case Switcher */}
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
      </div>

      {/* Comparative Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">
            Matriz Comparativa de Escenarios ({selectedCase.toUpperCase()})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Escenario</th>
                <th className="py-3 px-3 text-right">Inversión</th>
                <th className="py-3 px-3 text-right">Volumen</th>
                <th className="py-3 px-3 text-right">CAC Real</th>
                <th className="py-3 px-3 text-right">LTV</th>
                <th className="py-3 px-3 text-right">LTV : CAC</th>
                <th className="py-3 px-3 text-right">Margen</th>
                <th className="py-3 px-3 text-right">Caja Mínima</th>
                <th className="py-3 px-3 text-right font-bold">Caja Final (24M)</th>
                <th className="py-3 px-4">Evaluación de Riesgo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentScenarios.map((s, idx) => {
                const isDangerous = s.ltvToCac < 1.0;
                const isOptimal = s.ltvToCac >= 1.4;

                return (
                  <tr
                    key={s.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isDangerous ? 'bg-rose-50/40' : isOptimal ? 'bg-emerald-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {s.name}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700">
                      {formatCurrency(s.spend, 0)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-blue-700">
                      {s.customers}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(s.cac)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-800">
                      {formatCurrency(s.ltv)}
                    </td>
                    <td
                      className={`py-3 px-3 text-right font-mono font-extrabold ${
                        s.ltvToCac >= 3.0
                          ? 'text-emerald-600'
                          : s.ltvToCac >= 1.0
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {formatRatio(s.ltvToCac)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-600">
                      {s.margin}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-800">
                      {formatCurrency(s.minCash, 0)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-extrabold text-sm text-slate-900">
                      {formatCurrency(s.endingCash, 0)}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px] leading-relaxed">
                      {s.risk}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphical Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h4 className="font-bold text-slate-900 text-sm mb-1">
          Comparación Visual de Unit Economics y Caja Terminal
        </h4>
        <p className="text-xs text-slate-500 mb-4">
          CAC vs LTV en USD (eje izquierdo), y Caja Final en miles de USD (eje derecho)
        </p>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonChartData} margin={{ top: 10, right: 25, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => formatCurrency(v, 0)} />
              <Tooltip
                formatter={(val, name) => [
                  name === 'Caja Mes 24 ($k)' ? formatCurrency(val * 1000, 0) : formatCurrency(val),
                  name
                ]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="cac" name="CAC Real" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ltv" name="LTV Calculado" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="endingCash" name="Caja Mes 24 ($k)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
