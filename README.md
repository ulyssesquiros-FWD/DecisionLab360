# DecisionLab 360
## Plataforma Integral de Análisis Financiero y Simulación Empresarial

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Unit%20Tests-27%2F27%20Passing-brightgreen.svg)](tests/engines.test.js)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**DecisionLab 360** es una plataforma web SaaS administrativa diseñada para resolver con total rigor matemático, financiero y estratégico los tres casos de estudio empresariales de la metodología de simulación de negocios:

1. **Caso A: Tueste** — E-commerce Direct-to-Consumer (DTC) de café de especialidad.
2. **Caso B: Agendo** — Software SaaS B2B de reservas y cobros para salones y barberías.
3. **Caso C: Sol de Casa** — Lead Generation de instalaciones de paneles solares residenciales.

A diferencia de aplicaciones puramente cosméticas o maquetas estáticas, **DecisionLab 360** cuenta con **tres motores financieros desacoplados y autónomos**, implementa los **tres niveles de profundidad analítica** exigidos por los comités de inversión, y audita las trampas metodológicas comunes generadas por herramientas de IA o agencias de marketing digital.

---

## 📑 Tabla de Contenidos

- [1. Estructura General del Sistema](#1-estructura-general-del-sistema)
- [2. Los Tres Casos Empresariales y sus Fórmulas](#2-los-tres-casos-empresariales-y-sus-fórmulas)
  - [Caso A: Tueste (DTC)](#caso-a-tueste-e-commerce-dtc)
  - [Caso B: Agendo (SaaS)](#caso-b-agendo-software-saas)
  - [Caso C: Sol de Casa (Lead Gen)](#caso-c-sol-de-casa-lead-gen)
- [3. Auditoría de las Tres Trampas Financieras](#3-auditoría-de-las-tres-trampas-financieras)
- [4. Los Tres Niveles de la Plataforma](#4-los-tres-niveles-de-la-plataforma)
  - [Nivel 1: Calculadoras Financieras](#nivel-1-calculadoras-financieras)
  - [Nivel 2: Tableros Interactivos Vivos](#nivel-2-tableros-interactivos-vivos)
  - [Nivel 3: Simulador de Caja a 24 Meses](#nivel-3-simulador-de-caja-a-24-meses)
- [5. Comparador de Escenarios y Recomendaciones](#5-comparador-de-escenarios-y-recomendaciones)
- [6. Exportaciones a Excel y PDF](#6-exportaciones-a-excel-y-pdf)
- [7. Verificación Manual Auditada del Mes 1](#7-verificación-manual-auditada-del-mes-1)
- [8. Arquitectura y Código Fuente](#8-arquitectura-y-código-fuente)
- [9. Instalación y Ejecución Local](#9-instalación-y-ejecución-local)

---

## 1. Estructura General del Sistema

La plataforma está diseñada bajo una interfaz SaaS moderna inspirada en herramientas corporativas globales:
- **Barra lateral (Sidebar)**: Acceso rápido a cada caso empresarial, niveles analíticos, matrices comparativas y centro de exportación.
- **Cabecera superior (Header)**: Breadcrumbs dinámicos, títulos de contexto, acceso a descargas y botón global para **«Restaurar Datos Originales»** desde LocalStorage.
- **Código desacoplado**: Lógica de cálculo 100% pura en JavaScript dentro del directorio `/src/Engines/`, separada por completo de los componentes visuales en `/src/Components/` y páginas en `/src/Pages/`.
- **Identidad visual por negocio**:
  - *Tueste*: Paleta ámbar, naranja tostado y café (`tueste-*`).
  - *Agendo*: Paleta azul cobalto, índigo y celeste (`agendo-*`).
  - *Sol de Casa*: Paleta amarillo solar, verde esmeralda y teal (`sol-*`).

---

## 2. Los Tres Casos Empresariales y sus Fórmulas

### Caso A: Tueste (E-commerce DTC)
- **Historia y Contexto**: Diego Ramírez comenzó tostando café en el garaje de su abuela; hoy trabaja con 6 fincas de Colombia, Perú y Guatemala, vendiendo en Shopify con 4.8 estrellas. Tienen $35,000 en el banco y su socia Camila advierte que el saldo cayó $3,200 en septiembre. La agencia *Impulso Digital* propone duplicar el gasto a $16,000 con 30% de descuento para Black Friday argumentando un ROAS de 3.0x.
- **Datos Unitarios**:
  - Bolsa de 340 g: $17.00.
  - Pedido típico: 2 bolsas ($34.00).
  - Suscripción mensual: $30.60 (10% de descuento en 2 bolsas).
  - Costo de café: $5.44 por bolsa ($10.88 por pedido de 2 bolsas; 32% del precio de lista, no varía con descuentos).
  - Envío pagado por Tueste: $4.50 por pedido.
  - Comisión de pasarela de pago: 4.5% de lo que paga el cliente.
  - Caja y empaque: $1.20 por pedido.
- **Fórmulas de Tueste**:
  1. $\text{Margen Pedido Suelto} = \$34.00 - \$10.88 - \$4.50 - (4.5\% \times \$34.00 = \$1.53) - \$1.20 = \mathbf{\$15.89}$ (Margen: **46.74%**).
  2. $\text{Margen Suscripción} = \$30.60 - \$10.88 - \$4.50 - (4.5\% \times \$30.60 = \$1.38) - \$1.20 = \mathbf{\$12.64}$ (Margen: **41.32%**).
  3. $\text{ROAS Break-even} = \frac{1}{\text{Margen \%}} = \frac{1}{0.4674} = \mathbf{2.14x}$.
  4. $\text{CAC Real con Agencia} = \frac{\$8,000 \text{ anuncios} + \$1,000 \text{ fee}}{165 \text{ clientes nuevos Meta}} = \mathbf{\$54.55}$.
  5. $\text{ROAS Real 1er Pedido} = \frac{165 \times \$34.00}{\$8,000} = \mathbf{0.70x}$ (¡Pérdida en primera compra!).
  6. $\text{LTV 12 Meses} = 0.85 \times (3 \times \$15.89) + 0.15 \times \left(\sum_{t=0}^{11} 0.91^t \times \$12.64\right) = \$40.52 + \$14.36 = \mathbf{\$54.88}$.
  7. $\text{LTV : CAC Real} = \frac{\$54.88}{\$54.55} = \mathbf{1.01x}$ (apenas empata en un año; Payback en mes 11.9).
- **Decisión**: **Rechazar duplicar a $16,000**. Lanzar el pack de 3 bolsas a $48 ($23.62 margen) y cobrar $4.50 de envío en 2 bolsas. Permite acumular **$112,000 de caja al Mes 24** y comprar la segunda tostadora de $14,000 en el mes 12.

---

### Caso B: Agendo (Software SaaS)
- **Historia y Contexto**: Valeria Ortiz creó una herramienta SaaS para barberías para reducir ausencias mediante recordatorios por WhatsApp y cobro adelantado. Tienen 1,150 barberías activas y quedan $60,000 del inversor ángel Ricardo Méndez. Valeria reporta un CAC de $105 y LTV:CAC de 2.4x, proponiendo triplicar anuncios de $10,000 a $30,000 al mes.
- **Datos Unitarios**:
  - Plan mensual: $25.00/mes (90% de clientes). Margen bruto: 78% $\rightarrow$ **$19.50/mes de margen por cliente**.
  - Plan anual: $240.00/año adelantado (10% de clientes) $\rightarrow$ **$187.20 de margen inmediato**.
  - Conversión de trials gratuitos (14 días): 14.0%.
  - Costo vendedora (Mariela): $1,200/mes (capacidad máxima de 500 trials por vendedora).
  - Comisión comercial: $20.00 por cada cliente de anuncios que cierra.
  - Clientes orgánicos (boca a boca / insignia): 50 clientes nuevos al mes (sin costo de anuncio ni comisión).
- **Fórmulas de Agendo**:
  1. $\text{Clientes Pagados Anuncios} = 500 \text{ trials} \times 14\% = \mathbf{70 \text{ clientes}}$.
  2. $\text{Costos Totales Adquisición} = \$10,000 \text{ ads} + \$1,200 \text{ Mariela} + (\$20 \times 70 = \$1,400 \text{ comisión}) = \mathbf{\$12,600}$.
  3. $\text{CAC Paid Real} = \frac{\$12,600}{70} = \mathbf{\$180.00}$.
  4. $\text{CAC Blended (Engañoso)} = \frac{\$12,600}{70 \text{ ads} + 50 \text{ orgánicos}} = \mathbf{\$105.00}$.
  5. $\text{LTV 24 Meses (Churn 6\% mensual)} = \$19.50 \times \left(\frac{1 - 0.94^{24}}{0.06}\right) = \$19.50 \times 12.8865 = \mathbf{\$251.29}$ (vs $325 sin tope).
  6. $\text{LTV : CAC Paid Real} = \frac{\$251.29}{\$180.00} = \mathbf{1.40x}$ (muy por debajo de los 2.4x de Valeria y de los 3.0x de salud SaaS).
  7. $\text{CAC Marginal al Triplicar} = \frac{\$30,000 - \$10,000 + \text{costos extra}}{(900 - 500) \times 14\% = 56 \text{ clientes}} = \mathbf{\$398.57 / cliente}$.
- **Decisión para Ricardo**: **Rechazar triplicar a $30,000**. Implementar un 20% de plan anual ($240), subir conversión a 16.5% y precio a $29. Agendo alcanza **más de 1,900 clientes activos y $245,000 en caja al Mes 24**.

---

### Caso C: Sol de Casa (Lead Gen)
- **Historia y Contexto**: Andrés Villalobos instaló paneles en la casa de su madre hace 4 años; hoy lleva 420 instalaciones residenciales con 4.9 estrellas. La contadora Sofía advierte que la caja anda justa ($12,000 en el banco) porque los equipos se pagan de contado al firmar. La agencia *Leadly* propone pasar todo el presupuesto ($8,000) a Meta porque el lead cuesta $8 frente a $40 en Google («Meta es 5 veces más eficiente»).
- **Datos Unitarios**:
  - Precio de instalación: $6,500.
  - Equipos (paneles, inversor, estructura): 55% ($3,575) $\rightarrow$ pagados al proveedor el mes de la firma.
  - Instalación (cuadrilla y materiales): 17% ($1,105) $\rightarrow$ pagados el mes siguiente al instalar.
  - Comisión de asesora: 3% ($195) $\rightarrow$ pagada el mes de la firma.
  - Margen de contribución neto: $\$6,500 \times (28\% - 3\%) = \mathbf{\$1,625.00}$ (25.0%).
  - Desfase de caja: En el Mes 1 entra 50% ($3,250) y salen equipos ($3,575) y comisión ($195) $\rightarrow$ **flujo neto negativo de -$520**. En el Mes 2 entra el otro 50% ($3,250) y sale la instalación ($1,105) $\rightarrow$ **flujo neto positivo de +$2,145**.
  - Visitas técnicas: Costo de $60 por visita realizada. Capacidad base de 100 visitas/mes (2 técnicos). Técnico extra: $1,800/mes (+50 visitas de capacidad desde el mes siguiente).
- **Fórmulas de Sol de Casa**:
  1. $\text{Embudo Meta}: 500 \text{ leads} \xrightarrow{55\%} 275 \text{ contactados} \xrightarrow{30\%} 82.5 \text{ agendados} \xrightarrow{70\%} 57.75 \text{ visitas} \xrightarrow{18\%} \mathbf{10.40 \text{ ventas}}$.
  2. $\text{Embudo Google}: 100 \text{ leads} \xrightarrow{85\%} 85 \text{ contactados} \xrightarrow{55\%} 46.75 \text{ agendados} \xrightarrow{85\%} 39.74 \text{ visitas} \xrightarrow{30\%} \mathbf{11.92 \text{ ventas}}$.
  3. $\text{CAC Real Google} = \frac{\$4,000 + (39.74 \times \$60 = \$2,384.25)}{11.92} = \mathbf{\$535.53}$.
  4. $\text{CAC Real Meta} = \frac{\$4,000 + (57.75 \times \$60 = \$3,465.00)}{10.40} = \mathbf{\$718.13}$ (¡Meta es 34% más caro por cliente!).
  5. $\text{Valor de Visita Google} = (30\% \times \$1,625) - \$60 = \mathbf{+\$427.50}$ vs $\text{Meta} = (18\% \times \$1,625) - \$60 = \mathbf{+\$232.50}$.
  6. $\text{LTV : CAC Real} = \text{Google: } \mathbf{3.03x} \text{ (Verde)} \text{ vs Meta: } \mathbf{2.26x} \text{ (Amarillo)}$.
- **Decisión**: **Rechazar a Leadly**. Google Ads es el motor de rentabilidad indispensable. Implementar respuesta en &lt; 5 min con filtro en Meta, contratar 1 técnico en el Mes 2 (capacidad a 150) y ofrecer batería de $3,000. Ventas suben a **28.2 al mes** y caja llega a **$215,000**.

---

## 3. Auditoría de las Tres Trampas Financieras

En la plataforma existe un módulo especializado y rediseñado para visualizar sin saturación ni solapamiento de etiquetas la trampa de cada caso:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AUDITORÍA DE TRAMPAS FINANCIERAS                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. TUESTE:                                                                  │
│    ROAS Meta Reportado (3.00x) ──► Inflado por Retargeting de $2,400        │
│    ROAS Break-even     (2.14x) ──► Umbral de No Pérdida                     │
│    ROAS Real 1er Ped   (0.70x) ──► Realidad (Pérdida Inmediata en Compra 1) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. AGENDO:                                                                  │
│    Claim Valeria       (2.40x) ──► Basado en CAC Blended de $105             │
│    LTV:CAC Blended     (2.39x) ──► Mezcla 50 barberías orgánicas gratis      │
│    LTV:CAC Paid Real   (1.40x) ──► Rendimiento real de anuncios ($180 CAC)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. SOL DE CASA:                                                             │
│    CPL Meta vs Google  ($8 vs $40) ──► Meta parece 5x más barato            │
│    CAC Real Google     ($535.53)   ──► Cierra al 30% (3.33 visitas / venta) │
│    CAC Real Meta       ($718.13)   ──► Cierra al 18% (5.56 visitas / venta) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Los Tres Niveles de la Plataforma

### Nivel 1: Calculadoras Financieras
- Formularios interactivos con supuestos originales precargados y editables.
- Recálculo en vivo de márgenes, CAC real, ROAS de equilibrio, LTV y Payback.
- **Fórmulas visibles y comprobación matemática escrita paso a paso** para cotejar con hojas de cálculo físicas o Excel.
- Sección obligatoria: *«En qué se equivocó o nos confundió la IA»*.

### Nivel 2: Tableros Interactivos Vivos
- Controles deslizantes (sliders) continuos de presupuesto ($0 a $20k en Tueste, $0 a $30k en Agendo, $0 a $10k/$8k en Sol de Casa).
- Semáforos de salud financiera: Rojo (&lt; 1.0x), Amarillo (1.0x a 3.0x) y Verde (&ge; 3.0x).
- Curvas de caja acumulada (Curva J) con punto de cruce en cero.
- Botón **«Restaurar Datos Originales»** para revertir cualquier ajuste al instante.

### Nivel 3: Simulador de Caja a 24 Meses
- Modelo de proyección mensual que rastrea cada grupo (cohorte) de clientes de forma independiente.
- Verificación de pisos de seguridad de caja ($5,000 para Tueste, $10,000 para Agendo, $5,000 para Sol de Casa).
- Matriz comparativa de 4 planes por caso con identificación automática del plan ganador.
- **Ventana modal de Verificación del Mes 1** con todas las cuentas desglosadas (entradas, salidas y saldo final).
- **Pitch ejecutivo de 2 minutos ante inversionistas** redactado para cada fundador.

---

## 5. Comparador de Escenarios y Recomendaciones

- **Matriz Comparativa**: Tabla integral que analiza simultáneamente Inversión, Clientes/Ventas, CAC, LTV, LTV:CAC, Margen, Caja mínima y Caja final en Mes 24.
- **Motor de Recomendaciones**: Dictamen estructurado categorizado en **ESCALAR**, **MANTENER**, **OPTIMIZAR**, **REDUCIR** o **PAUSAR**, fundamentado exclusivamente en variables unitarias y flujo de caja, nunca en métricas de vanidad.

---

## 6. Exportaciones a Excel y PDF

- **Microsoft Excel (.xlsx)**: Genera libros de trabajo con pestañas separadas:
  1. `Resumen_KPIs`: Ficha ejecutiva con indicadores calculados.
  2. `Simulacion_24_Meses`: Desglose mes a mes con todas las columnas de ingresos, egresos y caja.
  3. `Comparativa_Escenarios`: Matriz de escenarios evaluados.
- **Informe Ejecutivo en PDF**: Genera un documento corporativo formal con encabezado, tabla de unit economics, diagnóstico antifraude de la trampa financiera y tabla de proyecciones.

---

## 7. Verificación Manual Auditada del Mes 1

| Negocio | Saldo Inicial | Entradas / Contribución | Salidas Totales | Saldo Final Mes 1 | Piso Seguridad |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Tueste** | $35,000.00 | +$12,265.43 | -$15,500.00 | **$31,765.43** | $5,000 (Cumplido) |
| **Agendo** | $60,000.00 | +$22,819.50 | -$26,000.00 | **$56,819.50** | $10,000 (Cumplido) |
| **Sol de Casa** | $12,000.00 | +$144,036.30 | -$140,300.00 | **$15,736.30** | $5,000 (Cumplido) |

---

## 8. Arquitectura y Código Fuente

El proyecto sigue una estructura limpia y desacoplada:

```text
src/
├── Components/       # Componentes de UI (Sidebar, Header, KPICard, Tablas, Gráficos)
├── Engines/          # Motores matemáticos puros (tuesteEngine, agendoEngine, solDeCasaEngine)
├── Data/             # Datos maestros de los casos (tuesteData, agendoData, solDeCasaData)
├── Services/         # Servicios de cálculo, simulación, exportación y persistencia
├── Pages/            # Vistas principales (Dashboard, Tueste, Agendo, SolDeCasa, Calculadoras...)
├── Routes/           # Enrutamiento React Router DOM (AppRoutes.jsx)
└── tests/            # Suite de pruebas automatizadas (engines.test.js)
```

---

## 9. Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) v18+ o v22+.
- npm v10+.

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/ulyssesquiros-FWD/DecisionLab360.git
cd DecisionLab360

# 2. Instalar dependencias
npm install

# 3. Ejecutar las pruebas automatizadas (27/27 test assertions)
npm test

# 4. Iniciar la aplicación en modo desarrollo
npm run dev
```

La aplicación estará disponible localmente en:
👉 **`http://localhost:5173/`**

Para generar la compilación de producción optimizada:
```bash
npm run build
```

---

*DecisionLab 360 · Desarrollado para la toma de decisiones empresariales con fundamento financiero real.*
