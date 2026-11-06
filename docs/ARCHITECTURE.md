# ARQUITECTURA DE SOFTWARE · DECISIONLAB 360 (V2.0)
**Diseño de Sistemas, Flujo de Datos, Modularidad y Enfoque Mobile-First**
*Equipo de Arquitectura: Arquitecto de Software & Senior React Developer*

---

## 1. VISIÓN GENERAL Y PRINCIPIOS DE DISEÑO
DecisionLab 360 V2.0 amplía la plataforma analítica original (Sesión 1: Motores Financieros, CAC/LTV y Flujo de Caja 24M) incorporando un subsistema completo de Growth Marketing y Adquisición Orgánica (Sesión 2: Soluciones de Growth).

### Principios Fundamentales:
1. **Preservación Estricta de la Línea Base**: Los motores financieros unitarios (`tuesteEngine.js`, `agendoEngine.js`, `solDeCasaEngine.js`) y las simulaciones de 24 meses permanecen inalterados. No se sustituyen por fórmulas simplificadas.
2. **Desacoplamiento Modular**: Las tres soluciones de Growth (Tueste Rewards, Agendo QuickStart y Sol de Casa Comunidad Solar) operan como subsistemas independientes con sus propios contratos de datos, almacenamiento local y endpoints de demostración.
3. **Mobile-First para Experiencias de Usuario**: Las páginas públicas y vistas de cliente (invitador, barbero en onboarding, vecino calculando ahorro) están optimizadas para pantallas móviles, garantizando tiempos de carga casi instantáneos y navegación sin fricción.
4. **Verificación Económica en Tiempo Real**: Toda configuración de recompensas está sujeta a validadores automáticos inquebrantables:
   - Tueste: Costo máximo por referido $\le \$25.00$ (mitad del CAC Meta).
   - Sol de Casa: Costo total por venta cerrada (visitas técnicas + premios) $\le \$300.00$.
5. **Transparencia Simulada**: Todo dato ficticio o generado para demostración lleva la etiqueta explícita `[SIMULADO]`.

---

## 2. MAPA DE RUTAS Y NAVEGACIÓN

```
/                                   -> Dashboard General Ejecutivo (Resumen Financiero + Growth)
/growth                             -> Growth Center Global (Visualizador Interactivo de 3 Loops)
/growth/fichas                      -> Fichas Ejecutivas de Growth (1 Página Oficial por Negocio)
/growth/canales                     -> Matriz Multicanal 90 Días (Paid / Owned / Earned editable)

# CASO A: TUESTE (DTC)
/tueste                             -> Vista Unificada (Pestañas S1 Finanzas vs S2 Growth)
/tueste/growth                      -> Panel Administrativo de Diego Ramírez (5 Gráficos, Embudo)
/tueste/mi-programa                 -> Experiencia Móvil del Cliente Invitador (1-Tap WhatsApp)
/tueste/referido/:referralCode      -> Landing Pública del Amigo con Descuento Autoaplicado y Checkout Demo

# CASO B: AGENDO (SAAS)
/agendo                             -> Vista Unificada (Pestañas S1 Finanzas vs S2 Growth)
/agendo/growth                      -> Panel Administrativo de Valeria Ortiz (Funnel Activación, CAC)
/agendo/quickstart                  -> Flujo Móvil Onboarding QuickStart (8 pantallas en <5 min)
/agendo/reservar/:businessSlug      -> Página Pública de Reservas con Horarios en Tiempo Real e Insignia Viral

# CASO C: SOL DE CASA (LEAD GEN)
/sol-de-casa                        -> Vista Unificada (Pestañas S1 Finanzas vs S2 Growth)
/sol-de-casa/growth                 -> Panel Administrativo de Andrés Villalobos (Capacidad, Regla $300)
/sol-de-casa/familia/:familyCode    -> Portal Familiar "Mi Ahorro Solar" (Ahorro mensual, acumulado, tarjeta)
/sol-de-casa/ahorro/:referralCode   -> Landing Pública del Vecino (Calculadora solar y solicitud de visita)

# HERRAMIENTAS GLOBALES SESIÓN 1
/calculadoras                       -> Calculadoras Unit Economics (Nivel 1)
/tableros                           -> Tableros Interactivos (Nivel 2)
/simuladores                        -> Simuladores de Caja 24M (Nivel 3)
/escenarios                         -> Comparador Multi-Escenario
/reportes                           -> Exportación Excel y PDF
/configuracion                      -> Ajuste de Supuestos Base
```

