// DecisionLab 360 - Datos Originales Caso A: Tueste (E-commerce DTC)

export const tuesteOriginalData = {
  // Productos y precios
  products: {
    bagGrams: 340,
    bagPrice: 17.0,
    bagsPerTypicalOrder: 2,
    orderTypicalValue: 34.0, // 2 bolsas x $17
    subscriptionDiscountPercent: 10,
    subscriptionPrice: 30.60, // 2 bolsas con 10% de descuento: $34 * 0.90
    originalShippingRule: 'Envío gratis en todos los pedidos (lo paga Tueste)'
  },

  // Costos directos de un pedido típico (2 bolsas)
  costs: {
    coffeeCostPerBag: 5.44,
    coffeeCostPerOrder: 10.88, // 32% del precio de lista ($34). No cambia con descuento.
    shippingCost: 4.50, // Lo paga Tueste en escenario original
    gatewayCommissionRate: 0.045, // 4.5% de lo que paga el cliente
    packagingCost: 1.20 // Caja y empaque por pedido
  },

  // Propuesta alternativa de pack (Idea de Diego)
  packIdea: {
    bags: 3,
    packPrice: 48.0,
    freeShippingThreshold: 45.0, // Envío gratis solo desde $45
    boxCost: 1.40,
    coffeeCost: 16.32, // 3 x $5.44
    twoBagShippingPaidByCustomer: 4.50 // Pedidos de 2 bolsas pagan su envío de $4.50
  },

  // Campaña de septiembre (Panel Meta y Shopify)
  septemberBaseline: {
    metaSpend: 8000,
    agencyFee: 1000, // Fee fijo mensual
    shopifyRevenue: 28000,
    shopifyOrders: 840,
    shopifyNewCustomers: 212,
    metaNewCustomers: 165, // De la encuesta y UTM
    otherNewCustomers: 47, // Instagram sin pauta 22, boca a boca 15, Google sin pauta 10
    
    // Datos reportados por Meta Ads Manager (Atribución 7d clic / 1d vista)
    metaReportedROAS: 3.0,
    metaReportedPurchases: 706,
    metaReportedRevenue: 24000,
    campaigns: [
      { name: 'TUE_Prospección_Advantage+', spend: 5600, purchases: 391, revenue: 13300, roas: 2.38, cpm: 9.80, ctr: 1.6 },
      { name: 'TUE_RTG_Visitantes_30d', spend: 1400, purchases: 162, revenue: 5500, roas: 3.93, cpm: 21.40, ctr: 2.1 },
      { name: 'TUE_RTG_Compradores_180d', spend: 1000, purchases: 153, revenue: 5200, roas: 5.20, cpm: 18.90, ctr: 2.8 }
    ]
  },

  // Comportamiento de clientes
  customerBehavior: {
    singleOrderShare: 0.85, // 85% pedidos sueltos
    subscriptionShare: 0.15, // 15% suscripción
    subscriberMonthlyChurnRate: 0.09, // 9% mensual
    // Pedidos promedio por mes de vida de cliente suelto (Total = 3.00 pedidos en 12 meses)
    singleCustomerOrdersSchedule: [
      1.00, // Mes 1
      0.15, // Mes 2
      0.20, // Mes 3
      0.20, // Mes 4
      0.20, // Mes 5
      0.20, // Mes 6
      0.20, // Mes 7
      0.15, // Mes 8
      0.15, // Mes 9
      0.15, // Mes 10
      0.20, // Mes 11
      0.20  // Mes 12
    ],
    singleCustomerOrdersMonths13to24: 0.10 // 0.10 pedidos al mes del mes 13 al 24
  },

  // Historial de inversión en Meta y clientes nuevos
  investmentHistory: [
    { spend: 0, customers: 0 },
    { spend: 4000, customers: 100 },
    { spend: 8000, customers: 165 },
    { spend: 12000, customers: 210 },
    { spend: 16000, customers: 235 },
    { spend: 20000, customers: 250 }
  ],

  // Datos financieros y de caja (Nivel 3)
  cashFlow: {
    initialCash: 35000,
    safetyCashFloor: 5000,
    fixedCostsMonthly: 6500, // Planilla $4.600, alquiler espacio $1.100, Shopify/apps/correo $250, contador/otros $550
    agencyFeeMonthly: 1000, // Se paga solo si hay inversión en Meta > 0
    existingCustomerInitialContribution: 9000, // Mes 1 sin anuncios
    existingCustomerMonthlyDecayRate: 0.03, // Cae 3% cada mes
    nonMetaNewCustomersMonthly: 47, // Clientes orgánicos constantes
    secondRoasterCost: 14000 // Inversión en segunda tostadora
  },

  // Escenarios predefinidos para comparar
  scenarios: {
    current: {
      name: 'A. Situación Actual',
      metaSpend: 8000,
      agencyFee: 1000,
      firstOrderDiscountPercent: 0,
      customerPaysShippingOnTwoBags: false,
      packActive: false,
      description: 'Inversión de $8,000 en Meta con agencia. Envío gratis pagado por Tueste.'
    },
    agencyProposal: {
      name: 'B. Propuesta de Agencia',
      metaSpend: 16000,
      agencyFee: 1000,
      firstOrderDiscountPercent: 30, // 30% de descuento en el primer pedido suelto
      customerPaysShippingOnTwoBags: false,
      packActive: false,
      description: 'Duplicar a $16,000 en Meta con 30% de descuento en el 1er pedido suelto para acelerar volumen.'
    },
    recommendedOwn: {
      name: 'C. Propuesta Propia (Pack & Envío)',
      metaSpend: 8000,
      agencyFee: 1000,
      firstOrderDiscountPercent: 0,
      customerPaysShippingOnTwoBags: true, // El cliente paga $4.50 en pedidos de 2 bolsas
      packActive: true, // Pack de 3 bolsas a $48 con envío gratis
      subscriptionShareBonus: 0.05, // Aumentar suscripciones a 20%
      description: 'Pack de 3 bolsas a $48 (envío gratis >$45) y cliente paga envío en 2 bolsas. Mejora margen radicalmente.'
    }
  },

  // Análisis de la trampa para el apartado obligatorio
  trapAnalysis: {
    title: 'En qué se equivocó o nos confundió la IA / La Agencia',
    claimedMetric: 'ROAS de 3.0 reportado por Meta Ads Manager ($24,000 en ventas con $8,000 de inversión)',
    detectedProblem: 'Meta se atribuye 706 compras con ventana de atribución de 7 días clic / 1 día visualización, pero $6.600 de inversión están en Retargeting a personas que ya conocen la marca o compraron en los últimos 180 días. Solo 165 clientes fueron realmente nuevos gracias a Meta.',
    whyWrong: 'El ROAS de 3.0 mezcla compras repetidas de clientes existentes con ventas nuevas. El ROAS real de los clientes nuevos en su primer pedido es de apenas 0.70 (165 x $34 / $8,000 = $5,610 / $8,000). Esto está muy por debajo del ROAS de break-even (2.14). Diego pierde dinero en el primer pedido y depende de la recompra para apenas empatar en 12 meses (LTV:CAC de 1.01). Duplicar a $16,000 con 30% de descuento destruye el margen y agota la caja de $35,000 rápidamente.',
    correctedResult: 'ROAS real primer pedido: 0.70x (no 3.0x). CAC real con agencia: $54.55. LTV a 12 meses: $54.88. LTV:CAC real: 1.01x (no 3.0+). CAC Marginal al subir a $16k: $114.29 por cliente adicional.',
    formulaUsed: 'ROAS Real Primer Pedido = (Clientes Nuevos Meta x Valor 1er Pedido) / Inversión Meta; CAC Real = (Inversión Meta + Fee Agencia) / Clientes Nuevos Meta'
  }
};
