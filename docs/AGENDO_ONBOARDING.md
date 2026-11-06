# AGENDO QUICKSTART · ONBOARDING & ACTIVACIÓN (CASO B)
**Rediseño de Puesta en Marcha, Momento Aha y Loop Viral de la Insignia**
*Especialista en UX/UI & Desarrollador Senior React*

---

## 1. CONTEXTO Y DIAGNÓSTICO DEL ONBOARDING ANTERIOR
Ricardo (inversor) solicitó a Valeria que no triplicara el gasto publicitario hasta comprender por qué tantos negocios inician la prueba gratuita de 14 días y no pagan. Mariela (responsable de ventas) llamó a 30 negocios registrados en la semana: **8 no habían vuelto a entrar porque se quedaron bloqueados cuando el sistema les exigió cédula jurídica y régimen fiscal**.

Por el contrario, los negocios que recibieron su primera reserva por el enlace no abandonaban la plataforma.

---

## 2. AUDITORÍA DEL PROCESO ANTERIOR (POR CADA 100 TRIALS)
| Pantalla Tradicional | Qué Exigía | Llegan | Terminan | Tiempo Promedio | Diagnóstico de Fricción |
|---|---|---:|---:|---:|---|
| **1. Datos Fiscales** | Cédula, razón social, régimen | 100 | 74 | 4 min | **26% de abandono inmediato**. Datos fiscales innecesarios durante el trial. |
| **2. Datos del Negocio** | Dirección, fotos, redes | 74 | 70 | 3 min | Fricción al pedir fotos que el barbero no tiene a mano. |
| **3. Servicios** | Carga manual uno a uno | 70 | 65 | 12 min | **12 minutos perdidos**. Una barbería carga 9 servicios en promedio. |
| **4. Horarios** | Horario por barbero y día | 65 | 62 | 9 min | Configuración compleja. Mariela recibe 40 chats/semana por horarios. |
| **5. «¡Listo!»** | Enhorabuena y menú principal | 62 | 62 | 0.5 min | Enlace escondido dentro de Configuración > Mi página. |
| **6. Compartir Link** | Búsqueda manual del link | 62 | 30 | 24 h | **Sin botón de compartir**. Solo 30 de cada 100 lo envían el primer día. |

### Consecuencias en los 14 Días de Prueba:
- De los 30 que comparten su link el Día 1: **27 reciben al menos una reserva** (90%).
- De los 32 que no comparten el Día 1: solo 11 reciben una reserva (34.4%).
- Total que reciben primera reserva: 38 de 100.
- **Alcanzan Uso Habitual (≥20 citas en 14 días)**: **22 de cada 100 trials**.

### Conversión a Pago Disyuntiva por Segmento:
- No configuraron (38 trials): 1% paga $\rightarrow$ 0.38 clientes.
- Configuraron sin reservas (24 trials): 5% paga $\rightarrow$ 1.20 clientes.
- Recibieron 1ra reserva (16 trials): 15% paga $\rightarrow$ 2.40 clientes.
- **Alcanzaron uso habitual (22 trials)**: **45% paga $\rightarrow$ 9.90 clientes**.
- Total Clientes Pagados: **13.88% (Baseline de 14 clientes por cada 100 trials)**.

### Retención a los 6 Meses:
- Clientes con uso habitual: **80% continúan activos**.
- Demás clientes: solo **35% continúan activos**.

---

## 3. REDISEÑO: FLUJO AGENDO QUICKSTART (<5 MIN, MÓVIL)
El 81% de los barberos se registra desde su teléfono celular. El nuevo flujo consta de 8 pantallas fluidas sin fricción tributaria:

1. **Pantalla 1 — Bienvenida**: Promesa clara: *«Consigue más clientes para tu barbería con Agendo»*. Explicación de los 14 días de prueba gratis sin tarjeta.
2. **Pantalla 2 — Datos Esenciales**: Nombre del negocio, nombre del responsable, WhatsApp y ubicación. Cero datos fiscales.
3. **Pantalla 3 — Plantillas de Servicios**: Servicios precargados habituales ($8 a $15): Corte Clásico ($12 / 30m), Barba ($8 / 20m), Combo Completo ($15 / 45m), editables en un toque.
4. **Pantalla 4 — Horarios Rápidos**: Horario de apertura, cierre y días de atención predeterminados con selección de barberos.
5. **Pantalla 5 — Página de Reservas Generada**: Vista previa real con URL pública (`/agendo/reservar/:businessSlug`).
6. **Pantalla 6 — Compartir 1-Tap**: Botón directo de WhatsApp con mensaje listo para enviar a sus clientes: *«¡Ya puedes reservar tu próximo corte en [Barbería]! Reserva aquí: [enlace]»*.
7. **Pantalla 7 — Primera Reserva (Momento Aha)**: Simulación interactiva de entrada de la primera cita por el enlace con notificación de éxito.
8. **Pantalla 8 — Activación**: Tablero con meta clara de alcanzar 20 citas en 14 días para asegurar la retención.

---

## 4. PÁGINA PÚBLICA DE RESERVAS Y PREVENCIÓN DE CONFLICTOS
- **Ruta**: `/agendo/reservar/:businessSlug`
- **Características**:
  - Consulta de servicios, barberos disponibles, selector de fecha y turnos de 30 minutos.
  - **Prevención de Citas Duplicadas**: El sistema valida en tiempo real y bloquea turnos ya reservados para el mismo barbero en la misma fecha y hora.
  - Registro inmediato de la reserva simulada en `growthStorageService`.

---

## 5. LA NUEVA INSIGNIA VIRAL «RESERVADO CON AGENDO»
Cada página de reservas recibe **250 visitas al mes** de clientes de la barbería.
La insignia anterior solo decía el nombre y no permitía clics. La nueva insignia interactiva dice:
*«Reservado con Agendo — Crea tu página de reservas gratis»*.
Al hacer clic, abre un modal que explica las ventajas para barberías y permite iniciar un trial asociando el slug de la barbería origen.
- **Resultado proyectado**: De 8 barberías orgánicas mensuales a **28-35 barberías nuevas al mes sin costo publicitario**.