---

## 3. ARQUITECTURA DE DATOS Y PERSISTENCIA

### Capa de Persistencia (`growthStorageService.js`):
El sistema utiliza almacenamiento local (`localStorage`) particionado por claves aisladas, permitiendo que un reinicio en demostración de Tueste no afecte las reservas de Agendo ni los prospectos de Sol de Casa:
- `decisionlab_growth_tueste_v2`: Estado del cliente activo (Camila Rossi), historial de amigos invitados, órdenes simuladas y métricas del embudo.
- `decisionlab_growth_agendo_v2`: Datos de la barbería (El Galán), catálogo de servicios, turnos, citas reservadas (con prevención estricta de solapamiento horario) y métricas de activación.
- `decisionlab_growth_sol_v2`: Familias instaladas (Familia Mora Calvo, Familia Solano), producción horaria e histórico de 12 meses, solicitudes de visitas técnicas y capacidad.
- `decisionlab_growth_channels_v2`: Matrices de canales a 90 días (Paid / Owned / Earned).

---

## 4. MOTORES DE CÁLCULO (GROWTH ENGINES)

### 1. `evaluateTuesteRewards` (`growthEngines.js`):
Calcula el costo esperado por referido prorrateando los premios por hitos:
$$\text{Costo Invitador / Ref} = \frac{\text{Costo Facial del Premio}}{\text{Requisito de Amigos}}$$
$$\text{CAC Referidos} = \text{Costo Premio Amigo} + \text{Costo Invitador / Ref}$$
Bloquea el guardado si $\text{CAC Referidos} > \$25.00$.

### 2. `evaluateAgendoQuickStart` (`growthEngines.js`):
Modela la conversión disyuntiva por segmento sin doble conteo:
$$\text{Clientes Pagados Ads} = \sum (\text{Trials en Segmento} \times \text{Tasa Conversión Segmento})$$
$$\text{CAC Paid Real} = \frac{\text{Pauta } (\$10,000) + \text{Sueldo Mariela } (\$1,200) + \text{Comisiones } (\$20 \times \text{Pagados})}{\text{Clientes Pagados Ads}}$$

### 3. `evaluateSolDeCasaRewards` (`growthEngines.js`):
Modela el costo operativo obligatorio de visitas técnicas previas al cierre:
$$\text{Tasa Lead a Venta} = 0.95 \times 0.85 \times 0.90 \times 0.45 = 32.69\%$$
$$\text{Visitas Realizadas por Venta} = \frac{1}{0.45} = 2.2222 \text{ visitas}$$
$$\text{Costo Esperado de Visitas} = 2.2222 \times \$60.00 = \$133.33$$
$$\text{Presupuesto Máximo para Premios} = \$300.00 - \$133.33 = \$166.67$$

---

## 5. DIAGRAMA DE COMPONENTES REACT

```
[AppRoutes.jsx]
   ├── [Sidebar.jsx] (Navegación Unificada)
   ├── [Header.jsx]
   ├── [Dashboard.jsx]
   ├── [GrowthCenter.jsx] (Ciclos Interactivos)
   │      └── [GrowthOnePager.jsx] (14 Puntos Rúbrica)
   ├── Casos (Toggle Sesión 1 / Sesión 2):
   │      ├── [Tueste.jsx] <---> [TuesteGrowthHub.jsx]
   │      │                         ├── [TuesteRewardsConfig.jsx]
   │      │                         ├── [TuesteReferralCustomerView.jsx]
   │      │                         └── [TuesteReferralPublicLanding.jsx]
   │      ├── [Agendo.jsx] <---> [AgendoGrowthHub.jsx]
   │      │                         ├── [AgendoOnboardingWizard.jsx]
   │      │                         ├── [AgendoPublicBooking.jsx]
   │      │                         └── [AgendoBadgeModal.jsx]
   │      └── [SolDeCasa.jsx] <-> [SolDeCasaGrowthHub.jsx]
   │                                ├── [SolDeCasaRewardsConfig.jsx]
   │                                ├── [SolDeCasaFamilyPortal.jsx]
   │                                └── [SolDeCasaNeighborLanding.jsx]
   └── [ChannelMatrix90Days.jsx]
```

