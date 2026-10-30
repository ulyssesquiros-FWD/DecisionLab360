// DecisionLab 360 - ScenarioCard Component
import React from 'react';
import { formatCurrency, formatPercent, formatRatio } from '../../Services/calculationService.js';
import { TrendingUp, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ScenarioCard({
  title,
  tag,
  tagColor = 'bg-slate-100 text-slate-700',
  description,
  metrics = [],
  highlight = false,
  riskAssessment,
  verdict
}) {
  return (
    <div
      className={`rounded-xl border transition-all duration-200 flex flex-col justify-between ${
        highlight
          ? 'bg-blue-50/40 border-blue-300 ring-2 ring-blue-500/20 shadow-md'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
      } p-5`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-900 text-base leading-snug">
            {title}
          </h3>
          {tag && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${tagColor}`}>
              {tag}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Metrics Grid */}
        <div className="space-y-2 mb-4 bg-slate-50/80 rounded-lg p-3 border border-slate-100">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{m.label}:</span>
              <span className={`font-semibold font-mono ${m.color || 'text-slate-900'}`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Risk notes */}
      <div className="border-t border-slate-100 pt-3 mt-auto">
        {riskAssessment && (
          <div className="text-[11px] text-slate-600 mb-2 flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span><strong>Riesgos:</strong> {riskAssessment}</span>
          </div>
        )}

        {verdict && (
          <div className="text-[11px] font-semibold text-slate-800 flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-slate-200">
            <span>Veredicto:</span>
            <span className={verdict.color || 'text-blue-600'}>{verdict.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}
