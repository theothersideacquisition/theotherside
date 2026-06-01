/* ==========================================================================
   THE OTHER SIDE — script.js
   Structure : DOM SELECTORS → EVENT LISTENERS → ANIMATIONS → INTERACTIONS
   ========================================================================== */


/* ==========================================================================
   1. DOM SELECTORS
   ========================================================================== */

const scrollProgress = document.getElementById('scroll-progress');
const mouseGlow      = document.getElementById('mouse-glow');
const navbar         = document.querySelector('#navbar nav');
const stickyCta      = document.getElementById('sticky-cta');
const modulesGrid    = document.getElementById('modules-grid');
const faqList        = document.getElementById('faq-list');

// CTA popup elements
const ctaTrigger = document.getElementById('cta-trigger');
const ctaWrapper = document.getElementById('cta-popup-wrapper');
const ctaBackdrop = document.getElementById('cta-backdrop');
const ctaClose   = document.getElementById('cta-close');


/* ==========================================================================
   2. DATA
   ========================================================================== */

const layers = [
  {
    n: "01",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: "SDR TEAM INFRASTRUCTURE",
    status: "DEPLOYED",
    statusType: "green",
    throughput: "Opérationnel · J+30",
    promise: "Une équipe acquisition complète construite et opérationnelle — sans recrutement interne, sans onboarding à gérer.",
    topics: ["Recrutement SDR", "Setters", "Lead qualifiers", "Outbound reps", "Inbound SDR", "CRM ops"],
    outputs: ["SDR profiles définis", "Équipe structurée", "Rôles & ownership", "Onboarding SDR"]
  },
  {
    n: "02",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    title: "SALES ENABLEMENT SYSTEM",
    status: "ACTIVE",
    statusType: "blue",
    throughput: "SDR opérationnels · J+20",
    promise: "Des SDR formés sur votre marché, votre ICP et vos séquences — prêts à générer des RDV qualifiés dès le déploiement.",
    topics: ["Formation SDR", "Scripts commerciaux", "Objection handling", "CRM training", "Qualification ICP", "Social selling"],
    outputs: ["Sales scripts", "Objection map", "CRM playbook", "Discovery framework"]
  },
  {
    n: "03",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    title: "OUTBOUND ACQUISITION ENGINE",
    status: "RUNNING",
    statusType: "green",
    throughput: "Conversations générées · /semaine",
    promise: "Un moteur de prospection multicanal qui génère des conversations commerciales qualifiées chaque semaine.",
    topics: ["LinkedIn outreach", "Cold email", "Multichannel sequences", "Campaign booking", "Lead qualification", "A/B copy testing"],
    outputs: ["Outbound stack", "Séquences cold email", "Templates LinkedIn", "Campaign reporting"]
  },
  {
    n: "04",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    title: "CRM & PIPELINE OPERATIONS",
    status: "OPTIMIZED",
    statusType: "green",
    throughput: "Pipeline tracké · en temps réel",
    promise: "Chaque lead tracké, chaque étape mesurée. Un pipeline structuré et optimisé en continu pour maximiser la vélocité commerciale.",
    topics: ["Pipeline management", "Lead tracking", "Reporting", "KPI dashboards", "Workflows", "CRM automation"],
    outputs: ["CRM setup complet", "Pipeline stages", "Automations", "KPI dashboards"]
  },
  {
    n: "05",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    title: "INBOUND LEAD ACTIVATION",
    status: "ACTIVE",
    statusType: "blue",
    throughput: "Leads entrants → opportunités",
    promise: "Capturer et convertir les leads entrants avec la même efficacité que les leads outbound.",
    topics: ["Inbound SDR", "Lead response", "Qualification inbound", "Nurturing", "Conversion lead entrant", "Booking inbound"],
    outputs: ["Inbound playbook", "Lead scoring", "Response SOP", "Inbound cadence"]
  },
  {
    n: "06",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    title: "CONVERSION OPTIMIZATION",
    status: "SCALING",
    statusType: "blue",
    throughput: "Revenue/lead optimisé",
    promise: "Augmenter la valeur générée par chaque RDV. Chaque conversation devient une opportunité de closing.",
    topics: ["Conversion rate optimization", "Scripts closing", "Objection frameworks", "Funnel analysis", "Qualification quality", "Meeting-to-close ops"],
    outputs: ["Sales playbook", "Closing scripts", "Negotiation flow", "Deal review process"]
  },
  {
    n: "07",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>`,
    title: "ACQUISITION MANAGEMENT & KPIs",
    status: "MONITORED",
    statusType: "green",
    throughput: "Reporting hebdomadaire",
    promise: "L'équipe acquisition pilotée comme une véritable unité de croissance — cadence, qualité, performance, optimisation continue.",
    topics: ["Supervision SDR", "Quality control", "Performance tracking", "KPI management", "Cadence ops", "Optimisation continue"],
    outputs: ["KPI dashboard", "Weekly reporting", "Performance reviews", "SDR coaching ops"]
  },
  {
    n: "08",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>`,
    title: "SCALE & REVENUE EXPANSION",
    status: "PHASE 02",
    statusType: "blue",
    throughput: "Infrastructure long-terme",
    promise: "Le système conçu pour soutenir et amplifier la croissance à long terme. Pipeline bien approvisionné, revenue multiplié.",
    topics: ["Pipeline scaling", "Process industrialisation", "Acquisition optimisation", "Revenue Ops expansion", "Capacity expansion", "Growth infrastructure"],
    outputs: ["Funnel optimization", "Scale playbook", "Revenue model", "Expansion strategy"]
  }
];

