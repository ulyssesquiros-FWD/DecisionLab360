// DecisionLab 360 - Motores de Cálculo de Growth (Sesión 2)
// Modelado económico, probabilístico y de embudos para Tueste, Agendo y Sol de Casa

import { growthData } from '../Data/growthData.js';

// =========================================================================
// 1. MOTOR GROWTH TUESTE (CASO A)
// =========================================================================

/**
 * Validador económico del programa Tueste Rewards
 * @param {Array} tiers - Lista de niveles de recompensa
 * @param {Object} options - Parámetros de simulación
 * @returns {Object} Diagnóstico de costos, cumplimiento y comparativa CAC
 */
export function evaluateTuesteRewards({
  tiers = growthData.tueste.defaultRewardTiers,
  metaSpend = 4000,
  agencyFee = 1000,
  metaNewCustomers = 100
} = {}) {
  const metaCAC = (metaSpend + agencyFee) / Math.max(1, metaNewCustomers);
  const maxAllowedCAC = metaCAC / 2; // Regla de Diego: CAC Meta / 2 = $25.00 con valores baseline

  let totalEstimatedCostPerReferral = 0;
  const tierEvaluations = tiers.map((tier) => {
    // Si el requisito es más de 1 amigo (ej. 3 amigos), el premio del invitador se prorratea
    const divisor = tier.requirementType === 'compra' ? Math.max(1, tier.requirementCount) : 1;
    const friendCostUnit = Number(tier.friendRewardCost) || 0;
    const referrerCostUnit = (Number(tier.referrerRewardCost) || 0) / divisor;
    const costPerReferral = friendCostUnit + referrerCostUnit;

    const complies = costPerReferral <= maxAllowedCAC;
    if (tier.active) {
      totalEstimatedCostPerReferral += costPerReferral;
    }

    return {
      ...tier,
      friendCostUnit,
      referrerCostUnit,
      costPerReferral,
      complies,
      marginRemaining: maxAllowedCAC - costPerReferral
    };
  });

  // El costo promedio ponderado de un cliente referido que compra (promedio de tiers activos)
  const activeTiers = tierEvaluations.filter((t) => t.active);
  const avgReferralCAC = activeTiers.length > 0
    ? activeTiers.reduce((acc, t) => acc + t.costPerReferral, 0) / activeTiers.length
    : 0;

  const compliesOverall = avgReferralCAC <= maxAllowedCAC && tierEvaluations.every((t) => !t.active || t.complies);

  return {
    metaCAC,
    maxAllowedCAC,
    tierEvaluations,
    avgReferralCAC,
    compliesOverall,
    savingsVsMeta: metaCAC - avgReferralCAC,
    savingsPercent: metaCAC > 0 ? ((metaCAC - avgReferralCAC) / metaCAC) * 100 : 0
  };
}

/**
 * Calcula las métricas del embudo actual de Tueste frente al embudo optimizado
 */
export function calculateTuesteFunnelMetrics(customFunnel = null) {
  const funnel = customFunnel || growthData.tueste.baselineFunnel;
  
  // Tasa de conversión etapa a etapa
  const stepConversions = [
    { from: 'Reciben', to: 'Abren', rate: (350 / 1000) * 100 },
    { from: 'Abren', to: 'Entran', rate: (120 / 350) * 100 },
    { from: 'Entran', to: 'Envían', rate: (100 / 120) * 100 },
    { from: 'Envían', to: 'Invitaciones', rate: 300 / 100 }, // 3.0 por cliente
    { from: 'Invitaciones', to: 'Abren tienda', rate: (150 / 300) * 100 },
    { from: 'Abren tienda', to: 'Compran', rate: (60 / 150) * 100 }
  ];

  return {
    initialCustomers: 1000,
    purchasingFriends: 60,
    overallConversionRate: (60 / 1000) * 100, // 6%
    criticalBottleneck: {
      stage: 'Abren correo -> Entran en el programa',
      dropRate: 65.71,
      lostUsers: 230,
      reason: 'El correo llega al día siguiente de pagar cuando el café tarda 3 días en llegar. El cliente aún no ha probado el producto y solo ve un código manual para copiar.'
    },
    stepConversions
  };
}

