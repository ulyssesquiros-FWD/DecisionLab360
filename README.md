# DecisionLab 360 V2.0
## Plataforma Empresarial Integral: Análisis Financiero (Sesión 1) + Estrategia de Growth (Sesión 2)

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Unit%20Tests-43%2F43%20Passing-brightgreen.svg)](tests/)
[![Growth V2.0](https://img.shields.io/badge/Growth%20Engine-V2.0%20Compliant-purple.svg)](src/Engines/growthEngines.js)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**DecisionLab 360 V2.0** es una plataforma web SaaS integral diseñada para resolver con total rigor matemático, financiero y estratégico los seis casos de estudio empresariales de la metodología de simulación y crecimiento de negocios:

1. **Caso A: Tueste** — E-commerce DTC de café de especialidad.
   - *Sesión 1 (Finanzas)*: Unit economics, LTV/CAC, margen 40%, simulador de caja a 24 meses y punto de equilibrio.
   - *Sesión 2 (Growth)*: Programa **Tueste Rewards**, experiencia móvil del invitador, checkout público con descuento automático y cumplimiento estricto de la regla de CAC $\le \$25$.
2. **Caso B: Agendo** — Software SaaS B2B de reservas para salones y profesionales.
   - *Sesión 1 (Finanzas)*: Métricas SaaS (ARPU $29, Churn 6%, CAC $163.27, LTV $483.33, Payback 6 meses), MRR/ARR y costos de infraestructura.
   - *Sesión 2 (Growth)*: Onboarding móvil **QuickStart en <5 minutos** sin datos fiscales, página pública de reservas con anti-colisión horaria y bucle viral *"Reservado con Agendo"*.
3. **Caso C: Sol de Casa** — Instalaciones residenciales de paneles solares.
   - *Sesión 1 (Finanzas)*: Embudo de visitas técnicas ($60/visita, 45% cierre), ticket de $4,800, margen del 38% ($1,824), CAC tradicional de $900 y capacidad de cuadrillas.
   - *Sesión 2 (Growth)*: Portal familiar **"Mi Ahorro Solar"**, tarjeta compartible para WhatsApp, letreros de jardín y validador de recompensas bajo el techo estricto de **$300** ($133.33 visita técnica + máx $166.67 incentivos).

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
# Acceder en: http://localhost:5173

# 3. Ejecutar las 43 pruebas unitarias (27 financieras + 16 de growth)
npm test

# 4. Compilar para producción
npm run build
```

---

## 🧭 Mapa de Rutas Principales

| Ruta | Descripción |
|---|---|
| `/` | Dashboard General 360 con métricas consolidadas |
| `/crecimiento` | **Growth Center**: Visualizador interactivo de los 3 bucles de crecimiento |
| `/growth-one-pager` | **Fichas Ejecutivas de 1 Página**: Formato imprimible/PDF con los 14 puntos |
| `/growth-matriz` | **Matriz de 90 Días**: Plan de canales Propios, Pagados y Ganados |
| `/tueste` | Tueste Hub (Selector de Sesión 1: Finanzas y Sesión 2: Growth) |
| `/tueste/mi-programa` | Experiencia móvil del cliente invitador ("Mi programa Tueste") |
| `/tueste/referido/:code` | Landing pública de compra para el amigo invitado con cupón automático |
| `/agendo` | Agendo Hub (Selector de Sesión 1: Finanzas y Sesión 2: Growth) |
| `/agendo/onboarding` | Asistente de onboarding QuickStart en <5 min sin datos fiscales |
| `/agendo/reservar/:slug` | Página pública de turnos con detección de colisiones y badge viral |
| `/sol-de-casa` | Sol de Casa Hub (Selector de Sesión 1: Finanzas y Sesión 2: Growth) |
| `/sol-de-casa/familia/:code`| Portal móvil familiar "Mi Ahorro Solar" con tarjeta WhatsApp |
| `/sol-de-casa/ahorro/:code` | Calculadora de ahorro solar para vecinos y solicitud de visita técnica |
| `/comparador` | Comparador financiero transversal de los 3 casos (Sesión 1) |
| `/exportar` | Centro de descargas y exportación de reportes |

---

## 📚 Documentación Técnica Completa en `/docs`

Consulte los 10 documentos técnicos desarrollados para DecisionLab 360 V2.0:

- [docs/README.md](docs/README.md) — Manual maestro de la plataforma y rúbrica de 100 puntos.
- [docs/PROJECT_AUDIT.md](docs/PROJECT_AUDIT.md) — Auditoría inicial del código previa a la implementación.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Arquitectura modular y diseño de componentes.
- [docs/SESSION1_FINANCIAL_ANALYSIS.md](docs/SESSION1_FINANCIAL_ANALYSIS.md) — Fórmulas financieras y auditoría de la Sesión 1.
- [docs/SESSION2_GROWTH_ANALYSIS.md](docs/SESSION2_GROWTH_ANALYSIS.md) — Diagnóstico de funnels, bucles y modelos de incentivos.
- [docs/TUESTE_GROWTH.md](docs/TUESTE_GROWTH.md) — Programa Tueste Rewards y límite de $25 CAC.
- [docs/AGENDO_ONBOARDING.md](docs/AGENDO_ONBOARDING.md) — QuickStart sin fricción y bucle viral de Agendo.
- [docs/SOL_DE_CASA_REFERRALS.md](docs/SOL_DE_CASA_REFERRALS.md) — Comunidad solar, letreros y techo de $300 CAC.
- [docs/GROWTH_EXPERIMENTS.md](docs/GROWTH_EXPERIMENTS.md) — Diseño de los 3 experimentos A/B controlados.
- [docs/TESTING.md](docs/TESTING.md) — Protocolo de pruebas, 43 tests unitarios y casos manuales.

---

*DecisionLab 360 V2.0 — Desarrollado bajo estándares senior de software engineering y growth marketing.*
