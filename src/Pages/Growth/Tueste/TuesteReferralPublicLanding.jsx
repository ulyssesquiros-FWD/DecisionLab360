// DecisionLab 360 - Experiencia Pública del Amigo Invitado
// Ruta: /tueste/referido/:referralCode
// Descuento autoaplicado, checkout funcional simulado y loop de actualización en tiempo real

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Coffee,
  Gift,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Truck,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import { formatCurrency } from '../../../Services/calculationService.js';

export default function TuesteReferralPublicLanding() {
  const { referralCode = 'TUESTE-CAMILA-8K' } = useParams();
  const [completedOrder, setCompletedOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Roberto Gómez',
    email: 'roberto.gomez@demo.com',
    phone: '+506 8765-1122',
    address: 'San José, Barrio Escalante, Condominio Vista Verde Apt 4B',
    grindType: 'Grano Entero (Frescura Total)',
    notes: 'Entregar en recepción'
  });

  // Datos del producto recomendado de café
  const product = {
    name: 'Café de Especialidad Tueste Artesanal (Pack 2 Bolsas x 340g)',
    description: 'Origen Tarrazú y Naranjo. Tueste medio fresco, notas a chocolate, caramelo y miel.',
    originalPrice: 34.0,
    discountAmount: 6.0,
    finalPrice: 28.0,
    bonusGift: 'Bolsa de Muestra de 100g de Café Geisha Edición Limitada'
  };

  const handleSubmitCheckout = (e) => {
    e.preventDefault();

    // 1. Registrar compra en storage
    // 2. Asociar al código de referido
    // 3. Actualizar panel del invitador
    // 4. Registrar recompensa
    // 5. Actualizar métricas administrativas
    const updatedState = growthStorageService.addTuestePurchase({
      referralCode,
      buyerName: formData.name,
      product: product.name,
      price: product.originalPrice,
      discount: product.discountAmount
    });

    setCompletedOrder({
      orderId: `TUE-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      buyerName: formData.name,
      address: formData.address,
      product: product.name,
      paidAmount: product.finalPrice,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Brand Bar */}
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 p-6 text-white text-center relative">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-2">
            <Coffee className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">Tueste · Café de Especialidad</h1>
          <p className="text-xs text-amber-200 mt-1">Directo del productor a tu taza en 72 horas</p>
          <span className="absolute top-4 right-4 text-[9px] font-mono bg-amber-500/30 border border-amber-300/40 text-amber-100 px-2 py-0.5 rounded-full font-bold">
            [SIMULADO]
          </span>
        </div>

        {/* Success Confirmation Screen */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                ¡Compra Simulada Exitosa!
              </span>
              <h2 className="text-xl font-extrabold text-stone-900 mt-1">
                ¡Gracias por tu pedido, {completedOrder.buyerName}!
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Orden #{completedOrder.orderId} registrada con el código de referido{' '}
                <strong className="text-amber-800 font-mono">{referralCode}</strong>.
              </p>
            </div>

            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-stone-500">Producto:</span>
                <span className="font-semibold text-stone-900 text-right">{completedOrder.product}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-stone-500">Regalo incluido:</span>
                <span className="font-semibold text-emerald-700">{product.bonusGift}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-stone-500">Total pagado:</span>
                <span className="font-extrabold text-stone-900 font-mono text-sm">{formatCurrency(completedOrder.paidAmount)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-500">Envío programado a:</span>
                <span className="text-stone-700 text-right truncate max-w-[200px]">{completedOrder.address}</span>
              </div>
            </div>

            {/* Impact Loop Feedback */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 text-left space-y-1">
              <span className="font-bold block flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Impacto en el Loop de Growth de Tueste:
              </span>
              <p>
                ✓ El panel de tu invitador ha sido acreditado con su recompensa.<br />
                ✓ El panel administrativo de Diego ha registrado la compra referida.<br />
                ✓ El CAC de referidos se mantiene por debajo de los $25 permitidos.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                to="/tueste/mi-programa"
                className="flex-1 py-2.5 px-4 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold text-center transition-colors shadow-xs"
              >
                Ver Panel de Camila (Invitador)
              </Link>
              <Link
                to="/tueste"
                className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold text-center transition-colors"
              >
                Volver a Dashboard Tueste
              </Link>
            </div>
          </div>
        ) : (
          /* Landing & Checkout Form */
          <div className="p-6 space-y-6">
            
            {/* Personal Invitation Welcome Banner */}
            <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-900 text-xs">
                  CR
                </div>
                <div>
                  <div className="font-bold text-amber-950">
                    Tu amiga Camila Rossi te invitó a probar Tueste
                  </div>
                  <div className="text-[10px] text-amber-800">
                    Código exclusivo aplicado: <strong className="font-mono">{referralCode}</strong>
                  </div>
                </div>
              </div>
              <p className="text-stone-600 italic bg-white/70 p-2.5 rounded-xl border border-amber-100 leading-relaxed">
                «¡Hola! Tienes que probar este café, es el mejor que he tomado en meses. Te dejo mi regalo de bienvenida para que lo disfrutes.»
              </p>
            </div>

            {/* Product Card with Applied Discount */}
            <div className="border border-stone-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono">
                    Café Recomendado para ti
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm mt-0.5">{product.name}</h3>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">{product.description}</p>
                </div>
              </div>

              {/* Gift Badge */}
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-medium">
                <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Regalo Incluido:</strong> {product.bonusGift} ($1.60 valor gratis)</span>
              </div>

              {/* Price Breakdown */}
              <div className="bg-stone-50 p-3 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Precio de Lista:</span>
                  <span className="line-through font-mono">{formatCurrency(product.originalPrice)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Descuento Amigo (Automático):</span>
                  <span className="font-mono">-{formatCurrency(product.discountAmount)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Envío a Domicilio:</span>
                  <span className="text-emerald-700 font-bold">¡GRATIS!</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Final a Pagar:</span>
                  <span className="font-mono text-amber-800">{formatCurrency(product.finalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Demonstration Checkout Form */}
            <form onSubmit={handleSubmitCheckout} className="space-y-4">
              <div className="flex items-center gap-2 border-b pb-2">
                <ShoppingBag className="w-4 h-4 text-stone-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Datos de Entrega y Pago (Demostración)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Teléfono WhatsApp:</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-semibold text-stone-700 block mb-1">Dirección de Entrega:</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="text-xs">
                <label className="font-semibold text-stone-700 block mb-1">Tipo de Molienda Preferido:</label>
                <select
                  value={formData.grindType}
                  onChange={(e) => setFormData({ ...formData, grindType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option>Grano Entero (Frescura Total)</option>
                  <option>Molido Medio (Cafetera de Filtro / Chemex / V60)</option>
                  <option>Molido Fino (Espresso / Moka)</option>
                  <option>Molido Grueso (Prensa Francesa / Cold Brew)</option>
                </select>
              </div>

              {/* Simulación de Pago Rápido */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-stone-600" />
                  <span className="font-medium text-stone-700">Tarjeta Visa/Mastercard (Simulada)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  Demo Verificada
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Completar Compra con Descuento ({formatCurrency(product.finalPrice)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Garantía de satisfacción · Envío seguro en 72 horas</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

