// DecisionLab 360 - Motor Financiero Caso B: Agendo (Software SaaS)
import { agendoOriginalData } from '../Data/agendoData.js';

/**
 * Interpolación lineal para trials según inversión en anuncios
 */
export function interpolateAgendoTrials(spend, history = agendoOriginalData.investmentHistory) {
  if (spend <= 0) return 0;
  const sorted = [...history].sort((a, b) => a.spend - b.spend);
  if (spend <= sorted[0].spend) {
    if (sorted[0].spend === 0) return sorted[0].trials;
    return (spend / sorted[0].spend) * sorted[0].trials;
  }
  const maxPoint = sorted[sorted.length - 1];
  if (spend >= maxPoint.spend) {
    return maxPoint.trials;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const p1 = sorted[i];
    const p2 = sorted[i + 1];
    if (spend >= p1.spend && spend <= p2.spend) {
      const slope = (p2.trials - p1.trials) / (p2.spend - p1.spend);
      return p1.customers !== undefined 
        ? p1.customers + slope * (spend - p1.spend)
        : p1.trials + slope * (spend - p1.spend);
    }
  }
  return 0;
}

/**
 * Calcula márgenes y economía unitaria de Agendo
 */
export function calculateAgendoUnitEconomics({
  monthlyPrice = 25.0,
  annualPrice = 240.0,
  grossMarginPercent = 78.0,
  annualPlanShare = 0.0 // Base: 100% mensual según supuesto permitido #1
}) {
  const grossMarginRate = grossMarginPercent / 100;
  const monthlyMargin = monthlyPrice * grossMarginRate; // $19.50 con base
  const annualMargin = annualPrice * grossMarginRate; // $187.20

  return {
    monthlyPrice,
    annualPrice,
    grossMarginPercent,
    grossMarginRate,
    monthlyMargin,
    annualMargin,
    annualPlanShare
  };
}

/**
 * Calcula el LTV a 24 meses y LTV sin tope
 */
export function calculateAgendoLTV({
  monthlyMargin = 19.50,
  annualMargin = 187.20,
  monthlyChurnPercent = 6.0,
  annualRenewalRatePercent = 70.0,
  annualPlanShare = 0.0,
  horizonMonths = 24
}) {
  const churnRate = monthlyChurnPercent / 100;
  const retentionRate = 1 - churnRate;

  // LTV mensual 24 meses: Suma t=1..24 de monthlyMargin * retention^(t-1)
  let cumulativeRetentionSum = 0;
  for (let t = 0; t < horizonMonths; t++) {
    cumulativeRetentionSum += Math.pow(retentionRate, t);
  }
  const ltvMonthly24m = monthlyMargin * cumulativeRetentionSum; // $251.29 para 24m y 6% churn

  // LTV mensual sin tope de meses (margen / churn)
  const ltvSinTope = churnRate > 0 ? monthlyMargin / churnRate : monthlyMargin * 100; // $325.00

  // LTV anual (Año 1 upfront + 70% renovación al mes 13)
  const ltvAnnual24m = annualMargin + (annualMargin * (annualRenewalRatePercent / 100)); // $318.24

  // LTV ponderado según mix mensual/anual
  const blendedLTV = ((1 - annualPlanShare) * ltvMonthly24m) + (annualPlanShare * ltvAnnual24m);

  return {
    ltvMonthly24m,
    ltvSinTope,
    ltvAnnual24m,
    blendedLTV,
    effectiveMonthsRetained24m: cumulativeRetentionSum
  };
}

/**
 * Curva de caja de un cliente de Agendo (Mes 0 al 24)
 */
