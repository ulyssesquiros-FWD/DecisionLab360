// DecisionLab 360 - InvestmentHistoryChart Component
import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { formatCurrency, formatNumber } from '../../Services/calculationService.js';

export default function InvestmentHistoryChart({
  title = 'Rendimientos de Inversión y Rendimientos Decrecientes',
  data = [],
  xKey = 'spend',
  yKey1 = 'customers',
  yKey2 = 'marginalCAC',
  label1 = 'Clientes Nuevos',
  label2 = 'CAC Marginal ($/cliente)'
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="mb-4">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
          {title}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          A medida que se aumenta el presupuesto publicitario, cada resultado adicional se encarece drásticamente
        </p>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 25, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey={xKey}
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(v) => formatCurrency(v, 0)}
            />
            <YAxis
              yAxisId="left"
              stroke="#2563eb"
              fontSize={11}
              tickFormatter={(v) => formatNumber(v)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#ef4444"
              fontSize={11}
              tickFormatter={(v) => formatCurrency(v, 0)}
            />
            <Tooltip
              formatter={(value, name) => [
                name.includes('CAC') || name.includes('Inversión') ? formatCurrency(value) : formatNumber(value),
                name
              ]}
              labelFormatter={(label) => `Gasto mensual: ${formatCurrency(label)}`}
              contentStyle={{
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar
              yAxisId="left"
              dataKey={yKey1}
              name={label1}
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
            {data[0] && data[0][yKey2] !== undefined && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey={yKey2}
                name={label2}
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ef4444' }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
