// DecisionLab 360 - Datos Maestros de Growth (Sesión 2)
// Casos A (Tueste), B (Agendo) y C (Sol de Casa)

export const growthData = {
  // ==========================================
  // CASO A: TUESTE REWARDS
  // ==========================================
  tueste: {
    baselineFunnel: [
      { stage: 'Reciben correo de invitación', count: 1000, dropPercent: 0, note: 'Llega 1 día después de pagar (el café tarda 3 días)' },
      { stage: 'Abren el correo', count: 350, dropPercent: 65.0, note: '35% tasa de apertura' },
      { stage: 'Entran en el programa', count: 120, dropPercent: 65.71, note: 'Pérdida crítica: ven solo un código para copiar' },
      { stage: 'Envían invitaciones (Clientes)', count: 100, dropPercent: 16.67, note: '100 clientes activos invitan (85% por WhatsApp)' },
      { stage: 'Invitaciones enviadas (Total)', count: 300, dropPercent: 0, note: '3 invitaciones por cliente activo' },
      { stage: 'Abren la tienda (Amigos)', count: 150, dropPercent: 50.0, note: '50% de las invitaciones se abren' },
      { stage: 'Realizan una compra (Amigos)', count: 60, dropPercent: 60.0, note: '60 compras (6% de conversión sobre 1,000 iniciales)' }
    ],
    economics: {
      metaMonthlySpend: 4000,
      monthlyAgencyFee: 1000,
      metaNewCustomers: 100,
      realMetaCAC: 50.0, // ($4,000 + $1,000) / 100
      maxAllowedReferralCAC: 25.0, // Regla de Diego: CAC Meta / 2
      bagPrice: 34.0, // 2 bolsas x $17
      costs: {
        sample100gCost: 1.60,
        giftBag340gCost: 5.44,
        freeMonthSubscription: {
          uncollectedRevenue: 30.60,
          directCostCoffee: 10.88,
          directCostShipping: 4.50,
          directCostBox: 1.20,
          totalDirectOutlay: 16.58, // 10.88 + 4.50 + 1.20
          totalEconomicImpact: 47.18 // 30.60 + 16.58
        }
      }
    },
    // Niveles preconfigurados de recompensas iniciales respetando el límite de $25
    defaultRewardTiers: [
      {
        id: 'tier_1',
        level: 'Nivel 1: Primer Amigo',
        requirementCount: 1,
        requirementType: 'compra',
        friendReward: 'Bolsa de muestra 100g de café gratis ($1.60)',
        friendRewardCost: 1.60,
        referrerReward: 'Bolsa de muestra 100g de café gratis ($1.60)',
        referrerRewardCost: 1.60,
        active: true,
        note: 'Costo total acumulado por referido = $3.20 (Cumple regla ≤ $25)'
      },
      {
        id: 'tier_2',
        level: 'Nivel 2: Tres Amigos',
        requirementCount: 3,
        requirementType: 'compra',
        friendReward: '$6 de descuento en 1er pedido ($6.00)',
        friendRewardCost: 6.00,
        referrerReward: 'Bolsa completa 340g de café de regalo ($5.44)',
        referrerRewardCost: 5.44, // dividido entre 3 amigos = $1.81 por referido
        active: true,
        note: 'Costo por referido: $6.00 amigo + ($5.44/3 invitador) = $7.81 (Cumple regla ≤ $25)'
      },
      {
        id: 'tier_3',
        level: 'Nivel 3: Amigo Suscriptor',
        requirementCount: 1,
        requirementType: 'suscripcion',
        friendReward: '$10 de descuento en 1er mes ($10.00)',
        friendRewardCost: 10.00,
        referrerReward: 'Bolsa 340g edición limitada ($5.44)',
        referrerRewardCost: 5.44,
        active: true,
        note: 'Costo por referido: $10.00 + $5.44 = $15.44 (Cumple regla ≤ $25)'
      }
    ],
    growthCycle: [
      { step: 1, title: 'Compra de Café', actor: 'Cliente', desc: 'Compra online en Tueste con envío a domicilio' },
      { step: 2, title: 'Recepción del Pedido', actor: 'Cliente', desc: 'El paquete llega en 3 días con tarjeta de bienvenida y QR' },
      { step: 3, title: 'Momento Aha', actor: 'Cliente', desc: 'Prueba la taza de café; recibe aviso post-entrega "Comparte con un amigo"' },
      { step: 4, title: 'Invitación con 1 Clic', actor: 'Cliente Promotor', desc: 'Comparte por WhatsApp su link único sin copiar códigos' },
      { step: 5, title: 'Landing Amigo', actor: 'Amigo', desc: 'Abre el link, ve el regalo autoaplicado y compra en pocos toques' },
      { step: 6, title: 'Recompensa y Loop', actor: 'Ambos', desc: 'Amigo recibe su café con regalo; cliente recibe notificación y recompensa' }
    ],
    defaultExperiment: {
      name: 'Experimento Tueste Rewards: Timing Post-Entrega vs Día Siguiente',
      hypothesis: 'Si enviamos la invitación el día 4 (tras confirmar entrega y degustación del café) en vez del día 1, y cambiamos el código manual por link pre-cargado de WhatsApp, la tasa de clientes que invitan pasará de 10% a 25%.',
      targetGroup: '50% de clientes nuevos del mes (Grupo A: flujo actual día 1 con código manual; Grupo B: flujo día 4 con WhatsApp 1-tap)',
      primaryMetric: 'Tasa de clientes que refieren amigos con compra efectiva',
      initialValue: '6.0%',
      targetValue: '15.0%',
      guardrailMetric: 'Costo total de adquisición por referido (CAC referidos)',
      guardrailLimit: 'Menor a $25.00',
      observedResults: {
        controlPurchases: 30,
        treatmentPurchases: 75,
        treatmentCAC: 8.40,
        status: 'Exitoso'
      },
      decision: 'Aprobado: Implementar el flujo QuickShare al día 4 a todo el tráfico'
    }
  },

  // ==========================================
  // CASO B: AGENDO QUICKSTART
  // ==========================================
  agendo: {
    baselineOnboardingFunnel: [
      { screen: '1. Datos fiscales', arrived: 100, completed: 74, avgTimeMinutes: 4, friction: 'Cédula, razón social y régimen obligatorio (abandono 26%)' },
      { screen: '2. Datos del negocio', arrived: 74, completed: 70, avgTimeMinutes: 3, friction: 'Dirección, fotos y redes sociales' },
      { screen: '3. Servicios', arrived: 70, completed: 65, avgTimeMinutes: 12, friction: 'Carga manual uno a uno de 9 servicios (12 minutos perdidos)' },
      { screen: '4. Horarios', arrived: 65, completed: 62, avgTimeMinutes: 9, friction: 'Configuración confusa de días y horas (Mariela recibe 40 chats/semana)' },
      { screen: '5. Pantalla ¡Listo!', arrived: 62, completed: 62, avgTimeMinutes: 0.5, friction: 'Link escondido en Configuración > Mi página' },
      { screen: '6. Compartir link', arrived: 62, completed: 30, avgTimeMinutes: 1440, friction: 'Sin botón para compartir; solo 30 lo envían en 24 horas' }
    ],
    trial14DaysStats: {
      sharedDay1: 30,
      sharedDay1GotBooking: 27, // 90%
      notSharedDay1: 32,
      notSharedDay1GotBooking: 11, // 34.4%
      totalGotFirstBooking: 38, // 27 + 11
      reachedHabitualUse: 22, // 20 citas o más en 14 días
      conversionToPaidByStage: [
        { stage: 'No configuraron (abandonaron onboarding)', trials: 38, conversionRate: 0.01, paid: 0.38 },
        { stage: 'Configuraron sin recibir reservas', trials: 24, conversionRate: 0.05, paid: 1.20 },
        { stage: 'Recibieron 1ra reserva (sin uso habitual)', trials: 16, conversionRate: 0.15, paid: 2.40 },
        { stage: 'Alcanzaron uso habitual (≥20 citas)', trials: 22, conversionRate: 0.45, paid: 9.90 }
      ],
      totalPaidCustomers: 13.88, // 13.88% de conversión global
      retention6Months: {
        habitualUse: 0.80, // 80% activos a los 6 meses
        otherPaid: 0.35 // 35% activos a los 6 meses
      },
      badgeStats: {
        monthlyPageViewsPerShop: 250,
        monthlyNewShopsFromBadge: 8
      }
    },
    defaultQuickStartTemplates: [
      { id: 'srv_1', name: 'Corte de Cabello Clásico', price: 12.0, durationMinutes: 30, active: true },
      { id: 'srv_2', name: 'Arreglo y Perfilado de Barba', price: 8.0, durationMinutes: 20, active: true },
      { id: 'srv_3', name: 'Combo Completo (Corte + Barba)', price: 15.0, durationMinutes: 45, active: true }
    ],
    growthCycle: [
      { step: 1, title: 'Registro Móvil', actor: 'Barbero', desc: 'Entra desde anuncio ("Más clientes para tu barbería")' },
      { step: 2, title: 'QuickStart <5 min', actor: 'Barbero', desc: 'Plantillas listas de corte/barba y horarios predeterminados sin datos fiscales' },
      { step: 3, title: 'Compartir 1-Tap', actor: 'Barbero', desc: 'Envía link por WhatsApp e Instagram con mensaje listo a sus clientes' },
      { step: 4, title: 'Primera Reserva (Aha)', actor: 'Cliente de Barbería', desc: 'Cliente agenda cita en segundos. Barbero recibe notificación de éxito' },
      { step: 5, title: 'Uso Habitual (20 citas)', actor: 'Barbero', desc: 'Barbero experimenta su agenda llena en 14 días (retención 80%)' },
      { step: 6, title: 'Insignia Viral Agendo', actor: 'Visitante / Colega', desc: 'Clientes y otros barberos ven "Reservado con Agendo" y crean su cuenta' }
    ],
    defaultExperiment: {
      name: 'Experimento Agendo QuickStart: Onboarding 5 Min vs Flujo Tradicional',
      hypothesis: 'Si eliminamos datos fiscales y precargamos servicios de corte/barba con horarios sugeridos, la proporción de negocios que comparten su link en las primeras 24h subirá del 30% al 65%, y los que llegan a uso habitual aumentarán de 22% a 38%.',
      targetGroup: '100% de los nuevos trials de octubre (A/B: 50% Onboarding Clásico, 50% QuickStart Móvil)',
      primaryMetric: 'Porcentaje de trials que alcanzan uso habitual (≥ 20 citas en 14 días)',
      initialValue: '22.0%',
      targetValue: '38.0%',
      guardrailMetric: 'Conversión final a pago y churn a 30 días',
      guardrailLimit: 'Conversión a pago ≥ 18% (no disminuir la calidad de los clientes)',
      observedResults: {
        controlHabitual: 22,
        treatmentHabitual: 39,
        controlPaid: 14,
        treatmentPaid: 21,
        status: 'Exitoso'
      },
      decision: 'Aprobado: Desplegar Agendo QuickStart como estándar a todo nuevo usuario'
    }
  },

  // ==========================================
  // CASO C: SOL DE CASA COMUNIDAD SOLAR
  // ==========================================
  solDeCasa: {
    baselineCommunity: {
      totalInstalledFamilies: 420,
      knowsLastMonthSavingsPercent: 25.0, // 25% sabe cuánto ahorró
      showedBillToNeighborPercent: 40.0, // 40% enseñó el recibo
      refersFamilyPerYearPercent: 8.0, // 8% refiere al año espontáneamente
      postInstallFollowupMessages: 0, // Cero mensajes tras instalación
      maintenancePlanMonthlyPrice: 12.0,
      maintenancePlanAdoptionPercent: 25.0, // 25% contrata mantenimiento
      avgPreSolarBill: 110.0,
      avgSavingsPercent: 70.0,
      avgMonthlySavings: 77.0, // $110 * 70%
      avgAnnualSavings: 924.0, // $77 * 12
      avgInstallationPrice: 6500.0,
      costPerVisitDone: 60.0,
      yardSignsExperiment: {
        signsPlaced: 20,
        leadsGenerated: 6,
        timeframeMonths: 2,
        leadRatePerSignPerMonth: 0.15 // 6 / 20 / 2
      }
    },
    economics: {
      maxReferralAcquisitionCost: 300.0, // Regla de oro de Andrés
      costPerTechnicalVisitDone: 60.0,
      panelCleaningOutlayCost: 60.0, // Limpieza fuera del plan
      conversionRates: {
        leadContactRate: 0.95, // 95% contactados
        contactToScheduleRate: 0.85, // 85% de contactados agendan visita
        scheduleToVisitDoneRate: 0.90, // 90% de visitas agendadas se realizan
        visitToCloseRate: 0.45 // 45% de visitas realizadas firman venta
      },
      // Cálculos probabilísticos exactos:
      // Tasa neta de lead a venta = 0.95 * 0.85 * 0.90 * 0.45 = 0.3269475 (32.69%)
      // Visitas realizadas por venta = 1 / 0.45 = 2.222 visitas
      // Costo esperado de visitas por venta = 2.222 * $60 = $133.33
      // Presupuesto máximo disponible para premios = $300 - $133.33 = $166.67
      expectedVisitsPerSale: 2.2222,
      expectedVisitCostPerSale: 133.33,
      maxRewardBudgetPerSale: 166.67
    },
    defaultRewardTiers: [
      {
        id: 'sol_reward_1',
        milestone: 'Vecino agenda visita técnica',
        rewardDescription: 'Kit de Monitoreo Digital o $20 crédito mantenimiento',
        cost: 20.0,
        active: false,
        expectedCostPerSale: 49.38, // 2.469 visitas agendadas por venta * $20
        note: 'Opcional. Si se activa, descuenta del presupuesto de cierre'
      },
      {
        id: 'sol_reward_2',
        milestone: 'Vecino firma e instala paneles solares',
        rewardDescription: '1 Año de Mantenimiento y Limpieza Profesional Gratis',
        cost: 144.0, // 12 meses x $12
        active: true,
        expectedCostPerSale: 144.0,
        note: 'Costo total: $133.33 visitas + $144.00 premio = $277.33 (Cumple regla ≤ $300)'
      }
    ],
    growthCycle: [
      { step: 1, title: 'Instalación Solar', actor: 'Familia', desc: 'Instalación en techo y conexión de inversor inteligente' },
      { step: 2, title: 'Portal "Mi Ahorro Solar"', actor: 'Familia', desc: 'Visualiza en vivo sus $77 ahorrados al mes y su acumulado' },
      { step: 3, title: 'Tarjeta Compartible', actor: 'Familia', desc: 'Comparte por WhatsApp su recibo real con enlace personal de referido' },
      { step: 4, title: 'Calculadora del Vecino', actor: 'Vecino', desc: 'Ingresa su recibo, descubre su ahorro del 70% y payback en ~7 años' },
      { step: 5, title: 'Visita Técnica Agendada', actor: 'Vecino & Técnico', desc: 'Solicita medición de techo en 1 clic; técnico realiza visita ($60)' },
      { step: 6, title: 'Instalación y Recompensa', actor: 'Familia & Vecino', desc: 'Vecino firma instalación ($6,500); familia recibe mantenimiento gratis' }
    ],
    defaultExperiment: {
      name: 'Experimento Sol de Casa: Portal Familiar Digital con 50 Familias',
      hypothesis: 'Si damos acceso al portal "Mi Ahorro Solar" y una tarjeta gráfica de WhatsApp a 25 familias, frente a 25 que no reciben contacto, generaremos al menos 8 solicitudes de visita y 3 cierres en 60 días.',
      targetGroup: '50 familias instaladas seleccionadas en Curridabat y Escazú (25 Grupo Tratamiento con Portal, 25 Grupo Control)',
      primaryMetric: 'Leads y visitas agendadas por familia activa en 60 días',
      initialValue: '0.04 leads/familia (8% al año)',
      targetValue: '0.32 leads/familia en 2 meses',
      guardrailMetric: 'Costo total por cliente nuevo referido (visitas + recompensas)',
      guardrailLimit: 'Menor a $300.00',
      observedResults: {
        controlLeads: 1,
        controlVisits: 1,
        controlSales: 0,
        treatmentCardsShared: 19,
        treatmentCalculatorUses: 42,
        treatmentLeads: 9,
        treatmentVisits: 7,
        treatmentSales: 3,
        treatmentTotalCostPerSale: 277.33,
        status: 'Exitoso'
      },
      decision: 'Aprobado: Desplegar el portal y tarjeta de ahorro a las 420 familias'
    }
  }
};

