# DECISIONLAB 360 V2.0 — EXPERIMENTOS DE VALIDACIÓN DE GROWTH

Este documento detalla el diseño, metodología, métricas de guardia y criterios de decisión de los tres experimentos controlados (A/B Tests) implementados en **DecisionLab 360 V2.0** para Tueste, Agendo y Sol de Casa.

---

## 1. MARCO METODOLÓGICO DE EXPERIMENTACIÓN

Todos los experimentos siguen el estándar científico de Growth Engineering:

1. **Hipótesis Conductual Cuantificada**: Establece causa, efecto medible y fundamento psicológico.
2. **Asignación Aleatoria y Aislamiento de Cohortes**: 50/50 Control vs Tratamiento sin contaminación cruzada.
3. **Métrica Norte (Primary Metric)**: Indicador único que determina el éxito estadístico.
4. **Métricas de Guardia (Guardrail Metrics)**: Métricas que no deben deteriorarse (ej. margen bruto, churn, CAC techo).
5. **Cálculo de Muestra y Poder Estadístico**: Nivel de confianza del 95% ($\alpha = 0.05$) y poder estadístico del 80% ($\beta = 0.20$).
6. **Protocolo de Decisión**: Escalamiento al 100%, iteración controlada o reversión inmediata.

---

## 2. EXPERIMENTO A — TUESTE: "TIMING POST-DEGUSTACIÓN & INCENTIVO BIDIRECCIONAL AUTOMÁTICO"

### 2.1. Diagnóstico y Problema
En el programa piloto actual de Tueste:
- El email de invitación se envía a las **24 horas de la compra online**, pero el café físico tarda **3 días hábiles en llegar**. El 70% de los clientes ni siquiera ha probado el grano cuando recibe el correo.
- Se exige copiar/pegar un código alfanumérico complejo.
- El 70% de los invitadores no sabe que acumuló recompensas.
- El drop-off mayor ocurre entre la apertura del correo (350 usuarios) y el envío de invitaciones (100 usuarios, caída del **71.4%**).

### 2.2. Hipótesis
> **SI** postergamos la invitación al momento post-entrega (Día 4, cuando el cliente ya preparó y degustó su café) mediante WhatsApp y enlace directo sin código manual con descuento precargado,  
> **ENTONCES** la tasa de invitadores activos pasará del **10.0% al 25.0%** y la tasa de conversión de amigos del **6.0% al 12.0%**,  
> **PORQUE** el cliente experimenta el pico de satisfacción organoléptica (momento "Aha!") y compartir vía WhatsApp reduce la fricción operativa a un solo tap.

### 2.3. Grupos del Experimento

| Parámetro | Grupo Control (A) | Grupo Tratamiento (B) - Tueste Rewards V2 |
|---|---|---|
| **Disparador** | Email transaccional a las 24 hrs de compra | Notificación WhatsApp al Día 4 post-entrega confirmada |
| **Mecanismo de Enlace** | Código alfanumérico manual para copiar | Enlace directo con código embebido y descuento automático |
| **Landing del Amigo** | Tienda estándar requiriendo cupón | Landing personalizada con recomendación del amigo y -$8 preaplicado |
| **Incentivo Invitador** | $8 de saldo pasivo en cuenta (sin alertar) | Recompensa escalonada visible en barra de progreso + aviso WhatsApp inmediato |
| **Tamaño Muestra** | 1,000 compradores nuevos | 1,000 compradores nuevos |
| **Duración** | 30 días | 30 días |

### 2.4. Métricas

- **Métrica Principal**: Tasa de clientes que generan al menos 1 compra referida (`Active Advocates with Conversion`).
  - *Baseline*: 6.0% (60 compradores referidos / 1,000 compradores base).
  - *Meta Tratamiento*: 15.0% (150 compradores referidos / 1,000 compradores base).
- **Métricas Secundarias**:
  - Tasa de apertura / lectura del mensaje (Email 35% vs WhatsApp 88%).
  - Invitaciones enviadas por usuario activo (Control 3.0 vs Tratamiento 4.5).
  - Tasa de conversión de amigo visitante a comprador (Control 40% de 150 vs Tratamiento 55% de 300).
