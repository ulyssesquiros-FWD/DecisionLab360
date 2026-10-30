// DecisionLab 360 - MetricIndicator Component (Financial Traffic Light / Semaphores)
import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function MetricIndicator({
  status = 'yellow', // 'green', 'yellow', 'red'
  label,
  value,
  thresholds = '< 1.0x (Crítico) | 1.0x - 3.0x (Atención) | ≥ 3.0x (Sano)',
  description
}) {
  const configs = {
    green: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      badgeBg: 'bg-emerald-500',
      badgeText: 'Saludable (≥ 3.0x)',
      icon: CheckCircle2,
      dotColor: 'bg-emerald-500'
    },
    yellow: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      badgeBg: 'bg-amber-500',
      badgeText: 'Precaución (1.0x - 3.0x)',
      icon: AlertTriangle,
      dotColor: 'bg-amber-500'
    },
    red: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-800',
      badgeBg: 'bg-rose-500',
      badgeText: 'Crítico / Destructor (< 1.0x)',
      icon: XCircle,
      dotColor: 'bg-rose-500'
    }
  };

  const current = configs[status] || configs.yellow;
  const Icon = current.icon;

  return (
    <div className={`rounded-xl border p-4 ${current.bg} ${current.border}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${current.text}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {label}
          </span>
        </div>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white ${current.badgeBg}`}>
          {current.badgeText}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
          {value}
        </span>
      </div>

      {description && (
        <p className="text-xs text-slate-600 mb-2 leading-relaxed">
          {description}
        </p>
      )}

      {thresholds && (
        <div className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-2 flex items-center justify-between font-mono">
          <span>Umbrales:</span>
          <span>{thresholds}</span>
        </div>
      )}
    </div>
  );
}