const faqs = [
  {
    q: "À qui s'adresse The Other Side ?",
    a: "Aux agences, scale-ups, consultants, SaaS et entrepreneurs B2B qui veulent scaler leur génération d'opportunités commerciales sans recruter et gérer une équipe SDR en interne."
  },
  {
    q: "Combien de temps avant d'avoir un pipeline actif ?",
    a: "Les premières séquences outbound sont lancées sous 3 semaines. Les premiers RDV qualifiés arrivent généralement entre J+20 et J+30 après le kick-off."
  },
  {
    q: "Faut-il avoir une offre B2B déjà validée ?",
    a: "Oui. Notre infrastructure est conçue pour scaler une offre existante — pas pour tester un marché de zéro. Tu dois avoir au moins quelques clients et une offre clairement positionnée."
  },
  {
    q: "Qui manage l'équipe SDR au quotidien ?",
    a: "Nous. Notre équipe supervise les KPIs, la cadence, la qualité des séquences et la performance des SDR. Tu reçois un reporting hebdomadaire et des recommandations d'optimisation."
  },
  {
    q: "Quel est l'investissement ?",
    a: "L'offre SCALE YOUR ACQUISITION est à 6 000 € / 3 mois, avec un paiement initial de 5 000 € à la signature (dont 1 000 € de frais de mise en place uniques) et 2 000 € au 3ème mois. L'engagement est de 6 mois minimum. Retrouvez tous les détails dans la section Pricing ci-dessus ou réservez un appel pour un accompagnement personnalisé."
  }
];

const statusColors = {
  green: {
    dot: "var(--primary)",
    bg: "oklch(0.72 0.18 155 / 0.08)",
    border: "oklch(0.72 0.18 155 / 0.25)",
    text: "oklch(0.72 0.18 155)"
  },
  blue: {
    dot: "var(--primary)",
    bg: "oklch(0.78 0.18 230 / 0.08)",
    border: "oklch(0.78 0.18 230 / 0.25)",
    text: "var(--primary)"
  }
};


/* ==========================================================================
   3. RENDER FUNCTIONS
   ========================================================================== */

/**
 * Renders the Acquisition OS layer cards
 */
