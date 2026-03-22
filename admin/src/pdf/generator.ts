import { jsPDF } from 'jspdf';
import { ISIO_BRAND, BRAND_COLORS } from './branding';
import type { Locale } from './types';

let fontBase64: string | null = null;

export async function createDocWithFont(): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  if (!fontBase64) {
    const response = await fetch('/fonts/NotoSans-Regular.ttf');
    if (!response.ok) {
      console.error('Failed to load font:', response.status);
      return doc;
    }
    const buffer = await response.arrayBuffer();
    // Convert ArrayBuffer to base64 in chunks to avoid stack overflow
    const bytes = new Uint8Array(buffer);
    const chunkSize = 8192;
    let binary = '';
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
    }
    fontBase64 = btoa(binary);
  }

  doc.addFileToVFS('NotoSans-Regular.ttf', fontBase64);
  doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.setFont('NotoSans');

  return doc;
}

export function addHeader(
  doc: jsPDF,
  title: string,
  locale: Locale
): number {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Isio brand name
  doc.setFontSize(20);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(ISIO_BRAND.fullName, 20, 20);

  // Contact info line
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.gray);
  doc.text(`${ISIO_BRAND.email} | ${ISIO_BRAND.website}`, 20, 27);

  // Horizontal rule
  doc.setDrawColor(...BRAND_COLORS.primary);
  doc.setLineWidth(0.5);
  doc.line(20, 32, pageWidth - 20, 32);

  // Document title
  doc.setFontSize(16);
  doc.setTextColor(...BRAND_COLORS.primary);
  doc.text(title, 20, 42);

  // Reset to default text style
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_COLORS.dark);

  return 50; // Return Y offset after header
}

export function addClientBlock(
  doc: jsPDF,
  client: { companyName: string; contactPerson: string; email: string; address: string; cui: string },
  locale: Locale,
  yOffset: number
): number {
  const label = locale === 'ro' ? 'Client' : 'Client';
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.dark);
  doc.text(label, 20, yOffset);

  doc.setFontSize(10);
  doc.setTextColor(...BRAND_COLORS.gray);
  let y = yOffset + 6;
  doc.text(client.companyName, 20, y);
  if (client.contactPerson) { y += 5; doc.text(client.contactPerson, 20, y); }
  if (client.email) { y += 5; doc.text(client.email, 20, y); }
  if (client.address) { y += 5; doc.text(client.address, 20, y); }
  if (client.cui) {
    y += 5;
    doc.text(`CUI: ${client.cui}`, 20, y);
  }

  doc.setTextColor(...BRAND_COLORS.dark);
  return y + 10;
}

export function addFooter(doc: jsPDF, locale: Locale): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const footerY = pageHeight - 15;

  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.gray);
  doc.setDrawColor(...BRAND_COLORS.lightGray);
  doc.line(20, footerY - 3, pageWidth - 20, footerY - 3);

  const footerText = locale === 'ro'
    ? `${ISIO_BRAND.name} | ${ISIO_BRAND.email} | ${ISIO_BRAND.website}`
    : `${ISIO_BRAND.name} | ${ISIO_BRAND.email} | ${ISIO_BRAND.website}`;
  doc.text(footerText, pageWidth / 2, footerY, { align: 'center' });

  doc.setTextColor(...BRAND_COLORS.dark);
}
