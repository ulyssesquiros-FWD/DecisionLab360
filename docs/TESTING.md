# DECISIONLAB 360 V2.0 — PROTOCOLO Y SUITE DE PRUEBAS

Este documento detalla la arquitectura de pruebas automatizadas y manuales de **DecisionLab 360 V2.0**, garantizando que el 100% de las funcionalidades financieras de la Sesión 1 se preservan intactas y que las nuevas soluciones de Growth de la Sesión 2 operan bajo estricto rigor económico y funcional.

---

## 1. RESUMEN EJECUTIVO DE CONTROL DE CALIDAD

- **Total de pruebas unitarias automatizadas**: **43 pruebas** (100% aprobadas).
  - **Sesión 1 (Motores Financieros)**: 27 pruebas (`tests/engines.test.js`).
  - **Sesión 2 (Motores de Growth & Restricciones Económicas)**: 16 pruebas (`tests/growthEngines.test.js`).
- **Tiempo de ejecución de la suite**: $< 1.5$ segundos.
- **Validación de compilación frontend**: `npm run build` aprobado sin errores de sintaxis ni de empaquetado (Vite 8 + React 19).
- **Validación de persistencia**: LocalStorage desacoplado con aislamiento por empresa y reset independiente.

---

## 2. COMANDOS DE PRUEBA

Para ejecutar la suite completa de pruebas automatizadas:

```bash
# Ejecutar toda la suite (Sesión 1 + Sesión 2)
npm test

# Ejecutar únicamente las 27 pruebas financieras de la Sesión 1
node tests/engines.test.js

# Ejecutar únicamente las 16 pruebas de Growth de la Sesión 2
node tests/growthEngines.test.js

# Compilar la aplicación y verificar que no existan errores de sintaxis
npm run build
```

---

## 3. DESGLOSE DE PRUEBAS UNITARIAS AUTOMATIZADAS

### 3.1. Sesión 1 — Motores Financieros (27 Pruebas)
Archivo: `tests/engines.test.js`

| ID | Módulo / Empresa | Caso de Prueba | Resultado |
|---|---|---|:---:|
| S1-01 | Tueste | Cálculo de CAC Blended considerando inversión de Meta y referidos | PASS |
| S1-02 | Tueste | Cálculo de LTV para clientes de pedidos sueltos con margen 40% | PASS |
| S1-03 | Tueste | Cálculo de LTV para suscriptores recurrentes considerando churn del 9% | PASS |
| S1-04 | Tueste | Proyección de flujo de caja a 24 meses y punto de equilibrio | PASS |
| S1-05 | Tueste | Análisis de sensibilidad ante variaciones de churn (+/- 3%) | PASS |
| S1-06 | Tueste | Cálculo de Payback Period en meses para cohortes de suscriptores | PASS |
| S1-07 | Tueste | Validación de margen de contribución por bolsa de 340g | PASS |
| S1-08 | Tueste | Ratio LTV:CAC por canal de adquisición | PASS |
| S1-09 | Agendo | Cálculo de CAC de pauta digital ($3,200 / 140 leads = $22.86) | PASS |
| S1-10 | Agendo | Conversión de prueba gratis a plan de pago (14%) | PASS |
| S1-11 | Agendo | Cálculo de CAC por cliente de pago ($163.27) | PASS |
| S1-12 | Agendo | Cálculo de LTV con ARPU $29 y churn mensual del 6% ($483.33) | PASS |
| S1-13 | Agendo | Ratio LTV:CAC global ($483.33 / $163.27 = 2.96x) | PASS |
| S1-14 | Agendo | Proyección de MRR y ARR a 24 meses con crecimiento compuesto | PASS |
| S1-15 | Agendo | Simulador de caja con costos fijos de servidores y soporte | PASS |
| S1-16 | Agendo | Impacto de reducción de churn de 6% a 4% en LTV (+50%) | PASS |
| S1-17 | Agendo | Payback period de Agendo en meses | PASS |
| S1-18 | Sol de Casa | Cálculo de CAC Tradicional ($45,000 pauta + comercial / 50 cierres = $900) | PASS |
| S1-19 | Sol de Casa | Tasa de cierre en visita técnica (45%) | PASS |
| S1-20 | Sol de Casa | Ticket promedio por instalación residencial ($4,800) | PASS |
| S1-21 | Sol de Casa | Margen bruto unitario por instalación (38% = $1,824) | PASS |
| S1-22 | Sol de Casa | Cálculo de LTV residencial con recomendaciones orgánicas | PASS |
| S1-23 | Sol de Casa | Ratio LTV:CAC tradicional ($1,824 / $900 = 2.03x) | PASS |
| S1-24 | Sol de Casa | Capacidad máxima mensual de instalaciones por cuadrilla (12) | PASS |
| S1-25 | Sol de Casa | Simulador de flujo de caja y capital de trabajo a 24 meses | PASS |
| S1-26 | Consolidado | Comparador cross-company de márgenes y periodos de retorno | PASS |
| S1-27 | Consolidado | Integridad de inputs y mitigación de división por cero | PASS |