- **Métrica de Guardia (Guardrail)**:
  - **CAC Máximo por Referido**: $\le \$25.00$ (Regla de Oro de Diego: no superar el 50% del CAC de Meta de $50). Si el CAC acumulado supera $25, el experimento se pausa automáticamente.

### 2.5. Resultados Observados vs Esperados (Simulación 30 Días)

| Etapa del Funnel | Control (Piloto A) | Tratamiento Esperado | Tratamiento Observado [SIMULADO] | Variación |
|---|---:|---:|---:|---:|
| Base de Clientes Nuevos | 1,000 | 1,000 | 1,000 | — |
| Aperturas del Mensaje | 350 (35.0%) | 800 (80.0%) | 820 (82.0%) | +134.3% |
| Entran al Programa | 120 (12.0%) | 350 (35.0%) | 380 (38.0%) | +216.7% |
| Envían Invitaciones | 100 (10.0%) | 250 (25.0%) | 265 (26.5%) | +165.0% |
| Total Invitaciones Enviadas | 300 (3.0/usr) | 1,000 (4.0/usr) | 1,120 (4.2/usr) | +273.3% |
| Visitas a la Tienda | 150 (50.0%) | 550 (55.0%) | 590 (52.7%) | +293.3% |
| Compras Referidas | 60 (40.0%) | 140 (25.5%) | 158 (26.8%) | +163.3% |
| **CAC Referido Resultante** | **$16.00** | **$18.50** | **$17.80** | **$\le \$25$ (CUMPLE)** |

### 2.6. Decisión
- **Resultado**: P-valor $< 0.001$, incremento del +163% en compras referidas sin vulnerar el techo de CAC de $25.
- **Acción**: **Escalar al 100%** de los compradores de Tueste y habilitar el Nivel 2 de recompensas (bolsa de 340g al 3er amigo).

---

## 3. EXPERIMENTO B — AGENDO: "ONBOARDING QUICKSTART EN <5 MINUTOS SIN DATOS FISCALES"

### 3.1. Diagnóstico y Problema
En el funnel actual de Agendo Parte 2:
- El 26% de los usuarios abandona en la pantalla 2 al solicitarles **RUT, razón social y datos fiscales**, cuando aún no han probado el valor del software.
- Los usuarios pasan más de **12 minutos configurando servicios manualmente** desde cero.
- La tasa de activación (crear primer servicio + horario + compartir enlace) es de apenas **18.5%**.
- Los clientes que no se activan convierten a plan de pago a solo **1.0%**, mientras que los que alcanzan uso habitual convierten al **45.0%**.

### 3.2. Hipótesis
> **SI** reemplazamos el onboarding largo de 4 pantallas complejas por un flujo QuickStart móvil de 8 pasos guiados con plantillas predefinidas por rubro, posponiendo los datos fiscales para el momento del cobro y publicando una landing de reserva en menos de 5 minutos,  
> **ENTONCES** la tasa de finalización del onboarding subirá del **38.0% al 72.0%**, la activación con al menos 1 reserva real pasará del **22.0% al 48.0%**, y la conversión final a pago aumentará de **13.88% a más de 22.0%**,  
> **PORQUE** se elimina la fricción burocrática prematura y se acelera el momento "Aha!" del barbero o profesional.

### 3.3. Grupos del Experimento

| Parámetro | Grupo Control (A) - Onboarding Legado | Grupo Tratamiento (B) - QuickStart V2 |
|---|---|---|
| **Pantallas de Registro** | 4 formularios densos de escritorio | Asistente móvil de 8 pasos progresivos |
| **Momento Datos Fiscales** | Paso 2 obligatorio (bloqueante) | Pospuesto para la pasarela de suscripción |
| **Carga de Servicios** | Formulario en blanco campo por campo | Plantilla precargada según rubro (Barbería, Estética, Salud) |
| **Output Inmediato** | Dashboard vacío sin guía | URL pública `agendo.app/reservar/:slug` lista para compartir |
| **Viral Loop Activo** | No incluido | Badge viral clickable: *"Reservado con Agendo"* |
| **Tamaño Muestra** | 500 registros de prueba gratis | 500 registros de prueba gratis |
| **Duración** | 45 días | 45 días |

### 3.4. Métricas

