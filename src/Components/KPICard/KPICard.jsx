// DecisionLab 360 - KPICard Component
import React from 'react';

export default function KPICard({
  title,
  value,
  subvalue,
  badgeText,
  badgeType = 'default', // 'success', 'warning', 'danger', 'info', 'neutral'
  icon: Icon,
  helperText,
  accentColor = 'border-slate-200'
}) {
  const getBadgeClasses = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'danger':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-sm transition-all duration-200 ${accentColor}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {badgeText && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeClasses(badgeType)} font-mono`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </span>
        {subvalue && (
          <span className="text-xs font-medium text-slate-500">
            {subvalue}
          </span>
        )}
      </div>

      {helperText && (
        <p className="text-xs text-slate-500 leading-relaxed font-normal mt-1 border-t border-slate-100 pt-2">
          {helperText}
        </p>
      )}
    </div>
  );
}
