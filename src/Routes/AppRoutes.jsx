// DecisionLab 360 - AppRoutes Component
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tueste" element={<Tueste />} />
      <Route path="/agendo" element={<Agendo />} />
      <Route path="/sol-de-casa" element={<SolDeCasa />} />
      <Route path="/calculadoras" element={<Calculator />} />
      <Route path="/tableros" element={<Analysis />} />
      <Route path="/simuladores" element={<Simulator />} />
      <Route path="/escenarios" element={<Scenarios />} />
      <Route path="/recomendaciones" element={<Reports />} />
      <Route path="/reportes" element={<Reports />} />
      <Route path="/configuracion" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
