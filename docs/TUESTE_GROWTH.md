# TUESTE REWARDS · ESTRATEGIA Y SISTEMA DE REFERIDOS (CASO A)
**Documento Técnico, Económico y de Experiencia de Usuario**
*Especialista en Growth Marketing & Analista Financiero*

---

## 1. CONTEXTO Y DIAGNÓSTICO DEL PROBLEMA
Diego Ramírez redujo la inversión publicitaria en Meta Ads de **$8,000 a $4,000 mensuales**, logrando estabilizar la caja de Tueste por primera vez en meses. No obstante, tres semanas después se produjo un bloqueo de la cuenta publicitaria por 6 horas que evidenció una vulnerabilidad existencial: **durante esas 6 horas no ingresó ni un solo cliente nuevo**. Casi 7 de cada 10 clientes nuevos provienen de Meta Ads.

Diego contaba con un programa piloto de referidos llamado «Regala una bolsa» que prácticamente nadie utilizaba.

---

## 2. ANÁLISIS FORENSE DEL EMBUDO PILOTO
Sobre una cohorte base de **1,000 clientes que realizaron su primera compra**:

```
[1,000] Reciben correo al día siguiente de pagar
  │
  ▼ (-65.0% no abren)
[350]   Abren el correo
  │
  ▼ (-65.7% caída crítica: ven código manual)
[120]   Entran a la página del programa
  │
  ▼ (-16.7% no comparten)
[100]   Clientes envían invitaciones (85% por WhatsApp)
  │
  ▼ (Promedio 3 invitaciones por cliente)
[300]   Invitaciones totales enviadas
  │
  ▼ (-50.0% no abren la tienda)
[150]   Amigos abren la tienda online
  │
  ▼ (-60.0% no compran)
[60]    Amigos realizan una compra efectiva
```

### Causas Raíz Identificadas:
1. **Desincronización de Entrega**: El correo llegaba 24 horas después de pagar, pero el café tarda 3 días en llegar. El cliente aún no tenía apego físico al producto.
2. **Fricción de Códigos Manuales**: El cliente debía copiar un código alfanumérico (ej: `TUESTE-8X2K`) y pegarlo manualmente.
3. **Ausencia de Regalo Aplicado**: El amigo recibía un código suelto sin el descuento cargado en el carrito.
4. **Falta de Notificación al Invitador**: En encuesta, **7 de cada 10 clientes que invitaron no sabían que tenían $8 a su favor**.
5. **Comportamiento Espontáneo No Aprovechado**: El 6% de los clientes publica fotos del paquete en redes sociales el día en que llega su pedido.

---

## 3. LÍMITE ECONÓMICO INQUEBRANTABLE ($25 MAX)
Regla de Diego: Un cliente adquirido por referidos no puede costar más de la mitad de lo que cuesta adquirir un cliente por Meta.

- Inversión Meta: $4,000/mes.
- Fee Agencia: $1,000/mes.
- Clientes Nuevos Meta: 100/mes.
$$\text{CAC Real Meta} = \frac{\$4,000 + \$1,000}{100} = \mathbf{\$50.00}$$
$$\text{Costo Máximo por Referido} = \frac{\$50.00}{2} = \mathbf{\$25.00}$$

### Costos Unitarios de Recompensas:
- **Descuento en Dinero**: Importe facial descontado.
- **Bolsa de Muestra de 100g de Café**: **$1.60** (viaja en pedido, sin envío adicional).
- **Bolsa de 340g de Regalo**: **$5.44** (costo de café verde y tueste).
- **Mes Gratis de Suscripción**:
  - Ingreso no cobrado: **$30.60**.
  - Desembolso en efectivo: Café $10.88 + Envío $4.50 + Empaque $1.20 = **$16.58**.
  - Impacto total: **$47.18**. Solo viable si se exige un mínimo de 3 amigos suscritos ($47.18 ÷ 3 = $15.73 < $25).

---

## 4. EXPERIENCIAS DE USUARIO IMPLEMENTADAS

### 4.1. Experiencia del Cliente Invitador: «Mi Programa Tueste»
- **Ruta**: `/tueste/mi-programa`
- **Enfoque Mobile-First**: Diseñado específicamente para teléfonos móviles (82% de las visitas de Tueste son móviles).
- **Características**:
  - Perfil del cliente verificado (Camila Rossi) con estado de pedido entregado hace 4 días.
  - Generador de enlace único (`TUESTE-CAMILA-8K`) sin necesidad de copiar códigos manuales.
  - Botón de compartir por WhatsApp en 1 toque con mensaje pre-redactado.
  - Panel de control de amigos (invitados, visitas a tienda, compras).
  - Barra de progreso gamificada hacia el siguiente nivel (Bolsa de 340g gratis).

### 4.2. Experiencia del Amigo Invitado: Landing Pública y Checkout Demo
- **Ruta**: `/tueste/referido/:referralCode`
- **Características**:
  - Mensaje de bienvenida personalizado de la amiga («Camila Rossi te regaló café»).
  - Regalo y descuento autoaplicados: Precio lista $34.00 $\rightarrow$ Descuento -$6.00 $\rightarrow$ Precio final **$28.00** + bolsa muestra 100g gratis.
  - Formulario de checkout simulado en 1 toque con selección de molienda.
  - Al completar la compra: actualiza automáticamente el saldo del invitador, registra la orden y actualiza las métricas del panel administrativo de Diego.

---

## 5. PANEL ADMINISTRATIVO DE DIEGO
- **Ruta**: `/tueste/growth`
- **Métricas Clave**: 1,000 correos, 350 aperturas, 100 invitadores, 300 invitaciones, 150 visitas, 60 compras referidas, CAC referidos promedio $8.40 (vs $50.00 Meta).
- **5 Gráficos Obligatorios**:
  1. Embudo completo de referidos.
  2. Tasa de conversión por etapa.
  3. Proyección de nuevos clientes: Meta vs Referidos.
  4. CAC Meta vs CAC Referidos.
  5. Evolución de recompensas entregadas e inversión en café.

