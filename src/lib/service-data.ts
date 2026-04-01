interface LocaleString { ro: string; en: string; }

interface ServiceFaq {
  question: LocaleString;
  answer: LocaleString;
}

interface ServiceSection {
  id: string;
  title: LocaleString;
  prose?: LocaleString[];
  items: Array<{ text: LocaleString; icon?: string }>;
}

export interface ServiceDetail {
  serviceKey: string;
  tagline: LocaleString;
  turnaroundDays: LocaleString;
  sections: ServiceSection[];
  faq?: ServiceFaq[];
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
        prose: [
          {
            ro: 'Fiecare proiect de dezvoltare web la Isio incepe cu o analiza detaliata a obiectivelor de business, a publicului tinta si a competitorilor directi. Nu folosim template-uri generice — construim de la zero cu Astro si TypeScript, doua tehnologii care produc site-uri cu timp de incarcare sub 1 secunda si scoruri Lighthouse de 95-100. Aceasta abordare asigura ca fiecare pagina este optimizata atat pentru motoarele de cautare, cat si pentru experienta utilizatorului.',
            en: 'Every web development project at Isio starts with a detailed analysis of business objectives, target audience, and direct competitors. We do not use generic templates — we build from scratch with Astro and TypeScript, two technologies that produce sites with sub-1-second load times and Lighthouse scores of 95-100. This approach ensures every page is optimized for both search engines and user experience.',
          },
          {
            ro: 'Procesul nostru de dezvoltare urmeaza o metodologie clara in patru etape: descoperire (analiza cerinte, audit competitie, structura sitemap), design (wireframes mobile-first, prototipuri interactive), dezvoltare (cod semantic, SEO tehnic integrat, testare cross-browser pe minim 5 browsere), si lansare (deployment pe Cloudflare Workers cu CDN global, configurare DNS, SSL si monitorizare post-lansare timp de 30 de zile). Fiecare etapa include un checkpoint de aprobare inainte de a avansa.',
            en: 'Our development process follows a clear four-stage methodology: discovery (requirements analysis, competitor audit, sitemap structure), design (mobile-first wireframes, interactive prototypes), development (semantic code, integrated technical SEO, cross-browser testing on at least 5 browsers), and launch (deployment on Cloudflare Workers with global CDN, DNS configuration, SSL, and 30-day post-launch monitoring). Each stage includes an approval checkpoint before moving forward.',
          },
          {
            ro: 'Toate website-urile livrate de Isio includ optimizare SEO on-page de la prima linie de cod: titluri si meta descriptions unice per pagina, structura de headings corecta (H1-H6), date structurate Schema.org, hreflang pentru site-uri bilingve, sitemap XML generat automat si taguri canonical. Nu consideram un site finalizat pana cand auditul SEO tehnic nu confirma zero erori critice.',
            en: 'All websites delivered by Isio include on-page SEO optimization from the first line of code: unique titles and meta descriptions per page, correct heading structure (H1-H6), Schema.org structured data, hreflang for bilingual sites, auto-generated XML sitemap, and canonical tags. We do not consider a site finished until the technical SEO audit confirms zero critical errors.',
          },
        ],
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
        prose: [
          {
            ro: 'La finalizarea proiectului primesti codul sursa complet, documentat si versionat in Git. Includem un ghid de editare a continutului adaptat CMS-ului ales (Sanity, WordPress sau Astro Content Collections), astfel incat sa poti actualiza texte, imagini si pagini fara asistenta tehnica. Suportul post-lansare de 30 de zile acopera corectari de bug-uri, ajustari minore de continut si asistenta la configurarea Google Search Console si Analytics.',
            en: 'At project completion you receive the full source code, documented and versioned in Git. We include a content editing guide tailored to the chosen CMS (Sanity, WordPress, or Astro Content Collections), so you can update text, images, and pages without technical assistance. The 30-day post-launch support covers bug fixes, minor content adjustments, and assistance with Google Search Console and Analytics setup.',
          },
        ],
        items: [
          { text: { ro: 'Cod sursă complet cu documentație', en: 'Complete source code with documentation' } },
          { text: { ro: 'Scor Lighthouse 90+ pe toate categoriile', en: 'Lighthouse score 90+ on all categories' } },
          { text: { ro: 'Training pentru editarea conținutului CMS', en: 'CMS content editing training' } },
          { text: { ro: '30 de zile suport post-lansare', en: '30 days post-launch support' } },
        ],
      },
    ],
    faq: [
      {
        question: { ro: 'Cat dureaza dezvoltarea unui website?', en: 'How long does website development take?' },
        answer: { ro: 'Un website de prezentare standard cu 5-10 pagini se livreaza in 14-21 de zile. Proiectele mai complexe cu CMS, blog, multilingvism sau integrari third-party necesita 30-45 de zile. Fiecare proiect incepe cu un timeline detaliat agreat in faza de descoperire, iar progresul este comunicat saptamanal.', en: 'A standard presentation website with 5-10 pages is delivered in 14-21 days. More complex projects with CMS, blog, multilingual support, or third-party integrations require 30-45 days. Each project starts with a detailed timeline agreed during the discovery phase, and progress is communicated weekly.' },
      },
      {
        question: { ro: 'Ce tehnologii folosesti pentru dezvoltare?', en: 'What technologies do you use for development?' },
        answer: { ro: 'Stack-ul principal include Astro (framework de generare statica cu support SSR), TypeScript (pentru cod type-safe si mentenabil), Tailwind CSS (pentru design responsive rapid) si Cloudflare Workers (pentru hosting global cu latenta sub 50ms). Pentru CMS, recomandam Sanity (headless) sau WordPress (daca clientul are deja continut acolo). Alegem tehnologia in functie de nevoile proiectului, nu de preferinte personale.', en: 'The primary stack includes Astro (static generation framework with SSR support), TypeScript (for type-safe, maintainable code), Tailwind CSS (for rapid responsive design), and Cloudflare Workers (for global hosting with sub-50ms latency). For CMS, we recommend Sanity (headless) or WordPress (if the client already has content there). We choose technology based on project needs, not personal preferences.' },
      },
      {
        question: { ro: 'Pot edita continutul site-ului singur dupa lansare?', en: 'Can I edit the website content myself after launch?' },
        answer: { ro: 'Da. Toate proiectele includ un CMS (sistem de gestionare a continutului) si un training de 1-2 ore in care te invatam sa editezi texte, imagini, sa adaugi pagini noi si sa gestionezi SEO-ul de baza. Primesti si un ghid scris pas cu pas. Daca intampini dificultati in primele 30 de zile, suportul post-lansare este inclus gratuit.', en: 'Yes. All projects include a CMS (content management system) and a 1-2 hour training session where we teach you to edit text, images, add new pages, and manage basic SEO. You also receive a written step-by-step guide. If you encounter difficulties in the first 30 days, post-launch support is included at no extra cost.' },
      },
      {
        question: { ro: 'Website-ul va fi optimizat pentru mobil?', en: 'Will the website be mobile-optimized?' },
        answer: { ro: 'Absolut. Dezvoltam mobile-first, ceea ce inseamna ca design-ul este creat intai pentru ecrane mici si apoi adaptat pentru desktop. Testam pe minim 5 browsere (Chrome, Safari, Firefox, Edge, Samsung Internet) si pe dispozitive reale, nu doar in emulator. Toate elementele interactive respecta dimensiunea minima de 48x48px pentru touch targets, conform recomandarilor Google.', en: 'Absolutely. We develop mobile-first, meaning the design is created for small screens first and then adapted for desktop. We test on at least 5 browsers (Chrome, Safari, Firefox, Edge, Samsung Internet) and on real devices, not just emulators. All interactive elements meet the minimum 48x48px size for touch targets, following Google recommendations.' },
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
        prose: [
          {
            ro: 'Aplicatiile web dezvoltate de Isio sunt construite pentru a rezolva probleme specifice de business — de la dashboard-uri interne si platforme SaaS pana la sisteme de gestionare a comenzilor si portaluri pentru clienti. Folosim o arhitectura full-stack TypeScript care asigura type safety de la baza de date pana la interfata, eliminand o categorie intreaga de bug-uri inca din faza de dezvoltare.',
            en: 'Web applications developed by Isio are built to solve specific business problems — from internal dashboards and SaaS platforms to order management systems and client portals. We use a full-stack TypeScript architecture that ensures type safety from database to interface, eliminating an entire category of bugs during the development phase.',
          },
          {
            ro: 'Procesul de dezvoltare incepe cu o analiza aprofundata a fluxurilor de lucru existente si a punctelor de frictiunie. Cartografiem fiecare user journey, identificam operatiunile repetitive care pot fi automatizate si proiectam arhitectura bazei de date inainte de a scrie prima linie de cod. Folosim PostgreSQL cu Drizzle ORM pentru interogari type-safe, iar API-urile sunt construite ca endpoint-uri REST cu validare Zod a fiecarui request si response.',
            en: 'The development process starts with an in-depth analysis of existing workflows and friction points. We map every user journey, identify repetitive operations that can be automated, and design the database architecture before writing the first line of code. We use PostgreSQL with Drizzle ORM for type-safe queries, and APIs are built as REST endpoints with Zod validation on every request and response.',
          },
          {
            ro: 'Securitatea este integrata in fiecare strat al aplicatiei: autentificare cu JWT si refresh token rotation, autorizare bazata pe roluri (RBAC), protectie CSRF, rate limiting pe endpoint-uri publice, si encriptarea datelor sensibile at-rest si in-transit. Configurarea CI/CD cu GitHub Actions asigura ca fiecare commit trece prin teste automate, type checking si linting inainte de a ajunge in productie.',
            en: 'Security is integrated into every layer of the application: authentication with JWT and refresh token rotation, role-based access control (RBAC), CSRF protection, rate limiting on public endpoints, and encryption of sensitive data at-rest and in-transit. CI/CD configuration with GitHub Actions ensures every commit passes automated tests, type checking, and linting before reaching production.',
          },
        ],
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
        prose: [
          {
            ro: 'La predare primesti aplicatia deployata si functionala, codul sursa complet in repository Git, documentatia API generata din cod (cu exemple de request/response pentru fiecare endpoint), si un ghid de administrare a dashboard-ului. Pipeline-ul CI/CD este configurat astfel incat orice actualizare push-uita pe branch-ul principal se deployeaza automat in productie dupa ce trece toate testele.',
            en: 'At handover you receive the deployed and functional application, the complete source code in a Git repository, API documentation generated from code (with request/response examples for each endpoint), and a dashboard administration guide. The CI/CD pipeline is configured so that any update pushed to the main branch automatically deploys to production after passing all tests.',
          },
        ],
        items: [
          { text: { ro: 'Aplicație funcțională deployată', en: 'Deployed functional application' } },
          { text: { ro: 'Documentație API completă', en: 'Complete API documentation' } },
          { text: { ro: 'Pipeline CI/CD configurată', en: 'Configured CI/CD pipeline' } },
          { text: { ro: '60 de zile suport post-lansare', en: '60 days post-launch support' } },
        ],
      },
    ],
    faq: [
      {
        question: { ro: 'Care este diferenta dintre un website si o aplicatie web?', en: 'What is the difference between a website and a web application?' },
        answer: { ro: 'Un website prezinta informatii si este in mare parte static — vizitatorii citesc continut, completeaza formulare si navigheaza intre pagini. O aplicatie web permite interactiune complexa: utilizatorii se autentifica, gestioneaza date, executa operatiuni si primesc raspunsuri in timp real. Exemple tipice de aplicatii web: dashboard-uri de analytics, platforme de e-commerce cu gestiune de inventar, sisteme CRM sau portaluri interne de companie.', en: 'A website presents information and is largely static — visitors read content, fill in forms, and navigate between pages. A web application allows complex interaction: users authenticate, manage data, execute operations, and receive real-time responses. Typical web application examples: analytics dashboards, e-commerce platforms with inventory management, CRM systems, or internal company portals.' },
      },
      {
        question: { ro: 'Pot integra aplicatia cu sisteme existente?', en: 'Can the application integrate with existing systems?' },
        answer: { ro: 'Da. Construim aplicatii cu arhitectura modulara care se integreaza prin API-uri REST cu orice sistem extern — plati (Stripe, Netopia), email (Resend, SendGrid), stocare fisiere (Cloudflare R2, AWS S3), servicii de autentificare (OAuth, SAML), sau ERP-uri si CRM-uri existente. In faza de descoperire documentam fiecare integrare necesara si validam disponibilitatea API-urilor.', en: 'Yes. We build applications with modular architecture that integrate via REST APIs with any external system — payments (Stripe, Netopia), email (Resend, SendGrid), file storage (Cloudflare R2, AWS S3), authentication services (OAuth, SAML), or existing ERPs and CRMs. During the discovery phase we document each required integration and validate API availability.' },
      },
      {
        question: { ro: 'Cum gestionati securitatea datelor?', en: 'How do you handle data security?' },
        answer: { ro: 'Aplicam principiul zero-trust: fiecare request este autentificat si autorizat independent, datele sensibile sunt encriptate atat in tranzit (TLS 1.3) cat si la stocare (AES-256), iar accesul la baza de date este restrictionat prin row-level security. Facem code review pe fiecare pull request, rulam teste automate de securitate in CI, si documentam toate masurile de securitate intr-un Security Disclosure pe care il primesti la predare.', en: 'We apply the zero-trust principle: every request is independently authenticated and authorized, sensitive data is encrypted both in transit (TLS 1.3) and at rest (AES-256), and database access is restricted through row-level security. We perform code review on every pull request, run automated security tests in CI, and document all security measures in a Security Disclosure that you receive at handover.' },
      },
      {
        question: { ro: 'Cat costa dezvoltarea unei aplicatii web?', en: 'How much does web application development cost?' },
        answer: { ro: 'Costul depinde de complexitatea aplicatiei. Un MVP (Minimum Viable Product) cu autentificare, un dashboard si 3-5 functionalitati principale se incadreaza de obicei in pachetul Standard sau Premium de pe pagina de preturi. In faza de descoperire gratuita analizam cerintele si oferim o estimare detaliata pe functionalitati, cu timeline si cost transparent per etapa.', en: 'The cost depends on application complexity. An MVP (Minimum Viable Product) with authentication, a dashboard, and 3-5 core features typically fits within the Standard or Premium package on the pricing page. During the free discovery phase we analyze requirements and provide a detailed estimate by feature, with transparent per-stage timeline and cost.' },
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
        prose: [
          {
            ro: 'Serviciul de SEO oferit de Isio este tehnic si orientat pe date, nu pe promisiuni vagi de "prima pagina Google". Incepem fiecare colaborare cu un audit SEO tehnic de peste 140 de verificari care acopera: crawlability (robots.txt, sitemap, indexare), performanta (Core Web Vitals, LCP, CLS, INP), structura continutului (headings, thin content, duplicate content), date structurate (Schema.org), si securitate (HTTPS, headers). Raportul de audit include fiecare problema identificata cu prioritate, fisier afectat si estimare de efort.',
            en: 'The SEO service offered by Isio is technical and data-driven, not based on vague promises of "first page on Google." We start every engagement with a technical SEO audit of over 140 checks covering: crawlability (robots.txt, sitemap, indexing), performance (Core Web Vitals, LCP, CLS, INP), content structure (headings, thin content, duplicate content), structured data (Schema.org), and security (HTTPS, headers). The audit report includes every identified issue with priority, affected file, and effort estimate.',
          },
          {
            ro: 'Dupa audit, construim un plan de actiune SEO pe 3 luni structurat pe saptamani, cu sarcini concrete si metrici de succes. Prioritizam intotdeauna "quick wins" — schimbarile cu impact mare si efort mic care pot imbunatati vizibil pozitionarea in 2-4 saptamani. Apoi abordam optimizarile de fond: imbunatatirea Core Web Vitals, restructurarea continutului thin, implementarea Schema.org complet, si crearea de continut optimizat pentru AI search (GEO — Generative Engine Optimization).',
            en: 'After the audit, we build a 3-month SEO action plan structured by week, with concrete tasks and success metrics. We always prioritize "quick wins" — high-impact, low-effort changes that can visibly improve rankings in 2-4 weeks. Then we tackle foundational optimizations: improving Core Web Vitals, restructuring thin content, implementing complete Schema.org, and creating content optimized for AI search (GEO — Generative Engine Optimization).',
          },
          {
            ro: 'Monitorizarea este continua: urmarim pozitiile pe cuvintele cheie tinta, traficul organic din Google Search Console si Analytics, rata de click (CTR) din rezultatele de cautare, si aparitiile in raspunsurile AI (ChatGPT, Perplexity, Google AI Overviews). Rapoartele lunare includ: schimbari de pozitie, pagini cu cea mai mare crestere, probleme tehnice noi detectate, si recomandari pentru luna urmatoare.',
            en: 'Monitoring is continuous: we track positions for target keywords, organic traffic from Google Search Console and Analytics, click-through rate (CTR) from search results, and appearances in AI answers (ChatGPT, Perplexity, Google AI Overviews). Monthly reports include: position changes, pages with the highest growth, newly detected technical issues, and recommendations for the following month.',
          },
        ],
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
        prose: [
          {
            ro: 'Raportul de audit initial este un document detaliat de 15-30 de pagini (livrat in PDF si format interactiv) care include capturi de ecran, cod sursa afectat, si instructiuni pas cu pas pentru fiecare remediere. Dashboard-ul de monitorizare ofera vizualizare in timp real a metricilor cheie. Rapoartele lunare compara performanta curenta cu luna anterioara si cu benchmark-urile din industrie.',
            en: 'The initial audit report is a detailed 15-30 page document (delivered in PDF and interactive format) that includes screenshots, affected source code, and step-by-step instructions for each fix. The monitoring dashboard provides real-time visualization of key metrics. Monthly reports compare current performance with the previous month and industry benchmarks.',
          },
        ],
        items: [
          { text: { ro: 'Raport de audit detaliat cu priorități', en: 'Detailed audit report with priorities' } },
          { text: { ro: 'Plan de acțiune SEO pe 3 luni', en: '3-month SEO action plan' } },
          { text: { ro: 'Dashboard cu metrici și progres', en: 'Metrics and progress dashboard' } },
          { text: { ro: 'Rapoarte lunare de performanță', en: 'Monthly performance reports' } },
        ],
      },
    ],
    faq: [
      {
        question: { ro: 'Cat dureaza pana vad rezultate SEO?', en: 'How long until I see SEO results?' },
        answer: { ro: 'Optimizarile tehnice (Core Web Vitals, fix-uri de indexare, date structurate) au efect in 1-4 saptamani dupa ce Google re-crawleaza paginile. Imbunatatirile de continut si link building au un orizont de 2-4 luni pentru rezultate vizibile in pozitionare. Oferim rapoarte lunare cu metrici concrete pentru a demonstra progresul in fiecare etapa — nu cerem sa ne crezi pe cuvant, ci sa verifici datele.', en: 'Technical optimizations (Core Web Vitals, indexing fixes, structured data) take effect within 1-4 weeks after Google re-crawls the pages. Content improvements and link building have a 2-4 month horizon for visible ranking results. We provide monthly reports with concrete metrics to demonstrate progress at each stage — we do not ask you to take our word for it, but to verify the data.' },
      },
      {
        question: { ro: 'Ce diferentiaza SEO-ul tehnic de cel "clasic"?', en: 'What differentiates technical SEO from "traditional" SEO?' },
        answer: { ro: 'SEO-ul clasic se concentreaza pe cuvinte cheie si continut. SEO-ul tehnic se concentreaza pe infrastructura: cat de repede se incarca site-ul (Core Web Vitals), daca Google poate crawla si indexa corect toate paginile, daca datele structurate (Schema.org) sunt implementate corect, si daca site-ul respecta best practices de securitate si accesibilitate. La Isio, facem amandoua — dar incepem intotdeauna cu fundamentul tehnic, pentru ca fara el, continutul cel mai bun tot nu se pozitioneaza.', en: 'Traditional SEO focuses on keywords and content. Technical SEO focuses on infrastructure: how fast the site loads (Core Web Vitals), whether Google can correctly crawl and index all pages, whether structured data (Schema.org) is properly implemented, and whether the site follows security and accessibility best practices. At Isio, we do both — but we always start with the technical foundation, because without it, even the best content does not rank.' },
      },
      {
        question: { ro: 'Garantati pozitia 1 pe Google?', en: 'Do you guarantee position 1 on Google?' },
        answer: { ro: 'Nu. Nicio agentie serioasa nu poate garanta o pozitie specifica, pentru ca algoritmul Google ia in calcul sute de factori care se schimba constant. Ce garantam: un audit tehnic complet, implementarea corecta a tuturor optimizarilor identificate, si rapoarte transparente cu metrici verificabile. Clientii nostri vad de obicei o imbunatatire de 20-50% a traficului organic in primele 3 luni.', en: 'No. No serious agency can guarantee a specific position, because Google algorithm considers hundreds of constantly changing factors. What we guarantee: a complete technical audit, correct implementation of all identified optimizations, and transparent reports with verifiable metrics. Our clients typically see a 20-50% improvement in organic traffic within the first 3 months.' },
      },
      {
        question: { ro: 'Faceti si optimizare pentru AI search (ChatGPT, Perplexity)?', en: 'Do you also optimize for AI search (ChatGPT, Perplexity)?' },
        answer: { ro: 'Da. GEO (Generative Engine Optimization) este o componenta activa a serviciului nostru. Implementam llms.txt pentru structurarea informatiilor pentru modele AI, optimizam continutul pentru citabilitate (raspunsuri self-contained de 134-167 cuvinte cu mentionarea entitatii), folosim headings bazate pe intrebari, si monitorizarea aparitiilor in raspunsurile AI. Aceasta este o zona in crestere rapida si un diferentiator important fata de agentiile SEO traditionale.', en: 'Yes. GEO (Generative Engine Optimization) is an active component of our service. We implement llms.txt for structuring information for AI models, optimize content for citability (self-contained answers of 134-167 words with entity mentions), use question-based headings, and monitor appearances in AI answers. This is a rapidly growing area and an important differentiator from traditional SEO agencies.' },
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
