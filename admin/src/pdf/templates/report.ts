import { jsPDF } from 'jspdf';
import { createDocWithFont, addHeader, addClientBlock, addFooter } from '../generator';
import { BRAND_COLORS } from '../branding';
import type { ReportData, Locale } from '../types';

const labels = {
  ro: {
    seo_audit: 'RAPORT AUDIT SEO',
    accessibility_audit: 'RAPORT AUDIT ACCESIBILITATE',
    date: 'Data',
    overallScore: 'Scor General',
    summary: 'Rezumat',
    findings: 'Constatări',
    recommendations: 'Recomandări',
    severity: {
      critical: 'Critic',
      warning: 'Avertisment',
      info: 'Informativ',
      pass: 'Conform',
    },
  },
  en: {
    seo_audit: 'SEO AUDIT REPORT',
    accessibility_audit: 'ACCESSIBILITY AUDIT REPORT',
    date: 'Date',
    overallScore: 'Overall Score',
    summary: 'Executive Summary',
    findings: 'Findings',
    recommendations: 'Recommendations',
    severity: {
      critical: 'Critical',
      warning: 'Warning',
      info: 'Info',
      pass: 'Pass',
    },
  },
};

const severityColors: Record<string, [number, number, number]> = {
  critical: BRAND_COLORS.red,
  warning: BRAND_COLORS.yellow,
  info: BRAND_COLORS.primary,
  pass: BRAND_COLORS.green,
};

export async function generateReport(data: ReportData, locale: Locale): Promise<jsPDF> {
  const doc = await createDocWithFont();
  const t = labels[locale];
  const title = t[data.reportType];
  let y = addHeader(doc, title, locale);

  // Date
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.gray);
  doc.text(`${t.date}: ${data.date}`, 20, y);
  y += 10;

  // Client block
  y = addClientBlock(doc, data.client, locale, y);

  // Overall score (large number)
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(t.overallScore, 20, y);
  y += 8;
  doc.setFontSize(28);
  const scoreColor = data.overallScore >= 80 ? BRAND_COLORS.green
    : data.overallScore >= 50 ? BRAND_COLORS.yellow
    : BRAND_COLORS.red;
  doc.setTextColor(...scoreColor);
  doc.text(`${data.overallScore}/100`, 24, y);
  y += 14;

  // Summary
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(t.summary, 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_COLORS.gray);
  const summaryLines = doc.splitTextToSize(data.summary, 166);
  doc.text(summaryLines, 24, y);
  y += summaryLines.length * 5 + 10;

  // Sections with findings
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(t.findings, 20, y);
  y += 8;

  for (const section of data.sections) {
    if (y > 250) { doc.addPage(); y = 20; }

    // Section title with severity badge
    doc.setFontSize(11);
    doc.setTextColor(...BRAND_COLORS.dark);
    doc.text(section.title, 24, y);

    if (section.severity) {
      const color = severityColors[section.severity] || BRAND_COLORS.gray;
      const severityLabel = t.severity[section.severity] || section.severity;
      doc.setFontSize(8);
      doc.setTextColor(...color);
      doc.text(`[${severityLabel}]`, 24 + doc.getTextWidth(section.title) + 3, y);
    }
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor(...BRAND_COLORS.gray);
    for (const finding of section.findings) {
      if (y > 270) { doc.addPage(); y = 20; }
      const findingLines = doc.splitTextToSize(`• ${finding}`, 162);
      doc.text(findingLines, 28, y);
      y += findingLines.length * 5 + 2;
    }
    y += 4;
  }

  // Recommendations
  if (y > 240) { doc.addPage(); y = 20; }
  y += 5;
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(t.recommendations, 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_COLORS.gray);
  let recNum = 1;
  for (const rec of data.recommendations) {
    if (y > 270) { doc.addPage(); y = 20; }
    const recLines = doc.splitTextToSize(`${recNum}. ${rec}`, 162);
    doc.text(recLines, 24, y);
    y += recLines.length * 5 + 3;
    recNum++;
  }

  addFooter(doc, locale);
  return doc;
}
