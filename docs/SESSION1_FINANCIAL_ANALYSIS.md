# ANÁLISIS FINANCIERO INTEGRAL · SESIÓN 1 (CONSERVADA AL 100%)
**Diagnóstico, Unit Economics, Métricas Trampa y Simulación de Caja a 24 Meses**
*Equipo de Análisis Financiero: Analista Financiero Senior & Director de Modelado*

---

## 1. INTRODUCCIÓN Y METODOLOGÍA
La Sesión 1 de DecisionLab 360 se diseñó para erradicar las decisiones empresariales fundamentadas en métricas de vanidad publicitaria (ROAS inflado por retargeting, CPL bajo de leads no calificados y CAC Blended que diluye costos reales con clientes orgánicos).

Cada uno de los tres negocios cuenta con un motor financiero estricto que evalúa:
- **Nivel 1: Calculadora de Unit Economics y Margen de Contribución Real**.
- **Nivel 2: Tableros Vivos Interactivos y Sensibilidad de Parámetros**.
- **Nivel 3: Simulador de Flujo de Caja Mes a Mes a 24 Meses con Pisos de Seguridad**.

---

## 2. CASO A: TUESTE (E-COMMERCE DTC)

### 2.1. Dilema Estratégico de Diego Ramírez
Diego se enfrenta a la propuesta de la agencia publicitaria para Black Friday: duplicar el presupuesto en Meta Ads de **$8,000 a $16,000 mensuales**, ofreciendo un **30% de descuento** en el primer pedido. La agencia argumenta que el ROAS reportado en Ads Manager es de **3.0x** y que cada dólar invertido devuelve $3. Camila (socia y encargada de operaciones) sospecha porque el saldo en bancos cayó $3,200 en septiembre.

### 2.2. Desglose Riguroso del Pedido Típico (2 Bolsas x 340g = $34.00)
| Concepto | Monto USD | % del Precio de Lista | Observación |
|---|---:|---:|---|
| **Precio de Venta al Cliente** | **$34.00** | 100.0% | 2 bolsas de café a $17.00 c/u |
| Costo de Café Verde y Tueste | -$10.88 | 32.0% | $5.44 por bolsa (costo físico fijo) |
| Comisión Pasarela de Pagos | -$1.53 | 4.5% | 4.5% del ticket cobrado |
| Caja y Empaque | -$1.20 | 3.5% | Caja corrugada y bolsas de válvula |
| Envío a Domicilio (Asumido por Tueste) | -$4.50 | 13.2% | Envío gratis en baseline |
| **Margen de Contribución Unitario** | **$15.89** | **46.74%** | Ganancia neta antes de marketing |

### 2.3. Métricas Financieras y Trampa de Meta
- **ROAS Break-even**:
  $$\text{ROAS Break-even} = \frac{1}{\text{Margen } \%} = \frac{1}{0.4674} = \mathbf{2.14x}$$
  Para no perder dinero en el primer pedido, el ROAS publicitario debe ser superior a 2.14x.
- **La Trampa de Meta Ads (ROAS 3.0x de vanidad)**:
  Meta Ads Manager utiliza una ventana de atribución de 7 días clic / 1 día visualización y se atribuye 706 compras ($24,000 en ventas). Sin embargo, la auditoría forense reveló que **$2,400 se gastaron en retargeting de clientes que ya habían comprado**.
- **ROAS Real del Primer Pedido (Clientes Nuevos)**:
  $$\text{ROAS Real 1er Pedido} = \frac{165 \text{ clientes nuevos} \times \$34.00}{\$8,000 \text{ invertidos}} = \frac{\$5,610}{\$8,000} = \mathbf{0.70x}$$
  Tueste pierde dinero de manera directa en cada primer pedido de anuncios.
- **CAC Real (con Fee de Agencia de $1,000)**:
  $$\text{CAC Real} = \frac{\$8,000 + \$1,000}{165} = \mathbf{\$54.55}$$
- **LTV a 12 Meses sobre Margen**:
  Calculado sobre 3 pedidos promedio al año para clientes sueltos y 9% de churn mensual para suscriptores:
  $$\text{LTV Ponderado} = \mathbf{\$54.88}$$
  $$\text{Ratio LTV:CAC} = \frac{\$54.88}{\$54.55} = \mathbf{1.01x} \quad \text{(Empate técnico; nula rentabilidad)}$$

### 2.4. Dictamen Financiero: Rechazo de la Propuesta de Black Friday
Duplicar a $16,000 con 30% de descuento reduce el margen de contribución a $6.15, eleva el CAC marginal a $160 por cliente y derrumba el ratio LTV:CAC a **0.62x**. En la simulación a 24 meses, Tueste consumiría sus $35,000 en 4 meses y quebraría antes de fin de año.

---

## 3. CASO B: AGENDO (SOFTWARE SAAS B2B)

### 3.1. Dilema Estratégico de Valeria Ortiz
Valeria propone triplicar el gasto en pauta publicitaria de **$10,000 a $30,000 mensuales**, alegando que el CAC es de **$105.00** y que con un LTV de $251.29 el negocio tiene un ratio LTV:CAC de **2.4x**. Ricardo (inversor) exige verificar los números reales.

