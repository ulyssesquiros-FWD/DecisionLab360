// DecisionLab 360 - Configuración y Supuestos
import React, { useState } from 'react';
import { Settings as SettingsIcon, RotateCcw, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { storageService } from '../../Services/storageService.js';
import { tuesteOriginalData } from '../../Data/tuesteData.js';
import { agendoOriginalData } from '../../Data/agendoData.js';
import { solDeCasaOriginalData } from '../../Data/solDeCasaData.js';

export default function Settings() {
  const [resetMessage, setResetMessage] = useState(null);

  const handleResetAll = () => {
    if (window.confirm('¿Seguro que deseas reiniciar todos los supuestos de los 3 casos empresariales a los valores originales de los documentos?')) {
      storageService.resetAllAssumptions();
      setResetMessage('Todos los supuestos han sido restaurados exitosamente.');
      setTimeout(() => setResetMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-300">
              <SettingsIcon className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
              Configuración y Persistencia
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Gestión de Supuestos y Almacenamiento Local
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervisa los datos maestros precargados y restablece el estado de los modelos en LocalStorage
          </p>
        </div>

        <button
          onClick={handleResetAll}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold text-xs transition-colors shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restaurar Todo a Valores de Fábrica</span>
        </button>
      </div>

      {resetMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{resetMessage}</span>
        </div>
      )}

      {/* 3 Cases Master Baseline Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tueste Baseline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Supuestos Maestros · Tueste (DTC)
          </h3>
          <div className="space-y-1.5 text-xs text-slate-600 font-mono">
            <div className="flex justify-between">
              <span>Bolsa 340g / Pedido 2 bolsas:</span>
              <span className="font-bold text-slate-800">$17 / $34</span>
            </div>
            <div className="flex justify-between">
              <span>Costo café por pedido:</span>
              <span className="font-bold text-slate-800">$10.88</span>
            </div>
            <div className="flex justify-between">
              <span>Envío original Tueste:</span>
              <span className="font-bold text-slate-800">$4.50</span>
            </div>
            <div className="flex justify-between">
              <span>Pasarela de pago:</span>
              <span className="font-bold text-slate-800">4.5%</span>
            </div>
            <div className="flex justify-between">
              <span>Caja y empaque:</span>
              <span className="font-bold text-slate-800">$1.20</span>
            </div>
            <div className="flex justify-between">
              <span>Caja inicial / Piso:</span>
              <span className="font-bold text-slate-800">$35,000 / $5,000</span>
            </div>
            <div className="flex justify-between">
              <span>Costos fijos mensuales:</span>
              <span className="font-bold text-slate-800">$6,500</span>
            </div>
            <div className="flex justify-between">
              <span>Segunda tostadora:</span>
              <span className="font-bold text-slate-800">$14,000</span>
            </div>
          </div>
        </div>

        {/* Agendo Baseline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Supuestos Maestros · Agendo (SaaS)
          </h3>
          <div className="space-y-1.5 text-xs text-slate-600 font-mono">
            <div className="flex justify-between">
              <span>Plan mensual / anual:</span>
              <span className="font-bold text-slate-800">$25 / $240</span>
            </div>
            <div className="flex justify-between">
              <span>Margen bruto:</span>
              <span className="font-bold text-slate-800">78%</span>
            </div>
            <div className="flex justify-between">
              <span>Conversión de trials:</span>
              <span className="font-bold text-slate-800">14%</span>
            </div>
            <div className="flex justify-between">
              <span>Sueldo Mariela:</span>
              <span className="font-bold text-slate-800">$1,200 (máx 500 trials)</span>
            </div>
            <div className="flex justify-between">
              <span>Comisión por cliente ads:</span>
              <span className="font-bold text-slate-800">$20</span>
            </div>
            <div className="flex justify-between">
              <span>Orgánicos mensuales:</span>
              <span className="font-bold text-slate-800">50</span>
            </div>
            <div className="flex justify-between">
              <span>Churn mensual:</span>
              <span className="font-bold text-slate-800">6%</span>
            </div>
            <div className="flex justify-between">
              <span>Caja inicial / Piso:</span>
              <span className="font-bold text-slate-800">$60,000 / $10,000</span>
            </div>
            <div className="flex justify-between">
              <span>Costos fijos mensuales:</span>
              <span className="font-bold text-slate-800">$14,000</span>
            </div>
          </div>
        </div>

        {/* Sol de Casa Baseline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Supuestos Maestros · Sol de Casa
          </h3>
          <div className="space-y-1.5 text-xs text-slate-600 font-mono">
            <div className="flex justify-between">
              <span>Precio promedio instalación:</span>
              <span className="font-bold text-slate-800">$6,500</span>
            </div>
            <div className="flex justify-between">
              <span>Equipos / Cuadrilla:</span>
              <span className="font-bold text-slate-800">55% / 17%</span>
            </div>
            <div className="flex justify-between">
              <span>Comisión asesora:</span>
              <span className="font-bold text-slate-800">3%</span>
            </div>
            <div className="flex justify-between">
              <span>Contribución neta:</span>
              <span className="font-bold text-slate-800">$1,625 (25%)</span>
            </div>
            <div className="flex justify-between">
              <span>Costo por visita técnica:</span>
              <span className="font-bold text-slate-800">$60</span>
            </div>
            <div className="flex justify-between">
              <span>Capacidad base (2 técnicos):</span>
              <span className="font-bold text-slate-800">100 visitas/mes</span>
            </div>
            <div className="flex justify-between">
              <span>Técnico extra (+50 vis):</span>
              <span className="font-bold text-slate-800">$1,800/mes</span>
            </div>
            <div className="flex justify-between">
              <span>Caja inicial / Piso:</span>
              <span className="font-bold text-slate-800">$12,000 / $5,000</span>
            </div>
            <div className="flex justify-between">
              <span>Costos fijos mensuales:</span>
              <span className="font-bold text-slate-800">$18,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
