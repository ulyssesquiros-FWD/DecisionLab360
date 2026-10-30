// DecisionLab 360 - FunnelChart Component
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
import { formatNumber } from '../../Services/calculationService.js';

export default function FunnelChart({
  title = 'Embudo Comparativo de Conversión',
  stages = [
    { stage: '1. Leads Generados', meta: 500, google: 100 },
    { stage: '2. Contactados', meta: 275, google: 85 },
    { stage: '3. Visitas Agendadas', meta: 82.5, google: 46.8 },
    { stage: '4. Visitas Realizadas', meta: 57.8, google: 39.7 },
    { stage: '5. Ventas Cerradas', meta: 10.4, google: 11.9 }
  ],
  name1 = 'Meta Ads',
  name2 = 'Google Ads',
  color1 = '#f59e0b',
  color2 = '#10b981'
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="mb-4">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
          {title}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Evolución del embudo etapa por etapa. Observa dónde se produce la mayor caída de prospectos.
        </p>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stages} margin={{ top: 10, right: 25, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="stage" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => formatNumber(v)} />
            <Tooltip
              formatter={(value, name) => [formatNumber(value, 1), name]}
              contentStyle={{
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="meta" name={name1} fill={color1} radius={[4, 4, 0, 0]} />
            <Bar dataKey="google" name={name2} fill={color2} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