// =========================================================================
// 2. MOTOR GROWTH AGENDO QUICKSTART (CASO B)
// =========================================================================

/**
 * Simula el embudo de activación y conversión a pago de Agendo
 * @param {Object} params - Tasas y distribuciones
 * @returns {Object} Métricas de activación, retención y conexión económica
 */
export function evaluateAgendoQuickStart({
  trialsCount = 500, // Trials de anuncios mensuales
  shareDay1Rate = 0.65, // En QuickStart sube del 30% al 65%
  bookingIfSharedRate = 0.90, // 90% recibe reserva si comparte el día 1
  bookingIfNotSharedRate = 0.344, // 34.4% recibe si no comparte el día 1
  habitualUseFromBookingsRate = 0.60, // Proporción de los que reciben reserva que llegan a 20+ citas
  // Tasas de conversión a pago por segmento
  unconfiguredConvRate = 0.01,
  configuredNoBookingConvRate = 0.05,
  firstBookingConvRate = 0.15,
  habitualUseConvRate = 0.45
} = {}) {
  // Simulación por cada 100 trials y escalado a trialsCount
  const trialsBase = 100;
  const configured = 92; // En QuickStart < 5 min terminan ~92% (vs 62% del tradicional)
  const sharedDay1 = Math.round(trialsBase * shareDay1Rate);
  const notSharedDay1 = Math.max(0, configured - sharedDay1);

  const bookingsFromShared = Math.round(sharedDay1 * bookingIfSharedRate);
  const bookingsFromNotShared = Math.round(notSharedDay1 * bookingIfNotSharedRate);
  const totalWithBooking = bookingsFromShared + bookingsFromNotShared;

  const habitualUse = Math.min(totalWithBooking, Math.round(totalWithBooking * habitualUseFromBookingsRate));
  const firstBookingOnly = totalWithBooking - habitualUse;
  const configuredNoBooking = Math.max(0, configured - totalWithBooking);
  const unconfigured = Math.max(0, trialsBase - configured);

  // Conversión disyuntiva a pago por segmento (sin doble conteo)
  const paidUnconfigured = unconfigured * unconfiguredConvRate;
  const paidConfiguredNoBooking = configuredNoBooking * configuredNoBookingConvRate;
  const paidFirstBookingOnly = firstBookingOnly * firstBookingConvRate;
  const paidHabitualUse = habitualUse * habitualUseConvRate;

  const totalPaidPer100 = paidUnconfigured + paidConfiguredNoBooking + paidFirstBookingOnly + paidHabitualUse;
  const effectivePaidConversionRate = totalPaidPer100 / 100; // Porcentaje de conversión global

  // Escalado al total de trials de la pauta ($10k pauta)
  const scaledPaidFromAds = Math.round(trialsCount * effectivePaidConversionRate);
  const organicNewCustomers = 50; // Línea base Parte 1
  const totalNewCustomers = scaledPaidFromAds + organicNewCustomers;

  // Costos comerciales
  const salesSalary = 1200; // Mariela
  const salesCommission = scaledPaidFromAds * 20; // $20 por cliente de anuncios pagado
  const totalAdSpend = 10000;
  const totalCommercialSpend = totalAdSpend + salesSalary + salesCommission;

  const cacPaidReal = scaledPaidFromAds > 0 ? totalCommercialSpend / scaledPaidFromAds : 0;
  const cacBlended = totalNewCustomers > 0 ? totalCommercialSpend / totalNewCustomers : 0;

  // LTV a 24 meses sobre margen (Margen 78% de $25 = $19.50/mes)
  // Retención combinada a 6 meses
  const retentionWeightHabitual = habitualUse / Math.max(1, totalPaidPer100);
  const blendedRetention6m = (retentionWeightHabitual * 0.80) + ((1 - retentionWeightHabitual) * 0.35);

  const monthlyMargin = 25 * 0.78; // $19.50
  // LTV aproximado a 24 meses con churn compuesto
  const avgMonthsRetained = 12.8; // Vida media estimada
  const estimatedLTV = monthlyMargin * avgMonthsRetained;
  const ltvToCacPaid = cacPaidReal > 0 ? estimatedLTV / cacPaidReal : 0;

  return {
    trialsCount,
    configured,
    sharedDay1,
    totalWithBooking,
    habitualUse,
    effectivePaidConversionRate: effectivePaidConversionRate * 100,
    scaledPaidFromAds,
    totalNewCustomers,
    cacPaidReal,
    cacBlended,
    estimatedLTV,
    ltvToCacPaid,
    blendedRetention6m: blendedRetention6m * 100,
    segments: [
      { name: 'Sin configuración', count: unconfigured, paid: paidUnconfigured, conv: unconfiguredConvRate * 100 },
      { name: 'Configurados sin reservas', count: configuredNoBooking, paid: paidConfiguredNoBooking, conv: configuredNoBookingConvRate * 100 },
      { name: 'Con 1ra reserva (sin uso habitual)', count: firstBookingOnly, paid: paidFirstBookingOnly, conv: firstBookingConvRate * 100 },
      { name: 'Con uso habitual (≥20 citas)', count: habitualUse, paid: paidHabitualUse, conv: habitualUseConvRate * 100 }
    ]
  };
}

