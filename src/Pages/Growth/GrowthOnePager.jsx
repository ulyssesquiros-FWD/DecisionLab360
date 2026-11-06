// DecisionLab 360 - Fichas de Growth Ejecutivas (1 Página por Negocio)
// Cumplimiento estricto de los 14 puntos obligatorios de la rúbrica oficial de la Sesión 2

import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  Printer,
  Coffee,
  CalendarCheck,
  Sun,
  AlertTriangle,
  Target,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../../Services/calculationService.js';

export default function GrowthOnePager() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCase = searchParams.get('case') || 'tueste';
  const [selectedCase, setSelectedCase] = useState(initialCase);

  const handleSelectCase = (c) => {
    setSelectedCase(c);
    setSearchParams({ case: c });
  };

  const handlePrint = () => {
    window.print();
  };

  // Contenido de los 14 puntos para los tres casos
  const onePagerData = {
    tueste: {
      businessName: 'Tueste (Café de Especialidad DTC)',
      themeColor: 'border-amber-600 bg-amber-50 text-amber-950',
      tag: 'Caso A · E-commerce DTC',
      owner: 'Diego Ramírez',
      // 14 PUNTOS OBLIGATORIOS
      p1_problem: 'Alta dependencia de Meta Ads ($4,000/mes pauta + $1,000 agencia). Una suspensión temporal de 6 horas paralizó por completo la entrada de clientes nuevos. El programa piloto de referidos «Regala una bolsa» casi nadie lo usa.',
      p2_worstStep: 'Paso 1 a Paso 2 del embudo piloto: De 350 clientes que abren el correo, solo 120 ingresan al programa.',
      p3_currentPercentage: '65.7% de pérdida entre apertura y visita al programa. Sobre la cohorte total de 1,000 primeros compradores, solo el 6.0% (60 compras) termina convirtiendo.',
      p4_proposedChange: 'Postergar el envío de invitación al Día 4 (cuando el cliente ya recibió y probó el café en su casa en lugar del día siguiente a pagar). Eliminar la copia manual de códigos y sustituirla por un enlace personal único con mensaje pre-redactado de WhatsApp 1-Tap con descuento pre-cargado para el amigo.',
      p5_growthCycle: 'Cliente compra café → Recibe pedido en 72h → Prueba el café (Momento Aha) → Recibe aviso post-entrega y comparte por WhatsApp con 1 toque → Amigo abre landing personalizada con regalo autoaplicado → Compra → Se convierte en nuevo cliente promotor.',
      p6_numericalTarget: 'Aumentar la tasa de clientes que invitan amigos con compra efectiva del 6.0% al 15.0% en 90 días (de 60 a 150 compras referidas mensuales).',
      p7_effectOnAcquisition: 'Diversificación del mix de adquisición: los referidos pasan de representar el 28% al 55% de los clientes nuevos, reduciendo el riesgo ante incrementos de CPM o bloqueos en Meta.',
      p8_weeklyKPI: 'Compras Referidas Semanales por Cliente Promotor Activo (RPS) y Costo Acumulado por Referido.',
      p9_channelMatrixSummary: 'Paid: Meta Ads $4,000/mes para prospección limpia (100 clientes nuevos base); Owned: Correo y WhatsApp post-entrega día 4 ($150/mes); Earned: Programa Tueste Rewards con recompensas escalonadas ($8.40 CAC medio).',
      p10_experiment: 'Prueba A/B con 1,000 compradores: 500 reciben el flujo tradicional del día 1 con código manual; 500 reciben la notificación al día 4 con enlace precargado de WhatsApp.',
      p11_primaryMetric: 'Tasa de compras referidas efectivas (% de clientes que generan una compra de un amigo).',
      p12_guardrailMetric: 'Costo total de adquisición por referido (CAC referidos) estrictamente ≤ $25.00 (mitad del CAC Meta de $50).',
      p13_rewardsCost: 'Nivel 1: Muestra 100g ($1.60 amigo + $1.60 invitador = $3.20/ref); Nivel 2: $6 descuento amigo + Bolsa 340g invitador ($5.44 ÷ 3 amigos = $1.81) = $7.81/ref. Ambos respetan la regla de ≤ $25.',
      p14_aiErrors: 'La IA propuso inicialmente regalar "un mes gratis de suscripción" por cada amigo que comprara una bolsa suelta. Error grave: un mes gratis implica $30.60 no cobrados más $16.58 de desembolso directo ($10.88 café + $4.50 envío + $1.20 caja) = $47.18 de impacto total, lo cual violaba catastróficamente la regla de oro de Diego de no superar $25 por referido.'
    },
    agendo: {
      businessName: 'Agendo (SaaS B2B para Barberías y Salones)',
      themeColor: 'border-blue-600 bg-blue-50 text-blue-950',
      tag: 'Caso B · Suscripción SaaS',
      owner: 'Valeria Ortiz',
      p1_problem: 'De 500 barberías que inician la prueba gratis al mes, solo 70 terminan pagando (14% de conversión). El CAC Paid real es de $180.00 frente a un LTV de $251.29 (ratio 1.40x), muy por debajo del 2.4x blended engañoso que reportaba Valeria.',
      p2_worstStep: 'Pantalla 1 del onboarding: Cédula jurídica, razón social y régimen fiscal obligatorio.',
      p3_currentPercentage: '26% de abandono en la primera pantalla (de 100 trials solo 74 continúan). Además, solo 30 de cada 100 comparten su enlace en las primeras 24 horas.',
      p4_proposedChange: 'Agendo QuickStart: Onboarding móvil en menos de 5 minutos desde el celular. Eliminar la solicitud de datos fiscales al inicio. Precargar plantillas listas de servicios habituales (corte, barba, combo) y horarios predeterminados.',
      p5_growthCycle: 'Barbero ve anuncio ("Más clientes para tu barbería") → Se registra en celular → QuickStart &lt;5 min sin datos fiscales → Comparte enlace por WhatsApp a sus clientes → Cliente agenda cita (Momento Aha) → Barbero llega a uso habitual (≥20 citas) → Clientes y colegas ven la insignia «Reservado con Agendo» → Nuevas barberías se registran.',
      p6_numericalTarget: 'Aumentar la proporción de negocios que comparten su enlace en las primeras 24h del 30% al 65%, y elevar los trials que alcanzan uso habitual del 22% al 39%.',
      p7_effectOnAcquisition: 'La conversión global a pago sube del 13.88% al 19.0%, incrementando los clientes pagados de 70 a 95 mensuales y desplomando el CAC Paid de $180.00 a menos de $138.00.',
      p8_weeklyKPI: 'Porcentaje de Trials que Reciben su Primera Reserva en las Primeras 48 Horas (TTFB: Time-To-First-Booking).',
      p9_channelMatrixSummary: 'Paid: Meta y Google Ads ($10,000/mes) orientados a promesa de clientes; Owned: Onboarding QuickStart móvil de 8 pantallas; Earned: Nueva insignia viral clickable en las 250 visitas mensuales por barbería activa.',
      p10_experiment: 'Prueba A/B sobre 500 trials de octubre: Grupo Control (250 negocios) con flujo anterior de 4 pantallas; Grupo Tratamiento (250 negocios) con QuickStart móvil.',
      p11_primaryMetric: 'Porcentaje de trials que alcanzan uso habitual (≥ 20 citas completadas en los 14 días de prueba).',
      p12_guardrailMetric: 'Conversión final a pago y tasa de retención a 6 meses (no sacrificar la calidad ni retención del cliente pagado).',
      p13_rewardsCost: 'No aplica recompensas monetarias directas. El incentivo es el valor del software y la prueba gratuita sin fricción.',
      p14_aiErrors: 'La IA sugirió inicialmente evaluar el CAC reportado por Valeria de $105.00 como si fuera el costo real de los anuncios. Error grave: mezclaba 50 clientes orgánicos gratuitos con los 70 clientes de pauta (CAC Blended de vanidad) y omitía el sueldo de $1,200 de Mariela y los $1,400 de comisiones por cierre. El CAC Paid real era de $180.00, arrojando un LTV:CAC de apenas 1.40x.'
    },
    solDeCasa: {
      businessName: 'Sol de Casa (Energía Solar Residencial)',
      themeColor: 'border-emerald-600 bg-emerald-50 text-emerald-950',
      tag: 'Caso C · Lead Generation de Servicios',
      owner: 'Andrés Villalobos',
      p1_problem: 'Cero contacto con las 420 familias que ya tienen paneles instalados. El 75% no sabe cuánto ahorró el mes anterior. El CAC de Meta Ads es insostenible ($718.13 por instalación) y los 2 técnicos están al borde de saturación (capacidad de 100 visitas/mes).',
      p2_worstStep: 'Formulario web de prospección: De 100 visitas a la web, 14 abren el formulario de 6 campos y solo 6 dejan sus datos (86% de abandono). Además, las asesoras tardan 31 horas en llamar.',
      p3_currentPercentage: 'Solo el 8% de las familias instaladas refiere un cliente nuevo al año de manera espontánea.',
      p4_proposedChange: 'Comunidad Solar: Portal digital mensual «Mi Ahorro Solar» donde cada familia visualiza sus $77 ahorrados al mes y genera una tarjeta gráfica para WhatsApp con link personal. El vecino accede a una calculadora de ahorro solar y solicita una visita técnica sin fricción.',
      p5_growthCycle: 'Familia instala paneles ($6,500) → Accede a su portal y ve su ahorro real de 70% → Comparte tarjeta por WhatsApp con vecinos → Vecino usa calculadora solar y ve payback en ~7 años → Agenda visita técnica → Firma instalación → Familia recibe 1 año de mantenimiento gratis.',
      p6_numericalTarget: 'Aumentar la tasa de referidos anuales del 8% al 32% de las familias activas, generando al menos 15 a 20 ventas adicionales mensuales por referidos.',
      p7_effectOnAcquisition: 'CAC referidos de $277.33 frente a $718.13 de Meta (-61% de costo), con tasa de cierre en visitas que sube del 18% (Meta) al 45% (Referidos).',
      p8_weeklyKPI: 'Familias Activas que Comparten su Ahorro al Menos 1 Vez al Mes (FAS: Families Actively Sharing).',
      p9_channelMatrixSummary: 'Paid: Pauta balanceada Google ($4k) + Meta ($4k) filtrando recibos >$80; Owned: Portal Familiar «Mi Ahorro Solar»; Earned: Comunidad solar de vecinos y letreros de jardín.',
      p10_experiment: 'Prueba controlada con 50 clientes instalados en Curridabat y Escazú: 25 familias reciben acceso al nuevo portal y tarjeta gráfica de WhatsApp; 25 familias permanecen con el modelo tradicional.',
      p11_primaryMetric: 'Leads y visitas técnicas solicitadas por familia participante en un horizonte de 60 días.',
      p12_guardrailMetric: 'Costo total de adquisición por referido (sumando visitas técnicas necesarias y recompensas) estrictamente ≤ $300.00.',
      p13_rewardsCost: 'Costo esperado de visitas por venta: 2.222 visitas × $60 = $133.33. Recompensa por venta: 1 año de mantenimiento gratis ($144.00). Costo Total = $277.33 (Cumple regla ≤ $300).',
      p14_aiErrors: 'La IA propuso otorgar un bono en efectivo de $250 a la familia por cada venta cerrada, asumiendo erróneamente que $250 es menor a $300. Error grave: olvidó que cerrar una venta exige hacer 2.22 visitas técnicas a $60 ($133.33 de costo operativo obligatorio), por lo que sumar $250 elevaba el CAC real a $383.33, violando abiertamente el límite de Andrés.'
    }
  };

  const current = onePagerData[selectedCase];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Selector & Print Button */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-slate-800 text-sm">
            Ficha Ejecutiva de Growth (1 Página Obligatoria)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => handleSelectCase('tueste')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedCase === 'tueste' ? 'bg-amber-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tueste
            </button>
            <button
              onClick={() => handleSelectCase('agendo')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedCase === 'agendo' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Agendo
            </button>
            <button
              onClick={() => handleSelectCase('solDeCasa')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedCase === 'solDeCasa' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sol de Casa
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable 1-Page Document Container */}
      <div className="bg-white rounded-3xl border border-slate-300 p-6 sm:p-10 shadow-lg print:border-none print:shadow-none print:p-0 space-y-6 max-w-4xl mx-auto text-slate-800">
        
        {/* Document Top Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                DecisionLab 360 · Ficha Ejecutiva Oficial
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 font-mono">
                {current.tag}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {current.businessName}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Estrategia de Growth, Diagnóstico de Fricción, Validación Experimental y Economía Unitaria
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Responsable</span>
            <span className="text-sm font-extrabold text-slate-900 font-mono">{current.owner}</span>
            <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Versión 2.0 Aprobada</span>
          </div>
        </div>

        {/* 14 Mandatory Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* 1. Problema actual */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              1. Problema Actual:
            </span>
            <p className="text-slate-700 leading-relaxed">{current.p1_problem}</p>
          </div>

          {/* 2 & 3. Paso de mayor pérdida y % actual */}
          <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
            <span className="font-bold text-rose-900 uppercase tracking-wider block text-[11px]">
              2 & 3. Mayor Pérdida de Usuarios y Porcentaje:
            </span>
            <p className="text-rose-950 font-semibold">{current.p2_worstStep}</p>
            <p className="text-rose-900 text-[11px] leading-relaxed">{current.p3_currentPercentage}</p>
          </div>

          {/* 4. Cambio propuesto */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1 md:col-span-2">
            <span className="font-bold text-blue-900 uppercase tracking-wider block text-[11px]">
              4. Cambio Propuesto de Growth:
            </span>
            <p className="text-blue-950 leading-relaxed font-medium">{current.p4_proposedChange}</p>
          </div>

          {/* 5. Ciclo de crecimiento */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 md:col-span-2">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              5. Ciclo de Crecimiento (Loop):
            </span>
            <p className="text-slate-800 font-mono text-[11px] leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
              {current.p5_growthCycle}
            </p>
          </div>

          {/* 6 & 7. Objetivo numérico y Efecto */}
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-900 uppercase tracking-wider block text-[11px]">
              6 & 7. Objetivo Numérico y Efecto en el Negocio:
            </span>
            <p className="text-emerald-950 font-bold text-[11px]">{current.p6_numericalTarget}</p>
            <p className="text-emerald-900 text-[11px] leading-relaxed mt-1">{current.p7_effectOnAcquisition}</p>
          </div>

          {/* 8. Indicador semanal */}
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
            <span className="font-bold text-amber-900 uppercase tracking-wider block text-[11px]">
              8. Indicador Semanal Principal para el Dueño:
            </span>
            <p className="text-amber-950 font-extrabold text-[12px]">{current.p8_weeklyKPI}</p>
            <p className="text-amber-900 text-[10px] leading-relaxed">
              Métrica accionable de salud operativa directa.
            </p>
          </div>

          {/* 9. Matriz de canales a 90 días */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 md:col-span-2">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              9. Matriz de Canales a 90 Días (Paid / Owned / Earned):
            </span>
            <p className="text-slate-700 leading-relaxed text-[11px]">{current.p9_channelMatrixSummary}</p>
          </div>

          {/* 10, 11 & 12. Experimento, Métrica y Contramétrica */}
          <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-200 space-y-1 md:col-span-2">
            <span className="font-bold text-indigo-900 uppercase tracking-wider block text-[11px]">
              10, 11 & 12. Experimento de Validación A/B & Guardrails:
            </span>
            <p className="text-indigo-950 leading-relaxed">{current.p10_experiment}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="font-bold text-slate-800 block">Métrica Principal:</span>
                <span className="text-indigo-700 font-semibold">{current.p11_primaryMetric}</span>
              </div>
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="font-bold text-slate-800 block">Contramétrica (Guardrail):</span>
                <span className="text-rose-700 font-semibold">{current.p12_guardrailMetric}</span>
              </div>
            </div>
          </div>

          {/* 13. Costo de recompensas */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 md:col-span-2">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              13. Tabla de Recompensas y Límite Económico:
            </span>
            <p className="text-slate-700 leading-relaxed text-[11px]">{current.p13_rewardsCost}</p>
          </div>

          {/* 14. Error detectado en la IA */}
          <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl space-y-1.5 md:col-span-2">
            <div className="flex items-center gap-1.5 text-rose-900 font-extrabold uppercase text-[11px]">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>14. Sección Crítica: «En qué se equivocó o nos confundió la IA»</span>
            </div>
            <p className="text-rose-950 leading-relaxed text-[11px] font-medium bg-white/80 p-2.5 rounded-lg border border-rose-200">
              {current.p14_aiErrors}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>DecisionLab 360 V2.0 · Hoja de Presentación Ejecutiva</span>
          <span>Impresión lista · Todos los derechos reservados</span>
        </div>
      </div>
    </div>
  );
}

