// DecisionLab 360 - Datos Originales Caso B: Agendo (Software SaaS)

export const agendoOriginalData = {
  // Precios y planes
  pricing: {
    monthlyPlanPrice: 25.0,
    annualPlanPrice: 240.0, // Equivalente a $20/mes pagados por adelantado
    monthlyPlanShare: 0.90, // 90% elige mensual
    annualPlanShare: 0.10, // 10% elige anual
    trialDays: 14,
    trialCreditCardRequired: false
  },

  // Estructura de costos directos y margen bruto
  costs: {
    grossMarginPercent: 78.0, // Margen bruto 78%
    directCostPercent: 22.0 // WhatsApp, servidores, procesador de pagos, soporte
  },

  // Panel de anuncios de septiembre (Baseline)
  septemberBaseline: {
    totalAdSpend: 10000,
    metaSpend: 6500,
    googleSpend: 3500,
    metaImpressions: 812000,
    metaClicks: 9750,
    metaCtr: 1.2,
    metaTrials: 433,
    metaCostPerTrial: 15.01,
    googleImpressions: 41000,
    googleClicks: 1480,
    googleCtr: 3.6,
    googleTrials: 67,
    googleCostPerTrial: 52.24,
    totalTrials: 500,
    blendedCostPerTrial: 20.0,
    trialConversionRatePercent: 14.0, // 14% de trials pasan a pagar
    paidCustomersFromAds: 70, // 500 * 14% = 70
    organicNewCustomers: 50, // Clientes orgánicos mensuales (sin costo ni comisión)
    totalNewPaidCustomers: 120, // 70 + 50
    currentPayingCustomersMonth0: 1150
  },

  // Capacidad y costos comerciales
  sales: {
    salesRepSalaryMonthly: 1200, // Mariela
    salesRepCapacityTrials: 500, // Máximo 500 trials por vendedora al mes
    commissionPerPaidAdCustomer: 20 // Comisión por cliente de anuncios que cierra
  },

  // Retención y horizonte
  retention: {
    monthlyChurnPercent: 6.0, // Churn mensual del plan mensual (retención 94%)
    annualRenewalRatePercent: 70.0, // 70% renueva al cumplir el año (mes 13)
    ltvHorizonMonths: 24 // Horizonte máximo de LTV
  },

  // Historial de inversión publicitaria y trials
  investmentHistory: [
    { spend: 0, trials: 0 },
    { spend: 5000, trials: 290 },
    { spend: 10000, trials: 500 },
    { spend: 15000, trials: 650 },
    { spend: 20000, trials: 760 },
    { spend: 30000, trials: 900 }
  ],

  // Datos financieros y de caja (Nivel 3)
  cashFlow: {
    initialCash: 60000,
    safetyCashFloor: 10000,
    fixedCostsMonthly: 14000, // Sueldos Valeria + 2 devs $11.000, coworking $900, herramientas $600, contador/abogado $500, otros $1.000
    initialPayingCustomers: 1150
  },

  // Otros datos del mercado
  market: {
    competitorPriceMonthly: 35.0, // CitaYa
    nps: 61,
    chairsPerBarbershopAvg: 2.3
  },

  // Escenarios predefinidos
  scenarios: {
    current: {
      name: 'A. Situación Actual ($10k)',
      adSpend: 10000,
      annualPlanShare: 0.0, // Supuesto permitido #1: Base 100% mensual
      trialConversionRatePercent: 14.0,
      monthlyPlanPrice: 25.0,
      monthlyChurnPercent: 6.0,
      description: 'Inversión de $10,000 en anuncios, 500 trials, 70 clientes pagados de ads, 1 vendedora.'
    },
    valeriaProposal: {
      name: 'B. Propuesta de Valeria ($30k)',
      adSpend: 30000,
      annualPlanShare: 0.0,
      trialConversionRatePercent: 14.0,
      monthlyPlanPrice: 25.0,
      monthlyChurnPercent: 6.0,
      description: 'Triplicar anuncios a $30,000 con la esperanza de triplicar clientes. Requiere 2 vendedoras.'
    },
    recommendedOwn: {
      name: 'C. Propuesta Propia (Optimización)',
      adSpend: 12000,
      annualPlanShare: 0.20, // Subir a 20% plan anual (inyección de caja inicial)
      trialConversionRatePercent: 16.5, // Mejor onboarding sube conversión a 16.5%
      monthlyPlanPrice: 29.0, // Aumentar precio a $29 (sigue bajo los $35 de CitaYa)
      monthlyChurnPercent: 5.0, // Mejor producto y soporte bajan churn a 5%
      description: 'Optimizar funnel: precio $29, 20% anual, conversión 16.5% y churn 5%. Crece sin quemar caja.'
    }
  },

  // Análisis de la trampa
  trapAnalysis: {
    title: 'En qué se equivocó o nos confundió la IA / Valeria',
    claimedMetric: 'CAC reportado de $105 y LTV:CAC de 2.4 («Cada dólar en marketing vuelve 2.4 veces. Hay que acelerar»)',
    detectedProblem: 'Valeria comete 3 errores graves: 1) Utiliza el CAC Blended ($12,600 / 120 clientes totales = $105) mezclando 50 clientes orgánicos gratuitos para ocultar el costo real de los anuncios. 2) Su freelancer confunde el costo por registro ($20 por trial) con el costo de adquisición de un cliente que paga. 3) Usa una fórmula de LTV sin tope de meses o asume retención infinita para inflar el ratio.',
    whyWrong: 'El CAC Paid real es de $180 ($10,000 ads + $1,200 vendedora + $1,400 comisiones = $12,600 / 70 clientes pagados de ads). El LTV a 24 meses sobre margen es de $251.29 ($19.50 de margen mensual acumulado con retención del 94%). Por lo tanto, el LTV:CAC Paid real es de 1.40x, no 2.4x. Además, la curva de trials tiene rendimientos decrecientes: triplicar a $30,000 solo trae 900 trials (126 clientes), disparando el CAC marginal a $398.57 y el CAC promedio a $277.14 (LTV:CAC de 0.91x, destruyendo capital). Agendo quemaría sus $60,000 de caja en pocos meses.',
    correctedResult: 'CAC Paid real: $180.00 (vs $105). LTV real a 24 meses: $251.29. LTV:CAC Paid: 1.40x (vs 2.4x). CAC Marginal al triplicar: $398.57 por cliente adicional. Caja restante al triplicar: quiebra técnica.',
    formulaUsed: 'CAC Paid = (Inversión Anuncios + Sueldos Vendedoras + Comisiones) / Clientes Pagados Anuncios; LTV 24m = Σ [Margen Mensual * (1 - Churn)^(t-1)] para t=1..24'
  }
};
