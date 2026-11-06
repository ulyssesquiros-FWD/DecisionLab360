# SOL DE CASA · COMUNIDAD SOLAR Y AHORRO COMPARTIDO (CASO C)
**Portal de Familias, Tarjeta Compartible, Calculadora Solar del Vecino y Límite Económico de $300**
*Analista Financiero Senior & Especialista en Growth Marketing*

---

## 1. CONTEXTO Y DIAGNÓSTICO
Andrés Villalobos no aceptó trasladar todo el presupuesto a Meta Ads. Paola (asesora comercial) le comunicó que doña Marta de Curridabat llamó porque vio un letrero en el jardín de su vecina y solicitó directamente una medición de techo sin preguntar el precio.

Sol de Casa cuenta con **420 familias que ya tienen paneles instalados**:
- **75% de las familias no sabía cuánto ahorró el mes anterior** (encuesta a 60 clientes).
- **40% le enseñó espontáneamente su recibo de luz a un vecino o familiar**.
- **8% refiere una familia a Sol de Casa al año de manera pasiva**.
- **0 mensajes recibe una familia después de la instalación**.

Los paneles se compran una vez cada 15 a 20 años; la dependencia exclusiva de anuncios pagados mantenía un CAC de Meta disparado en **$718.13**.

---

## 2. PORTAL FAMILIAR «MI AHORRO SOLAR»
- **Ruta**: `/sol-de-casa/familia/:familyCode`
- **Economía del Hogar Solar**:
  - Recibo de luz anterior promedio: **$110.00 mensuales**.
  - Ahorro promedio garantizado: **70%**.
  - **Ahorro mensual generado: $77.00/mes**.
  - **Ahorro anual estimado: $924.00/año**.
  - Precio de instalación promedio: **$6,500.00**.
  - Periodo de recuperación simple (Payback): **~7.0 años** ($6,500 ÷ $924).
- **Funcionalidades del Portal**:
  - Desglose de factura anterior vs factura solar actual ($33/mes).
  - Ahorro mensual y ahorro acumulado histórico.
  - Selector interactivo de meses con gráfico de producción en kWh y dólares ahorrados.
  - Arquitectura preparada para importar reportes horarios del inversor inteligente sin inventar APIs ficticias.
  - Módulo de recompensas activas ganadas por referidos de vecinos.

---

## 3. TARJETA DE AHORRO COMPARTIDO (REQUERIMIENTO 6.3)
Componente visual con identidad de Sol de Casa diseñado para compartir por WhatsApp o descargar:
- Nombre de la familia (ej: *Familia Mora Calvo*).
- Cifra real de ahorro mensual ($80.50) y acumulado ($966.00).
- Porcentaje de reducción (70%).
- Enlace personal de referido (`/sol-de-casa/ahorro/:referralCode`).
- Mensaje pre-redactado listo para enviar a vecinos.

---

## 4. PÁGINA PÚBLICA DEL VECINO Y CALCULADORA SOLAR
- **Ruta**: `/sol-de-casa/ahorro/:referralCode`
- **Calculadora Solar Interactiva**:
  - El vecino introduce su factura mensual de electricidad (ej: $110/mes).
  - Cálculo inmediato:
    $$\text{Ahorro Mensual} = \text{Factura} \times 0.70$$
    $$\text{Ahorro Anual} = \text{Ahorro Mensual} \times 12$$
    $$\text{Tiempo de Recuperación} = \frac{\$6,500}{\text{Ahorro Anual}} \text{ (en años)}$$
  - Advertencia formal: *Estimación referencial con fines ilustrativos basada en datos del caso; no constituye una cotización vinculante.*
- **Formulario de Agendamiento de Visita Técnica**:
  - Nombre, teléfono, correo, dirección, fecha preferida y horario.
  - Registra el código de referido familiar para acreditar las recompensas.

---

## 5. LÍMITE ECONÓMICO INQUEBRANTABLE ($300 MAX)
Regla de Andrés: Sumando todas las recompensas pagadas y el costo de las visitas técnicas necesarias para cerrar la venta, un cliente adquirido por referidos **no puede costar más de $300.00**.

### Desglose Probabilístico Forense:
- Embudo histórico de referidos:
  - Tasa de Contacto: **95%**.
  - Agendan Visita: **85%** de los contactados.
  - Visita Realizada: **90%** de las agendadas.
  - Tasa de Cierre en Visita: **45%**.
- Tasa neta de lead a venta: $0.95 \times 0.85 \times 0.90 \times 0.45 = \mathbf{32.69\%}$.
- **Visitas técnicas realizadas por venta cerrada**:
  $$\text{Visitas por Venta} = \frac{1}{\text{Tasa de Cierre } (0.45)} = \mathbf{2.2222 \text{ visitas}}$$
- Costo por visita técnica realizada: **$60.00**.
- **Costo Operativo Esperado de Visitas por Venta Cerrada**:
  $$\text{Costo Esperado Visitas} = 2.2222 \times \$60.00 = \mathbf{\$133.33}$$
- **Presupuesto Máximo Disponible para Premios**:
  $$\text{Presupuesto Premios} = \$300.00 - \$133.33 = \mathbf{\$166.67}$$

### Estructura de Recompensas Aprobada:
- Recompensa por Instalación Firmada: **1 Año de Mantenimiento y Limpieza Profesional Gratis** ($12/mes × 12 meses = **$144.00**).
- **Costo Total Adquisición Referido**:
  $$\text{CAC Referidos} = \$133.33 \text{ (visitas)} + \$144.00 \text{ (premio)} = \mathbf{\$277.33} \quad (\le \$300.00 \text{ ¡Cumple la Regla de Andrés!})$$

---

## 6. CAPACIDAD TÉCNICA Y MODELO DE LETREROS
- Capacidad actual de 2 técnicos: **100 visitas mensuales**.
- Técnico adicional: **+50 visitas mensuales** con costo salarial de **$1,800/mes**.
- Leads referidos necesarios para llenar 50 visitas adicionales:
  $$\text{Leads Requeridos} = \frac{50}{0.95 \times 0.85 \times 0.90} = \frac{50}{0.72675} = \mathbf{68.8 \approx 69 \text{ leads}}$$
- **Extrapolación del Rendimiento del Letrero (Hipótesis Explícita)**:
  - 20 letreros generaron 6 leads en 2 meses = 0.15 leads por casa al mes.
  - Familias necesarias bajo esta tasa: $68.8 ÷ 0.15 = \mathbf{459 \text{ familias}}$.
  - *Conclusión Estratégica*: Activar a las 420 familias bajo una dinámica digital activa es fundamental para alcanzar esta tracción sin saturar la estructura fija de técnicos antes de tiempo.

---

## 7. DEFINICIÓN DE RETENCIÓN EN ENERGÍA SOLAR
Dado que los paneles solares tienen un ciclo de reemplazo de 15 a 20 años, la retención **no se mide por la recompra de paneles**, sino por la **relación continua**:
- Familias que consultan su ahorro mensualmente en el portal.
- Familias que comparten su tarjeta de ahorro por WhatsApp.
- Familias que generan referidos activos.
- Familias que mantienen contratado el plan de mantenimiento anual ($12/mes).
- **Indicador Semanal Clave**: *Familias Activas que Comparten su Ahorro al Menos 1 Vez al Mes (FAS)*.