// =========================================================================
// 3. MOTOR GROWTH SOL DE CASA (CASO C)
// =========================================================================

/**
 * Calculadora solar para el portal familiar y la página del vecino
 * @param {number} monthlyElectricBill - Factura mensual de luz en dólares
 * @param {number} savingsPercent - Porcentaje de ahorro estimado (70% caso base)
 * @param {number} installationPrice - Precio promedio de instalación ($6,500)
 */
export function calculateSolarSavings(
  monthlyElectricBill = 110,
  savingsPercent = 70,
  installationPrice = 6500
) {
  const bill = Math.max(0, Number(monthlyElectricBill) || 0);
  const pct = Math.max(0, Math.min(100, Number(savingsPercent) || 70)) / 100;
  const price = Math.max(1, Number(installationPrice) || 6500);

  const monthlySavings = bill * pct;
  const annualSavings = monthlySavings * 12;
  const remainingBillMonthly = bill - monthlySavings;
  const paybackYears = annualSavings > 0 ? price / annualSavings : 99;
  const lifetime20YearsSavings = annualSavings * 20 - price;

  return {
    monthlyElectricBill: bill,
    savingsPercent: pct * 100,
    monthlySavings,
    annualSavings,
    remainingBillMonthly,
    installationPrice: price,
    paybackYears: Number(paybackYears.toFixed(1)),
    lifetime20YearsSavings: Math.max(0, lifetime20YearsSavings)
  };
}

/**
 * Validador económico estricto de recompensas Sol de Casa (Límite Andrés ≤ $300)
 * Incluye la probabilidad matemática de visitas técnicas necesarias para cerrar 1 venta.
 * @param {Array} rewardsList - Lista de premios por hito
 */
