// DecisionLab 360 - Motor Financiero Caso A: Tueste (E-commerce DTC)
import { tuesteOriginalData } from '../Data/tuesteData.js';

/**
 * Interpolación lineal para clientes nuevos de Meta según inversión
 */
export function interpolateMetaCustomers(spend, history = tuesteOriginalData.investmentHistory) {
  if (spend <= 0) return 0;
  const sorted = [...history].sort((a, b) => a.spend - b.spend);
  if (spend <= sorted[0].spend) {
    if (sorted[0].spend === 0) return sorted[0].customers;
    return (spend / sorted[0].spend) * sorted[0].customers;
  }
  const maxPoint = sorted[sorted.length - 1];
  if (spend >= maxPoint.spend) {
    // Si excede el punto máximo, mantener el tope conocido del caso
    return maxPoint.customers;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const p1 = sorted[i];
    const p2 = sorted[i + 1];
    if (spend >= p1.spend && spend <= p2.spend) {
      const slope = (p2.customers - p1.customers) / (p2.spend - p1.spend);
      return p1.customers + slope * (spend - p1.spend);
    }
  }
  return 0;
}

/**
 * Calcula el margen de contribución unitario para un pedido suelto
 */
export function calculateSingleOrderContribution({
  bagPrice = 17.0,
  bagsPerOrder = 2,
  coffeeCostPerBag = 5.44,
  shippingCost = 4.50,
  gatewayCommissionRate = 0.045,
  packagingCost = 1.20,
  discountPercent = 0,
  customerPaysShipping = false
}) {
  const baseProductPrice = bagPrice * bagsPerOrder;
  const discountedProductPrice = baseProductPrice * (1 - discountPercent / 100);
  
  // Si el cliente paga el envío, se suma al importe cobrado
  const totalPaidByCustomer = customerPaysShipping 
    ? discountedProductPrice + shippingCost 
    : discountedProductPrice;

  const totalCoffeeCost = coffeeCostPerBag * bagsPerOrder;
  const shippingPaidByTueste = customerPaysShipping ? 0 : shippingCost;
  const gatewayFee = totalPaidByCustomer * gatewayCommissionRate;
  const totalPackagingCost = packagingCost;

  const totalVariableCosts = totalCoffeeCost + shippingPaidByTueste + gatewayFee + totalPackagingCost;
  const contribution = totalPaidByCustomer - totalVariableCosts;
  const marginPercent = totalPaidByCustomer > 0 ? (contribution / totalPaidByCustomer) * 100 : 0;

  return {
    pricePaid: totalPaidByCustomer,
    baseProductPrice,
    coffeeCost: totalCoffeeCost,
    shippingCostTueste: shippingPaidByTueste,
    gatewayFee,
    packagingCost: totalPackagingCost,
    totalVariableCosts,
    contribution,
    marginPercent
  };
}

/**
 * Calcula el margen de contribución de un pedido de suscripción
 */
export function calculateSubscriptionOrderContribution({
  subscriptionPrice = 30.60,
  coffeeCostPerBag = 5.44,
  bagsPerOrder = 2,
  shippingCost = 4.50,
  gatewayCommissionRate = 0.045,
  packagingCost = 1.20,
  customerPaysShipping = false
}) {
  const totalPaidByCustomer = customerPaysShipping 
    ? subscriptionPrice + shippingCost 
    : subscriptionPrice;

  const totalCoffeeCost = coffeeCostPerBag * bagsPerOrder;
  const shippingPaidByTueste = customerPaysShipping ? 0 : shippingCost;
  const gatewayFee = totalPaidByCustomer * gatewayCommissionRate;
  const totalPackagingCost = packagingCost;

  const totalVariableCosts = totalCoffeeCost + shippingPaidByTueste + gatewayFee + totalPackagingCost;
  const contribution = totalPaidByCustomer - totalVariableCosts;
  const marginPercent = totalPaidByCustomer > 0 ? (contribution / totalPaidByCustomer) * 100 : 0;

  return {
    pricePaid: totalPaidByCustomer,
    coffeeCost: totalCoffeeCost,
    shippingCostTueste: shippingPaidByTueste,
    gatewayFee,
    packagingCost: totalPackagingCost,
    totalVariableCosts,
    contribution,
    marginPercent
  };
}

