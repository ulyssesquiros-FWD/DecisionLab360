// DecisionLab 360 - Agendo QuickStart Onboarding Wizard
// Experiencia móvil de 8 pantallas en <5 minutos sin datos fiscales obligatorios al inicio

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Share2,
  Copy,
  Clock,
  Scissors,
  User,
  MapPin,
  Phone,
  Eye,
  Bell,
  Target,
  ExternalLink,
  Flame
} from 'lucide-react';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import { formatCurrency } from '../../../Services/calculationService.js';

export default function AgendoOnboardingWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [simulatedBookingIncoming, setSimulatedBookingIncoming] = useState(false);

  // Form State
  const [businessData, setBusinessData] = useState({
    businessName: 'Barbería El Galán',
    ownerName: 'Alejandro Rojas',
    phone: '+506 8765-4321',
    location: 'San Pedro, Barrio Dent',
    services: [
      { id: 'srv_1', name: 'Corte de Cabello Clásico', price: 12, durationMinutes: 30 },
      { id: 'srv_2', name: 'Arreglo y Perfilado de Barba', price: 8, durationMinutes: 20 },
      { id: 'srv_3', name: 'Combo Completo (Corte + Barba)', price: 15, durationMinutes: 45 }
    ],
    openTime: '09:00',
    closeTime: '19:00',
    workDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    barbers: ['Alejandro Rojas (Master)', 'Mateo Gómez (Estilista)']
  });

  const businessSlug = businessData.businessName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  const publicUrl = `${window.location.origin}/agendo/reservar/${businessSlug}`;
  const shareMessage = `¡Ya puedes reservar tu próximo corte en ${businessData.businessName}! Elige tu horario y servicio aquí: ${publicUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTriggerSimulatedBooking = () => {
    setSimulatedBookingIncoming(true);
    setTimeout(() => {
      // Registrar cita simulada
      try {
        growthStorageService.addAgendoBooking({
          businessSlug,
          clientName: 'Daniel Soto (Cliente Demo)',
          clientPhone: '+506 8333-2211',
          serviceName: 'Combo Completo (Corte + Barba)',
          barberName: businessData.barbers[0],
          date: new Date().toISOString().split('T')[0],
          time: '16:00',
          price: 15,
          source: 'Simulación Enlace Compartido'
        });
      } catch (err) {
        console.log(err.message);
      }
      setStep(8); // Pasar a Pantalla 8 (Activación)
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-3 flex flex-col items-center justify-center font-sans">
      
      {/* Mobile Device Frame */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col animate-in fade-in duration-200">
        
        {/* Device Top Status Bar */}
        <div className="bg-slate-950 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-bold tracking-tight">
            <div className="w-4 h-4 rounded-md bg-blue-600 flex items-center justify-center text-white text-[10px]">
              <CalendarCheck className="w-2.5 h-2.5" />
            </div>
            <span>Agendo QuickStart</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
              Paso {step} de 8
            </span>
            <span className="text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded font-mono">
              [SIMULADO]
            </span>
          </div>
        </div>

        {/* Wizard Steps Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          
          {/* PANTALLA 1: BIENVENIDA */}
          {step === 1 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                <Scissors className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                  Promesa Agendo
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Consigue más clientes para tu barbería con Agendo
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Crea tu página de reservas en menos de 5 minutos desde tu celular. Tus clientes reservan solos 24/7.
                </p>
              </div>

              <div className="bg-blue-50/80 rounded-2xl border border-blue-200/80 p-3.5 text-xs text-blue-900 text-left space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Prueba Gratuita de 14 Días Activada</span>
                </div>
                <p className="text-[11px] text-blue-800/80 leading-relaxed">
                  ✓ Sin tarjeta de crédito obligatoria.<br />
                  ✓ Sin datos fiscales para empezar.<br />
                  ✓ Plantillas listas de cortes y horarios.
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Comenzar Configuración Rápida</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PANTALLA 2: DATOS ESENCIALES */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                  Pantalla 2 · Datos Esenciales
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Información básica de tu negocio
                </h3>
                <p className="text-xs text-slate-500">
                  Solo lo estrictamente necesario. Los datos fiscales se solicitarán al terminar tu prueba.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nombre de la Barbería:</label>
                  <input
                    type="text"
                    required
                    value={businessData.businessName}
                    onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tu Nombre (Responsable):</label>
                  <input
                    type="text"
                    required
                    value={businessData.ownerName}
                    onChange={(e) => setBusinessData({ ...businessData, ownerName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">WhatsApp de Contacto:</label>
                  <input
                    type="tel"
                    required
                    value={businessData.phone}
                    onChange={(e) => setBusinessData({ ...businessData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ubicación / Ciudad:</label>
                  <input
                    type="text"
                    required
                    value={businessData.location}
                    onChange={(e) => setBusinessData({ ...businessData, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>Continuar a Servicios</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PANTALLA 3: PLANTILLAS DE SERVICIOS */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                  Pantalla 3 · Servicios Típicos
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Plantillas precargadas ($8 a $15)
                </h3>
                <p className="text-xs text-slate-500">
                  El 90% de las barberías ofrece corte y barba. Ajusta precios y duración si lo deseas:
                </p>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {businessData.services.map((srv, idx) => (
                  <div key={srv.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={srv.name}
                        onChange={(e) => {
                          const updated = [...businessData.services];
                          updated[idx].name = e.target.value;
                          setBusinessData({ ...businessData, services: updated });
                        }}
                        className="font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-blue-500 outline-none flex-1 mr-2"
                      />
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                        Activo
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Precio ($):</span>
                        <input
                          type="number"
                          value={srv.price}
                          onChange={(e) => {
                            const updated = [...businessData.services];
                            updated[idx].price = Number(e.target.value);
                            setBusinessData({ ...businessData, services: updated });
                          }}
                          className="w-full px-2 py-1 bg-white border rounded font-mono font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <span className="text-slate-500 block">Duración (min):</span>
                        <input
                          type="number"
                          step="5"
                          value={srv.durationMinutes}
                          onChange={(e) => {
                            const updated = [...businessData.services];
                            updated[idx].durationMinutes = Number(e.target.value);
                            setBusinessData({ ...businessData, services: updated });
                          }}
                          className="w-full px-2 py-1 bg-white border rounded font-mono font-bold text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>Continuar a Horarios</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PANTALLA 4: HORARIOS RÁPIDOS */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                  Pantalla 4 · Configuración de Horarios
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Horarios de atención en 1 clic
                </h3>
                <p className="text-xs text-slate-500">
                  Sin configuraciones enredadas. Mariela no tendrá que explicarte nada:
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Apertura:</label>
                    <input
                      type="time"
                      value={businessData.openTime}
                      onChange={(e) => setBusinessData({ ...businessData, openTime: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Cierre:</label>
                    <input
                      type="time"
                      value={businessData.closeTime}
                      onChange={(e) => setBusinessData({ ...businessData, closeTime: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Días de Atención:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                      <span
                        key={dia}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                          businessData.workDays.includes(dia)
                            ? 'bg-blue-50 border-blue-300 text-blue-800'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        {dia}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Barberos del Equipo:</label>
                  <div className="space-y-1">
                    {businessData.barbers.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-slate-700">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>Generar Página Web</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PANTALLA 5: PÁGINA DE RESERVAS GENERADA */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 font-mono">
                  Pantalla 5 · ¡Página Lista!
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Tu página de reservas está en línea
                </h3>
                <p className="text-xs text-slate-500">
                  Vista previa en vivo para tus clientes de <strong>{businessData.businessName}</strong>:
                </p>
              </div>

              {/* Preview Box */}
              <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-bold text-slate-900">{businessData.businessName}</div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    En Línea
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 block">Servicios disponibles:</span>
                  {businessData.services.map((s) => (
                    <div key={s.id} className="flex justify-between bg-white p-2 rounded-lg border border-slate-100">
                      <span>{s.name} ({s.durationMinutes}m)</span>
                      <strong className="font-mono text-blue-700">{formatCurrency(s.price)}</strong>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-500 pt-1 flex items-center justify-between">
                  <span>Horario: {businessData.openTime} a {businessData.closeTime}</span>
                  <span>{businessData.location}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>Paso Crítico: Compartir Enlace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PANTALLA 6: COMPARTIR ENLACE (SOLUCIÓN AL CUELLO DE BOTELLA) */}
          {step === 6 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 font-mono">
                  Pantalla 6 · El Secreto del Éxito (Día 1)
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Comparte tu enlace hoy mismo
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  El 90% de los barberos que comparten su enlace en las primeras 24 horas reciben su primera reserva y no abandonan.
                </p>
              </div>

              {/* Ready Message Box */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-slate-700 block">Mensaje listo para tus clientes:</span>
                <p className="p-2.5 bg-white rounded-xl border italic text-slate-600 text-[11px] leading-relaxed">
                  «{shareMessage}»
                </p>
              </div>

              {/* Share Buttons */}
              <div className="space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir por WhatsApp a mis Clientes</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '¡Enlace Copiado al Portapapeles!' : 'Copiar Enlace para Instagram / Bio'}</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep(7)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>Simular Entrada de 1ra Reserva</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PANTALLA 7: PRIMERA RESERVA (MOMENTO AHA) */}
          {step === 7 && (
            <div className="space-y-5 text-center py-3">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                <Bell className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Pantalla 7 · Momento «Aha»
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  ¡Entró tu primera reserva por el link!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Aquí es donde el barbero entiende el verdadero poder de Agendo. Mira cómo se ve:
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl text-left text-xs space-y-2 shadow-xs">
                <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
                  <span className="font-bold text-blue-950 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    Daniel Soto
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Confirmada
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Servicio:</span>
                  <span className="font-semibold text-slate-900">Combo Completo (Corte + Barba)</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Horario:</span>
                  <span className="font-semibold text-slate-900">Hoy · 16:00 (45 min)</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Barbero Asignado:</span>
                  <span className="font-semibold text-slate-900">{businessData.barbers[0]}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-blue-200/80 font-bold text-slate-900">
                  <span>Total a Cobrar:</span>
                  <span className="font-mono text-blue-700">$15.00</span>
                </div>
              </div>

              <button
                disabled={simulatedBookingIncoming}
                onClick={handleTriggerSimulatedBooking}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{simulatedBookingIncoming ? 'Confirmando Reserva...' : 'Ver Progreso hacia Activación (20 citas)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PANTALLA 8: ACTIVACIÓN Y HABITUAL USE */}
          {step === 8 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                  Pantalla 8 · Activación en 14 Días
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Objetivo: Uso Habitual (20 citas)
                </h3>
                <p className="text-xs text-slate-500">
                  El 80% de los barberos que llegan a 20 citas en su trial renuevan y se quedan con Agendo.
                </p>
              </div>

              {/* Progress Toward 20 Bookings */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    Progreso de Activación
                  </span>
                  <span className="font-mono font-extrabold text-blue-600">
                    2 / 20 Citas
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full w-[10%]"></div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold">Recibidas</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">2</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold">Confirmadas</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">2</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold">Días Trial</span>
                    <span className="font-mono font-bold text-blue-700 text-sm">14</span>
                  </div>
                </div>
              </div>

              {/* State Badges */}
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Página web creada en menos de 5 min</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enlace compartido por WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Primera reserva recibida y registrada</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to={`/agendo/reservar/${businessSlug}`}
                  target="_blank"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold text-center block transition-colors shadow-sm"
                >
                  Abrir Página Pública de Reservas del Cliente
                </Link>
                <Link
                  to="/agendo"
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center block transition-colors"
                >
                  Ir al Panel de Activación de Valeria
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

