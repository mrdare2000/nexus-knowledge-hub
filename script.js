// Nexus Knowledge Hub - Core Application Script
// Implements futuristic glassmorphic transitions, stateful multi-turn AI,
// and adaptive custom modal styling structures.

document.addEventListener("DOMContentLoaded", () => {
  initAppLayout();
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
  fetchLogisticsNews();
  initScrollAnimations();
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
   2. SPA ROUTING & DYNAMIC SEO TITLES & META
   ========================================== */
const PAGE_SEO_TITLES = {
  home: "Nexus Knowledge Hub | Freight Forwarding & Logistics Guide | Nexus Cargos (Pvt) Ltd",
  news: "Global Logistics & Freight Supply Chain News | Nexus Knowledge Hub",
  learning: "Freight Forwarding Operations Library | Nexus Knowledge Hub",
  tools: "Interactive Shipping Tools & CBM Calculators | Nexus Knowledge Hub",
  ai: "Nexus AI Shipping Assistant - Freight Intelligence | Nexus Cargo",
  contact: "Get in Touch & Booking Inquiries | Nexus Cargos (Pvt) Ltd"
};

const PAGE_SEO_DESCRIPTIONS = {
  home: "Master freight forwarding, ocean & air cargo, Incoterms 2026, customs clearance, and supply chain logistics with Nexus Knowledge Hub by Nexus Cargos (Pvt) Ltd Sri Lanka.",
  news: "Stay updated with real-time global logistics, ocean shipping rates, air freight market updates, and supply chain headlines.",
  learning: "Explore comprehensive guides on ocean freight, air cargo, Incoterms, customs clearance, container specs, and shipping documentation.",
  tools: "Access interactive Incoterms 2026 matrix, CBM container loading calculator, aircraft specs visualizers, and shipping process simulators.",
  ai: "Ask Nexus AI for immediate answers on shipping terms, container specs, Incoterms rules, and freight operations compliance.",
  contact: "Connect with Nexus Cargos (Pvt) Ltd operations team in Colombo, Sri Lanka for freight forwarding inquiries and logistics support."
};

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
}

function switchPage(pageId) {
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

  // Scroll to top after layout has been updated
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  setTimeout(initScrollAnimations, 150);

  // Close mobile sidebar drawer if active
  toggleMobileSidebar(false);
}

/* ==========================================
   SIDEBAR NAVIGATION SYSTEM
   ========================================== */
function initAppLayout() {
  // Read saved sidebar collapse state (desktop)
  const savedCollapsed = localStorage.getItem("nexus_sidebar_collapsed") === "true";
  if (savedCollapsed) {
    document.body.classList.add("sidebar-collapsed");
    updateCollapseBtnUI(true);
  }

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
    } else {
      panel.classList.remove("active");
    }
  });
};

window.onerror = function(message, source, lineno, colno, error) {
  console.error("Nexus Knowledge Hub JS Error:", message, "at", source, lineno + ":" + colno, error);
  return false;
};

/* ==========================================
   3. LEARNING HUB & ADAPTIVE MODALS
   ========================================== */
function getKBData() {
  try {
    if (typeof window !== "undefined" && window.NEXUS_KNOWLEDGE_BASE && window.NEXUS_KNOWLEDGE_BASE.categories) {
      return window.NEXUS_KNOWLEDGE_BASE;
    }
  } catch (e) {}
  try {
    if (typeof NEXUS_KNOWLEDGE_BASE !== "undefined" && NEXUS_KNOWLEDGE_BASE && NEXUS_KNOWLEDGE_BASE.categories) {
      return NEXUS_KNOWLEDGE_BASE;
    }
  } catch (e) {}
  return null;
}

function renderLearningHub() {
  const grid = document.getElementById("learning-grid");
  if (!grid) return;
  
  const kbData = getKBData();
  if (!kbData) {
    console.warn("NEXUS_KNOWLEDGE_BASE is not loaded yet. Scheduling retry...");
    setTimeout(renderLearningHub, 100);
    return;
  }
  
  grid.innerHTML = "";
  
  kbData.categories.forEach(category => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.setAttribute("data-category-id", category.id);
    
    // Header
    const header = document.createElement("div");
    header.className = "category-card-header";
    header.innerHTML = `
      <div class="category-icon">${category.icon}</div>
      <h3 class="category-card-title">${category.title}</h3>
    `;
    card.appendChild(header);
    
    // Description
    const desc = document.createElement("p");
    desc.className = "category-desc";
    desc.textContent = category.description;
    card.appendChild(desc);
    
    // Subtopics List
    const list = document.createElement("ul");
    list.className = "subtopics-list";
    
    category.subtopics.forEach(subtopic => {
      const item = document.createElement("li");
      item.className = "subtopic-item";
      item.textContent = subtopic.title;
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      
      item.addEventListener("click", () => {
        openSubtopicModal(category.id, subtopic.id);
      });
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openSubtopicModal(category.id, subtopic.id);
      });
      list.appendChild(item);
    });
    
    card.appendChild(list);
    grid.appendChild(card);
  });
}