### 3.2. Desglose Unitario del Plan Mensual ($25.00/mes)
| Concepto | Monto USD | % del Precio | Observación |
|---|---:|---:|---|
| **Precio Mensual de Suscripción** | **$25.00** | 100.0% | Plan para barberías y salones |
| Costos Directos de Servidores y Soporte | -$5.50 | 22.0% | WhatsApp API, AWS, pasarela |
| **Margen Bruto de Contribución** | **$19.50** | **78.0%** | Margen operativo mensual por barbería |

### 3.3. La Trampa del CAC Blended y el CAC Paid Real
- **Embudo de Conversión de Septiembre**:
  - Inversión en Pauta: $10,000 ($6,500 Meta + $3,500 Google).
  - Trials Generados: 500 (Costo por trial: $20.00).
  - Tasa de Conversión Trial a Pago: 14.0% $\rightarrow$ **70 clientes pagados de anuncios**.
  - Clientes Orgánicos (Boca a boca / Web directa): **50 clientes mensuales**.
  - Total Nuevos Clientes Reportados: 120 clientes.
- **La Trampa de Valeria (CAC Blended de $105.00)**:
  Valeria dividió los $10,000 únicamente entre los 120 clientes totales ($\$10,000 / 120 = \$83.33$) o sumó gastos parciales sin considerar el equipo de ventas.
- **CAC Paid Real (El costo real de adquirir un cliente de pauta)**:
  $$\text{Gasto Comercial} = \text{Pauta } (\$10,000) + \text{Sueldo Mariela } (\$1,200) + \text{Comisiones } (70 \times \$20 = \$1,400) = \mathbf{\$12,600}$$
  $$\text{CAC Paid Real} = \frac{\$12,600}{70 \text{ clientes de pauta}} = \mathbf{\$180.00}$$
- **Ratio LTV:CAC Paid Real**:
  $$\text{LTV a 24 Meses (sobre margen de \$19.50 con churn 6\%)} = \mathbf{\$251.29}$$
  $$\text{Ratio LTV:CAC Paid Real} = \frac{\$251.29}{\$180.00} = \mathbf{1.40x} \quad \text{(Muy lejos del 2.4x reclamado)}$$

### 3.4. Dictamen Financiero: Peligro de Escala Prematura
Triplicar la pauta a $30,000 mensuales provocaría rendimientos decrecientes (CAC marginal de $266), exigiría contratar 2 vendedoras adicionales y perforaría el piso de seguridad de caja de $10,000 en el mes 5.

---

## 4. CASO C: SOL DE CASA (LEAD GENERATION SOLAR)

### 4.1. Dilema Estratégico de Andrés Villalobos
La agencia digital Leadly recomienda trasladar todo el presupuesto de Google Ads a Meta Ads porque Meta genera leads a **$8.00 CPL** frente a los **$40.00 CPL** de Google. «¿Por qué pagar 5 veces más por un contacto?»

### 4.2. Economía Unitaria de la Instalación Solar ($6,500.00)
| Concepto | Monto USD | % del Precio | Observación |
|---|---:|---:|---|
| **Precio de Venta al Hogar** | **$6,500.00** | 100.0% | Sistema residencial promedio |
| Equipos y Paneles (Proveedor) | -$3,575.00 | 55.0% | Se paga el mes de la firma |
| Costo de Instalación Física | -$1,105.00 | 17.0% | Mano de obra e insumos de montaje |
| Comisión Asesora Comercial | -$195.00 | 3.0% | 3% sobre el precio de lista |
| **Contribución Neta por Venta** | **$1,625.00** | **25.0%** | Margen neto antes de mercadeo |

### 4.3. La Trampa del CPL Barato y el Cuello de Botella Operativo
- **Costo de Visita Técnica de Medición**: **$60.00** (viáticos y bono técnico, se venda o no).
- **Capacidad Máxima Operativa**: 2 técnicos pueden realizar **máximo 100 visitas al mes**.
- **Embudo Comparativo Septiembre ($4,000 Meta vs $4,000 Google)**:
  | Etapa | Meta Ads ($4k) | Google Ads ($4k) | Diagnóstico |
  |---|---:|---:|---|
  | Leads Generados | 500 ($8 CPL) | 100 ($40 CPL) | Meta genera 5x más volumen |
  | Tasa de Contacto CRM | 55.0% (275) | 85.0% (85) | Teléfonos falsos en Meta (18%) |
  | Agendan Visita Técnica | 30.0% (82.5) | 55.0% (46.75) | Google busca activamente cotizar |
  | Visitas Realizadas | 70.0% (57.75) | 85.0% (39.74) | **Demanda total: 97.49 visitas** |
  | Tasa de Cierre en Visita | 18.0% | 30.0% | Calidad técnica del prospecto |
  | **Ventas Cerradas** | **10.40 ventas** | **11.92 ventas** | **Google cierra más ventas** |
  | Costo de Visitas ($60) | $3,465.00 | $2,384.40 | Meta satura la agenda técnica |
  | Inversión Total + Visitas | $7,465.00 | $6,384.40 | Costo total de adquisición |
  | **CAC Real por Venta** | **$718.13** | **$535.54** | **Meta es +34% más caro que Google** |
  | Valor Esperado por Visita | +$232.50 | +$427.50 | Visita de Google genera +84% valor |

### 4.4. Dictamen Financiero: Rechazo de la Propuesta de Leadly
Mover todo el presupuesto a Meta demandaría 115 visitas mensuales, superando la capacidad de 100 visitas de los dos técnicos. Sol de Casa tendría que rechazar clientes, su CAC subiría a $718 y perdería las ventas de alto margen de Google.

