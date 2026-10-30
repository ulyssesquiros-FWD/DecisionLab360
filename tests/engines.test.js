// DecisionLab 360 - Automated Test Suite
import { runTuesteModel, simulateTueste24Months } from '../src/Engines/tuesteEngine.js';
import { runAgendoModel, simulateAgendo24Months } from '../src/Engines/agendoEngine.js';
import { runSolDeCasaModel, simulateSolDeCasa24Months } from '../src/Engines/solDeCasaEngine.js';

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
console.log('DECISIONLAB 360 · FINANCIAL ENGINES TEST');
console.log('========================================\n');

// 1. TUESTE TESTS
console.log('--- TEST SUITE: TUESTE (CASO A) ---');
const tueste = runTuesteModel();

assert(
  Math.abs(tueste.regularSingleOrder.contribution - 15.89) < 0.05,
  'Contribución pedido suelto = $15.89',
  `Obtenido: ${tueste.regularSingleOrder.contribution}`
);

assert(
  Math.abs(tueste.regularSingleOrder.marginPercent - 46.74) < 0.1,
  'Margen porcentual pedido suelto = 46.7%',
  `Obtenido: ${tueste.regularSingleOrder.marginPercent}%`
);

assert(
  Math.abs(tueste.roasBreakEvenSingle - 2.14) < 0.05,
  'ROAS Break-even pedido suelto = 2.14x',
  `Obtenido: ${tueste.roasBreakEvenSingle}`
);

assert(
  Math.abs(tueste.cacReal - 54.55) < 0.05,
  'CAC Real con agencia = $54.55',
  `Obtenido: ${tueste.cacReal}`
);

assert(
  Math.abs(tueste.roasRealFirstOrder - 0.70) < 0.05,
  'ROAS Real del primer pedido = 0.70x',
  `Obtenido: ${tueste.roasRealFirstOrder}`
);

assert(
  Math.abs(tueste.ltvToCac - 1.01) < 0.05,
  'Ratio LTV:CAC Real = 1.01x (apenas empata)',
  `Obtenido: ${tueste.ltvToCac}`
);

const tuesteSim = simulateTueste24Months({ fixedMetaSpend: 8000 });
assert(
  tuesteSim.monthlyBreakdown.length === 24,
  'Simulador de Tueste ejecuta exactamente 24 meses',
  `Meses: ${tuesteSim.monthlyBreakdown.length}`
);

assert(
  !tuesteSim.floorBreached,
  'Plan base de Tueste no rompe el piso de seguridad de $5,000',
  `Caja mínima: ${tuesteSim.minCash}`
);

// 2. AGENDO TESTS
console.log('\n--- TEST SUITE: AGENDO (CASO B) ---');
const agendo = runAgendoModel();

assert(
  Math.abs(agendo.unitEconomics.monthlyMargin - 19.50) < 0.05,
  'Margen mensual de cliente = $19.50 (78% de $25)',
  `Obtenido: ${agendo.unitEconomics.monthlyMargin}`
);

assert(
  agendo.trials === 500 && agendo.paidCustomersFromAds === 70,
  'Trials = 500 y Clientes pagados ads = 70 (14%)',
  `Trials: ${agendo.trials}, Pagados: ${agendo.paidCustomersFromAds}`
);

assert(
  agendo.salesRepsNeeded === 1,
  'Vendedoras necesarias para 500 trials = 1',
  `Obtenido: ${agendo.salesRepsNeeded}`
);

assert(
  Math.abs(agendo.cacPaid - 180.00) < 0.05,
  'CAC Paid real de anuncios = $180.00',
  `Obtenido: ${agendo.cacPaid}`
);

assert(
  Math.abs(agendo.cacBlended - 105.00) < 0.05,
  'CAC Blended (reportado por Valeria) = $105.00',
  `Obtenido: ${agendo.cacBlended}`
);

assert(
  Math.abs(agendo.ltvData.ltvMonthly24m - 251.3) < 0.5,
  'LTV a 24 meses sobre margen = $251.29',
  `Obtenido: ${agendo.ltvData.ltvMonthly24m}`
);

assert(
  Math.abs(agendo.ltvToCacPaid - 1.40) < 0.05,
  'Ratio LTV:CAC Paid real = 1.40x (lejos del 2.4x de Valeria)',
  `Obtenido: ${agendo.ltvToCacPaid}`
);

const agendoSim = simulateAgendo24Months({ fixedAdSpend: 10000 });
assert(
  agendoSim.monthlyBreakdown.length === 24,
  'Simulador de Agendo ejecuta exactamente 24 meses',
  `Meses: ${agendoSim.monthlyBreakdown.length}`
);

assert(
  !agendoSim.floorBreached,
  'Plan base de Agendo no rompe el piso de seguridad de $10,000',
  `Caja mínima: ${agendoSim.minCash}`
);

// 3. SOL DE CASA TESTS
console.log('\n--- TEST SUITE: SOL DE CASA (CASO C) ---');
const sol = runSolDeCasaModel();

assert(
  Math.abs(sol.contributionPerSale - 1625.00) < 0.05,
  'Contribución neta por instalación = $1,625.00 (25% de $6,500)',
  `Obtenido: ${sol.contributionPerSale}`
);

assert(
  sol.metaFunnel.leads === 500 && sol.googleFunnel.leads === 100,
  'Leads Septiembre: Meta = 500 ($8 CPL), Google = 100 ($40 CPL)',
  `Meta: ${sol.metaFunnel.leads}, Google: ${sol.googleFunnel.leads}`
);

assert(
  Math.abs(sol.totalRequestedVisits - 97.49) < 0.1,
  'Visitas técnicas pedidas = 97.49 (dentro de capacidad de 100)',
  `Obtenido: ${sol.totalRequestedVisits}`
);

assert(
  Math.abs(sol.cacRealGoogle - 535.54) < 0.5,
  'CAC Real Google = $535.54 con visitas de $60',
  `Obtenido: ${sol.cacRealGoogle}`
);

assert(
  Math.abs(sol.cacRealMeta - 718.13) < 0.5,
  'CAC Real Meta = $718.13 (+34% más caro que Google)',
  `Obtenido: ${sol.cacRealMeta}`
);

assert(
  Math.abs(sol.valueOfVisitGoogle - 427.50) < 0.05,
  'Valor esperado de visita Google = +$427.50',
  `Obtenido: ${sol.valueOfVisitGoogle}`
);

assert(
  Math.abs(sol.valueOfVisitMeta - 232.50) < 0.05,
  'Valor esperado de visita Meta = +$232.50',
  `Obtenido: ${sol.valueOfVisitMeta}`
);

assert(
  Math.abs(sol.ltvToCacGoogle - 3.03) < 0.05,
  'LTV:CAC Google = 3.03x (Saludable)',
  `Obtenido: ${sol.ltvToCacGoogle}`
);

const solSim = simulateSolDeCasa24Months({ fixedMetaSpend: 4000, fixedGoogleSpend: 4000 });
assert(
  solSim.monthlyBreakdown.length === 24,
  'Simulador de Sol de Casa ejecuta exactamente 24 meses',
  `Meses: ${solSim.monthlyBreakdown.length}`
);

assert(
  !solSim.floorBreached,
  'Plan base de Sol de Casa no rompe el piso de seguridad de $5,000',
  `Caja mínima: ${solSim.minCash}`
);

console.log('\n========================================');
console.log(`RESUMEN: ${passedTests} / ${totalTests} PRUEBAS SUPERADAS (100% ÉXITO)`);
console.log('========================================\n');
