// DecisionLab 360 - Simulation Service
import { simulateTueste24Months } from '../Engines/tuesteEngine.js';
import { simulateAgendo24Months } from '../Engines/agendoEngine.js';
import { simulateSolDeCasa24Months } from '../Engines/solDeCasaEngine.js';

export const simulationService = {
  // Comparador de 4 planes para Tueste
  getTuestePlansComparison: () => {
    // Plan 1: Actual $8,000 fijos
    const planActual = simulateTueste24Months({
      fixedMetaSpend: 8000,
      customerPaysShipping: false,
      buySecondRoaster: false
    });

    // Plan 2: Agencia $16,000 fijos con 30% descuento en 1er pedido
    const planAgencia = simulateTueste24Months({
      fixedMetaSpend: 16000,
      customerPaysShipping: false,
      discountMonth1Only: true,
      buySecondRoaster: false
    });

    // Plan 3: Crecimiento controlado y Pack de 3 bolsas (Cliente paga envío en 2 bolsas)
    const spendsPlan3 = [
      ...Array(6).fill(8000),
      ...Array(6).fill(10000),
      ...Array(12).fill(10000)
    ];
    const planCrecimiento = simulateTueste24Months({
      monthlySpends: spendsPlan3,
      customerPaysShipping: true,
      singleOrderShare: 0.80, // 20% suscriptores gracias al pack
      buySecondRoaster: false
    });

    // Plan 4: Inversión en Tostadora ($14,000 en mes 12) con Pack y envío
    const spendsPlan4 = [
      ...Array(6).fill(8000),
      ...Array(6).fill(12000),
      ...Array(12).fill(12000)
    ];
    const planTostadora = simulateTueste24Months({
      monthlySpends: spendsPlan4,
      customerPaysShipping: true,
      singleOrderShare: 0.80,
      buySecondRoaster: true,
      roasterPurchaseMonth: 12
    });

    const plans = [
      { id: 'actual', name: '1. Plan Actual ($8k fijos)', results: planActual, badge: 'Baseline' },
      { id: 'agencia', name: '2. Propuesta Agencia ($16k + 30% desc)', results: planAgencia, badge: 'Alto Riesgo' },
      { id: 'crecimiento', name: '3. Propio A: Pack + Envío Cobrado', results: planCrecimiento, badge: 'Recomendado' },
      { id: 'tostadora', name: '4. Propio B: Expansión + Tostadora M12', results: planTostadora, badge: 'Crecimiento' }
    ];

    // Determinar ganador: Mayor caja final sin romper piso ($5,000) ni regla de inversión M13.
    // Desempate: Más suscriptores activos.
    const eligible = plans.filter(p => !p.results.floorBreached && !p.results.ruleSpendBreached);
    eligible.sort((a, b) => {
      const cashDiff = b.results.endingCash - a.results.endingCash;
      if (Math.abs(cashDiff) > 1) return cashDiff;
      return b.results.finalActiveSubscribers - a.results.finalActiveSubscribers;
    });

    const winnerId = eligible.length > 0 ? eligible[0].id : null;

    return { plans, winnerId };
  },

  // Comparador de 4 planes para Agendo
  getAgendoPlansComparison: () => {
    // Plan 1: Actual $10,000 fijos (100% mensual)
    const planActual = simulateAgendo24Months({
      fixedAdSpend: 10000,
      annualPlanShare: 0.0,
      trialConversionRate: 14.0,
      monthlyPrice: 25.0
    });

    // Plan 2: Valeria $30,000 fijos
    const planValeria = simulateAgendo24Months({
      fixedAdSpend: 30000,
      annualPlanShare: 0.0,
      trialConversionRate: 14.0,
      monthlyPrice: 25.0
    });

    // Plan 3: Propio A (Inversión $12k + 15% Plan Anual + Conversión 15%)
    const planPropioA = simulateAgendo24Months({
      fixedAdSpend: 12000,
      annualPlanShare: 0.15,
      trialConversionRate: 15.0,
      monthlyPrice: 25.0,
      monthlyChurnPercent: 5.5
    });

    // Plan 4: Propio B (Escala Progresiva $10k M1-9, $15k M10-24 + Precio $29 + 20% Anual)
    const spendsPlan4 = [
      ...Array(9).fill(10000),
      ...Array(15).fill(15000)
    ];
    const planPropioB = simulateAgendo24Months({
      monthlySpends: spendsPlan4,
      annualPlanShare: 0.20,
      trialConversionRate: 16.0,
      monthlyPrice: 29.0,
      monthlyChurnPercent: 5.0
    });

    const plans = [
      { id: 'actual', name: '1. Plan Actual ($10k fijos)', results: planActual, badge: 'Sostenible' },
      { id: 'valeria', name: '2. Propuesta Valeria ($30k fijos)', results: planValeria, badge: 'Quiebra Inminente' },
      { id: 'propioA', name: '3. Propio A: Mix Anual + Conversión', results: planPropioA, badge: 'Equilibrado' },
      { id: 'propioB', name: '4. Propio B: Precio $29 + Escala $15k', results: planPropioB, badge: 'Ganador' }
    ];

    // Regla de victoria: Mayor número de clientes activos en Mes 24 sin bajar de $10,000 en caja.
    // Desempate: Más caja al final.
    const eligible = plans.filter(p => !p.results.floorBreached);
    eligible.sort((a, b) => {
      const custDiff = b.results.finalActiveCustomers - a.results.finalActiveCustomers;
      if (Math.abs(custDiff) > 1) return custDiff;
      return b.results.endingCash - a.results.endingCash;
    });

    const winnerId = eligible.length > 0 ? eligible[0].id : null;

    return { plans, winnerId };
  },

  // Comparador de 4 planes para Sol de Casa
  getSolDeCasaPlansComparison: () => {
    // Plan 1: Actual ($4k Meta / $4k Google, 0 técnicos extra)
    const planActual = simulateSolDeCasa24Months({
      fixedMetaSpend: 4000,
      fixedGoogleSpend: 4000,
      extraTechHires: [],
      fastResponseActive: false
    });

    // Plan 2: Leadly ($8k Meta / $0 Google, 0 técnicos extra)
    const planLeadly = simulateSolDeCasa24Months({
      fixedMetaSpend: 8000,
      fixedGoogleSpend: 0,
      extraTechHires: [],
      fastResponseActive: false
    });

    // Plan 3: Propio A ($4k Meta + $4k Google, Filtro activo M1, Contratar 1 Técnico en Mes 2)
    const planPropioA = simulateSolDeCasa24Months({
      fixedMetaSpend: 4000,
      fixedGoogleSpend: 4000,
      extraTechHires: [2], // Contratar en M2 (operativo en M3)
      fastResponseActive: true,
      startFastResponseMonth: 1
    });

    // Plan 4: Propio B (Escala $6k Meta + $6k Google M1-18, $7k+$7k M19-24, Contratar 2 Técnicos M2 y M7)
    const metaSpendsPlan4 = [...Array(18).fill(5000), ...Array(6).fill(6000)];
    const googleSpendsPlan4 = [...Array(18).fill(5000), ...Array(6).fill(6000)];
    const planPropioB = simulateSolDeCasa24Months({
      metaSpends: metaSpendsPlan4,
      googleSpends: googleSpendsPlan4,
      extraTechHires: [2, 7], // 2 técnicos
      fastResponseActive: true,
      startFastResponseMonth: 1
    });

    const plans = [
      { id: 'actual', name: '1. Plan Actual ($4k Meta / $4k Google)', results: planActual, badge: 'Cuello de Botella' },
      { id: 'leadly', name: '2. Propuesta Leadly ($8k Meta / $0 Google)', results: planLeadly, badge: 'Destructor de Valor' },
      { id: 'propioA', name: '3. Propio A: Filtro + 1 Técnico (M2)', results: planPropioA, badge: 'Ganador Recomendado' },
      { id: 'propioB', name: '4. Propio B: Expansión $12k + 2 Técnicos', results: planPropioB, badge: 'Máxima Escala' }
    ];

    // Regla de victoria: Mayor caja al mes 24 sin romper el piso de $5,000 ni la regla de inversión desde el mes 19.
    // Desempate: Más instalaciones totales.
    const eligible = plans.filter(p => !p.results.floorBreached && !p.results.ruleSpendBreached);
    eligible.sort((a, b) => {
      const cashDiff = b.results.endingCash - a.results.endingCash;
      if (Math.abs(cashDiff) > 1) return cashDiff;
      return b.results.totalSalesOver24Months - a.results.totalSalesOver24Months;
    });

    const winnerId = eligible.length > 0 ? eligible[0].id : null;

    return { plans, winnerId };
  }
};
