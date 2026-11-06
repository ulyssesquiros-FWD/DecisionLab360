// DecisionLab 360 - SolDeCasaRewardsConfig Component
// Validador económico estricto con costo probabilístico de visitas técnicas (Límite Andrés ≤ $300)

import React, { useState } from 'react';
import { Sun, ShieldCheck, AlertOctagon, Check, Plus, Trash2, Info, DollarSign } from 'lucide-react';
import { growthData } from '../../Data/growthData.js';
import { evaluateSolDeCasaRewards } from '../../Engines/growthEngines.js';
import { formatCurrency, formatPercent } from '../../Services/calculationService.js';

export default function SolDeCasaRewardsConfig() {
  const [rewardsList, setRewardsList] = useState(growthData.solDeCasa.defaultRewardTiers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReward, setNewReward] = useState({
    milestone: 'Vecino firma e instala paneles solares',
    rewardDescription: '',
    cost: 100.0,
    active: true,
    note: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const evalModel = evaluateSolDeCasaRewards(rewardsList);

  const handleToggleReward = (id) => {
    setRewardsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleDeleteReward = (id) => {
    setRewardsList((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-validar si añadir este premio excede el límite de $300
    const testList = [
      ...rewardsList,
      {
        ...newReward,
        id: `sol_rew_${Date.now()}`,
        cost: Number(newReward.cost)
      }
    ];

    const testEval = evaluateSolDeCasaRewards(testList);
    if (!testEval.compliesWithMax300) {
      setErrorMessage(`¡Violación de la Regla de Andrés! El CAC esperado total ascendería a ${formatCurrency(testEval.totalExpectedCAC)}, superando el límite inquebrantable de $300 por instalación vendida (considerando los $133.33 de visitas técnicas obligatorias).`);
      return;
    }

    setRewardsList(testList);
    setShowAddModal(false);
    setNewReward({
      milestone: 'Vecino firma e instala paneles solares',
      rewardDescription: '',
      cost: 100.0,
      active: true,
      note: ''
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-200/80 p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Sun className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Sistema de Recompensas y Costo de Visitas — Comunidad Solar
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Validación de la Regla de Andrés: Suma de visitas técnicas necesarias + premios ≤ $300 por instalación cerrada
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Límite Máximo por Venta
            </span>
            <span className="text-lg font-extrabold text-emerald-700 font-mono">
              ≤ {formatCurrency(evalModel.maxBudget)}
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Premio</span>
          </button>
        </div>
      </div>

      {/* Probabilistic Mathematical Explanation Banner */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-2 leading-relaxed">
        <div className="flex items-center justify-between font-bold text-emerald-950">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Desglose Matemático Obligatorio (Costos Esperados de Visitas):
          </span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800">
            Total CAC Referidos: {formatCurrency(evalModel.totalExpectedCAC)}
          </span>
        </div>
        <p className="text-emerald-900/90">
          • Tasa de cierre histórica en visitas de referidos: <strong>45%</strong>.<br />
          • Para cerrar <strong>1 instalación solar</strong> se requiere realizar <strong>{evalModel.visitsDonePerSale.toFixed(3)} visitas técnicas</strong> (1 ÷ 0.45).<br />
          • Cada visita cuesta <strong>$60.00</strong> en viáticos y bono técnico.<br />
          • <strong>Costo esperado de visitas por instalación vendida = {evalModel.visitsDonePerSale.toFixed(3)} × $60 = {formatCurrency(evalModel.expectedVisitCostPerSale)}</strong>.<br />
          • <strong>Presupuesto máximo disponible para premios = $300.00 - $133.33 = {formatCurrency(evalModel.maxRewardBudgetPerSale)}</strong>.
        </p>
      </div>

      {/* Table of Rewards and Milestone Probabilities */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b">
              <th className="p-3">Estado</th>
              <th className="p-3">Hito que Dispara el Premio</th>
              <th className="p-3">Descripción de la Recompensa</th>
              <th className="p-3 text-right">Costo Facial</th>
              <th className="p-3 text-right">Multiplicador por Venta</th>
              <th className="p-3 text-right">Costo Esperado / Venta</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Fixed Row: Visitas Técnicas */}
            <tr className="bg-slate-50/50 font-semibold text-slate-800">
              <td className="p-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 font-bold">
                  BASE FIJA
                </span>
              </td>
              <td className="p-3">Visitas Técnicas de Medición (Operación)</td>
              <td className="p-3 text-slate-500">2.222 visitas necesarias a $60 c/u para lograr 1 cierre</td>
              <td className="p-3 text-right font-mono">$60.00</td>
              <td className="p-3 text-right font-mono text-slate-600">2.222x</td>
              <td className="p-3 text-right font-mono font-bold text-slate-900">
                {formatCurrency(evalModel.expectedVisitCostPerSale)}
              </td>
              <td className="p-3 text-center text-slate-400">-</td>
            </tr>

            {/* Configured Rewards */}
            {evalModel.evaluatedRewards.map((reward) => (
              <tr key={reward.id} className={`hover:bg-emerald-50/30 transition-colors ${!reward.active ? 'opacity-50' : ''}`}>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleReward(reward.id)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-colors ${
                      reward.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {reward.active ? 'ACTIVO' : 'PAUSADO'}
                  </button>
                </td>
                <td className="p-3 font-semibold text-slate-900">{reward.milestone}</td>
                <td className="p-3 text-slate-700">{reward.rewardDescription}</td>
                <td className="p-3 text-right font-mono text-slate-700">{formatCurrency(reward.cost)}</td>
                <td className="p-3 text-right font-mono text-slate-500">{reward.multiplierPerSale.toFixed(3)}x</td>
                <td className="p-3 text-right font-mono font-extrabold text-emerald-800">
                  {formatCurrency(reward.expectedCostPerSale)}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteReward(reward.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold text-xs">
              <td colSpan="5" className="p-3 text-right uppercase tracking-wider text-slate-700">
                Costo Total Adquisición por Referido (Visitas + Premios):
              </td>
              <td className="p-3 text-right font-mono text-sm font-black text-slate-900">
                {formatCurrency(evalModel.totalExpectedCAC)}
              </td>
              <td className="p-3 text-center">
                {evalModel.compliesWithMax300 ? (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ≤ $300 ✓
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    Viola Límite
                  </span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Modal Add Reward */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-slate-900 text-sm">Nuevo Premio para la Familia Referidora</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs leading-relaxed">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleAddReward} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Hito que Dispara la Recompensa:</label>
                <select
                  value={newReward.milestone}
                  onChange={(e) => setNewReward({ ...newReward, milestone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Vecino firma e instala paneles solares">Vecino firma e instala paneles solares (Cierre)</option>
                  <option value="Vecino agenda visita técnica">Vecino agenda visita técnica (Intermedio)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Descripción del Premio:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Bono de $100 en mantenimiento o limpieza de paneles"
                  value={newReward.rewardDescription}
                  onChange={(e) => setNewReward({ ...newReward, rewardDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Costo Facial del Premio ($):</label>
                <input
                  type="number"
                  step="5"
                  min="0"
                  required
                  value={newReward.cost}
                  onChange={(e) => setNewReward({ ...newReward, cost: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-900 text-xs">
                <span>Presupuesto máximo disponible actualmente para premios: </span>
                <strong className="font-mono">{formatCurrency(evalModel.maxRewardBudgetPerSale)}</strong>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-xs"
                >
                  Guardar Premio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

