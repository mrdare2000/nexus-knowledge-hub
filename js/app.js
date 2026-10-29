/**
 * Nexus Knowledge Hub - Core Application Engine & Router (js/app.js)
 */
// Nexus Knowledge Hub - Core Application Script
// Implements futuristic glassmorphic transitions, stateful multi-turn AI,
// and adaptive custom modal styling structures.

document.addEventListener("DOMContentLoaded", () => {
  initAppLayout();
  initSidebarTooltips();
  initHeroSlider();
  initSPARouting();
  renderLearningHub();
  initSearch();
  initIncotermsMatrix();
  initContainerCalc();
  initAircraftHotspots();
  initLogisticsGrid();
  initNexusAIChat();
  initContactForm();
  initLiveNewsEngine();
  initScrollAnimations();
  initAuth();
});

window.addEventListener("load", () => {
  renderLearningHub();
  initScrollAnimations();
});

/* ==========================================
   1. HERO SLIDER BACKGROUND
   ========================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slider .slide");
  const indicators = document.querySelectorAll(".slider-indicators .indicator");
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const slideInterval = 5000;
  
  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    if (indicators.length > currentSlide) indicators[currentSlide].classList.remove("active");
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add("active");
    if (indicators.length > currentSlide) indicators[currentSlide].classList.add("active");
  }
  
  setInterval(nextSlide, slideInterval);
}

/* ==========================================
   SCROLL MOTION ANIMATION OBSERVER
   ========================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll, .reveal-from-left, .reveal-from-right");
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.12
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, observerOptions);

  revealElements.forEach(el => scrollObserver.observe(el));
}

/* Helper utility for XSS sanitization */
function escapeHTML(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ==========================================
   2. SPA ROUTING & DYNAMIC SEO TITLES & META (HTML5 History API)
   ========================================== */
const PAGE_SEO_TITLES = {
  home: "Nexus Knowledge Hub — Official Logistics & Shipping Educational Platform | Nexus Cargos",
  news: "Global Logistics & Freight Supply Chain News | Nexus Knowledge Hub",
  learning: "Freight Forwarding Operations Library | Nexus Knowledge Hub",
  tools: "Interactive Shipping Tools & CBM Calculators | Nexus Knowledge Hub",
  quiz: "Quiz Hub - Weekly Logistics Assessment & Certification | Nexus Knowledge Hub",
  ai: "Nexus AI Shipping Assistant - Freight Intelligence | Nexus Cargo",
  voices: "Nexus Voice | Industry Expert Articles & Supply Chain Podcasts | Nexus Cargos (Pvt) Ltd",
  contact: "Get in Touch & Booking Inquiries | Nexus Cargos (Pvt) Ltd",
  admin: "Admin Portal | Nexus Knowledge Hub"
};

const PAGE_SEO_DESCRIPTIONS = {
  home: "Master freight forwarding, ocean & air cargo, Incoterms 2026, customs clearance, and supply chain logistics with Nexus Knowledge Hub by Nexus Cargos (Pvt) Ltd Sri Lanka.",
  news: "Stay updated with real-time global logistics, ocean shipping rates, air freight market updates, and supply chain headlines.",
  learning: "Explore comprehensive guides on ocean freight, air cargo, Incoterms, customs clearance, container specs, and shipping documentation.",
  tools: "Access interactive Incoterms 2026 matrix, CBM container loading calculator, aircraft specs visualizers, and shipping process simulators.",
  quiz: "Test your freight forwarding knowledge with weekly automated quizzes, track competency scores, and download official PDF certificates.",
  ai: "Ask Nexus AI for immediate answers on shipping terms, container specs, Incoterms rules, and freight operations compliance.",
  voices: "Explore upcoming industry expert insights, guest articles, and logistics podcasts on Nexus Voice by Nexus Cargos (Pvt) Ltd.",
  contact: "Connect with Nexus Cargos (Pvt) Ltd operations team in Colombo, Sri Lanka for freight forwarding inquiries and logistics support.",
  admin: "Admin portal for managing users, quiz analytics, and platform data."
};

const PAGE_SLUGS = {
  home: "home",
  news: "news-feed",
  learning: "knowledge-hub",
  tools: "interactive-tools",
  quiz: "quiz-hub",
  ai: "nexus-ai",
  voices: "nexus-voice",
  contact: "contact",
  admin: "admin-portal"
};

const SLUG_TO_PAGE = {
  "home": "home",
  "news": "news",
  "news-feed": "news",
  "learning": "learning",
  "knowledge-hub": "learning",
  "tools": "tools",
  "interactive-tools": "tools",
  "quiz": "quiz",
  "quiz-hub": "quiz",
  "quizzes": "quiz",
  "ai": "ai",
  "nexus-ai": "ai",
  "voices": "voices",
  "nexus-voice": "voices",
  "contact": "contact",
  "get-in-touch": "contact",
  "admin": "admin",
  "admin-portal": "admin"
};

function getPageFromURL() {
  // Check pathname first (e.g. /interactive-tools or /news-feed)
  const rawPath = window.location.pathname.replace(/^\/|\/$/g, "");
  if (rawPath && SLUG_TO_PAGE[rawPath.toLowerCase()]) {
    return SLUG_TO_PAGE[rawPath.toLowerCase()];
  }

  // Check hash fallback (e.g. #interactive-tools or #tools)
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash && SLUG_TO_PAGE[hash.toLowerCase()]) {
    return SLUG_TO_PAGE[hash.toLowerCase()];
  }

  // Check query parameter fallback (e.g. ?page=tools)
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get("page");
  if (pageParam && SLUG_TO_PAGE[pageParam.toLowerCase()]) {
    return SLUG_TO_PAGE[pageParam.toLowerCase()];
  }

  return "home";
}

