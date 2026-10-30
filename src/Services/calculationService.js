// DecisionLab 360 - Calculation Service
import { runTuesteModel, simulateTueste24Months } from '../Engines/tuesteEngine.js';
import { runAgendoModel, simulateAgendo24Months } from '../Engines/agendoEngine.js';
import { runSolDeCasaModel, simulateSolDeCasa24Months } from '../Engines/solDeCasaEngine.js';

import { tuesteOriginalData } from '../Data/tuesteData.js';
import { agendoOriginalData } from '../Data/agendoData.js';
import { solDeCasaOriginalData } from '../Data/solDeCasaData.js';

// Formatters
export const formatCurrency = (val, decimals = 2) => {
  if (val === undefined || val === null || isNaN(val)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(val);
};

export const formatPercent = (val, decimals = 1) => {
  if (val === undefined || val === null || isNaN(val)) return '0.0%';
  return `${Number(val).toFixed(decimals)}%`;
};

export const formatNumber = (val, decimals = 0) => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(val);
};

export const formatRatio = (val, decimals = 2) => {
  if (val === undefined || val === null || isNaN(val)) return '0.00x';
  return `${Number(val).toFixed(decimals)}x`;
};

/**
 * Obtiene los modelos calculados de los 3 casos
 */
export const getAllModels = (customInputs = {}) => {
  return {
    tueste: runTuesteModel(customInputs.tueste || {}),
    agendo: runAgendoModel(customInputs.agendo || {}),
    solDeCasa: runSolDeCasaModel(customInputs.solDeCasa || {})
  };
};

export {
  runTuesteModel,
  simulateTueste24Months,
  runAgendoModel,
  simulateAgendo24Months,
  runSolDeCasaModel,
  simulateSolDeCasa24Months,
  tuesteOriginalData,
  agendoOriginalData,
  solDeCasaOriginalData
};
