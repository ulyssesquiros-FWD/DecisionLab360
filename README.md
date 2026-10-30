# DecisionLab 360
## Plataforma Integral de Análisis Financiero y Simulación Empresarial

**DecisionLab 360** es una plataforma SaaS administrativa unificada desarrollada en **React 19 + Vite + Tailwind CSS**, diseñada para resolver de manera matemática y rigurosa los tres casos empresariales planteados:

1. **Caso A: Tueste** — E-commerce Direct-to-Consumer (DTC) de café de especialidad.
2. **Caso B: Agendo** — Software SaaS B2B para barberías y salones de belleza.
3. **Caso C: Sol de Casa** — Lead Generation de instalaciones de paneles solares residenciales.

La plataforma no es una simple maqueta cosmética: integra **tres motores financieros desacoplados**, calculadoras interactivas de **Nivel 1**, tableros de control en vivo de **Nivel 2**, simuladores proyectivos cohorte a cohorte a 24 meses de **Nivel 3**, un comparador matricial de escenarios, un motor de dictámenes ejecutivos, y exportación integral a **Microsoft Excel (.xlsx)** y **PDF**.

---

## 1. Arquitectura y Tecnologías

- **Core & Framework**: React 19, JavaScript (ESM), React Router DOM v7.
- **Estilos**: Tailwind CSS con paletas especializadas por caso:
  - *Tueste*: Ámbar, naranja y marrón (`tueste-*`).
  - *Agendo*: Azul e índigo (`agendo-*`).
  - *Sol de Casa*: Amarillo y verde esmeralda (`sol-*`).
- **Visualización de Datos**: Recharts (Curvas de caja J-Curve con umbral cero, barras comparativas LTV vs CAC con líneas 1:1 y 3:1, embudos de conversión, curvas de rendimientos decrecientes y gráficos de trampas financieras).
- **Iconografía**: Lucide React.
- **Exportación**: SheetJS (`xlsx`) para planillas multicapa y `jspdf` + `jspdf-autotable` para reportes ejecutivos.
- **Persistencia**: LocalStorage para supuestos personalizados con botón global de restauración.

---

## 2. Estructura del Código

```text
src/
├── Components/
│   ├── Sidebar/             # Navegación lateral responsive con badges
│   ├── Header/              # Encabezado superior con breadcrumbs y botón de reset
│   ├── KPICard/             # Tarjetas ejecutivas con fórmulas y umbrales
│   ├── MetricIndicator/     # Semáforos financieros (Rojo, Amarillo, Verde)
│   ├── ScenarioCard/        # Tarjetas comparativas de escenarios
│   ├── CashFlowTable/       # Tabla interactiva 24M con revisión auditada del Mes 1
│   ├── DataTable/           # Tablas ordenables (campañas, historial)
│   └── Charts/              # Gráficos Recharts (Curva de caja, LTV:CAC, Embudos, Trampas)
│
├── Engines/                 # MOTORES FINANCIEROS INDEPENDIENTES
│   ├── tuesteEngine.js      # Unit economics, LTV 12m, Payback, Simulación 24M
│   ├── agendoEngine.js      # SaaS margin, trials, CAC Paid vs Blended, Simulación 24M
│   └── solDeCasaEngine.js   # Funnels Meta/Google, capacidad técnica, Simulación 24M
│
├── Data/                    # DATOS MAESTROS ORIGINALES Y CASOS DE PRUEBA
│   ├── tuesteData.js        # Costos de pedido, historial Meta, cohorte pedidos sueltos
│   ├── agendoData.js        # Costos directos, comisión, historial de trials, sueldos
│   └── solDeCasaData.js     # Equipos 55%, cuadrilla 17%, CRM, historial de leads
│
├── Services/
│   ├── calculationService.js # Formateadores (USD, %, ratios) y acceso a modelos
│   ├── simulationService.js  # Comparador de 4 planes y reglas de victoria
│   ├── exportService.js      # Generación de Excel (.xlsx) y PDF (.pdf)
│   └── storageService.js     # Persistencia LocalStorage y gestión de escenarios
│
├── Pages/
│   ├── Dashboard/           # Dashboard general con las 3 tarjetas de casos
│   ├── Tueste/              # Módulo completo Caso A
│   ├── Agendo/              # Módulo completo Caso B
│   ├── SolDeCasa/           # Módulo completo Caso C
│   ├── Calculator/          # Nivel 1: Calculadoras con verificación manual escrita
│   ├── Analysis/            # Nivel 2: Tableros vivos con controles deslizantes
│   ├── Simulator/           # Nivel 3: Simulador 24M con auditoría del Mes 1
│   ├── Scenarios/           # Matriz comparativa de escenarios
│   ├── Reports/             # Motor de recomendaciones y exportación
│   └── Settings/            # Inspector de supuestos y reinicio de fábrica
│
├── Routes/
│   └── AppRoutes.jsx        # Enrutador principal de la plataforma
│
├── App.jsx                  # Layout principal SaaS
└── main.jsx                 # Entrypoint con BrowserRouter
```

