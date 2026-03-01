function showPhishPopup(data) {
  if (document.getElementById("phish-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "phish-overlay";

  overlay.innerHTML = `
    <div class="phish-modal">
      <h1>Phish & Tell</h1>
      <h2>${data.risk}% Risk Detected</h2>
      <p>Detected domain: ${data.domain}</p>
      <button id="closeBtn">Go Back to Safety</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("closeBtn").addEventListener("click", () => {
    overlay.remove();
  });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SHOW_PHISH_POPUP") {
    showPhishPopup(msg.payload);
  }
});