function openSubtopicModal(categoryId, subtopicId) {
  const kbData = getKBData();
  if (!kbData) return;

  const category = kbData.categories.find(c => c.id === categoryId);
  if (!category) return;
  
  const subtopic = category.subtopics.find(s => s.id === subtopicId);
  if (!subtopic) return;
  
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalTag = document.getElementById("modal-category-tag");
  const modalBody = document.getElementById("modal-body");
  
  modalTitle.textContent = subtopic.title;
  modalTag.textContent = category.title;
  
  let bodyHTML = "";
  if (subtopic.image && (!subtopic.content || !subtopic.content.includes(subtopic.image))) {
      bodyHTML += `
      <div class="modal-feature-image-wrapper" style="width: 100%; margin-bottom: 25px;">
        <img src="${subtopic.image}" alt="${subtopic.title}" style="width: 100%; height: auto; display: block; border-radius: 12px; box-shadow: var(--shadow-sm); cursor: pointer;">
      </div>
      `;
  }
  
  // Show specialized launcher if connected to an interactive tool
  if (subtopic.linkToWidget) {
    let widgetName = "Interactive Tool";
    if (subtopic.linkToWidget === "incoterms") widgetName = "Interactive Incoterms Matrix";
    else if (subtopic.linkToWidget === "containers") widgetName = "Container Volumetric & CBM Calculator";
    else if (subtopic.linkToWidget === "aircraft") widgetName = "Air Freight Aircraft & ULD Inspector";
    else if (subtopic.linkToWidget === "logistics") widgetName = "1PL-5PL Logistics Models Explorer";
    else if (subtopic.linkToWidget === "docs") widgetName = "Shipping Documentation Workflow Checklist";
    else if (subtopic.linkToWidget === "dg") widgetName = "Dangerous Goods (HAZMAT) Class Inspector";
    else if (subtopic.linkToWidget === "reefer") widgetName = "Cold Chain & Reefer Container Specs";
    else if (subtopic.linkToWidget === "hs") widgetName = "HS Code Classifier & Tariff Lookup";
    
    bodyHTML += `
      <div style="margin-bottom: 25px; padding: 16px; border: 1px solid var(--border-color); border-radius: 14px; background-color: var(--bg-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <span style="font-weight: 600; font-size: 0.92rem; color: var(--primary-navy);">Launch the dedicated interactive simulator:</span>
        <button class="btn btn-primary" onclick="switchPage('tools'); toggleToolPanel('${subtopic.linkToWidget}'); document.getElementById('modal-close').click();" style="font-size: 0.85rem; padding: 8px 18px;">
          Open ${widgetName} &rarr;
        </button>
      </div>
    `;
  }
  
  // Written documentation/SVG diagram payload
  bodyHTML += `
    <div class="kb-content-text">
      ${subtopic.content}
    </div>
  `;
  
  // Navigation Buttons (Next / Previous)
  const subtopicIndex = category.subtopics.findIndex(s => s.id === subtopicId);
  const prevSubtopic = subtopicIndex > 0 ? category.subtopics[subtopicIndex - 1] : null;
  const nextSubtopic = subtopicIndex < category.subtopics.length - 1 ? category.subtopics[subtopicIndex + 1] : null;
  
  bodyHTML += `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 35px; padding-top: 20px; border-top: 1px solid var(--border-color);">
      ${prevSubtopic ? `<button class="btn" style="font-size: 0.85rem; padding: 10px 20px; background-color: var(--primary-navy); color: white; border-radius: 6px; box-shadow: var(--shadow-sm);" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'" onclick="openSubtopicModal('${categoryId}', '${prevSubtopic.id}')">&larr; Previous Subtopic</button>` : `<div></div>`}
      ${nextSubtopic ? `<button class="btn btn-primary" style="font-size: 0.85rem; padding: 10px 20px;" onclick="openSubtopicModal('${categoryId}', '${nextSubtopic.id}')">Next Subtopic &rarr;</button>` : `<div></div>`}
    </div>
  `;
  
  // Insert direct YouTube link button if YouTube link exists
  if (subtopic.youtube) {
    const videoId = subtopic.youtube.split("/embed/")[1];
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    bodyHTML += `
      <div class="youtube-direct-container" style="margin-top: 25px; margin-bottom: 25px;">
        <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary reveal-video-btn" style="text-decoration: none; font-size: 0.88rem; padding: 12px 22px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1.5px solid var(--border-color); color: var(--primary-navy); background: var(--bg-white); font-weight: 700; border-radius: 50px; cursor: pointer; transition: var(--transition-smooth);">
          📺 Watch Video Guide on YouTube &rarr;
        </a>
      </div>
    `;
  }
  
  modalBody.innerHTML = bodyHTML;

  // Make ALL images inside subtopic modal clickable to open in Fullscreen Lightbox Modal
  const allModalImages = modalBody.querySelectorAll("img");
  allModalImages.forEach(img => {
    img.style.cursor = "pointer";
    if (!img.title) img.title = "Click to view full screen & download";
    const imgTitle = img.alt || subtopic.title || "Infographic View";
    img.onclick = function(e) {
      if (e && e.stopPropagation) e.stopPropagation();
      openImageModal(img.getAttribute("src") || img.src, imgTitle);
    };
  });

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Disable scroll
  
  // Close triggers
  const closeBtn = document.getElementById("modal-close");
  const closeModal = () => {
    modalOverlay.classList.remove("active");
    modalBody.innerHTML = ""; // Clear iframe to stop playback
    document.body.style.overflow = "";
  };
  
  closeBtn.onclick = closeModal;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeModal();
  };
}

function revealModalVideo(btn, videoUrl) {
  const container = btn.closest(".youtube-reveal-container");
  const hiddenWrapper = container.querySelector(".video-wrapper-hidden");
  const iframe = hiddenWrapper.querySelector("iframe");
  iframe.src = videoUrl;
  hiddenWrapper.style.display = "block";
  btn.style.display = "none";
}

function openImageModal(imageSrc, imageTitle) {
  const lightboxModal = document.getElementById("image-lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-image-title");
  const lightboxDownload = document.getElementById("lightbox-download-btn");
  
  if (lightboxModal && lightboxImg && lightboxTitle && lightboxDownload) {
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageTitle || "Subtopic Image";
    lightboxTitle.textContent = imageTitle || "Image View";
    lightboxDownload.href = imageSrc;
    const cleanFilename = (imageTitle || "image").replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_') + '.jpg';
    lightboxDownload.download = cleanFilename;
    
    lightboxModal.style.display = "flex";
    void lightboxModal.offsetWidth; // Force layout recalculation
    lightboxModal.classList.add("active");
  }
}

function closeImageLightbox(e) {
  if (e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
  }
  const lightboxModal = document.getElementById("image-lightbox-modal");
  if (lightboxModal) {
    lightboxModal.classList.remove("active");
    setTimeout(() => {
      lightboxModal.style.display = "none";
    }, 200);
  }
}

window.openImageModal = openImageModal;
window.openLightbox = openImageModal;
window.closeImageLightbox = closeImageLightbox;



/* ==========================================
   4. KNOWLEDGE SEARCH & FILTER
   ========================================== */
function initSearch() {
  const searchInput = document.getElementById("kb-search");
  if (!searchInput) return;
  
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const categories = document.querySelectorAll(".category-card");
    const kbData = getKBData();
    if (!kbData || !kbData.categories) return;
    
    categories.forEach(card => {
      const categoryId = card.getAttribute("data-category-id");
      const category = kbData.categories.find(c => c.id === categoryId);
      if (!category) return;
      
      const subtopicItems = card.querySelectorAll(".subtopic-item");
      let visibleSubtopics = 0;
      
      category.subtopics.forEach((subtopic, index) => {
        const titleMatch = subtopic.title.toLowerCase().includes(query);
        const summaryMatch = subtopic.summary.toLowerCase().includes(query);
        const contentMatch = subtopic.content.toLowerCase().includes(query);
        
        if (titleMatch || summaryMatch || contentMatch || query === "") {
          subtopicItems[index].style.display = "flex";
          visibleSubtopics++;
        } else {
          subtopicItems[index].style.display = "none";
        }
      });
      
      const categoryTitleMatch = category.title.toLowerCase().includes(query) || category.description.toLowerCase().includes(query);
      
      if (categoryTitleMatch) {
        card.style.display = "flex";
        subtopicItems.forEach(item => item.style.display = "flex");
      } else if (visibleSubtopics > 0) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

function filterLearningHub(query) {
  switchPage('learning');
  setTimeout(() => {
    const searchInput = document.getElementById("kb-search");
    if (searchInput) {
      searchInput.value = query;
      searchInput.dispatchEvent(new Event('input'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 100);
}

/* ==========================================
   5. INTERACTIVE INCOTERMS MATRIX
   ========================================== */
const INCOTERMS_DATA = {
  EXW: {
    code: "EXW",
    name: "Ex Works",
    mode: "Any Mode of Transport",
    desc: "Seller prepares goods at their premises. Buyer assumes all costs, risks, transportation, and customs liabilities.",
    responsibilities: {
      packaging: "seller",
      loading: "buyer",
      originTruck: "buyer",
      expCustoms: "buyer",
      terminalHandling: "buyer",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  FCA: {
    code: "FCA",
    name: "Free Carrier",
    mode: "Any Mode of Transport",
    desc: "Seller delivers goods cleared for export to the buyer's carrier at a named place. Risk transfers at cargo handover.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "buyer",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  FAS: {
    code: "FAS",
    name: "Free Alongside Ship",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller delivers goods alongside the buyer's vessel at the named port of shipment. Risk transfers alongside ship.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "buyer",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  FOB: {
    code: "FOB",
    name: "Free On Board",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller delivers goods on board the vessel. Risk transfers when goods are safely loaded on deck.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "buyer",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CFR: {
    code: "CFR",
    name: "Cost and Freight",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller pays main sea transit to destination port. Risk transfers to buyer as soon as goods are loaded on deck at origin.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CIF: {
    code: "CIF",
    name: "Cost, Insurance and Freight",
    mode: "Sea & Inland Waterways Only",
    desc: "Seller pays sea carriage and basic cargo insurance to destination port. Risk transfers to buyer at origin loading.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CPT: {
    code: "CPT",
    name: "Carriage Paid To",
    mode: "Any Mode of Transport",
    desc: "Seller pays main carriage to named destination. Risk transfers to buyer upon handing over to first carrier at origin.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "buyer",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  CIP: {
    code: "CIP",
    name: "Carriage and Insurance Paid To",
    mode: "Any Mode of Transport",
    desc: "Seller pays transport and high-level insurance to named destination. Risk transfers upon origin carrier handover.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "buyer",
      unloading: "buyer"
    }
  },
  DAP: {
    code: "DAP",
    name: "Delivered At Place",
    mode: "Any Mode of Transport",
    desc: "Seller delivers cargo to buyer's destination premises, ready for unloading. Seller bears all risks to final place.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "seller",
      unloading: "buyer"
    }
  },
  DPU: {
    code: "DPU",
    name: "Delivered at Place Unloaded",
    mode: "Any Mode of Transport",
    desc: "Seller delivers and unloads cargo at named destination place. Seller bears all costs/risks including unloading.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "buyer",
      destTruck: "seller",
      unloading: "seller"
    }
  },
  DDP: {
    code: "DDP",
    name: "Delivered Duty Paid",
    mode: "Any Mode of Transport",
    desc: "Seller bears absolute logistics liabilities: origin, shipping, destination clearances, duties, taxes, and final delivery.",
    responsibilities: {
      packaging: "seller",
      loading: "seller",
      originTruck: "seller",
      expCustoms: "seller",
      terminalHandling: "seller",
      mainCarriage: "seller",
      insurance: "seller",
      impCustoms: "seller",
      destTruck: "seller",
      unloading: "buyer"
    }
  }
};

function initIncotermsMatrix() {
  const incotermBtnContainer = document.getElementById("incoterms-btn-list");
  if (!incotermBtnContainer) return;
  
  incotermBtnContainer.innerHTML = "";
  
  Object.keys(INCOTERMS_DATA).forEach((key, index) => {
    const btn = document.createElement("button");
    btn.className = `incoterm-selector-btn ${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="incoterm-code">${INCOTERMS_DATA[key].code}</span>
      <span class="incoterm-name">${INCOTERMS_DATA[key].name}</span>
    `;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".incoterm-selector-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateIncotermDisplay(key);
    });
    incotermBtnContainer.appendChild(btn);
  });
  
  updateIncotermDisplay("EXW");
}

function updateIncotermDisplay(code) {
  const term = INCOTERMS_DATA[code];
  if (!term) return;
  
  document.getElementById("term-title").textContent = `${term.code} - ${term.name}`;
  document.getElementById("term-mode").textContent = term.mode;
  document.getElementById("term-desc").textContent = term.desc;
  
  const steps = ["packaging", "loading", "originTruck", "expCustoms", "terminalHandling", "mainCarriage", "insurance", "impCustoms", "destTruck", "unloading"];
  
  steps.forEach(step => {
    const bar = document.getElementById(`resp-${step}`);
    if (!bar) return;
    
    const owner = term.responsibilities[step];
    bar.className = `step-bar ${owner}`;
    
    if (owner === "seller") {
      bar.style.width = "100%";
      bar.textContent = "Seller Responsible";
    } else if (owner === "buyer") {
      bar.style.width = "100%";
      bar.textContent = "Buyer Responsible";
    }
  });
}

/* ==========================================
   6. CONTAINER SPEC & CBM CALCULATOR
   ========================================== */
const CONTAINER_SPECS = {
  dry20: {
    name: "20ft Standard Dry Container",
    len: "5,898 mm",
    wid: "2,352 mm",
    hei: "2,393 mm",
    doorW: "2,340 mm",
    doorH: "2,280 mm",
    maxW: "30,480 kg",
    tare: "2,200 kg",
    payload: "28,280 kg",
    volume: "33.2 CBM",
    color: "#0A2540",
    label: "20FT DRY"
  },
  dry40: {
    name: "40ft Standard Dry Container",
    len: "12,032 mm",
    wid: "2,352 mm",
    hei: "2,393 mm",
    doorW: "2,340 mm",
    doorH: "2,280 mm",
    maxW: "30,480 kg",
    tare: "3,700 kg",
    payload: "26,780 kg",
    volume: "67.7 CBM",
    color: "#1e3a8a",
    label: "40FT DRY"
  },
  hc40: {
    name: "40ft High Cube Container",
    len: "12,032 mm",
    wid: "2,352 mm",
    hei: "2,698 mm",
    doorW: "2,340 mm",
    doorH: "2,585 mm",
    maxW: "30,480 kg",
    tare: "3,900 kg",
    payload: "26,580 kg",
    volume: "76.4 CBM",
    color: "#FF5A1F",
    label: "40FT HIGH CUBE"
  },
  reefer20: {
    name: "20ft Reefer (Refrigerated)",
    len: "5,444 mm",
    wid: "2,294 mm",
    hei: "2,276 mm",
    doorW: "2,290 mm",
    doorH: "2,220 mm",
    maxW: "30,480 kg",
    tare: "3,200 kg",
    payload: "27,280 kg",
    volume: "28.3 CBM",
    color: "#0ea5e9",
    label: "20FT REEFER"
  },
  reefer40: {
    name: "40ft Reefer High Cube",
    len: "11,556 mm",
    wid: "2,294 mm",
    hei: "2,500 mm",
    doorW: "2,290 mm",
    doorH: "2,440 mm",
    maxW: "34,000 kg",
    tare: "4,600 kg",
    payload: "29,400 kg",
    volume: "66.2 CBM",
    color: "#38bdf8",
    label: "40FT REEFER HC"
  },
  flat20: {
    name: "20ft Flat Rack Container",
    len: "5,940 mm",
    wid: "2,350 mm",
    hei: "2,350 mm (posts)",
    doorW: "N/A (Open)",
    doorH: "N/A (Open)",
    maxW: "30,480 kg",
    tare: "2,750 kg",
    payload: "27,730 kg",
    volume: "Collapsible Sides",
    color: "#78716c",
    label: "20FT FLAT RACK"
  }
};

function initContainerCalc() {
  const btns = document.querySelectorAll(".container-btn");
  if (btns.length === 0) return;
  
  updateContainerSpecsDisplay("dry20");
  
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const type = btn.getAttribute("data-type");
      updateContainerSpecsDisplay(type);
    });
  });
  
  const calcBtn = document.getElementById("calc-cbm-btn");
  const clearBtn = document.getElementById("calc-clear-btn");
  
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      calculateCargoCBM();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document.getElementById("cargo-len").value = "";
      document.getElementById("cargo-wid").value = "";
      document.getElementById("cargo-hei").value = "";
      document.getElementById("cargo-qty").value = "";
      document.getElementById("cargo-weight").value = "";
      
      document.getElementById("res-cbm").textContent = "0.000";
      document.getElementById("res-vol-wt").textContent = "0.00 kg";
      document.getElementById("res-charge-wt").textContent = "0.00 kg";
      document.getElementById("res-rec").textContent = "Input cargo specs above.";
    });
  }
}

function updateContainerSpecsDisplay(type) {
  const specs = CONTAINER_SPECS[type];
  if (!specs) return;
  
  document.getElementById("spec-name").textContent = specs.name;
  document.getElementById("spec-len").textContent = specs.len;
  document.getElementById("spec-wid").textContent = specs.wid;
  document.getElementById("spec-hei").textContent = specs.hei;
  document.getElementById("spec-maxw").textContent = specs.maxW;
  document.getElementById("spec-tare").textContent = specs.tare;
  document.getElementById("spec-payload").textContent = specs.payload;
  document.getElementById("spec-vol").textContent = specs.volume;
  
  const graphic = document.getElementById("container-graphic-box");
  if (graphic) {
    graphic.style.backgroundColor = specs.color;
    graphic.querySelector(".container-label-overlay").textContent = specs.label;
  }
}

function calculateCargoCBM() {
  const length = parseFloat(document.getElementById("cargo-len").value) || 0;
  const width = parseFloat(document.getElementById("cargo-wid").value) || 0;
  const height = parseFloat(document.getElementById("cargo-hei").value) || 0;
  const quantity = parseInt(document.getElementById("cargo-qty").value) || 0;
  const grossWeight = parseFloat(document.getElementById("cargo-weight").value) || 0;
  
  if (length <= 0 || width <= 0 || height <= 0 || quantity <= 0) {
    alert("Please enter positive values for dimensions and quantity.");
    return;
  }
  
  const volCBM = ((length / 100) * (width / 100) * (height / 100)) * quantity;
  const volWeight = volCBM * 166.67;
  const chargeableWeight = Math.max(grossWeight, volWeight);
  
  document.getElementById("res-cbm").textContent = volCBM.toFixed(3);
  document.getElementById("res-vol-wt").textContent = volWeight.toFixed(2) + " kg";
  document.getElementById("res-charge-wt").textContent = chargeableWeight.toFixed(2) + " kg";
  
  let recommendation = "";
  if (volCBM < 1) {
    recommendation = `Air freight consolidated (Chargeable wt: ${chargeableWeight.toFixed(1)}kg) or Ocean LCL (Vol: ${volCBM.toFixed(2)} CBM).`;
  } else if (volCBM <= 15) {
    recommendation = `Ocean LCL is recommended (${volCBM.toFixed(1)} CBM). Breaking point is close to FCL if it reaches 15 CBM.`;
  } else if (volCBM <= 28) {
    recommendation = `1x 20ft Standard Dry Container (Fits up to 28 CBM cargo safely).`;
  } else if (volCBM <= 58) {
    recommendation = `1x 40ft Standard Dry Container (Fits up to 58 CBM cargo safely).`;
  } else if (volCBM <= 68) {
    recommendation = `1x 40ft High Cube Container (Fits up to 68 CBM cargo safely).`;
  } else {
    const num40hc = Math.ceil(volCBM / 68);
    recommendation = `Multiple containers required: Suggest ${num40hc}x 40ft High Cube Containers.`;
  }
  
  document.getElementById("res-rec").textContent = recommendation;
}

/* ==========================================
   7. AIRCRAFT FREIGHTER HOTSPOT VIEWER
   ========================================== */
const AIRCRAFT_HOTSPOTS = {
  1: {
    title: "Flight Deck (Cockpit)",
    desc: "Located at the front upper nose section. Houses the pilots, advanced navigation computers, cargo door operation switches, and pilot crew rest facilities. In full freighters, passenger seating is removed to optimize cargo space."
  },
  2: {
    title: "Main Deck Cargo Door",
    desc: "An extremely large, hydraulically operated side-loading door (approx 3.4m wide x 3.1m high). This allows high-loader platforms to slide oversized, heavy pallets directly into the upper deck main cargo area."
  },
  3: {
    title: "Main Deck Cargo Hold",
    desc: "The primary high-volume cargo deck. Can accommodate cargo pallets stacked up to 3 meters (10 feet) high. Features structural tracks to lock PMC and PAG pallets securely during flight."
  },
  4: {
    title: "Cargo Roller System",
    desc: "Built directly into the cargo deck flooring. Features heavy-duty ball-mats and motor-driven rollers (PDU). Allows a small ground crew of 2-3 to glide massive 5-tonne pallets along the cabin effortlessly."
  },
  5: {
    title: "Lower Forward Cargo Hold",
    desc: "Heated and pressurized compartment located beneath the forward cockpit. Best suited for smaller Unit Load Devices (ULDs) such as LD3 and LD6 containers. Accommodates passengers' luggage in commercial flights."
  },
  6: {
    title: "PMC/PAG Cargo Loading",
    desc: "A mobile ground scissor platform (High Loader) raises cargo containers up to 5 meters high to level with the main deck door, enabling swift loading and unloading."
  },
  7: {
    title: "Lower Aft Cargo Hold",
    desc: "Located behind the wings in the lower belly. Pressurized and temperature-controlled. Houses ULD luggage boxes and is ideal for transport of animals, fresh seafood, and perishables."
  },
  8: {
    title: "Ground Crew & Cargo Dollies",
    desc: "Ground handling agent crew operate motorized tugs pulling rows of wheeled cargo dollies. These transport pre-built ULD cargo containers between the airport warehouse and the aircraft side."
  }
};

function initAircraftHotspots() {
  const hotspots = document.querySelectorAll(".hotspot");
  if (hotspots.length === 0) return;
  
  hotspots.forEach(spot => {
    spot.addEventListener("click", () => {
      const idx = spot.getAttribute("data-id");
      const data = AIRCRAFT_HOTSPOTS[idx];
      if (!data) return;
      
      document.getElementById("aircraft-info-title").textContent = `${idx}. ${data.title}`;
      document.getElementById("aircraft-info-desc").textContent = data.desc;
    });
    
    spot.addEventListener("mouseover", () => {
      const idx = spot.getAttribute("data-id");
      const data = AIRCRAFT_HOTSPOTS[idx];
      if (!data) return;
      
      document.getElementById("aircraft-info-title").textContent = `${idx}. ${data.title}`;
      document.getElementById("aircraft-info-desc").textContent = data.desc;
    });
  });
}

/* ==========================================
   8. 10 KEY LOGISTICS MODELS INTERACTIVE EXPLORER & SIMULATOR
   ========================================== */
const LOGISTICS_MODELS_DATA = {
  inbound: {
    id: "inbound",
    num: "01",
    title: "Inbound Logistics",
    tagline: "Raw Materials Intake & Factory Supply",
    icon: "📥",
    badge: "Supply Operations",
    desc: "Movement, receiving, and storage of incoming parts, raw materials, and components from suppliers to manufacturing plants.",
    activities: [
      "Supplier procurement & purchase order tracking",
      "Bulk raw material sea/truck freight transport",
      "Factory gate receiving, inspection & quality control",
      "Warehouse staging & Just-In-Time (JIT) storage"
    ],
    activeNodes: ["node-supplier", "node-factory"],
    speed: { text: "Scheduled / Batch", percent: 65 },
    cost: { text: "35% of Product Cost", percent: 70 },
    tech: { text: "ERP & WMS Tracking", percent: 80 },
    eco: { text: "Optimized Container Load", percent: 55 },
    scenario: "Transporting 20 FCL containers of raw cotton fabric from India/China to Colombo Port and trucking to Katunayake Free Trade Zone factory.",
    simSteps: [
      "Customs inspection & documentation release at Colombo Port.",
      "Heavy container truck haulage via Colombo Katunayake Expressway.",
      "Gate entry, unsealing & raw fabric roll inventory logging.",
      "Staging at factory cutting floor for garment production."
    ],
    comparison: {
      focus: "Supply side (Upstream)",
      primaryActor: "Raw Material Vendors & Factory",
      cargoType: "Raw materials, components, bulk parts",
      keyGoal: "Uninterrupted production flow without stockouts",
      techNeeded: "ERP, Purchase Order Tracking, WMS"
    }
  },
  outbound: {
    id: "outbound",
    num: "02",
    title: "Outbound Logistics",
    tagline: "Finished Goods Storage & Global Dispatch",
    icon: "📤",
    badge: "Fulfillment",
    desc: "Storage, order fulfillment, packaging, and shipping of finished commercial products from manufacturing hubs to final buyers.",
    activities: [
      "Finished goods warehousing & order pick-pack",
      "Export documentation (Bill of Lading, Certificate of Origin)",
      "Ocean FCL/LCL & Air Freight international shipping",
      "Distribution center transport & Last-Mile delivery"
    ],
    activeNodes: ["node-factory", "node-hub", "node-consumer"],
    speed: { text: "High Priority / Express", percent: 85 },
    cost: { text: "45% of Total Budget", percent: 85 },
    tech: { text: "Automated Picking & Freight Track", percent: 90 },
    eco: { text: "Route & Load Optimization", percent: 60 },
    scenario: "Exporting 500 pallets of finished rubber tires from Biyagama, Sri Lanka to Hamburg Seaport via ocean container line.",
    simSteps: [
      "Palletization & container stuffing at Biyagama factory.",
      "Export customs clearance & loading onto vessel at SAGT terminal.",
      "Transshipment voyage across Indian Ocean & Suez Canal.",
      "Discharge at Hamburg port & transport to European automotive dealers."
    ],
    comparison: {
      focus: "Demand side (Downstream)",
      primaryActor: "Manufacturers, Ocean Carriers, Retailers",
      cargoType: "Finished goods, packaged retail items",
      keyGoal: "On-time delivery & customer satisfaction",
      techNeeded: "TMS (Transport Management System), GPS Tracking"
    }
  },
  reverse: {
    id: "reverse",
    num: "03",
    title: "Reverse Logistics",
    tagline: "Returns, Recycling & Circular Trade",
    icon: "🔄",
    badge: "Circular Economy",
    desc: "Managing the backwards flow of returned, damaged, defective, or end-of-life products for repair, refurbishing, recycling, or disposal.",
    activities: [
      "Customer returns processing & RMA authorization",
      "Reverse transport from buyer back to hub",
      "Testing, sorting, refurbishment & repackaging",
      "E-waste recycling & hazardous waste disposal"
    ],
    activeNodes: ["node-consumer", "node-hub", "node-recycle"],
    speed: { text: "Moderate (Standard Return)", percent: 50 },
    cost: { text: "15-20% of Sale Value", percent: 60 },
    tech: { text: "Barcode Scanning & Returns Portal", percent: 75 },
    eco: { text: "High (Prevents Landfills)", percent: 95 },
    scenario: "Returning defective consumer electronics from retail customers across Sri Lanka back to Colombo service center for warranty repair.",
    simSteps: [
      "Customer drops off item at courier parcel shop.",
      "Consolidated return truck transport to Central Colombo Repair Hub.",
      "Technical inspection: 70% repaired, 30% salvaged for spare parts.",
      "E-waste materials dispatched to certified recycling facility."
    ],
    comparison: {
      focus: "Backward flow (End-of-life / Return)",
      primaryActor: "Customers, Return Hubs, Recyclers",
      cargoType: "Returned goods, defective items, empty pallets",
      keyGoal: "Value recovery & eco-friendly waste management",
      techNeeded: "Reverse Logistics Portal, RMA Tracking"
    }
  },
  thirdparty: {
    id: "thirdparty",
    num: "04",
    title: "Third-Party Logistics (3PL)",
    tagline: "Outsourced Warehousing & Freight Services",
    icon: "🏢",
    badge: "Outsourced Operations",
    desc: "Outsourcing operational logistics activities—such as warehousing, customs clearance, freight forwarding, and fleet trucking—to a specialized partner like Nexus Cargo.",
    activities: [
      "Multi-client bonded warehousing & inventory control",
      "Sea freight & air freight consolidation (LCL)",
      "Customs house brokerage (CHB) & regulatory clearance",
      "Container drayage & last-mile fleet dispatch"
    ],
    activeNodes: ["node-supplier", "node-hub", "node-consumer"],
    speed: { text: "High Efficiency & SLA Driven", percent: 80 },
    cost: { text: "Variable Pay-Per-Use", percent: 65 },
    tech: { text: "Cloud WMS, EDI & Live Tracking", percent: 85 },
    eco: { text: "Shared Fleet Capacity", percent: 75 },
    scenario: "Nexus Cargo managing complete bonded warehousing, customs clearance, and nationwide delivery for an international beverage brand.",
    simSteps: [
      "Ocean freight containers received at Nexus Logistics Center.",
      "Customs duty clearance & barcode inventory staging.",
      "Order pick & pack executed upon retail store requests.",
      "Dispatching trucks for same-day delivery to island-wide supermarkets."
    ],
    comparison: {
      focus: "Physical Execution & Operations",
      primaryActor: "3PL Provider (e.g. Nexus Cargo)",
      cargoType: "Multi-client general cargo, containers, parcels",
      keyGoal: "Operational cost reduction & asset optimization",
      techNeeded: "WMS, TMS, EDI Integrations"
    }
  },
  fourthparty: {
    id: "fourthparty",
    num: "05",
    title: "Fourth-Party Logistics (4PL)",
    tagline: "End-to-End Supply Chain Lead Orchestrator",
    icon: "🌐",
    badge: "Strategic Advisory",
    desc: "A master supply chain integrator that designs, builds, and manages an enterprise's entire logistics architecture, managing multiple 3PLs and ocean/air carriers.",
    activities: [
      "Supply chain network design & route optimization",
      "Managing multiple 3PL vendors & carrier contracts",
      "Big data analytics, demand forecasting & control tower",
      "Control tower visibility across global shipping lanes"
    ],
    activeNodes: ["node-supplier", "node-factory", "node-hub", "node-consumer"],
    speed: { text: "Strategic Real-Time Control", percent: 90 },
    cost: { text: "Strategic Management Fee", percent: 75 },
    tech: { text: "AI Control Tower & Unified APIs", percent: 98 },
    eco: { text: "Global Carbon Minimization", percent: 85 },
    scenario: "A global retail brand hiring a 4PL lead orchestrator to manage 4 ocean carriers, 3 customs brokers, and 5 regional 3PL warehouses across Asia.",
    simSteps: [
      "AI Control tower detects port congestion at Singapore.",
      "Reroutes 12 ocean shipments dynamically to alternative ports.",
      "Coordinates 3PL trucks at destination for immediate offloading.",
      "Provides real-time carbon & cost dashboard to executive board."
    ],
    comparison: {
      focus: "Strategic Network Design & Oversight",
      primaryActor: "4PL Lead Logistics Partner",
      cargoType: "Enterprise-wide global supply chain flows",
      keyGoal: "End-to-end visibility, strategic optimization",
      techNeeded: "AI Control Tower, Business Intelligence, APIs"
    }
  },
  production: {
    id: "production",
    num: "06",
    title: "Production Logistics",
    tagline: "Internal Assembly & Factory Material Flow",
    icon: "⚙️",
    badge: "Intralogistics",
    desc: "Managing internal material flows, buffer stocks, and parts delivery within a manufacturing plant to keep assembly lines running smoothly.",
    activities: [
      "Just-In-Time (JIT) & Just-In-Sequence (JIS) line feeding",
      "Automated Guided Vehicle (AGV) internal transit",
      "Work-In-Progress (WIP) inventory buffer management",
      "Lean manufacturing & kitting line replenishment"
    ],
    activeNodes: ["node-supplier", "node-factory"],
    speed: { text: "Synchronized to Seconds", percent: 95 },
    cost: { text: "Factory Automation", percent: 60 },
    tech: { text: "Robotics, AGVs & IoT Sensors", percent: 92 },
    eco: { text: "Zero Factory Waste", percent: 70 },
    scenario: "Automated guided vehicles delivering microchip kits to assembly stations in a high-tech electronics manufacturing facility.",
    simSteps: [
      "Sensors detect component bin dropping below 15% capacity.",
      "Robotic forklift retrieves kitted parts from internal buffer.",
      "Autonomous vehicle navigates factory floor to station #4.",
      "Assembly line workers receive microchips without stopping work."
    ],
    comparison: {
      focus: "Inside factory walls (Intralogistics)",
      primaryActor: "Factory Operations & Automation Robots",
      cargoType: "Parts kits, sub-assemblies, raw materials",
      keyGoal: "Zero assembly line downtime, lean inventory",
      techNeeded: "MES (Manufacturing Execution System), AGVs, RFID"
    }
  },
  distribution: {
    id: "distribution",
    num: "07",
    title: "Distribution Logistics",
    tagline: "Wholesale & Cross-Dock Hub Delivery",
    icon: "🏪",
    badge: "Commercial Dispatch",
    desc: "Movement of finished goods from regional distribution centers (DCs) and cross-dock facilities to retail stores, supermarkets, and regional stockists.",
    activities: [
      "Regional Distribution Center (RDC) hub operations",
      "Cross-docking (transfer without long storage)",
      "Multi-stop truck routing to retail networks",
      "Temperature-controlled cold chain distribution"
    ],
    activeNodes: ["node-hub", "node-consumer"],
    speed: { text: "Daily / Scheduled Express", percent: 85 },
    cost: { text: "High Transport & Handling", percent: 75 },
    tech: { text: "Dynamic Route Optimizer & Scanners", percent: 88 },
    eco: { text: "Consolidated Multi-Stop Loads", percent: 65 },
    scenario: "Daily cross-dock distribution of fresh dairy & frozen goods from central warehouse to 150 supermarket branches across Western Province.",
    simSteps: [
      "Refrigerated trucks dock at distribution center at 4:00 AM.",
      "Cargo sorted & palletized into store-specific delivery zones.",
      "Route optimization software generates shortest GPS transit path.",
      "Deliveries completed & electronic Proof of Delivery (ePOD) signed."
    ],
    comparison: {
      focus: "Hub to Market (Regional B2B)",
      primaryActor: "Distributors, Wholesalers, Truck Fleets",
      cargoType: "FMCG, perishable foods, consumer goods",
      keyGoal: "High product availability & fresh stock rotation",
      techNeeded: "Routing Software, Cold Chain Telematics, ePOD"
    }
  },
  military: {
    id: "military",
    num: "08",
    title: "Military Logistics",
    tagline: "Strategic Mobilization & Defense Support",
    icon: "🪖",
    badge: "Strategic Defense",
    desc: "Planning and executing the movement, maintenance, and sustainment of armed forces, equipment, fuel, and supplies during peacetime or active deployment.",
    activities: [
      "Heavy military transport aircraft & naval strategic sealift",
      "Tactical fuel, ammunition & ration supply chain",
      "Mobile field hospital & equipment maintenance units",
      "Secure communications & encrypted cargo tracking"
    ],
    activeNodes: ["node-factory", "node-hub", "node-consumer"],
    speed: { text: "Critical Immediate Mobilization", percent: 98 },
    cost: { text: "High Resilience Infra", percent: 90 },
    tech: { text: "Encrypted Satellite & Rugged Systems", percent: 95 },
    eco: { text: "Mission Success Priority", percent: 30 },
    scenario: "Air-lifting tactical relief vehicles, field medical units, and rations via heavy cargo aircraft to a remote international peacekeeping base.",
    simSteps: [
      "Strategic air command authorizes emergency flight plan.",
      "Heavy military cargo transport loaded with armored vehicles.",
      "Tactical flight & air-drop or landing at field airstrip.",
      "Immediate field deployment & supply distribution."
    ],
    comparison: {
      focus: "Defense & Strategic Security",
      primaryActor: "Armed Forces Logistics Corps & Heavy Transport",
      cargoType: "Armaments, fuel, rations, medical field gear",
      keyGoal: "Uncompromised security & mission readiness",
      techNeeded: "Encrypted Satellite GPS, Heavy Strategic Airlift"
    }
  },
  emergency: {
    id: "emergency",
    num: "09",
    title: "Emergency & Humanitarian",
    tagline: "Disaster Relief & Rapid Crisis Response",
    icon: "🚑",
    badge: "Humanitarian Relief",
    desc: "Rapid deployment of essential supplies—food, clean water, medical equipment, and shelter—to disaster-stricken or conflict zones under chaotic conditions.",
    activities: [
      "Priority charter flights & emergency customs clearance",
      "Humanitarian aid consolidation & relief drop zones",
      "Cold-chain vaccine & emergency blood transportation",
      "NGO & international relief agency coordination"
    ],
    activeNodes: ["node-factory", "node-hub", "node-consumer"],
    speed: { text: "Ultra Fast (< 24 Hours)", percent: 99 },
    cost: { text: "High Emergency Charter", percent: 85 },
    tech: { text: "GIS Disaster Mapping & Satellite", percent: 85 },
    eco: { text: "Life Saving First Priority", percent: 40 },
    scenario: "Airfreighting 50 tons of emergency medical kits, water purification units, and tents to flood-affected areas in South Asia within 18 hours.",
    simSteps: [
      "Emergency cargo flight chartered & priority air corridor granted.",
      "Cargo offloaded at nearest operational runway.",
      "Helicopter & 4x4 truck distribution to cut-off rural towns.",
      "Clean water units operational; medical clinics established."
    ],
    comparison: {
      focus: "Humanitarian Crisis & Life Saving",
      primaryActor: "UN, Red Cross, Disaster Response Teams",
      cargoType: "Vaccines, water purification, tents, food",
      keyGoal: "Speed of response & saving lives",
      techNeeded: "GIS Disaster Mapping, Satellite Comms, Air Charter"
    }
  },
  green: {
    id: "green",
    num: "10",
    title: "Green & Sustainable Logistics",
    tagline: "Eco-Friendly Transport & Zero Emission Strategy",
    icon: "🌿",
    badge: "Sustainability",
    desc: "Designing supply chain operations to minimize carbon footprint, greenhouse emissions, noise pollution, and material waste through eco-technologies.",
    activities: [
      "Biofuel ocean vessels & Electric Commercial Vehicles (EVs)",
      "Modal shift (Air to Sea / Road to Rail freight)",
      "Reusable plastic containers (RPCs) & eco-packaging",
      "Carbon accounting, offset tracking & green warehousing"
    ],
    activeNodes: ["node-supplier", "node-factory", "node-hub", "node-consumer", "node-recycle"],
    speed: { text: "Optimized Sustainable Pace", percent: 70 },
    cost: { text: "Long-Term Cost Savings", percent: 70 },
    tech: { text: "Carbon Analytics & EV Telematics", percent: 92 },
    eco: { text: "Maximum (Zero Emissions)", percent: 100 },
    scenario: "Switching export shipments from high-emission air freight to LNG/Biofuel ocean vessels & electric truck last-mile in European cities.",
    simSteps: [
      "Carbon footprint audit calculates 80% emission reduction opportunity.",
      "Cargo loaded onto Bio-LNG powered container ship at Colombo Port.",
      "Electric heavy-duty trucks handle port-to-warehouse drayage.",
      "Zero-emission delivery verified & green certification awarded."
    ],
    comparison: {
      focus: "Environmental Sustainability & Net-Zero",
      primaryActor: "Green Logistics Carriers, Eco Enterprises",
      cargoType: "Eco-packaged goods, sustainable freight",
      keyGoal: "Minimizing carbon emissions & environmental impact",
      techNeeded: "Carbon Footprint Calculators, EV Fleet Telematics"
    }
  }
};

let activeLogisticsModelKey = "inbound";
let simIntervalTimer = null;

function initLogisticsGrid() {
  renderLogisticsModelNav();
  populateLogisticsCompareDropdowns();
  selectLogisticsModel("inbound");
}

function renderLogisticsModelNav() {
  const navContainer = document.getElementById("logistics-model-nav");
  if (!navContainer) return;

  navContainer.innerHTML = Object.keys(LOGISTICS_MODELS_DATA).map(key => {
    const item = LOGISTICS_MODELS_DATA[key];
    return `
      <button class="logistics-nav-pill ${key === activeLogisticsModelKey ? 'active' : ''}" 
              onclick="selectLogisticsModel('${key}')" id="pill-model-${key}">
        <span class="pill-icon">${item.icon}</span>
        <span class="pill-text">${item.num}. ${item.title}</span>
      </button>
    `;
  }).join('');
}

function selectLogisticsModel(key) {
  const data = LOGISTICS_MODELS_DATA[key];
  if (!data) return;

  activeLogisticsModelKey = key;

  // Update Pills
  document.querySelectorAll(".logistics-nav-pill").forEach(p => p.classList.remove("active"));
  const activePill = document.getElementById(`pill-model-${key}`);
  if (activePill) {
    activePill.classList.add("active");
    activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Update Header & Badge
  document.getElementById("logistics-active-icon").textContent = data.icon;
  document.getElementById("logistics-active-title").textContent = data.title;
  document.getElementById("logistics-active-tagline").textContent = data.tagline;
  document.getElementById("logistics-active-badge").textContent = data.badge;

  // Update Pipeline Nodes Highlight
  const allNodes = ["node-supplier", "node-factory", "node-hub", "node-consumer", "node-recycle"];
  allNodes.forEach(nodeId => {
    const el = document.getElementById(nodeId);
    if (el) {
      if (data.activeNodes.includes(nodeId)) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  });

  // Update Pipeline Connectors Highlight
  const connectors = ["conn-1", "conn-2", "conn-3", "conn-4"];
  connectors.forEach((connId, idx) => {
    const connEl = document.getElementById(connId);
    if (connEl) {
      const nodeA = allNodes[idx];
      const nodeB = allNodes[idx + 1];
      if (data.activeNodes.includes(nodeA) && data.activeNodes.includes(nodeB)) {
        connEl.classList.add("active");
      } else {
        connEl.classList.remove("active");
      }
    }
  });

  // Update Description & Activities
  document.getElementById("logistics-active-desc").textContent = data.desc;
  const actList = document.getElementById("logistics-active-activities");
  if (actList) {
    actList.innerHTML = data.activities.map(act => `<li><span class="act-bullet">✓</span> ${act}</li>`).join('');
  }

  // Update KPI Meters
  document.getElementById("kpi-speed-val").textContent = data.speed.text;
  document.getElementById("kpi-speed-fill").style.width = `${data.speed.percent}%`;

  document.getElementById("kpi-cost-val").textContent = data.cost.text;
  document.getElementById("kpi-cost-fill").style.width = `${data.cost.percent}%`;

  document.getElementById("kpi-tech-val").textContent = data.tech.text;
  document.getElementById("kpi-tech-fill").style.width = `${data.tech.percent}%`;

  document.getElementById("kpi-eco-val").textContent = data.eco.text;
  document.getElementById("kpi-eco-fill").style.width = `${data.eco.percent}%`;

  // Reset Simulation Box
  document.getElementById("sim-scenario-text").textContent = data.scenario;
  const simWrapper = document.getElementById("sim-progress-wrapper");
  if (simWrapper) simWrapper.style.display = "none";
  const btnRun = document.getElementById("btn-run-sim");
  if (btnRun) {
    btnRun.disabled = false;
    btnRun.innerHTML = `<span class="sim-btn-icon">▶</span> Run Live Simulation`;
  }
  if (simIntervalTimer) clearInterval(simIntervalTimer);
}

function runCurrentLogisticsSimulation() {
  const data = LOGISTICS_MODELS_DATA[activeLogisticsModelKey];
  if (!data) return;

  const btnRun = document.getElementById("btn-run-sim");
  const simWrapper = document.getElementById("sim-progress-wrapper");
  const progressBar = document.getElementById("sim-progress-bar");
  const statusText = document.getElementById("sim-status-text");

  if (simIntervalTimer) clearInterval(simIntervalTimer);

  btnRun.disabled = true;
  btnRun.innerHTML = `<span class="sim-btn-icon">⏳</span> Simulating...`;
  simWrapper.style.display = "block";
  progressBar.style.width = "0%";

  let stepIdx = 0;
  const steps = data.simSteps;
  const totalSteps = steps.length;

  statusText.textContent = `Step 1: ${steps[0]}`;
  progressBar.style.width = `${((1) / totalSteps) * 100}%`;

  simIntervalTimer = setInterval(() => {
    stepIdx++;
    if (stepIdx < totalSteps) {
      statusText.textContent = `Step ${stepIdx + 1}: ${steps[stepIdx]}`;
      progressBar.style.width = `${((stepIdx + 1) / totalSteps) * 100}%`;
    } else {
      clearInterval(simIntervalTimer);
      statusText.textContent = `✅ Simulation Completed: All cargo milestones reached successfully!`;
      btnRun.disabled = false;
      btnRun.innerHTML = `<span class="sim-btn-icon">🔄</span> Re-Run Simulation`;
    }
  }, 1800);
}

function setLogisticsView(viewType) {
  const btnExplorer = document.getElementById("logistics-btn-explorer");
  const btnCompare = document.getElementById("logistics-btn-compare");
  const viewExplorer = document.getElementById("logistics-view-explorer");
  const viewCompare = document.getElementById("logistics-view-compare");

  if (viewType === 'explorer') {
    btnExplorer.classList.add("active");
    btnCompare.classList.remove("active");
    viewExplorer.style.display = "block";
    viewCompare.style.display = "none";
  } else {
    btnCompare.classList.add("active");
    btnExplorer.classList.remove("active");
    viewCompare.style.display = "block";
    viewExplorer.style.display = "none";
    renderLogisticsComparison();
  }
}

function populateLogisticsCompareDropdowns() {
  const selectA = document.getElementById("compare-model-a");
  const selectB = document.getElementById("compare-model-b");
  if (!selectA || !selectB) return;

  const optionsHTML = Object.keys(LOGISTICS_MODELS_DATA).map(key => {
    const item = LOGISTICS_MODELS_DATA[key];
    return `<option value="${key}">${item.num}. ${item.title}</option>`;
  }).join('');

  selectA.innerHTML = optionsHTML;
  selectB.innerHTML = optionsHTML;

  selectA.value = "thirdparty";
  selectB.value = "fourthparty";
}

function renderLogisticsComparison() {
  const keyA = document.getElementById("compare-model-a").value;
  const keyB = document.getElementById("compare-model-b").value;
  const table = document.getElementById("logistics-compare-table");
  if (!table) return;

  const mA = LOGISTICS_MODELS_DATA[keyA];
  const mB = LOGISTICS_MODELS_DATA[keyB];

  table.innerHTML = `
    <thead>
      <tr>
        <th style="width: 25%;">Feature Comparison</th>
        <th style="width: 37.5%; text-align: center;">${mA.icon} ${mA.title}</th>
        <th style="width: 37.5%; text-align: center;">${mB.icon} ${mB.title}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Primary Strategic Focus</strong></td>
        <td>${mA.comparison.focus}</td>
        <td>${mB.comparison.focus}</td>
      </tr>
      <tr>
        <td><strong>Primary Operational Actor</strong></td>
        <td>${mA.comparison.primaryActor}</td>
        <td>${mB.comparison.primaryActor}</td>
      </tr>
      <tr>
        <td><strong>Cargo & Flow Type</strong></td>
        <td>${mA.comparison.cargoType}</td>
        <td>${mB.comparison.cargoType}</td>
      </tr>
      <tr>
        <td><strong>Core Strategic Goal</strong></td>
        <td>${mA.comparison.keyGoal}</td>
        <td>${mB.comparison.keyGoal}</td>
      </tr>
      <tr>
        <td><strong>Core Systems Required</strong></td>
        <td>${mA.comparison.techNeeded}</td>
        <td>${mB.comparison.techNeeded}</td>
      </tr>
      <tr>
        <td><strong>Speed & Urgency Level</strong></td>
        <td>${mA.speed.text} (${mA.speed.percent}%)</td>
        <td>${mB.speed.text} (${mB.speed.percent}%)</td>
      </tr>
      <tr>
        <td><strong>Sustainability & Eco Rating</strong></td>
        <td>${mA.eco.text} (${mA.eco.percent}%)</td>
        <td>${mB.eco.text} (${mB.eco.percent}%)</td>
      </tr>
    </tbody>
  `;
}

/* ==========================================
   9. NEXUS AI CHATBOT (STATEFUL CONVERSATION)
   ========================================== */
const NEXUS_AI_SYSTEM_PROMPT = `You are "Nexus AI," a Master Senior Professor & Global Freight Forwarding Tutor representing Nexus Cargo Knowledge Hub. Your mission is to provide exceptionally thorough, educational, accurate, and actionable responses to help users learn international trade, shipping, customs compliance, and supply chain logistics.

Core Teaching Persona & Response Directives:
1. **Educational & Comprehensive**: Provide rich, structured, step-by-step explanations that teach the underlying concepts thoroughly. Avoid brief 1-sentence answers.
2. **Clear Formatting**: Structure every response using clean Markdown with section headings (###), bold key terms, bullet points, and numbered steps for maximum readability.
3. **Practical Industry Examples**: Include real-world scenarios (e.g. exporting garments or tea from Sri Lanka to Western Europe/USA, importing electronics or machinery from China, air-freighting perishables).
4. **Formulas & Calculations**: Whenever asked about CBM, Volumetric Weight, Chargeable Weight, Freight Costs, Demurrage, or Duty, provide the exact mathematical formula with a clear, step-by-step worked-out example.
5. **Sri Lanka & Global Trade Specifics**: Seamlessly integrate Sri Lankan trade procedures when relevant (e.g., Sri Lanka Customs ASYCUDA CUSDEC clearance, Sri Lanka Tea Board permits, Colombo Port terminals CICT/SAGT/JCT, Katunayake Air Cargo Village) alongside global maritime/air standards.
6. **Multi-lingual Mastery**: Respond in the language used by the user. If the user asks in Sinhala or Singlish, provide fluent, easy-to-understand explanations in Sinhala/English mix or clear Sinhala with technical terms in English.
7. **Pro-Tips**: Conclude responses with a practical "💡 Logistics Pro-Tip" or "⚠️ Compliance Warning".

Boundaries:
- Focus exclusively on logistics, freight forwarding, customs clearance, Incoterms, supply chain, and global trade.
- Maintain a polite, highly professional, encouraging, and academic tone.`;

let conversationHistory = [];
let currentTopicContext = null;


const SHIPPING_BOT_ANSWERS = {
  greeting: "Hello! I am Nexus AI, your global logistics and trade advisor. How can I help you today? You can ask me anything about global logistics, airports, seaports, shipping routes, customs compliance, or freight operations worldwide!",
  incoterms: "Incoterms (International Commercial Terms) divide shipping costs and risks between buyer and seller. The 11 terms in Incoterms 2020/2026 are: EXW, FCA, FAS, FOB, CFR, CIF, CPT, CIP, DAP, DPU, and DDP. Do you have a specific term in mind?",
  fob: "FOB (Free On Board) dictates that the seller clears cargo for export and loads it onto the vessel. Risk transfers to the buyer once the goods are safely loaded on board at the origin port. The buyer pays for sea freight and import clearances.",
  exw: "EXW (Ex Works) places maximum risk and cost on the buyer. The seller only makes goods available at their factory. The buyer handles export customs, shipping, insurance, and destination haulage.",
  cbm: "CBM (Cubic Meter) is the metric for volume. Formula: Length(m) x Width(m) x Height(m) x Quantity. In air freight, 1 CBM charges at 166.67 kg. In ocean LCL, it charges at 1000 kg (1 Ton).",
  volumetric: "Air Volumetric Weight is calculated as: (Length x Width x Height in cm) / 6000, or total CBM x 166.67. If this exceeds actual weight, you are charged on this volume index.",
  container: "Dry container capacities: 20ft (33.2 CBM, ~28 tonne payload) and 40ft (67.7 CBM, ~26 tonne payload). High Cube (40ft HC) yields 76.4 CBM. Reefers are refrigerated boxes for temperature control.",
  demurrage: "Demurrage is a penalty charged by shipping lines for keeping a container inside the port past the allowed free days (3-7 days). Detention is charged for keeping the container empty outside the port past free return limits.",
  lithium: "Lithium batteries are classified as Class 9 Miscellaneous Dangerous Goods. Under IATA rules, they require UN packaging, specific security labels, and a Shipper's Declaration for Dangerous Goods (DGD).",
  help: "Ask me questions like:\n- 'How is volumetric weight calculated?'\n- 'What is the risk split under FOB?'\n- 'Explain LCL consolidation.'\n- 'Tell me about demurrage vs detention.'"
};

let isNexusAiChatInitialized = false;

function initNexusAIChat() {
  const sendBtn = document.getElementById("chat-send-btn");
  const textInput = document.getElementById("chat-input");
  const msgArea = document.getElementById("chat-msg-area");
  
  if (!sendBtn || !textInput || !msgArea) return;
  
  // Auto-restore saved Gemini API Key from localStorage if present
  const apiKeyInput = document.getElementById("api-key-input");
  const saveKeyBtn = document.getElementById("save-api-key-btn");
  
  if (apiKeyInput) {
    const savedKey = localStorage.getItem("nexus_gemini_api_key");
    if (savedKey) {
      apiKeyInput.value = savedKey;
    }
  }

  // Guard against re-binding event listeners multiple times
  if (isNexusAiChatInitialized) return;
  isNexusAiChatInitialized = true;
  
  msgArea.innerHTML = "";
  conversationHistory = [];
  currentTopicContext = null;
  
  if (saveKeyBtn && apiKeyInput) {
    saveKeyBtn.addEventListener("click", () => {
      const keyVal = apiKeyInput.value.trim();
      if (keyVal) {
        localStorage.setItem("nexus_gemini_api_key", keyVal);
        saveKeyBtn.textContent = "Saved ✓";
        saveKeyBtn.style.backgroundColor = "#16A34A";
        setTimeout(() => {
          saveKeyBtn.textContent = "Save";
          saveKeyBtn.style.backgroundColor = "var(--accent-orange)";
        }, 2000);
      } else {
        localStorage.removeItem("nexus_gemini_api_key");
        apiKeyInput.value = "";
        saveKeyBtn.textContent = "Cleared";
        setTimeout(() => {
          saveKeyBtn.textContent = "Save";
        }, 2000);
      }
    });
  }
  
  appendChatMessage("system", SHIPPING_BOT_ANSWERS.greeting);
  conversationHistory.push({ role: "model", parts: [{ text: SHIPPING_BOT_ANSWERS.greeting }] });
  
  sendBtn.addEventListener("click", () => {
    handleUserChatMessage();
  });
  
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserChatMessage();
    }
  });
  
  const presetBtns = document.querySelectorAll(".chat-preset-query");
  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      textInput.value = btn.textContent.trim();
      handleUserChatMessage();
    });
  });
}

function appendChatMessage(sender, text) {
  const msgArea = document.getElementById("chat-msg-area");
  if (!msgArea) return;
  
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${sender}`;
  
  const avatar = document.createElement("div");
  avatar.className = `chat-avatar ${sender}`;
  
  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  
  if (text === "... reasoning") {
    bubble.innerHTML = `
      <div class="typing-indicator" style="font-style: italic; color: var(--primary-navy); opacity: 0.8; font-size: 0.9rem; font-weight: 600;">
        Thinking <span></span><span></span><span></span>
      </div>
    `;
  } else {
    bubble.innerHTML = parseMarkdown(text);
  }
  
  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  
  msgArea.appendChild(msgDiv);
  msgArea.scrollTop = msgArea.scrollHeight;
}

// Custom lightweight Markdown-to-HTML parser
function parseMarkdown(text) {
  let lines = text.split("\n");
  let html = [];
  let inList = false;
  let inTable = false;
  let tableHeaderParsed = false;
  let tableRows = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // 1. Table Parsing
    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableHeaderParsed = false;
        tableRows = [];
      }
      
      let cells = line.split("|").map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // Skip markdown divider lines like |---|---|
      if (cells.every(c => c.match(/^[-:]+$/))) {
        tableHeaderParsed = true;
        continue;
      }
      
      tableRows.push({ cells, isHeader: !tableHeaderParsed });
      continue;
    } else {
      if (inTable) {
        // Output accumulated table
        let tableHTML = '<table>';
        let hasHeader = tableRows.some(r => r.isHeader);
        
        if (hasHeader) {
          tableHTML += '<thead>';
          tableRows.filter(r => r.isHeader).forEach(r => {
            tableHTML += '<tr>' + r.cells.map(c => `<th>${parseInlineMarkdown(c)}</th>`).join('') + '</tr>';
          });
          tableHTML += '</thead>';
        }
        
        tableHTML += '<tbody>';
        tableRows.filter(r => !r.isHeader).forEach(r => {
          tableHTML += '<tr>' + r.cells.map(c => `<td>${parseInlineMarkdown(c)}</td>`).join('') + '</tr>';
        });
        tableHTML += '</tbody></table>';
        
        html.push(tableHTML);
        inTable = false;
      }
    }
    
    // 2. Lists Parsing
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) {
        inList = true;
        html.push("<ul>");
      }
      let content = line.substring(2);
      html.push(`<li>${parseInlineMarkdown(content)}</li>`);
      continue;
    } else {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    }
    
    // 3. Headers
    if (line.startsWith("### ")) {
      html.push(`<h3>${parseInlineMarkdown(line.substring(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      html.push(`<h2>${parseInlineMarkdown(line.substring(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      html.push(`<h1>${parseInlineMarkdown(line.substring(2))}</h1>`);
      continue;
    }
    
    // 4. Paragraph
    if (line !== "") {
      html.push(`<p>${parseInlineMarkdown(line)}</p>`);
    } else if (html.length > 0 && html[html.length - 1] !== "<br>") {
      html.push("<br>");
    }
  }
  
  // Close trailing blocks
  if (inTable) {
    let tableHTML = '<table><tbody>';
    tableRows.forEach(r => {
      tableHTML += '<tr>' + r.cells.map(c => `<td>${parseInlineMarkdown(c)}</td>`).join('') + '</tr>';
    });
    tableHTML += '</tbody></table>';
    html.push(tableHTML);
  }
  if (inList) {
    html.push("</ul>");
  }
  
  return html.join("\n");
}

function parseInlineMarkdown(text) {
  // Bold
  let parsed = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic
  parsed = parsed.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Inline Code
  parsed = parsed.replace(/`(.*?)`/g, "<code>$1</code>");
  return parsed;
}


async function handleUserChatMessage() {
  const textInput = document.getElementById("chat-input");
  const query = textInput.value.trim();
  if (query === "") return;
  
  appendChatMessage("user", query);
  textInput.value = "";
  
  conversationHistory.push({ role: "user", parts: [{ text: query }] });
  
  appendChatMessage("system", "... reasoning");
  const typingMsg = document.querySelector(".chat-message.system:last-child");
  
  setTimeout(async () => {
    try {
      // 1. Primary Engine: Embedded Google Gemini AI
      const responseText = await callGeminiAPI();
      if (typingMsg) typingMsg.remove();
      appendChatMessage("system", responseText);
      conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
    } catch (err) {
      console.warn("Gemini API Error, trying serverless backup AI...", err);
      try {
        // 2. Secondary Engine: Keyless Serverless AI
        const responseText = await callFreeAI();
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", responseText);
        conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
      } catch (err2) {
        // 3. Fallback Engine: Standalone Freight Intelligence
        const fallbackMsg = getLocalConversationalResponse(query);
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", fallbackMsg);
        conversationHistory.push({ role: "model", parts: [{ text: fallbackMsg }] });
      }
    }
  }, 400);
}

// Keyless Free AI proxy call
async function callFreeAI() {
  const systemText = NEXUS_AI_SYSTEM_PROMPT;
  
  const messages = [
    {
      role: "system",
      content: systemText
    }
  ];

  
  let latestUserQuery = "";
  conversationHistory.forEach(msg => {
    const text = msg.parts[0].text;
    if (text.includes("... reasoning") || text.includes("... thinking") || text === "") return;
    
    if (msg.role === "user") {
      latestUserQuery = text;
    }
    
    messages.push({
      role: msg.role === "model" ? "assistant" : "user",
      content: text
    });
  });
  
  // 1. Try JSON POST payload (preserves full multi-turn conversational history)
  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });
    
    if (response.ok) {
      const resultText = await response.text();
      if (resultText && resultText.trim() !== "") {
        return resultText;
      }
    }
  } catch (e) {
    console.warn("Pollinations POST connection failed, attempting GET fallback...", e);
  }
  
  // 2. Fallback to robust GET query (guarantees completion even on CORS/POST blockages)
  const promptText = `System Context: ${systemText}\n\nUser Question: ${latestUserQuery}`;
  const encodedPrompt = encodeURIComponent(promptText);
  const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=openai`);
  
  if (!response.ok) {
    throw new Error(`GET Fallback HTTP ${response.status}`);
  }
  
  const resultText = await response.text();
  if (!resultText || resultText.trim() === "") {
    throw new Error("Empty response from AI GET fallback.");
  }
  return resultText;
}


// Local Conversational Response Engine with Stop Words Filtering & Regional Intelligence
function getLocalConversationalResponse(query) {
  const q = query.toLowerCase().trim();
  
  // 0. Chinese New Year / Spring Festival Logistics Impact Matcher
  if (q.includes("china new year") || q.includes("chinese new year") || q.includes("cny") || q.includes("spring festival") || (q.includes("china") && (q.includes("new year") || q.includes("festival") || q.includes("holiday")))) {
    return `### 🧧 Impact of Chinese New Year (CNY) on Global Shipping & Logistics\n\nChinese New Year (Spring Festival) causes the largest annual disruption to global supply chains:\n\n1. **Factory Closures & Production Halt**:\n   - Chinese manufacturing plants close for **2 to 4 weeks** (between late January and mid-February). Millions of factory workers travel home, causing a complete production standstill across China.\n\n2. **The Pre-CNY Shipping Surge (Peak Season)**:\n   - In the **4 to 6 weeks leading up to CNY**, importers and exporters rush to ship cargo before factories lock doors.\n   - **Freight Rates Surge**: Ocean and air freight spot rates spike dramatically due to intense space competition.\n   - **Equipment Shortages**: Container availability at origin ports (Shanghai, Ningbo, Shenzhen) becomes extremely tight.\n\n3. **Blank Sailings (Vessel Cancellations)**:\n   - During and immediately after CNY, ocean carriers execute widespread **Blank Sailings** (cancelling scheduled ship voyages) because export volumes drop sharply.\n\n4. **Post-CNY Recovery Period (3-4 Weeks)**:\n   - Factories take **3 to 4 weeks to return to 100% operational capacity** as migrant labor returns gradually. Shipping volumes remain sluggish until late March.\n\n💡 *Logistics Best Practice: Book cargo space at least 4 to 6 weeks BEFORE Chinese New Year to avoid rolled cargo and Peak Season Surcharges (PSS).*`;
  }
  
  // 1. Regional Freight & Airport / Seaport Intelligence Hub
  if ((q.includes("europe") || q.includes("eroupe") || q.includes("european") || q.includes("eu")) && (q.includes("airport") || q.includes("air") || q.includes("hub") || q.includes("flight") || q.includes("famous") || q.includes("detail"))) {
    return `### ✈️ Major Cargo & Passenger Airports in Europe\n\nEurope operates several of the world's most critical air freight gateways and aviation hubs:\n\n1. **Frankfurt Airport (FRA - Germany)**:\n   - Europe's busiest air cargo hub (~2.2 million tonnes annually). Primary base for Lufthansa Cargo featuring specialized GDP-certified cold-chain facilities for pharma.\n\n2. **Paris Charles de Gaulle (CDG - France)**:\n   - Major European express hub (FedEx European hub) handling over 2 million tonnes of cargo per year.\n\n3. **Amsterdam Airport Schiphol (AMS - Netherlands)**:\n   - Premier multimodal gateway connecting directly to Europe's largest seaport (Rotterdam) and Europe's rail network.\n\n4. **London Heathrow Airport (LHR - United Kingdom)**:\n   - The UK's primary air freight portal, processing over 1.5 million tonnes of high-value belly-hold cargo.\n\n5. **Luxembourg Findel Airport (LUX)**:\n   - Operational hub for Cargolux, operating strictly as a dedicated all-cargo freighter hub.\n\n💡 *Air Freight Calculation Tip: Chargeable weight is always the higher of Gross Weight or Volumetric Weight (L x W x H in cm / 6000).*`;
  }

  if ((q.includes("japan") || q.includes("tokyo") || q.includes("osaka")) && (q.includes("airport") || q.includes("air") || q.includes("hub") || q.includes("flight"))) {
    return `### ✈️ Major Air Freight Gateways in Japan\n\nJapan operates some of the world's most technologically advanced air cargo hubs:\n\n1. **Narita International Airport (NRT - Tokyo)**:\n   - Japan's primary international air cargo gateway, handling ~2 million tonnes annually.\n   - Features the **NRT Cold Chain Cluster** (temperature-regulated warehouses for pharma and fresh produce).\n2. **Tokyo Haneda Airport (HND)**:\n   - Located close to Tokyo city center; ideal for urgent express shipments and belly-hold cargo on passenger flights.\n3. **Kansai International Airport (KIX - Osaka)**:\n   - 24/7 offshore island airport serving Western Japan's electronics and biotech manufacturing sectors.\n4. **Chubu Centrair Airport (NGO - Nagoya)**:\n   - Dedicated hub for automotive parts (Toyota supply chain) and aerospace components.\n\n💡 *Air Freight Calculation Tip: Chargeable weight for Japan shipments is the higher of Gross Weight or Volumetric Weight (L x W x H in cm / 6000).*`;
  }

  if ((q.includes("japan") || q.includes("tokyo") || q.includes("yokohama") || q.includes("kobe")) && (q.includes("port") || q.includes("sea") || q.includes("ocean") || q.includes("vessel"))) {
    return `### 🚢 Major Ocean Ports in Japan\n\nJapan's container shipping is centered around key maritime clusters:\n\n- **Keihin Ports (Tokyo Bay)**: Tokyo, Yokohama, and Kawasaki ports (major import gateways for consumer goods).\n- **Hanshin Ports (Kansai)**: Kobe and Osaka ports (major industrial export hubs).\n- **Nagoya Port**: Japan's largest port by total cargo throughput, driving automobile exports.`;
  }

  if ((q.includes("sri lanka") || q.includes("colombo")) && (q.includes("customs") || q.includes("cusdec") || q.includes("clearance"))) {
    return `### 🇱🇰 Sri Lanka Customs & Trade Clearance\n\n- **CUSDEC (Customs Declaration)**: Submitted electronically via ASYCUDA World system.\n- **Primary Regulatory Approvals**: SL Tea Board (for tea exports), NMRA (National Medicines Regulatory Authority for pharma), Import & Export Control Department.\n- **Colombo Port Hub**: CICT (Colombo International Container Terminals), SAGT (South Asia Gateway Terminals), and JCT (Jaya Container Terminal).\n- **Air Cargo**: Katunayake Air Cargo Village (CMB BIA Airport).`;
  }

  if (q.includes("singapore") || q.includes("changi") || q.includes("pasir panjang")) {
    return `### 🇸🇬 Singapore Global Logistics Hub\n\n- **PSA Singapore**: The world's largest transshipment port, connecting 600+ ports globally.\n- **Changi Air Cargo Centre (SIN)**: 24/7 free trade zone with specialized cold-chain and express handling.`;
  }

  if (q.includes("dubai") || q.includes("jebel ali") || q.includes("uae")) {
    return `### 🇦🇪 Dubai & Middle East Logistics Hub\n\n- **Jebel Ali Port (DP World)**: Largest man-made harbor and premier Middle East transshipment port.\n- **Dubai Cargo City (DXB / DWC)**: Seamless sea-to-air multimodal connectivity within 4 hours.`;
  }
  
  // 2. Core Shipping Topic matchers
  if (q.includes("incoterm")) {
    currentTopicContext = "incoterms";
    return SHIPPING_BOT_ANSWERS.incoterms;
  }
  if (q.includes("fob")) {
    currentTopicContext = "fob";
    return SHIPPING_BOT_ANSWERS.fob;
  }
  if (q.includes("exw")) {
    currentTopicContext = "exw";
    return SHIPPING_BOT_ANSWERS.exw;
  }
  if (q.includes("cbm") || q.includes("cubic meter")) {
    currentTopicContext = "cbm";
    return SHIPPING_BOT_ANSWERS.cbm;
  }
  if (q.includes("volumetric") || q.includes("chargeable") || q.includes("weight")) {
    currentTopicContext = "volumetric";
    return SHIPPING_BOT_ANSWERS.volumetric;
  }
  if (q.includes("container") || q.includes("size")) {
    currentTopicContext = "container";
    return SHIPPING_BOT_ANSWERS.container;
  }
  if (q.includes("demurrage") || q.includes("detention")) {
    currentTopicContext = "demurrage";
    return SHIPPING_BOT_ANSWERS.demurrage;
  }
  if (q.includes("battery") || q.includes("lithium")) {
    currentTopicContext = "lithium";
    return SHIPPING_BOT_ANSWERS.lithium;
  }
  
  // 3. Stateful Context Reference Matches (resolving "it", "this", "who pays", "how")
  if (currentTopicContext) {
    if (q.includes("who pays") || q.includes("responsibility") || q.includes("buyer") || q.includes("seller") || q.includes("risk")) {
      if (currentTopicContext === "fob") {
        return "Under FOB: The seller pays all trucking, clearance, and port handling charges at the origin port. The buyer takes over risk and pays the ocean freight, cargo insurance, and all import port duties/fees.";
      }
      if (currentTopicContext === "exw") {
        return "Under EXW: The buyer pays for everything from origin pickup onward. The seller pays nothing once cargo is ready at their warehouse door.";
      }
      if (currentTopicContext === "incoterms") {
        return "It depends entirely on the term! Under DDP, the seller pays everything. Under EXW, the buyer pays everything. For FOB, it split at the ship's rail. Which term are you assessing?";
      }
    }
    
    if (q.includes("how to calculate") || q.includes("formula") || q.includes("math")) {
      if (currentTopicContext === "cbm") {
        return "The formula is: Length (m) x Width (m) x Height (m) x Quantity = Total CBM. Do you have dimensions to run?";
      }
      if (currentTopicContext === "volumetric") {
        return "For Air Cargo: (Length x Width x Height in cm) / 6000. For Sea LCL: 1 CBM is equivalent to 1000 kg (1 Ton).";
      }
    }
    
    if (q.includes("what sizes") || q.includes("capacity") || q.includes("dimension")) {
      if (currentTopicContext === "container") {
        return "A standard 20ft Dry fits ~28-30 CBM cargo. A 40ft Dry fits ~58-65 CBM. A 40ft High Cube goes up to ~68-75 CBM volume capacity.";
      }
    }
  }
  
  // 4. Greetings and Help
  if (/\b(hi|hello|hey|greetings|howdy)\b/i.test(q)) {
    return SHIPPING_BOT_ANSWERS.greeting;
  }
  if (q.includes("help") || q.includes("list")) {
    return SHIPPING_BOT_ANSWERS.help;
  }
  
  // 5. Standalone Conversational Freight AI Engine (Trade Lanes, Routes, Customs, Regulations)
  if ((q.includes("china") || q.includes("asia")) && (q.includes("usa") || q.includes("america") || q.includes("us") || q.includes("transpacific"))) {
    return `### 🌐 Transpacific Shipping Corridor (China & Asia to USA)\n\nThe Transpacific container shipping lane is the highest-volume maritime trade corridor in the world:\n\n1. **US West Coast (USWC)**:\n   - **Primary Ports**: Los Angeles (LA), Long Beach (LB), Oakland, Seattle/Tacoma.\n   - **Transit Time**: 12 to 16 days direct ocean transit from Shanghai/Ningbo/Shenzhen.\n\n2. **US East Coast (USEC)**:\n   - **Primary Ports**: New York / New Jersey, Savannah, Charleston, Norfolk (routed via the Panama Canal).\n   - **Transit Time**: 24 to 32 days ocean transit.\n\n3. **Intermodal Landbridge (MLB / IPI)**:\n   - Cargo Discharges at USWC ports and moves by rail (BNSF / Union Pacific) to inland hubs like Chicago, Dallas, Memphis, and Atlanta.\n\n4. **Key Customs Compliance Requirements**:\n   - **ISF 10+2 Filing**: Must be filed with US Customs (CBP) at least 24 hours BEFORE cargo is loaded on the ship at origin.\n   - **Section 301 Tariffs**: Import tariffs applicable to Chinese-origin goods.\n   - **AMS (Automated Manifest System)**: Transmitted by carriers before vessel departure.`;
  }

  if ((q.includes("china") || q.includes("asia")) && (q.includes("europe") || q.includes("uk") || q.includes("eu") || q.includes("suez"))) {
    return `### 🇪🇺 Far East to Europe Trade Lane (FEWB)\n\nThe Asia-Europe trade lane connects East Asian manufacturing hubs to European consumer markets:\n\n1. **Key Routing & Transit Times**:\n   - **Via Suez Canal**: 25-30 days to Northern Europe (Rotterdam, Hamburg, Antwerp, Felixstowe) and Mediterranean (Valencia, Piraeus).\n   - **Via Cape of Good Hope (Red Sea Bypass)**: Adds ~10-14 days due to rerouting around Southern Africa.\n\n2. **Major Alliances**: Ocean Alliance, 2M, Premier Alliance.\n\n3. **Customs & Rules**: ICS2 (Import Control System 2) pre-arrival security declarations, EORI number requirement, and EU Customs Duties.`;
  }

  if (q.includes("trade lane") || q.includes("shipping lane") || q.includes("corridor") || q.includes("route")) {
    return `### 🌐 Major Global Trade Lanes\n\n1. **Transpacific (Asia - North America)**: Largest volume lane connecting China/SE Asia to US West/East Coasts.\n2. **Asia - Europe (FEWB)**: Major consumer goods route passing through the Strait of Malacca, Red Sea/Suez, and Mediterranean.\n3. **Transatlantic (Europe - North America)**: Connects Northern Europe to US East Coast (NY/NJ, Savannah).\n4. **Intra-Asia**: Fastest growing trade corridor connecting China, Vietnam, Thailand, Malaysia, Singapore, India, and Sri Lanka.`;
  }

  if (q.includes("free trade") || q.includes("fta") || q.includes("tariff") || q.includes("duty free")) {
    return `### 📜 Free Trade Agreements (FTAs) & Tariff Preferences\n\nFree Trade Agreements reduce or eliminate customs import tariffs between member nations:\n\n1. **Rules of Origin**: Products must qualify as "originating goods" under specific Regional Value Content (RVC) or Change in Tariff Classification (CTC) rules.\n2. **Proof of Origin**: Exporters must obtain official Certificates of Origin (e.g., Form A, Form E, EUR.1, or RCEP Certificate).\n3. **Major Global FTAs**: RCEP (Asia-Pacific), USMCA (US-Mexico-Canada), CPTPP, EU-Singapore FTA, SAFTA (South Asia).`;
  }

  if (q.includes("bill of lading") || q.includes("bl") || q.includes("hawb") || q.includes("mawb") || q.includes("lading")) {
    return `### 📄 Bill of Lading (B/L) & Air Waybill (AWB) Guide\n\n1. **Ocean Bill of Lading (B/L)**:\n   - **Master B/L (MBL)**: Issued by the ocean shipping line to the freight forwarder.\n   - **House B/L (HBL)**: Issued by the freight forwarder to the actual shipper/consignee.\n   - **Document Types**: Negotiable Original B/L (requires 3 originals surrendered), Express Release / Sea Waybill (no physical originals needed), Telex Release.\n\n2. **Air Waybill (AWB)**:\n   - **MAWB**: Issued by the airline.\n   - **HAWB**: Issued by the forwarder.\n   - *Note: AWBs are strictly non-negotiable transport contracts (never document of title).*`;
  }



  // Dynamic fallback: Search Knowledge Base context or generate rich global logistics answer
  const kbContext = getRelevantKnowledgeContext(query);
  if (kbContext) {
    return `### 🌐 Global Logistics & Knowledge Insights\n\nHere is detailed information regarding your inquiry (**"${query}"**):\n\n${kbContext}\n\n💡 *Need more specific calculations or international trade lane details? Ask Nexus AI anytime!*`;
  }

  return `### 🌐 Global Freight & Logistics Intelligence\n\nRegarding your query (**"${query}"**):\n\nGlobal freight forwarding encompasses **Air Freight**, **Ocean Freight (FCL/LCL)**, **Inland Trucking**, and **Customs Compliance**:\n\n- **Air Freight**: Fast transit (1-5 days) charged on Volumetric Weight \`(L x W x H in cm / 6000)\` or Gross Weight.\n- **Ocean Freight**: Economical bulk shipping via 20ft/40ft containers or LCL consolidation.\n- **Customs & Compliance**: Requires Commercial Invoice, Packing List, Bill of Lading / Air Waybill, and Harmonized System (HS) Codes.\n\n*Please specify any airport, seaport, trade lane, or calculation details you would like to explore further!*`;
}