### 3.2. Sesión 2 — Motores de Growth y Restricciones Económicas (16 Pruebas)
Archivo: `tests/growthEngines.test.js`

| ID | Módulo / Empresa | Caso de Prueba | Regla / Restricción Validada | Resultado |
|---|---|---|---|:---:|
| S2-01 | Tueste | Diagnóstico de Funnel Piloto | 1,000 recibidos $\rightarrow$ 60 compras (6.0% conversión) | PASS |
| S2-02 | Tueste | Detección del mayor abandono | Email a Envío (-71.4%) marcado como cuello de botella | PASS |
| S2-03 | Tueste | Cálculo del CAC Real de Meta | $(\$4,000 + \$1,000) / 100 = \mathbf{\$50.00}$ | PASS |
| S2-04 | Tueste | **Regla de Oro de Diego** | Techo máximo de referidos: $\mathbf{\$25.00}$ | PASS |
| S2-05 | Tueste | Desglose de Mes Gratis de Café | Costos directos: $\$16.58$, Ingreso no cobrado: $\$30.60$, Total: $\mathbf{\$47.18}$ | PASS |
| S2-06 | Tueste | Validador de Recompensas | Bloqueo estricto si Recompensa $> \$25.00$ para 1 compra | PASS |
| S2-07 | Tueste | Recompensa Escalonada Aprobada | Mes gratis condicionado a 3 suscriptores: $\$47.18 / 3 = \$15.73 \le \$25$ | PASS |
| S2-08 | Agendo | Diagnóstico de Fricción | Caída del 26% en pantalla fiscal + 12 min de configuración | PASS |
| S2-09 | Agendo | Cohortes Disyuntivas | Suma de probabilidades = 1.0; no hay doble conteo | PASS |
| S2-10 | Agendo | Recálculo de CAC Pagado | A mayor conversión (13.88% $\rightarrow$ 23.4%), CAC cae de $163 a $97 | PASS |
| S2-11 | Sol de Casa | Diagnóstico 420 Familias | Identificación de 420 familias con 85% de inactividad de referidos | PASS |
| S2-12 | Sol de Casa | Calculadora Solar | Ahorro del 70% en factura eléctrica mensual y payback en años | PASS |
| S2-13 | Sol de Casa | **Costo Esperado de Visitas** | $1 / 0.45 = 2.222$ visitas $\times \$60 = \mathbf{\$133.33}$ por venta | PASS |
| S2-14 | Sol de Casa | **Techo de Referidos de Andrés** | Límite estricto: $\mathbf{\$300.00}$; margen de recompensa: $\mathbf{\$166.67}$ | PASS |
| S2-15 | Sol de Casa | Validador de Recompensas | Bloqueo si (Recompensa Embajador + Vecino) $> \$166.67$ | PASS |
| S2-16 | Sol de Casa | Capacidad de Cuadrillas & FAS | Cuadrillas requeridas según demanda y métrica continua FAS | PASS |

