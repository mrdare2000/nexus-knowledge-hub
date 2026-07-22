// Nexus Knowledge Hub - Core Application Script
// Implements futuristic glassmorphic transitions, stateful multi-turn AI,
// and adaptive custom modal styling structures.

document.addEventListener("DOMContentLoaded", () => {
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
});

window.addEventListener("load", () => {
  renderLearningHub();
  initNexusAIChat();
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
   2. SPA ROUTING & DYNAMIC SEO TITLES
   ========================================== */
const PAGE_SEO_TITLES = {
  home: "Nexus Knowledge Hub | Nexys Cargo (Pvt) Ltd",
  learning: "Freight Forwarding Operations Library | Nexus Knowledge Hub",
  tools: "Interactive Infographics & Calculators | Nexus Knowledge Hub",
  ai: "Nexus AI Chat Assistant - Global Logistics Intelligence",
  contact: "Get in Touch & Booking Inquiries | Nexys Cargo (Pvt) Ltd"
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
  // Update browser window SEO title
  if (PAGE_SEO_TITLES[pageId]) {
    document.title = PAGE_SEO_TITLES[pageId];
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
}

// Global visual panel switch helper
window.toggleToolPanel = function(panelId) {
  const tabBtns = document.querySelectorAll(".tool-tab-btn");
  const panels = document.querySelectorAll(".tool-panel");
  
  tabBtns.forEach(btn => {
    if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(panelId)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  panels.forEach(panel => {
    if (panel.id === `${panelId}-panel`) {
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
  if (subtopic.image) {
      bodyHTML += `
      <div class="modal-feature-image-wrapper" style="width: 100%; margin-bottom: 25px;">
        <img src="${subtopic.image}" alt="${subtopic.title}" style="width: 100%; height: auto; display: block; border-radius: 12px; box-shadow: var(--shadow-sm); cursor: pointer;" onclick="openImageModal('${subtopic.image}', '${subtopic.title}')">
      </div>
      `;
  }
  
  // Custom headers based on subtopic styling tags
  if (subtopic.layoutType === "infographic") {
    bodyHTML += `<div style="background: linear-gradient(135deg, rgba(255, 90, 31, 0.05) 0%, rgba(10, 37, 64, 0.05) 100%); padding: 15px; border-radius: 12px; margin-bottom: 25px; border: 1px solid rgba(255,90,31,0.15);">
      <span style="font-weight: 700; color: var(--accent-orange);">📊 Interactive Visual Insight:</span> Details, schematics, and metrics are compiled below.
    </div>`;
  }
  
  // Show specialized launcher if connected to an interactive tool
  if (subtopic.linkToWidget) {
    let widgetName = "Interactive Simulator";
    if (subtopic.linkToWidget === "incoterms") widgetName = "Interactive Incoterms Matrix";
    if (subtopic.linkToWidget === "containers") widgetName = "Container Volumetric Calculator";
    if (subtopic.linkToWidget === "aircraft") widgetName = "Freighter Hotspots Inspector";
    if (subtopic.linkToWidget === "logistics") widgetName = "Logistics Models Guide";
    
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
        <a href="${watchUrl}" target="_blank" class="btn btn-secondary reveal-video-btn" style="text-decoration: none; font-size: 0.88rem; padding: 12px 22px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1.5px solid var(--border-color); color: var(--primary-navy); background: var(--bg-white); font-weight: 700; border-radius: 50px; cursor: pointer; transition: var(--transition-smooth);">
          📺 Watch Video Guide on YouTube &rarr;
        </a>
      </div>
    `;
  }
  
  modalBody.innerHTML = bodyHTML;
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
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalTag = document.getElementById("modal-category-tag");
  const modalBody = document.getElementById("modal-body");
  
  modalTitle.textContent = imageTitle;
  modalTag.textContent = "Featured Infographic";
  
  let bodyHTML = `
    <div style="text-align: center; margin-bottom: 25px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
      <a href="${imageSrc}" download="${imageTitle.replace(/\s+/g, '_')}.jpg" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.92rem; padding: 12px 30px; text-decoration: none; box-shadow: var(--shadow-orange-glow); border-radius: 50px; font-family: var(--font-title); font-weight: 700; color: #fff;">
        📥 Download
      </a>
      <a href="${imageSrc}" target="_blank" class="btn" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.92rem; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-family: var(--font-title); font-weight: 700; color: var(--primary-color); border: 2px solid var(--primary-color); background: #fff;">
        🔍 View Full Size
      </a>
    </div>
    <div class="lightbox-image-container" style="width: 100%; border-radius: 12px; overflow-y: auto; overflow-x: auto; max-height: 70vh; border: 1.5px solid var(--border-color); background-color: #f8fafc; text-align: center; padding: 10px;">
      <img src="${imageSrc}" alt="${imageTitle}" style="max-width: 100%; height: auto; display: inline-block; border-radius: 6px; box-shadow: var(--shadow-sm);">
    </div>
  `;
  
  modalBody.innerHTML = bodyHTML;
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Disable scroll
  
  const closeBtn = document.getElementById("modal-close");
  const closeModal = () => {
    modalOverlay.classList.remove("active");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  };
  
  closeBtn.onclick = closeModal;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeModal();
  };
}



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
   8. TYPES OF LOGISTICS GRID
   ========================================== */
function initLogisticsGrid() {
  const cards = document.querySelectorAll(".logistic-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });
}

/* ==========================================
   9. NEXUS AI CHATBOT (STATEFUL CONVERSATION)
   ========================================== */
const NEXUS_AI_SYSTEM_PROMPT = `You are "Nexus AI," an advanced, professional virtual assistant representing a top-tier freight forwarding and logistics company. Your primary goal is to assist clients, partners, and employees with highly accurate, concise, and actionable information.

Core Competencies:
- Global Freight Forwarding: Answer queries regarding Air freight, Ocean freight (FCL/LCL), and Land transportation.
- Logistics & Supply Chain Planning: Provide insights on supply chain optimization, strategic decision-making, and logistics network management.
- Incoterms 2020: Explain and apply shipping terms accurately (e.g., FOB, EXW, CIF, DDP).
- Cargo Calculations: Assist with calculating CBM (Cubic Meters), Volumetric Weight, and Chargeable Weight.
- Customs & Documentation: Guide users on standard shipping documents (Bill of Lading, Air Waybill, Commercial Invoice, Packing List) and general customs clearance procedures.

Behavior & Tone:
- Maintain a polite, corporate, and highly professional tone at all times.
- Structure your answers clearly using bullet points, short paragraphs, and bold text for key terms to ensure readability.
- Be solution-oriented. If a user asks for a specific shipping rate or a customized quotation, explain the general process but politely instruct them to leave their contact details or reach out to the company's sales team for an exact quote.

Boundaries (Strictly Enforced):
- You must ONLY answer questions related to logistics, freight forwarding, shipping, and supply chain management.
- Under no circumstances should you generate code, write essays on unrelated topics, or answer questions about politics, entertainment, or general trivia.
- If a user asks a question outside your domain, politely decline by stating: "I am Nexus AI, your specialized freight forwarding and logistics assistant. I cannot assist with that request, but I would be happy to help you with your shipping and supply chain inquiries."`;

let conversationHistory = [];
let currentTopicContext = null;


const SHIPPING_BOT_ANSWERS = {
  greeting: "Hello! I am Nexus AI, the logistics advisor for Nexus Cargo. How can I help you today? You can ask about Incoterms, container sizes, compliance rules, or freight calculations.",
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

function initNexusAIChat() {
  const sendBtn = document.getElementById("chat-send-btn");
  const textInput = document.getElementById("chat-input");
  const msgArea = document.getElementById("chat-msg-area");
  
  if (!sendBtn || !textInput || !msgArea) return;
  
  msgArea.innerHTML = "";
  conversationHistory = [];
  currentTopicContext = null;
  
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
      textInput.value = btn.textContent;
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
  // Removed text content for minimalistic colored circles
  
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
  
  // Track history for continuous conversation
  conversationHistory.push({ role: "user", parts: [{ text: query }] });
  
  appendChatMessage("system", "... reasoning");
  const typingMsg = document.querySelector(".chat-message.system:last-child");
  
  // Removed hardcoded API key for security
  const apiKeyInput = document.getElementById("api-key-input");
  const apiKey = apiKeyInput ? apiKeyInput.value.trim() : "";
  
  setTimeout(async () => {
    
    if (apiKey) {
      try {
        const responseText = await callGeminiAPI(apiKey);
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", responseText);
        conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
      } catch (err) {
        console.error("Gemini API Error:", err);
        const fallbackMsg = `⚠️ *Nexus AI cloud servers are currently experiencing high traffic. Switching to the offline intelligence database...*\n\n` + getLocalConversationalResponse(query);
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", fallbackMsg);
        conversationHistory.push({ role: "model", parts: [{ text: fallbackMsg }] });
      }
    } else {
      // Connect to free, keyless serverless AI (Pollinations API)
      try {
        const responseText = await callFreeAI();
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", responseText);
        conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
      } catch (err) {
        const fallbackMsg = getLocalConversationalResponse(query);
        if (typingMsg) typingMsg.remove();
        appendChatMessage("system", fallbackMsg);
        conversationHistory.push({ role: "model", parts: [{ text: fallbackMsg }] });
      }
    }
  }, 600);
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
  
  // 1. Regional Freight & Airport / Seaport Intelligence Hub
  if (q.includes("japan") && (q.includes("airport") || q.includes("air") || q.includes("hub") || q.includes("flight"))) {
    return `### ✈️ Major Air Freight Gateways in Japan\n\nJapan operates some of the world's most technologically advanced air cargo hubs:\n\n1. **Narita International Airport (NRT - Tokyo)**:\n   - Japan's primary international air cargo gateway, handling ~2 million tonnes annually.\n   - Features the **NRT Cold Chain Cluster** (temperature-regulated warehouses for pharma and fresh produce).\n2. **Tokyo Haneda Airport (HND)**:\n   - Located close to Tokyo city center; ideal for urgent express shipments and belly-hold cargo on passenger flights.\n3. **Kansai International Airport (KIX - Osaka)**:\n   - 24/7 offshore island airport serving Western Japan's electronics and biotech manufacturing sectors.\n4. **Chubu Centrair Airport (NGO - Nagoya)**:\n   - Dedicated hub for automotive parts (Toyota supply chain) and aerospace components.\n\n💡 *Air Freight Calculation Tip: Chargeable weight for Japan shipments is the higher of Gross Weight or Volumetric Weight (L x W x H in cm / 6000).*`;
  }

  if (q.includes("japan") && (q.includes("port") || q.includes("sea") || q.includes("ocean") || q.includes("vessel"))) {
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
  
  // 5. Intelligent Knowledge Base Deep Search Engine with Stop-Words Filtering
  const kbData = getKBData();
  if (kbData && kbData.categories) {
    const STOP_WORDS = new Set([
      "give", "me", "the", "of", "and", "a", "an", "in", "on", "at", "to", "for", "with", "is", "are", "was",
      "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "can", "could", "should",
      "would", "will", "shall", "may", "might", "must", "about", "details", "detail", "info", "information",
      "tell", "show", "explain", "what", "which", "who", "whom", "this", "that", "these", "those", "how",
      "why", "where", "when", "please", "want", "know", "need", "like", "get", "cargo", "freight", "shipping"
    ]);

    const searchTerms = q
      .replace(/[^\w\s]/gi, '')
      .split(/\s+/)
      .map(w => w.toLowerCase())
      .filter(w => w.length > 2 && !STOP_WORDS.has(w));
    
    if (searchTerms.length > 0) {
      let bestSubtopic = null;
      let maxMatches = 0;
      
      kbData.categories.forEach(cat => {
        cat.subtopics.forEach(sub => {
          let score = 0;
          const textToSearch = (sub.title + " " + sub.summary + " " + (sub.content || "")).toLowerCase();
          searchTerms.forEach(term => {
            if (textToSearch.includes(term)) score += 2;
            if (sub.title.toLowerCase().includes(term)) score += 5;
          });
          if (score > maxMatches) {
            maxMatches = score;
            bestSubtopic = { sub, catTitle: cat.title };
          }
        });
      });
      
      if (bestSubtopic && maxMatches >= 2) {
        // Strip HTML tags for clean text presentation in chat
        let cleanContent = bestSubtopic.sub.content ? bestSubtopic.sub.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim() : '';
        if (cleanContent.length > 450) cleanContent = cleanContent.substring(0, 450) + '...';
        
        return `### 📦 ${bestSubtopic.sub.title}\n*Category: ${bestSubtopic.catTitle}*\n\n${bestSubtopic.sub.summary}\n\n${cleanContent}\n\n💡 *Ask me specific follow-up questions about ${bestSubtopic.sub.title} or related shipping procedures!*`;
      }
    }
  }

  // Default articulate freight advisor response
  return `### 🌐 Nexus Cargo Intelligence Advisor\n\nI am specialized in global freight forwarding, supply chain planning, and customs compliance.\n\nYou can ask me about:\n- **Incoterms 2020 / 2026**: FOB, CIF, EXW, DDP, DAP responsibilities.\n- **Cargo Calculations**: CBM volume, Air Volumetric Weight (1:6000), Chargeable Weight.\n- **International Airports & Seaports**: Major hubs in Japan, Singapore, Dubai, Europe, US, Sri Lanka.\n- **Container Specs**: 20ft, 40ft, 40ft High Cube, Reefer, Open Top, Flat Racks.\n- **Customs & Documentation**: Bill of Lading, Air Waybill, CUSDEC, HS Codes, Dangerous Goods (UN 1-9).\n\n*How can I assist your specific shipment today?*`;
}



async function callGeminiAPI(apiKey) {
  // 1. Build a clean alternating history starting with user
  let cleanHistory = [];
  let lastRole = null;
  
  conversationHistory.forEach(msg => {
    const text = msg.parts[0].text;
    // Skip empty queries or loading indicator
    if (text.includes("... reasoning") || text.includes("... thinking") || text === "") return;
    
    // Map system role to model role
    let role = msg.role;
    if (role === "system") {
      role = "model";
    }
    
    if (lastRole === role) {
      // Append text if consecutive roles are the same to preserve sequence
      cleanHistory[cleanHistory.length - 1].parts[0].text += "\n" + text;
    } else {
      cleanHistory.push({
        role: role,
        parts: [{ text: text }]
      });
      lastRole = role;
    }
  });

  // 2. Strict Gemini Rule: History must start with USER
  if (cleanHistory.length > 0 && cleanHistory[0].role === "model") {
    cleanHistory = cleanHistory.slice(1);
  }
  
  // 3. Strict Gemini Rule: If history is empty, add a default user turn
  if (cleanHistory.length === 0) {
    cleanHistory.push({
      role: "user",
      parts: [{ text: "Hello" }]
    });
  }

  let response;
  if (apiKey) {
    // Local Testing with provided key
    response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: cleanHistory,
        systemInstruction: {
          parts: [{ text: NEXUS_AI_SYSTEM_PROMPT }]
        }
      })
    });
  } else {
    // Production / Vercel deployment
    response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        history: cleanHistory,
        systemPrompt: NEXUS_AI_SYSTEM_PROMPT
      })
    });
  }
  
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData.error ? errData.error.message : `HTTP ${response.status}`;
    throw new Error(errMsg);
  }
  
  const data = await response.json();
  
  // Return text based on whether it came from direct Google API or our Vercel backend
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text;
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

// Tool 5: Documentation Checklist Generator
function generateDocChecklist() {
  const shipmentType = document.getElementById('doc-shipment-type').value;
  const transportMode = document.getElementById('doc-transport-mode').value;
  const cargoType = document.getElementById('doc-cargo-type').value;
  const resultDiv = document.getElementById('doc-checklist-result');

  let checklist = [
    { name: "Commercial Invoice", desc: "Mandatory for all international shipments to declare value and HS codes." },
    { name: "Packing List", desc: "Details dimensions, weight, and carton counts for handling." }
  ];

  if (transportMode === 'ocean') {
    checklist.push({ name: "Bill of Lading (B/L)", desc: "Ocean freight transport contract and title of goods." });
  } else {
    checklist.push({ name: "Air Waybill (AWB)", desc: "Air freight transport contract (non-negotiable)." });
  }

  if (shipmentType === 'export') {
    checklist.push({ name: "Export Customs Declaration (CUSDEC)", desc: "Mandatory filing for origin customs clearance." });
    checklist.push({ name: "Certificate of Origin (C/O)", desc: "Proves where the goods were manufactured." });
  } else {
    checklist.push({ name: "Import Customs Declaration", desc: "Mandatory filing for destination customs and duty assessment." });
  }

  if (cargoType === 'dangerous') {
    checklist.push({ name: "Shipper's Declaration for Dangerous Goods (DGD)", desc: "Strictly required for hazardous materials. Must be signed by a certified DG packer." });
    checklist.push({ name: "MSDS (Material Safety Data Sheet)", desc: "Provides chemical breakdown and emergency handling instructions." });
  } else if (cargoType === 'perishable') {
    checklist.push({ name: "Phytosanitary or Health Certificate", desc: "Required for agricultural or food products." });
  }

  let html = `<h4 style="color: var(--primary-navy); margin-bottom: 15px; border-bottom: 2px solid var(--border-color); padding-bottom: 10px;">Required Documents (${checklist.length})</h4>`;
  html += `<ul style="list-style: none; padding: 0;">`;
  
  checklist.forEach(doc => {
    html += `
      <li style="margin-bottom: 15px; background: var(--bg-gray); padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-orange); display: flex; gap: 15px; align-items: flex-start;">
        <span style="font-size: 1.5rem;">📄</span>
        <div>
          <strong style="display: block; color: var(--primary-navy); margin-bottom: 5px;">${doc.name}</strong>
          <span style="font-size: 0.9rem; color: var(--text-muted);">${doc.desc}</span>
        </div>
      </li>
    `;
  });
  
  html += `</ul>`;
  resultDiv.innerHTML = html;
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

async function fetchLogisticsNews() {
  if (globalNewsCache) {
    renderNews(globalNewsCache);
    return;
  }
  
  const feeds = [
    'https://splash247.com/feed/',
    'https://www.supplychaindive.com/feeds/news/'
  ];
  
  const homeLoading = document.getElementById('news-loading-state');
  const fullLoading = document.getElementById('full-news-loading-state');
  
  try {
    // Fetch all feeds in parallel using free RSS-to-JSON API (without invalid count parameter)
    const fetchPromises = feeds.map(feedUrl => {
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
      return fetch(apiUrl).then(res => res.json());
    });

    const results = await Promise.all(fetchPromises);
    
    let allArticles = [];
    results.forEach(data => {
      if (data.status === 'ok' && data.items) {
        allArticles = allArticles.concat(data.items);
      }
    });

    if (allArticles.length > 0) {
      allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      globalNewsCache = allArticles;
      renderNews(allArticles);
    } else {
      throw new Error("No valid articles found from any feed.");
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
  
  // Render Homepage (Top 6)
  if (homeContainer) {
    const articles = allArticles.slice(0, 6);
    homeContainer.innerHTML = generateNewsHTML(articles);
    if (homeLoading) homeLoading.style.display = 'none';
    homeContainer.style.display = 'grid';
  }
  
  // Render Full Page (All articles)
  if (fullContainer) {
    fullContainer.innerHTML = generateNewsHTML(allArticles);
    if (fullLoading) fullLoading.style.display = 'none';
    fullContainer.style.display = 'grid';
  }
}

function generateNewsHTML(articles) {
  let html = '';
  articles.forEach(article => {
    const defaultImg = 'images/bg_ocean_freight.jpg';
    const imgUrl = article.thumbnail || article.enclosure?.link || defaultImg;
    const pubDate = new Date(article.pubDate);
    const dateString = pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const rawDesc = article.description || '';
    const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, "");

    html += `
      <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="news-card">
        <div class="news-card-image" style="background-image: url('${imgUrl}');"></div>
        <div class="news-card-content">
          <span class="news-date">${dateString}</span>
          <h3 class="news-title">${article.title}</h3>
          <div class="news-desc">${cleanDesc}</div>
          <div class="news-read-more">Read Full Article &rarr;</div>
        </div>
      </a>
    `;
  });
  return html;
}

// Remove the old fetchFullLogisticsNews as it is now integrated