/**
 * Calcula el margen del pack de 3 bolsas a $48
 */
export function calculatePackOrderContribution({
  packPrice = 48.0,
  bags = 3,
  coffeeCostPerBag = 5.44,
  boxCost = 1.40,
  shippingCost = 4.50, // Envío gratis en pedidos >= $45
  gatewayCommissionRate = 0.045
}) {
  const totalPaidByCustomer = packPrice;
  const totalCoffeeCost = coffeeCostPerBag * bags;
  const shippingPaidByTueste = shippingCost;
  const gatewayFee = totalPaidByCustomer * gatewayCommissionRate;
  const totalPackagingCost = boxCost;

  const totalVariableCosts = totalCoffeeCost + shippingPaidByTueste + gatewayFee + totalPackagingCost;
  const contribution = totalPaidByCustomer - totalVariableCosts;
  const marginPercent = totalPaidByCustomer > 0 ? (contribution / totalPaidByCustomer) * 100 : 0;

  return {
    pricePaid: totalPaidByCustomer,
    coffeeCost: totalCoffeeCost,
    shippingCostTueste: shippingPaidByTueste,
    gatewayFee,
    packagingCost: totalPackagingCost,
    totalVariableCosts,
    contribution,
    marginPercent
  };
}

/**
 * Calcula el LTV a 12 meses sobre margen de contribución
 */
export function calculateTuesteLTV({
  singleOrderContribFirst = 15.89,
  singleOrderContribRepeat = 15.89,
  subscriptionContrib = 12.643,
  singleOrderShare = 0.85,
  subscriptionShare = 0.15,
  subscriberMonthlyChurn = 0.09,
  ordersSchedule = tuesteOriginalData.customerBehavior.singleCustomerOrdersSchedule
}) {
  // LTV Cliente Suelto a 12 meses
  // El primer mes compra 1 pedido con singleOrderContribFirst.
  // Los meses 2..12 compran la suma de pedidos restantes con singleOrderContribRepeat.
  const repeatOrders12m = ordersSchedule.slice(1).reduce((acc, val) => acc + val, 0); // 2.0 pedidos
  const singleCustomerLTV = singleOrderContribFirst + (repeatOrders12m * singleOrderContribRepeat);

  // LTV Suscriptor a 12 meses (Suma geométrica con churn del 9%)
  // Mes 1: 1.0 * subContrib, Mes 2: 0.91 * subContrib, Mes 3: 0.91^2 * subContrib...
  let subscriberOrdersCount = 0;
  for (let m = 0; m < 12; m++) {
    subscriberOrdersCount += Math.pow(1 - subscriberMonthlyChurn, m);
  }
  const subscriberLTV = subscriberOrdersCount * subscriptionContrib;

  // LTV Promedio Ponderado
  const blendedLTV = (singleOrderShare * singleCustomerLTV) + (subscriptionShare * subscriberLTV);

  return {
    singleCustomerLTV,
    subscriberLTV,
    subscriberOrdersCount,
    blendedLTV
  };
}

/**
 * Calcula la curva de caja acumulada mes a mes de un cliente (Mes 0 al 12)
 */
export function calculateTuesteCustomerCashCurve({
  cacReal,
  singleOrderContribFirst,
  singleOrderContribRepeat,
  subscriptionContrib,
  singleOrderShare = 0.85,
  subscriptionShare = 0.15,
  subscriberMonthlyChurn = 0.09,
  ordersSchedule = tuesteOriginalData.customerBehavior.singleCustomerOrdersSchedule
}) {
  const curve = [];
  let cumulativeCash = -cacReal; // Mes 0: Desembolso del CAC

  curve.push({
    month: 0,
    monthlyContribution: 0,
    cumulativeCash,
    isPositive: cumulativeCash >= 0
  });

  for (let m = 1; m <= 12; m++) {
    const singleOrdersInMonth = ordersSchedule[m - 1];
    const singleContribInMonth = m === 1 ? singleOrderContribFirst : singleOrderContribRepeat;
    const singleMonthContribution = singleOrdersInMonth * singleContribInMonth;

    const activeSubscriberRate = Math.pow(1 - subscriberMonthlyChurn, m - 1);
    const subMonthContribution = activeSubscriberRate * subscriptionContrib;

    const blendedMonthContribution = (singleOrderShare * singleMonthContribution) + 
                                     (subscriptionShare * subMonthContribution);

    cumulativeCash += blendedMonthContribution;

    curve.push({
      month: m,
      monthlyContribution: blendedMonthContribution,
      cumulativeCash,
      isPositive: cumulativeCash >= 0
    });
  }

  // Payback calculation
  let paybackMonth = null;
  for (let i = 1; i < curve.length; i++) {
    if (curve[i].cumulativeCash >= 0) {
      const prev = curve[i - 1].cumulativeCash;
      const curr = curve[i].cumulativeCash;
      const frac = -prev / (curr - prev);
      paybackMonth = (i - 1) + frac;
      break;
    }
  }

  return { curve, paybackMonth };
}