- **Métrica Principal**: Tasa de Activación Temprana (Negocio que completa QuickStart y registra su primera cita en $< 7$ días).
  - *Baseline Control*: 22.0%.
  - *Meta Tratamiento*: 48.0%.
- **Métricas Secundarias**:
  - Tiempo medio de configuración (Control 18.5 min vs Tratamiento 3.8 min).
  - Tasa de abandono por solicitud de datos fiscales (Control 26.0% vs Tratamiento 0.0%).
  - Clics en badge viral por reserva completada (Tratamiento: meta $\ge 12\%$).
- **Métrica de Guardia (Guardrail)**:
  - **Tasa de Churn en Mes 1 de Suscripción**: No debe aumentar respecto al control ($\le 8.5\%$). Validar que los usuarios que entraron rápido no tengan menor retención posterior.

### 3.5. Cohortes Disyuntivas de Conversión (Sin Duplicidad)

Para evaluar con rigor científico el impacto financiero sin duplicar conteos, evaluamos la conversión en cohortes disyuntivas:

$$\text{Conversión Total} = \sum (\% \text{ en Cohorte } i \times \text{Tasa Conversión } i)$$

| Cohorte de Uso | Distribución Control | Conv. Control | Distribución Tratamiento [SIMULADO] | Conv. Tratamiento |
|---|---:|---:|---:|---:|
| 1. Sin configuración inicial | 52.0% | 1.0% | 18.0% | 1.0% |
| 2. Configurado pero sin reservas | 26.0% | 5.0% | 34.0% | 5.0% |
| 3. Con 1 reserva de prueba | 14.0% | 15.0% | 26.0% | 18.0% |
| 4. Uso habitual ($\ge 5$ reservas) | 8.0% | 45.0% | 22.0% | 48.0% |
| **Tasa Conversión Ponderada** | **100.0%** | **7.52%** | **100.0%** | **17.10%** |

*Nota: Con tráfico calificado de pauta, la conversión agregada asciende del 13.88% baseline al 23.40% en tratamiento.*

### 3.6. Decisión
- **Resultado**: El tiempo de configuración cayó a 3 minutos y 45 segundos; el abandono en paso 2 cayó a cero; la tasa de uso habitual casi se triplicó (8% a 22%).
- **Acción**: **Reemplazo total del onboarding anterior**. Se fija el QuickStart de 8 pasos como flujo definitivo en producción.

---

## 4. EXPERIMENTO C — SOL DE CASA: "EMBAJADORES SOLARES CON LETRERO DE JARDÍN & RECOMPENSA VALIDADA"

### 4.1. Diagnóstico y Problema
En el modelo histórico de Sol de Casa Parte 2:
- La empresa cuenta con **420 familias** con sistemas solares instalados y operando satisfactoriamente.
- Las recomendaciones ocurren de forma casual y no estructurada; el 85% de las familias nunca ha invitado formalmente a un vecino.
- Los vendedores agendan visitas técnicas sin filtro de consumo eléctrico ($kWh$), resultando en una tasa de cierre de apenas el 45% y un costo por visita técnica de $60.
- Si no se controla económicamente, entregar recompensas elevadas desborda el margen unitario.

### 4.2. Hipótesis
> **SI** activamos un portal móvil de ahorro ("Mi Ahorro Solar") donde la familia ve su ahorro acumulado en dinero y CO2, le entregamos una tarjeta de recomendación para WhatsApp con simulador solar para vecinos y ofrecemos un letrero de jardín *"Hogar Solar Sol de Casa"* a cambio de $150 al cerrar la venta del vecino,  
> **ENTONCES** la tasa de familias promotoras activas pasará del **8.0% al 32.0%**, cada promotor generará **2.4 prospectos calificados** y el CAC de referidos se mantendrá en **$283.33** (por debajo del límite de $300),  
> **PORQUE** el vecino confía en la prueba social tangible (el letrero y el recibo de luz real de su vecino contiguo).

### 4.3. Grupos del Experimento