export function calculateAgendoCustomerCashCurve({
  cac,
  monthlyMargin = 19.50,
  annualMargin = 187.20,
  monthlyChurnPercent = 6.0,
  annualRenewalRatePercent = 70.0,
  horizonMonths = 24
}) {
  const churnRate = monthlyChurnPercent / 100;
  const retentionRate = 1 - churnRate;

  // Curva cliente mensual
  const monthlyCurve = [];
  let cumMonthly = -cac;
  monthlyCurve.push({ month: 0, cash: cumMonthly });
  for (let m = 1; m <= horizonMonths; m++) {
    const marginThisMonth = monthlyMargin * Math.pow(retentionRate, m - 1);
    cumMonthly += marginThisMonth;
    monthlyCurve.push({ month: m, cash: cumMonthly, marginThisMonth });
  }

  // Curva cliente anual (paga $240 upfront mes 1, renueva 70% mes 13)
  const annualCurve = [];
  let cumAnnual = -cac;
  annualCurve.push({ month: 0, cash: cumAnnual });
  for (let m = 1; m <= horizonMonths; m++) {
    let marginThisMonth = 0;
    if (m === 1) {
      marginThisMonth = annualMargin;
    } else if (m === 13) {
      marginThisMonth = annualMargin * (annualRenewalRatePercent / 100);
    }
    cumAnnual += marginThisMonth;
    annualCurve.push({ month: m, cash: cumAnnual, marginThisMonth });
  }

  // Paybacks
  let paybackMonthly = null;
  for (let i = 1; i < monthlyCurve.length; i++) {
    if (monthlyCurve[i].cash >= 0) {
      const prev = monthlyCurve[i - 1].cash;
      const curr = monthlyCurve[i].cash;
      paybackMonthly = (i - 1) + (-prev / (curr - prev));
      break;
    }
  }

  let paybackAnnual = null;
  for (let i = 1; i < annualCurve.length; i++) {
    if (annualCurve[i].cash >= 0) {
      paybackAnnual = i;
      break;
    }
  }

  return {
    monthlyCurve,
    annualCurve,
    paybackMonthly,
    paybackAnnual
  };
}

/**
 * Ejecuta el modelo completo de Agendo (Nivel 1 y Nivel 2)
 */
