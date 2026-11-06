// DecisionLab 360 - Growth Center (Sesión 2)
// Centro global que agrupa las tres soluciones de Growth con diagramas interactivos de ciclos

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Coffee,
  CalendarCheck,
  Sun,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Gift,
  Zap,
  Target,
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { growthData } from '../../Data/growthData.js';

export default function GrowthCenter() {
  const [selectedCycleCase, setSelectedCycleCase] = useState('tueste'); // 'tueste', 'agendo', 'solDeCasa'
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const cycleData = {
    tueste: {
      name: 'Tueste Rewards',
      tagline: 'E-commerce DTC · Café de Especialidad',
      color: 'border-amber-500 bg-amber-50 text-amber-900',
      badge: 'Boca a Boca 1-Tap',
      cycle: growthData.tueste.growthCycle,
      hubLink: '/tueste/growth',
      customerViewLink: '/tueste/mi-programa',
      fichasLink: '/growth/fichas?case=tueste'
    },
    agendo: {
      name: 'Agendo QuickStart',
      tagline: 'SaaS B2B · Software para Barberías',
      color: 'border-blue-500 bg-blue-50 text-blue-900',
      badge: 'Loop Viral Insignia',
      cycle: growthData.agendo.growthCycle,
      hubLink: '/agendo/growth',
      customerViewLink: '/agendo/quickstart',
      fichasLink: '/growth/fichas?case=agendo'
    },
    solDeCasa: {
      name: 'Comunidad Solar',
      tagline: 'Lead Gen de Servicios · Paneles Solares',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
      badge: 'Ahorro Vecinal Compartido',
      cycle: growthData.solDeCasa.growthCycle,
      hubLink: '/sol-de-casa/growth',
      customerViewLink: '/sol-de-casa/familia/SOL-FAMILIA-MORA-9A',
      fichasLink: '/growth/fichas?case=solDeCasa'
    }
  };

  const currentCycle = cycleData[selectedCycleCase];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Banner Principal del Growth Center */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 font-mono">
              DecisionLab 360 · Sesión 2
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
              GROWTH CENTER V2.0
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Centro de Crecimiento & Loops de Adquisición
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
            Plataforma transversal de Growth Marketing: programas de referidos, activación onboarding y viralidad orgánica para escapar de la dependencia exclusiva de anuncios pagados.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/growth/fichas"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white shadow-sm transition-transform active:scale-98"
          >
            <FileText className="w-4 h-4" />
            <span>Ver Fichas de Growth (1 Pág)</span>
          </Link>
          <Link
            to="/growth/canales"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Matriz de Canales 90 Días</span>
          </Link>
        </div>
      </div>

      {/* 3 Business Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Caso A: Tueste */}
        <div className="bg-white rounded-3xl border border-amber-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Coffee className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Límite ≤ $25 CAC
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tueste Rewards</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Programa de referidos 1-Tap por WhatsApp. Ofrece recompensas escalonadas al probar el café sin exceder la mitad del CAC Meta.
            </p>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100 text-xs space-y-1">
            <div className="flex justify-between text-slate-700">
              <span>Cuello de botella resuelto:</span>
              <strong className="text-amber-900">Timing post-degustación (Día 4)</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>CAC referidos vs Meta:</span>
              <strong className="font-mono text-emerald-700">$8.40 vs $50.00 (-83%)</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to="/tueste/growth"
              className="flex-1 py-2.5 px-3 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold text-center transition-colors"
            >
              Panel de Diego
            </Link>
            <Link
              to="/tueste/mi-programa"
              className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors"
              title="Ver experiencia del cliente"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Caso B: Agendo */}
        <div className="bg-white rounded-3xl border border-blue-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <CalendarCheck className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                Activación &lt; 5 min
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Agendo QuickStart</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Onboarding móvil de 8 pantallas sin datos fiscales al inicio. Lleva a la barbería a su primera reserva y activa el loop viral de la insignia.
            </p>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs space-y-1">
            <div className="flex justify-between text-slate-700">
              <span>Cuello de botella resuelto:</span>
              <strong className="text-blue-900">Fricción tributaria y servicios</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Uso habitual alcanzado:</span>
              <strong className="font-mono text-emerald-700">Sube de 22% a 39%</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to="/agendo/growth"
              className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold text-center transition-colors"
            >
              Panel de Valeria
            </Link>
            <Link
              to="/agendo/quickstart"
              className="p-2.5 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl text-xs font-bold transition-colors"
              title="Probar onboarding rápido"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Caso C: Sol de Casa */}
        <div className="bg-white rounded-3xl border border-emerald-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Sun className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Límite ≤ $300 CAC
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Comunidad Solar</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Portal digital «Mi Ahorro Solar» con tarjeta de ahorro por WhatsApp, calculadora para el vecino y solicitud de visitas sin saturar técnicos.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs space-y-1">
            <div className="flex justify-between text-slate-700">
              <span>Cuello de botella resuelto:</span>
              <strong className="text-emerald-900">Cero contacto post-instalación</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>CAC referidos vs Meta:</span>
              <strong className="font-mono text-emerald-700">$277.33 vs $718.13 (-61%)</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to="/sol-de-casa/growth"
              className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold text-center transition-colors"
            >
              Panel de Andrés
            </Link>
            <Link
              to="/sol-de-casa/familia/SOL-FAMILIA-MORA-9A"
              className="p-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition-colors"
              title="Ver portal familiar"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Acquisition Loop Visualizer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Diagrama Interactivo de Ciclos de Crecimiento
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visualiza paso a paso el recorrido viral y el momento Aha de cada caso de negocio
            </p>
          </div>

          {/* Toggle de Caso */}
          <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200/80">
            <button
              onClick={() => {
                setSelectedCycleCase('tueste');
                setActiveStepIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedCycleCase === 'tueste'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tueste
            </button>
            <button
              onClick={() => {
                setSelectedCycleCase('agendo');
                setActiveStepIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedCycleCase === 'agendo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Agendo
            </button>
            <button
              onClick={() => {
                setSelectedCycleCase('solDeCasa');
                setActiveStepIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedCycleCase === 'solDeCasa'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sol de Casa
            </button>
          </div>
        </div>

        {/* Step Nodes Horizontal Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {currentCycle.cycle.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeStepIndex === idx
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                  {s.step}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white border text-slate-500 font-mono">
                  {s.actor}
                </span>
              </div>
              <div className="font-bold text-xs text-slate-900 truncate">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Detailed Card for Active Step */}
        {currentCycle.cycle[activeStepIndex] && (
          <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl text-white space-y-3 shadow-md animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
                Paso {currentCycle.cycle[activeStepIndex].step} de {currentCycle.cycle.length} · {currentCycle.name}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 font-bold">
                Actor: {currentCycle.cycle[activeStepIndex].actor}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white">
              {currentCycle.cycle[activeStepIndex].title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {currentCycle.cycle[activeStepIndex].desc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                to={currentCycle.hubLink}
                className="text-xs font-bold text-indigo-300 hover:text-white underline flex items-center gap-1"
              >
                <span>Abrir panel de control de este caso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

