// DecisionLab 360 - Datos Originales Caso C: Sol de Casa (Lead Generation Solar)

export const solDeCasaOriginalData = {
  // Economía unitaria de la instalación solar
  installation: {
    avgPrice: 6500.0,
    customerPaymentTerms: {
      signPercentage: 50.0, // 50% al firmar ($3,250)
      completionPercentage: 50.0 // 50% al terminar la instalación al mes siguiente ($3,250)
    },
    equipmentCostPercent: 55.0, // 55% del precio ($3,575). Se paga al proveedor el mes de la firma.
    installationCostPercent: 17.0, // 17% del precio ($1,105). Se paga el mes siguiente al instalar.
    grossMarginPercent: 28.0, // 28% = 100% - 55% - 17% ($1,820)
    salesAdvisorCommissionPercent: 3.0, // 3% ($195), se paga el mes de la firma en todas las ventas. Va en la contribución.
    netContributionBeforeMarketing: 1625.0 // $6,500 * (28% - 3%) = $1,625
  },

  // Capacidad operativa y visitas técnicas
  visits: {
    costPerVisitDone: 60.0, // Viáticos, transporte y bono por visita realizada (se cierre o no)
    baseMonthlyCapacity: 100, // Entre los 2 técnicos iniciales pueden hacer máx 100 visitas/mes
    extraTechnicianSalaryMonthly: 1800.0, // Sueldo por técnico extra
    extraTechnicianCapacityVisits: 50, // Suma 50 visitas/mes a partir del mes SIGUIENTE a contratarlo
    maxExtraTechnicians: 2 // Máximo 2 técnicos adicionales
  },

  // Canales publicitarios y embudos de septiembre
  channelsBaseline: {
    meta: {
      name: 'Meta Ads',
      spend: 4000,
      clicks: 4000,
      cpc: 1.0,
      leads: 500,
      cpl: 8.0,
      clickToLeadRate: 12.5,
      // Embudo CRM
      contactRatePercent: 55.0, // 55% de leads se contactan
      scheduleRatePercent: 30.0, // 30% de contactados agendan visita
      visitDoneRatePercent: 70.0, // 70% de agendadas se realizan
      closeRatePercent: 18.0, // 18% de visitas terminan en venta
      invalidPhonePercent: 18.0
    },
    google: {
      name: 'Google Ads',
      spend: 4000,
      clicks: 1600,
      cpc: 2.5,
      leads: 100,
      cpl: 40.0,
      clickToLeadRate: 6.25,
      // Embudo CRM
      contactRatePercent: 85.0, // 85% de leads se contactan
      scheduleRatePercent: 55.0, // 55% de contactados agendan visita
      visitDoneRatePercent: 85.0, // 85% de agendadas se realizan
      closeRatePercent: 30.0, // 30% de visitas terminan en venta
      invalidPhonePercent: 3.0
    },
    avgResponseTimeHours: 31 // Las asesoras tardan 31 horas en llamar a un lead nuevo
  },

  // Batería opcional
  backupBattery: {
    price: 3000.0,
    grossMarginPercent: 20.0, // $600
    salesCommissionPercent: 3.0, // $90
    netContribution: 510.0, // 17% neto ($510)
    testedAttachRatePercent: 15.0 // 3 de cada 20 clientes la agregaron (15%)
  },

  // Historial de inversión publicitaria y leads
  investmentHistory: {
    meta: [
      { spend: 0, leads: 0 },
      { spend: 2000, leads: 280 },
      { spend: 4000, leads: 500 },
      { spend: 6000, leads: 680 },
      { spend: 8000, leads: 840 },
      { spend: 10000, leads: 960 }
    ],
    google: [
      { spend: 0, leads: 0 },
      { spend: 2000, leads: 55 },
      { spend: 4000, leads: 100 },
      { spend: 6000, leads: 135 },
      { spend: 8000, leads: 160 } // Tope de 160 leads por volumen de búsqueda
    ]
  },

  // Datos financieros y de caja (Nivel 3)
  cashFlow: {
    initialCash: 12000,
    safetyCashFloor: 5000,
    fixedCostsMonthly: 18000, // Sueldos base 2 asesoras + 2 técnicos, sueldo de Andrés, oficina/bodega, camioneta, CRM
    month0SalesSigned: 22 // 22 ventas en septiembre para flujo mes 1
  },

  // Supuesto permitido #7: Tiempo de respuesta y filtro en formulario
  speedAndFilterImprovement: {
    responseTimeTargetMinutes: 5,
    qualifyingQuestions: ['¿Es dueño de la casa?', '¿Su recibo de luz pasa de $80?'],
    metaLeadVolumeFactor: 0.80, // Baja 20% los leads de Meta (menos leads, más calificados)
    metaContactRatePercent: 80.0,
    metaScheduleRatePercent: 40.0,
    metaVisitDoneRatePercent: 75.0,
    metaCloseRatePercent: 22.0
  },

  // Escenarios predefinidos
  scenarios: {
    current: {
      name: 'A. Situación Actual ($4k Meta / $4k Google)',
      metaSpend: 4000,
      googleSpend: 4000,
      extraTechnicians: 0,
      fastResponseActive: false,
      batteryOfferActive: false,
      description: 'Inversión balanceada de $4,000 en Meta y $4,000 en Google. Capacidad 100 visitas.'
    },
    agencyProposal: {
      name: 'B. Propuesta de Leadly ($8k Meta / $0 Google)',
      metaSpend: 8000,
      googleSpend: 0,
      extraTechnicians: 0,
      fastResponseActive: false,
      batteryOfferActive: false,
      description: 'Mover todo el presupuesto a Meta buscando leads baratos de $8. Cuello de botella y menos ventas.'
    },
    recommendedOwn: {
      name: 'C. Propuesta Propia (Filtro + 1 Técnico Extra)',
      metaSpend: 4000,
      googleSpend: 4000,
      extraTechnicians: 1, // Contratar 1 técnico extra para subir capacidad a 150
      fastResponseActive: true, // Filtro y respuesta en < 5 min
      batteryOfferActive: true, // Ofrecer batería de $3,000 con 15% attach rate
      description: 'Filtro y respuesta rápida en Meta, Google activo, 1 técnico extra y venta de batería.'
    }
  },

  // Análisis de la trampa
  trapAnalysis: {
    title: 'En qué se equivocó o nos confundió la IA / Leadly',
    claimedMetric: '«El lead de Meta cuesta $8 y en Google $40. Meta es 5 veces más eficiente. Pasemos los $4.000 a Meta para tener 1.000 leads y duplicar ventas.»',
    detectedProblem: 'Leadly comete el error clásico de optimizar por métrica de vanidad (CPL). El lead de Meta es barato porque incluye 18% teléfonos falsos, 45% nunca contestan y la tasa de cierre es apenas 18%. Google tiene un lead con intención de búsqueda real (85% contacto, 30% cierre).',
    whyWrong: 'Cada visita técnica cuesta $60. Meta requiere 5.56 visitas para cerrar 1 venta ($333.33 en visitas por venta), elevando el CAC Real a $718.13. Google necesita solo 3.33 visitas por venta ($200 en visitas), logrando un CAC Real de $535.53. ¡El cliente de Meta es 34% más caro de conseguir que el de Google! Además, cada visita técnica a un lead de Google genera un valor esperado de +$427.50, mientras una visita de Meta genera +$232.50. Si se pasa todo a Meta, se satura la capacidad técnica de 100 visitas con leads de baja conversión y las ventas caen de 22 a 17.5 por mes, destruyendo la caja.',
    correctedResult: 'CAC Real Google: $535.53 vs CAC Real Meta: $718.13. LTV:CAC Google: 3.03x vs Meta: 2.26x. Valor por visita Google: $427.50 vs Meta: $232.50. Pasar todo a Meta reduce ventas en un 21% y colapsa el negocio.',
    formulaUsed: 'CAC Real Canal = (Inversión Anuncios + Costo Visitas Realizadas) / Ventas; Valor de Visita = (Tasa de Cierre * Margen Contribución) - Costo por Visita'
  }
};
