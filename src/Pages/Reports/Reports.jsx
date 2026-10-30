// DecisionLab 360 - Recomendaciones y Centro de Exportación
import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Lightbulb,
  Coffee,
  CalendarCheck,
  Sun,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { runTuesteModel, simulateTueste24Months } from '../../Engines/tuesteEngine.js';
import { runAgendoModel, simulateAgendo24Months } from '../../Engines/agendoEngine.js';
import { runSolDeCasaModel, simulateSolDeCasa24Months } from '../../Engines/solDeCasaEngine.js';
import { tuesteOriginalData } from '../../Data/tuesteData.js';
import { agendoOriginalData } from '../../Data/agendoData.js';
import { solDeCasaOriginalData } from '../../Data/solDeCasaData.js';
import { exportService } from '../../Services/exportService.js';
import { formatCurrency, formatRatio, formatPercent } from '../../Services/calculationService.js';

export default function Reports() {
  const [selectedCase, setSelectedCase] = useState('tueste');

  const tuesteModel = runTuesteModel();
  const tuesteSim = simulateTueste24Months();

  const agendoModel = runAgendoModel();
  const agendoSim = simulateAgendo24Months();

  const solModel = runSolDeCasaModel();
  const solSim = simulateSolDeCasa24Months();

  // Diccionario estructurado de las recomendaciones por caso
  const recommendations = {
    tueste: {
      decision: 'OPTIMIZAR',
      decisionBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      title: 'Caso A: Tueste · Dictamen sobre Propuesta Black Friday',
      situation: 'Inversión actual de $8,000 en Meta con $1,000 de fee a Impulso Digital. Saldo bancario cayó $3,200 en septiembre. La agencia propone duplicar a $16,000 con 30% de descuento en el primer pedido.',
      problem: 'Meta atribuye compras mediante retargeting de compradores previos (ROAS inflado de 3.0x). El cliente nuevo deja un ROAS real de 0.70x (pérdida inmediata) y el LTV a 12 meses ($54.88) apenas empata el CAC Real ($54.55), dando un ratio de 1.01x.',
      indicators: [
        { label: 'ROAS Real 1er Pedido', value: '0.70x', note: 'vs Break-even de 2.14x' },
        { label: 'LTV : CAC Real', value: '1.01x', note: 'Apenas empata en 12 meses' },
        { label: 'CAC Marginal a $16k', value: '$114 - $160', note: 'Muy por encima del LTV' }
      ],
      alternative: 'RECHAZAR duplicar a $16,000 con descuento. En su lugar, optimizar la estructura de costos directos y catálogo antes de considerar cualquier incremento publicitario.',
      proposedChanges: [
        'Hacer que el cliente pague los $4.50 de envío en pedidos de 2 bolsas (envío gratis solo desde $45).',
        'Lanzar el Pack de 3 bolsas a $48 con envío gratis incluido (margen unitario sube a $23.62).'
      ],
      expectedOutcome: 'El LTV a 12 meses aumenta a $78.40 (ratio LTV:CAC de 1.44x). Tueste genera $112,000 en caja al Mes 24 y adquiere la segunda tostadora de $14,000 en el mes 12 con recursos propios.',
      risks: 'Supone una tasa de aceptación del 20% para el nuevo pack y que cobrar el envío no deteriore drásticamente la tasa de conversión web.'
    },
    agendo: {
      decision: 'OPTIMIZAR',
      decisionBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      title: 'Caso B: Agendo · Dictamen sobre Triplicar Anuncios',
      situation: 'Gasto actual de $10,000 en anuncios ($6.5k Meta / $3.5k Google) que genera 500 trials y 70 clientes pagados (14% conversión). Valeria propone triplicar a $30,000 afirmando un LTV:CAC de 2.4x.',
      problem: 'Valeria usa el CAC Blended ($105) mezclando 50 clientes orgánicos gratuitos para maquillar el costo de anuncios. El CAC Paid real es de $180 y el LTV a 24 meses es de $251.29 (ratio de 1.40x). Además, triplicar sufre rendimientos decrecientes (900 trials) con un CAC marginal de $398.',
      indicators: [
        { label: 'CAC Paid Real', value: '$180.00', note: 'vs $105 reportado por Valeria' },
        { label: 'LTV : CAC Paid Real', value: '1.40x', note: 'Lejos del umbral sano de 3.0x' },
        { label: 'LTV : CAC al Triplicar', value: '0.91x', note: 'Destruye capital y quiebra en M6' }
      ],
      alternative: 'RECHAZAR tajantemente triplicar a $30,000. Reestructurar el funnel de onboarding comercial y la mezcla de planes para aumentar la caja inicial.',
      proposedChanges: [
        'Incentivar el Plan Anual ($240 adelantados) para captar al menos un 20% de las nuevas suscripciones.',
        'Mejorar la activación y acompañamiento de Mariela para subir la conversión de trial de 14% a 16.5%.',
        'Incrementar la tarifa mensual a $29/mes (el líder CitaYa cobra $35).'
      ],
      expectedOutcome: 'Payback promedio se reduce a 6 meses. Con solo $12,000/mes de inversión, Agendo supera las 1,900 barberías activas y acumula $245,000 en caja al Mes 24.',
      risks: 'Sensibilidad al precio de los barberos; demanda de atención personalizada de Mariela.'
    },
    solDeCasa: {
      decision: 'OPTIMIZAR',
      decisionBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      title: 'Caso C: Sol de Casa · Dictamen sobre Migración a Meta',
      situation: 'Inversión de $4,000 en Meta y $4,000 en Google. Leadly propone migrar todo el presupuesto ($8,000) a Meta argumentando que el lead cuesta $8 vs $40 en Google.',
      problem: 'Leadly optimiza por costo por lead (CPL). El lead de Meta tiene 18% teléfonos inválidos y cierra al 18%, exigiendo 5.56 visitas por venta ($333 en viáticos). Su CAC Real es $718.13 vs $535.53 en Google (+34% más caro). Mover todo a Meta colapsa la capacidad y baja las ventas de 22 a 17.5.',
      indicators: [
        { label: 'CAC Real Meta vs Google', value: '$718 vs $535', note: 'Meta es 34% más costoso' },
        { label: 'Valor Visita Google', value: '+$427.50', note: 'Casi el doble que Meta ($232)' },
        { label: 'Ventas si se pasa a Meta', value: '17.5 / mes', note: 'Caída de 4.8 ventas (-21%)' }
      ],
      alternative: 'RECHAZAR la propuesta de Leadly. Conservar Google Ads como pilar de alta rentabilidad y expandir la capacidad técnica.',
      proposedChanges: [
        'Reducir tiempo de respuesta de asesoras a < 5 minutos e implementar dos preguntas de filtro en Meta.',
        'Contratar un técnico adicional ($1,800/mes) en el Mes 2 para expandir capacidad a 150 visitas desde el Mes 3.',
        'Ofrecer activamente la batería de respaldo de $3,000 (+$76.50 de margen promedio).'
      ],
      expectedOutcome: 'Ventas mensuales escalan a 28 instalaciones firmadas, LTV:CAC consolidado sube a 3.44x y la caja acumulada al Mes 24 alcanza los $215,000 sin romper el piso de $5,000 de Sofía.',
      risks: 'Velocidad de contratación del nuevo técnico y disciplina en la llamada en menos de 5 minutos.'
    }
  };

  const rec = recommendations[selectedCase];

  const handleExportExcel = () => {
    const caseMap = {
      tueste: { name: 'Tueste (DTC)', model: tuesteModel, sim: tuesteSim },
      agendo: { name: 'Agendo (SaaS)', model: agendoModel, sim: agendoSim },
      solDeCasa: { name: 'Sol de Casa (Lead Gen)', model: solModel, sim: solSim }
    };
    const current = caseMap[selectedCase];
    exportService.exportCaseToExcel({
      caseKey: selectedCase,
      caseName: current.name,
      modelData: current.model,
      simulationData: current.sim,
      scenariosData: []
    });
  };

  const handleExportPDF = () => {
    const caseMap = {
      tueste: { name: 'Tueste', model: tuesteModel, sim: tuesteSim, trap: tuesteOriginalData.trapAnalysis },
      agendo: { name: 'Agendo', model: agendoModel, sim: agendoSim, trap: agendoOriginalData.trapAnalysis },
      solDeCasa: { name: 'Sol de Casa', model: solModel, sim: solSim, trap: solDeCasaOriginalData.trapAnalysis }
    };
    const current = caseMap[selectedCase];
    exportService.exportCaseToPDF({
      caseKey: selectedCase,
      caseName: current.name,
      modelData: current.model,
      simulationData: current.sim,
      recommendation: rec,
      trapAnalysis: current.trap
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Lightbulb className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
              Centro Ejecutivo
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Motor de Recomendaciones y Exportación de Informes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnósticos estratégicos basados en modelos financieros y descargas en formatos Excel y PDF
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setSelectedCase('tueste')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCase === 'tueste'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Tueste</span>
          </button>
          <button
            onClick={() => setSelectedCase('agendo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCase === 'agendo'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Agendo</span>
          </button>
          <button
            onClick={() => setSelectedCase('solDeCasa')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCase === 'solDeCasa'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Sol de Casa</span>
          </button>
        </div>
      </div>

      {/* Export Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50/50 rounded-xl border border-emerald-200 p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
              Planilla de Cálculo Completa
            </span>
            <h4 className="font-bold text-slate-900 text-base mt-0.5">
              Exportar a Microsoft Excel (.xlsx)
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-md">
              Incluye hojas de Resumen de KPIs, Supuestos, Proyección a 24 Meses y Matriz de Escenarios.
            </p>
          </div>
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Descargar .XLSX</span>
          </button>
        </div>

        <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 font-mono">
              Informe Formal para Comité
            </span>
            <h4 className="font-bold text-slate-900 text-base mt-0.5">
              Generar Dictamen en PDF
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-md">
              Informe ejecutivo listo para imprimir o enviar a inversionistas con tablas y desglose de trampas.
            </p>
          </div>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Descargar .PDF</span>
          </button>
        </div>
      </div>

      {/* Structured Recommendation Diagnostic Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Estructura Estándar de Recomendación
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {rec.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Dictamen Final:</span>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${rec.decisionBadge} font-mono tracking-wider`}>
              {rec.decision}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          {/* 1. Situación Actual */}
          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-blue-600 block mb-1">
              1. Situación Actual y Propuesta en Disputa
            </span>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              {rec.situation}
            </p>
          </div>

          {/* 2. Problema Identificado */}
          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-rose-600 block mb-1">
              2. Problema Identificado (La Trampa Financiera)
            </span>
            <p className="text-slate-700 leading-relaxed bg-rose-50/40 p-3.5 rounded-lg border border-rose-100">
              {rec.problem}
            </p>
          </div>

          {/* 3. Indicadores de Diagnóstico */}
          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-700 block mb-2">
              3. Indicadores Numéricos que Respaldan el Diagnóstico
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rec.indicators.map((ind, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 block">{ind.label}:</span>
                  <span className="text-base font-extrabold font-mono text-slate-900 block my-0.5">
                    {ind.value}
                  </span>
                  <span className="text-[11px] text-slate-500">{ind.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 & 5. Alternativa y Cambios Propuestos */}
          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-600 block mb-1">
              4 y 5. Alternativa Recomendada y Cambios Propuestos
            </span>
            <div className="bg-emerald-50/40 p-4 rounded-lg border border-emerald-100 space-y-2">
              <p className="font-semibold text-slate-900">
                {rec.alternative}
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pt-1">
                {rec.proposedChanges.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Resultado Esperado */}
          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-indigo-600 block mb-1">
              6. Resultado Esperado según el Modelo
            </span>
            <p className="text-slate-700 leading-relaxed bg-indigo-50/40 p-3.5 rounded-lg border border-indigo-100">
              {rec.expectedOutcome}
            </p>
          </div>

          {/* 7. Riesgos y Supuestos */}
          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-600 block mb-1">
              7. Riesgos y Supuestos Clave del Modelo
            </span>
            <p className="text-slate-700 leading-relaxed bg-amber-50/40 p-3.5 rounded-lg border border-amber-100">
              {rec.risks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
