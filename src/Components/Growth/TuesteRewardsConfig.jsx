// DecisionLab 360 - TuesteRewardsConfig Component
// Tabla interactiva de configuración de recompensas con validador de $25 (Regla de Diego)

import React, { useState } from 'react';
import { Gift, ShieldCheck, AlertOctagon, Plus, Check, Trash2, Info, DollarSign } from 'lucide-react';
import { growthData } from '../../Data/growthData.js';
import { evaluateTuesteRewards } from '../../Engines/growthEngines.js';
import { formatCurrency, formatPercent } from '../../Services/calculationService.js';

export default function TuesteRewardsConfig() {
  const [tiers, setTiers] = useState(growthData.tueste.defaultRewardTiers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTier, setNewTier] = useState({
    level: '',
    requirementCount: 1,
    requirementType: 'compra',
    friendReward: '',
    friendRewardCost: 5.0,
    referrerReward: '',
    referrerRewardCost: 5.0,
    active: true
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Evaluación con el motor económico
  const evaluation = evaluateTuesteRewards({ tiers });

  const handleToggleTier = (id) => {
    setTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const handleDeleteTier = (id) => {
    setTiers((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTier = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const divisor = newTier.requirementType === 'compra' ? Math.max(1, newTier.requirementCount) : 1;
    const unitCost = Number(newTier.friendRewardCost) + (Number(newTier.referrerRewardCost) / divisor);

    if (unitCost > evaluation.maxAllowedCAC) {
      setErrorMessage(`¡Violación de la Regla de Diego! El costo acumulado por referido es de ${formatCurrency(unitCost)}, superando el límite de ${formatCurrency(evaluation.maxAllowedCAC)} (mitad del CAC Meta de $50).`);
      return;
    }

    const created = {
      ...newTier,
      id: `tier_${Date.now()}`,
      friendRewardCost: Number(newTier.friendRewardCost),
      referrerRewardCost: Number(newTier.referrerRewardCost),
      note: `Costo unitario por referido = ${formatCurrency(unitCost)}`
    };

    setTiers((prev) => [...prev, created]);
    setShowAddModal(false);
    setNewTier({
      level: '',
      requirementCount: 1,
      requirementType: 'compra',
      friendReward: '',
      friendRewardCost: 5.0,
      referrerReward: '',
      referrerRewardCost: 5.0,
      active: true
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs space-y-5">
      {/* Header with Diego's Golden Rule */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Gift className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Sistema de Recompensas por Niveles — Tueste Rewards
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configuración y verificación automática frente al límite de adquisición por referido
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Regla de Diego (Límite Máximo)
            </span>
            <span className="text-lg font-extrabold text-amber-700 font-mono">
              ≤ {formatCurrency(evaluation.maxAllowedCAC)} / referido
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Nivel</span>
          </button>
        </div>
      </div>

      {/* Economic Comparison Alert Banner */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
        evaluation.compliesOverall
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : 'bg-rose-50 border-rose-200 text-rose-900'
      }`}>
        {evaluation.compliesOverall ? (
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>
              {evaluation.compliesOverall
                ? 'Cumplimiento Económico Aprobado'
                : '¡Alerta de Rentabilidad en Recompensas!'}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-white/80 border">
              CAC Meta: {formatCurrency(evaluation.metaCAC)} | CAC Referidos Promedio: {formatCurrency(evaluation.avgReferralCAC)}
            </span>
          </div>
          <p>
            Un cliente de Meta cuesta <strong>{formatCurrency(evaluation.metaCAC)}</strong> ($4,000 pauta + $1,000 agencia ÷ 100 clientes nuevos).
            Las recompensas activas generan un CAC promedio de <strong>{formatCurrency(evaluation.avgReferralCAC)}</strong> por referido,
            ahorrando un <strong>{formatPercent(evaluation.savingsPercent)}</strong> ({formatCurrency(evaluation.savingsVsMeta)} por cliente).
          </p>
        </div>
      </div>

      {/* Reward Cost Reference Table (From PDF) */}
      <div className="bg-amber-50/50 rounded-xl border border-amber-200/50 p-3 text-xs">
        <span className="font-bold text-amber-950 block mb-1.5 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-700" />
          Costos Reales de Referencia (Datos de la Parte 2):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-slate-700">
          <div className="bg-white p-2 rounded border border-amber-100">
            <span className="font-semibold block">Descuento directo:</span>
            <span className="text-slate-600">Importe facial descontado</span>
          </div>
          <div className="bg-white p-2 rounded border border-amber-100">
            <span className="font-semibold block">Bolsa muestra 100g:</span>
            <span className="text-slate-600 font-mono font-bold">$1.60</span> (en pedido existente)
          </div>
          <div className="bg-white p-2 rounded border border-amber-100">
            <span className="font-semibold block">Bolsa 340g de regalo:</span>
            <span className="text-slate-600 font-mono font-bold">$5.44</span> (costo de café)
          </div>
          <div className="bg-white p-2 rounded border border-amber-100">
            <span className="font-semibold block">Mes suscripción gratis:</span>
            <span className="text-slate-600">Desembolso <strong className="font-mono">$16.58</strong> ($10.88 café + $4.50 envío + $1.20 caja) | No cobrado: $30.60</span>
          </div>
        </div>
      </div>

      {/* Rewards Configuration Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase font-bold tracking-wider">
              <th className="py-2.5 px-3">Estado</th>
              <th className="py-2.5 px-3">Nivel / Hito</th>
              <th className="py-2.5 px-3">Requisito</th>
              <th className="py-2.5 px-3">Premio Amigo</th>
              <th className="py-2.5 px-3">Premio Invitador</th>
              <th className="py-2.5 px-3 text-right">Costo Amigo</th>
              <th className="py-2.5 px-3 text-right">Costo Invitador / Ref.</th>
              <th className="py-2.5 px-3 text-right">Costo Acumulado</th>
              <th className="py-2.5 px-3 text-center">Cumple Regla</th>
              <th className="py-2.5 px-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {evaluation.tierEvaluations.map((tier) => (
              <tr key={tier.id} className={`hover:bg-slate-50/80 transition-colors ${!tier.active ? 'opacity-50 bg-slate-50/40' : ''}`}>
                <td className="py-3 px-3">
                  <button
                    onClick={() => handleToggleTier(tier.id)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-colors ${
                      tier.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tier.active ? 'ACTIVO' : 'PAUSADO'}
                  </button>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-900">{tier.level}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] text-slate-700">
                    {tier.requirementCount} {tier.requirementType === 'suscripcion' ? 'suscripción' : 'amigos'}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-700">{tier.friendReward}</td>
                <td className="py-3 px-3 text-slate-700">{tier.referrerReward}</td>
                <td className="py-3 px-3 text-right font-mono font-semibold text-slate-800">
                  {formatCurrency(tier.friendCostUnit)}
                </td>
                <td className="py-3 px-3 text-right font-mono font-semibold text-slate-800">
                  {formatCurrency(tier.referrerCostUnit)}
                </td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-slate-900">
                  {formatCurrency(tier.costPerReferral)}
                </td>
                <td className="py-3 px-3 text-center">
                  {tier.complies ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3" />
                      ≤ $25
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      <AlertOctagon className="w-3 h-3" />
                      Viola
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => handleDeleteTier(tier.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Eliminar nivel"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to add new tier */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-slate-900 text-sm">Crear Nuevo Nivel de Recompensa</h4>
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

            <form onSubmit={handleAddTier} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre del Nivel:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nivel 4: Cinco Amigos Frecuentes"
                  value={newTier.level}
                  onChange={(e) => setNewTier({ ...newTier, level: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cantidad Requerida:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTier.requirementCount}
                    onChange={(e) => setNewTier({ ...newTier, requirementCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tipo de Requisito:</label>
                  <select
                    value={newTier.requirementType}
                    onChange={(e) => setNewTier({ ...newTier, requirementType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="compra">Amigos que compran</option>
                    <option value="suscripcion">Amigo que se suscribe</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Premio para Amigo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: $5 de descuento"
                    value={newTier.friendReward}
                    onChange={(e) => setNewTier({ ...newTier, friendReward: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Costo Premio Amigo ($):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={newTier.friendRewardCost}
                    onChange={(e) => setNewTier({ ...newTier, friendRewardCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Premio para Quien Invita:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Bolsa 340g gratis"
                    value={newTier.referrerReward}
                    onChange={(e) => setNewTier({ ...newTier, referrerReward: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Costo Premio Invitador ($):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={newTier.referrerRewardCost}
                    onChange={(e) => setNewTier({ ...newTier, referrerRewardCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 rounded-lg text-amber-900 flex justify-between items-center font-mono">
                <span>Costo acumulado estimado por referido:</span>
                <span className="font-bold text-sm">
                  {formatCurrency(Number(newTier.friendRewardCost) + (Number(newTier.referrerRewardCost) / Math.max(1, newTier.requirementCount)))}
                </span>
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
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shadow-xs"
                >
                  Guardar Nivel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

