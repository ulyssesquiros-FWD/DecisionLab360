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
  Cell,
  LabelList
} from 'recharts';
import { formatNumber, formatRatio, formatCurrency } from '../../Services/calculationService.js';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function TrapComparisonChart({
  caseKey = 'tueste',
  customData = null
}) {
  let chartData = [];
  let title = '';
  let subtitle = '';
  let interpretation = '';
  let unit = 'ratio'; // 'ratio' or 'currency'

  if (caseKey === 'tueste') {
    title = 'La Trampa del ROAS (Tueste)';
    subtitle = 'Meta atribuye recompras de clientes antiguos para inflar el ROAS a 3.0x';
    chartData = [
      {
        shortName: 'ROAS Meta',
        fullName: 'ROAS Meta Ads Manager',
        value: 3.00,
        displayValue: '3.00x',
        color: '#f59e0b',
        badge: 'Engañoso',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        note: 'Incluye $2,400 en retargeting de compradores previos (7d clic / 1d view)'
      },
      {
        shortName: 'Break-even',
        fullName: 'ROAS Break-even',
        value: 2.14,
        displayValue: '2.14x',
        color: '#64748b',
        badge: 'Umbral Mínimo',
        badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
        note: '1 ÷ Margen de contribución (46.7%). Mínimo para no perder dinero'
      },
      {
        shortName: 'Real 1er Pedido',
        fullName: 'ROAS Real Primer Pedido',
        value: 0.70,
        displayValue: '0.70x',
        color: '#ef4444',
        badge: 'Realidad Auditada',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
        note: '165 clientes nuevos x $34 ÷ $8,000 invertidos en Meta. Pérdida el día 1'
      }
    ];
    interpretation = 'Meta reporta un ROAS de 3.0x atribuyéndose $24,000 en ventas (el 86% de Shopify), pero $2,400 van a retargeting de compradores anteriores. El cliente nuevo solo genera un ROAS de 0.70x en su primera compra: ¡Tueste pierde dinero inmediatamente con cada adquisición inicial!';
  } else if (caseKey === 'agendo') {
    title = 'La Trampa del CAC y LTV (Agendo)';
    subtitle = 'Valeria mezcla clientes orgánicos gratuitos para ocultar el costo real de los anuncios';
    chartData = [
      {
        shortName: 'Claim Valeria',
        fullName: 'LTV:CAC Claim Valeria',
        value: 2.40,
        displayValue: '2.40x',
        color: '#f59e0b',
        badge: 'Reportado a Ricardo',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        note: 'Calculado usando CAC Blended de $105 y LTV sin tope de tiempo'
      },
      {
        shortName: 'Blended Real',
        fullName: 'LTV:CAC Blended Real',
        value: 2.39,
        displayValue: '2.39x',
        color: '#3b82f6',
        badge: 'Mezcla Orgánicos',
        badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
        note: 'Mezcla 50 barberías gratuitas boca a boca para bajar el CAC promedio'
      },
      {
        shortName: 'Paid Real',
        fullName: 'LTV:CAC Paid Real',
        value: 1.40,
        displayValue: '1.40x',
        color: '#ef4444',
        badge: 'Realidad Anuncios',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
        note: '$251.29 LTV (24m) ÷ $180 CAC Paid real. Lejos de la salud SaaS (3.0x)'
      }
    ];
    interpretation = 'Valeria divide los $12,600 de costos comerciales entre 120 clientes (incluyendo 50 orgánicos que llegaron gratis) para reportar un CAC de $105. El CAC Paid real de los anuncios es de $180 ($12,600 / 70 clientes). El LTV:CAC Paid real es de apenas 1.40x. Triplicar a $30k sufriría rendimientos decrecientes y quemaría la caja.';
  } else if (caseKey === 'solDeCasa') {
    title = 'La Trampa del Lead Barato (Sol de Casa)';
    subtitle = 'El lead de Meta es 5x más barato, pero el cliente cerrado cuesta 34% MÁS que en Google';
    unit = 'currency';
    chartData = [
      {
        shortName: 'CPL Meta vs Google',
        fullName: 'CPL: Meta ($8) vs Google ($40)',
        value: 8.00,
        displayValue: '$8 vs $40',
        color: '#f59e0b',
        badge: 'Métrica Engañosa',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        note: 'Meta parece 5x más barato, pero tiene 18% teléfonos falsos y cierra al 18%'
      },
      {
        shortName: 'CAC Real Google',
        fullName: 'CAC Real Google Ads',
        value: 535.53,
        displayValue: '$535.54',
        color: '#10b981',
        badge: 'Más Económico',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        note: 'Cierra al 30% con solo 3.33 visitas por venta ($4k anuncios + $2.3k visitas)'
      },
      {
        shortName: 'CAC Real Meta',
        fullName: 'CAC Real Meta Ads',
        value: 718.13,
        displayValue: '$718.13',
        color: '#ef4444',
        badge: '+34% Más Caro',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
        note: 'Exige 5.56 visitas por venta ($333 en viáticos). Satura técnicos y cuesta más'
      }
    ];
    interpretation = 'Leadly vende la ilusión del lead de $8, pero cada visita técnica cuesta $60. Meta requiere 5.56 visitas para cerrar una venta, disparando el CAC Real a $718.13 frente a $535.53 en Google. ¡El cliente de Meta es 34% más caro! Mover todo a Meta colapsa la capacidad y baja las ventas de 22.3 a 17.5 al mes.';
  }

  const finalData = customData || chartData;

  return (
    <div className="bg-white rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
            <AlertTriangle className="w-4 h-4" />
          </span>
          <h4 className="font-bold text-slate-900 text-base">
            {title}
          </h4>
        </div>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          {subtitle}
        </p>

        {/* Horizontal Bar Chart (Bars flow left-to-right, eliminating XAxis label collision!) */}
        <div className="w-full h-56 my-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={finalData}
              margin={{ top: 10, right: 45, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(v) => (unit === 'currency' ? `$${v}` : `${v}x`)}
              />
              <YAxis
                type="category"
                dataKey="shortName"
                stroke="#475569"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={105}
              />
              <Tooltip
                formatter={(val, name, props) => [props.payload.displayValue, props.payload.fullName]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                {finalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
                ))}
                <LabelList
                  dataKey="displayValue"
                  position="right"
                  style={{ fill: '#1e293b', fontSize: 11, fontWeight: 700, fontFamily: 'monospace' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Structured Metric Legend & Breakdown */}
        <div className="space-y-2 my-3">
          {finalData.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-slate-800">{item.fullName}:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeClass} font-mono`}>
                  {item.badge}
                </span>
                <span className="font-mono font-extrabold text-slate-900">
                  {item.displayValue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forensic Verdict Callout */}
      <div className="mt-3 bg-amber-50/80 border border-amber-200/70 rounded-xl p-3.5 text-xs text-amber-950 leading-relaxed">
        <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Veredicto Antifraude Financiero:</span>
        </div>
        <p>{interpretation}</p>
      </div>
    </div>
  );
}
