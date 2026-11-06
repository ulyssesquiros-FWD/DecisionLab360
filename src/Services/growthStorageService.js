// DecisionLab 360 - Growth Storage Service
// Persistencia LocalStorage para datos de demostración de la Sesión 2
// Permite reinicio modular independiente para cada uno de los tres negocios.

const GROWTH_STORAGE_KEYS = {
  TUESTE_STATE: 'decisionlab_growth_tueste_v2',
  AGENDO_STATE: 'decisionlab_growth_agendo_v2',
  SOL_STATE: 'decisionlab_growth_sol_v2',
  EXPERIMENTS: 'decisionlab_growth_experiments_v2',
  CHANNEL_MATRICES: 'decisionlab_growth_channels_v2'
};

// ==========================================
// SEED DATA INICIAL (ETIQUETADO SIMULADO)
// ==========================================

const INITIAL_TUESTE_STATE = {
  activeCustomer: {
    id: 'cust_camila_01',
    name: 'Camila Rossi',
    email: 'camila@cafetueste.demo',
    phone: '+506 8899-1122',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    referralCode: 'TUESTE-CAMILA-8K',
    packBought: 'Pack Especial Selección Tueste 340g x 2',
    deliveredDaysAgo: 4, // Ya probó el café
    hasSampled: true
  },
  metrics: {
    emailsSent: 1000,
    emailsOpened: 350,
    programVisits: 120,
    activeReferrers: 100,
    totalInvitesSent: 300,
    storeVisits: 150,
    purchases: 60,
    subscriptions: 12,
    pendingRewards: 8,
    deliveredRewards: 52
  },
  referralLinks: [
    {
      code: 'TUESTE-CAMILA-8K',
      ownerName: 'Camila Rossi',
      dateCreated: '2026-10-15',
      friendsInvited: 3,
      storeVisits: 2,
      purchasesCompleted: 1,
      accumulatedRewardUSD: 3.20,
      rewardTierUnlocked: 'Nivel 1: Primer Amigo'
    }
  ],
  friendsList: [
    { id: 'fr_1', name: 'Sofía Méndez', status: 'Compró su primer café [SIMULADO]', date: '2026-10-18', rewardStatus: 'Entregada', product: 'Bolsa 340g Caturra' },
    { id: 'fr_2', name: 'Carlos Morales', status: 'Visitó la tienda online [SIMULADO]', date: '2026-10-20', rewardStatus: 'Pendiente', product: '-' },
    { id: 'fr_3', name: 'Lucía Vargas', status: 'Invitación enviada por WhatsApp', date: '2026-10-21', rewardStatus: 'En espera', product: '-' }
  ],
  purchasesLog: [
    {
      id: 'ord_sim_901',
      codeUsed: 'TUESTE-CAMILA-8K',
      buyerName: 'Sofía Méndez',
      product: 'Café de Especialidad 340g (2 bolsas)',
      listPrice: 34.0,
      discountGiven: 6.0,
      finalPaid: 28.0,
      date: '2026-10-18',
      type: 'Compra Referida [SIMULADO]'
    }
  ]
};

