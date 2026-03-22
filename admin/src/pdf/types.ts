export type Locale = 'ro' | 'en';

export interface DocumentClient {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  cui: string;
  address: string;
  iban: string;
}

export interface ProposalData {
  client: DocumentClient;
  projectName: string;
  projectSummary: string;
  scopeItems: string[];
  pricingBreakdown: { item: string; amount: number }[];
  totalPrice: number;
  timeline: string;
  paymentTerms: string;
  date: string;
  validUntil: string;
}

export interface ContractData {
  client: DocumentClient;
  projectName: string;
  scopeOfWork: string;
  deliverables: string[];
  totalPrice: number;
  paymentSchedule: string;
  startDate: string;
  endDate: string;
  date: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  client: DocumentClient;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  notes: string;
}

export interface ReportSection {
  title: string;
  findings: string[];
  severity?: 'critical' | 'warning' | 'info' | 'pass';
}

export interface ReportData {
  client: DocumentClient;
  reportType: 'seo_audit' | 'accessibility_audit';
  projectName: string;
  date: string;
  overallScore: number;
  summary: string;
  sections: ReportSection[];
  recommendations: string[];
}
