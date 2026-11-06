// DecisionLab 360 - Portal Familiar "Mi Ahorro Solar"
// Ruta: /sol-de-casa/familia/:familyCode
// Visualización del ahorro real, evolución histórica, tarjeta compartible y loop de referidos

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sun,
  Zap,
  TrendingUp,
  Share2,
  Copy,
  Check,
  Calendar,
  DollarSign,
  Download,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Upload,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

import { growthStorageService } from '../../../Services/growthStorageService.js';
import { formatCurrency, formatPercent } from '../../../Services/calculationService.js';

export default function SolDeCasaFamilyPortal() {
  const { familyCode = 'SOL-FAMILIA-MORA-9A' } = useParams();
  const [solState, setSolState] = useState(growthStorageService.getSolState());
  const [copied, setCopied] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(11); // Mes 12 (último mes)

  // Encontrar familia
  const family = solState.families.find((f) => f.familyCode === familyCode) || solState.families[0];

  // Historial de 12 meses simulados
  const monthlyHistory = [
    { mes: 'Nov 25', facturaAnterior: 110, facturaSolar: 33, ahorro: 77, produccionKwh: 420 },
    { mes: 'Dic 25', facturaAnterior: 115, facturaSolar: 35, ahorro: 80, produccionKwh: 435 },
    { mes: 'Ene 26', facturaAnterior: 118, facturaSolar: 34, ahorro: 84, produccionKwh: 450 },
    { mes: 'Feb 26', facturaAnterior: 120, facturaSolar: 35, ahorro: 85, produccionKwh: 460 },
    { mes: 'Mar 26', facturaAnterior: 115, facturaSolar: 34, ahorro: 81, produccionKwh: 440 },
    { mes: 'Abr 26', facturaAnterior: 110, facturaSolar: 33, ahorro: 77, produccionKwh: 425 },
    { mes: 'May 26', facturaAnterior: 108, facturaSolar: 32, ahorro: 76, produccionKwh: 410 },
    { mes: 'Jun 26', facturaAnterior: 105, facturaSolar: 31, ahorro: 74, produccionKwh: 400 },
    { mes: 'Jul 26', facturaAnterior: 112, facturaSolar: 33, ahorro: 79, produccionKwh: 428 },
    { mes: 'Ago 26', facturaAnterior: 114, facturaSolar: 34, ahorro: 80, produccionKwh: 432 },
    { mes: 'Sep 26', facturaAnterior: 110, facturaSolar: 33, ahorro: 77, produccionKwh: 420 },
    { mes: 'Oct 26', facturaAnterior: 115, facturaSolar: 34.5, ahorro: 80.5, produccionKwh: 438 }
  ];

  const currentMonthData = monthlyHistory[selectedMonthIndex];
  const accumulatedSavings = monthlyHistory.slice(0, selectedMonthIndex + 1).reduce((acc, m) => acc + m.ahorro, 0);
  const estimatedAnnualSavings = currentMonthData.ahorro * 12;

  const referralUrl = `${window.location.origin}/sol-de-casa/ahorro/${family.familyCode}`;
  const whatsappShareText = `¡Hola vecino! Este mes ahorramos ${formatCurrency(currentMonthData.ahorro)} en electricidad (70% menos) gracias a nuestros paneles de Sol de Casa. Ya llevamos ${formatCurrency(accumulatedSavings)} ahorrados en total. Puedes calcular cuánto ahorrarías en tu casa y pedir una visita técnica aquí: ${referralUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(whatsappShareText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-stone-100 py-6 px-3 sm:px-6 flex flex-col items-center justify-start font-sans">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Brand Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Sun className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 font-mono">
                Sol de Casa · Comunidad Solar
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 font-bold">
                [SIMULADO]
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mi Ahorro Solar: {family.familyName}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mt-1 leading-relaxed">
              Monitoreo continuo de producción y ahorro garantizado de tu sistema fotovoltaico de {family.systemSizeKw} kWp.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block">Código Familiar</span>
            <span className="text-xs font-mono font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-700/60 block mt-0.5">
              {family.familyCode}
            </span>
          </div>
        </div>

        {/* 4 Big KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Factura Anterior</span>
            <span className="text-xl font-extrabold text-slate-800 font-mono">
              {formatCurrency(currentMonthData.facturaAnterior)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Sin paneles</span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Ahorro Este Mes</span>
            <span className="text-xl font-extrabold text-emerald-800 font-mono">
              {formatCurrency(currentMonthData.ahorro)}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">70% de reducción</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Ahorro Acumulado</span>
            <span className="text-xl font-extrabold text-blue-700 font-mono">
              {formatCurrency(accumulatedSavings)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">12 meses de energía</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Ahorro Anual Est.</span>
            <span className="text-xl font-extrabold text-amber-700 font-mono">
              {formatCurrency(estimatedAnnualSavings)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Proyección 12m</span>
          </div>
        </div>

        {/* Tarjeta de Ahorro Compartido (Requerimiento 6.3) */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl border border-amber-400/40 relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-sm tracking-tight">Sol de Casa · Tarjeta de Ahorro Real</span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded-full">
              70% AHORRO
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-2">
            <h3 className="text-base sm:text-lg font-black leading-snug">
              «Este mes la {family.familyName} ahorró {formatCurrency(currentMonthData.ahorro)} en electricidad gracias a nuestros paneles solares.»
            </h3>
            <p className="text-xs text-white/90 leading-relaxed">
              Ya acumulamos <strong>{formatCurrency(accumulatedSavings)}</strong> ahorrados desde la instalación.
              ¡Mira cuánto podrías ahorrar en tu casa y pide tu visita técnica gratis!
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 bg-white text-emerald-950 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md hover:bg-emerald-50 transition-transform active:scale-98"
            >
              <Share2 className="w-4 h-4 text-emerald-700" />
              <span>COMPARTIR MI AHORRO POR WHATSAPP</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="py-3 px-4 bg-emerald-900/60 hover:bg-emerald-900 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-white/30 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Enlace Copiado!' : 'Copiar Link'}</span>
            </button>
          </div>

          <div className="text-[10px] text-white/70 text-center font-mono">
            Enlace de referido: {referralUrl}
          </div>
        </div>

        {/* Evolución Histórica de Ahorro y Selector de Meses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Evolución de Ahorro Mes a Mes (kWh y Dólares)
              </h3>
              <p className="text-xs text-slate-500">
                Selecciona cualquier mes para consultar el desglose exacto
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Mes analizado:</span>
              <select
                value={selectedMonthIndex}
                onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
                className="text-xs font-mono font-bold bg-slate-50 border rounded-lg px-2.5 py-1"
              >
                {monthlyHistory.map((m, idx) => (
                  <option key={idx} value={idx}>
                    {m.mes} ({formatCurrency(m.ahorro)} ahorro)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyHistory} margin={{ left: -15, right: 10, top: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis unit="$" />
                <Tooltip formatter={(val) => [formatCurrency(val), 'Ahorro']} />
                <Bar dataKey="ahorro" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Arquitectura de Datos del Inversor:</strong> Los datos se calculan a partir de la producción horaria registrada por el inversor y la tarifa eléctrica vigente. Esta plataforma está preparada para importar archivos CSV generados por la plataforma del fabricante sin requerir integraciones de APIs inexistentes.
            </p>
          </div>
        </div>

        {/* Recompensas Ganadas por Referidos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-slate-900 text-sm">
              Tus Recompensas de la Comunidad Solar
            </h3>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
              1 Instalación Referida Firmada
            </span>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-emerald-950 block">Premio Desbloqueado:</span>
              <p className="text-emerald-900">{family.rewardEarned}</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold font-mono text-[10px]">
              ACTIVO
            </span>
          </div>

          <div className="text-center pt-2">
            <Link
              to={`/sol-de-casa/ahorro/${family.familyCode}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
            >
              <span>Abrir vista pública del vecino con calculadora solar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