const INITIAL_AGENDO_STATE = {
  barbershop: {
    id: 'barber_valeria_01',
    businessSlug: 'barberia-el-galan',
    businessName: 'Barbería El Galán',
    ownerName: 'Alejandro Rojas',
    phone: '+506 8765-4321',
    location: 'San Pedro, Barrio Dent',
    trialStartDate: '2026-10-15',
    trialDaysRemaining: 9,
    currentStatus: 'Página publicada y compartida',
    services: [
      { id: 'srv_1', name: 'Corte de Cabello Clásico', price: 12, durationMinutes: 30, active: true },
      { id: 'srv_2', name: 'Arreglo y Perfilado de Barba', price: 8, durationMinutes: 20, active: true },
      { id: 'srv_3', name: 'Combo Completo (Corte + Barba)', price: 15, durationMinutes: 45, active: true }
    ],
    schedule: {
      openTime: '09:00',
      closeTime: '19:00',
      workDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      slotDurationMinutes: 30,
      barbers: ['Alejandro Rojas (Master)', 'Mateo Gómez (Estilista)']
    }
  },
  bookings: [
    {
      id: 'book_sim_101',
      businessSlug: 'barberia-el-galan',
      clientName: 'Daniel Soto',
      clientPhone: '+506 8333-2211',
      serviceName: 'Combo Completo (Corte + Barba)',
      barberName: 'Alejandro Rojas (Master)',
      date: '2026-11-08',
      time: '10:00',
      price: 15,
      status: 'Confirmada [SIMULADO]',
      source: 'WhatsApp Link Directo'
    },
    {
      id: 'book_sim_102',
      businessSlug: 'barberia-el-galan',
      clientName: 'Esteban Solano',
      clientPhone: '+506 8555-4433',
      serviceName: 'Corte de Cabello Clásico',
      barberName: 'Mateo Gómez (Estilista)',
      date: '2026-11-08',
      time: '11:30',
      price: 12,
      status: 'Confirmada [SIMULADO]',
      source: 'Insignia Agendo Web'
    }
  ],
  adminMetrics: {
    trialsStarted: 500,
    quickStartCompleted: 460, // 92%
    avgOnboardingMinutes: 4.2,
    pagesPublished: 450,
    pagesShared24h: 325, // 65%
    firstBookingsReceived: 380,
    habitualUseReached: 195, // 39%
    paidCustomers: 95,
    retention6mRate: 0.65,
    badgeReferralsNewTrials: 28,
    scheduleSupportChatsWeekly: 4 // bajó de 40 a 4
  }
};

const INITIAL_SOL_STATE = {
  families: [
    {
      id: 'fam_mora_01',
      familyCode: 'SOL-FAMILIA-MORA-9A',
      familyName: 'Familia Mora Calvo',
      address: 'Curridabat, Condominio El Roble Casa 14',
      preSolarMonthlyBill: 115.0,
      monthlySavings: 80.50, // 70%
      accumulatedSavings: 966.0, // 12 meses acumulados
      installDate: '2025-10-10',
      systemSizeKw: 3.6,
      maintenancePlanActive: true,
      cardsShared: 4,
      referralLeadsGenerated: 2,
      referralVisitsDone: 2,
      referralInstallationsSigned: 1,
      rewardEarned: '1 Año de Mantenimiento Solar Gratis [SIMULADO]'
    },
    {
      id: 'fam_solano_02',
      familyCode: 'SOL-FAMILIA-SOLANO-4B',
      familyName: 'Familia Solano Jiménez',
      address: 'Escazú, Guachipelín Norte',
      preSolarMonthlyBill: 140.0,
      monthlySavings: 98.00,
      accumulatedSavings: 588.0,
      installDate: '2026-04-12',
      systemSizeKw: 4.8,
      maintenancePlanActive: false,
      cardsShared: 1,
      referralLeadsGenerated: 1,
      referralVisitsDone: 0,
      referralInstallationsSigned: 0,
      rewardEarned: 'Ninguna'
    }
  ],
  visitRequests: [
    {
      id: 'visit_req_301',
      referralCode: 'SOL-FAMILIA-MORA-9A',
      neighborName: 'Marta Delgado',
      neighborPhone: '+506 8900-5544',
      neighborEmail: 'marta.delgado@email.demo',
      address: 'Curridabat, Casa vecina #15',
      currentMonthlyBill: 110.0,
      preferredDate: '2026-11-12',
      preferredTime: '10:00 AM',
      status: 'Visita Agendada [SIMULADO]',
      estimatedAnnualSavings: 924.0,
      estimatedPaybackYears: 7.0
    },
    {
      id: 'visit_req_302',
      referralCode: 'SOL-FAMILIA-MORA-9A',
      neighborName: 'Roberto Valverde',
      neighborPhone: '+506 8711-2299',
      neighborEmail: 'r.valverde@email.demo',
      address: 'Curridabat, Frente a Casa #14',
      currentMonthlyBill: 135.0,
      preferredDate: '2026-11-15',
      preferredTime: '02:00 PM',
      status: 'Instalación Firmada ($6,500) [SIMULADO]',
      estimatedAnnualSavings: 1134.0,
      estimatedPaybackYears: 5.7
    }
  ],
  adminMetrics: {
    totalInstalledFamilies: 420,
    familiesCheckingSavings: 285, // 68%
    cardsSharedMonth: 164,
    calculatorSessionsMonth: 340,
    visitRequestsMonth: 48,
    visitsCompletedMonth: 43,
    signedInstallationsMonth: 19,
    referralConversionRate: 0.395,
    rewardsCostTotal: 2736,
    avgReferralCAC: 243.50, // Muy por debajo de los $300
    technicianCapacityUsedPercent: 86.0
  }
};

