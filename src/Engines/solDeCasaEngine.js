// DecisionLab 360 - Motor Financiero Caso C: Sol de Casa (Lead Generation Solar)
import { solDeCasaOriginalData } from '../Data/solDeCasaData.js';

/**
 * Interpolación lineal de leads para Meta y Google
 */
export function interpolateSolDeCasaLeads(spend, channel = 'meta') {
  if (spend <= 0) return 0;
  const history = solDeCasaOriginalData.investmentHistory[channel];
  const sorted = [...history].sort((a, b) => a.spend - b.spend);

  if (spend <= sorted[0].spend) {
    if (sorted[0].spend === 0) return sorted[0].leads;
    return (spend / sorted[0].spend) * sorted[0].leads;
  }
  const maxPoint = sorted[sorted.length - 1];
  if (spend >= maxPoint.spend) {
    return maxPoint.leads;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const p1 = sorted[i];
    const p2 = sorted[i + 1];
    if (spend >= p1.spend && spend <= p2.spend) {
      const slope = (p2.leads - p1.leads) / (p2.spend - p1.spend);
      return p1.leads + slope * (spend - p1.spend);
    }
  }
  return 0;
}

/**
 * Ejecuta el embudo de conversión para un canal dado
 */
export function calculateChannelFunnel({
  channel = 'meta',
  spend = 4000,
  leadsOverride = null,
  contactRatePercent,
  scheduleRatePercent,
  visitDoneRatePercent,
  closeRatePercent,
  fastResponseAndFilter = false
}) {
  const baseBaseline = solDeCasaOriginalData.channelsBaseline[channel];

  let rawLeads = leadsOverride !== null ? leadsOverride : interpolateSolDeCasaLeads(spend, channel);

  // Supuesto permitido #7: Si se activa respuesta rápida y filtro en Meta
  let contactRate = contactRatePercent !== undefined ? contactRatePercent : baseBaseline.contactRatePercent;
  let scheduleRate = scheduleRatePercent !== undefined ? scheduleRatePercent : baseBaseline.scheduleRatePercent;
  let visitDoneRate = visitDoneRatePercent !== undefined ? visitDoneRatePercent : baseBaseline.visitDoneRatePercent;
  let closeRate = closeRatePercent !== undefined ? closeRatePercent : baseBaseline.closeRatePercent;

  if (channel === 'meta' && fastResponseAndFilter) {
    const filterParams = solDeCasaOriginalData.speedAndFilterImprovement;
    rawLeads = rawLeads * filterParams.metaLeadVolumeFactor; // 20% menos leads
    contactRate = filterParams.metaContactRatePercent; // 80%
    scheduleRate = filterParams.metaScheduleRatePercent; // 40%
    visitDoneRate = filterParams.metaVisitDoneRatePercent; // 75%
    closeRate = filterParams.metaCloseRatePercent; // 22%
  }

  const cpl = rawLeads > 0 ? spend / rawLeads : 0;
  const contactedLeads = rawLeads * (contactRate / 100);
  const scheduledVisits = contactedLeads * (scheduleRate / 100);
  const requestedVisits = scheduledVisits * (visitDoneRate / 100);

  return {
    channel,
    spend,
    leads: rawLeads,
    cpl,
    contactRate,
    scheduleRate,
    visitDoneRate,
    closeRate,
    contactedLeads,
    scheduledVisits,
    requestedVisits
  };
}

/**
 * Ejecuta el modelo completo de Sol de Casa (Nivel 1 y Nivel 2)
 */