export function runAgendoModel(inputs = {}) {
  const adSpend = inputs.adSpend !== undefined ? Number(inputs.adSpend) : 10000;
  const trialConversionRate = inputs.trialConversionRate !== undefined ? Number(inputs.trialConversionRate) : 14.0;
  const monthlyPrice = inputs.monthlyPrice !== undefined ? Number(inputs.monthlyPrice) : 25.0;
  const annualPrice = inputs.annualPrice !== undefined ? Number(inputs.annualPrice) : 240.0;
  const grossMarginPercent = inputs.grossMarginPercent !== undefined ? Number(inputs.grossMarginPercent) : 78.0;
  const monthlyChurnPercent = inputs.monthlyChurnPercent !== undefined ? Number(inputs.monthlyChurnPercent) : 6.0;
  const annualPlanShare = inputs.annualPlanShare !== undefined ? Number(inputs.annualPlanShare) : 0.0;
  const commissionPerCustomer = inputs.commissionPerCustomer !== undefined ? Number(inputs.commissionPerCustomer) : 20.0;
  const salesRepSalary = inputs.salesRepSalary !== undefined ? Number(inputs.salesRepSalary) : 1200.0;
  const salesRepCapacity = inputs.salesRepCapacity !== undefined ? Number(inputs.salesRepCapacity) : 500;
  const organicCustomers = inputs.organicCustomers !== undefined ? Number(inputs.organicCustomers) : 50;

  // 1. Trials e interpolación
  const trials = interpolateAgendoTrials(adSpend);
  const costPerTrial = trials > 0 ? adSpend / trials : 0;

  // 2. Clientes nuevos de anuncios y orgánicos
  const paidCustomersFromAds = trials * (trialConversionRate / 100);
  const totalNewPaidCustomers = paidCustomersFromAds + organicCustomers;

  // 3. Vendedoras necesarias (Math.ceil(trials / 500))
  const salesRepsNeeded = trials > 0 ? Math.ceil(trials / salesRepCapacity) : 0;
  const totalSalesRepCost = salesRepsNeeded * salesRepSalary;
  const totalCommissions = paidCustomersFromAds * commissionPerCustomer;

  // 4. Costo total de adquisición pagada
  const totalPaidAcquisitionCost = adSpend + totalSalesRepCost + totalCommissions;

  // 5. CAC Paid y CAC Blended
  const cacPaid = paidCustomersFromAds > 0 ? totalPaidAcquisitionCost / paidCustomersFromAds : 0;
  const cacBlended = totalNewPaidCustomers > 0 ? totalPaidAcquisitionCost / totalNewPaidCustomers : 0;

  // 6. Márgenes y LTV
  const unitEconomics = calculateAgendoUnitEconomics({
    monthlyPrice,
    annualPrice,
    grossMarginPercent,
    annualPlanShare
  });

  const ltvData = calculateAgendoLTV({
    monthlyMargin: unitEconomics.monthlyMargin,
    annualMargin: unitEconomics.annualMargin,
    monthlyChurnPercent,
    annualPlanShare,
    horizonMonths: 24
  });

  // 7. Ratios LTV:CAC
  const ltvToCacPaid = cacPaid > 0 ? ltvData.blendedLTV / cacPaid : 0;
  const ltvToCacBlended = cacBlended > 0 ? ltvData.blendedLTV / cacBlended : 0;

  // Comparación con la lámina de Valeria
  const valeriaClaimedCAC = 105.0;
  const valeriaClaimedLTVCAC = 2.4;

  // 8. Paybacks y Curvas
  const cashCurves = calculateAgendoCustomerCashCurve({
    cac: cacPaid,
    monthlyMargin: unitEconomics.monthlyMargin,
    annualMargin: unitEconomics.annualMargin,
    monthlyChurnPercent
  });

  // 9. CAC Marginal
  let marginalCAC = 0;
  const history = agendoOriginalData.investmentHistory;
  for (let i = 0; i < history.length - 1; i++) {
    if (adSpend > history[i].spend && adSpend <= history[i + 1].spend) {
      const extraSpend = history[i + 1].spend - history[i].spend;
      const extraTrials = history[i + 1].trials - history[i].trials;
      const extraPaidCust = extraTrials * (trialConversionRate / 100);
      marginalCAC = extraPaidCust > 0 ? extraSpend / extraPaidCust : 0;
      break;
    }
  }
  if (!marginalCAC && adSpend > 0) {
    const extraSpend = history[1].spend - history[0].spend;
    const extraPaidCust = history[1].trials * (trialConversionRate / 100);
    marginalCAC = extraPaidCust > 0 ? extraSpend / extraPaidCust : 0;
  }

  // Semáforo LTV:CAC
  let ltvToCacStatus = 'red';
  if (ltvToCacPaid >= 3.0) ltvToCacStatus = 'green';
  else if (ltvToCacPaid >= 1.0) ltvToCacStatus = 'yellow';

  return {
    adSpend,
    trials,
    costPerTrial,
    paidCustomersFromAds,
    organicCustomers,
    totalNewPaidCustomers,
    salesRepsNeeded,
    totalSalesRepCost,
    totalCommissions,
    totalPaidAcquisitionCost,
    cacPaid,
    cacBlended,
    valeriaClaimedCAC,
    valeriaClaimedLTVCAC,
    unitEconomics,
    ltvData,
    ltvToCacPaid,
    ltvToCacBlended,
    ltvToCacStatus,
    cashCurves,
    marginalCAC
  };
}

/**
 * Simulador de Caja de 24 Meses de Agendo (Nivel 3)
 */
