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
      {
        id: 'process',
        title: { ro: 'Procesul de lucru', en: 'Our workflow' },
        prose: [
          {
            ro: 'Colaborarea cu Isio incepe cu un apel de descoperire gratuit de 30-45 minute, in care discutam obiectivele proiectului, publicul tinta si bugetul disponibil. Dupa apel, primesti o propunere detaliata cu specificatii tehnice, timeline pe etape si pret fix — fara costuri ascunse sau estimari vagi. Odata ce propunerea este acceptata, lucrul incepe imediat cu faza de structurare si wireframing.',
            en: 'Working with Isio starts with a free 30-45 minute discovery call where we discuss project goals, target audience, and available budget. After the call, you receive a detailed proposal with technical specifications, phased timeline, and fixed price — no hidden costs or vague estimates. Once the proposal is accepted, work begins immediately with the structuring and wireframing phase.',
          },
          {
            ro: 'Pe parcursul dezvoltarii, comunicarea este directa prin email sau WhatsApp — nu exista intermediari sau ticketing systems care sa incetineasca procesul. La fiecare milestone primesti un link de preview live pentru a testa si oferi feedback in timp real. Modificarile sunt implementate in 24-48 de ore, nu in saptamani. Aceasta agilitate este posibila tocmai pentru ca Isio functioneaza ca un solo developer dedicat proiectului tau, fara overhead-ul unei echipe mari.',
            en: 'Throughout development, communication is direct via email or WhatsApp — there are no intermediaries or ticketing systems to slow down the process. At each milestone you receive a live preview link to test and provide real-time feedback. Changes are implemented within 24-48 hours, not weeks. This agility is possible precisely because Isio operates as a solo developer dedicated to your project, without the overhead of a large team.',
          },
          {
            ro: 'Lansarea include configurare completa: DNS, SSL, redirecturi, Google Search Console, Google Analytics si testare finala pe toate dispozitivele. In primele 30 de zile post-lansare, monitorizez activ Core Web Vitals si rezolv orice problema tehnica fara costuri suplimentare. Obiectivul este ca website-ul tau sa performeze impecabil din prima zi.',
            en: 'Launch includes complete setup: DNS, SSL, redirects, Google Search Console, Google Analytics, and final testing across all devices. During the first 30 days post-launch, I actively monitor Core Web Vitals and resolve any technical issues at no additional cost. The goal is for your website to perform flawlessly from day one.',
          },
        ],
        items: [],
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
      {
        question: { ro: 'Ofer si servicii de redesign pentru website-uri existente?', en: 'Do you offer redesign services for existing websites?' },
        answer: { ro: 'Da, Isio ofera servicii complete de redesign si migrare pentru website-uri existente. Procesul incepe cu un audit al site-ului actual care evalueaza performanta, SEO-ul, accesibilitatea si experienta utilizatorului. Pastram continutul si URL-urile existente (pentru a nu pierde pozitiile SEO), imbunatatim designul, actualizam stack-ul tehnologic si optimizam viteza de incarcare. Migrarea include redirecturi 301 pentru toate URL-urile modificate si verificarea ca nicio pagina indexata nu returneza erori 404.', en: 'Yes, Isio offers complete redesign and migration services for existing websites. The process begins with an audit of the current site evaluating performance, SEO, accessibility, and user experience. We preserve existing content and URLs (to avoid losing SEO positions), improve the design, update the technology stack, and optimize loading speed. Migration includes 301 redirects for all modified URLs and verification that no indexed page returns 404 errors.' },
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
      {
        id: 'process',
        title: { ro: 'Procesul de dezvoltare', en: 'Development process' },
        prose: [
          {
            ro: 'Dezvoltarea unei aplicatii web la Isio urmeaza o metodologie structurata care minimizeaza riscul si maximizeaza transparenta. Incepem cu o faza de descoperire extinsa in care analizam fluxurile de lucru existente, identificam bottleneck-urile si definim specificatiile tehnice ale fiecarui modul. Rezultatul este un document de specificatii cu user stories, schema bazei de date si arhitectura API — aprobat de tine inainte de a incepe dezvoltarea.',
            en: 'Web application development at Isio follows a structured methodology that minimizes risk and maximizes transparency. We start with an extended discovery phase where we analyze existing workflows, identify bottlenecks, and define the technical specifications for each module. The result is a specification document with user stories, database schema, and API architecture — approved by you before development begins.',
          },
          {
            ro: 'Dezvoltarea decurge in sprint-uri de 1-2 saptamani, fiecare sprint avand deliverables demonstrabile. La sfarsitul fiecarui sprint primesti un link de staging unde poti testa noile functionalitati si oferi feedback direct. Aceasta abordare iterativa inseamna ca problemele sunt identificate si rezolvate devreme, nu la sfarsitul proiectului cand costul corectiilor este mult mai mare.',
            en: 'Development proceeds in 1-2 week sprints, each sprint having demonstrable deliverables. At the end of each sprint you receive a staging link where you can test new features and provide direct feedback. This iterative approach means problems are identified and resolved early, not at the end of the project when correction costs are much higher.',
          },
          {
            ro: 'Fiecare functionalitate este acoperita de teste automate care ruleaza la fiecare commit. Monitorizarea in productie include alerte automate pentru erori, metrici de performanta si backup-uri zilnice ale bazei de date. Suportul de 60 de zile post-lansare acopera atat bug-uri cat si ajustari ale fluxurilor daca utilizatorii raporteaza dificultati.',
            en: 'Every feature is covered by automated tests that run on each commit. Production monitoring includes automatic error alerts, performance metrics, and daily database backups. The 60-day post-launch support covers both bugs and workflow adjustments if users report difficulties using the application.',
          },
        ],
        items: [],
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
      {
        question: { ro: 'Pot migra o aplicatie existenta la un stack modern?', en: 'Can I migrate an existing application to a modern stack?' },
        answer: { ro: 'Da, Isio ofera servicii de migrare si modernizare a aplicatiilor web existente. Analizez arhitectura curenta, identific componentele care pot fi reutilizate si propun un plan de migrare graduala care minimizeaza riscul si downtime-ul. Migrarea se face modular — inlocuim componentele una cate una, testam fiecare pas si mentin aplicatia functionala pe tot parcursul procesului. Aceasta abordare este mai sigura decat o rescriere completa si permite lansarea de imbunatatiri vizibile la fiecare sprint.', en: 'Yes, Isio offers migration and modernization services for existing web applications. I analyze the current architecture, identify components that can be reused, and propose a gradual migration plan that minimizes risk and downtime. Migration is done modularly — we replace components one by one, test each step, and keep the application functional throughout the process. This approach is safer than a complete rewrite and allows shipping visible improvements at each sprint.' },
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
      {
        id: 'process',
        title: { ro: 'Cum lucram', en: 'How we work' },
        prose: [
          {
            ro: 'Fiecare proiect SEO la Isio incepe cu un audit tehnic complet care analizeaza peste 140 de factori: viteza de incarcare, structura URL-urilor, crawlabilitate, schema markup, securitate, mobile-friendliness si Core Web Vitals. Auditul genereaza un raport prioritizat cu actiuni concrete, nu doar observatii generice. Pe baza auditului, construim un plan de optimizare pe 3-6 luni cu milestone-uri masurabile lunar.',
            en: 'Every SEO project at Isio starts with a comprehensive technical audit that analyzes over 140 factors: load speed, URL structure, crawlability, schema markup, security, mobile-friendliness, and Core Web Vitals. The audit generates a prioritized report with concrete actions, not just generic observations. Based on the audit, we build a 3-6 month optimization plan with monthly measurable milestones.',
          },
          {
            ro: 'Implementarea urmeaza o abordare data-driven: fiecare modificare este documentata si efectul ei este masurat prin Google Search Console si Analytics. Rapoartele lunare includ evolutia pozitiilor pentru keyword-urile tinta, traficul organic, rata de click (CTR) si Core Web Vitals. Daca o strategie nu produce rezultate in 60 de zile, o ajustam — nu asteptam luni intregi sperand ca algoritmul se va schimba in favoarea noastra.',
            en: 'Implementation follows a data-driven approach: every change is documented and its effect is measured through Google Search Console and Analytics. Monthly reports include position evolution for target keywords, organic traffic, click-through rate (CTR), and Core Web Vitals. If a strategy does not produce results within 60 days, we adjust it — we do not wait months hoping the algorithm will change in our favor.',
          },
          {
            ro: 'Isio se concentreaza pe SEO tehnic si on-page deoarece acestea sunt domeniile in care un solo developer cu experienta in cod poate aduce cel mai mare impact. Optimizarile tehnice (viteza, structured data, crawlability) au efect imediat si durabil, spre deosebire de tacticile de link building care pot fi penalizate de Google. Rezultatul: crestere organica sustenabila construita pe fundamente tehnice solide.',
            en: 'Isio focuses on technical and on-page SEO because these are the areas where a solo developer with coding experience can bring the greatest impact. Technical optimizations (speed, structured data, crawlability) have immediate and lasting effect, unlike link building tactics that can be penalized by Google. The result: sustainable organic growth built on solid technical foundations.',
          },
        ],
        items: [],
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
        prose: [
          {
            ro: 'Auditul de accesibilitate Isio evalueaza site-ul conform standardului WCAG 2.1, ghidul international de accesibilitate web utilizat de legislatia europeana (European Accessibility Act) si cea romaneasca. Testam fiecare pagina prin trei metode complementare: analiza automata cu axe-core si Lighthouse (care identifica ~30% din probleme), testare manuala cu screen reader (NVDA pe Windows, VoiceOver pe macOS si iOS), si navigare exclusiv cu tastatura pentru a verifica focus management, tab order si skip links.',
            en: 'The Isio accessibility audit evaluates your site against the WCAG 2.1 standard, the international web accessibility guideline used by European legislation (European Accessibility Act) and Romanian law. We test each page through three complementary methods: automated analysis with axe-core and Lighthouse (which identifies ~30% of issues), manual testing with screen readers (NVDA on Windows, VoiceOver on macOS and iOS), and keyboard-only navigation to verify focus management, tab order, and skip links.',
          },
          {
            ro: 'Procesul de audit acopera toate cele patru principii WCAG: Perceptibil (text alternativ pentru imagini, contrast de culori minim 4.5:1, subtitrari pentru video), Operabil (navigare completa cu tastatura, timp suficient pentru interactiuni, fara continut care provoaca convulsii), Inteligibil (limbaj clar, comportament predictibil al formularelor, mesaje de eroare descriptive), si Robust (compatibilitate cu tehnologii asistive curente si viitoare, HTML semantic valid).',
            en: 'The audit process covers all four WCAG principles: Perceivable (alternative text for images, minimum 4.5:1 color contrast, video captions), Operable (complete keyboard navigation, sufficient time for interactions, no seizure-inducing content), Understandable (clear language, predictable form behavior, descriptive error messages), and Robust (compatibility with current and future assistive technologies, valid semantic HTML).',
          },
          {
            ro: 'Fiecare problema identificata este documentata cu: captura de ecran, criteriul WCAG incalcat (ex: 1.4.3 Contrast Minim), severitatea (critica, majora, minora), elementul HTML afectat cu selector CSS exact, si o recomandare concreta de remediere cu exemplu de cod. Nu livram rapoarte generice generate automat — fiecare observatie este verificata manual si contextualizata pentru site-ul tau specific.',
            en: 'Each identified issue is documented with: screenshot, violated WCAG criterion (e.g., 1.4.3 Minimum Contrast), severity (critical, major, minor), affected HTML element with exact CSS selector, and a concrete remediation recommendation with code example. We do not deliver generic auto-generated reports — every finding is manually verified and contextualized for your specific site.',
          },
        ],
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
        prose: [
          {
            ro: 'Raportul de audit este un document structurat de 20-40 de pagini care include un sumar executiv (pentru managementul non-tehnic), lista completa de probleme grupate pe severitate si principiu WCAG, si un ghid de remediere cu cod functional pentru fiecare problema. Pachetele Standard si Premium includ re-testare gratuita dupa ce echipa ta implementeaza remedierile — verificam ca fiecare problema raportata a fost corect rezolvata.',
            en: 'The audit report is a structured 20-40 page document that includes an executive summary (for non-technical management), a complete issue list grouped by severity and WCAG principle, and a remediation guide with working code for each issue. Standard and Premium packages include free re-testing after your team implements the fixes — we verify that each reported issue has been correctly resolved.',
          },
        ],
        items: [
          { text: { ro: 'Raport de audit cu capturile de ecran', en: 'Audit report with screenshots' } },
          { text: { ro: 'Lista de probleme prioritizată pe severitate', en: 'Issue list prioritized by severity' } },
          { text: { ro: 'Ghid de remediere pas cu pas', en: 'Step-by-step remediation guide' } },
          { text: { ro: 'Re-testare după remediere (pachetele Standard+)', en: 'Re-test after remediation (Standard+ plans)' } },
        ],
      },
      {
        id: 'process',
        title: { ro: 'Procesul de audit', en: 'Audit process' },
        prose: [
          {
            ro: 'Auditul de accesibilitate Isio combina testare automata cu evaluare manuala pentru a identifica barierele reale pe care le intampina utilizatorii cu dizabilitati. Folosim axe-core si Lighthouse pentru scanare automata, dar aceste instrumente detecteaza doar 30-40% din problemele reale. De aceea, fiecare audit include testare manuala cu screen reader (NVDA si VoiceOver), navigare exclusiv cu tastatura si verificarea contrastului de culori in toate starile interactive.',
            en: 'The Isio accessibility audit combines automated testing with manual evaluation to identify real barriers that users with disabilities encounter. We use axe-core and Lighthouse for automated scanning, but these tools detect only 30-40% of real issues. That is why every audit includes manual testing with screen readers (NVDA and VoiceOver), keyboard-only navigation, and color contrast verification across all interactive states.',
          },
          {
            ro: 'Raportul de audit clasifica fiecare problema dupa severitate (critica, majora, minora) si include capturi de ecran, locatia exacta in cod si solutia recomandata cu exemplu de implementare. Problemele critice sunt cele care impiedica complet accesul — de exemplu, formulare fara etichete, imagini fara text alternativ sau navigatie imposibila cu tastatura. Pachetele Standard si Premium includ si implementarea remedierii, nu doar raportarea.',
            en: 'The audit report classifies each issue by severity (critical, major, minor) and includes screenshots, exact location in code, and the recommended solution with implementation example. Critical issues are those that completely prevent access — for example, forms without labels, images without alternative text, or impossible keyboard navigation. Standard and Premium plans include remediation implementation, not just reporting.',
          },
          {
            ro: 'Dupa remediere, re-testam fiecare problema rezolvata si emitem un certificat de conformitate WCAG 2.1 care poate fi prezentat clientilor, partenerilor sau autoritatilor de reglementare. Isio ofera si training pentru echipa ta de dezvoltare (1-2 ore) cu ghiduri practice de codare accesibila, astfel incat problemele sa nu reapara in viitoarele actualizari ale site-ului.',
            en: 'After remediation, we re-test every resolved issue and issue a WCAG 2.1 compliance certificate that can be presented to clients, partners, or regulatory authorities. Isio also offers training for your development team (1-2 hours) with practical accessible coding guides, so that issues do not reappear in future site updates.',
          },
        ],
        items: [],
      },
    ],
    faq: [
      {
        question: { ro: 'De ce este importanta accesibilitatea web?', en: 'Why is web accessibility important?' },
        answer: { ro: 'Accesibilitatea web asigura ca persoanele cu dizabilitati (vizuale, auditive, motorii sau cognitive) pot utiliza site-ul tau. In Romania, aproximativ 800.000 de persoane au dizabilitati inregistrate, iar European Accessibility Act (care intra in vigoare in 2025) impune standarde de accesibilitate pentru servicii digitale. Dincolo de obligatia legala, un site accesibil imbunatateste experienta pentru toti utilizatorii — navigare cu tastatura, contrast bun si structura clara beneficiaza pe toata lumea.', en: 'Web accessibility ensures that people with disabilities (visual, auditory, motor, or cognitive) can use your website. In Romania, approximately 800,000 people have registered disabilities, and the European Accessibility Act (effective 2025) mandates accessibility standards for digital services. Beyond legal obligation, an accessible site improves the experience for all users — keyboard navigation, good contrast, and clear structure benefit everyone.' },
      },
      {
        question: { ro: 'Ce nivel WCAG ar trebui sa ating?', en: 'What WCAG level should I aim for?' },
        answer: { ro: 'Recomandam nivelul AA ca standard minim — acesta acopera cele mai importante cerinte de accesibilitate si este nivelul cerut de majoritatea legislatiilor (inclusiv European Accessibility Act). Nivelul A este insuficient pentru conformitate legala. Nivelul AAA este ideal pentru site-uri guvernamentale sau de sanatate, dar poate fi excesiv de restrictiv pentru site-uri comerciale. In auditul nostru, evaluam intotdeauna la nivel AA si semnalam oportunitatile AAA unde sunt fezabile.', en: 'We recommend Level AA as the minimum standard — it covers the most important accessibility requirements and is the level required by most legislation (including the European Accessibility Act). Level A is insufficient for legal compliance. Level AAA is ideal for government or healthcare sites but can be overly restrictive for commercial sites. In our audit, we always evaluate at Level AA and flag AAA opportunities where feasible.' },
      },
      {
        question: { ro: 'Cat dureaza un audit de accesibilitate?', en: 'How long does an accessibility audit take?' },
        answer: { ro: 'Un audit complet WCAG 2.1 AA pentru un site de 10-20 de pagini dureaza 10-14 zile lucratoare. Site-uri mai mari sau aplicatii web complexe cu multe componente interactive pot necesita 14-21 de zile. Timpul include testarea automata, testarea manuala cu screen reader, testarea cu tastatura, redactarea raportului detaliat si o sesiune de prezentare a rezultatelor de 1-2 ore.', en: 'A complete WCAG 2.1 AA audit for a 10-20 page site takes 10-14 business days. Larger sites or complex web applications with many interactive components may require 14-21 days. The time includes automated testing, manual screen reader testing, keyboard testing, writing the detailed report, and a 1-2 hour results presentation session.' },
      },
      {
        question: { ro: 'Pot remedia problemele de accesibilitate singur?', en: 'Can I fix accessibility issues myself?' },
        answer: { ro: 'Raportul nostru include instructiuni pas cu pas cu exemple de cod pentru fiecare problema, deci o echipa tehnica le poate implementa independent. Daca nu ai resurse interne de dezvoltare, oferim si servicii de remediere la un cost suplimentar — fie remediere completa, fie doar problemele critice si majore. Pachetele Standard si Premium includ re-testare gratuita pentru a confirma ca remedierile au fost implementate corect.', en: 'Our report includes step-by-step instructions with code examples for each issue, so a technical team can implement them independently. If you do not have internal development resources, we also offer remediation services at an additional cost — either full remediation or just critical and major issues. Standard and Premium packages include free re-testing to confirm fixes were correctly implemented.' },
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
        prose: [
          {
            ro: 'Agentii AI dezvoltati de Isio nu sunt chatboti simpli — sunt sisteme autonome care executa sarcini complexe de business fara interventie umana continua. Un agent poate monitoriza preturile competitorilor si ajusta automat strategia de pricing, poate gestiona campanii publicitare pe Google si Facebook cu respectarea stricta a bugetului, sau poate analiza zilnic performanta SEO si genera rapoarte cu recomandari actionabile. Fiecare agent este construit pe masura, pornind de la procesele specifice ale afacerii tale.',
            en: 'AI agents developed by Isio are not simple chatbots — they are autonomous systems that execute complex business tasks without continuous human intervention. An agent can monitor competitor prices and automatically adjust pricing strategy, manage advertising campaigns on Google and Facebook with strict budget compliance, or analyze daily SEO performance and generate reports with actionable recommendations. Each agent is custom-built, starting from your specific business processes.',
          },
          {
            ro: 'Procesul de implementare incepe cu o analiza de 1-2 saptamani a proceselor operationale existente. Identificam sarcinile repetitive care consuma cel mai mult timp, le evaluam fezabilitatea automatizarii (nu totul trebuie sau poate fi automatizat), si proiectam arhitectura agentului: ce date consuma, ce decizii ia, ce actiuni executa, si unde intervine un operator uman pentru aprobare. Folosim o abordare "human-in-the-loop" — agentul propune, omul aproba actiunile cu impact financiar sau de continut public.',
            en: 'The implementation process starts with a 1-2 week analysis of existing operational processes. We identify repetitive tasks that consume the most time, evaluate their automation feasibility (not everything needs to or can be automated), and design the agent architecture: what data it consumes, what decisions it makes, what actions it executes, and where a human operator intervenes for approval. We use a "human-in-the-loop" approach — the agent proposes, the human approves actions with financial or public content impact.',
          },
          {
            ro: 'Stiva tehnologica include Node.js cu TypeScript pentru logica agentului, Genkit cu Gemini Flash pentru capabilitatile AI (analiza text, generare continut, clasificare), PostgreSQL pentru persistenta datelor si audit trail, si un sistem de cron scheduling pentru executia periodica. Fiecare actiune a agentului este logata cu timestamp, input, output si rationament — ai transparenta completa asupra a ceea ce face si de ce. Agentul ruleaza pe VPS-ul tau sau pe un server cloud, nu pe infrastructura noastra — tu detii controlul complet.',
            en: 'The technology stack includes Node.js with TypeScript for agent logic, Genkit with Gemini Flash for AI capabilities (text analysis, content generation, classification), PostgreSQL for data persistence and audit trail, and a cron scheduling system for periodic execution. Every agent action is logged with timestamp, input, output, and reasoning — you have complete transparency over what it does and why. The agent runs on your VPS or cloud server, not on our infrastructure — you retain full control.',
          },
        ],
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
        prose: [
          {
            ro: 'La predare primesti agentul functional deployat in productie, codul sursa complet in Git, documentatia arhitecturii (diagrama de flux, descrierea fiecarui modul, si ghid de configurare), si un training de operare de 2-3 ore. Suportul post-lansare de 90 de zile este cel mai lung dintre toate serviciile noastre — agentii AI necesita o perioada de "rodaj" in care observam comportamentul in productie si facem ajustari de finetuning pe baza datelor reale.',
            en: 'At handover you receive the functional agent deployed to production, the complete source code in Git, architecture documentation (flow diagram, description of each module, and configuration guide), and a 2-3 hour operation training. The 90-day post-launch support is the longest among all our services — AI agents require a "break-in" period where we observe production behavior and make fine-tuning adjustments based on real data.',
          },
        ],
        items: [
          { text: { ro: 'Agent funcțional deployat în producție', en: 'Functional agent deployed to production' } },
          { text: { ro: 'Documentație completă a arhitecturii', en: 'Complete architecture documentation' } },
          { text: { ro: 'Training operare și monitorizare', en: 'Operation and monitoring training' } },
          { text: { ro: '90 de zile suport și optimizare post-lansare', en: '90 days post-launch support and optimization' } },
        ],
      },
      {
        id: 'process',
        title: { ro: 'Procesul de implementare', en: 'Implementation process' },
        prose: [
          {
            ro: 'Implementarea unui agent AI la Isio incepe cu o faza de analiza in care cartografiem procesele de business existente si identificam sarcinile repetitive cu cel mai mare potential de automatizare. Calculam ROI-ul estimat pentru fiecare sarcina automatizata — de exemplu, daca un angajat petrece 2 ore pe zi pe procesarea email-urilor, un agent AI poate reduce acest timp la 15 minute, economisind peste 400 de ore pe an.',
            en: 'AI agent implementation at Isio begins with an analysis phase where we map existing business processes and identify repetitive tasks with the highest automation potential. We calculate the estimated ROI for each automated task — for example, if an employee spends 2 hours per day on email processing, an AI agent can reduce this to 15 minutes, saving over 400 hours per year.',
          },
          {
            ro: 'Agentii AI sunt construiti cu Google Gemini prin intermediul framework-ului Genkit, care ofera flow-uri structurate, gestionarea prompt-urilor si tracing pentru depanare. Fiecare agent opereaza in limite strict definite — are acces doar la datele si actiunile necesare sarcinii sale, cu hard limits pe buget si frecventa de executie. Implementam logging detaliat pentru fiecare decizie luata de agent, astfel incat sa poti audita exact ce a facut si de ce.',
            en: 'AI agents are built with Google Gemini through the Genkit framework, which provides structured flows, prompt management, and tracing for debugging. Each agent operates within strictly defined boundaries — it has access only to the data and actions needed for its task, with hard limits on budget and execution frequency. We implement detailed logging for every decision the agent makes, so you can audit exactly what it did and why.',
          },
          {
            ro: 'Lansarea se face in etape: mai intai agentul ruleaza in mod de observare (primeste sarcini dar nu executa actiuni), apoi in mod asistat (propune actiuni dar asteapta aprobarea ta), si in final in mod autonom (executa independent cu raportare zilnica). Aceasta abordare graduala elimina riscul de erori costisitoare si construieste incredere in sistem. Suportul de 90 de zile include optimizarea prompt-urilor, ajustarea pragurilor de decizie si extinderea capabilitatilor pe masura ce te familiarizezi cu potentialul agentului.',
            en: 'Launch happens in stages: first the agent runs in observation mode (receives tasks but does not execute actions), then in assisted mode (proposes actions but waits for your approval), and finally in autonomous mode (executes independently with daily reporting). This gradual approach eliminates the risk of costly errors and builds trust in the system. The 90-day support includes prompt optimization, decision threshold adjustment, and capability expansion as you become familiar with the agent potential.',
          },
        ],
        items: [],
      },
    ],
    faq: [
      {
        question: { ro: 'Ce tipuri de sarcini poate automatiza un agent AI?', en: 'What types of tasks can an AI agent automate?' },
        answer: { ro: 'Agentii AI sunt ideali pentru sarcini repetitive bazate pe reguli si date: monitorizare preturi competitori, generare si optimizare continut SEO, gestionare campanii publicitare cu buget strict, analiza review-uri clienti si clasificarea pe categorii, generare rapoarte periodice, trimitere email-uri automatizate bazate pe triggere, si scraping date publice pentru analiza de piata. Nu recomandam automatizarea deciziilor strategice sau a comunicarilor sensibile cu clientii — acolo agentul asista, nu inlocuieste.', en: 'AI agents are ideal for repetitive tasks based on rules and data: competitor price monitoring, SEO content generation and optimization, advertising campaign management with strict budgets, customer review analysis and categorization, periodic report generation, automated emails based on triggers, and public data scraping for market analysis. We do not recommend automating strategic decisions or sensitive client communications — there the agent assists, not replaces.' },
      },
      {
        question: { ro: 'Cat costa implementarea unui agent AI?', en: 'How much does AI agent implementation cost?' },
        answer: { ro: 'Costul depinde de complexitatea agentului. Un agent simplu cu 2-3 sarcini automatizate (de exemplu: monitorizare SEO + raport saptamanal) se incadreaza in pachetul Standard. Agentii multi-task cu integrari complexe (Google Ads + Facebook Ads + SEO + raportare) necesita pachetul Premium. In faza de descoperire gratuita analizam procesele si estimam costul exact. Important: dupa implementare, costul operational al agentului este aproape zero — Gemini Flash are free tier generos, iar hosting-ul pe un VPS costa 5-20 EUR/luna.', en: 'The cost depends on agent complexity. A simple agent with 2-3 automated tasks (for example: SEO monitoring + weekly report) fits within the Standard package. Multi-task agents with complex integrations (Google Ads + Facebook Ads + SEO + reporting) require the Premium package. During the free discovery phase we analyze processes and estimate exact cost. Important: after implementation, the agent operational cost is nearly zero — Gemini Flash has a generous free tier, and VPS hosting costs 5-20 EUR/month.' },
      },
      {
        question: { ro: 'Agentul poate face greseli? Ce masuri de siguranta exista?', en: 'Can the agent make mistakes? What safety measures exist?' },
        answer: { ro: 'Da, orice sistem poate face greseli, de aceea implementam multiple straturi de siguranta: hard limits pe buget (agentul nu poate cheltui mai mult decat limita setata, indiferent de circumstante), aprobare umana pentru actiuni cu impact (publicare continut, modificari de pret, campanii noi), alertare prin email cand agentul intampina situatii neprevazute, si audit trail complet pentru fiecare decizie. Agentul este proiectat sa fie conservator — daca nu este sigur, intreaba in loc sa actioneze.', en: 'Yes, any system can make mistakes, which is why we implement multiple safety layers: hard budget limits (the agent cannot spend more than the set limit regardless of circumstances), human approval for impactful actions (content publishing, price changes, new campaigns), email alerts when the agent encounters unexpected situations, and a complete audit trail for every decision. The agent is designed to be conservative — if unsure, it asks instead of acting.' },
      },
      {
        question: { ro: 'Am nevoie de cunostinte tehnice pentru a opera agentul?', en: 'Do I need technical knowledge to operate the agent?' },
        answer: { ro: 'Nu. Agentul vine cu un dashboard de control unde poti vedea statusul, rapoartele generate, actiunile executate si cele in asteptare de aprobare. Training-ul de 2-3 ore acopera toate scenariile de operare zilnica. Pentru configurari avansate (adaugare sarcini noi, modificare reguli) este nevoie de interventie tehnica — aceasta este acoperita de suportul post-lansare de 90 de zile sau poate fi solicitata ulterior ca serviciu separat.', en: 'No. The agent comes with a control dashboard where you can view status, generated reports, executed actions, and those awaiting approval. The 2-3 hour training covers all daily operation scenarios. For advanced configurations (adding new tasks, modifying rules) technical intervention is needed — this is covered by the 90-day post-launch support or can be requested later as a separate service.' },
      },
    ],
  },
};

export function getServiceDetail(serviceKey: string): ServiceDetail | undefined {
  return serviceDetails[serviceKey];
}
