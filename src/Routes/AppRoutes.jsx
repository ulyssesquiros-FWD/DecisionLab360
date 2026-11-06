// DecisionLab 360 - AppRoutes Component (V2.0)
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Core Pages Sesión 1
import Dashboard from '../Pages/Dashboard/Dashboard.jsx';
import Tueste from '../Pages/Tueste/Tueste.jsx';
import Agendo from '../Pages/Agendo/Agendo.jsx';
import SolDeCasa from '../Pages/SolDeCasa/SolDeCasa.jsx';
import Calculator from '../Pages/Calculator/Calculator.jsx';
import Analysis from '../Pages/Analysis/Analysis.jsx';
import Simulator from '../Pages/Simulator/Simulator.jsx';
import Scenarios from '../Pages/Scenarios/Scenarios.jsx';
import Reports from '../Pages/Reports/Reports.jsx';
import Settings from '../Pages/Settings/Settings.jsx';

// Sesión 2 Growth Pages: Tueste
import TuesteGrowthHub from '../Pages/Growth/Tueste/TuesteGrowthHub.jsx';
import TuesteReferralCustomerView from '../Pages/Growth/Tueste/TuesteReferralCustomerView.jsx';
import TuesteReferralPublicLanding from '../Pages/Growth/Tueste/TuesteReferralPublicLanding.jsx';

// Sesión 2 Growth Pages: Agendo
import AgendoGrowthHub from '../Pages/Growth/Agendo/AgendoGrowthHub.jsx';
import AgendoOnboardingWizard from '../Pages/Growth/Agendo/AgendoOnboardingWizard.jsx';
import AgendoPublicBooking from '../Pages/Growth/Agendo/AgendoPublicBooking.jsx';

// Sesión 2 Growth Pages: Sol de Casa
import SolDeCasaGrowthHub from '../Pages/Growth/SolDeCasa/SolDeCasaGrowthHub.jsx';
import SolDeCasaFamilyPortal from '../Pages/Growth/SolDeCasa/SolDeCasaFamilyPortal.jsx';
import SolDeCasaNeighborLanding from '../Pages/Growth/SolDeCasa/SolDeCasaNeighborLanding.jsx';

// Sesión 2 Growth Center & Executive Sheets
import GrowthCenter from '../Pages/Growth/GrowthCenter.jsx';
import GrowthOnePager from '../Pages/Growth/GrowthOnePager.jsx';
import ChannelMatrix90Days from '../Components/Growth/ChannelMatrix90Days.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dashboard General */}
      <Route path="/" element={<Dashboard />} />

      {/* Caso A: Tueste */}
      <Route path="/tueste" element={<Tueste />} />
      <Route path="/tueste/growth" element={<TuesteGrowthHub />} />
      <Route path="/tueste/mi-programa" element={<TuesteReferralCustomerView />} />
      <Route path="/tueste/referido/:referralCode" element={<TuesteReferralPublicLanding />} />

      {/* Caso B: Agendo */}
      <Route path="/agendo" element={<Agendo />} />
      <Route path="/agendo/growth" element={<AgendoGrowthHub />} />
      <Route path="/agendo/quickstart" element={<AgendoOnboardingWizard />} />
      <Route path="/agendo/reservar/:businessSlug" element={<AgendoPublicBooking />} />

      {/* Caso C: Sol de Casa */}
      <Route path="/sol-de-casa" element={<SolDeCasa />} />
      <Route path="/sol-de-casa/growth" element={<SolDeCasaGrowthHub />} />
      <Route path="/sol-de-casa/familia/:familyCode" element={<SolDeCasaFamilyPortal />} />
      <Route path="/sol-de-casa/ahorro/:referralCode" element={<SolDeCasaNeighborLanding />} />

      {/* Growth Center Global */}
      <Route path="/growth" element={<GrowthCenter />} />
      <Route path="/growth/fichas" element={<GrowthOnePager />} />
      <Route path="/growth/canales" element={<div className="p-6"><ChannelMatrix90Days caseKey="tueste" /></div>} />

      {/* Herramientas Sesión 1 */}
      <Route path="/calculadoras" element={<Calculator />} />
      <Route path="/tableros" element={<Analysis />} />
      <Route path="/simuladores" element={<Simulator />} />
      <Route path="/escenarios" element={<Scenarios />} />
      <Route path="/recomendaciones" element={<Reports />} />
      <Route path="/reportes" element={<Reports />} />
      <Route path="/configuracion" element={<Settings />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
