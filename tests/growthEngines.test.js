// DecisionLab 360 - Automated Growth Test Suite (Sesión 2)
import {
  evaluateTuesteRewards,
  calculateTuesteFunnelMetrics,
  evaluateAgendoQuickStart,
  calculateSolarSavings,
  evaluateSolDeCasaRewards,
  calculateSolDeCasaCapacity
} from '../src/Engines/growthEngines.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    console.error(`  ✗ [FAIL] ${testName} - ${details}`);
    process.exitCode = 1;
  }
}

console.log('\n========================================');
console.log('DECISIONLAB 360 · GROWTH ENGINES TEST (V2)');
console.log('========================================\n');

// 1. TUESTE REWARDS TESTS
console.log('--- TEST SUITE: TUESTE REWARDS (CASO A) ---');
const tuesteEval = evaluateTuesteRewards();

assert(
  tuesteEval.metaCAC === 50.0,
  'CAC Real de Meta = $50.00',
  `Obtenido: $${tuesteEval.metaCAC}`
);

assert(
  tuesteEval.maxAllowedCAC === 25.0,
  'Regla de Diego: Límite máximo por referido = $25.00',
  `Obtenido: $${tuesteEval.maxAllowedCAC}`
);

assert(
  tuesteEval.compliesOverall === true,
  'Premios por defecto de Tueste respetan el límite de $25.00',
  `Promedio obtenido: $${tuesteEval.avgReferralCAC}`
);

// Verificar rechazo si una recompensa viola la regla de $25
const invalidTiers = [
  {
    id: 'tier_illegal',
    level: 'Nivel Ilegal',
    requirementCount: 1,
    requirementType: 'compra',
    friendRewardCost: 20.0,
    referrerRewardCost: 10.0, // Total = $30 > $25
    active: true
  }
];
const illegalEval = evaluateTuesteRewards({ tiers: invalidTiers });
assert(
  illegalEval.compliesOverall === false && illegalEval.tierEvaluations[0].complies === false,
  'Validador bloquea correctamente recompensas > $25 por referido',
  `Costo detectado: $${illegalEval.tierEvaluations[0].costPerReferral}`
);

const tuesteFunnel = calculateTuesteFunnelMetrics();
assert(
  tuesteFunnel.criticalBottleneck.dropRate > 65,
  'Identificación correcta del mayor cuello de botella en Tueste (>65% drop)',
  `Drop rate: ${tuesteFunnel.criticalBottleneck.dropRate}%`
);

// 2. AGENDO QUICKSTART TESTS
console.log('\n--- TEST SUITE: AGENDO QUICKSTART (CASO B) ---');
const agendoEval = evaluateAgendoQuickStart();

assert(
  agendoEval.effectivePaidConversionRate > 13.0,
  'Conversión global a pago de Agendo concuerda con la economía real (~13.88% baseline)',
  `Obtenido: ${agendoEval.effectivePaidConversionRate.toFixed(2)}%`
);

assert(
  agendoEval.segments.length === 4,
  'Embudo disyuntivo de Agendo contempla exactamente los 4 segmentos de clientes sin doble conteo',
  `Segmentos: ${agendoEval.segments.length}`
);

assert(
  agendoEval.cacPaidReal > 0 && agendoEval.cacPaidReal < 200,
  'Cálculo de CAC Paid real coherente con la inversión comercial',
  `CAC Paid: $${agendoEval.cacPaidReal.toFixed(2)}`
);

// 3. SOL DE CASA COMUNIDAD SOLAR TESTS
console.log('\n--- TEST SUITE: SOL DE CASA COMUNIDAD SOLAR (CASO C) ---');
const savingsCalc = calculateSolarSavings(110, 70, 6500);

assert(
  Math.abs(savingsCalc.monthlySavings - 77.0) < 0.01,
  'Ahorro mensual para factura de $110 al 70% = $77.00',
  `Obtenido: $${savingsCalc.monthlySavings}`
);

assert(
  Math.abs(savingsCalc.annualSavings - 924.0) < 0.01,
  'Ahorro anual estimado = $924.00',
  `Obtenido: $${savingsCalc.annualSavings}`
);

assert(
  Math.abs(savingsCalc.paybackYears - 7.0) < 0.1,
  'Tiempo de recuperación estimado = ~7.0 años ($6,500 / $924)',
  `Obtenido: ${savingsCalc.paybackYears} años`
);

const solRewardsEval = evaluateSolDeCasaRewards();

assert(
  Math.abs(solRewardsEval.expectedVisitCostPerSale - 133.33) < 0.1,
  'Costo esperado de visitas técnicas por venta cerrada = $133.33 (2.22 visitas x $60)',
  `Obtenido: $${solRewardsEval.expectedVisitCostPerSale.toFixed(2)}`
);

assert(
  Math.abs(solRewardsEval.maxRewardBudgetPerSale - 166.67) < 0.1,
  'Presupuesto máximo para premios por venta = $166.67 ($300 - $133.33)',
  `Obtenido: $${solRewardsEval.maxRewardBudgetPerSale.toFixed(2)}`
);

assert(
  solRewardsEval.compliesWithMax300 === true,
  'Plan de recompensas por defecto respeta la regla de Andrés de ≤ $300 total',
  `CAC esperado total: $${solRewardsEval.totalExpectedCAC.toFixed(2)}`
);

const capacityModel = calculateSolDeCasaCapacity({ extraTechnicians: 1 });
assert(
  capacityModel.leadsNeededFor50Visits >= 68 && capacityModel.leadsNeededFor50Visits <= 70,
  'Leads referidos necesarios para saturar 50 visitas extra = ~69 leads',
  `Obtenido: ${capacityModel.leadsNeededFor50Visits}`
);

assert(
  capacityModel.familiesNeededFor50Visits >= 450,
  'Familias necesarias con tracción de letrero (0.15 leads/mes) = ~459 familias',
  `Obtenido: ${capacityModel.familiesNeededFor50Visits}`
);

console.log('\n========================================');
console.log(`RESUMEN: ${passedTests} / ${totalTests} PRUEBAS GROWTH SUPERADAS`);
console.log('========================================\n');

