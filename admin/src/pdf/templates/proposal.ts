import { jsPDF } from 'jspdf';
import { createDocWithFont, addHeader, addClientBlock, addFooter } from '../generator';
import { BRAND_COLORS } from '../branding';
import type { ProposalData, Locale } from '../types';

const labels = {
  ro: {
    title: 'PROPUNERE',
    projectSummary: 'Rezumatul Proiectului',
    scopeOfWork: 'Domeniu de Lucru',
    pricing: 'Detalii Preț',
    item: 'Element',
    amount: 'Sumă',
    total: 'Total',
    timeline: 'Termen de Livrare',
    paymentTerms: 'Condiții de Plată',
    date: 'Data',
    validUntil: 'Valabilă până la',
    currency: 'EUR',
  },
  en: {
    title: 'PROPOSAL',
    projectSummary: 'Project Summary',
    scopeOfWork: 'Scope of Work',
    pricing: 'Pricing Breakdown',
    item: 'Item',
    amount: 'Amount',
    total: 'Total',
    timeline: 'Timeline',
    paymentTerms: 'Payment Terms',
    date: 'Date',
    validUntil: 'Valid Until',
    currency: 'EUR',
  },
};

export async function generateProposal(data: ProposalData, locale: Locale): Promise<jsPDF> {
  const doc = await createDocWithFont();
  const t = labels[locale];
  let y = addHeader(doc, t.title, locale);

  // Date and validity
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.gray);
  doc.text(`${t.date}: ${data.date}`, 20, y);
  doc.text(`${t.validUntil}: ${data.validUntil}`, 20, y + 5);
  y += 14;

  // Client block
  y = addClientBlock(doc, data.client, locale, y);

  // Project summary
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(t.projectSummary, 20, y);
  y += 7;
  doc.setFontSize(10);
  const summaryLines = doc.splitTextToSize(data.projectSummary, 170);
  doc.text(summaryLines, 20, y);
  y += summaryLines.length * 5 + 8;

  // Scope of work
  doc.setFontSize(12);
  doc.text(t.scopeOfWork, 20, y);
  y += 7;
  doc.setFontSize(10);
  for (const item of data.scopeItems) {
    doc.text(`• ${item}`, 24, y);
    y += 6;
  }
  y += 5;

  // Pricing breakdown (simple table)
  doc.setFontSize(12);
  doc.text(t.pricing, 20, y);
  y += 7;
  doc.setFontSize(10);
  for (const row of data.pricingBreakdown) {
    doc.text(row.item, 24, y);
    doc.text(`€${row.amount.toFixed(2)}`, 170, y, { align: 'right' });
    y += 6;
  }
  // Total line
  doc.setDrawColor(...BRAND_COLORS.gray);
  doc.line(20, y, 190, y);
  y += 6;
  doc.setFontSize(11);
  doc.text(t.total, 24, y);
  doc.text(`€${data.totalPrice.toFixed(2)}`, 170, y, { align: 'right' });
  y += 10;

  // Timeline
  doc.setFontSize(12);
  doc.text(t.timeline, 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.text(data.timeline, 24, y);
  y += 10;

  // Payment terms
  doc.setFontSize(12);
  doc.text(t.paymentTerms, 20, y);
  y += 7;
  doc.setFontSize(10);
  const termsLines = doc.splitTextToSize(data.paymentTerms, 166);
  doc.text(termsLines, 24, y);

  addFooter(doc, locale);
  return doc;
}