/**
 * Ejecuta el modelo completo de Tueste (Nivel 1 y 2)
 */
export function runTuesteModel(inputs = {}) {
  const metaSpend = inputs.metaSpend !== undefined ? Number(inputs.metaSpend) : 8000;
  const agencyFee = metaSpend > 0 ? (inputs.agencyFee !== undefined ? Number(inputs.agencyFee) : 1000) : 0;
  const bagPrice = inputs.bagPrice !== undefined ? Number(inputs.bagPrice) : 17.0;
  const coffeeCostPerBag = inputs.coffeeCostPerBag !== undefined ? Number(inputs.coffeeCostPerBag) : 5.44;
  const shippingCost = inputs.shippingCost !== undefined ? Number(inputs.shippingCost) : 4.50;
  const discountPercent = inputs.discountPercent !== undefined ? Number(inputs.discountPercent) : 0;
  const customerPaysShipping = inputs.customerPaysShipping || false;
  const singleOrderShare = inputs.singleOrderShare !== undefined ? Number(inputs.singleOrderShare) : 0.85;
  const subscriptionShare = 1 - singleOrderShare;
  const subscriberMonthlyChurn = inputs.subscriberMonthlyChurn !== undefined ? Number(inputs.subscriberMonthlyChurn) : 0.09;
  const subscriptionPrice = inputs.subscriptionPrice !== undefined ? Number(inputs.subscriptionPrice) : 30.60;
  const packActive = inputs.packActive || false;

  // 1. Margen de contribución de pedido suelto regular y con posible descuento
  const regularSingleOrder = calculateSingleOrderContribution({
    bagPrice,
    coffeeCostPerBag,
    shippingCost,
    customerPaysShipping,
    discountPercent: 0
  });

  const firstSingleOrder = calculateSingleOrderContribution({
    bagPrice,
    coffeeCostPerBag,
    shippingCost,
    customerPaysShipping,
    discountPercent
  });

  // 2. Margen de contribución de suscripción
  const subscriptionOrder = calculateSubscriptionOrderContribution({
    subscriptionPrice,
    coffeeCostPerBag,
    shippingCost,
    customerPaysShipping
  });

  // 3. Pack si está activo
  const packOrder = calculatePackOrderContribution({
    coffeeCostPerBag,
    shippingCost
  });

  // ROAS de Break-even (1 / Margen %)
  const roasBreakEvenSingle = regularSingleOrder.marginPercent > 0 ? 100 / regularSingleOrder.marginPercent : 0;
  const roasBreakEvenFirstOrder = firstSingleOrder.marginPercent > 0 ? 100 / firstSingleOrder.marginPercent : 0;
  const roasBreakEvenSub = subscriptionOrder.marginPercent > 0 ? 100 / subscriptionOrder.marginPercent : 0;

  // 4. Clientes nuevos de Meta según inversión
  const metaNewCustomers = interpolateMetaCustomers(metaSpend);
  const otherNewCustomers = inputs.otherNewCustomers !== undefined ? Number(inputs.otherNewCustomers) : 47;
  const totalNewCustomers = metaNewCustomers + otherNewCustomers;

  // 5. CAC publicitario y CAC Real
  const cacAds = metaNewCustomers > 0 ? metaSpend / metaNewCustomers : 0;
  const cacReal = metaNewCustomers > 0 ? (metaSpend + agencyFee) / metaNewCustomers : 0;

  // 6. ROAS Real del primer pedido
  // Supuesto permitido #1: $34 para todos o valor del primer pedido aplicado
  const firstOrderAverageTicket = firstSingleOrder.pricePaid;
  const metaRevenueFirstOrder = metaNewCustomers * firstOrderAverageTicket;
  const roasRealFirstOrder = metaSpend > 0 ? metaRevenueFirstOrder / metaSpend : 0;

  // 7. LTV a 12 meses
  const ltvResults = calculateTuesteLTV({
    singleOrderContribFirst: firstSingleOrder.contribution,
    singleOrderContribRepeat: regularSingleOrder.contribution,
    subscriptionContrib: subscriptionOrder.contribution,
    singleOrderShare,
    subscriptionShare,
    subscriberMonthlyChurn
  });

  // 8. LTV:CAC
  const ltvToCac = cacReal > 0 ? ltvResults.blendedLTV / cacReal : 0;

  // 9. Curva de caja y Payback
  const { curve: customerCashCurve, paybackMonth } = calculateTuesteCustomerCashCurve({
    cacReal,
    singleOrderContribFirst: firstSingleOrder.contribution,
    singleOrderContribRepeat: regularSingleOrder.contribution,
    subscriptionContrib: subscriptionOrder.contribution,
    singleOrderShare,
    subscriptionShare,
    subscriberMonthlyChurn
  });

  // 10. CAC Marginal del tramo actual
  // Buscamos el tramo en investmentHistory
  let marginalCAC = 0;
  const history = tuesteOriginalData.investmentHistory;
  for (let i = 0; i < history.length - 1; i++) {
    if (metaSpend > history[i].spend && metaSpend <= history[i + 1].spend) {
      marginalCAC = (history[i + 1].spend - history[i].spend) / (history[i + 1].customers - history[i].customers);
      break;
    }
  }
  if (!marginalCAC && metaSpend > 0) {
    marginalCAC = (history[1].spend - history[0].spend) / (history[1].customers - history[0].customers);
  }

  // Semáforo LTV:CAC
  let ltvToCacStatus = 'red';
  if (ltvToCac >= 3.0) ltvToCacStatus = 'green';
  else if (ltvToCac >= 1.0) ltvToCacStatus = 'yellow';

  return {
    metaSpend,
    agencyFee,
    metaNewCustomers,
    otherNewCustomers,
    totalNewCustomers,
    regularSingleOrder,
    firstSingleOrder,
    subscriptionOrder,
    packOrder,
    roasBreakEvenSingle,
    roasBreakEvenFirstOrder,
    roasBreakEvenSub,
    cacAds,
    cacReal,
    roasRealFirstOrder,
    metaReportedROAS: 3.0,
    ltvResults,
    ltvToCac,
    ltvToCacStatus,
    paybackMonth,
    customerCashCurve,
    marginalCAC
  };
}