function renderLayers() {
  if (!modulesGrid) return;

  let activeLayer = '01';

  layers.forEach((layer, i) => {
    const sc   = statusColors[layer.statusType];
    const card = document.createElement('button');

    card.className = 'layer-card reveal' + (layer.n === activeLayer ? ' active' : '');
    card.style.transitionDelay = (i % 4 * 0.05) + 's';

    card.innerHTML = `
      <div class="layer-header">
        <div class="layer-header-left">
          <div class="layer-icon-wrap">${layer.icon}</div>
          <div class="flex-1">
            <div class="layer-num">PALLIER ${layer.n}</div>
            <div class="layer-title">${layer.title}</div>
            <div class="layer-promise">${layer.promise}</div>
          </div>
        </div>
        <span class="layer-toggle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        </span>
      </div>
      <div class="layer-status-bar">
        <span class="layer-status-chip" style="border-color:${sc.border};color:${sc.text};background:${sc.bg}">
          <span class="layer-status-dot" style="background:${sc.dot}"></span>
          ${layer.status}
        </span>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--muted-fg);letter-spacing:0.08em">${layer.throughput}</span>
      </div>
      <div class="layer-body">
        <div class="layer-body-inner">
          <div>
            <div class="layer-section-label">Infrastructure Components</div>
            <div class="layer-tags">${layer.topics.map(t => `<span class="layer-tag">${t}</span>`).join('')}</div>
          </div>
          <div>
            <div class="layer-section-label">Deliverables & Outputs</div>
            <div class="layer-outputs">${layer.outputs.map(o => `<div class="layer-output-item">${o}</div>`).join('')}</div>
          </div>
          <div class="layer-cta-row">
            <a href="#booking-call" class="layer-link">
              Activer ce pallier
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </a>
            <span class="layer-throughput">Pallier ${layer.n} / 08</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.layer-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });

    modulesGrid.appendChild(card);
  });
}

/**
 * Renders the FAQ accordion items
 */
function renderFaq() {
  if (!faqList) return;

  faqs.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item glass reveal' + (i === 0 ? ' open glass-strong' : '');
    item.style.transitionDelay = (i * 0.04) + 's';

    item.innerHTML = `
      <button class="faq-btn">
        <span>${faq.q}</span>
        <span class="faq-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-answer">${faq.a}</div>
      </div>
    `;

    item.querySelector('.faq-btn').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open', 'glass-strong');
        el.classList.add('glass');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open', 'glass-strong');
        item.classList.remove('glass');
      }
    });

    faqList.appendChild(item);
  });
}


/* ==========================================================================
   4. ANIMATIONS & INTERACTIONS
   ========================================================================== */

/**
 * Animates a counter element from 0 to its target value
 */
function animateCounter(el) {
  const to       = parseInt(el.dataset.counter);
  const suffix   = el.dataset.suffix || '';
  const duration = 1600;
  const start    = performance.now();

  const tick = (t) => {
    const progress = Math.min(1, (t - start) / duration);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(to * eased).toLocaleString('fr-FR') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

/**
 * Scroll progress bar
 */
function initScrollProgress() {
  if (!scrollProgress) return;
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.transform = `scaleX(${scrolled / total})`;
  }, { passive: true });
}

/**
 * Navbar glass effect on scroll
 */
function initNavbar() {
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled', 'glass-strong');
    } else {
      navbar.classList.remove('scrolled', 'glass-strong');
    }
  }, { passive: true });
}

/**
 * Mouse glow follow effect
 */
function initMouseGlow() {
  if (!mouseGlow) return;
  window.addEventListener('mousemove', (e) => {
    mouseGlow.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
  }, { passive: true });
}

/**
 * Sticky mobile CTA — shows after 600px scroll, dismissable per session
 */
function initStickyCta() {
  if (!stickyCta) return;
  if (sessionStorage.getItem('ctaDismissed') === 'true') return;

  const stickyBtn = stickyCta.querySelector('a');

  window.addEventListener('scroll', () => {
    if (sessionStorage.getItem('ctaDismissed') === 'true') return;
    if (window.scrollY > 600) {
      stickyCta.classList.add('show');
    } else {
      stickyCta.classList.remove('show');
    }
  }, { passive: true });

  if (stickyBtn) {
    stickyBtn.addEventListener('click', () => {
      sessionStorage.setItem('ctaDismissed', 'true');
      stickyCta.classList.add('hide');
      stickyCta.classList.remove('show');
    });
  }
}

/**
 * Intersection Observer — reveal animations + counter triggers
 */
function initReveal() {
  const countersDone = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      // Trigger counters inside revealed elements
      const counters = entry.target.querySelectorAll('[data-counter]');
      counters.forEach(c => {
        if (!countersDone.has(c)) {
          countersDone.add(c);
          animateCounter(c);
        }
      });

      // Also handle the element itself if it's a counter
      const self = entry.target;
      if (self.dataset.counter && !countersDone.has(self)) {
        countersDone.add(self);
        animateCounter(self);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * CTA popup — open / close logic with Tally lazy-load
 */
function initCtaPopup() {
  if (!ctaTrigger || !ctaWrapper || !ctaBackdrop || !ctaClose) return;

  let tallyLoaded = false;

  function openCta() {
    // Lazy-load Tally iframe on first open
    if (!tallyLoaded) {
      tallyLoaded = true;
      const iframe = ctaWrapper.querySelector('iframe[data-tally-src]');
      if (iframe && !iframe.src) {
        iframe.src = iframe.getAttribute('data-tally-src');
      }
      if (window.Tally && window.Tally.loadEmbeds) {
        window.Tally.loadEmbeds();
      }
    }
    ctaWrapper.classList.add('open');
    ctaTrigger.classList.add('hidden-trigger');
    ctaTrigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => ctaClose.focus(), 400);
  }

  function closeCta() {
    ctaWrapper.classList.remove('open');
    ctaTrigger.classList.remove('hidden-trigger');
    ctaTrigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => ctaTrigger.focus(), 300);
  }

  ctaTrigger.addEventListener('click', openCta);
  ctaClose.addEventListener('click', closeCta);
  ctaBackdrop.addEventListener('click', closeCta);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ctaWrapper.classList.contains('open')) {
      closeCta();
    }
  });
}

/**
 * ZCal calendar loader — hides spinner once iframe loads
 */
function initZcalLoader() {
  const loader = document.getElementById('zcal-loader');
  if (!loader) return;

  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    const widget = document.querySelector('.zcal-inline-widget iframe');
    if (widget) {
      loader.style.display = 'none';
      clearInterval(interval);
    }
    if (attempts > 30) clearInterval(interval);
  }, 500);
}


/* ==========================================================================
   5. INIT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderLayers();
  renderFaq();
  initReveal();       // must run after render so new .reveal elements are observed
  initScrollProgress();
  initNavbar();
  initMouseGlow();
  initStickyCta();
  initCtaPopup();
  initZcalLoader();
});
