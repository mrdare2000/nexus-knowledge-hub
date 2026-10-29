/**
 * Nexus Knowledge Hub - UI & Utilities Module (js/ui.js)
 * Global loader, notifications, and security escape utilities.
 */

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
window.escapeHTML = escapeHTML;

/* ==========================================
   GLOBAL BRANDED LOADING OVERLAY SYSTEM
   ========================================== */
let globalLoaderTimeout = null;

function showGlobalLoader(message = "Loading...") {
  const loader = document.getElementById("global-loader");
  const loaderText = document.getElementById("global-loader-text");
  if (loaderText) loaderText.textContent = message;
  if (loader) loader.style.display = "flex";

  // Safety fallback: auto-hide after 8 seconds so screen never hangs indefinitely
  if (globalLoaderTimeout) clearTimeout(globalLoaderTimeout);
  globalLoaderTimeout = setTimeout(() => {
    hideGlobalLoader();
  }, 8000);
}
window.showGlobalLoader = showGlobalLoader;

function hideGlobalLoader() {
  if (globalLoaderTimeout) {
    clearTimeout(globalLoaderTimeout);
    globalLoaderTimeout = null;
  }
  const loader = document.getElementById("global-loader");
  if (loader) loader.style.display = "none";
}
window.hideGlobalLoader = hideGlobalLoader;

/* Toast Notification Utility */
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("nexus-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "nexus-toast-container";
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const bg = type === "success" ? "#059669" : (type === "error" ? "#DC2626" : "var(--primary-navy)");
  toast.style.cssText = `
    background: ${bg};
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 8px;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }, 4000);
}
window.showToast = showToast;
