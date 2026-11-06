// DecisionLab 360 - Matriz de Canales de Adquisición a 90 Días
// Paid / Owned / Earned editable para Tueste, Agendo y Sol de Casa

import React, { useState } from 'react';
import { Calendar, Layers, DollarSign, Target, User, CheckCircle2, RotateCcw } from 'lucide-react';
import { growthStorageService } from '../../Services/growthStorageService.js';

export default function ChannelMatrix90Days({ caseKey = 'tueste' }) {
  const [matrices, setMatrices] = useState(growthStorageService.getChannelMatrices());
  const [selectedCase, setSelectedCase] = useState(caseKey);

  const currentChannels = matrices[selectedCase] || [];

  const handleUpdateField = (channelId, field, value) => {
    const updated = {
      ...matrices,
      [selectedCase]: matrices[selectedCase].map((c) =>
        c.id === channelId ? { ...c, [field]: value } : c
      )
    };
    setMatrices(updated);
    growthStorageService.saveChannelMatrices(updated);
  };

  const handleReset = () => {
    const defaultData = growthStorageService.resetChannelMatrices();
    setMatrices(defaultData);
  };

  const caseTitles = {
    tueste: { title: 'Tueste (Café DTC)', color: 'border-amber-500 bg-amber-50 text-amber-900' },
    agendo: { title: 'Agendo (SaaS B2B)', color: 'border-blue-500 bg-blue-50 text-blue-900' },
    solDeCasa: { title: 'Sol de Casa (Lead Gen Solar)', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Calendar className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Matriz de Canales a 90 Días: Paid · Owned · Earned
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Plan estratégico editable a 30, 60 y 90 días para diversificar la adquisición y reducir la dependencia de anuncios
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Selector de Negocio si no está fijado */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setSelectedCase('tueste')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                selectedCase === 'tueste' ? 'bg-amber-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tueste
            </button>
            <button
              onClick={() => setSelectedCase('agendo')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                selectedCase === 'agendo' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Agendo
            </button>
            <button
              onClick={() => setSelectedCase('solDeCasa')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                selectedCase === 'solDeCasa' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sol de Casa
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 border hover:bg-slate-50"
            title="Restaurar matriz original"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Header */}
      <div className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between ${caseTitles[selectedCase]?.color}`}>
        <span>Plan de canales para <strong>{caseTitles[selectedCase]?.title}</strong></span>
        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-white/70">
          Metas editables [SIMULADO]
        </span>
      </div>

      {/* Responsive Matrix Grid */}
      <div className="space-y-4">
        {currentChannels.map((channel) => (
          <div
            key={channel.id}
            className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/40 hover:bg-slate-50/80 transition-colors"
          >
            {/* Channel Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                  channel.type === 'Paid'
                    ? 'bg-rose-100 text-rose-800'
                    : channel.type === 'Owned'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {channel.type}
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {channel.channel}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-slate-600">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">{channel.lead}</span>
                </div>
                <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>{channel.budget}</span>
                </div>
              </div>
            </div>

            {/* Strategic Action Description */}
            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Acción Estratégica:</label>
              <textarea
                rows="2"
                value={channel.action}
                onChange={(e) => handleUpdateField(channel.id, 'action', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            {/* Key KPI */}
            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Métrica Clave (KPI):</label>
              <input
                type="text"
                value={channel.kpi}
                onChange={(e) => handleUpdateField(channel.id, 'kpi', e.target.value)}
                className="w-full px-3 py-1 border border-slate-200 rounded-xl bg-white text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* 30, 60, 90 Days Roadmap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  30 Días (Mes 1)
                </span>
                <input
                  type="text"
                  value={channel.expected30}
                  onChange={(e) => handleUpdateField(channel.id, 'expected30', e.target.value)}
                  className="w-full font-medium text-slate-800 border-b border-transparent hover:border-slate-200 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  60 Días (Mes 2)
                </span>
                <input
                  type="text"
                  value={channel.expected60}
                  onChange={(e) => handleUpdateField(channel.id, 'expected60', e.target.value)}
                  className="w-full font-medium text-slate-800 border-b border-transparent hover:border-slate-200 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  90 Días (Mes 3)
                </span>
                <input
                  type="text"
                  value={channel.expected90}
                  onChange={(e) => handleUpdateField(channel.id, 'expected90', e.target.value)}
                  className="w-full font-medium text-slate-800 border-b border-transparent hover:border-slate-200 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