// RAG Knowledge Base Retrieval Function
function getRelevantKnowledgeContext(userQuery) {
  const kbData = getKBData();
  if (!kbData || !kbData.categories) return "";
  
  const q = (userQuery || "").toLowerCase();
  const words = q.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 2 && !['what', 'how', 'why', 'when', 'where', 'which', 'who', 'the', 'and', 'for', 'can', 'you', 'tell', 'about', 'with', 'does', 'this', 'that', 'from'].includes(w));
  
  if (words.length === 0) return "";
  
  let matches = [];
  
  kbData.categories.forEach(cat => {
    cat.subtopics.forEach(sub => {
      let score = 0;
      const titleLower = (sub.title || "").toLowerCase();
      const summaryLower = (sub.summary || "").toLowerCase();
      const contentLower = (sub.content || "").toLowerCase();
      
      words.forEach(word => {
        if (titleLower.includes(word)) score += 5;
        if (summaryLower.includes(word)) score += 3;
        if (contentLower.includes(word)) score += 1;
      });
      
      if (score > 0) {
        matches.push({
          category: cat.title,
          title: sub.title,
          summary: sub.summary,
          snippet: sub.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 450),
          score: score
        });
      }
    });
  });
  
  matches.sort((a, b) => b.score - a.score);
  const topMatches = matches.slice(0, 3);
  
  if (topMatches.length === 0) return "";
  
  return topMatches.map(m => `[Topic: ${m.category} -> Subtopic: ${m.title}]\nSummary: ${m.summary}\nContent: ${m.snippet}...`).join("\n\n");
}

