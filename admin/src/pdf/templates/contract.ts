import { jsPDF } from 'jspdf';
import { createDocWithFont, addHeader, addClientBlock, addFooter } from '../generator';
import { ISIO_BRAND, BRAND_COLORS } from '../branding';
import type { ContractData, Locale } from '../types';

const labels = {
  ro: {
    title: 'CONTRACT DE SERVICII',
    parties: 'Părțile Contractante',
    provider: 'Prestator',
    client: 'Beneficiar',
    scopeOfWork: 'Obiectul Contractului',
    deliverables: 'Livrabile',
    pricing: 'Preț și Plată',
    totalPrice: 'Preț total',
    paymentSchedule: 'Calendar de plată',
    duration: 'Durata Contractului',
    startDate: 'Data început',
    endDate: 'Data finalizare',
    generalTerms: 'Condiții Generale',
    confidentiality: 'Confidențialitate',
    confidentialityText: 'Ambele părți se obligă să păstreze confidențialitatea informațiilor obținute în cadrul acestui contract.',
    intellectualProperty: 'Proprietate Intelectuală',
    intellectualPropertyText: 'Toate drepturile de proprietate intelectuală asupra livrabilelor se transferă beneficiarului după plata integrală.',
    termination: 'Reziliere',
    terminationText: 'Oricare parte poate rezilia contractul cu un preaviz scris de 15 zile.',
    liability: 'Răspundere',
    liabilityText: 'Răspunderea prestatorului este limitată la valoarea totală a contractului.',
    date: 'Data',
    currency: 'EUR',
  },
  en: {
    title: 'SERVICES AGREEMENT',
    parties: 'Contracting Parties',
    provider: 'Service Provider',
    client: 'Client',
    scopeOfWork: 'Scope of Work',
    deliverables: 'Deliverables',
    pricing: 'Pricing & Payment',
    totalPrice: 'Total price',
    paymentSchedule: 'Payment schedule',
    duration: 'Contract Duration',
    startDate: 'Start date',
    endDate: 'End date',
    generalTerms: 'General Terms',
    confidentiality: 'Confidentiality',
    confidentialityText: 'Both parties agree to maintain the confidentiality of all information obtained during the execution of this agreement.',
    intellectualProperty: 'Intellectual Property',
    intellectualPropertyText: 'All intellectual property rights in the deliverables shall transfer to the Client upon full payment.',
    termination: 'Termination',
    terminationText: 'Either party may terminate this agreement with 15 days written notice.',
    liability: 'Liability',
    liabilityText: 'The Service Provider\'s liability is limited to the total contract value.',
    date: 'Date',
    currency: 'EUR',
  },
};

export async function generateContract(data: ContractData, locale: Locale): Promise<jsPDF> {
  const doc = await createDocWithFont();
  const t = labels[locale];
  let y = addHeader(doc, t.title, locale);

  // Date
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.gray);
  doc.text(`${t.date}: ${data.date}`, 20, y);
  y += 10;

  // Parties
  doc.setFontSize(12);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(t.parties, 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.text(`${t.provider}: ${ISIO_BRAND.fullName}`, 24, y);
  y += 6;
  doc.text(`${t.client}: ${data.client.companyName}`, 24, y);
  if (data.client.cui) { y += 5; doc.text(`CUI: ${data.client.cui}`, 24, y); }
  y += 10;

  // Scope of work
  doc.setFontSize(12);
  doc.text(t.scopeOfWork, 20, y);
  y += 7;
  doc.setFontSize(10);
  const scopeLines = doc.splitTextToSize(data.scopeOfWork, 166);
  doc.text(scopeLines, 24, y);
  y += scopeLines.length * 5 + 8;

  // Deliverables
  doc.setFontSize(12);
  doc.text(t.deliverables, 20, y);
  y += 7;
  doc.setFontSize(10);
  for (const d of data.deliverables) {
    doc.text(`• ${d}`, 24, y);
    y += 6;
  }
  y += 5;

  // Pricing
  doc.setFontSize(12);
  doc.text(t.pricing, 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.text(`${t.totalPrice}: €${data.totalPrice.toFixed(2)}`, 24, y);
  y += 6;
  const scheduleLines = doc.splitTextToSize(`${t.paymentSchedule}: ${data.paymentSchedule}`, 166);
  doc.text(scheduleLines, 24, y);
  y += scheduleLines.length * 5 + 8;

  // Duration
  doc.setFontSize(12);
  doc.text(t.duration, 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.text(`${t.startDate}: ${data.startDate}`, 24, y);
  y += 6;
  doc.text(`${t.endDate}: ${data.endDate}`, 24, y);
  y += 10;

  // General terms (4 clauses)
  doc.setFontSize(12);
  doc.text(t.generalTerms, 20, y);
  y += 8;
  const clauses = [
    { title: t.confidentiality, text: t.confidentialityText },
    { title: t.intellectualProperty, text: t.intellectualPropertyText },
    { title: t.termination, text: t.terminationText },
    { title: t.liability, text: t.liabilityText },
  ];
  for (const clause of clauses) {
    // Check if we need a new page
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(10);
    doc.setTextColor(...BRAND_COLORS.dark);
    doc.text(clause.title, 24, y);
    y += 6;
    doc.setTextColor(...BRAND_COLORS.gray);
    const clauseLines = doc.splitTextToSize(clause.text, 162);
    doc.text(clauseLines, 28, y);
    y += clauseLines.length * 5 + 6;
  }

  addFooter(doc, locale);
  return doc;
}
