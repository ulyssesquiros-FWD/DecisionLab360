// DecisionLab 360 - CashCurveChart Component
import React from 'react';
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
import { formatCurrency } from '../../Services/calculationService.js';

export default function CashCurveChart({
  title = 'Curva de Caja Acumulada por Cliente (Curva J)',
  data = [],
  dataKey = 'cash',
  dataKey2 = null,
  name1 = 'Cliente Estándar',
  name2 = null,
  paybackMonth = null
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            {title}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Evolución del flujo acumulado desde el desembolso inicial (Mes 0) hasta el punto de recuperación
          </p>
        </div>
        {paybackMonth !== null && (
          <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
            Payback estimado: {paybackMonth ? `${Number(paybackMonth).toFixed(1)} meses` : '> 24 meses'}
          </div>
        )}
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 25, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(v) => `M${v}`}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(v) => formatCurrency(v, 0)}
            />
            <Tooltip
              formatter={(value, name) => [formatCurrency(value), name]}
              labelFormatter={(label) => `Mes de vida: ${label}`}
              contentStyle={{
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px'
              }}
            />
            <ReferenceLine y={0} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Punto Cero (Equilibrio)', fill: '#ef4444', fontSize: 10, position: 'right' }} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey={dataKey}
              name={name1}
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 3, fill: '#2563eb' }}
              activeDot={{ r: 6 }}
            />
            {dataKey2 && (
              <Line
                type="monotone"
                dataKey={dataKey2}
                name={name2 || 'Escenario Alternativo'}
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#10b981' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