/**
 * Simulador de Caja de 24 Meses (Nivel 3)
 */
export function simulateTueste24Months(plan = {}) {
  // Plan puede contener un gasto mensual fijo o un arreglo de 24 meses
  const monthlySpends = Array.isArray(plan.monthlySpends) 
    ? plan.monthlySpends 
    : Array(24).fill(plan.fixedMetaSpend !== undefined ? plan.fixedMetaSpend : 8000);

  const buySecondRoaster = plan.buySecondRoaster || false;
  const roasterPurchaseMonth = plan.roasterPurchaseMonth || 3; // mes en que se compra la tostadora
  const secondRoasterCost = 14000;
  const fixedCostsMonthly = 6500;
  const initialCash = 35000;
  const safetyCashFloor = 5000;
  const initialExistingContribution = 9000;
  const existingDecayRate = 0.03;
  const nonMetaCustomersMonthly = 47;
  const singleOrderShare = plan.singleOrderShare !== undefined ? plan.singleOrderShare : 0.85;
  const subscriptionShare = 1 - singleOrderShare;
  const subscriberChurnRate = plan.subscriberChurnRate !== undefined ? plan.subscriberChurnRate : 0.09;
  const customerPaysShipping = plan.customerPaysShipping || false;
  const discountMonth1Only = plan.discountMonth1Only || false;

  // Calculamos márgenes unitarios
  const regularOrder = calculateSingleOrderContribution({ customerPaysShipping });
  const discountedOrder = calculateSingleOrderContribution({ customerPaysShipping, discountPercent: 30 });
  const subOrder = calculateSubscriptionOrderContribution({ customerPaysShipping });

  const singleContribRepeat = regularOrder.contribution;
  const subContrib = subOrder.contribution;

  const ordersSchedule = tuesteOriginalData.customerBehavior.singleCustomerOrdersSchedule;

  const cohorts = []; // Registrará { arrivalMonth, totalCustomers }
  const monthlyBreakdown = [];
  let currentCash = initialCash;
  let minCash = initialCash;
  let minCashMonth = 0;
  let floorBreached = false;

  for (let m = 1; m <= 24; m++) {
    const metaSpend = monthlySpends[m - 1] || 0;
    const agencyFee = metaSpend > 0 ? 1000 : 0;
    const newMetaCust = interpolateMetaCustomers(metaSpend);
    const totalNewCust = newMetaCust + nonMetaCustomersMonthly;

    // Registrar nueva cohorte
    cohorts.push({
      arrivalMonth: m,
      customers: totalNewCust
    });

    // 1. Contribución de clientes existentes previos (base $9,000 decayendo 3% mensual)
    const existingContribution = initialExistingContribution * Math.pow(1 - existingDecayRate, m - 1);

    // 2. Contribución de todas las cohortes nuevas activas
    let newCohortsContribution = 0;
    let activeSubscribersInMonth = 0;

    cohorts.forEach((cohort) => {
      const age = m - cohort.arrivalMonth + 1; // 1 en el mes de llegada
      if (age >= 1) {
        // Parte pedidos sueltos
        let singleOrdersPerCustomer = 0;
        if (age <= 12) {
          singleOrdersPerCustomer = ordersSchedule[age - 1];
        } else {
          singleOrdersPerCustomer = 0.10; // Meses 13 al 24
        }

        const isFirstOrder = age === 1;
        const singleContrib = (isFirstOrder && discountMonth1Only) 
          ? discountedOrder.contribution 
          : singleContribRepeat;

        const singleRevenueContrib = cohort.customers * singleOrderShare * singleOrdersPerCustomer * singleContrib;

        // Parte suscriptores
        const activeSubShare = Math.pow(1 - subscriberChurnRate, age - 1);
        const subRevenueContrib = cohort.customers * subscriptionShare * activeSubShare * subContrib;

        newCohortsContribution += (singleRevenueContrib + subRevenueContrib);
        activeSubscribersInMonth += (cohort.customers * subscriptionShare * activeSubShare);
      }
    });

    const totalContribution = existingContribution + newCohortsContribution;

    // Salidas del mes
    let roasterCost = 0;
    if (buySecondRoaster && m === roasterPurchaseMonth) {
      roasterCost = secondRoasterCost;
    }

    const totalOutflows = metaSpend + agencyFee + fixedCostsMonthly + roasterCost;

    // Flujo neto y saldo de caja
    const netCashFlow = totalContribution - totalOutflows;
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
      agencyFee,
      fixedCosts: fixedCostsMonthly,
      roasterCost,
      newCustomers: totalNewCust,
      newMetaCust,
      activeSubscribers: Math.round(activeSubscribersInMonth),
      existingContribution,
      newCohortsContribution,
      totalContribution,
      totalOutflows,
      netCashFlow,
      endingCash: currentCash,
      floorBreached: currentCash < safetyCashFloor
    });
  }

  // Regla del juego: Del mes 13 al 24, inversión mensual no puede ser menor al promedio de meses 1..12
  const avgSpendM1to12 = monthlySpends.slice(0, 12).reduce((a, b) => a + b, 0) / 12;
  let ruleSpendBreached = false;
  for (let m = 12; m < 24; m++) {
    if ((monthlySpends[m] || 0) < avgSpendM1to12 - 0.01) {
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
    avgSpendM1to12,
    finalActiveSubscribers: monthlyBreakdown[23].activeSubscribers,
    month1Verification: monthlyBreakdown[0]
  };
}