function initSPARouting() {
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-page");
      if (!targetId) return;
      
      switchPage(targetId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Listen for browser Back & Forward button navigation
  window.addEventListener("popstate", (e) => {
    const pageId = (e.state && e.state.pageId) ? e.state.pageId : getPageFromURL();
    switchPage(pageId, false);
  });

  // Automatically activate initial page based on URL on entrance
  const initialPage = getPageFromURL();
  switchPage(initialPage, false, true);
}

function switchPage(pageId, updateHistory = true, isInitialLoad = false) {
  if (!PAGE_SEO_TITLES[pageId]) {
    pageId = "home";
  }

  // Update browser window SEO title and meta description dynamically
  if (PAGE_SEO_TITLES[pageId]) {
    document.title = PAGE_SEO_TITLES[pageId];
  }
  if (PAGE_SEO_DESCRIPTIONS[pageId]) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", PAGE_SEO_DESCRIPTIONS[pageId]);
    }
  }

  // Dynamic Canonical & Open Graph URL updates for Search Engines
  const slug = PAGE_SLUGS[pageId] || "home";
  const isFileProtocol = window.location.protocol === "file:";
  const relativePath = pageId === "home" ? "/" : `/${slug}`;
  const canonicalUrl = `https://www.nexusknowledgehub.com${relativePath}`;

  const canonicalTag = document.querySelector('link[rel="canonical"]');
  if (canonicalTag) {
    canonicalTag.setAttribute("href", canonicalUrl);
  }
  const ogUrlTag = document.querySelector('meta[property="og:url"]');
  if (ogUrlTag) {
    ogUrlTag.setAttribute("content", canonicalUrl);
  }

  // Update HTML5 History API URL state safely (handles file:// local testing & live web servers)
  const historyPath = isFileProtocol ? (pageId === "home" ? window.location.pathname : `#${slug}`) : relativePath;

  if (updateHistory) {
    try {
      window.history.pushState({ pageId: pageId }, PAGE_SEO_TITLES[pageId] || "", historyPath);
    } catch (err) {
      if (isFileProtocol) {
        window.location.hash = slug;
      }
    }
  } else if (isInitialLoad && !isFileProtocol && window.location.pathname !== relativePath && pageId !== "home") {
    try {
      window.history.replaceState({ pageId: pageId }, PAGE_SEO_TITLES[pageId] || "", relativePath);
    } catch (err) {
      // Silent catch for initial load replacement
    }
  }

  // Update nav link active state
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Update sidebar nav link active state
  const sidebarItems = document.querySelectorAll(".sidebar-nav-item");
  sidebarItems.forEach(item => {
    if (item.getAttribute("data-page") === pageId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update mobile bottom bar active state
  const mobileItems = document.querySelectorAll(".mobile-bottom-item");
  mobileItems.forEach(item => {
    if (item.getAttribute("data-page") === pageId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  
  // Update section active state
  const sections = document.querySelectorAll(".page-section");
  sections.forEach(section => {
    if (section.id === `${pageId}-page`) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
  
  if (pageId === "learning") {
    renderLearningHub();
  }
  if (pageId === "ai") {
    initNexusAIChat();
  }
  if (pageId === "quiz") {
    if (window.NEXUS_QUIZ_ENGINE && typeof window.NEXUS_QUIZ_ENGINE.refresh === 'function') {
      window.NEXUS_QUIZ_ENGINE.refresh();
    }
  }


  // Scroll to top after layout has been updated
  if (!isInitialLoad) {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
    setTimeout(initScrollAnimations, 150);
  }

  // Close mobile sidebar drawer if active
  toggleMobileSidebar(false);
}

// Make switchPage available globally for inline onclick handlers
window.switchPage = switchPage;

/* ==========================================
   SIDEBAR NAVIGATION SYSTEM
   ========================================== */
function initAppLayout() {
  // Always default sidebar to expanded (open) state on site entrance
  localStorage.removeItem("nexus_sidebar_collapsed");
  document.body.classList.remove("sidebar-collapsed");
  updateCollapseBtnUI(false);

  // Bind keyboard shortcut Ctrl+K / Cmd+K for quick search focus
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      switchPage("learning");
      setTimeout(() => {
        const searchInput = document.getElementById("hub-search-input");
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }, 100);
    }
  });
}

function toggleSidebarCollapse() {
  const body = document.body;
  const isCollapsed = body.classList.toggle("sidebar-collapsed");
  localStorage.setItem("nexus_sidebar_collapsed", isCollapsed);
  updateCollapseBtnUI(isCollapsed);
}

function initSidebarTooltips() {
  let tooltipEl = document.getElementById("sidebar-fixed-tooltip");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "sidebar-fixed-tooltip";
    tooltipEl.style.cssText = `
      position: fixed;
      display: none;
      background: #0A2540;
      color: #FFFFFF;
      font-size: 0.82rem;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
      padding: 6px 14px;
      border-radius: 8px;
      white-space: nowrap;
      box-shadow: 0 8px 25px rgba(10, 37, 64, 0.4);
      pointer-events: none;
      z-index: 99999;
      transition: opacity 0.15s ease, transform 0.15s ease;
      opacity: 0;
      transform: translateY(-50%) translateX(-4px);
    `;
    document.body.appendChild(tooltipEl);
  }

  const items = document.querySelectorAll(".sidebar-nav-item, #sidebar-collapse-btn");
  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      if (!document.body.classList.contains("sidebar-collapsed")) return;
      const text = item.getAttribute("data-tooltip") || item.title || item.querySelector(".sidebar-nav-label")?.textContent;
      if (!text) return;

      tooltipEl.textContent = text.trim();
      tooltipEl.style.display = "block";

      const rect = item.getBoundingClientRect();
      const top = rect.top + rect.height / 2;
      const left = rect.right + 12;

      tooltipEl.style.top = `${top}px`;
      tooltipEl.style.left = `${left}px`;
      
      requestAnimationFrame(() => {
        tooltipEl.style.opacity = "1";
        tooltipEl.style.transform = "translateY(-50%) translateX(0)";
      });
    });

    item.addEventListener("mouseleave", () => {
      tooltipEl.style.opacity = "0";
      tooltipEl.style.transform = "translateY(-50%) translateX(-4px)";
      setTimeout(() => {
        if (tooltipEl.style.opacity === "0") {
          tooltipEl.style.display = "none";
        }
      }, 150);
    });
  });
}

