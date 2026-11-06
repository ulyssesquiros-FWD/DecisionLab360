# AUDITORÍA INTEGRAL DEL PROYECTO DECISIONLAB 360 (V1.0 -> V2.0)
**Documento oficial de diagnóstico, preservación y plan de arquitectura para Sesión 2**
*Equipo de Desarrollo: Arquitecto de Software, Senior React Dev, UX/UI Lead, Analista Financiero, Growth Marketing Lead, QA Engineer.*

---

## 1. INTRODUCCIÓN Y ALCANCE
El proyecto **DecisionLab 360** es una plataforma analítica y de simulación financiera empresarial desarrollada en React 19 + Vite + TailwindCSS 3 + Recharts + React Router DOM 7. Su propósito inicial (Sesión 1) fue diagnosticar, modelar unit economics (CAC, LTV, márgenes, payback) y proyectar flujo de caja a 24 meses para tres modelos de negocio:
1. **Tueste (Caso A)**: E-commerce DTC de café de especialidad.
2. **Agendo (Caso B)**: SaaS B2B de agenda y pagos para barberías y salones.
3. **Sol de Casa (Caso C)**: Lead generation y venta de paneles solares residenciales.

La presente auditoría establece la línea base técnica del código existente, verifica la integridad de los motores matemáticos anteriores y define el plan de expansión modular hacia la **Versión 2.0 (Sesión 2: Soluciones de Growth)** sin destruir ni simplificar ningún cálculo previo.

---

## 2. ESTRUCTURA ENCONTRADA EN EL REPOSITORIO

