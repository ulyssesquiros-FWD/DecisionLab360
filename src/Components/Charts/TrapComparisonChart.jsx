// DecisionLab 360 - TrapComparisonChart Component
import React from 'react';
import { AlertTriangle, ShieldCheck, TrendingDown, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TrapComparisonChart({
  caseKey = 'tueste',
  customData = null
}) {
  let items = [];
  let title = '';
  let subtitle = '';
  let interpretation = '';
  let maxScale = 1;

  if (caseKey === 'tueste') {
    title = 'La Trampa del ROAS (Tueste)';
    subtitle = 'Meta atribuye recompras de clientes antiguos para inflar el ROAS a 3.0x';
    maxScale = 3.5;
    items = [
      {
        shortName: 'ROAS Meta Ads Manager',
        value: 3.00,
        displayValue: '3.00x',
        percent: (3.00 / 3.5) * 100,
        barColor: 'from-amber-400 to-amber-500',
        textColor: 'text-amber-700',
        badge: 'Engañoso / Inflado',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        description: 'Meta reclama $24,000 en ventas atribuidas, pero incluye $2,400 gastados en retargeting a compradores que ya conocían la marca.'
      },
      {
        shortName: 'ROAS Break-even (Equilibrio)',
        value: 2.14,
        displayValue: '2.14x',
        percent: (2.14 / 3.5) * 100,
        barColor: 'from-slate-400 to-slate-500',
        textColor: 'text-slate-700',
        badge: 'Umbral Mínimo',
        badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
        description: 'Umbral matemático (1 ÷ Margen 46.7%). Todo ROAS inferior a 2.14x destruye capital en la adquisición.'
      },
      {
        shortName: 'ROAS Real Primer Pedido',
        value: 0.70,
        displayValue: '0.70x',
        percent: (0.70 / 3.5) * 100,
        barColor: 'from-rose-500 to-red-600',
        textColor: 'text-rose-600',
        badge: 'Realidad Auditada',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
        description: '165 clientes nuevos x $34 ÷ $8,000 invertidos en Meta. Tueste pierde $1.44 por cada dólar publicitario en el día 1.'
      }
    ];
    interpretation = 'Meta reporta un ROAS de 3.0x atribuyéndose $24,000 en ventas, pero $2,400 van a retargeting de compradores anteriores. El cliente nuevo solo genera un ROAS de 0.70x en su primera compra: ¡Tueste pierde dinero inmediatamente con cada adquisición inicial sin recompras aseguradas!';
  } else if (caseKey === 'agendo') {
    title = 'La Trampa del CAC y LTV (Agendo)';
    subtitle = 'Valeria mezcla clientes orgánicos gratuitos para ocultar el costo real de los anuncios';
    maxScale = 3.0;
    items = [
      {
        shortName: 'LTV:CAC Claim Valeria',
        value: 2.40,
        displayValue: '2.40x',
        percent: (2.40 / 3.0) * 100,
        barColor: 'from-amber-400 to-amber-500',
        textColor: 'text-amber-700',
        badge: 'Reportado a Ricardo',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        description: 'Calculado mezclando 50 barberías gratuitas (boca a boca) y proyectando LTV infinito sin horizonte temporal.'
      },
      {
        shortName: 'LTV:CAC Blended Real (24m)',
        value: 2.39,
        displayValue: '2.39x',
        percent: (2.39 / 3.0) * 100,
        barColor: 'from-blue-400 to-blue-500',
        textColor: 'text-blue-700',
        badge: 'Mezcla Orgánicos',
        badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
        description: 'LTV real a 24 meses ($251.29) dividido entre el CAC Blended ($105). Oculta el costo marginal de anuncios.'
      },
      {
        shortName: 'LTV:CAC Paid Real (Anuncios)',
        value: 1.40,
        displayValue: '1.40x',
        percent: (1.40 / 3.0) * 100,
        barColor: 'from-rose-500 to-red-600',
        textColor: 'text-rose-600',
        badge: 'Realidad Anuncios',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
        description: 'LTV ($251.29) ÷ CAC Paid real ($180). Lejos del 3.0x necesario en SaaS. Triplicar a $30k quemaría la caja rápidamente.'
      }
    ];
    interpretation = 'Valeria divide los $12,600 de costos comerciales entre 120 clientes (incluyendo 50 orgánicos que llegaron gratis) para reportar un CAC de $105. El CAC Paid real es de $180 ($12,600 / 70 clientes). El LTV:CAC Paid real es de apenas 1.40x. Triplicar a $30k sufriría rendimientos decrecientes y quemaría la caja.';
  } else if (caseKey === 'solDeCasa') {
    title = 'La Trampa del Lead Barato (Sol de Casa)';
    subtitle = 'El lead de Meta es 5x más barato, pero el cliente cerrado cuesta 34% MÁS que en Google';
    maxScale = 800;
    items = [
      {
        shortName: 'CPL Meta Ads ($8) vs Google ($40)',
        value: 8.00,
        displayValue: '$8 (Meta) vs $40 (Google)',
        percent: 25,
        barColor: 'from-amber-400 to-amber-500',
        textColor: 'text-amber-700',
        badge: 'Métrica Trampa (CPL)',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        description: 'Meta parece 5x más barato, pero el 18% son teléfonos falsos y solo califica el 45% (vs 70% en Google).'
      },
      {
        shortName: 'CAC Real Google Ads',
        value: 535.54,
        displayValue: '$535.54',
        percent: (535.54 / 800) * 100,
        barColor: 'from-emerald-500 to-teal-600',
        textColor: 'text-emerald-700',
        badge: 'Opción Eficiente',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        description: 'Cierra al 30% con solo 3.33 visitas por venta ($4,000 en anuncios + $2,000 en viáticos). Alta intención de compra.'
      },
      {
        shortName: 'CAC Real Meta Ads',
        value: 718.13,
        displayValue: '$718.13',
        percent: (718.13 / 800) * 100,
        barColor: 'from-rose-500 to-red-600',
        textColor: 'text-rose-600',
        badge: '+34% Más Caro',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
        description: 'Exige 5.56 visitas por venta ($333 en viáticos). Satura la capacidad de los técnicos y destruye el margen neto.'
      }
    ];
    interpretation = 'Leadly vende la ilusión del lead de $8, pero cada visita técnica cuesta $60. Meta requiere 5.56 visitas para cerrar una venta, disparando el CAC Real a $718.13 frente a $535.53 en Google. ¡El cliente de Meta es 34% más caro! Mover todo a Meta colapsa la capacidad y baja las ventas de 22.3 a 17.5 al mes.';
  }

  const finalItems = customData || items;

  return (
    <div className="bg-white rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-bl-full pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </span>
          <h4 className="font-bold text-slate-900 text-base leading-snug">
            {title}
          </h4>
        </div>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          {subtitle}
        </p>

        {/* Visual Benchmark Gauges / Bars - Highly readable with ample spacing */}
        <div className="space-y-4 my-2">
          {finalItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 space-y-2 hover:border-slate-300 transition-colors"
            >
              {/* Title & Badge */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                <span className="font-semibold text-slate-800">
                  {item.shortName}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeClass} font-mono shrink-0`}>
                  {item.badge}
                </span>
              </div>

              {/* Progress Bar & Value Display */}
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-200/70 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.barColor} transition-all duration-500`}
                    style={{ width: `${Math.min(Math.max(item.percent, 8), 100)}%` }}
                  />
                </div>
                <span className={`font-mono font-extrabold text-sm shrink-0 ${item.textColor}`}>
                  {item.displayValue}
                </span>
              </div>

              {/* Detailed Context Note */}
              <p className="text-[11px] text-slate-500 leading-normal pt-0.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Forensic Verdict Callout */}
      <div className="mt-4 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-950 leading-relaxed">
        <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Veredicto Antifraude Financiero:</span>
        </div>
        <p>{interpretation}</p>
      </div>
    </div>
  );
}