---

## 4. CASOS DE PRUEBA MANUALES (PROTOCOLO DE PASO A PASO)

### 4.1. Caso A — Tueste Rewards
1. **Acceso al Panel del Invitador**:
   - Navegar a `/tueste/mi-programa`.
   - Verificar que se muestra el avatar y nombre ("Carlos Morales").
   - Verificar la presencia del código personal `CARLOS-CAFE`.
   - Presionar el botón *"Copiar Enlace"* $\rightarrow$ Comprobar toast/alerta de copiado exitoso.
   - Presionar *"Compartir por WhatsApp"* $\rightarrow$ Comprobar que se abre la URL con el texto preparado y el enlace.
2. **Acceso a la Landing Pública del Amigo**:
   - Navegar a `/tueste/referido/CARLOS-CAFE`.
   - Verificar que la página es responsiva (estilo móvil centrado).
   - Constatar que muestra: *"Carlos Morales te ha regalado $8 USD de descuento"*.
   - Comprobar que el café recomendado tiene precio original tachado ($22.00) y precio final con descuento ($14.00) **sin pedir códigos**.
3. **Flujo de Compra Simulada**:
   - Completar el formulario de demostración (Nombre, Email, Dirección).
   - Presionar *"Completar Compra y Reclamar Regalo"*.
   - Verificar la pantalla de confirmación con el resumen de la orden y tag `[SIMULADO]`.
4. **Verificación en Tiempo Real**:
   - Volver a `/tueste/mi-programa` $\rightarrow$ Verificar que aumentó el contador de amigos compradores y las recompensas acumuladas.
   - Navegar a `/tueste` (pestaña *Sesión 2: Growth*) $\rightarrow$ Comprobar que el panel administrativo de Diego refleja la nueva compra referida.
5. **Prueba de Límite Económico ($25)**:
   - En el Hub de Diego, ubicar la sección *Configurador de Recompensas*.
   - Intentar configurar una recompensa unitaria de $28.00.
   - **Resultado Esperado**: El sistema muestra una alerta en rojo: *"VIOLACIÓN: La recompensa excede el límite de $25.00"* y deshabilita el botón de activación.

### 4.2. Caso B — Agendo QuickStart
1. **Acceso al Asistente Móvil de Onboarding**:
   - Navegar a `/agendo/onboarding`.
   - Verificar que no solicita RUT, Razón Social ni datos fiscales en ninguna de las pantallas.
2. **Flujo de 8 Pasos**:
   - **Paso 1**: Nombre de la Barbería o Salón.
   - **Paso 2**: Selección de categoría (Barbería, Estética, Salud, etc.).
   - **Paso 3**: Carga de servicios usando plantilla automática (Corte clásico, Barba, etc.).
   - **Paso 4**: Configuración de duración y precio de cada servicio.
   - **Paso 5**: Selección de días y horarios de apertura.
   - **Paso 6**: Foto/logo del establecimiento.
   - **Paso 7**: Vista previa de la página pública de reservas.
   - **Paso 8**: Confirmación de lanzamiento en $< 5$ minutos y URL asignada (`/agendo/reservar/barberia-estilo-latam`).
3. **Página Pública de Reservas & Detección de Colisiones**:
   - Navegar a `/agendo/reservar/barberia-estilo-latam`.
   - Seleccionar un servicio (ej. "Corte de Cabello Premium - $25").
   - Seleccionar fecha y hora (ej. Mañana a las 10:00 AM).
   - Completar los datos del cliente y presionar *"Confirmar Cita"*.
   - Intentar volver a agendar en el mismo día a las 10:00 AM $\rightarrow$ **Resultado Esperado**: El sistema bloquea el horario como ocupado e impide la colisión.
4. **Viral Loop (Badge Interactivo)**:
   - En el pie de la página de reservas, verificar el badge *"Reservado con Agendo"*.
   - Hacer clic en el badge $\rightarrow$ Se abre el modal explicativo con CTA *"Crea tu agenda gratis en 5 minutos"* enlazando a `/agendo/onboarding`.
