// DecisionLab 360 - Experiencia del Cliente Invitador: "Mi programa Tueste"
// Vista Mobile-First diseñada para compradores satisfechos de café

import React, { useState, useEffect } from 'react';
import {
  Coffee,
  Share2,
  Copy,
  Check,
  Gift,
  Award,
  Users,
  ShoppingBag,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { growthStorageService } from '../../../Services/growthStorageService.js';
import { formatCurrency } from '../../../Services/calculationService.js';

export default function TuesteReferralCustomerView() {
  const [tuesteState, setTuesteState] = useState(growthStorageService.getTuesteState());
  const [copied, setCopied] = useState(false);
  const [showDeliveryToast, setShowDeliveryToast] = useState(true);

  useEffect(() => {
    // Escuchar actualizaciones de storage
    const state = growthStorageService.getTuesteState();
    setTuesteState(state);
  }, []);

  const { activeCustomer, friendsList, purchasesLog } = tuesteState;
  const referralLinkObj = tuesteState.referralLinks[0] || {
    code: activeCustomer.referralCode,
    friendsInvited: 3,
    storeVisits: 2,
    purchasesCompleted: 1,
    accumulatedRewardUSD: 3.20
  };

  const referralUrl = `${window.location.origin}/tueste/referido/${activeCustomer.referralCode}`;
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Te regalo un descuento especial y una muestra de café de especialidad en Tueste para tu primera compra. Pruébalo con mi enlace exclusivo aquí: ${referralUrl}`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Cálculo de progreso hacia el siguiente nivel (Nivel 2: 3 amigos que compran)
  const currentPurchases = referralLinkObj.purchasesCompleted || 1;
  const targetForNextTier = 3;
  const progressPercent = Math.min(100, Math.round((currentPurchases / targetForNextTier) * 100));

  return (
    <div className="min-h-screen bg-amber-50/40 py-6 px-3 sm:px-6 flex flex-col items-center justify-start">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-amber-200/90 overflow-hidden flex flex-col animate-in fade-in duration-200">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 p-5 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Coffee className="w-4 h-4" />
              </span>
              <span className="font-extrabold text-sm tracking-tight">Tueste Rewards</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-mono">
              [SIMULADO]
            </span>
          </div>

          {/* Customer Profile Card */}
          <div className="mt-4 flex items-center gap-3.5">
            <img
              src={activeCustomer.avatar}
              alt={activeCustomer.name}
              className="w-13 h-13 rounded-full border-2 border-amber-400/80 object-cover shadow-sm"
            />
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                {activeCustomer.name}
              </h2>
              <p className="text-[11px] text-amber-200 font-medium">
                Cliente Verificado · {activeCustomer.packBought}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-emerald-300 font-semibold">
                  Pedido degustado hace {activeCustomer.deliveredDaysAgo} días
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Aha Moment Delivery Notification (Soluciona el problema de timing del piloto) */}
        {showDeliveryToast && (
          <div className="mx-4 -mt-2.5 mb-2 bg-amber-100/90 border border-amber-300/80 rounded-xl p-3 text-xs text-amber-950 shadow-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">¡Tu café ya llegó y lo estás disfrutando!</p>
              <p className="text-[11px] text-amber-900/80 mt-0.5 leading-snug">
                El mejor momento para compartir es ahora. Regala café a tus amigos con un toque y gana bolsas gratis.
              </p>
            </div>
            <button
              onClick={() => setShowDeliveryToast(false)}
              className="text-amber-800/60 hover:text-amber-950 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 space-y-5">
          {/* Personal Share Box (Sin copiar códigos a mano) */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50/60 rounded-2xl border border-amber-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                Tu Enlace Personal de Regalo
              </span>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded font-bold">
                {activeCustomer.referralCode}
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Tus amigos reciben <strong>$6 de descuento</strong> y una <strong>bolsa muestra gratis</strong> autoaplicados en su compra.
            </p>

            {/* 1-Tap WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir por WhatsApp (1 toque)</span>
            </a>

            {/* Quick Copy Link Row */}
            <div className="flex items-center gap-2 bg-white rounded-xl border border-amber-200/80 p-1.5 pl-3">
              <span className="text-[10px] text-slate-500 font-mono truncate flex-1">
                {referralUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Gamified Tier Progress Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                Tu Progreso de Recompensas
              </span>
              <span className="text-xs font-extrabold text-amber-700 font-mono">
                {currentPurchases} / {targetForNextTier} Amigos
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>Nivel 1: Primer Amigo ✓</span>
              <span className="font-semibold text-amber-800">
                Faltan {Math.max(0, targetForNextTier - currentPurchases)} para Bolsa 340g Gratis
              </span>
            </div>
          </div>

          {/* Stats 3-Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Invitados</span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">
                {referralLinkObj.friendsInvited}
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Visitas</span>
              <span className="text-lg font-extrabold text-blue-700 font-mono">
                {referralLinkObj.storeVisits}
              </span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Compraron</span>
              <span className="text-lg font-extrabold text-emerald-800 font-mono">
                {referralLinkObj.purchasesCompleted}
              </span>
            </div>
          </div>

          {/* Status of Each Friend / History */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Estado de tus Invitaciones
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">
                {friendsList.length} amigos
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {friendsList.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white p-2.5 rounded-xl border border-slate-200/90 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-800">{friend.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{friend.date} · {friend.status}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    friend.rewardStatus === 'Entregada'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {friend.rewardStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick link to test public friend landing */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <a
              href={`/tueste/referido/${activeCustomer.referralCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 underline"
            >
              <span>Abrir vista del amigo que recibe la invitación</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

