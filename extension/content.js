/**
 * Phish & Tell — content.js
 * Injects the phishing warning popup into any page.
 *
 * To trigger the popup programmatically from a background script, send:
 *   chrome.tabs.sendMessage(tabId, {
 *     action: "showPhishWarning",
 *     data: {
 *       riskLevel: 78,           // 0–100
 *       detectedDomain: "queesnu-verify.tk",
 *       officialDomain: "queensu.ca",
 *       targetUrl: "https://queesnu-verify.tk/login"
 *     }
 *   });
 */

(function () {
  "use strict";

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function svgIcon(path, extra = "") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
      stroke-linejoin="round" ${extra}>${path}</svg>`;
  }

  const ICONS = {
    fish: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f97316" stroke="none">
      <path d="M20.59 6.51c-.98.77-2.03 1.38-3.09 1.85C15.77 4.42 12.78 2 9.5 2 5.36 2 2 5.36 2 9.5c0 2.77 1.49 5.21 3.73 6.55C4.66 17.73 4 19.81 4 22c2.42 0 4.65-.78 6.46-2.09.41.04.83.09 1.25.09 4.97 0 9-4.03 9-9 0-.52-.05-1.03-.12-1.54z"/>
    </svg>`,
    shield: svgIcon(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`),
    info: svgIcon(`<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`),
    alert: svgIcon(`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`),
    chevron: svgIcon(`<polyline points="6 9 12 15 18 9"/>`),
  };

  // ─── Build HTML ────────────────────────────────────────────────────────────

  function buildModal(data) {
    const {
      riskLevel = 78,
      detectedDomain = "queesnu-verify.tk",
      officialDomain = "queensu.ca",
      targetUrl = window.location.href,
    } = data;

    // Dash offset for the SVG gauge ring (circumference ≈ 339.3)
    const circumference = 339.3;
    const offset = circumference * (1 - riskLevel / 100);

    return `
    <div id="phish-tell-overlay">
      <div id="phish-tell-modal" role="dialog" aria-modal="true" aria-labelledby="pt-title">

        <!-- Header -->
        <div class="pt-header">
          <div class="pt-header-icon">
            ${ICONS.fish}
            <span class="pt-status-dot"></span>
          </div>
          <div class="pt-header-text">
            <h1 id="pt-title">Phish &amp; Tell</h1>
            <p>We scanned this link for you<br>Powered by real‑time AI risk detection</p>
          </div>
        </div>

        <!-- Risk Gauge -->
        <div class="pt-risk-card">
          <div class="pt-gauge-container">
            <svg class="pt-gauge-svg" viewBox="0 0 120 120">
              <circle class="pt-gauge-bg" cx="60" cy="60" r="54"/>
              <circle class="pt-gauge-fill" cx="60" cy="60" r="54"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                style="transition: stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)"/>
            </svg>
            <div class="pt-gauge-center">
              <span class="pt-gauge-label">Risk Level</span>
              <span class="pt-gauge-value">${riskLevel}%</span>
            </div>
          </div>
          <div class="pt-risk-badge">High Risk</div>
        </div>

        <!-- Detected Domain -->
        <div class="pt-domain-card">
          <div class="pt-domain-label">Detected Domain</div>
          <div class="pt-domain-header">
            <span class="pt-domain-name">${detectedDomain}</span>
            <div class="pt-domain-shield">${ICONS.shield}</div>
          </div>
          <div class="pt-mismatch-box">
            <div class="pt-mismatch-title">
              Domain Mismatch Detected
              ${ICONS.info}
            </div>
            <div class="pt-mismatch-desc">This link claims to be one site but leads to another</div>
            <div class="pt-domain-comparison">
              <div class="pt-domain-row">
                <span class="pt-domain-row-label">Official domain:</span>
                <span class="pt-domain-tag safe">${officialDomain}</span>
              </div>
              <div class="pt-domain-row">
                <span class="pt-domain-row-label">Detected domain:</span>
                <span class="pt-domain-tag danger">${detectedDomain}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Notice -->
        <div class="pt-notice">
          This link asks you to verify your login. Take a second to double‑check the domain before entering any credentials.
        </div>

        <!-- Warnings -->
        <div class="pt-warnings">
          <div class="pt-warning-item">
            <div class="pt-warning-icon">${ICONS.alert}</div>
            <div class="pt-warning-content">
              <h3>Impersonation risk detected</h3>
              <p>The link uses a similar‑looking domain but isn't the official ${officialDomain} address.</p>
            </div>
          </div>
          <div class="pt-warning-item">
            <div class="pt-warning-icon">${ICONS.alert}</div>
            <div class="pt-warning-content">
              <h3>Suspicious login verification request</h3>
              <p>We noticed something unusual. Legitimate services rarely ask you to re‑verify via email links.</p>
            </div>
          </div>
        </div>

        <!-- Technical details (collapsible) -->
        <div class="pt-tech-toggle" id="pt-tech-toggle" role="button" tabindex="0" aria-expanded="false">
          See technical details ${ICONS.chevron}
        </div>
        <div class="pt-tech-details" id="pt-tech-details" aria-hidden="true">
          <strong>URL:</strong> <code>${targetUrl.slice(0, 80)}${targetUrl.length > 80 ? "…" : ""}</code><br>
          <strong>Detected domain:</strong> <code>${detectedDomain}</code><br>
          <strong>Expected domain:</strong> <code>${officialDomain}</code><br>
          <strong>Risk score:</strong> <code>${riskLevel}/100</code><br>
          <strong>Flags:</strong> domain mismatch, login-page phishing pattern, credential harvesting attempt
        </div>

        <!-- Action buttons -->
        <div class="pt-actions">
          <button class="pt-btn-primary" id="pt-btn-safe">Go Back to Safety</button>
          <button class="pt-btn-secondary" id="pt-btn-proceed">Proceed Anyway</button>
        </div>

        <!-- Link row -->
        <div class="pt-link-row">
          <button class="pt-link" id="pt-btn-copy">Copy Link</button>
          <button class="pt-link" id="pt-btn-report">Report Scam</button>
        </div>

        <!-- Footer -->
        <div class="pt-footer">Always verify unexpected requests.</div>

      </div>
    </div>`;
  }

  // ─── Show / Dismiss ────────────────────────────────────────────────────────

  function showWarning(data = {}) {
    // Prevent duplicates
    if (document.getElementById("phish-tell-overlay")) return;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = buildModal(data);
    document.body.appendChild(wrapper.firstElementChild);

    bindEvents(data);
  }

  function dismissWarning(redirectBack = false) {
    const overlay = document.getElementById("phish-tell-overlay");
    if (!overlay) return;
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.2s";
    setTimeout(() => {
      overlay.remove();
      if (redirectBack) history.back();
    }, 200);
  }

  function showToast(message) {
    const existing = document.querySelector(".pt-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "pt-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2400);
  }

  // ─── Event Binding ─────────────────────────────────────────────────────────

  function bindEvents(data) {
    // Go back to safety
    document.getElementById("pt-btn-safe")?.addEventListener("click", () => {
      dismissWarning(true);
    });

    // Proceed anyway — dismiss popup and let user continue
    document.getElementById("pt-btn-proceed")?.addEventListener("click", () => {
      dismissWarning(false);
    });

    // Copy link
    document.getElementById("pt-btn-copy")?.addEventListener("click", () => {
      const url = data.targetUrl || window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        showToast("Link copied to clipboard");
      }).catch(() => {
        showToast("Could not copy link");
      });
    });

    // Report scam
    document.getElementById("pt-btn-report")?.addEventListener("click", () => {
      const reportUrl =
        `https://safebrowsing.google.com/safebrowsing/report_phish/?url=` +
        encodeURIComponent(data.targetUrl || window.location.href);
      window.open(reportUrl, "_blank", "noopener,noreferrer");
    });

    // Technical details toggle
    const toggle = document.getElementById("pt-tech-toggle");
    const details = document.getElementById("pt-tech-details");
    toggle?.addEventListener("click", () => {
      const isOpen = details.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      details.setAttribute("aria-hidden", String(!isOpen));
    });
    toggle?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle.click(); }
    });

    // Close on overlay background click
    document.getElementById("phish-tell-overlay")?.addEventListener("click", (e) => {
      if (e.target.id === "phish-tell-overlay") dismissWarning(false);
    });

    // Close on Escape
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        dismissWarning(false);
        document.removeEventListener("keydown", escHandler);
      }
    });
  }

  // ─── Message Listener ──────────────────────────────────────────────────────

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === "showPhishWarning") {
      showWarning(message.data || {});
      sendResponse({ status: "shown" });
    }
    if (message.action === "dismissPhishWarning") {
      dismissWarning(false);
      sendResponse({ status: "dismissed" });
    }
    return true;
  });

  // ─── Auto-demo: remove this block in production ───────────────────────────
  // Uncomment the line below to auto-show the popup on every page for testing:

})();
