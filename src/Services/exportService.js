// DecisionLab 360 - Export Service (Excel & PDF)
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency, formatPercent, formatRatio, formatNumber } from './calculationService.js';

export const exportService = {
  /**
   * Exporta a Excel los datos del caso, escenarios y simulación
   */
  exportCaseToExcel: ({ caseKey, caseName, modelData, simulationData, scenariosData }) => {
    const wb = XLSX.utils.book_new();

    // 1. Hoja de Resumen Ejecutivo y KPIs
    const summaryRows = [
      ['DECISIONLAB 360 - REPORTE EJECUTIVO'],
      ['Negocio:', caseName],
      ['Fecha de generación:', new Date().toLocaleDateString('es-ES')],
      [],
      ['MÉTRICAS CLAVE (NIVEL 1 & 2)', 'VALOR'],
    ];

    if (caseKey === 'tueste') {
      summaryRows.push(
        ['Inversión Meta', formatCurrency(modelData.metaSpend)],
        ['Fee Agencia', formatCurrency(modelData.agencyFee)],
        ['Margen Contribución Pedido Suelto', formatCurrency(modelData.regularSingleOrder.contribution) + ` (${formatPercent(modelData.regularSingleOrder.marginPercent)})`],
        ['Margen Contribución Suscripción', formatCurrency(modelData.subscriptionOrder.contribution) + ` (${formatPercent(modelData.subscriptionOrder.marginPercent)})`],
        ['ROAS Break-even', formatRatio(modelData.roasBreakEvenSingle)],
        ['ROAS Reportado Meta', formatRatio(modelData.metaReportedROAS)],
        ['ROAS Real Primer Pedido', formatRatio(modelData.roasRealFirstOrder)],
        ['CAC Anuncios', formatCurrency(modelData.cacAds)],
        ['CAC Real (con Agencia)', formatCurrency(modelData.cacReal)],
        ['LTV a 12 Meses', formatCurrency(modelData.ltvResults.blendedLTV)],
        ['Ratio LTV:CAC', formatRatio(modelData.ltvToCac)],
        ['Payback Estimado', modelData.paybackMonth ? `${modelData.paybackMonth.toFixed(1)} meses` : 'No recupera']
      );
    } else if (caseKey === 'agendo') {
      summaryRows.push(
        ['Inversión Anuncios', formatCurrency(modelData.adSpend)],
        ['Trials Generados', formatNumber(modelData.trials)],
        ['Clientes Pagados Ads', formatNumber(modelData.paidCustomersFromAds)],
        ['Clientes Orgánicos', formatNumber(modelData.organicCustomers)],
        ['Vendedoras Requeridas', formatNumber(modelData.salesRepsNeeded)],
        ['CAC Paid (Anuncios)', formatCurrency(modelData.cacPaid)],
        ['CAC Blended (Mezclado)', formatCurrency(modelData.cacBlended)],
        ['LTV a 24 Meses', formatCurrency(modelData.ltvData.ltvMonthly24m)],
        ['LTV Sin Tope', formatCurrency(modelData.ltvData.ltvSinTope)],
        ['LTV:CAC Paid', formatRatio(modelData.ltvToCacPaid)],
        ['LTV:CAC Blended', formatRatio(modelData.ltvToCacBlended)],
        ['Payback Estimado', modelData.cashCurves.paybackMonthly ? `${modelData.cashCurves.paybackMonthly.toFixed(1)} meses` : 'No recupera']
      );
    } else if (caseKey === 'solDeCasa') {
      summaryRows.push(
        ['Inversión Meta', formatCurrency(modelData.metaSpend)],
        ['Inversión Google', formatCurrency(modelData.googleSpend)],
        ['Leads Meta', formatNumber(modelData.metaFunnel.leads)],
        ['Leads Google', formatNumber(modelData.googleFunnel.leads)],
        ['CPL Meta', formatCurrency(modelData.metaFunnel.cpl)],
        ['CPL Google', formatCurrency(modelData.googleFunnel.cpl)],
        ['Visitas Pedidas', formatNumber(modelData.totalRequestedVisits, 1)],
        ['Capacidad Disponible', formatNumber(modelData.totalCapacity)],
        ['Visitas Realizadas', formatNumber(modelData.totalVisitsDone, 1)],
        ['Ventas Totales', formatNumber(modelData.totalSales, 1)],
        ['CAC Real Meta', formatCurrency(modelData.cacRealMeta)],
        ['CAC Real Google', formatCurrency(modelData.cacRealGoogle)],
        ['LTV:CAC Meta', formatRatio(modelData.ltvToCacMeta)],
        ['LTV:CAC Google', formatRatio(modelData.ltvToCacGoogle)],
        ['Valor de Visita Meta', formatCurrency(modelData.valueOfVisitMeta)],
        ['Valor de Visita Google', formatCurrency(modelData.valueOfVisitGoogle)]
      );
    }

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen_KPIs');

    // 2. Hoja de Simulación a 24 Meses
    if (simulationData && simulationData.monthlyBreakdown) {
      const simRows = [];
      if (caseKey === 'tueste') {
        simRows.push(['Mes', 'Inversión Meta', 'Fee Agencia', 'Clientes Nuevos', 'Suscriptores Activos', 'Contrib. Existentes', 'Contrib. Nuevos', 'Contrib. Total', 'Salidas', 'Flujo Neto', 'Caja Final']);
        simulationData.monthlyBreakdown.forEach(r => {
          simRows.push([
            r.month,
            r.metaSpend,
            r.agencyFee,
            r.newCustomers,
            r.activeSubscribers,
            Number(r.existingContribution.toFixed(2)),
            Number(r.newCohortsContribution.toFixed(2)),
            Number(r.totalContribution.toFixed(2)),
            Number(r.totalOutflows.toFixed(2)),
            Number(r.netCashFlow.toFixed(2)),
            Number(r.endingCash.toFixed(2))
          ]);
        });
      } else if (caseKey === 'agendo') {
        simRows.push(['Mes', 'Inversión Ads', 'Trials', 'Vendedoras', 'Nuevos Pagados', 'Clientes Activos', 'Entradas', 'Salidas', 'Flujo Neto', 'Caja Final']);
        simulationData.monthlyBreakdown.forEach(r => {
          simRows.push([
            r.month,
            r.spend,
            r.trials,
            r.salesReps,
            Number(r.totalNewPaid.toFixed(1)),
            r.activeCustomers,
            Number(r.inflows.toFixed(2)),
            Number(r.outflows.toFixed(2)),
            Number(r.netCashFlow.toFixed(2)),
            Number(r.endingCash.toFixed(2))
          ]);
        });
      } else if (caseKey === 'solDeCasa') {
        simRows.push(['Mes', 'Gasto Meta', 'Gasto Google', 'Leads Totales', 'Visitas Pedidas', 'Capacidad', 'Visitas Hechas', 'Ventas', 'Entradas', 'Salidas', 'Flujo Neto', 'Caja Final']);
        simulationData.monthlyBreakdown.forEach(r => {
          simRows.push([
            r.month,
            r.metaSpend,
            r.googleSpend,
            r.totalLeads,
            Number(r.requestedVisits.toFixed(1)),
            r.capacity,
            Number(r.visitsDone.toFixed(1)),
            Number(r.sales.toFixed(1)),
            Number(r.inflows.toFixed(2)),
            Number(r.outflows.toFixed(2)),
            Number(r.netCashFlow.toFixed(2)),
            Number(r.endingCash.toFixed(2))
          ]);
        });
      }
      const wsSim = XLSX.utils.aoa_to_sheet(simRows);
      XLSX.utils.book_append_sheet(wb, wsSim, 'Simulacion_24_Meses');
    }

    // 3. Hoja de Comparación de Escenarios
    if (scenariosData && scenariosData.length > 0) {
      const scenRows = [
        ['Escenario', 'Inversión', 'Clientes/Ventas', 'CAC Real', 'LTV', 'LTV:CAC', 'Caja Mínima', 'Caja Mes 24', 'Diagnóstico']
      ];
      scenariosData.forEach(s => {
        scenRows.push([
          s.name,
          formatCurrency(s.spend),
          s.customersOrSales,
          formatCurrency(s.cac),
          formatCurrency(s.ltv),
          formatRatio(s.ltvToCac),
          formatCurrency(s.minCash),
          formatCurrency(s.endingCash),
          s.riskNote
        ]);
      });
      const wsScen = XLSX.utils.aoa_to_sheet(scenRows);
      XLSX.utils.book_append_sheet(wb, wsScen, 'Comparativa_Escenarios');
    }

    // Generar archivo y descargar
    const filename = `DecisionLab360_${caseKey}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, filename);
  },

  /**
   * Genera y descarga un Informe Ejecutivo en PDF
   */
  exportCaseToPDF: ({ caseKey, caseName, modelData, simulationData, recommendation, trapAnalysis }) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let currentY = 40;

    // Header superior
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 75, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('DECISIONLAB 360', 40, 42);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`INFORME EJECUTIVO · CASO: ${caseName.toUpperCase()}`, 40, 60);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, pageWidth - 140, 60);

    currentY = 95;

    // Título de Sección
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Diagnóstico y Dictamen Financiero', 40, currentY);
    currentY += 15;

    // Recuadro de Dictamen
    const decisionColor = recommendation.decision === 'ESCALAR' ? [22, 163, 74] 
      : recommendation.decision === 'OPTIMIZAR' ? [202, 138, 4] 
      : [220, 38, 38];

    doc.setFillColor(decisionColor[0], decisionColor[1], decisionColor[2]);
    doc.roundedRect(40, currentY, 120, 26, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`DICTAMEN: ${recommendation.decision}`, 50, currentY + 17);

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const recText = doc.splitTextToSize(recommendation.summary || recommendation.alternative, pageWidth - 210);
    doc.text(recText, 175, currentY + 12);
    currentY += Math.max(35, recText.length * 12 + 10);

    // Tabla de KPIs clave
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Resumen de Indicadores Financieros', 40, currentY);
    currentY += 8;

    let kpiTableBody = [];
    if (caseKey === 'tueste') {
      kpiTableBody = [
        ['Inversión Meta / Fee', `${formatCurrency(modelData.metaSpend)} / ${formatCurrency(modelData.agencyFee)}`, 'Margen Contribución 1er Pedido', `${formatCurrency(modelData.firstSingleOrder.contribution)} (${formatPercent(modelData.firstSingleOrder.marginPercent)})`],
        ['ROAS Break-even', formatRatio(modelData.roasBreakEvenSingle), 'ROAS Reportado vs Real', `${formatRatio(modelData.metaReportedROAS)} Meta vs ${formatRatio(modelData.roasRealFirstOrder)} Real`],
        ['CAC Anuncios vs Real', `${formatCurrency(modelData.cacAds)} vs ${formatCurrency(modelData.cacReal)}`, 'LTV a 12 Meses', formatCurrency(modelData.ltvResults.blendedLTV)],
        ['LTV : CAC Real', `${formatRatio(modelData.ltvToCac)} (${modelData.ltvToCacStatus.toUpperCase()})`, 'Payback Estimado', modelData.paybackMonth ? `${modelData.paybackMonth.toFixed(1)} meses` : 'No recupera']
      ];
    } else if (caseKey === 'agendo') {
      kpiTableBody = [
        ['Inversión Anuncios', formatCurrency(modelData.adSpend), 'Trials / Clientes Pagados Ads', `${formatNumber(modelData.trials)} trials / ${formatNumber(modelData.paidCustomersFromAds)} clientes`],
        ['Margen Bruto Mensual', `${formatCurrency(modelData.unitEconomics.monthlyMargin)} (${formatPercent(modelData.unitEconomics.grossMarginPercent)})`, 'Vendedoras Necesarias', `${modelData.salesRepsNeeded} (${formatCurrency(modelData.totalSalesRepCost)})`],
        ['CAC Paid vs Blended', `${formatCurrency(modelData.cacPaid)} vs ${formatCurrency(modelData.cacBlended)}`, 'LTV 24m vs Sin Tope', `${formatCurrency(modelData.ltvData.ltvMonthly24m)} vs ${formatCurrency(modelData.ltvData.ltvSinTope)}`],
        ['LTV:CAC Paid Real', `${formatRatio(modelData.ltvToCacPaid)} (Claim Valeria: 2.4x)`, 'Payback Mensual', modelData.cashCurves.paybackMonthly ? `${modelData.cashCurves.paybackMonthly.toFixed(1)} meses` : 'No recupera']
      ];
    } else if (caseKey === 'solDeCasa') {
      kpiTableBody = [
        ['Inversión Meta / Google', `${formatCurrency(modelData.metaSpend)} / ${formatCurrency(modelData.googleSpend)}`, 'CPL Meta vs Google', `${formatCurrency(modelData.metaFunnel.cpl)} vs ${formatCurrency(modelData.googleFunnel.cpl)}`],
        ['Capacidad Disponible', `${modelData.totalCapacity} visitas/mes`, 'Visitas Pedidas vs Hechas', `${formatNumber(modelData.totalRequestedVisits, 1)} pedidas / ${formatNumber(modelData.totalVisitsDone, 1)} hechas`],
        ['CAC Real Meta vs Google', `${formatCurrency(modelData.cacRealMeta)} vs ${formatCurrency(modelData.cacRealGoogle)}`, 'LTV:CAC Meta vs Google', `${formatRatio(modelData.ltvToCacMeta)} vs ${formatRatio(modelData.ltvToCacGoogle)}`],
        ['Valor de Visita Meta / Google', `${formatCurrency(modelData.valueOfVisitMeta)} vs ${formatCurrency(modelData.valueOfVisitGoogle)}`, 'Ventas Totales Estimadas', `${formatNumber(modelData.totalSales, 1)} instalaciones`]
      ];
    }

    autoTable(doc, {
      startY: currentY,
      head: [['Métrica A', 'Valor A', 'Métrica B', 'Valor B']],
      body: kpiTableBody,
      theme: 'grid',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8.5, cellPadding: 4 }
    });

    currentY = doc.lastAutoTable.finalY + 15;

    // 3. Apartado de la Trampa
    doc.setTextColor(180, 83, 9);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('3. Desglose Crítico: La Trampa Financiera del Caso', 40, currentY);
    currentY += 12;

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    const trapText = doc.splitTextToSize(
      `Métrica engañosa: "${trapAnalysis.claimedMetric}"\n\nDiagnóstico de Realidad: ${trapAnalysis.whyWrong}\n\nCorrección: ${trapAnalysis.correctedResult}`,
      pageWidth - 80
    );
    doc.text(trapText, 40, currentY);
    currentY += trapText.length * 10 + 15;

    // 4. Proyección de Caja de 24 Meses
    if (simulationData && simulationData.monthlyBreakdown) {
      if (currentY > 620) {
        doc.addPage();
        currentY = 40;
      }

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('4. Evolución de Flujo de Caja y Proyección (Primeros 12 Meses)', 40, currentY);
      currentY += 8;

      const simTableRows = simulationData.monthlyBreakdown.slice(0, 12).map(r => [
        `M${r.month}`,
        formatCurrency(r.metaSpend || r.spend || r.totalSpend || 0, 0),
        formatNumber(r.newCustomers || r.totalNewPaid || r.sales || 0, 0),
        formatCurrency(r.inflows || r.totalContribution || 0, 0),
        formatCurrency(r.outflows || r.totalOutflows || 0, 0),
        formatCurrency(r.netCashFlow || 0, 0),
        formatCurrency(r.endingCash, 0)
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [['Mes', 'Gasto Ads', 'Nuevos/Ventas', 'Ingresos/Contrib', 'Salidas', 'Flujo Neto', 'Saldo Caja']],
        body: simTableRows,
        theme: 'striped',
        headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255] },
        styles: { fontSize: 8, cellPadding: 3 }
      });
    }

    // Pie de página
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`DecisionLab 360 · Plataforma SaaS de Modelado Financiero · Página ${p} de ${totalPages}`, 40, doc.internal.pageSize.getHeight() - 20);
    }

    const filename = `DecisionLab360_Informe_${caseKey}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(filename);
  }
};
