// DecisionLab 360 - LtvCacChart Component
import React from 'react';
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
import { formatCurrency, formatRatio } from '../../Services/calculationService.js';

export default function LtvCacChart({
  title = 'Comparación LTV vs CAC Real',
  categories = [
    { name: 'Situación Actual', cac: 54.55, ltv: 54.88, ratio: 1.01 },
    { name: 'Propuesta Agencia', cac: 72.34, ltv: 45.12, ratio: 0.62 },
    { name: 'Propuesta Propia', cac: 54.55, ltv: 78.40, ratio: 1.44 }
  ]
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            {title}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Relación de retorno sobre inversión de adquisición con referencias 1:1 (equilibrio) y 3:1 (saludable)
          </p>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categories} margin={{ top: 15, right: 25, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => formatCurrency(v, 0)} />
            <Tooltip
              formatter={(value, name) => [formatCurrency(value), name]}
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
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ratios summary footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
        {categories.map((c, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-600 font-medium truncate mr-2">{c.name}:</span>
            <span className={`font-mono font-bold ${
              c.ratio >= 3.0 ? 'text-emerald-600' : c.ratio >= 1.0 ? 'text-amber-600' : 'text-rose-600'
            }`}>
              {formatRatio(c.ratio)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