export function runSolDeCasaModel(inputs = {}) {
  const metaSpend = inputs.metaSpend !== undefined ? Number(inputs.metaSpend) : 4000;
  const googleSpend = inputs.googleSpend !== undefined ? Number(inputs.googleSpend) : 4000;
  const extraTechnicians = inputs.extraTechnicians !== undefined ? Number(inputs.extraTechnicians) : 0;
  const fastResponseActive = inputs.fastResponseActive || false;
  const batteryOfferActive = inputs.batteryOfferActive || false;

  const avgPrice = inputs.avgPrice !== undefined ? Number(inputs.avgPrice) : 6500.0;
  const equipmentPercent = inputs.equipmentPercent !== undefined ? Number(inputs.equipmentPercent) : 55.0;
  const installPercent = inputs.installPercent !== undefined ? Number(inputs.installPercent) : 17.0;
  const advisorCommissionPercent = inputs.commissionPercent !== undefined ? Number(inputs.commissionPercent) : 3.0;
  const costPerVisit = inputs.costPerVisit !== undefined ? Number(inputs.costPerVisit) : 60.0;

  // Contribución de instalación estándar: $6,500 * (1 - 0.55 - 0.17 - 0.03) = $6,500 * 25% = $1,625
  const baseMarginPercent = 100 - equipmentPercent - installPercent;
  let contributionPerSale = avgPrice * ((baseMarginPercent - advisorCommissionPercent) / 100);

  // Si se ofrece batería opcional (15% adopción, precio $3,000, margen 20%, comisión 3% = 17% neto = $510)
  let batteryContributionPerSale = 0;
  if (batteryOfferActive) {
    const batteryAttachRate = 0.15;
    const batteryNetContribution = 3000 * 0.17; // $510
    batteryContributionPerSale = batteryAttachRate * batteryNetContribution; // +$76.50
    contributionPerSale += batteryContributionPerSale;
  }

  // Capacidad de visitas (100 base + 50 por técnico extra, máx 2 técnicos)
  const totalCapacity = 100 + (Math.min(extraTechnicians, 2) * 50);

  // 1. Embudos de cada canal
  const metaFunnel = calculateChannelFunnel({
    channel: 'meta',
    spend: metaSpend,
    leadsOverride: inputs.metaLeadsOverride,
    fastResponseAndFilter: fastResponseActive
  });

  const googleFunnel = calculateChannelFunnel({
    channel: 'google',
    spend: googleSpend,
    leadsOverride: inputs.googleLeadsOverride
  });

  const totalRequestedVisits = metaFunnel.requestedVisits + googleFunnel.requestedVisits;

  // 2. Asignación de capacidad: Google tiene prioridad absoluta (cierra más)
  const googleVisitsDone = Math.min(googleFunnel.requestedVisits, totalCapacity);
  const remainingCapacityForMeta = Math.max(0, totalCapacity - googleVisitsDone);
  const metaVisitsDone = Math.min(metaFunnel.requestedVisits, remainingCapacityForMeta);
  const totalVisitsDone = googleVisitsDone + metaVisitsDone;

  const capacityExceeded = totalRequestedVisits > totalCapacity;
  const visitsLostToCapacity = Math.max(0, totalRequestedVisits - totalCapacity);
  const capacityUsagePercent = totalCapacity > 0 ? (totalVisitsDone / totalCapacity) * 100 : 0;

  // 3. Ventas por canal
  const googleSales = googleVisitsDone * (googleFunnel.closeRate / 100);
  const metaSales = metaVisitsDone * (metaFunnel.closeRate / 100);
  const totalSales = googleSales + metaSales;

  // 4. Costo de visitas realizadas
  const googleVisitsCost = googleVisitsDone * costPerVisit;
  const metaVisitsCost = metaVisitsDone * costPerVisit;
  const totalVisitsCost = totalVisitsDone * costPerVisit;

  // 5. CAC de Anuncios y CAC Real (con visitas)
  const cacAdsGoogle = googleSales > 0 ? googleSpend / googleSales : 0;
  const cacAdsMeta = metaSales > 0 ? metaSpend / metaSales : 0;
  const cacAdsTotal = totalSales > 0 ? (googleSpend + metaSpend) / totalSales : 0;

  const cacRealGoogle = googleSales > 0 ? (googleSpend + googleVisitsCost) / googleSales : 0;
  const cacRealMeta = metaSales > 0 ? (metaSpend + metaVisitsCost) / metaSales : 0;
  const cacRealTotal = totalSales > 0 ? (googleSpend + metaSpend + totalVisitsCost) / totalSales : 0;

  // 6. LTV:CAC (LTV = contribución de una venta, no hay recompra en sesión 1)
  const ltvToCacGoogle = cacRealGoogle > 0 ? contributionPerSale / cacRealGoogle : 0;
  const ltvToCacMeta = cacRealMeta > 0 ? contributionPerSale / cacRealMeta : 0;
  const ltvToCacTotal = cacRealTotal > 0 ? contributionPerSale / cacRealTotal : 0;

  // 7. Visitas necesarias para conseguir una venta (1 / tasa de cierre)
  const visitsPerSaleGoogle = googleFunnel.closeRate > 0 ? 100 / googleFunnel.closeRate : 0;
  const visitsPerSaleMeta = metaFunnel.closeRate > 0 ? 100 / metaFunnel.closeRate : 0;

  // 8. Valor de una visita = (tasa de cierre * contribución) - costo de visita ($60)
  const valueOfVisitGoogle = ((googleFunnel.closeRate / 100) * contributionPerSale) - costPerVisit;
  const valueOfVisitMeta = ((metaFunnel.closeRate / 100) * contributionPerSale) - costPerVisit;

  // 9. Curva de caja de un cliente (Mes 0, Mes 1, Mes 2)
  // Mes 0: -CAC Real
  // Mes 1: Andrés cobra 50% ($3,250), paga equipos 55% ($3,575) y comisión 3% ($195) -> Flujo Mes 1 = -$520
  // Mes 2: Andrés cobra 50% ($3,250), paga instalación 17% ($1,105) -> Flujo Mes 2 = +$2,145
  const clientCashCurve = [
    { month: 0, cash: -cacRealTotal, label: 'Mes 0: Desembolso CAC' },
    { month: 1, cash: -cacRealTotal + (avgPrice * 0.50 - avgPrice * (equipmentPercent / 100) - avgPrice * (advisorCommissionPercent / 100)), label: 'Mes 1: Firma (-$520)' },
    { month: 2, cash: -cacRealTotal + contributionPerSale, label: 'Mes 2: Instalación (+$1,625 neto)' }
  ];

  // Semáforo LTV:CAC
  let ltvToCacStatus = 'red';
  if (ltvToCacTotal >= 3.0) ltvToCacStatus = 'green';
  else if (ltvToCacTotal >= 1.0) ltvToCacStatus = 'yellow';

  return {
    metaSpend,
    googleSpend,
    totalAdSpend: metaSpend + googleSpend,
    extraTechnicians,
    totalCapacity,
    fastResponseActive,
    batteryOfferActive,
    contributionPerSale,
    metaFunnel,
    googleFunnel,
    totalRequestedVisits,
    googleVisitsDone,
    metaVisitsDone,
    totalVisitsDone,
    capacityExceeded,
    visitsLostToCapacity,
    capacityUsagePercent,
    googleSales,
    metaSales,
    totalSales,
    googleVisitsCost,
    metaVisitsCost,
    totalVisitsCost,
    cacAdsGoogle,
    cacAdsMeta,
    cacAdsTotal,
    cacRealGoogle,
    cacRealMeta,
    cacRealTotal,
    ltvToCacGoogle,
    ltvToCacMeta,
    ltvToCacTotal,
    ltvToCacStatus,
    visitsPerSaleGoogle,
    visitsPerSaleMeta,
    valueOfVisitGoogle,
    valueOfVisitMeta,
    clientCashCurve
  };
}