---

## 3. Instalación y Ejecución Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador.

3. **Ejecutar pruebas unitarias automatizadas**:
   ```bash
   npm test
   ```
   Valida las 27 aserciones matemáticas contra los casos de referencia con 100% de éxito.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 4. Auditoría de las Tres Trampas ("En qué se equivocó la IA")

Cada módulo cuenta con su sección obligatoria documentando los sesgos y errores habituales de análisis:

### Caso A: Tueste
- **Métrica Trampa**: Meta reporta un **ROAS de 3.0x** ($24,000 en ventas atribuidas con $8,000 de gasto).
- **La Realidad**: Meta usa ventana de atribución de 7 días clic / 1 día visualización, atribuyéndose el 86% de las ventas de Shopify. $2,400 se gastan en retargeting de compradores previos. Solo **165 clientes son genuinamente nuevos**.
- **Resultado Corregido**: El ROAS real de un cliente nuevo en su primer pedido es de **0.70x** ($5,610 / $8,000), muy por debajo del break-even de **2.14x**. El LTV a 12 meses es **$54.88** frente a un CAC Real de **$54.55** (ratio **1.01x**). Duplicar a $16,000 con 30% de descuento reduce el LTV:CAC a **0.62x** y quiebra el negocio.

### Caso B: Agendo
- **Métrica Trampa**: Valeria presenta un **CAC de $105** y un **LTV:CAC de 2.4x**, concluyendo «cada dólar vuelve 2.4 veces; hay que triplicar anuncios a $30,000». Su freelancer asegura que el registro cuesta $20 (la mitad del promedio B2B).
- **La Realidad**: Valeria calcula el **CAC Blended** ($12,600 / 120 clientes), mezclando 50 clientes orgánicos gratuitos para encubrir la baja eficiencia de los anuncios.
- **Resultado Corregido**: El CAC Paid real es de **$180.00** ($12,600 / 70 clientes de ads). El LTV a 24 meses sobre margen (retención 94%) es de **$251.29**. Por lo tanto, el **LTV:CAC Paid real es de 1.40x**, no 2.4x. Triplicar a $30,000 sufre rendimientos decrecientes (900 trials), elevando el CAC marginal a **$398.57** y quemando los $60,000 en 6 meses.

### Caso C: Sol de Casa
- **Métrica Trampa**: Leadly asegura que Meta es «5 veces más eficiente» porque el lead cuesta **$8** y en Google cuesta **$40**, recomendando pasar los $8,000 a Meta para duplicar leads.
- **La Realidad**: Meta tiene 18% teléfonos falsos, solo 55% responde y cierra al 18%. Como cada visita técnica cuesta $60, Meta exige 5.56 visitas por venta ($333 en viáticos).
- **Resultado Corregido**: El CAC Real de Meta es **$718.13** vs **$535.53** en Google (¡Meta es 34% más caro!). Una visita de Google vale **+$427.50** vs **+$232.50** en Meta. Mover todo a Meta satura la capacidad física de 100 visitas y reduce las ventas de 22.3 a 17.5 por mes.

---

## 5. Simuladores a 24 Meses y Reglas de Juego (Nivel 3)

| Caso | Regla Clave | Piso de Seguridad | Ganador del Caso |
| :--- | :--- | :--- | :--- |
| **Tueste** | Gasto M13..M24 ≥ promedio M1..M12 | $5,000 | **Propio A (Pack $48 + Envío)**: $112,000 caja final, compra tostadora en M12 |
| **Agendo** | Horizonte estricto 24 meses | $10,000 | **Propio B (Precio $29 + 20% Anual)**: >1,900 clientes activos y $245,000 en caja |
| **Sol de Casa** | Gasto M19..M24 no decrece mes a mes | $5,000 | **Propio A (Filtro + 1 Técnico en M2)**: 28 ventas/mes y $215,000 en caja |

---

## 6. Verificación Manual Auditada del Mes 1

En la plataforma, cada simulador incluye un botón modal para revisar la cuenta exacta del primer mes:
- **Tueste Mes 1**: Caja inicial ($35,000) + Contribución ($12,265.43) - Salidas ($15,500) = **$31,765.43**.
- **Agendo Mes 1**: Caja inicial ($60,000) + Margen ($22,819.50) - Salidas ($26,000) = **$56,819.50**.
- **Sol de Casa Mes 1**: Caja inicial ($12,000) + Cobros 50% M0/M1 ($144,036.30) - Costos equipos/cuadrilla/fijos/ads ($140,300.00) = **$15,736.30**.

---

*DecisionLab 360 · Diseñado con rigor financiero y excelencia visual.*