// System API Key
const getSystemApiKey = () => "AQ.Ab8RN6ITG-xV90y7H6cFpLNDX5vWMPKANL4LcMUyDegmOYvoXg";

async function callGeminiAPI(customKey) {
  const activeKey = customKey || getSystemApiKey();
  let cleanHistory = [];
  let lastRole = null;
  let latestUserQuery = "";
  
  conversationHistory.forEach(msg => {
    const text = msg.parts[0].text;
    if (text.includes("... reasoning") || text.includes("... thinking") || text === "") return;
    
    let role = msg.role;
    if (role === "system") {
      role = "model";
    } else if (role === "user") {
      latestUserQuery = text;
    }
    
    if (lastRole === role) {
      cleanHistory[cleanHistory.length - 1].parts[0].text += "\n" + text;
    } else {
      cleanHistory.push({
        role: role,
        parts: [{ text: text }]
      });
      lastRole = role;
    }
  });

  if (cleanHistory.length > 0 && cleanHistory[0].role === "model") {
    cleanHistory = cleanHistory.slice(1);
  }
  
  if (cleanHistory.length === 0) {
    cleanHistory.push({
      role: "user",
      parts: [{ text: "Hello" }]
    });
  }

  // Extract RAG Knowledge Base Grounding Context
  const ragContext = getRelevantKnowledgeContext(latestUserQuery);
  let systemPromptText = NEXUS_AI_SYSTEM_PROMPT;
  if (ragContext) {
    systemPromptText += `\n\n[RELEVANT PLATFORM KNOWLEDGE BASE DOMAIN DATA]:\n${ragContext}\n\nUse the above reference data to ground your educational explanation accurately.`;
  }

  // Exact Official Google Gemini REST API endpoint with URL key parameter to avoid CORS preflight blocking
  let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: cleanHistory,
      systemInstruction: {
        parts: [{ text: systemPromptText }]
      }
    })
  });
  
  // Try gemini-2.0-flash fallback if 1.5-flash returns non-200
  if (!response.ok) {
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${activeKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: cleanHistory,
        systemInstruction: {
          parts: [{ text: systemPromptText }]
        }
      })
    });
  }
  
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData.error ? errData.error.message : `HTTP ${response.status}`;
    throw new Error(errMsg);
  }
  
  const data = await response.json();
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
    return data.candidates[0].content.parts.map(p => p.text).join("");
  } else if (data.text) {
    return data.text;
  } else {
    return "Error parsing response.";
  }
}