/**
 * Simulador de Caja de 24 Meses de Sol de Casa (Nivel 3)
 */
export function simulateSolDeCasa24Months(plan = {}) {
  const metaSpends = Array.isArray(plan.metaSpends)
    ? plan.metaSpends
    : Array(24).fill(plan.fixedMetaSpend !== undefined ? plan.fixedMetaSpend : 4000);

  const googleSpends = Array.isArray(plan.googleSpends)
    ? plan.googleSpends
    : Array(24).fill(plan.fixedGoogleSpend !== undefined ? plan.fixedGoogleSpend : 4000);

  // Hiring month for extra technicians: [ { monthHired: 1 } ] etc.
  const extraTechHires = plan.extraTechHires || []; // Array of months when an extra technician was hired (max 2)
  const fastResponseActive = plan.fastResponseActive || false;
  const startFastResponseMonth = plan.startFastResponseMonth || 1;

  const initialCash = 12000;
  const safetyCashFloor = 5000;
  const fixedCostsMonthly = 18000;
  const costPerVisit = 60;
  const technicianSalary = 1800;
  const avgPrice = 6500;
  const equipmentRate = 0.55;
  const installRate = 0.17;
  const commissionRate = 0.03;

  let currentCash = initialCash;
  let minCash = initialCash;
  let minCashMonth = 0;
  let floorBreached = false;
  let totalSalesOver24Months = 0;

  const monthlyBreakdown = [];
  let prevMonthSales = 22; // Mes 0 tuvo 22 ventas

  for (let m = 1; m <= 24; m++) {
    const metaSpend = metaSpends[m - 1] || 0;
    const googleSpend = googleSpends[m - 1] || 0;

    // Calcular cuántos técnicos extra se han contratado hasta este mes (máximo 2)
    // El técnico se PAGA desde el mes en que se contrata.
    // La capacidad (+50) funciona desde el mes SIGUIENTE.
    let hiredTechsSoFar = 0;
    let operativeTechsSoFar = 0;

    extraTechHires.forEach(hireMonth => {
      if (m >= hireMonth && hiredTechsSoFar < 2) {
        hiredTechsSoFar += 1;
      }
      if (m > hireMonth && operativeTechsSoFar < 2) {
        operativeTechsSoFar += 1;
      }
    });

    const capacityInMonth = 100 + (operativeTechsSoFar * 50);

    // ¿Filtro activo este mes?
    const isFastResponseThisMonth = fastResponseActive && m >= startFastResponseMonth;

    // Embudos
    const metaFunnel = calculateChannelFunnel({
      channel: 'meta',
      spend: metaSpend,
      fastResponseAndFilter: isFastResponseThisMonth
    });

    const googleFunnel = calculateChannelFunnel({
      channel: 'google',
      spend: googleSpend
    });

    const visitsRequestedTotal = metaFunnel.requestedVisits + googleFunnel.requestedVisits;

    // Priorizar Google para visitas
    const googleVisitsDone = Math.min(googleFunnel.requestedVisits, capacityInMonth);
    const remainingCap = Math.max(0, capacityInMonth - googleVisitsDone);
    const metaVisitsDone = Math.min(metaFunnel.requestedVisits, remainingCap);
    const totalVisitsDone = googleVisitsDone + metaVisitsDone;

    // Ventas
    const googleSales = googleVisitsDone * (googleFunnel.closeRate / 100);
    const metaSales = metaVisitsDone * (metaFunnel.closeRate / 100);
    const currentSales = googleSales + metaSales;
    totalSalesOver24Months += currentSales;

    // FLUJO DE CAJA:
    // Entradas: 50% de $6,500 de ventas del mes + 50% de $6,500 de ventas del mes anterior
    const inflowsFromCurrentMonth = currentSales * avgPrice * 0.50;
    const inflowsFromPrevMonth = prevMonthSales * avgPrice * 0.50;
    const totalInflows = inflowsFromCurrentMonth + inflowsFromPrevMonth;

    // Salidas:
    // 55% equipos sobre ventas actuales
    const equipmentCost = currentSales * avgPrice * equipmentRate;
    // 3% comisión sobre ventas actuales
    const commissionCost = currentSales * avgPrice * commissionRate;
    // 17% instalación sobre ventas del mes anterior
    const installCost = prevMonthSales * avgPrice * installRate;
    // $60 por visita realizada
    const visitsCost = totalVisitsDone * costPerVisit;
    // Anuncios
    const adSpendTotal = metaSpend + googleSpend;
    // Fijos + sueldo técnicos extra contratados
    const extraTechSalaries = hiredTechsSoFar * technicianSalary;
    const totalFixedCosts = fixedCostsMonthly + extraTechSalaries;

    const totalOutflows = equipmentCost + commissionCost + installCost + visitsCost + adSpendTotal + totalFixedCosts;

    // Balance neto y caja
    const netCashFlow = totalInflows - totalOutflows;
    currentCash += netCashFlow;

    if (currentCash < minCash) {
      minCash = currentCash;
      minCashMonth = m;
    }
    if (currentCash < safetyCashFloor) {
      floorBreached = true;
    }

    monthlyBreakdown.push({
      month: m,
      metaSpend,
      googleSpend,
      totalSpend: adSpendTotal,
      metaLeads: Math.round(metaFunnel.leads),
      googleLeads: Math.round(googleFunnel.leads),
      totalLeads: Math.round(metaFunnel.leads + googleFunnel.leads),
      requestedVisits: visitsRequestedTotal,
      capacity: capacityInMonth,
      hiredTechs: hiredTechsSoFar,
      operativeTechs: operativeTechsSoFar,
      visitsDone: totalVisitsDone,
      sales: currentSales,
      prevSales: prevMonthSales,
      inflows: totalInflows,
      outflows: totalOutflows,
      netCashFlow,
      endingCash: currentCash,
      floorBreached: currentCash < safetyCashFloor
    });

    prevMonthSales = currentSales; // Actualizar para el siguiente mes
  }

  // Regla: Desde el mes 19, la inversión total no puede bajar respecto al mes anterior
  let ruleSpendBreached = false;
  for (let m = 18; m < 23; m++) {
    const currSpend = (metaSpends[m] || 0) + (googleSpends[m] || 0);
    const nextSpend = (metaSpends[m + 1] || 0) + (googleSpends[m + 1] || 0);
    if (nextSpend < currSpend - 0.01) {
      ruleSpendBreached = true;
      break;
    }
  }

  return {
    monthlyBreakdown,
    initialCash,
    endingCash: currentCash,
    minCash,
    minCashMonth,
    floorBreached,
    ruleSpendBreached,
    totalSalesOver24Months,
    month1Verification: monthlyBreakdown[0]
  };
}