const INITIAL_CHANNEL_MATRICES = {
  tueste: [
    { id: 't_m1', type: 'Paid', channel: 'Meta Ads (Prospección & Retargeting)', action: 'Reducir pauta a $4,000; suprimir retargeting a compradores recientes y focalizar en nuevos prospectos', lead: 'Diego Ramírez', budget: '$4,000/mes', kpi: '100 clientes nuevos con CAC $40-$50', expected30: 'Estabilizar caja', expected60: 'Eliminar fuga en retargeting', expected90: 'Base de 300 nuevos para invitar' },
    { id: 't_m2', type: 'Owned', channel: 'Email & WhatsApp Post-Entrega', action: 'Disparar correo y mensaje automatizado al día 4 (tras recibir café) con link personal de referidos', lead: 'Camila (Operaciones)', budget: '$150/mes', kpi: 'Apertura > 45%, visitas a programa > 30%', expected30: 'Plantillas listas', expected60: '50 invitadores activos', expected90: '150 invitadores recurrentes' },
    { id: 't_m3', type: 'Earned', channel: 'Tueste Rewards (Boca a Boca Incentivado)', action: 'Programa 1-Tap por WhatsApp con recompensas escalonadas (muestra 100g y bolsa 340g) sin pasar $25 CAC', lead: 'Diego Ramírez', budget: '$600/mes (premios)', kpi: 'CAC referido < $12; 60 compras referidas/mes', expected30: 'Lanzar MVP', expected60: '60 ventas referidas', expected90: '120 ventas referidas (35% de tienda)' }
  ],
  agendo: [
    { id: 'a_m1', type: 'Paid', channel: 'Meta Ads & Google Search', action: 'Mantener $10,000/mes orientados a promesa "Más clientes para tu barbería"', lead: 'Valeria Ortiz', budget: '$10,000/mes', kpi: '500 trials mensuales con costo blended $20/trial', expected30: 'Alinear creativos con QuickStart', expected60: 'Mejorar CTR a 2.0%', expected90: 'Saturar barberías urbanas' },
    { id: 'a_m2', type: 'Owned', channel: 'Agendo QuickStart (Onboarding Móvil)', action: 'Proceso de 8 pantallas en <5 min sin datos fiscales. Carga automática de corte/barba y horarios en 1 clic', lead: 'Equipo Producto', budget: '$500 (Setup)', kpi: '65% comparte link en 24h; 38% llega a uso habitual', expected30: 'Lanzar QuickStart', expected60: '300 primeras reservas', expected90: 'Tasa pago sube a 19%' },
    { id: 'a_m3', type: 'Earned', channel: 'Insignia Viral "Reservado con Agendo"', action: 'Insignia clickable en las páginas de reserva de barberías (250 visitas/mes c/u) con oferta de prueba gratis', lead: 'Valeria Ortiz', budget: '$0', kpi: 'De 8 a 35 barberías nuevas orgánicas al mes', expected30: 'Diseño e integración', expected60: '18 barberías nuevas/mes', expected90: '35 barberías nuevas/mes' }
  ],
  solDeCasa: [
    { id: 's_m1', type: 'Paid', channel: 'Google Search Ads & Meta Ads', action: 'Mantener pauta equilibrada ($4k Google + $4k Meta) filtrando leads por recibo eléctrico > $80', lead: 'Andrés Villalobos', budget: '$8,000/mes', kpi: '600 leads totales con CAC < $600', expected30: 'Optimizar formulario', expected60: 'Filtrar teléfonos falsos', expected90: 'Generar 40 ventas directas' },
    { id: 's_m2', type: 'Owned', channel: 'Portal Familiar "Mi Ahorro Solar"', action: 'Portal digital mensual donde la familia ve sus $77 ahorrados con evolución y tarjeta gráfica para WhatsApp', lead: 'Paola (Asesora)', budget: '$300/mes', kpi: '65% de familias consultan ahorro mensual', expected30: 'Desplegar a 50 familias piloto', expected60: 'Ampliar a 250 familias', expected90: '420 familias conectadas' },
    { id: 's_m3', type: 'Earned', channel: 'Comunidad Solar & Letreros de Jardín', action: 'Tarjeta compartible de ahorro + calculadora interactiva del vecino; recompensa de 1 año mantenimiento gratis', lead: 'Andrés Villalobos', budget: '$2,500/mes (premios)', kpi: 'CAC referido < $280 (con visitas de $60); 15 ventas/mes', expected30: '50 familias en prueba', expected60: '10 ventas referidas', expected90: '20 ventas referidas/mes' }
  ]
};