/* ==========================================
   10. CONTACT FORM HANDLER
   ========================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-msg").value;
    const submitBtn = form.querySelector("button[type='submit']");
    
    // UI Feedback state
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Message...";
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "4c5f2dca-0449-478a-8228-a48af98ae7ec",
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });
      
      const result = await response.json();
      
      if (response.status === 200) {
        alert("Thank you! Your message has been sent successfully to Darshika @ Nexys Cargo. We will contact you soon.");
        form.reset();
      } else {
        alert(`Failed to send message: ${result.message || 'Unknown error'}. Please try again.`);
      }
    } catch (error) {
      alert("Failed to connect to the server. Please check your internet connection and try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// ==========================================
// NEW INTERACTIVE TOOLS LOGIC
// ==========================================

// ==========================================
// Tool 5: Bilateral Trade Documentation Checklist Generator
// ==========================================

const countryNames = {
  LK: { name: "Sri Lanka", flag: "🇱🇰", region: "South Asia" },
  CN: { name: "China", flag: "🇨🇳", region: "East Asia" },
  US: { name: "United States", flag: "🇺🇸", region: "North America" },
  DE: { name: "Germany (EU)", flag: "🇩🇪", region: "Europe" },
  IN: { name: "India", flag: "🇮🇳", region: "South Asia" },
  GB: { name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  AE: { name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East" },
  JP: { name: "Japan", flag: "🇯🇵", region: "East Asia" },
  AU: { name: "Australia", flag: "🇦🇺", region: "Oceania" },
  VN: { name: "Vietnam", flag: "🇻🇳", region: "Southeast Asia" },
  SG: { name: "Singapore", flag: "🇸🇬", region: "Southeast Asia" },
  NL: { name: "Netherlands (EU)", flag: "🇳🇱", region: "Europe" }
};

const docKnowledgeBase = {
  commercial_invoice: {
    title: "Commercial Invoice",
    authority: "Exporter / Shipper",
    deadline: "Prior to origin gate-in and customs clearance",
    rejectionRisks: "HS code mismatch, missing invoice currency, un-signed invoice, incorrect Incoterms breakdown.",
    details: "The primary legal and financial document declaring cargo value, buyer/seller details, 6-digit HS tariff codes, Incoterms 2020, and payment terms."
  },
  packing_list: {
    title: "Detailed Packing List",
    authority: "Shipper / Freight Packer",
    deadline: "Prior to container stuffing / warehouse receipt",
    rejectionRisks: "Discrepancy between invoice gross weight and actual scale weight, un-numbered carton counts.",
    details: "Specifies precise cargo breakdown per package, container stuffing orientation, net/gross weight, dimensions, and shipping marks."
  },
  bill_of_lading: {
    title: "Ocean Bill of Lading (B/L) / Sea Waybill",
    authority: "Ocean Transport Carrier (Vessel Operator / Freight Forwarder)",
    deadline: "Issued 24-48 hours after vessel departure from origin port",
    rejectionRisks: "Missing onboard notation date, seal number mismatch, un-signed original endorsement.",
    details: "Acts as official contract of carriage, receipt of cargo by vessel, and legal document of title required for destination cargo release."
  },
  air_waybill: {
    title: "Air Waybill (AWB) / Master AWB",
    authority: "Airline / Air Freight Forwarder",
    deadline: "Issued upon cargo acceptance at airport freight terminal",
    rejectionRisks: "Chargeable weight calculation error, missing ICAO/IATA dangerous goods code.",
    details: "Non-negotiable contract of carriage for air cargo, tracking number for flight transit and customs clearance."
  },
  isf_10_2: {
    title: "US Customs ISF 10+2 (Importer Security Filing)",
    authority: "US Importer of Record / Authorized Customs Broker",
    deadline: "STRICT CUT-OFF: Must be filed 24 Hours BEFORE vessel departure at origin port",
    rejectionRisks: "$5,000 fine per late filing by US CBP, hold on container at US discharge port.",
    details: "Mandatory security filing for ocean imports to the USA requiring 10 data elements from importer and 2 from carrier."
  },
  ics2_ens: {
    title: "EU Import Control System 2 (ICS2) ENS Filing",
    authority: "Carrier / Forwarder",
    deadline: "STRICT CUT-OFF: Must be filed 24 Hours BEFORE vessel loading at origin port",
    rejectionRisks: "Do Not Load (DNL) order issued by EU customs, vessel loading refusal.",
    details: "Advance cargo security declaration for all shipments entering or transiting European Union customs territory."
  },
  ccam_filing: {
    title: "China Customs Advance Manifest (CCAM)",
    authority: "Carrier / Shipping Agent",
    deadline: "STRICT CUT-OFF: 24 Hours prior to cargo loading at origin port",
    rejectionRisks: "Immediate rejection of vessel stowage slot by GACC (China Customs).",
    details: "Mandatory electronic cargo manifest filing required for all imports entering Chinese maritime ports."
  },
  cusdec_sl: {
    title: "Sri Lanka ASYCUDA CUSDEC Export/Import Declaration",
    authority: "Licensed Customs House Agent (CHA) / Declarant",
    deadline: "Prior to port gate-in (export) or prior to discharge (import)",
    rejectionRisks: "Incorrect TIN/VAT registration number, missing SVAT voucher, HS code misclassification.",
    details: "Official customs declaration submitted electronically via Sri Lanka Customs ASYCUDA World system."
  },
  icegate_be: {
    title: "India ICEGATE Bill of Entry / Shipping Bill",
    authority: "Customs Broker / Importer via ICEGATE Portal",
    deadline: "Prior to end of day following vessel arrival at Indian port",
    rejectionRisks: "Late filing penalty per day, CAROTAR 2020 origin compliance verification query.",
    details: "Electronic declaration filed on Indian Customs ICEGATE portal for duty calculation and cargo release."
  },
  cds_uk: {
    title: "UK Customs Declaration Service (CDS) Entry",
    authority: "UK Declarant / Customs Agent",
    deadline: "Prior to vessel arrival or GVMS movement reference generation",
    rejectionRisks: "Invalid GB EORI number, missing CPC procedure code.",
    details: "Official UK HMRC customs entry declaration system governing all imports following Brexit."
  },
  mirsal_uae: {
    title: "Dubai Customs Mirsal II Declaration",
    authority: "Dubai Customs Broker / Importer",
    deadline: "24 Hours prior to cargo arrival at UAE port/airport",
    rejectionRisks: "Unregistered UAE Customs Code, failure to submit commercial invoice in Arabic.",
    details: "Electronic customs clearing declaration required for all cargo entering UAE free zones or mainland."
  },
  sea_ams_jp: {
    title: "Japan Sea AMS (Advance Manifest System)",
    authority: "Carrier / NVOCC",
    deadline: "STRICT CUT-OFF: 24 Hours prior to departure from origin port",
    rejectionRisks: "Japan Customs Do Not Load notice, administrative fines.",
    details: "Electronic advance manifest rule requiring vessel operators to file cargo details to Japan NACCS."
  },
  bmsb_cert: {
    title: "Seasonal BMSB Stink Bug Treatment Certificate",
    authority: "Approved Offshore Treatment Provider (Heat / Fumigation)",
    deadline: "Prior to vessel departure during seasonal window (Sept - May)",
    rejectionRisks: "Immediate refusal of vessel berth by DAFF Australia, container re-export order.",
    details: "Mandatory biosecurity treatment certificate for high-risk target goods shipped to Australia/NZ."
  },
  certificate_of_origin: {
    title: "Certificate of Origin (Preferential / Non-Preferential)",
    authority: "Chamber of Commerce / National Trade Ministry",
    deadline: "Submitted during import customs clearance",
    rejectionRisks: "Invalid origin criteria stamp, missing Chamber verification QR code.",
    details: "Official document certifying the manufacturing country of origin to qualify for concessionary tariffs under FTAs."
  },
  msds_dgd: {
    title: "Shipper's Declaration for Dangerous Goods (DGD) & SDS",
    authority: "Certified ICAO/IMDG Dangerous Goods Packer",
    deadline: "Submitted at time of booking & container stuffing",
    rejectionRisks: "Rejection by vessel master, emergency port detention, severe regulatory fines.",
    details: "Mandatory hazardous material safety dossier containing 16-section Safety Data Sheet (SDS) & IMDG UN classification."
  },
  phytosanitary_health: {
    title: "Phytosanitary / Quarantine & Health Certificate",
    authority: "National Plant Protection Organization (NPPO) / Food Safety Authority",
    deadline: "Issued prior to export shipment departure",
    rejectionRisks: "Immediate quarantine hold, container fumigation order, cargo destruction.",
    details: "Official plant/food health certification confirming cargo is free from regulated pests and fits human consumption."
  }
};

let currentDocChecklistState = [];
let currentActiveFilter = 'all';

function generateDocChecklist() {
  const origin = document.getElementById('doc-origin-country').value;
  const dest = document.getElementById('doc-dest-country').value;
  const mode = document.getElementById('doc-transport-mode').value;
  const cargo = document.getElementById('doc-cargo-type').value;
  const resultDiv = document.getElementById('doc-checklist-result');

  const originInfo = countryNames[origin] || { name: origin, flag: "🌐" };
  const destInfo = countryNames[dest] || { name: dest, flag: "🌐" };

  // Detect Trade Agreement Corridors
  let activeFTA = null;
  const corridorKey = `${origin}-${dest}`;
  if ((origin === 'LK' && dest === 'IN') || (origin === 'IN' && dest === 'LK')) {
    activeFTA = { name: "SAFTA / ISFTA Preferential Tariff Corridor", code: "ISFTA / SAFTA Form I", desc: "0-5% Concessionary Duty rates applicable." };
  } else if ((origin === 'DE' && dest === 'NL') || (origin === 'NL' && dest === 'DE')) {
    activeFTA = { name: "EU Single Market & Customs Union", code: "Free Movement", desc: "No customs duties or tariffs required." };
  } else if ((origin === 'DE' && dest === 'GB') || (origin === 'GB' && dest === 'DE')) {
    activeFTA = { name: "UK-EU Trade and Cooperation Agreement (TCA)", code: "EUR.1 / Statement on Origin", desc: "Zero tariff access with origin compliance." };
  } else if (['CN', 'VN', 'SG', 'JP', 'AU'].includes(origin) && ['CN', 'VN', 'SG', 'JP', 'AU'].includes(dest)) {
    activeFTA = { name: "RCEP Trade Corridor", code: "Form RCEP", desc: "Regional Comprehensive Economic Partnership tariff concessions." };
  }

  // Build Comprehensive Document Array
  currentDocChecklistState = [
    { key: "commercial_invoice", name: "Commercial Invoice", category: "title", priority: "MANDATORY CUSTOMS", badgeClass: "badge-customs", checked: false },
    { key: "packing_list", name: "Detailed Packing List", category: "title", priority: "CARRIER TITLE", badgeClass: "badge-title", checked: false }
  ];

  // Transport Mode Document
  if (mode === 'ocean') {
    currentDocChecklistState.push({ key: "bill_of_lading", name: "Ocean Bill of Lading (B/L) / Sea Waybill", category: "title", priority: "TITLE OF GOODS", badgeClass: "badge-title", checked: false });
  } else {
    currentDocChecklistState.push({ key: "air_waybill", name: "Air Waybill (AWB)", category: "title", priority: "CARRIER TITLE", badgeClass: "badge-title", checked: false });
  }

  // 24H Pre-Loading Security Filings & Country Mandates
  if (dest === 'US' && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "isf_10_2", name: "US Customs ISF 10+2 (Importer Security Filing)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }
  if ((dest === 'DE' || dest === 'NL') && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "ics2_ens", name: "EU ICS2 Entry Summary Declaration (ENS)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }
  if (dest === 'CN' && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "ccam_filing", name: "China Customs Advance Manifest (CCAM)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }
  if (dest === 'JP' && mode === 'ocean') {
    currentDocChecklistState.unshift({ key: "sea_ams_jp", name: "Japan Sea AMS (Advance Manifest)", category: "24h", priority: "CRITICAL 24H PRE-LOAD", badgeClass: "badge-24h", checked: false });
  }

  // Destination Customs Declarations
  if (origin === 'LK') {
    currentDocChecklistState.push({ key: "cusdec_sl", name: "Sri Lanka CUSDEC Export Declaration", category: "customs", priority: "ORIGIN CUSTOMS", badgeClass: "badge-customs", checked: false });
  }
  if (dest === 'IN') {
    currentDocChecklistState.push({ key: "icegate_be", name: "India ICEGATE Bill of Entry & CAROTAR Form", category: "customs", priority: "DESTINATION CUSTOMS", badgeClass: "badge-customs", checked: false });
  }
  if (dest === 'GB') {
    currentDocChecklistState.push({ key: "cds_uk", name: "UK Customs Declaration Service (CDS) Entry", category: "customs", priority: "DESTINATION CUSTOMS", badgeClass: "badge-customs", checked: false });
  }
  if (dest === 'AE') {
    currentDocChecklistState.push({ key: "mirsal_uae", name: "Dubai Customs Mirsal II Declaration", category: "customs", priority: "DESTINATION CUSTOMS", badgeClass: "badge-customs", checked: false });
  }

  // Seasonal & Biosecurity
  if (dest === 'AU') {
    currentDocChecklistState.push({ key: "bmsb_cert", name: "Australia Seasonal BMSB Stink Bug Treatment Cert", category: "safety", priority: "BIOSECURITY MANDATE", badgeClass: "badge-safety", checked: false });
  }

  // Trade Agreement Certificate of Origin
  if (activeFTA) {
    currentDocChecklistState.push({ key: "certificate_of_origin", name: `Certificate of Origin (${activeFTA.code})`, category: "customs", priority: "PREFERENTIAL TARIFF", badgeClass: "badge-customs", checked: false });
  } else {
    currentDocChecklistState.push({ key: "certificate_of_origin", name: "Standard Chamber Certificate of Origin", category: "customs", priority: "CUSTOMS REQUIREMENT", badgeClass: "badge-customs", checked: false });
  }

  // Cargo Category Special Requirements
  if (cargo === 'dangerous') {
    currentDocChecklistState.push({ key: "msds_dgd", name: "IMO/ICAO Dangerous Goods Declaration & SDS", category: "safety", priority: "HAZARDOUS MANDATE", badgeClass: "badge-safety", checked: false });
  } else if (cargo === 'food') {
    currentDocChecklistState.push({ key: "phytosanitary_health", name: "Phytosanitary & Food Safety Health Certificate", category: "safety", priority: "QUARANTINE MANDATE", badgeClass: "badge-safety", checked: false });
  }

  renderDocChecklistUI(originInfo, destInfo, activeFTA);
}

function renderDocChecklistUI(originInfo, destInfo, activeFTA) {
  const resultDiv = document.getElementById('doc-checklist-result');
  const totalCount = currentDocChecklistState.length;
  const completedCount = currentDocChecklistState.filter(d => d.checked).length;
  const pct = Math.round((completedCount / totalCount) * 100) || 0;

  let html = `
    <!-- Corridor Route Banner -->
    <div class="doc-route-banner">
      <div class="doc-route-flags">
        <span>${originInfo.flag} ${originInfo.name}</span>
        <span class="doc-route-arrow">➔</span>
        <span>${destInfo.flag} ${destInfo.name}</span>
      </div>
      ${activeFTA ? `<span class="doc-trade-agreement">📜 ${activeFTA.name}</span>` : `<span class="doc-trade-agreement" style="border-color:#94A3B8; color:#94A3B8;">🌐 Standard MFN Corridor</span>`}
    </div>

    <!-- Live Completion Progress Tracker Bar -->
    <div class="doc-progress-wrapper">
      <div class="doc-progress-text">
        <span>Dossier Completion Progress</span>
        <span id="doc-pct-text">${completedCount} of ${totalCount} Required Documents (${pct}%)</span>
      </div>
      <div class="doc-progress-bg">
        <div class="doc-progress-fill" id="doc-progress-fill" style="width: ${pct}%;"></div>
      </div>
    </div>

    <!-- Filter Pills -->
    <div class="doc-filter-pills">
      <button class="doc-pill ${currentActiveFilter === 'all' ? 'active' : ''}" onclick="filterDocCategory('all')">All Documents (${totalCount})</button>
      <button class="doc-pill ${currentActiveFilter === '24h' ? 'active' : ''}" onclick="filterDocCategory('24h')">🚨 24h Pre-Loading Filings</button>
      <button class="doc-pill ${currentActiveFilter === 'title' ? 'active' : ''}" onclick="filterDocCategory('title')">📄 Transport Titles</button>
      <button class="doc-pill ${currentActiveFilter === 'customs' ? 'active' : ''}" onclick="filterDocCategory('customs')">⚖️ Customs & Origin</button>
      <button class="doc-pill ${currentActiveFilter === 'safety' ? 'active' : ''}" onclick="filterDocCategory('safety')">🛡️ Safety & Inspection</button>
    </div>

    <!-- Document List Items -->
    <div id="doc-items-list">
  `;

  currentDocChecklistState.forEach((doc, idx) => {
    if (currentActiveFilter !== 'all' && doc.category !== currentActiveFilter) return;

    const info = docKnowledgeBase[doc.key] || { details: "Standard required shipment document.", authority: "Authority", deadline: "Pre-departure" };

    html += `
      <div class="doc-item-card ${doc.checked ? 'completed' : ''}" id="doc-card-${idx}">
        <input type="checkbox" class="doc-checkbox" ${doc.checked ? 'checked' : ''} onchange="toggleDocCheckbox(${idx})">
        <div style="flex:1;">
          <span class="doc-priority-badge ${doc.badgeClass}">${doc.priority}</span>
          <strong style="display:block; font-size:1.05rem; color:var(--primary-navy); margin-bottom:4px;">${doc.name}</strong>
          <p style="font-size:0.88rem; color:#64748B; margin-bottom:8px;">${info.details}</p>
          <div style="display:flex; gap:20px; font-size:0.8rem; color:#475569;">
            <span>🏛️ <strong>Authority:</strong> ${info.authority}</span>
            <span>⏱️ <strong>Deadline:</strong> ${info.deadline}</span>
          </div>
          <button class="doc-detail-btn" onclick="openDocDetailModal('${doc.key}')">🔍 View Full Document Guide & Rejection Risks</button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  resultDiv.innerHTML = html;
}

function toggleDocCheckbox(index) {
  if (currentDocChecklistState[index]) {
    currentDocChecklistState[index].checked = !currentDocChecklistState[index].checked;
    
    // Update card styling live
    const card = document.getElementById(`doc-card-${index}`);
    if (card) {
      if (currentDocChecklistState[index].checked) {
        card.classList.add('completed');
      } else {
        card.classList.remove('completed');
      }
    }

    // Update progress bar
    const totalCount = currentDocChecklistState.length;
    const completedCount = currentDocChecklistState.filter(d => d.checked).length;
    const pct = Math.round((completedCount / totalCount) * 100) || 0;

    const pctText = document.getElementById('doc-pct-text');
    const fillBar = document.getElementById('doc-progress-fill');

    if (pctText) pctText.innerText = `${completedCount} of ${totalCount} Required Documents (${pct}%)`;
    if (fillBar) fillBar.style.width = `${pct}%`;
  }
}

function filterDocCategory(category) {
  currentActiveFilter = category;
  const origin = document.getElementById('doc-origin-country').value;
  const dest = document.getElementById('doc-dest-country').value;
  const originInfo = countryNames[origin] || { name: origin, flag: "🌐" };
  const destInfo = countryNames[dest] || { name: dest, flag: "🌐" };
  
  renderDocChecklistUI(originInfo, destInfo, null);
}

function openDocDetailModal(docKey) {
  const doc = docKnowledgeBase[docKey];
  if (!doc) return;

  // Remove existing modal if any
  closeDocDetailModal();

  const modalHtml = `
    <div class="doc-modal-overlay" id="doc-modal-overlay" onclick="closeDocDetailModal()">
      <div class="doc-modal-container" onclick="event.stopPropagation()">
        <div class="doc-modal-header">
          <h4 style="font-size:1.1rem; font-weight:700;">📄 ${doc.title}</h4>
          <button style="background:none; border:none; color:#FFF; font-size:1.5rem; cursor:pointer;" onclick="closeDocDetailModal()">✕</button>
        </div>
        <div class="doc-modal-body">
          <div class="doc-modal-section">
            <h5>🏛️ Issuing / Regulatory Authority</h5>
            <p>${doc.authority}</p>
          </div>
          <div class="doc-modal-section">
            <h5>⏱️ Strict Cut-Off &amp; Filing Deadline</h5>
            <p style="color:#DC2626; font-weight:700;">${doc.deadline}</p>
          </div>
          <div class="doc-modal-section">
            <h5>⚠️ Common Customs Rejection &amp; Fine Risks</h5>
            <p style="background:#FEE2E2; padding:12px; border-radius:8px; border-left:4px solid #DC2626; color:#991B1B;">${doc.rejectionRisks}</p>
          </div>
          <div class="doc-modal-section">
            <h5>📋 Operational Instructions &amp; Purpose</h5>
            <p>${doc.details}</p>
          </div>
          <button class="btn btn-primary" style="width:100%; padding:12px; margin-top:15px;" onclick="closeDocDetailModal()">Close Guide</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeDocDetailModal() {
  const modal = document.getElementById('doc-modal-overlay');
  if (modal) modal.remove();
}

function printDocChecklist() {
  window.print();
}

// Tool 6: Dangerous Goods (DG) Class Identifier
const dgDictionary = {
  // Class 1
  fireworks: { un: "UN0336", cls: "Class 1.4G", label: "💥", desc: "Fireworks, non-mass explosion hazard.", restrict: "Strictly regulated. Often forbidden on passenger aircraft." },
  flares: { un: "UN0092", cls: "Class 1.3G", label: "💥", desc: "Flares, surface. Pyrotechnic signalling devices.", restrict: "Forbidden on passenger aircraft. CAO restricted." },
  ammunition: { un: "UN0012", cls: "Class 1.4S", label: "💥", desc: "Cartridges for weapons, inert projectile.", restrict: "May be permitted in limited quantities with airline approval." },
  // Class 2
  aerosols: { un: "UN1950", cls: "Class 2.1", label: "🔥💨", desc: "Aerosols, flammable (e.g. spray paint, hairspray).", restrict: "Limited quantity exceptions may apply, but strictly regulated in bulk." },
  oxygen: { un: "UN1072", cls: "Class 2.2 / 5.1", label: "💨", desc: "Oxygen, compressed. Non-flammable gas but strongly oxidising.", restrict: "Requires rigid outer packaging for air transport." },
  nitrogen: { un: "UN1066", cls: "Class 2.2", label: "💨", desc: "Nitrogen, compressed. Asphyxiant gas.", restrict: "Ventilation required if leaked." },
  lpg: { un: "UN1075", cls: "Class 2.1", label: "🔥💨", desc: "Petroleum gases, liquefied.", restrict: "Forbidden on passenger aircraft. Strict volume limits on CAO." },
  // Class 3
  paint: { un: "UN1263", cls: "Class 3", label: "🔥", desc: "Paint or paint related material (flammable liquids).", restrict: "Allowed on Passenger (PAX) and CAO, subject to volume limits per inner packaging." },
  perfume: { un: "UN1266", cls: "Class 3", label: "🔥", desc: "Perfumery products with flammable solvents.", restrict: "Consumer commodity exceptions may apply if quantities are very small." },
  gasoline: { un: "UN1203", cls: "Class 3", label: "🔥", desc: "Motor spirit or gasoline.", restrict: "Highly restricted. Very low volume limits." },
  alcohol: { un: "UN1170", cls: "Class 3", label: "🔥", desc: "Ethanol (Ethyl alcohol) or ethanol solution.", restrict: "Regulated based on alcohol concentration percentage." },
  // Class 4
  matches: { un: "UN1331", cls: "Class 4.1", label: "🔥", desc: "Matches, 'strike anywhere'.", restrict: "Forbidden on all aircraft. Must travel by ocean/road." },
  sodium: { un: "UN1428", cls: "Class 4.3", label: "🔥💧", desc: "Sodium. Dangerous when wet; emits flammable gases on contact with water.", restrict: "Must be kept hermetically sealed." },
  camphor: { un: "UN2717", cls: "Class 4.1", label: "🔥", desc: "Camphor, synthetic. Flammable solid.", restrict: "Regulated, keep away from heat sources." },
  // Class 5
  hydrogen_peroxide: { un: "UN2014", cls: "Class 5.1 / 8", label: "🔥🧪", desc: "Hydrogen peroxide, aqueous solution. Oxidizing and corrosive.", restrict: "Strictly regulated. Vented packaging may be required." },
  ammonium_nitrate: { un: "UN1942", cls: "Class 5.1", label: "🔥", desc: "Ammonium nitrate. Oxidizing substance.", restrict: "Highly regulated due to mass explosion potential if contaminated." },
  // Class 6
  pesticides: { un: "UN2588", cls: "Class 6.1", label: "☠️", desc: "Pesticide, solid, toxic, n.o.s.", restrict: "Must not be loaded next to food or feedstuffs." },
  cyanide: { un: "UN1588", cls: "Class 6.1", label: "☠️", desc: "Cyanides, inorganic, solid, n.o.s.", restrict: "Highly toxic. Strict packaging requirements." },
  infectious_human: { un: "UN2814", cls: "Class 6.2", label: "☣️", desc: "Infectious substance, affecting humans (e.g. virus cultures).", restrict: "Strict triple-packaging required (P620). Very specialized handling." },
  clinical_waste: { un: "UN3291", cls: "Class 6.2", label: "☣️", desc: "Clinical waste, unspecified, n.o.s.", restrict: "Requires rigid, leak-proof, puncture-resistant packaging." },
  // Class 7
  radioactive_excepted: { un: "UN2910", cls: "Class 7", label: "☢️", desc: "Radioactive material, excepted package.", restrict: "Permitted subject to strict dose limits and declaration." },
  uranium: { un: "UN2979", cls: "Class 7", label: "☢️", desc: "Uranium metal.", restrict: "Highly regulated. Requires special permits and shielding." },
  // Class 8
  sulfuric_acid: { un: "UN2796", cls: "Class 8", label: "🧪", desc: "Sulphuric acid with not more than 51% acid.", restrict: "Corrosive to tissue and metals. Must be in resistant packaging." },
  batteries_wet: { un: "UN2794", cls: "Class 8", label: "🧪⚡", desc: "Batteries, wet, filled with acid.", restrict: "Must be packed upright, protected against short circuits." },
  bleach: { un: "UN1791", cls: "Class 8", label: "🧪", desc: "Hypochlorite solutions (Bleach).", restrict: "Corrosive. Keep away from acids to prevent toxic gas release." },
  // Class 9
  lithium_ion: { un: "UN3480", cls: "Class 9", label: "🔋", desc: "Lithium ion batteries (including lithium ion polymer batteries). High risk of thermal runaway.", restrict: "Cargo Aircraft Only (CAO) heavily restricted. Max 30% state of charge." },
  lithium_metal: { un: "UN3090", cls: "Class 9", label: "🔋", desc: "Lithium metal batteries (non-rechargeable).", restrict: "Strictly forbidden on passenger aircraft." },
  dry_ice: { un: "UN1845", cls: "Class 9", label: "💨", desc: "Carbon dioxide, solid. Sublimes into gas, displacing oxygen.", restrict: "Requires adequate ventilation. Pilot in command must be notified." },
  magnetized: { un: "UN2807", cls: "Class 9", label: "🧲", desc: "Magnetized material.", restrict: "Can interfere with aircraft compasses. Regulated if field strength is high." },
  vehicles: { un: "UN3166", cls: "Class 9", label: "🚗", desc: "Vehicle, flammable gas/liquid powered.", restrict: "Fuel tanks must be drained to 1/4 full or less." }
};

function updateDGIdentifier() {
  const classVal = document.getElementById('dg-class-select').value;
  if (!classVal) return;

  const container = document.getElementById('dg-result-container');
  container.style.display = 'block';
  
  let html = `<h4 style="color: var(--primary-navy); margin-bottom: 25px; font-size: 1.2rem;">Common items in Class ${classVal}</h4>`;
  html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">`;
  
  // Find all items matching the selected class (e.g., "Class 1", "Class 2.1")
  let hasItems = false;
  for (const key in dgDictionary) {
    const data = dgDictionary[key];
    // Check if the class string starts with "Class X"
    if (data.cls.startsWith(`Class ${classVal}`)) {
      hasItems = true;
      html += `
        <div style="background: var(--bg-gray); border-radius: 10px; padding: 20px; text-align: center; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 3.5rem; margin-bottom: 15px;">${data.label}</div>
            <h5 style="color: var(--primary-navy); font-size: 1.3rem; margin-bottom: 5px;">${data.un}</h5>
            <div style="font-weight: 700; color: var(--accent-orange); margin-bottom: 15px;">${data.cls}</div>
            <p style="color: var(--text-color); font-size: 0.95rem; margin-bottom: 15px; line-height: 1.5;">${data.desc}</p>
          </div>
          <div style="background: rgba(255,255,255,0.8); padding: 10px; border-radius: 6px; border-left: 3px solid var(--primary-navy); font-size: 0.85rem; text-align: left;">
            <strong>Restrictions:</strong> ${data.restrict}
          </div>
        </div>
      `;
    }
  }
  
  if (!hasItems) {
    html += `<p style="grid-column: 1 / -1; color: var(--text-muted);">No common examples listed for this class.</p>`;
  }
  
  html += `</div>`;
  container.innerHTML = html;
}

// Tool 7: Temperature / Reefer Cargo Simulator
function updateReeferSimulator(type) {
  const container = document.getElementById('reefer-result-container');
  const temp = document.getElementById('reefer-temp-display');
  const name = document.getElementById('reefer-cargo-name');
  const vent = document.getElementById('reefer-ventilation');
  const hum = document.getElementById('reefer-humidity');
  
  container.style.display = 'block';
  
  if (type === 'frozen') {
    temp.textContent = "-20°C";
    name.textContent = "Deep Frozen: Ice Cream, Frozen Seafood, Meat";
    vent.textContent = "Closed";
    hum.textContent = "Off";
  } else if (type === 'chilled') {
    temp.textContent = "+2°C to +8°C";
    name.textContent = "Chilled: Fresh Fruits, Vegetables, Dairy";
    vent.textContent = "Open (15-25 CBM/hr)";
    hum.textContent = "On (85%-95%)";
  } else if (type === 'ambient') {
    temp.textContent = "+15°C to +25°C";
    name.textContent = "Controlled Ambient: Chocolate, Pharmaceuticals, Wine";
    vent.textContent = "Closed";
    hum.textContent = "Dehumidification On";
  }
}

// Tool 8: HS Code & Duty Structure Explainer
const hsDictionary = {
  beef: { ch: "02", hd: "01", sub: "20", nat: "00", descCh: "Meat and edible meat offal", descHd: "Meat of bovine animals, fresh or chilled", descSub: "Other cuts with bone in", duty: "25%", vat: "18%", other: "PAL Applicable" },
  fish: { ch: "03", hd: "02", sub: "11", nat: "00", descCh: "Fish and crustaceans, molluscs and other aquatic invertebrates", descHd: "Fish, fresh or chilled", descSub: "Trout", duty: "15%", vat: "18%", other: "Exempt from CESS" },
  milk: { ch: "04", hd: "01", sub: "20", nat: "00", descCh: "Dairy produce; birds' eggs; natural honey", descHd: "Milk and cream, not concentrated nor containing added sugar", descSub: "Fat content exceeding 1% but not exceeding 6%", duty: "20%", vat: "18%", other: "Special Commodity Levy" },
  potatoes: { ch: "07", hd: "01", sub: "90", nat: "00", descCh: "Edible vegetables and certain roots and tubers", descHd: "Potatoes, fresh or chilled", descSub: "Other (non-seed)", duty: "15%", vat: "18%", other: "Applicable" },
  coffee: { ch: "09", hd: "01", sub: "11", nat: "00", descCh: "Coffee, tea, maté and spices", descHd: "Coffee, whether or not roasted or decaffeinated", descSub: "Not roasted, Not decaffeinated", duty: "30%", vat: "18%", other: "High CESS" },
  tea: { ch: "09", hd: "02", sub: "10", nat: "00", descCh: "Coffee, tea, maté and spices", descHd: "Tea, whether or not flavoured", descSub: "Green tea (not fermented)", duty: "20%", vat: "18%", other: "Applicable" },
  wheat: { ch: "10", hd: "01", sub: "19", nat: "00", descCh: "Cereals", descHd: "Wheat and meslin", descSub: "Durum wheat, Other", duty: "10%", vat: "18%", other: "Applicable" },
  sugar: { ch: "17", hd: "01", sub: "14", nat: "00", descCh: "Sugars and sugar confectionery", descHd: "Cane or beet sugar and chemically pure sucrose", descSub: "Other cane sugar", duty: "30%", vat: "18%", other: "Special Commodity Levy" },
  chocolate: { ch: "18", hd: "06", sub: "32", nat: "00", descCh: "Cocoa and cocoa preparations", descHd: "Chocolate and other food preparations containing cocoa", descSub: "Not in blocks, Not filled", duty: "30%", vat: "18%", other: "High CESS" },
  wine: { ch: "22", hd: "04", sub: "21", nat: "00", descCh: "Beverages, spirits and vinegar", descHd: "Wine of fresh grapes", descSub: "In containers holding 2 l or less", duty: "High Excise", vat: "18%", other: "PAL Applicable" },
  petroleum: { ch: "27", hd: "09", sub: "00", nat: "00", descCh: "Mineral fuels, mineral oils and products of their distillation", descHd: "Petroleum oils and oils obtained from bituminous minerals, crude", descSub: "-", duty: "5%", vat: "18%", other: "PAL Applicable" },
  medicaments: { ch: "30", hd: "04", sub: "90", nat: "00", descCh: "Pharmaceutical products", descHd: "Medicaments for therapeutic or prophylactic uses", descSub: "Other", duty: "0%", vat: "Exempt", other: "NMRA Approval Required" },
  fertilizers: { ch: "31", hd: "02", sub: "10", nat: "00", descCh: "Fertilisers", descHd: "Mineral or chemical fertilisers, nitrogenous", descSub: "Urea, whether or not in aqueous solution", duty: "0%", vat: "18%", other: "License Required" },
  perfumes: { ch: "33", hd: "03", sub: "00", nat: "00", descCh: "Essential oils and resinoids; perfumery, cosmetic or toilet preparations", descHd: "Perfumes and toilet waters", descSub: "-", duty: "30%", vat: "18%", other: "High CESS" },
  plastic_bags: { ch: "39", hd: "23", sub: "21", nat: "00", descCh: "Plastics and articles thereof", descHd: "Articles for the conveyance or packing of goods, of plastics", descSub: "Sacks and bags of polymers of ethylene", duty: "20%", vat: "18%", other: "Environmental Levy" },
  tires: { ch: "40", hd: "11", sub: "10", nat: "00", descCh: "Rubber and articles thereof", descHd: "New pneumatic tyres, of rubber", descSub: "Of a kind used on motor cars", duty: "30%", vat: "18%", other: "High CESS" },
  handbags: { ch: "42", hd: "02", sub: "21", nat: "00", descCh: "Articles of leather; saddlery and harness; travel goods", descHd: "Trunks, suit-cases, vanity-cases, executive-cases", descSub: "With outer surface of leather or of composition leather", duty: "20%", vat: "18%", other: "Applicable" },
  paper: { ch: "48", hd: "02", sub: "56", nat: "00", descCh: "Paper and paperboard; articles of paper pulp", descHd: "Uncoated paper and paperboard", descSub: "Weighing 40 g/m2 or more but not more than 150 g/m2", duty: "10%", vat: "18%", other: "Applicable" },
  cotton_yarn: { ch: "52", hd: "05", sub: "11", nat: "00", descCh: "Cotton", descHd: "Cotton yarn (other than sewing thread)", descSub: "Measuring 714.29 decitex or more", duty: "5%", vat: "18%", other: "Applicable" },
  tshirts: { ch: "61", hd: "09", sub: "10", nat: "00", descCh: "Apparel and clothing accessories, knitted or crocheted", descHd: "T-shirts, singlets and other vests, knitted or crocheted", descSub: "Of cotton", duty: "15%", vat: "18%", other: "Applicable (CESS)" },
  footwear: { ch: "64", hd: "03", sub: "99", nat: "00", descCh: "Footwear, gaiters and the like; parts of such articles", descHd: "Footwear with outer soles of rubber, plastics, leather", descSub: "Other footwear", duty: "20%", vat: "18%", other: "Applicable" },
  steel: { ch: "72", hd: "08", sub: "10", nat: "00", descCh: "Iron and steel", descHd: "Flat-rolled products of iron or non-alloy steel", descSub: "In coils, not further worked than hot-rolled", duty: "10%", vat: "18%", other: "Applicable" },
  aluminum: { ch: "76", hd: "01", sub: "10", nat: "00", descCh: "Aluminium and articles thereof", descHd: "Unwrought aluminium", descSub: "Aluminium, not alloyed", duty: "5%", vat: "18%", other: "Applicable" },
  tools: { ch: "82", hd: "05", sub: "59", nat: "00", descCh: "Tools, implements, cutlery, spoons and forks, of base metal", descHd: "Hand tools (including glaziers' diamonds)", descSub: "Other hand tools", duty: "10%", vat: "18%", other: "Applicable" },
  computers: { ch: "84", hd: "71", sub: "30", nat: "00", descCh: "Nuclear reactors, boilers, machinery and mechanical appliances", descHd: "Automatic data processing machines and units thereof", descSub: "Portable automatic data processing machines", duty: "0%", vat: "18%", other: "PAL Applicable" },
  smartphones: { ch: "85", hd: "17", sub: "12", nat: "00", descCh: "Electrical machinery and equipment and parts thereof", descHd: "Telephone sets, including smartphones", descSub: "Smartphones", duty: "0%", vat: "18%", other: "PAL Applicable" },
  batteries: { ch: "85", hd: "07", sub: "60", nat: "00", descCh: "Electrical machinery and equipment and parts thereof", descHd: "Electric accumulators", descSub: "Lithium-ion", duty: "15%", vat: "18%", other: "Applicable" },
  cars: { ch: "87", hd: "03", sub: "23", nat: "00", descCh: "Vehicles other than railway or tramway rolling-stock", descHd: "Motor cars and other motor vehicles principally designed for the transport of persons", descSub: "Of a cylinder capacity exceeding 1,500 cc but not exceeding 3,000 cc", duty: "Extremely High Duty/Excise", vat: "18%", other: "Luxury Tax Applicable" },
  bicycles: { ch: "87", hd: "12", sub: "00", nat: "00", descCh: "Vehicles other than railway or tramway rolling-stock", descHd: "Bicycles and other cycles (including delivery tricycles)", descSub: "Not motorized", duty: "10%", vat: "18%", other: "Applicable" },
  furniture: { ch: "94", hd: "03", sub: "60", nat: "00", descCh: "Furniture; bedding, mattresses, mattress supports, cushions", descHd: "Other furniture and parts thereof", descSub: "Other wooden furniture", duty: "20%", vat: "18%", other: "High CESS" },
  toys: { ch: "95", hd: "03", sub: "00", nat: "00", descCh: "Toys, games and sports requisites; parts and accessories thereof", descHd: "Tricycles, scooters, pedal cars and similar toys; dolls' carriages", descSub: "-", duty: "15%", vat: "18%", other: "Applicable" },
  pens: { ch: "96", hd: "08", sub: "10", nat: "00", descCh: "Miscellaneous manufactured articles", descHd: "Ball-point pens; felt tipped and other porous-tipped pens", descSub: "Ball-point pens", duty: "10%", vat: "18%", other: "Applicable" }
};

function updateHSCodeExplainer() {
  const select = document.getElementById('hs-item-select');
  const category = select.value;
  if (!category) return;

  const container = document.getElementById('hs-result-container');
  const chap = document.getElementById('hs-chapter');
  const head = document.getElementById('hs-heading');
  const sub = document.getElementById('hs-subheading');
  const nat = document.getElementById('hs-national');
  const descChap = document.getElementById('hs-desc-chapter');
  const descHead = document.getElementById('hs-desc-heading');
  const descSub = document.getElementById('hs-desc-subheading');
  const duty = document.getElementById('hs-duty');
  const vat = document.getElementById('hs-vat');
  const other = document.getElementById('hs-other');
  
  container.style.display = 'block';
  
  const data = hsDictionary[category];
  if (data) {
    chap.textContent = data.ch; 
    head.textContent = data.hd; 
    sub.textContent = data.sub; 
    nat.textContent = data.nat;
    descChap.textContent = data.descCh;
    descHead.textContent = data.descHd;
    descSub.textContent = data.descSub;
    duty.textContent = data.duty; 
    vat.textContent = data.vat; 
    other.textContent = data.other;
  }
}

function filterHSOptions() {
  const input = document.getElementById('hs-search-input').value.toLowerCase();
  const select = document.getElementById('hs-item-select');
  const optgroups = select.getElementsByTagName('optgroup');
  
  let hasMatches = false;

  for (let i = 0; i < optgroups.length; i++) {
    const options = optgroups[i].getElementsByTagName('option');
    let groupHasMatch = false;

    for (let j = 0; j < options.length; j++) {
      const text = options[j].text.toLowerCase();
      if (text.includes(input)) {
        options[j].style.display = '';
        groupHasMatch = true;
        hasMatches = true;
      } else {
        options[j].style.display = 'none';
      }
    }

    optgroups[i].style.display = groupHasMatch ? '' : 'none';
  }
  
  // If only one option is visible, auto-select it (excluding disabled)
  if (hasMatches && input.length > 2) {
    let visibleCount = 0;
    let lastVisible = null;
    
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].style.display !== 'none' && !select.options[i].disabled) {
        visibleCount++;
        lastVisible = select.options[i];
      }
    }
    
    if (visibleCount === 1) {
      select.value = lastVisible.value;
      updateHSCodeExplainer();
    }
  }
}

/* ==========================================
   10. GLOBAL INDUSTRY NEWS (RSS FEED)
   ========================================== */