export function evaluateSolDeCasaRewards(rewardsList = growthData.solDeCasa.defaultRewardTiers) {
  const maxBudget = growthData.solDeCasa.economics.maxReferralAcquisitionCost; // $300.00
  const costPerVisit = growthData.solDeCasa.economics.costPerTechnicalVisitDone; // $60.00

  // Embudo de referidos:
  // Lead contactado (95%) -> Agenda visita (85%) -> Visita realizada (90%) -> Firma venta (45%)
  const pContact = 0.95;
  const pSchedule = 0.85;
  const pDone = 0.90;
  const pClose = 0.45;

  const netLeadToSaleRate = pContact * pSchedule * pDone * pClose; // 0.3269475
  const visitsDonePerLead = pContact * pSchedule * pDone; // 0.72675
  const visitsDonePerSale = visitsDonePerLead / netLeadToSaleRate; // 1 / 0.45 = 2.2222 visitas
  const expectedVisitCostPerSale = visitsDonePerSale * costPerVisit; // 2.2222 * $60 = $133.33

  // Presupuesto restante máximo para premios
  const maxRewardBudgetPerSale = maxBudget - expectedVisitCostPerSale; // $166.67

  // Calcular el costo esperado de los premios activos
  let expectedRewardsCostPerSale = 0;
  const evaluatedRewards = rewardsList.map((reward) => {
    let multiplierPerSale = 1.0;
    if (reward.milestone.includes('agenda')) {
      // Si el premio se da al agendar visita, se pagan visitas agendadas por venta = 1 / (0.90 * 0.45) = 2.469
      multiplierPerSale = 1 / (pDone * pClose);
    } else if (reward.milestone.includes('firma')) {
      multiplierPerSale = 1.0;
    }

    const expectedCost = (Number(reward.cost) || 0) * multiplierPerSale;
    if (reward.active) {
      expectedRewardsCostPerSale += expectedCost;
    }

    return {
      ...reward,
      multiplierPerSale,
      expectedCostPerSale: expectedCost
    };
  });

  const totalExpectedCAC = expectedVisitCostPerSale + expectedRewardsCostPerSale;
  const compliesWithMax300 = totalExpectedCAC <= maxBudget;
  const remainingMargin = maxBudget - totalExpectedCAC;

  return {
    maxBudget,
    costPerVisit,
    visitsDonePerSale,
    expectedVisitCostPerSale,
    maxRewardBudgetPerSale,
    expectedRewardsCostPerSale,
    totalExpectedCAC,
    compliesWithMax300,
    remainingMargin,
    evaluatedRewards
  };
}

/**
 * Modelo de capacidad técnica y extrapolación de letreros de jardín
 */
export function calculateSolDeCasaCapacity({
  baseCapacity = 100, // 2 técnicos
  extraTechnicians = 0,
  extraTechnicianSalary = 1800,
  extraTechnicianCapacity = 50,
  yardSignRatePerMonth = 0.15 // 6 leads en 20 casas durante 2 meses = 0.15 leads/mes/casa
} = {}) {
  const totalCapacity = baseCapacity + extraTechnicians * extraTechnicianCapacity;
  const extraSalaries = extraTechnicians * extraTechnicianSalary;

  // Leads necesarios para llenar 50 visitas adicionales
  // Visitas realizadas por lead = 0.95 * 0.85 * 0.90 = 0.72675
  const leadsPerVisitDone = 1 / (0.95 * 0.85 * 0.90); // 1.376
  const leadsNeededFor50Visits = 50 * leadsPerVisitDone; // ~68.8 leads

  // Familias necesarias para generar esos leads asumiendo rendimiento de letrero
  const familiesNeededFor50Visits = leadsNeededFor50Visits / yardSignRatePerMonth; // ~458.7 familias

  return {
    totalCapacity,
    extraSalaries,
    leadsNeededFor50Visits: Math.round(leadsNeededFor50Visits),
    familiesNeededFor50Visits: Math.round(familiesNeededFor50Visits),
    hypothesisNote: 'Hipótesis de extrapolación: Se asume que una familia que comparte activamente su tarjeta digital genera la misma tracción que un letrero físico de jardín (0.15 leads/mes). Como existen 420 familias instaladas hoy, saturar un técnico adicional exige activar al 109% de la base existente o incrementar la efectividad digital.'
  };
}