// ==========================================
// SERVICIO DE STORAGE PARA GROWTH
// ==========================================

export const growthStorageService = {
  // --- TUESTE ---
  getTuesteState: () => {
    try {
      const data = localStorage.getItem(GROWTH_STORAGE_KEYS.TUESTE_STATE);
      return data ? JSON.parse(data) : INITIAL_TUESTE_STATE;
    } catch {
      return INITIAL_TUESTE_STATE;
    }
  },
  saveTuesteState: (state) => {
    try {
      localStorage.setItem(GROWTH_STORAGE_KEYS.TUESTE_STATE, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving Tueste growth state:', e);
    }
  },
  resetTuesteState: () => {
    try {
      localStorage.removeItem(GROWTH_STORAGE_KEYS.TUESTE_STATE);
    } catch (e) {
      console.error('Error resetting Tueste state:', e);
    }
    return INITIAL_TUESTE_STATE;
  },
  addTuestePurchase: ({ referralCode, buyerName, product, price, discount }) => {
    const state = growthStorageService.getTuesteState();
    const finalPaid = Math.max(0, price - discount);
    const newPurchase = {
      id: `ord_sim_${Date.now()}`,
      codeUsed: referralCode,
      buyerName: buyerName || 'Amigo Invitado',
      product: product || 'Café Especial 340g x 2',
      listPrice: price,
      discountGiven: discount,
      finalPaid,
      date: new Date().toISOString().split('T')[0],
      type: 'Compra Referida [SIMULADO]'
    };

    // Actualizar enlace del invitador
    const updatedLinks = state.referralLinks.map((link) => {
      if (link.code === referralCode) {
        return {
          ...link,
          purchasesCompleted: link.purchasesCompleted + 1,
          accumulatedRewardUSD: link.accumulatedRewardUSD + 1.60
        };
      }
      return link;
    });

    // Actualizar métricas
    const updatedMetrics = {
      ...state.metrics,
      purchases: state.metrics.purchases + 1,
      storeVisits: state.metrics.storeVisits + 1,
      deliveredRewards: state.metrics.deliveredRewards + 1
    };

    const updatedFriends = [
      {
        id: `fr_${Date.now()}`,
        name: buyerName,
        status: 'Compró su primer café con regalo [SIMULADO]',
        date: new Date().toISOString().split('T')[0],
        rewardStatus: 'Entregada',
        product
      },
      ...state.friendsList
    ];

    const updatedState = {
      ...state,
      referralLinks: updatedLinks,
      purchasesLog: [newPurchase, ...state.purchasesLog],
      friendsList: updatedFriends,
      metrics: updatedMetrics
    };

    growthStorageService.saveTuesteState(updatedState);
    return updatedState;
  },

  // --- AGENDO ---
  getAgendoState: () => {
    try {
      const data = localStorage.getItem(GROWTH_STORAGE_KEYS.AGENDO_STATE);
      return data ? JSON.parse(data) : INITIAL_AGENDO_STATE;
    } catch {
      return INITIAL_AGENDO_STATE;
    }
  },
  saveAgendoState: (state) => {
    try {
      localStorage.setItem(GROWTH_STORAGE_KEYS.AGENDO_STATE, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving Agendo growth state:', e);
    }
  },
  resetAgendoState: () => {
    try {
      localStorage.removeItem(GROWTH_STORAGE_KEYS.AGENDO_STATE);
    } catch (e) {
      console.error('Error resetting Agendo state:', e);
    }
    return INITIAL_AGENDO_STATE;
  },
  addAgendoBooking: (bookingData) => {
    const state = growthStorageService.getAgendoState();
    
    // Verificar si ya existe reserva para el mismo barbero en la misma fecha y hora
    const isConflict = state.bookings.some(
      (b) =>
        b.businessSlug === bookingData.businessSlug &&
        b.barberName === bookingData.barberName &&
        b.date === bookingData.date &&
        b.time === bookingData.time
    );

    if (isConflict) {
      throw new Error(`El horario de las ${bookingData.time} del ${bookingData.date} ya está reservado para ${bookingData.barberName}. Por favor elige otro turno.`);
    }

    const newBooking = {
      id: `book_sim_${Date.now()}`,
      businessSlug: bookingData.businessSlug,
      clientName: bookingData.clientName,
      clientPhone: bookingData.clientPhone,
      serviceName: bookingData.serviceName,
      barberName: bookingData.barberName,
      date: bookingData.date,
      time: bookingData.time,
      price: bookingData.price,
      status: 'Confirmada [SIMULADO]',
      source: bookingData.source || 'Página Pública de Reservas'
    };

    const updatedBookings = [newBooking, ...state.bookings];
    const updatedState = {
      ...state,
      bookings: updatedBookings
    };

    growthStorageService.saveAgendoState(updatedState);
    return updatedState;
  },

  // --- SOL DE CASA ---
  getSolState: () => {
    try {
      const data = localStorage.getItem(GROWTH_STORAGE_KEYS.SOL_STATE);
      return data ? JSON.parse(data) : INITIAL_SOL_STATE;
    } catch {
      return INITIAL_SOL_STATE;
    }
  },
  saveSolState: (state) => {
    try {
      localStorage.setItem(GROWTH_STORAGE_KEYS.SOL_STATE, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving Sol de Casa growth state:', e);
    }
  },
  resetSolState: () => {
    try {
      localStorage.removeItem(GROWTH_STORAGE_KEYS.SOL_STATE);
    } catch (e) {
      console.error('Error resetting Sol state:', e);
    }
    return INITIAL_SOL_STATE;
  },
  addSolVisitRequest: (requestData) => {
    const state = growthStorageService.getSolState();
    const newReq = {
      id: `visit_req_${Date.now()}`,
      referralCode: requestData.referralCode,
      neighborName: requestData.neighborName,
      neighborPhone: requestData.neighborPhone,
      neighborEmail: requestData.neighborEmail,
      address: requestData.address,
      currentMonthlyBill: Number(requestData.currentMonthlyBill) || 110,
      preferredDate: requestData.preferredDate,
      preferredTime: requestData.preferredTime,
      status: 'Visita Agendada [SIMULADO]',
      estimatedAnnualSavings: (Number(requestData.currentMonthlyBill) || 110) * 0.70 * 12,
      estimatedPaybackYears: Number((6500 / (((Number(requestData.currentMonthlyBill) || 110) * 0.70 * 12) || 1)).toFixed(1))
    };

    // Actualizar familia dueña del código
    const updatedFamilies = state.families.map((fam) => {
      if (fam.familyCode === requestData.referralCode) {
        return {
          ...fam,
          referralLeadsGenerated: fam.referralLeadsGenerated + 1,
          referralVisitsDone: fam.referralVisitsDone + 1
        };
      }
      return fam;
    });

    const updatedState = {
      ...state,
      families: updatedFamilies,
      visitRequests: [newReq, ...state.visitRequests],
      adminMetrics: {
        ...state.adminMetrics,
        visitRequestsMonth: state.adminMetrics.visitRequestsMonth + 1,
        calculatorSessionsMonth: state.adminMetrics.calculatorSessionsMonth + 1
      }
    };

    growthStorageService.saveSolState(updatedState);
    return updatedState;
  },

  // --- MATRIZ DE CANALES A 90 DÍAS ---
  getChannelMatrices: () => {
    try {
      const data = localStorage.getItem(GROWTH_STORAGE_KEYS.CHANNEL_MATRICES);
      return data ? JSON.parse(data) : INITIAL_CHANNEL_MATRICES;
    } catch {
      return INITIAL_CHANNEL_MATRICES;
    }
  },
  saveChannelMatrices: (matrices) => {
    try {
      localStorage.setItem(GROWTH_STORAGE_KEYS.CHANNEL_MATRICES, JSON.stringify(matrices));
    } catch (e) {
      console.error('Error saving channel matrices:', e);
    }
  },
  resetChannelMatrices: () => {
    try {
      localStorage.removeItem(GROWTH_STORAGE_KEYS.CHANNEL_MATRICES);
    } catch (e) {
      console.error('Error resetting channel matrices:', e);
    }
    return INITIAL_CHANNEL_MATRICES;
  }
};