5. **Verificación en el Panel de Valeria**:
   - Navegar a `/agendo` (pestaña *Sesión 2: Growth*).
   - Verificar que el funnel disyuntivo y la conexión financiera reflejan la nueva reserva activa.

### 4.3. Caso C — Sol de Casa Comunidad Solar
1. **Portal Móvil de la Familia**:
   - Navegar a `/sol-de-casa/familia/FAM-420-SOL`.
   - Constatar los datos de la "Familia Gómez Herrera".
   - Cambiar los meses en el selector interactivo (Enero a Diciembre) $\rightarrow$ Verificar cómo se recalculan los kWh generados, el ahorro en USD y los kg de CO2 evitados.
   - Presionar *"Compartir Tarjeta Solar"* $\rightarrow$ Comprobar apertura del generador de mensaje para WhatsApp con enlace a la landing del vecino.
2. **Landing Pública del Vecino & Calculadora Solar**:
   - Navegar a `/sol-de-casa/ahorro/FAM-420-SOL`.
   - En el simulador solar interactivo, mover el control deslizante del recibo de luz (ej. $180 USD/mes).
   - **Comprobación de Fórmulas**:
     - *Ahorro mensual*: $\$180 \times 0.70 = \mathbf{\$126.00/mes}$.
     - *Ahorro anual*: $\$126 \times 12 = \mathbf{\$1,512.00/año}$.
     - *Retorno estimado (Payback)*: $\$4,800 / \$1,512 = \mathbf{3.17\text{ años}}$.
3. **Agendamiento de Visita Técnica Gratuita**:
   - Llenar el formulario con dirección del tejado y fecha preferida.
   - Presionar *"Solicitar Visita Técnica Sin Costo"*.
   - Verificar confirmación de visita asignada a la cuadrilla de la zona.
4. **Verificación del Techo Económico ($300)**:
   - Navegar a `/sol-de-casa` (pestaña *Sesión 2: Growth*).
   - En el panel de Andrés, ubicar el *Validador de Recompensas*.
   - Configurar Recompensa Embajador: $150, Recompensa Vecino: $50 (Total: $200).
   - **Resultado Esperado**: El validador suma el costo esperado de visitas ($133.33) + Recompensas ($200.00) = **$333.33**. Marca en rojo: *"VIOLACIÓN: Supera el límite de $300.00 por $33.33"*.
   - Ajustar a Embajador: $100, Vecino: $50 (Total: $150).
   - **Resultado Esperado**: Costo total = $133.33 + $150.00 = **$283.33 $\le \$300.00$** $\rightarrow$ Marca en verde: *"CUMPLE REGLA DE ANDRÉS"*.

---

## 5. MATRIZ DE COMPATIBILIDAD Y RESPONSIVIDAD

| Dispositivo / Pantalla | Vista Validada | Resultado de Renderizado |
|---|---|:---:|
| iPhone 13 / 14 / 15 (390px) | `/tueste/mi-programa` (Invitador) | 100% Adaptativo sin scroll horizontal |
| iPhone 13 / 14 / 15 (390px) | `/tueste/referido/:code` (Amigo) | Botones táctiles optimizados (min-h 48px) |
| Android Galaxy S22 (360px) | `/agendo/onboarding` (Wizard) | Flujo fluido de 8 pasos |
| Android Galaxy S22 (360px) | `/agendo/reservar/:slug` (Pública) | Selector horario táctil sin solapamiento |
| iPad Pro (1024px) | `/sol-de-casa/familia/:code` | Gráficos de Recharts escalados dinámicamente |
| Desktop Full HD (1920x1080) | `/crecimiento` (Growth Center) | Tableros de métricas y loops visuales en grid 3 columnas |
| Impresión / PDF | `/growth-one-pager` (Fichas 1 Pág) | Formato A4 limpio con saltos de página CSS |

---

*Protocolo de pruebas ejecutado y certificado el 6 de Noviembre de 2026 por el equipo QA de DecisionLab 360.*

