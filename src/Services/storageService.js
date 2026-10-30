// DecisionLab 360 - Storage Service (LocalStorage persistence)

const STORAGE_KEYS = {
  TUESTE_ASSUMPTIONS: 'decisionlab_tueste_assumptions',
  AGENDO_ASSUMPTIONS: 'decisionlab_agendo_assumptions',
  SOL_ASSUMPTIONS: 'decisionlab_sol_assumptions',
  CUSTOM_SCENARIOS: 'decisionlab_custom_scenarios',
  SAVED_SIMULATION_PLANS: 'decisionlab_saved_simulation_plans'
};

export const storageService = {
  // Cargar supuestos guardados
  getTuesteAssumptions: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TUESTE_ASSUMPTIONS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveTuesteAssumptions: (assumptions) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TUESTE_ASSUMPTIONS, JSON.stringify(assumptions));
    } catch (e) {
      console.error('Error saving Tueste assumptions:', e);
    }
  },

  getAgendoAssumptions: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AGENDO_ASSUMPTIONS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveAgendoAssumptions: (assumptions) => {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENDO_ASSUMPTIONS, JSON.stringify(assumptions));
    } catch (e) {
      console.error('Error saving Agendo assumptions:', e);
    }
  },

  getSolAssumptions: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SOL_ASSUMPTIONS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveSolAssumptions: (assumptions) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOL_ASSUMPTIONS, JSON.stringify(assumptions));
    } catch (e) {
      console.error('Error saving Sol de Casa assumptions:', e);
    }
  },

  // Reset a valores originales
  resetCaseAssumptions: (caseKey) => {
    try {
      if (caseKey === 'tueste') localStorage.removeItem(STORAGE_KEYS.TUESTE_ASSUMPTIONS);
      if (caseKey === 'agendo') localStorage.removeItem(STORAGE_KEYS.AGENDO_ASSUMPTIONS);
      if (caseKey === 'solDeCasa') localStorage.removeItem(STORAGE_KEYS.SOL_ASSUMPTIONS);
    } catch (e) {
      console.error('Error resetting assumptions:', e);
    }
  },

  resetAllAssumptions: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TUESTE_ASSUMPTIONS);
      localStorage.removeItem(STORAGE_KEYS.AGENDO_ASSUMPTIONS);
      localStorage.removeItem(STORAGE_KEYS.SOL_ASSUMPTIONS);
    } catch (e) {
      console.error('Error resetting all assumptions:', e);
    }
  },

  // Escenarios personalizados
  getCustomScenarios: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_SCENARIOS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCustomScenario: (scenario) => {
    try {
      const current = storageService.getCustomScenarios();
      const updated = [scenario, ...current.filter(s => s.id !== scenario.id)];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SCENARIOS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving scenario:', e);
      return [];
    }
  },

  deleteCustomScenario: (id) => {
    try {
      const current = storageService.getCustomScenarios();
      const updated = current.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SCENARIOS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error deleting scenario:', e);
      return [];
    }
  }
};
