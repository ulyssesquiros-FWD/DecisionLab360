// DecisionLab 360 - Página Pública de Reservas de la Barbería
// Ruta: /agendo/reservar/:businessSlug
// Selector de servicio, barbero, fecha, horario con prevención de colisiones e insignia viral

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CalendarCheck,
  Scissors,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import AgendoBadgeModal from '../../../Components/Growth/AgendoBadgeModal.jsx';
import { formatCurrency } from '../../../Services/calculationService.js';

export default function AgendoPublicBooking() {
  const { businessSlug = 'barberia-el-galan' } = useParams();
  const [agendoState, setAgendoState] = useState(growthStorageService.getAgendoState());

  const barbershop = agendoState.barbershop;

  // Form State
  const [selectedService, setSelectedService] = useState(barbershop.services[0]);
  const [selectedBarber, setSelectedBarber] = useState(barbershop.schedule.barbers[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [clientName, setClientName] = useState('Carlos Navarro');
  const [clientPhone, setClientPhone] = useState('+506 8812-3456');

  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Horarios disponibles
  const availableSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  // Comprobar si un slot está ocupado por este barbero en esta fecha
  const isSlotBooked = (time) => {
    return agendoState.bookings.some(
      (b) =>
        b.businessSlug === businessSlug &&
        b.barberName === selectedBarber &&
        b.date === selectedDate &&
        b.time === time
    );
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const updatedState = growthStorageService.addAgendoBooking({
        businessSlug,
        clientName,
        clientPhone,
        serviceName: selectedService.name,
        barberName: selectedBarber,
        date: selectedDate,
        time: selectedTime,
        price: selectedService.price,
        source: 'Página Pública de Reservas'
      });

      setAgendoState(updatedState);
      setBookingSuccess({
        id: `AG-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName,
        serviceName: selectedService.name,
        barberName: selectedBarber,
        date: selectedDate,
        time: selectedTime,
        price: selectedService.price
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 flex flex-col items-center justify-between font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col">
        
        {/* Barber Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 text-white text-center relative border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/30 text-blue-400 flex items-center justify-center mx-auto mb-3">
            <Scissors className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            {barbershop.businessName}
          </h1>
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{barbershop.location}</span>
          </p>
          <span className="absolute top-4 right-4 text-[9px] font-mono bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2 py-0.5 rounded-full font-bold">
            [SIMULADO]
          </span>
        </div>

        {/* Confirmation Screen */}
        {bookingSuccess ? (
          <div className="p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                ¡Cita Confirmada!
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Te esperamos, {bookingSuccess.clientName}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Reserva #{bookingSuccess.id} agendada con éxito en <strong>{barbershop.businessName}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Servicio:</span>
                <span className="font-semibold text-slate-900">{bookingSuccess.serviceName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Barbero:</span>
                <span className="font-semibold text-slate-900">{bookingSuccess.barberName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Fecha y Hora:</span>
                <span className="font-extrabold text-blue-700 font-mono">
                  {bookingSuccess.date} · {bookingSuccess.time}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Precio a pagar en local:</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {formatCurrency(bookingSuccess.price)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setBookingSuccess(null)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Hacer Otra Reserva
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-5">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Seleccionar Servicio */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                1. Elige tu Servicio
              </label>
              <div className="space-y-2">
                {barbershop.services.map((srv) => (
                  <label
                    key={srv.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                      selectedService.id === srv.id
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="service"
                        checked={selectedService.id === srv.id}
                        onChange={() => setSelectedService(srv)}
                        className="text-blue-600"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{srv.name}</span>
                        <span className="text-[11px] text-slate-500">{srv.durationMinutes} minutos</span>
                      </div>
                    </div>
                    <span className="font-mono font-extrabold text-blue-700 text-sm">
                      {formatCurrency(srv.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Seleccionar Barbero */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                2. Elige tu Barbero
              </label>
              <div className="grid grid-cols-2 gap-2">
                {barbershop.schedule.barbers.map((barber, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedBarber(barber)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                      selectedBarber === barber
                        ? 'border-blue-600 bg-blue-50 font-bold text-blue-900 ring-1 ring-blue-600'
                        : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 mb-1 text-slate-400" />
                    <span className="block truncate">{barber}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Seleccionar Fecha y Hora */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  3. Fecha y Turno Disponible
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-xs font-mono px-2 py-1 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                {availableSlots.map((slot) => {
                  const booked = isSlotBooked(slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={booked}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                        booked
                          ? 'bg-slate-200 text-slate-400 line-through cursor-not-allowed'
                          : selectedTime === slot
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] text-slate-400 block text-right">
                Los turnos tachados ya están reservados
              </span>
            </div>

            {/* 4. Tus Datos */}
            <div className="space-y-2 text-xs border-t pt-3">
              <label className="font-bold uppercase tracking-wider text-slate-700 block">
                4. Tus Datos de Contacto
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Tu WhatsApp"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirmar Cita ({selectedTime} · {formatCurrency(selectedService.price)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Insignia Viral de Agendo con Loop a Nuevo Registro */}
        <div className="border-t border-slate-100 bg-slate-50/60">
          <AgendoBadgeModal
            sourceBusinessName={barbershop.businessName}
            sourceSlug={businessSlug}
          />
        </div>
      </div>
    </div>
  );
}