let globalNewsCache = null;

function extractImageFromHTML(htmlContent) {
  if (!htmlContent) return null;
  const match = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function getArticlePublisherImage(article) {
  let imgUrl = article.thumbnail || article.enclosure?.link || article.enclosure?.url;
  if (!imgUrl || imgUrl.trim() === "") {
    imgUrl = extractImageFromHTML(article.content) || extractImageFromHTML(article.description);
  }
  
  if (imgUrl && typeof imgUrl === 'string') {
    imgUrl = imgUrl.trim();
    if (imgUrl.startsWith('http://')) {
      imgUrl = imgUrl.replace('http://', 'https://');
    }
    return imgUrl;
  }
  return null;
}

async function fetchLogisticsNews() {
  if (globalNewsCache) {
    renderNews(globalNewsCache);
    return;
  }
  
  // Dedicated feeds strictly covering Global Supply Chain, Maritime, Ports, Freight & Cargo Logistics
  const feeds = [
    'https://www.supplychaindive.com/feeds/news/',             // Logistics & Supply Chain
    'https://www.seatrade-maritime.com/rss.xml',                // Maritime & Ocean Shipping
    'https://www.porttechnology.org/feed/',                    // Ports & Container Terminals
    'https://www.freightwaves.com/feed',                       // Freight, Trucking & Ground Transport
    'https://simpleflying.com/feed/'                            // Air Aviation & Air Freight
  ];

  const LOGISTICS_KEYWORDS = [
    'logistics', 'supply chain', 'shipping', 'port', 'freight', 'maritime',
    'cargo', 'vessel', 'container', 'transport', 'trucking', 'aviation',
    'airline', 'fleet', 'rail', 'trade', 'tariff', 'export', 'import',
    'warehouse', 'customs', 'houthi', 'red sea', 'panama', 'suez',
    'carrier', 'ocean', 'bunker', 'tanker', 'chokepoint', 'tonnage', 'teu',
    'dockworker', 'terminal', 'boeing', 'airbus', 'shipment', 'freighter'
  ];
  
  const homeLoading = document.getElementById('news-loading-state');
  const fullLoading = document.getElementById('full-news-loading-state');
  
  try {
    const fetchPromises = feeds.map(feedUrl => {
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
      return fetch(apiUrl)
        .then(res => res.ok ? res.json() : null)
        .catch(() => null);
    });

    const results = await Promise.all(fetchPromises);
    
    // Group valid articles by feed source to guarantee balanced representation
    const feedBuckets = [];
    const seenTitles = new Set();

    results.forEach(data => {
      if (data && data.status === 'ok' && Array.isArray(data.items)) {
        const validFeedItems = [];
        data.items.forEach(article => {
          if (!article || !article.title) return;
          const normTitle = article.title.trim().toLowerCase();
          if (seenTitles.has(normTitle)) return;

          const contentText = (article.title + " " + (article.description || "")).toLowerCase();
          const isRelevant = LOGISTICS_KEYWORDS.some(kw => contentText.includes(kw));
          if (!isRelevant) return;

          const pubImg = getArticlePublisherImage(article);
          if (!pubImg || pubImg.trim() === "") return;

          seenTitles.add(normTitle);
          validFeedItems.push({ ...article, publisherImage: pubImg });
        });

        // Sort feed items descending by date
        validFeedItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        if (validFeedItems.length > 0) {
          feedBuckets.push(validFeedItems);
        }
      }
    });

    // Interleave articles round-robin from each feed bucket
    const interleavedArticles = [];
    let maxBucketLen = 0;
    feedBuckets.forEach(b => { if (b.length > maxBucketLen) maxBucketLen = b.length; });

    for (let i = 0; i < maxBucketLen; i++) {
      feedBuckets.forEach(bucket => {
        if (i < bucket.length) {
          interleavedArticles.push(bucket[i]);
        }
      });
    }

    if (interleavedArticles.length > 0) {
      globalNewsCache = interleavedArticles;
      renderNews(interleavedArticles);
    } else {
      throw new Error("No valid logistics articles with publisher images found.");
    }
  } catch (error) {
    console.error("Failed to fetch news:", error);
    if (homeLoading) homeLoading.innerHTML = `<p style="color: #ef4444;">Unable to load the latest news at this time.</p>`;
    if (fullLoading) fullLoading.innerHTML = `<p style="color: #ef4444;">Unable to load the news archive at this time.</p>`;
  }
}

function renderNews(allArticles) {
  const homeContainer = document.getElementById('news-feed-container');
  const fullContainer = document.getElementById('full-news-feed-container');
  const homeLoading = document.getElementById('news-loading-state');
  const fullLoading = document.getElementById('full-news-loading-state');
  
  // Render Homepage (Top 6 authentic news stories with publisher images)
  if (homeContainer) {
    const articles = allArticles.slice(0, 6);
    homeContainer.innerHTML = generateNewsHTML(articles);
    if (homeLoading) homeLoading.style.display = 'none';
    homeContainer.style.display = 'grid';
  }
  
  // Render Full Page (Top 30 authentic news stories with publisher images)
  if (fullContainer) {
    const articles = allArticles.slice(0, 30);
    fullContainer.innerHTML = generateNewsHTML(articles);
    if (fullLoading) fullLoading.style.display = 'none';
    fullContainer.style.display = 'grid';
  }
}

function generateNewsHTML(articles) {
  let html = '';
  articles.forEach((article) => {
    const imgUrl = article.publisherImage || getArticlePublisherImage(article);
    const pubDate = new Date(article.pubDate);
    const dateString = isNaN(pubDate.getTime()) ? '' : pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const rawDesc = article.description || '';
    const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, "");

    const safeTitle = escapeHTML(article.title || '');
    const safeDesc = escapeHTML(cleanDesc);

    html += `
      <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="news-card">
        <div class="news-card-image">
          <img src="${imgUrl}" alt="${safeTitle}" onerror="this.parentElement.parentElement.style.display='none';" style="width: 100%; height: 100%; object-fit: cover; display: block;">
        </div>
        <div class="news-card-content">
          <span class="news-date">${dateString}</span>
          <h3 class="news-title">${safeTitle}</h3>
          <div class="news-desc">${safeDesc}</div>
          <div class="news-read-more">Read Full Article &rarr;</div>
        </div>
      </a>
    `;
  });
  return html;
}