```
BSolutions/
├── dist/                              # Artefactos de build de Vite
├── node_modules/                      # Dependencias instaladas
├── public/                            # Favicon e iconos SVG estáticos
├── tests/
│   └── engines.test.js                # Suite de 27 pruebas unitarias de los motores financieros (100% PASS)
├── src/
│   ├── assets/                        # Gráficos (hero.png, react.svg, vite.svg)
│   ├── Components/
│   │   ├── CashFlowTable/             # Tabla interactiva de flujo de caja mensual (24 meses)
│   │   ├── Charts/
│   │   │   ├── CashCurveChart.jsx     # Curva de payback acumulado del cliente
│   │   │   ├── FunnelChart.jsx        # Visualización de embudos
│   │   │   ├── InvestmentHistoryChart.jsx # Curva de rendimientos decrecientes y CAC marginal
│   │   │   ├── LtvCacChart.jsx        # Gráfico comparativo de LTV vs CAC por escenario
│   │   │   └── TrapComparisonChart.jsx# Comparador de trampas de vanidad vs métricas reales
│   │   ├── DataTable/                 # Tablas genéricas estilizadas con ordenamiento
│   │   ├── ErrorBoundary.jsx          # Capturador de excepciones React
│   │   ├── Header/                    # Barra superior de navegación y contexto
│   │   ├── KPICard/                   # Tarjetas KPI con badges semáforo y helper texts
│   │   ├── MetricIndicator/           # Indicador de semáforo con umbrales configurables
│   │   ├── ScenarioCard/              # Comparador de tarjetas de escenarios
│   │   └── Sidebar/                   # Menú lateral con rutas de navegación
│   ├── Data/
│   │   ├── agendoData.js              # Supuestos baseline de Agendo (septiembre)
│   │   ├── solDeCasaData.js           # Supuestos baseline de Sol de Casa (septiembre)
│   │   └── tuesteData.js              # Supuestos baseline de Tueste (septiembre)
│   ├── Engines/
│   │   ├── agendoEngine.js            # Motor financiero unitario y simulación 24M de Agendo
│   │   ├── solDeCasaEngine.js         # Motor financiero unitario y simulación 24M de Sol de Casa
│   │   └── tuesteEngine.js            # Motor financiero unitario y simulación 24M de Tueste
│   ├── Pages/
│   │   ├── Agendo/Agendo.jsx          # Vista de análisis financiero completo Caso B
│   │   ├── Analysis/Analysis.jsx      # Tableros vivos de control (Nivel 2)
│   │   ├── Calculator/Calculator.jsx  # Calculadora unit economics (Nivel 1)
│   │   ├── Dashboard/Dashboard.jsx    # Dashboard general ejecutivo
│   │   ├── Reports/Reports.jsx        # Reportes y recomendaciones
│   │   ├── Scenarios/Scenarios.jsx    # Comparador multi-escenario transversal
│   │   ├── Settings/Settings.jsx      # Ajuste de supuestos y parámetros
│   │   ├── Simulator/Simulator.jsx    # Simuladores de 24 meses (Nivel 3)
│   │   ├── SolDeCasa/SolDeCasa.jsx    # Vista de análisis financiero completo Caso C
│   │   └── Tueste/Tueste.jsx          # Vista de análisis financiero completo Caso A
│   ├── Routes/
│   │   └── AppRoutes.jsx              # Configuración de react-router-dom
│   ├── Services/
│   │   ├── calculationService.js      # Formateadores de moneda, porcentajes, ratios y utilidades
│   │   ├── exportService.js           # Exportadores a Excel (.xlsx) y PDF (jspdf)
│   │   ├── simulationService.js       # Servicio coordinador de simulaciones
│   │   └── storageService.js          # Persistencia en LocalStorage
│   ├── App.css / App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 3. FUNCIONALIDADES EXISTENTES (ESTADO ACTUAL COMPROBADO)

### A. Motores Financieros (Engines) - 100% Funcionales y Verificados:
- **Tueste Engine (`tuesteEngine.js`)**:
  - Desglose riguroso del pedido suelto de 2 bolsas: Precio $34, Café $10.88 (32%), Pasarela $1.53 (4.5%), Empaque $1.20, Envío $4.50 pagado por Tueste en baseline => Margen $15.89 (46.74%).
  - ROAS Break-even = 2.14x. ROAS real primer pedido = 0.70x (frente al 3.0x de vanidad de Meta).
  - CAC Real con agencia = $54.55 (con $8k) o $50.00 (con $4k y 100 clientes).
  - LTV a 12 meses sobre margen = $54.88 (3 pedidos en 12m y churn 9% en suscripción). LTV:CAC = 1.01x.
  - Simulador de caja de 24 meses mes a mes con piso de seguridad de $5,000 y compra de tostadora ($14,000 en mes 12).
- **Agendo Engine (`agendoEngine.js`)**:
  - Margen mensual de cliente = $19.50 (78% de $25).
  - 500 trials de pauta ($6.5k Meta + $3.5k Google) generan 70 clientes pagados (14% conversión) + 50 clientes orgánicos.
  - CAC Paid real = $180.00 (incluye $10k pauta + $1,200 Mariela + $1,400 comisiones). CAC Blended = $105.00.
  - LTV 24 meses sobre margen = $251.29. Ratio LTV:CAC Paid = 1.40x (desmonta el 2.4x blended engañoso).
  - Simulación a 24 meses respetando piso de seguridad de $10,000.
- **Sol de Casa Engine (`solDeCasaEngine.js`)**:
  - Contribución neta por instalación = $1,625 (25% margen neto sobre $6,500 tras 3% comisión de asesora).
  - Leads Septiembre: Meta 500 ($8 CPL), Google 100 ($40 CPL).
  - 97.49 visitas demandadas (dentro del límite de 100 visitas de los 2 técnicos).
  - CAC Real Google = $535.54 (con visitas de $60). CAC Real Meta = $718.13 (+34% más caro por baja conversión de leads fríos).
  - Valor esperado de visita Google = +$427.50 vs Meta = +$232.50. LTV:CAC Google = 3.03x.
  - Simulación a 24 meses respetando piso de seguridad de $5,000.

### B. Pruebas Unitarias Automatizadas:
- `tests/engines.test.js`: Ejecuta 27 pruebas de regresión financiera estricta (`npm test` pasa con 27/27 éxitos).

### C. Páginas y Componentes UI de la Sesión 1:
- Vistas completas de cada caso (`/tueste`, `/agendo`, `/sol-de-casa`) con selectores de escenarios rápidos, sliders interactivos, gráficos de Recharts, desgloses de campañas, semáforos, tablas de flujo de caja y análisis de errores de la IA.
- Páginas transversales (`/calculadoras`, `/tableros`, `/simuladores`, `/escenarios`, `/reportes`, `/configuracion`).

---

## 4. FUNCIONALIDADES PENDIENTES (REQUERIMIENTOS SESIÓN 2 - GROWTH)

La Sesión 2 exige la construcción de soluciones de Growth funcionales, completas y de punta a punta, estructuradas como proyectos independientes con sus propios prototipos y paneles administrativos:

### 1. Solución A: Tueste Rewards
- **Análisis del Embudo Piloto**: Visualización comparativa del embudo (1000 reciben -> 350 abren -> 120 entran -> 100 envían -> 300 invitaciones -> 150 abren -> 60 compran) evidenciando el mayor cuello de botella (pérdida entre apertura/ingreso y desincronización de entrega).
- **Límite Económico de Referidos**: Regla de Diego (máximo la mitad del CAC Meta: CAC Meta = $50 -> Límite = $25). Validador estricto que bloquea recompensas acumuladas > $25 por referido. Costos: Muestra 100g = $1.60; Bolsa 340g = $5.44; Mes gratis suscripción: $30.60 no cobrado + $16.58 desembolso directo ($10.88 café + $4.50 envío + $1.20 caja).
- **Experiencia Móvil del Invitador ("Mi Programa Tueste")**: Enlace personal, botón WhatsApp con mensaje pre-redactado, estado de amigos (invitados, visitaron, compraron), progreso por niveles y recompensas acumuladas.
- **Experiencia Pública del Amigo Invitado (`/tueste/referido/:referralCode`)**: Regalo y descuento autoaplicado, catálogo recomendado, checkout demo interactivo que registra compra simulada, notifica al invitador y actualiza métricas admin en vivo.
- **Sistema de Recompensas por Niveles**: 1er amigo, 3 amigos, suscripción; cálculo de costo unitario y distribuido por referido.
- **Panel Administrativo de Diego**: Métricas completas, 5 gráficos obligatorios (embudo, conversión por etapa, Meta vs referidos, CAC Meta vs CAC referidos, evolución de recompensas).
- **Ciclo de Adquisición y Matriz 90 Días**: Diagrama interactivo y matriz multicanal (Paid, Owned, Earned).
- **Experimento A/B Configurable**: Definición de hipótesis, métrica principal, contramétrica, resultado observado y decisión.

### 2. Solución B: Agendo QuickStart
- **Análisis del Proceso Actual**: Embudo de fricción de 4 pantallas iniciales (Fiscales 4m -> Negocio 3m -> Servicios 12m -> Horarios 9m; solo 62 terminan; 30 comparten en 24h).
- **Rediseño Onboarding Mobile (<5 min, 8 pantallas funcionales)**:
  - P1: Bienvenida con promesa "Más clientes para tu barbería" y 14 días trial.
  - P2: Datos esenciales mínimos (sin datos fiscales).
  - P3: Plantillas rápidas de servicios ($8-$15: Corte, Barba, Corte+Barba editables).
  - P4: Configuración rápida de horarios y barberos.
  - P5: Generación automática de página de reservas con preview en vivo.
  - P6: Compartir por WhatsApp e Instagram con mensaje listo.
  - P7: Simulación de primera reserva entrante con notificación de éxito y actualización de estado.
  - P8: Activación con objetivo de 20 citas en 14 días de prueba.
- **Página Pública de Reservas (`/agendo/reservar/:businessSlug`)**: Selección de servicio, barbero, fecha y hora con validación para impedir citas duplicadas simultáneas.
- **Insignia Viral Dinámica**: "Reservado con Agendo — Crea tu página de reservas gratis" con loop viral rastreable a la barbería origen.
- **Panel Administrativo de Valeria**: Funnel completo, activación, retención a 6 meses, registros por insignia y tickets de soporte.
- **Conexión Financiera Dinámica**: Impacto de QuickStart sobre clientes pagados, CAC paid, CAC blended y LTV:CAC.
- **Experimento A/B QuickStart**: Control vs Tratamiento, métrica principal (primera reserva / uso habitual) y contramétricas.

### 3. Solución C: Sol de Casa Comunidad Solar
- **Análisis de Situación**: 420 familias instaladas, 25% conoce su ahorro, 40% muestra recibo, 8% refiere al año, 0 contacto post-instalación.
- **Portal de Familias "Mi Ahorro Solar" (`/sol-de-casa/familia/:familyCode`)**: Vista mensual de ahorro ($77/mes promedio, 70% de recibo de $110), acumulado histórico, evolución gráfica y exportable/importable.
- **Tarjeta de Ahorro Compartible**: Widget visual descargable/compartible por WhatsApp con link personal de referido.
- **Página Pública del Vecino (`/sol-de-casa/ahorro/:referralCode`)**: Testimonio, calculadora de ahorro solar interactiva (recibo mensual -> ahorro mes, ahorro año, payback en años frente a $6,500) y formulario para solicitar visita técnica geolocalizada.
- **Sistema de Recompensas y Límite Económico de $300**:
  - Conversión del embudo de referidos: 95% contacto x 85% agendadas x 90% realizadas x 45% cierre = 32.69% cierre por lead.
  - Visitas necesarias por venta = 1 / 0.45 = 2.222 visitas. Costo de visitas por venta = 2.222 x $60 = $133.33.
  - Presupuesto máximo disponible para recompensas por venta = $300 - $133.33 = $166.67.
  - Bloqueo estricto de combinaciones que superen los $300 totales por instalación cerrada.
- **Panel Administrativo de Andrés**: KPIs, funnel de referidos, leads por canal, CAC referidos vs límite de $300.
- **Modelo de Capacidad Operativa**: Cálculo de leads necesarios para saturar un técnico extra (+50 visitas, $1,800/mes) y extrapolación analítica de letreros (6 leads / 20 casas / 2 meses).
- **Métricas de Retención No Convencionales**: Monitoreo de relación continua (visitas al portal, acciones de compartir, referidos y contratación de mantenimiento $12/mes).
- **Experimento Piloto con 50 Clientes**: 25 portal nuevo vs 25 control.

### 4. Growth Center Global & Fichas Ejecutivas
- Vista consolidada de Growth Center con los tres ciclos de adquisición en diagramas interactivos.
- Ficha de Growth ejecutiva obligatoria por negocio con los 14 puntos de la rúbrica oficial (incluyendo errores detectados de la IA).
- Matriz de canales a 90 días (Paid / Owned / Earned, configurable a 30, 60 y 90 días).

---

## 5. ARCHIVOS QUE SE REUTILIZARÁN
1. `src/Engines/tuesteEngine.js` -> Se mantiene íntegro; se integrará con las nuevas métricas de Growth.
2. `src/Engines/agendoEngine.js` -> Se mantiene íntegro; se conectará con el simulador de conversión QuickStart.
3. `src/Engines/solDeCasaEngine.js` -> Se mantiene íntegro; se vinculará con la capacidad de técnicos y visitas.
4. `src/Data/tuesteData.js`, `agendoData.js`, `solDeCasaData.js` -> Se conservan y amplían con los datos de la Parte 2.
5. `src/Services/calculationService.js` -> Formateadores existentes (`formatCurrency`, `formatPercent`, etc.).
6. `src/Services/storageService.js` -> Se ampliará con métodos para persistir y resetear datos de demostración independientes para cada caso.
7. `src/Services/exportService.js` -> Se ampliará para exportar informes de Growth y fichas ejecutivas.
8. `src/Components/KPICard/`, `MetricIndicator/`, `DataTable/`, `CashFlowTable/`, `Charts/` -> Componentes UI base para tableros y paneles admin.
9. `src/Components/Sidebar/Sidebar.jsx` -> Reorganización de la navegación para dar acceso claro a Sesión 1 (Financiero) y Sesión 2 (Growth) por cada caso, más el Growth Center.
10. `src/Pages/Tueste/Tueste.jsx`, `Agendo.jsx`, `SolDeCasa.jsx` -> Se enriquecen con pestañas/subsecciones para alternar fluidamente entre Sesión 1 (Análisis Financiero) y Sesión 2 (Growth Solution), o enlaces directos dedicados.

---

## 6. ARCHIVOS QUE SE CREARÁN

### Nuevos Motores y Datos de Growth:
1. `src/Data/growthData.js` -> Datos base de embudos, recompensas, experimentos y matrices a 90 días para los 3 casos.
2. `src/Engines/growthEngines.js` -> Motores de cálculo de Growth:
   - Validador económico Tueste (Límite $25)
   - Simulador de activación Agendo (funnel y conversión a pago)
   - Validador probabilístico Sol de Casa (Visitas esperadas + Recompensas <= $300)
3. `src/Services/growthStorageService.js` -> Gestor de persistencia LocalStorage para referidos, reservas, solicitudes, familias y experimentos, con soporte de reset modular aislado.

### Nuevos Componentes y Páginas de Solución A (Tueste Rewards):
4. `src/Pages/Growth/Tueste/TuesteGrowthHub.jsx` -> Hub central de Growth para Tueste (Admin, Métricas, Ciclo, Experimento, Matriz).
5. `src/Pages/Growth/Tueste/TuesteReferralCustomerView.jsx` -> "Mi Programa Tueste" (Experiencia móvil del cliente invitador).
6. `src/Pages/Growth/Tueste/TuesteReferralPublicLanding.jsx` -> `/tueste/referido/:referralCode` (Experiencia amigo con regalo aplicado y checkout demo).
7. `src/Components/Growth/TuesteRewardsConfig.jsx` -> Tabla interactiva de recompensas con validador de $25.

### Nuevos Componentes y Páginas de Solución B (Agendo QuickStart):
8. `src/Pages/Growth/Agendo/AgendoGrowthHub.jsx` -> Hub central de Growth para Agendo (Admin Valeria, Impacto Financiero, Experimento, Funnel).
9. `src/Pages/Growth/Agendo/AgendoOnboardingWizard.jsx` -> Flujo móvil QuickStart de 8 pantallas (<5 min).
10. `src/Pages/Growth/Agendo/AgendoPublicBooking.jsx` -> `/agendo/reservar/:businessSlug` (Página pública de reservas con validación de horarios y nueva insignia viral).
11. `src/Components/Growth/AgendoBadgeModal.jsx` -> Modal explicativo viral "Reservado con Agendo" con loop de registro.

### Nuevos Componentes y Páginas de Solución C (Sol de Casa Comunidad Solar):
12. `src/Pages/Growth/SolDeCasa/SolDeCasaGrowthHub.jsx` -> Hub central de Growth para Sol de Casa (Admin Andrés, Capacidad, Retención, Experimento).
13. `src/Pages/Growth/SolDeCasa/SolDeCasaFamilyPortal.jsx` -> `/sol-de-casa/familia/:familyCode` ("Mi Ahorro Solar", histórico, tarjeta de ahorro).
14. `src/Pages/Growth/SolDeCasa/SolDeCasaNeighborLanding.jsx` -> `/sol-de-casa/ahorro/:referralCode` (Página pública con calculadora solar y agendamiento de visita técnica).
15. `src/Components/Growth/SolDeCasaRewardsConfig.jsx` -> Validador de recompensas y costo de visitas (Límite $300).

### Nuevas Vistas Globales de Growth:
16. `src/Pages/Growth/GrowthCenter.jsx` -> Vista general con los 3 ciclos interactivos y resumen transversal.
17. `src/Pages/Growth/GrowthOnePager.jsx` -> Ficha ejecutiva oficial de 1 página por negocio con los 14 puntos normativos.
18. `src/Components/Growth/ChannelMatrix90Days.jsx` -> Matriz editable Paid/Owned/Earned a 30/60/90 días.

### Suite de Pruebas de Regresión y Growth:
19. `tests/growthEngines.test.js` -> Suite automatizada para validar límites de $25 (Tueste), $300 (Sol de Casa), funnel Agendo y persistencia.

### Entregables Documentales Obligatorios en `docs/`:
20. `docs/ARCHITECTURE.md`
21. `docs/SESSION1_FINANCIAL_ANALYSIS.md`
22. `docs/SESSION2_GROWTH_ANALYSIS.md`
23. `docs/TUESTE_GROWTH.md`
24. `docs/AGENDO_ONBOARDING.md`
25. `docs/SOL_DE_CASA_REFERRALS.md`
26. `docs/GROWTH_EXPERIMENTS.md`
27. `docs/TESTING.md`
28. `docs/README.md`

---

## 7. PROBLEMAS Y RIESGOS DETECTADOS & ESTRATEGIA DE MITIGACIÓN

| Riesgo / Problema Detectado | Causa Raíz | Estrategia de Mitigación |
|---|---|---|
| Colisión entre datos de Sesión 1 y Sesión 2 | Ambas sesiones manejan métricas de CAC y presupuestos | Modularizar datos: los modelos de Sesión 1 quedan inalterados; los modelos de Growth operan con sus propios estados y se interconectan mediante capas de enlace explícitas. |
| Infracción de la regla económica de $25 (Tueste) | Configuración errónea de recompensas o premios escalonados | El motor de validación calcula el costo unitario por referido y bloquea automáticamente cualquier intento de activar recompensas que violen el límite. |
| Infracción de la regla económica de $300 (Sol de Casa) | Olvidar que una venta requiere 2.22 visitas a $60 ($133.33) | El validador incluye automáticamente el costo esperado de las visitas según la tasa de conversión histórica del embudo ($133.33) y permite máx $166.67 en recompensas directas. |
| Mezcla de métricas en embudo Tueste | Confundir clientes invitadores con invitaciones enviadas | Modelar explícitamente ambas métricas: 100 clientes invitadores vs 300 invitaciones enviadas (3 por cliente). |
| Doble contabilidad en funnel Agendo | Sumar clientes en etapas redundantes de conversión | Segmentar disyuntivamente las 4 categorías: sin configuración (1%), con configuración sin reserva (5%), primera reserva (15%), uso habitual (45%). |
| Pérdida de interactividad en pantallas móviles | Componentes de escritorio complejos mostrados en pantallas pequeñas | Enfoque Mobile-First estricto para los prototipos de cliente e invitador, con toggle o vista de teléfono simulada en escritorio. |

---

## 8. PLAN DE IMPLEMENTACIÓN POR ETAPAS

- **ETAPA 1 (COMPLETADA)**: Auditoría integral del proyecto y creación de `docs/PROJECT_AUDIT.md`.
- **ETAPA 2**: Planificación de arquitectura, rutas en `AppRoutes.jsx`, actualización de navegación en `Sidebar.jsx`, y creación de motores base `growthData.js` y `growthEngines.js`.
- **ETAPA 3**: Construcción completa de Solución A: Tueste Rewards (embudo, límites $25, app móvil cliente, checkout amigo `/tueste/referido/:code`, admin Diego, ciclo, experimento A/B, matriz 90 días).
- **ETAPA 4**: Construcción completa de Solución B: Agendo QuickStart (embudo actual, onboarding móvil 8 pantallas, página pública `/agendo/reservar/:slug`, insignia viral, admin Valeria, impacto financiero, experimento A/B).
- **ETAPA 5**: Construcción completa de Solución C: Sol de Casa Comunidad Solar (portal familiar `/sol-de-casa/familia/:code`, tarjeta compartible, página vecino `/sol-de-casa/ahorro/:code` con calculadora y agendamiento, sistema de recompensas con límite $300, admin Andrés, capacidad, retención continua, experimento 50 familias).
- **ETAPA 6**: Construcción de Growth Center Global (3 ciclos de adquisición interactivos, Fichas de Growth de 1 página con 14 puntos normativos y Matriz de canales a 90 días).
- **ETAPA 7**: Integración bidireccional con motores financieros de la Sesión 1 y enlaces de navegación entre módulos.
- **ETAPA 8**: Servicios de persistencia LocalStorage con reinicio modular independiente y datos seed con etiqueta [SIMULADO].
- **ETAPA 9**: Pruebas funcionales integrales, ejecución y ampliación del test suite automatizado (`tests/engines.test.js` y `tests/growthEngines.test.js`).
- **ETAPA 10**: Generación de toda la documentación reglamentaria en `docs/` y verificación final de estándares de entrega.

