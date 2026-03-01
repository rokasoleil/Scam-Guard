// content.js

function showPhishPopup() {
  if (document.getElementById("phish-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "phish-overlay";

  overlay.innerHTML = `
    <div class="phish-modal">
      
      <div class="phish-header">
        <h1>Phish & Tell</h1>
        <p>We scanned this link for you</p>
      </div>

      <div class="risk-card">
        <div class="risk-circle">
          <span>78%</span>
        </div>
        <div class="risk-label">HIGH RISK</div>
      </div>

      <div class="domain-card">
        <h3>Detected Domain</h3>
        <p class="detected">queensu-verify.tk</p>

        <div class="warning-box">
          <strong>Domain Mismatch Detected</strong>
          <p>Official domain: <span class="safe">queensu.ca</span></p>
          <p>Detected domain: <span class="danger">queensu-verify.tk</span></p>
        </div>
      </div>

      <div class="actions">
        <button class="safe-btn">Go Back to Safety</button>
        <button class="danger-btn">Proceed Anyway</button>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // Close logic
  document.querySelector(".safe-btn").addEventListener("click", () => {
    overlay.remove();
    window.history.back();
  });
}

showPhishPopup();
