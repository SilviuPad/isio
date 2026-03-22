import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { createDocWithFont, addHeader, addClientBlock, addFooter } from '../generator';
import { ISIO_BRAND, BRAND_COLORS } from '../branding';
import type { InvoiceData, Locale } from '../types';

const labels = {
  ro: {
    title: 'FACTURĂ',
    invoiceNo: 'Nr. Factură',
    date: 'Data',
    dueDate: 'Scadență',
    billTo: 'Facturat către',
    description: 'Descriere',
    qty: 'Cant.',
    unitPrice: 'Preț Unitar',
    total: 'Total',
    subtotal: 'Subtotal',
    grandTotal: 'TOTAL DE PLATĂ',
    bankDetails: 'Date Bancare pentru Plată',
    bankName: 'Bancă',
    iban: 'IBAN',
    beneficiary: 'Beneficiar',
    notes: 'Observații',
    currency: 'EUR',
  },
  en: {
    title: 'INVOICE',
    invoiceNo: 'Invoice No.',
    date: 'Date',
    dueDate: 'Due Date',
    billTo: 'Bill To',
    description: 'Description',
    qty: 'Qty',
    unitPrice: 'Unit Price',
    total: 'Total',
    subtotal: 'Subtotal',
    grandTotal: 'TOTAL DUE',
    bankDetails: 'Bank Details for Payment',
    bankName: 'Bank',
    iban: 'IBAN',
    beneficiary: 'Beneficiary',
    notes: 'Notes',
    currency: 'EUR',
  },
};

export async function generateInvoice(data: InvoiceData, locale: Locale): Promise<jsPDF> {
  const doc = await createDocWithFont();
  const t = labels[locale];
  let y = addHeader(doc, t.title, locale);

  // Invoice metadata (right-aligned block)
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_COLORS.gray);
  doc.text(`${t.invoiceNo}: ${data.invoiceNumber}`, 190, y - 8, { align: 'right' });
  doc.text(`${t.date}: ${data.date}`, 190, y - 3, { align: 'right' });
  doc.text(`${t.dueDate}: ${data.dueDate}`, 190, y + 2, { align: 'right' });
  y += 6;

  // Client block
  y = addClientBlock(doc, data.client, locale, y);

  // Line items table using jspdf-autotable
  const tableBody = data.lineItems.map(item => [
    item.description,
    item.quantity.toString(),
    `€${item.unitPrice.toFixed(2)}`,
    `€${(item.quantity * item.unitPrice).toFixed(2)}`,
  ]);

  const subtotal = data.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice, 0
  );

  autoTable(doc, {
    startY: y,
    head: [[t.description, t.qty, t.unitPrice, t.total]],
    body: tableBody,
    foot: [[t.grandTotal, '', '', `€${subtotal.toFixed(2)}`]],
    styles: {
      font: 'NotoSans',
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: BRAND_COLORS.dark,
      textColor: 255,
      fontSize: 10,
    },
    footStyles: {
      fillColor: BRAND_COLORS.primary,
      textColor: 255,
      fontSize: 11,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: BRAND_COLORS.lightGray,
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' },
    },
    margin: { left: 20, right: 20 },
  });

  // Get Y position after table
  y = (doc as any).lastAutoTable?.finalY || y + 40;
  y += 15;

  // Bank details section (per D-08 — Isio's IBAN on every invoice)
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(t.bankDetails, 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_COLORS.gray);
  doc.text(`${t.beneficiary}: ${ISIO_BRAND.fullName}`, 24, y);
  y += 5;
  if (ISIO_BRAND.iban) {
    doc.text(`${t.iban}: ${ISIO_BRAND.iban}`, 24, y);
    y += 5;
  }
  if (ISIO_BRAND.bankName) {
    doc.text(`${t.bankName}: ${ISIO_BRAND.bankName}`, 24, y);
    y += 5;
  }
  y += 5;

  // Notes (per D-09 — NO VAT/TVA fields)
  if (data.notes) {
    doc.setFontSize(10);
    doc.setTextColor(...BRAND_COLORS.dark);
    doc.text(t.notes, 20, y);
    y += 6;
    doc.setTextColor(...BRAND_COLORS.gray);
    const noteLines = doc.splitTextToSize(data.notes, 166);
    doc.text(noteLines, 24, y);
  }

  addFooter(doc, locale);
  return doc;
}
