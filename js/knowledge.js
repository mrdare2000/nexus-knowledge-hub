/**
 * Nexus Knowledge Hub - Knowledge Base & Learning Hub Module (js/knowledge.js)
 * Manages category cards, subtopics modal, search/filter, and full-screen image lightbox.
 */

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
window.getKBData = getKBData;

function getSkeletonKnowledgeHTML(count = 6) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="skeleton-kb-card">
        <div class="skeleton-kb-header">
          <div class="skeleton skeleton-circle"></div>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text-line short"></div>
          </div>
        </div>
        <div class="skeleton-kb-list">
          <div class="skeleton skeleton-kb-item"></div>
          <div class="skeleton skeleton-kb-item"></div>
          <div class="skeleton skeleton-kb-item"></div>
        </div>
      </div>
    `;
  }
  return html;
}
window.getSkeletonKnowledgeHTML = getSkeletonKnowledgeHTML;

function renderLearningHub() {
  const grid = document.getElementById("learning-grid");
  if (!grid) return;
  
  const kbData = getKBData();
  if (!kbData) {
    if (!grid.innerHTML.trim()) {
      grid.innerHTML = getSkeletonKnowledgeHTML(6);
    }
    setTimeout(renderLearningHub, 120);
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
window.renderLearningHub = renderLearningHub;

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
  
  if (modalTitle) modalTitle.textContent = subtopic.title;
  if (modalTag) modalTag.textContent = category.title;
  
  let bodyHTML = "";
  if (subtopic.image && (!subtopic.content || !subtopic.content.includes(subtopic.image))) {
      bodyHTML += `
      <div class="modal-feature-wrapper">
        <img src="${subtopic.image}" alt="${subtopic.title}" class="modal-feature-img">
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
      <div class="modal-simulator-banner">
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
    <div class="modal-nav-footer">
      ${prevSubtopic ? `<button class="btn" style="font-size: 0.85rem; padding: 10px 20px; background-color: var(--primary-navy); color: white; border-radius: 6px; box-shadow: var(--shadow-sm);" onclick="openSubtopicModal('${categoryId}', '${prevSubtopic.id}')">&larr; Previous Subtopic</button>` : `<div></div>`}
      ${nextSubtopic ? `<button class="btn btn-primary" style="font-size: 0.85rem; padding: 10px 20px;" onclick="openSubtopicModal('${categoryId}', '${nextSubtopic.id}')">Next Subtopic &rarr;</button>` : `<div></div>`}
    </div>
  `;
  
  // Insert direct YouTube link button if YouTube link exists
  if (subtopic.youtube) {
    const videoId = subtopic.youtube.split("/embed/")[1];
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    bodyHTML += `
      <div class="youtube-direct-wrapper">
        <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary reveal-video-btn-link">
          📺 Watch Video Guide on YouTube &rarr;
        </a>
      </div>
    `;
  }
  
  if (modalBody) modalBody.innerHTML = bodyHTML;

  // Make ALL images inside subtopic modal clickable to open in Fullscreen Lightbox Modal
  if (modalBody) {
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
  }

  if (modalOverlay) modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Disable scroll
  
  // Close triggers
  const closeBtn = document.getElementById("modal-close");
  const closeModal = () => {
    if (modalOverlay) modalOverlay.classList.remove("active");
    if (modalBody) modalBody.innerHTML = "";
    document.body.style.overflow = "";
  };
  
  if (closeBtn) closeBtn.onclick = closeModal;
  if (modalOverlay) {
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) closeModal();
    };
  }
}
window.openSubtopicModal = openSubtopicModal;

function revealModalVideo(btn, videoUrl) {
  const container = btn.closest(".youtube-reveal-container");
  if (!container) return;
  const hiddenWrapper = container.querySelector(".video-wrapper-hidden");
  const iframe = hiddenWrapper ? hiddenWrapper.querySelector("iframe") : null;
  if (iframe) iframe.src = videoUrl;
  if (hiddenWrapper) hiddenWrapper.style.display = "block";
  btn.style.display = "none";
}
window.revealModalVideo = revealModalVideo;

const FEATURED_BOARD_DESCRIPTIONS = {
  "incoterms": {
    heading: "All Types of Incoterms 2026 (ICC Rules Matrix)",
    text: "This comprehensive matrix illustrates the official division of costs, freight responsibilities, and point of risk transfer between Buyer and Seller across all 11 Incoterms rules. It clearly differentiates Any Mode rules (EXW, FCA, CPT, CIP, DAP, DPU, DDP) from Sea/Inland Waterway only rules (FAS, FOB, CFR, CIF), guiding supply chain professionals on freight carriage, export/import customs clearance, cargo insurance, and unloading liabilities."
  },
  "cargo aircraft": {
    heading: "Inside a Cargo Aircraft (Freighter Layout & Operations)",
    text: "This technical cutaway infographic illustrates the internal configuration of a dedicated main-deck cargo freighter (such as the Boeing 777F / 747-8F). It reveals main-deck cargo door loading, motorized roller-bed floor tracks, Unit Load Device (ULD) container & pallet positions, temperature-controlled cargo zones, and lower forward/aft belly holds with automated high-loader ground support equipment."
  },
  "types of logistics": {
    heading: "Types of Logistics & Supply Chain Models",
    text: "This structural visual guide breaks down the core branches of modern logistics across global trade: Inbound Logistics (raw materials & supplier delivery), Outbound Logistics (warehousing, fulfillment & end-user delivery), Reverse Logistics (returns, refurbishment & recycling), Third-Party (3PL) & Fourth-Party (4PL) outsourced operations, and specialized Cold Chain and Green Logistics models."
  },
  "passenger aircraft": {
    heading: "Inside a Passenger Aircraft (Belly-Hold Cargo Operations)",
    text: "This aviation cross-section showcases how commercial wide-body passenger aircraft carry vital air cargo beneath the passenger cabin deck. It details forward and aft lower belly holds, bulk cargo compartments, baggage container netting, LD3/AKE container loading procedures, and the vital role of belly freight in global express air cargo networks."
  },
  "containers": {
    heading: "Types of Shipping Containers & Technical Specifications",
    text: "This marine equipment guide details standard ocean container dimensions, maximum gross weights, tare weights, and payload capacities. Covering 20ft and 40ft Dry Standard, 40ft High Cube, Open Top, Flat Rack, and Reefer refrigerated units, it also explains container CSC safety plates, ISO sizing codes, and essential tare-to-payload calculations for freight forwarders."
  }
};

function openImageModal(imageSrc, imageTitle, customDesc) {
  const lightboxModal = document.getElementById("image-lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-image-title");
  const lightboxDownload = document.getElementById("lightbox-download-btn");
  const descContainer = document.getElementById("lightbox-image-desc-container");
  const descHeading = document.getElementById("lightbox-desc-heading");
  const descText = document.getElementById("lightbox-desc-text");
  
  if (lightboxModal && lightboxImg && lightboxTitle && lightboxDownload) {
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageTitle || "Subtopic Image";
    lightboxTitle.textContent = imageTitle || "Image View";
    lightboxDownload.href = imageSrc;
    const cleanFilename = (imageTitle || "infographic").replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_') + '.jpg';
    lightboxDownload.download = cleanFilename;

    let info = customDesc;
    if (!info && imageTitle) {
      const lower = imageTitle.toLowerCase();
      for (const [key, val] of Object.entries(FEATURED_BOARD_DESCRIPTIONS)) {
        if (lower.includes(key)) {
          info = val;
          break;
        }
      }
    }

    if (descContainer && descHeading && descText) {
      if (info) {
        descHeading.textContent = typeof info === 'object' ? info.heading : imageTitle;
        descText.textContent = typeof info === 'object' ? info.text : info;
        descContainer.style.display = "block";
      } else {
        descContainer.style.display = "none";
      }
    }
    
    lightboxModal.style.display = "flex";
    void lightboxModal.offsetWidth;
    lightboxModal.classList.add("active");
  }
}
window.openImageModal = openImageModal;
window.openLightbox = openImageModal;

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
window.closeImageLightbox = closeImageLightbox;

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
        const summaryMatch = (subtopic.summary || "").toLowerCase().includes(query);
        const contentMatch = (subtopic.content || "").toLowerCase().includes(query);
        
        if (titleMatch || summaryMatch || contentMatch || query === "") {
          if (subtopicItems[index]) subtopicItems[index].style.display = "flex";
          visibleSubtopics++;
        } else {
          if (subtopicItems[index]) subtopicItems[index].style.display = "none";
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
window.initSearch = initSearch;

function filterLearningHub(query) {
  if (typeof switchPage === 'function') switchPage('learning');
  setTimeout(() => {
    const searchInput = document.getElementById("kb-search");
    if (searchInput) {
      searchInput.value = query;
      searchInput.dispatchEvent(new Event('input'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 100);
}
window.filterLearningHub = filterLearningHub;
