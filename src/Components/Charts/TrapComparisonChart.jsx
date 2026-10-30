// DecisionLab 360 - TrapComparisonChart Component
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { formatNumber, formatRatio, formatCurrency } from '../../Services/calculationService.js';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TrapComparisonChart({
  caseKey = 'tueste',
  customData = null
}) {
  let chartData = [];
  let title = '';
  let subtitle = '';
  let interpretation = '';

  if (caseKey === 'tueste') {
    title = 'La Trampa del ROAS: Reportado vs Real vs Break-even';
    subtitle = 'Meta atribuye compras de clientes recurrentes para inflar el ROAS a 3.0x';
    chartData = [
      { name: 'ROAS Meta Ads Manager', value: 3.00, color: '#f59e0b', note: 'Engañoso (Incluye Retargeting)' },
      { name: 'ROAS Break-even', value: 2.14, color: '#64748b', note: 'Umbral Mínimo para No Perder' },
      { name: 'ROAS Real Primer Pedido', value: 0.70, color: '#ef4444', note: 'Realidad (165 clientes x $34 / $8k)' }
    ];
    interpretation = 'Meta reporta un ROAS de 3.0x porque atribuye $24,000 en ventas (el 86% de toda la tienda), cuando en realidad $6,600 de los anuncios van a retargeting de compradores antiguos. El cliente nuevo solo genera un ROAS de 0.70x en su primera compra: ¡Tueste pierde dinero inmediatamente con cada cliente adquirido!';
  } else if (caseKey === 'agendo') {
    title = 'La Trampa de Valeria: CAC Paid ($180) vs CAC Blended ($105)';
    subtitle = 'Valeria usa el CAC Blended para disfrazar los clientes orgánicos gratuitos como éxito de anuncios';
    chartData = [
      { name: 'Claim Valeria (LTV:CAC)', value: 2.40, color: '#f59e0b', note: 'Reportado al Inversionista' },
      { name: 'LTV:CAC Blended Real', value: 2.39, color: '#3b82f6', note: 'Mezcla 50 orgánicos gratis' },
      { name: 'LTV:CAC Paid Real', value: 1.40, color: '#ef4444', note: 'Realidad Publicitaria de Anuncios' }
    ];
    interpretation = 'Valeria divide los $12,600 de costos comerciales entre 120 clientes (incluyendo 50 barberías que llegaron por el boca a boca a costo cero) para reportar un CAC de $105. El CAC Paid real de los anuncios es de $180 ($12,600 / 70 clientes). El LTV real es $251.29, por lo que el LTV:CAC Paid es de 1.40x. Triplicar anuncios colapsaría la empresa.';
  } else if (caseKey === 'solDeCasa') {
    title = 'La Trampa de Leadly: CPL Barato ($8) vs CAC Real Caro ($718)';
    subtitle = 'El lead de Meta es 5 veces más barato, pero el cliente final cuesta 34% MÁS que en Google';
    chartData = [
      { name: 'CPL Meta vs Google (Ratio)', value: 0.20, color: '#f59e0b', note: 'Meta $8 vs Google $40 (5x menos)' },
      { name: 'Visitas Requeridas por Venta', value: 1.67, color: '#ef4444', note: 'Meta 5.56 vs Google 3.33 visitas' },
      { name: 'CAC Real Meta vs Google', value: 1.34, color: '#ef4444', note: 'Meta $718.13 vs Google $535.53 (+34%)' }
    ];
    interpretation = 'La agencia Leadly asegura que Meta es "5 veces más eficiente" porque su CPL es de $8 vs $40 de Google. Pero el 18% de teléfonos de Meta son falsos y cierran al 18% (vs 30% en Google). Como cada visita técnica cuesta $60, cerrar un cliente de Meta cuesta $718.13 en total, frente a $535.53 en Google. ¡Meta es 34% más caro y colapsa la cuadrilla técnica!';
  }

  const finalData = customData || chartData;

  return (
    <div className="bg-white rounded-xl border border-amber-200/90 p-4 sm:p-5 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />

      <div className="flex items-center gap-2 mb-1">
        <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
          <AlertTriangle className="w-4 h-4" />
        </span>
        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
          {title}
        </h4>
      </div>
      <p className="text-xs text-slate-500 mb-4 ml-8">
        {subtitle}
      </p>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={finalData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} tick={{ fill: '#334155' }} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip
              formatter={(val, name, props) => [val, props.payload.note || name]}
              contentStyle={{
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {finalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 bg-amber-50/70 border border-amber-200/60 rounded-lg p-3 text-xs text-amber-950 leading-relaxed">
        <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Veredicto Antifraude Financiero:</span>
        </div>
        <p>{interpretation}</p>
      </div>
    </div>
  );
}
