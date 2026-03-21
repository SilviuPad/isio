interface LocaleString { ro: string; en: string; }

interface ServiceSection {
  id: string;
  title: LocaleString;
  items: Array<{ text: LocaleString; icon?: string }>;
}

export interface ServiceDetail {
  serviceKey: string;
  tagline: LocaleString;
  turnaroundDays: LocaleString;
  sections: ServiceSection[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'web-development': {
    serviceKey: 'web-development',
    tagline: {
      ro: 'Website-uri rapide, accesibile și optimizate care transformă vizitatorii în clienți.',
      en: 'Fast, accessible, optimized websites that turn visitors into customers.',
    },
    turnaroundDays: { ro: '14-45 zile', en: '14-45 days' },
    sections: [
      {
        id: 'scope',
        title: { ro: 'Ce include', en: "What's included" },
        items: [
          { text: { ro: 'Design responsive mobile-first', en: 'Mobile-first responsive design' } },
          { text: { ro: 'Optimizare SEO on-page', en: 'On-page SEO optimization' } },
          { text: { ro: 'Integrare CMS (Sanity, WordPress)', en: 'CMS integration (Sanity, WordPress)' } },
          { text: { ro: 'Formular de contact funcțional', en: 'Working contact form' } },
          { text: { ro: 'Hosting și deployment pe Cloudflare', en: 'Cloudflare hosting and deployment' } },
          { text: { ro: 'Certificat SSL și securitate de bază', en: 'SSL certificate and basic security' } },
        ],
      },
      {
        id: 'deliverables',
        title: { ro: 'Ce primești', en: 'What you get' },
        items: [
          { text: { ro: 'Cod sursă complet cu documentație', en: 'Complete source code with documentation' } },
          { text: { ro: 'Scor Lighthouse 90+ pe toate categoriile', en: 'Lighthouse score 90+ on all categories' } },
          { text: { ro: 'Training pentru editarea conținutului CMS', en: 'CMS content editing training' } },
          { text: { ro: '30 de zile suport post-lansare', en: '30 days post-launch support' } },
        ],
      },
    ],
  },
  'web-apps': {
    serviceKey: 'web-apps',
    tagline: {
      ro: 'Aplicații web robuste cu funcționalități complexe, construite pentru scalare.',
      en: 'Robust web applications with complex features, built to scale.',
    },
    turnaroundDays: { ro: '30-60 zile', en: '30-60 days' },
    sections: [
      {
        id: 'scope',
        title: { ro: 'Ce include', en: "What's included" },
        items: [
          { text: { ro: 'Arhitectură full-stack cu TypeScript', en: 'Full-stack TypeScript architecture' } },
          { text: { ro: 'Autentificare și autorizare utilizatori', en: 'User authentication and authorization' } },
          { text: { ro: 'Bază de date PostgreSQL optimizată', en: 'Optimized PostgreSQL database' } },
          { text: { ro: 'API REST sau GraphQL', en: 'REST or GraphQL API' } },
          { text: { ro: 'Dashboard admin personalizat', en: 'Custom admin dashboard' } },
          { text: { ro: 'Integrări third-party (plăți, email, etc.)', en: 'Third-party integrations (payments, email, etc.)' } },
        ],
      },
      {
        id: 'deliverables',
        title: { ro: 'Ce primești', en: 'What you get' },
        items: [
          { text: { ro: 'Aplicație funcțională deployată', en: 'Deployed functional application' } },
          { text: { ro: 'Documentație API completă', en: 'Complete API documentation' } },
          { text: { ro: 'Pipeline CI/CD configurată', en: 'Configured CI/CD pipeline' } },
          { text: { ro: '60 de zile suport post-lansare', en: '60 days post-launch support' } },
        ],
      },
    ],
  },
  'seo': {
    serviceKey: 'seo',
    tagline: {
      ro: 'Strategie SEO bazată pe date care aduce trafic organic și conversii.',
      en: 'Data-driven SEO strategy that drives organic traffic and conversions.',
    },
    turnaroundDays: { ro: '14-30 zile', en: '14-30 days' },
    sections: [
      {
        id: 'scope',
        title: { ro: 'Ce include', en: "What's included" },
        items: [
          { text: { ro: 'Audit SEO tehnic complet (140+ verificări)', en: 'Complete technical SEO audit (140+ checks)' } },
          { text: { ro: 'Cercetare cuvinte cheie și analiza competitorilor', en: 'Keyword research and competitor analysis' } },
          { text: { ro: 'Optimizare on-page (meta tags, structură, conținut)', en: 'On-page optimization (meta tags, structure, content)' } },
          { text: { ro: 'Optimizare Schema.org și date structurate', en: 'Schema.org and structured data optimization' } },
          { text: { ro: 'Monitorizare poziții și raportare', en: 'Position monitoring and reporting' } },
          { text: { ro: 'Strategie de link building', en: 'Link building strategy' } },
        ],
      },
      {
        id: 'deliverables',
        title: { ro: 'Ce primești', en: 'What you get' },
        items: [
          { text: { ro: 'Raport de audit detaliat cu priorități', en: 'Detailed audit report with priorities' } },
          { text: { ro: 'Plan de acțiune SEO pe 3 luni', en: '3-month SEO action plan' } },
          { text: { ro: 'Dashboard cu metrici și progres', en: 'Metrics and progress dashboard' } },
          { text: { ro: 'Rapoarte lunare de performanță', en: 'Monthly performance reports' } },
        ],
      },
    ],
  },
  'accessibility': {
    serviceKey: 'accessibility',
    tagline: {
      ro: 'Audituri de accesibilitate WCAG care fac site-ul tău utilizabil de toți.',
      en: 'WCAG accessibility audits that make your site usable by everyone.',
    },
    turnaroundDays: { ro: '10-21 zile', en: '10-21 days' },
    sections: [
      {
        id: 'scope',
        title: { ro: 'Ce include', en: "What's included" },
        items: [
          { text: { ro: 'Audit WCAG 2.1 (nivel A, AA sau AAA)', en: 'WCAG 2.1 audit (Level A, AA, or AAA)' } },
          { text: { ro: 'Testare cu screen reader (NVDA, VoiceOver)', en: 'Screen reader testing (NVDA, VoiceOver)' } },
          { text: { ro: 'Testare navigare cu tastatură', en: 'Keyboard navigation testing' } },
          { text: { ro: 'Verificare contrast culori și tipografie', en: 'Color contrast and typography check' } },
          { text: { ro: 'Testare formulare și elemente interactive', en: 'Form and interactive element testing' } },
          { text: { ro: 'Verificare compatibilitate dispozitive asistive', en: 'Assistive device compatibility check' } },
        ],
      },
      {
        id: 'deliverables',
        title: { ro: 'Ce primești', en: 'What you get' },
        items: [
          { text: { ro: 'Raport de audit cu capturile de ecran', en: 'Audit report with screenshots' } },
          { text: { ro: 'Lista de probleme prioritizată pe severitate', en: 'Issue list prioritized by severity' } },
          { text: { ro: 'Ghid de remediere pas cu pas', en: 'Step-by-step remediation guide' } },
          { text: { ro: 'Re-testare după remediere (pachetele Standard+)', en: 'Re-test after remediation (Standard+ plans)' } },
        ],
      },
    ],
  },
  'ai-agents': {
    serviceKey: 'ai-agents',
    tagline: {
      ro: 'Agenți AI autonomi care lucrează 24/7 pentru afacerea ta.',
      en: 'Autonomous AI agents that work 24/7 for your business.',
    },
    turnaroundDays: { ro: '21-60 zile', en: '21-60 days' },
    sections: [
      {
        id: 'scope',
        title: { ro: 'Ce include', en: "What's included" },
        items: [
          { text: { ro: 'Analiză procese și identificare oportunități de automatizare', en: 'Process analysis and automation opportunity identification' } },
          { text: { ro: 'Proiectare arhitectură agent (single sau multi-agent)', en: 'Agent architecture design (single or multi-agent)' } },
          { text: { ro: 'Integrare cu API-uri existente și baze de date', en: 'Integration with existing APIs and databases' } },
          { text: { ro: 'Monitorizare și alertare automată', en: 'Automated monitoring and alerting' } },
          { text: { ro: 'Dashboard de control și raportare', en: 'Control dashboard and reporting' } },
          { text: { ro: 'Deployment pe VPS sau cloud', en: 'VPS or cloud deployment' } },
        ],
      },
      {
        id: 'deliverables',
        title: { ro: 'Ce primești', en: 'What you get' },
        items: [
          { text: { ro: 'Agent funcțional deployat în producție', en: 'Functional agent deployed to production' } },
          { text: { ro: 'Documentație completă a arhitecturii', en: 'Complete architecture documentation' } },
          { text: { ro: 'Training operare și monitorizare', en: 'Operation and monitoring training' } },
          { text: { ro: '90 de zile suport și optimizare post-lansare', en: '90 days post-launch support and optimization' } },
        ],
      },
    ],
  },
};

export function getServiceDetail(serviceKey: string): ServiceDetail | undefined {
  return serviceDetails[serviceKey];
}
