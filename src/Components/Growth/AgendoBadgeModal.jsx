// DecisionLab 360 - AgendoBadgeModal Component
// Insignia viral interactiva: "Reservado con Agendo — Crea tu página de reservas gratis"
// Loop viral: Agendo -> barbería activa -> clientes reservan -> otros barberos ven insignia -> nuevo trial

import React, { useState } from 'react';
import { CalendarCheck, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgendoBadgeModal({ sourceBusinessName = 'Barbería El Galán', sourceSlug = 'barberia-el-galan' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [barberName, setBarberName] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <>
      {/* Insignia Visible en el Footer de la Página Pública de Reservas */}
      <div className="w-full flex justify-center py-4 px-2">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-semibold shadow-md border border-slate-700 hover:scale-102 cursor-pointer group"
        >
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <CalendarCheck className="w-2.5 h-2.5" />
          </div>
          <span className="text-slate-300">Reservado con <strong className="text-white font-bold">Agendo</strong></span>
          <span className="text-[10px] text-blue-400 border-l border-slate-700 pl-2 group-hover:text-blue-300">
            Crea tu página gratis →
          </span>
        </button>
      </div>

      {/* Modal Desplegable al Hacer Clic */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setIsOpen(false);
                setRegistered(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            {registered ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">¡Registro Exitoso!</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Referido desde <strong>{sourceBusinessName}</strong> registrado en el sistema viral de Agendo [SIMULADO].
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 text-left font-mono">
                  ✓ Barbería origen: {sourceSlug}<br />
                  ✓ Trial de 14 días gratuito activado<br />
                  ✓ Asignado a Mariela para soporte
                </div>
                <Link
                  to="/agendo/quickstart"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold block transition-colors"
                >
                  Abrir Onboarding QuickStart Ahora
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Consigue más clientes para tu negocio
                    </h3>
                    <p className="text-xs text-slate-500">
                      Visto en la página de reservas de <strong>{sourceBusinessName}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>¿Tienes una barbería o salón?</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-slate-600 text-[11px]">
                    <li>Página pública de reservas lista en menos de 5 minutos.</li>
                    <li>Tus clientes reservan 24/7 sin interrumpirte por WhatsApp.</li>
                    <li>Prueba 100% gratuita por 14 días (sin tarjeta requerida).</li>
                  </ul>
                </div>

                <form onSubmit={handleRegister} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nombre de tu Barbería o Salón:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Barbería Royal Cuts"
                      value={barberName}
                      onChange={(e) => setBarberName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tu Teléfono o WhatsApp:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+506 8888-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Comenzar Prueba Gratis de 14 Días</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center text-[10px] text-slate-400">
                    Sin cobros iniciales · Sin cédula fiscal para empezar
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

