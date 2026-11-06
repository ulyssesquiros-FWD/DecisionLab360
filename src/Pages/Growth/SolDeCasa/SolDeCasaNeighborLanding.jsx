// DecisionLab 360 - Página Pública del Vecino: Calculadora Solar y Agendamiento
// Ruta: /sol-de-casa/ahorro/:referralCode
// Calculadora solar con payback en años, solicitud de visita técnica y registro de referido

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sun,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info
} from 'lucide-react';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import { calculateSolarSavings } from '../../../Engines/growthEngines.js';
import { formatCurrency, formatPercent } from '../../../Services/calculationService.js';

export default function SolDeCasaNeighborLanding() {
  const { referralCode = 'SOL-FAMILIA-MORA-9A' } = useParams();
  const [solState, setSolState] = useState(growthStorageService.getSolState());

  // Encontrar la familia que invita
  const referrerFamily = solState.families.find((f) => f.familyCode === referralCode) || solState.families[0];

  // Calculadora interactiva
  const [monthlyBill, setMonthlyBill] = useState(110);
  const savingsCalc = calculateSolarSavings(monthlyBill, 70, 6500);

  // Formulario de visita técnica
  const [formData, setFormData] = useState({
    name: 'Marta Delgado',
    phone: '+506 8900-5544',
    email: 'marta.delgado@email.demo',
    address: 'Curridabat, Condominio El Roble, Casa #15 (Vecina)',
    preferredDate: '2026-11-15',
    preferredTime: '10:00 AM'
  });

  const [requestConfirmed, setRequestConfirmed] = useState(null);

  const handleSubmitVisit = (e) => {
    e.preventDefault();

    const updatedState = growthStorageService.addSolVisitRequest({
      referralCode,
      neighborName: formData.name,
      neighborPhone: formData.phone,
      neighborEmail: formData.email,
      address: formData.address,
      currentMonthlyBill: monthlyBill,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime
    });

    setSolState(updatedState);
    setRequestConfirmed({
      id: `VIS-SOL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      date: formData.preferredDate,
      time: formData.preferredTime,
      address: formData.address,
      annualSavings: savingsCalc.annualSavings,
      paybackYears: savingsCalc.paybackYears
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 p-6 sm:p-8 text-white text-center relative border-b border-emerald-800">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/30 text-amber-300 flex items-center justify-center mx-auto mb-3">
            <Sun className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Sol de Casa · Energía Solar Residencial
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-md mx-auto">
            Descubre cuánto puedes ahorrar en electricidad produciendo tu propia energía limpia
          </p>
          <span className="absolute top-4 right-4 text-[9px] font-mono bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
            [SIMULADO]
          </span>
        </div>

        {/* Confirmation Screen */}
        {requestConfirmed ? (
          <div className="p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                ¡Visita Técnica Agendada!
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Solicitud confirmada para {requestConfirmed.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Referido registrado por la <strong>{referrerFamily.familyName}</strong> ({referralCode}).
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Número de Visita:</span>
                <span className="font-mono font-bold text-slate-800">{requestConfirmed.id}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Fecha y Hora Preferida:</span>
                <span className="font-extrabold text-emerald-800 font-mono">
                  {requestConfirmed.date} · {requestConfirmed.time}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Dirección a Medir:</span>
                <span className="font-semibold text-slate-900 text-right truncate max-w-[220px]">
                  {requestConfirmed.address}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Ahorro anual estimado:</span>
                <span className="font-bold text-emerald-700 font-mono">
                  {formatCurrency(requestConfirmed.annualSavings)}/año (Payback {requestConfirmed.paybackYears} años)
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-950 text-left border border-emerald-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Compromiso Sol de Casa:
              </span>
              <p className="text-[11px] leading-relaxed">
                Uno de nuestros 2 técnicos certificados visitará tu hogar para medir el techo y la radiación solar. La visita no tiene costo para ti gracias a la recomendación de tu vecino.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                to={`/sol-de-casa/familia/${referralCode}`}
                className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold text-center transition-colors shadow-sm"
              >
                Ver Portal de {referrerFamily.familyName}
              </Link>
              <Link
                to="/sol-de-casa"
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center transition-colors"
              >
                Ir a Panel de Andrés
              </Link>
            </div>
          </div>
        ) : (
          /* Landing Page with Calculator and Form */
          <div className="p-6 space-y-6">
            
            {/* Neighbor Personal Welcome Card */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center font-bold text-amber-900 text-xs">
                  SC
                </div>
                <div>
                  <div className="font-bold text-amber-950">
                    Tu vecino ({referrerFamily.familyName}) te compartió su ahorro real
                  </div>
                  <div className="text-[10px] text-amber-800">
                    Ahorro mensual verificado: <strong>{formatCurrency(referrerFamily.monthlySavings)}</strong> ({referrerFamily.address})
                  </div>
                </div>
              </div>
              <p className="text-slate-600 italic bg-white/80 p-2.5 rounded-xl border border-amber-100 leading-relaxed">
                «Hola vecino, con nuestros paneles solares redujimos el 70% de la factura eléctrica. Usa la calculadora de abajo para ver cuánto ahorrarías en tu casa.»
              </p>
            </div>

            {/* Calculadora Solar Interactiva */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Calculadora Solar para tu Hogar
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  70% Ahorro Promedio
                </span>
              </div>

              {/* Slider de Factura Eléctrica */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">¿Cuánto pagas de electricidad al mes?</span>
                  <span className="font-mono text-emerald-700 font-extrabold text-base">
                    {formatCurrency(monthlyBill)}
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="350"
                  step="5"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>$40/mes</span>
                  <span>$110/mes (Promedio)</span>
                  <span>$350/mes</span>
                </div>
              </div>

              {/* Resultados de la Calculadora */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Ahorro Mensual</span>
                  <span className="text-lg font-black text-emerald-700 font-mono">
                    {formatCurrency(savingsCalc.monthlySavings)}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Ahorro Anual</span>
                  <span className="text-lg font-black text-blue-700 font-mono">
                    {formatCurrency(savingsCalc.annualSavings)}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Recuperación (Años)</span>
                  <span className="text-lg font-black text-amber-700 font-mono">
                    {savingsCalc.paybackYears} años
                  </span>
                </div>
              </div>

              {/* Advertencia Formal Exigida */}
              <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-start gap-2 text-[11px] text-amber-950">
                <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  <strong>Nota de transparencia:</strong> Este cálculo es una estimación referencial basada en los supuestos del caso ($6,500 de instalación promedio y 70% de ahorro). No constituye una cotización vinculante definitiva.
                </p>
              </div>
            </div>

            {/* Formulario para Solicitar Visita Técnica */}
            <form onSubmit={handleSubmitVisit} className="space-y-4">
              <div className="border-b pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Solicita una Visita Técnica Gratuita a tu Techo
                </h4>
                <p className="text-[11px] text-slate-500">
                  Un técnico de Sol de Casa medirá tu techo para darte la cotización exacta
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">WhatsApp / Teléfono:</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-semibold text-slate-700 block mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="text-xs">
                <label className="font-semibold text-slate-700 block mb-1">Dirección de la Casa:</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Fecha Preferida:</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Horario Preferido:</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono"
                  >
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>02:00 PM</option>
                    <option>03:30 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Agendar Medición Técnica Gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-slate-400">
                Sin costo ni compromiso · Referido verificado por {referrerFamily.familyName}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