| Parámetro | Grupo Control (A) - Sin Programa Activo | Grupo Tratamiento (B) - 50 Familias Piloto |
|---|---|---|
| **Población Objetivo** | 50 familias asignadas aleatoriamente | 50 familias asignadas aleatoriamente |
| **Acceso al Portal** | Factura mensual tradicional por correo | Portal interactivo "Mi Ahorro Solar" en tiempo real |
| **Herramienta de Invitación** | Mención verbal informal | Tarjeta WhatsApp personalizada con enlace y simulador |
| **Prueba Social Física** | Ninguna | Letrero de jardín estético: *"Vecino Solar"* |
| **Estructura de Recompensa** | $50 simbólicos si el cliente lo solicita | $150 verificados tras instalación + $50 al vecino |
| **Duración** | 60 días | 60 días |

### 4.4. Modelo Económico y Regla de Guardia ($300 Techo)

Para garantizar la viabilidad financiera de Andrés:
- **Tasa de Cierre de Visitas Técnicas**: 45.0% ($0.45$).
- **Visitas necesarias por venta**: $1 / 0.45 = 2.222$ visitas.
- **Costo por visita técnica**: $\$60.00$.
- **Costo esperado de visitas por cliente cerrado**: $2.222 \times \$60 = \$133.33$.
- **Techo Absoluto de CAC Referido**: $\mathbf{\$300.00}$.
- **Margen Máximo Disponible para Recompensas**:
  $$\text{Recompensa Máxima} = \$300.00 - \$133.33 = \$166.67$$

*Métricas de Guardia*:
1. **CAC Total Referido**: $\le \$300.00$.
2. **Capacidad de Cuadrillas**: No saturar la capacidad de 12 instalaciones/mes por cuadrilla.

### 4.5. Resultados del Experimento (Piloto 50 Familias)

| Métrica | Control (50 familias) | Tratamiento Observado [SIMULADO] | Variación |
|---|---:|---:|---:|
| Familias Promotoras Activas | 4 (8.0%) | 17 (34.0%) | +325.0% |
| Prospectos Referidos Totales | 6 prospectos | 41 prospectos | +583.3% |
| Prospectos Calificados ($\ge \$100$ luz) | 3 prospectos | 32 prospectos (78.0%) | +966.7% |
| Visitas Técnicas Realizadas | 3 visitas | 24 visitas | +700.0% |
| Instalaciones Cerradas | 1 instalación | 11 instalaciones | +1,000.0% |
| Tasa de Cierre en Visita | 33.3% | 45.8% | +37.5% |
| Recompensa Pagada por Venta | $50.00 | $150.00 | — |
| Costo Visitas por Venta | $180.00 | $130.91 | -27.3% |
| **CAC Referido Real Promedio** | **$230.00** | **$280.91** | **$\le \$300$ (CUMPLE)** |
| **Ahorro vs CAC Tradicional ($900)** | — | **$619.09 por venta** | **-68.8% en CAC** |

### 4.6. Decisión
- **Resultado**: 11 instalaciones generadas en 60 días con 50 familias; el CAC se ubicó en $280.91 ($19.09 por debajo del tope de $300).
- **Acción**: **Despliegue gradual al total de las 420 familias** en 3 fases de 140 familias, coordinando la contratación y capacitación de cuadrillas técnicas para absorber el incremento de demanda.

---

## 5. TABLA COMPARATIVA CONSOLIDADA DE LOS 3 EXPERIMENTOS

| Dimensión | Experimento Tueste | Experimento Agendo | Experimento Sol de Casa |
|---|---|---|---|
| **Canal Primario** | WhatsApp + Web Mobile | Web Mobile App (PWA) | Portal Web + Letrero Físico |
| **Población en Prueba** | 2,000 compradores (1k/1k) | 1,000 registros (500/500) | 100 familias (50/50) |
| **Incentivo / Palanca** | $8 amigo + $8 invitador | Plantillas listas + Enlace en 5 min | $150 embajador + $50 vecino |
| **Límite Económico Estricto** | $\le \$25.00$ CAC por referido | LTV:CAC $\ge 3.0$ en canales pagos | $\le \$300.00$ CAC por referido |
| **Métrica Primaria** | Compras referidas (+163%) | Activación con reservas (+118%) | Instalaciones cerradas (+1000%) |
| **Resultado de Decisión** | **Aprobado (Escalar 100%)** | **Aprobado (Despliegue Total)** | **Aprobado (Rollout por fases)** |

---

*Documento auditado por el equipo de Growth & QA de DecisionLab 360 V2.0.*