function updateCollapseBtnUI(isCollapsed) {
  const btn = document.getElementById("sidebar-collapse-btn");
  if (!btn) return;
  const icon = btn.querySelector(".collapse-icon");
  const label = btn.querySelector(".control-label");
  if (icon) icon.textContent = isCollapsed ? "►" : "◄";
  if (label) label.textContent = isCollapsed ? "Expand" : "Collapse";
  btn.title = isCollapsed ? "Expand Sidebar" : "Collapse Sidebar";
}

function toggleMobileSidebar(forceState) {
  const body = document.body;
  if (typeof forceState === "boolean") {
    body.classList.toggle("sidebar-mobile-open", forceState);
  } else {
    body.classList.toggle("sidebar-mobile-open");
  }
}

// Make functions globally accessible
window.initAppLayout = initAppLayout;
window.toggleSidebarCollapse = toggleSidebarCollapse;
window.toggleMobileSidebar = toggleMobileSidebar;

window.toggleMobileMenu = function() {
  toggleMobileSidebar();
};

// Global visual panel switch helper
window.toggleToolPanel = function(panelId) {
  const tabBtns = document.querySelectorAll(".tools-page-tab-card, .tool-tab, .tool-tab-btn");
  const panels = document.querySelectorAll(".tool-panel");
  
  tabBtns.forEach(btn => {
    if (btn.id === `tab-${panelId}` || (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(panelId))) {
      btn.classList.add("active");
      if (btn.scrollIntoView && window.innerWidth <= 768) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    } else {
      btn.classList.remove("active");
    }
  });
  
  panels.forEach(panel => {
    if (panel.id === `panel-${panelId}`) {
      panel.classList.add("active");
      if (panelId === 'dg') {
        setTimeout(updateDGIdentifier, 50);
      }
    } else {
      panel.classList.remove("active");
    }
  });
};

window.onerror = function(message, source, lineno, colno, error) {
  console.error("Nexus Knowledge Hub JS Error:", message, "at", source, lineno + ":" + colno, error);
  return false;
};