export function simulateAgendo24Months(plan = {}) {
  const monthlySpends = Array.isArray(plan.monthlySpends)
    ? plan.monthlySpends
    : Array(24).fill(plan.fixedAdSpend !== undefined ? plan.fixedAdSpend : 10000);

  const initialCash = 60000;
  const safetyCashFloor = 10000;
  const fixedCostsMonthly = 14000;
  const initialCustomers = 1150;
  const monthlyChurnRate = (plan.monthlyChurnPercent !== undefined ? plan.monthlyChurnPercent : 6.0) / 100;
  const trialConversionRate = (plan.trialConversionRate !== undefined ? plan.trialConversionRate : 14.0) / 100;
  const monthlyPrice = plan.monthlyPrice !== undefined ? plan.monthlyPrice : 25.0;
  const annualPrice = plan.annualPrice !== undefined ? plan.annualPrice : 240.0;
  const grossMarginRate = (plan.grossMarginPercent !== undefined ? plan.grossMarginPercent : 78.0) / 100;
  const annualPlanShare = plan.annualPlanShare !== undefined ? plan.annualPlanShare : 0.0;
  const annualRenewalRate = 0.70;
  const organicCustomersMonthly = 50;

  const monthlyMarginPerCust = monthlyPrice * grossMarginRate; // $19.50
  const annualMarginPerCust = annualPrice * grossMarginRate; // $187.20

  let currentCash = initialCash;
  let minCash = initialCash;
  let minCashMonth = 0;
  let floorBreached = false;

  // Rastreo de clientes mensuales activos previos y cohortes anuales
  let activeMonthlyCustomers = initialCustomers; // Mes 0
  const annualCohorts = []; // Registrará { month, customers }

  const monthlyBreakdown = [];

  for (let m = 1; m <= 24; m++) {
    const spend = monthlySpends[m - 1] || 0;
    const trials = interpolateAgendoTrials(spend);
    const paidFromAds = trials * trialConversionRate;
    const totalNewPaid = paidFromAds + organicCustomersMonthly;

    // Reparto mensual vs anual de los nuevos clientes
    const newAnnualCust = totalNewPaid * annualPlanShare;
    const newMonthlyCust = totalNewPaid * (1 - annualPlanShare);

    // Vendedoras necesarias: Math.ceil(trials / 500)
    const salesReps = trials > 0 ? Math.ceil(trials / 500) : 0;
    const salesRepCost = salesReps * 1200;
    const commissions = paidFromAds * 20;

    // Actualización de clientes mensuales activos:
    // Activos = (Activos previos * (1 - churn)) + Nuevos mensuales
    activeMonthlyCustomers = (activeMonthlyCustomers * (1 - monthlyChurnRate)) + newMonthlyCust;

    // Registrar nueva cohorte anual si aplica
    if (newAnnualCust > 0) {
      annualCohorts.push({ month: m, customers: newAnnualCust });
    }

    // Calcular ingresos / margen que entra a caja:
    // 1. Clientes mensuales que pagan cada mes
    let totalInflows = activeMonthlyCustomers * monthlyMarginPerCust;

    // 2. Clientes anuales nuevos que pagan adelantado en mes m
    let activeAnnualCustomers = 0;
    if (newAnnualCust > 0) {
      totalInflows += (newAnnualCust * annualMarginPerCust);
    }

    // 3. Clientes anuales que renuevan en mes m (los que entraron hace 12 meses exactos)
    annualCohorts.forEach(ac => {
      const age = m - ac.month + 1;
      if (age >= 1 && age <= 12) {
        activeAnnualCustomers += ac.customers;
      } else if (age === 13) {
        // Renovación al mes 13: 70%
        const renewingCust = ac.customers * annualRenewalRate;
        totalInflows += (renewingCust * annualMarginPerCust);
        activeAnnualCustomers += renewingCust;
      } else if (age > 13 && age <= 24) {
        activeAnnualCustomers += (ac.customers * annualRenewalRate);
      }
    });

    const totalActiveCustomers = activeMonthlyCustomers + activeAnnualCustomers;

    // Salidas del mes
    const totalOutflows = spend + salesRepCost + commissions + fixedCostsMonthly;

    // Flujo neto y caja
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
      spend,
      trials: Math.round(trials),
      salesReps,
      paidFromAds,
      totalNewPaid,
      activeCustomers: Math.round(totalActiveCustomers),
      activeMonthlyCustomers: Math.round(activeMonthlyCustomers),
      activeAnnualCustomers: Math.round(activeAnnualCustomers),
      inflows: totalInflows,
      outflows: totalOutflows,
      netCashFlow,
      endingCash: currentCash,
      floorBreached: currentCash < safetyCashFloor
    });
  }

  return {
    monthlyBreakdown,
    initialCash,
    endingCash: currentCash,
    minCash,
    minCashMonth,
    floorBreached,
    finalActiveCustomers: monthlyBreakdown[23].activeCustomers,
    month1Verification: monthlyBreakdown[0]
  };
}
