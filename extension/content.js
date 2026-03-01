/*
// v1: just prove the content script runs on Gmail
console.log("Email Safety Checker content script loaded");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getALink() {
  // Gmail message body container
  const bodyContainer = document.querySelector("div.a3s");

  if (!bodyContainer) {
    console.log("Email body not found.");
    return [];
  }
  let links = Array.from(bodyContainer.querySelectorAll("a"))
    .map(a => a.href)
    .filter(Boolean);

  /*
  const links = Array.from(anchors).map(a => ({
    text: a.innerText.trim(),
    href: a.href
  }));

  return links[getRandomInt(0, links.length)];
}

// content.js
async function extractGmailData() {
    const subject = document.querySelector("h2.hP")?.innerText || "No subject found";
    const sender = document.querySelector("span.gD")?.getAttribute("email") || "No sender found";
    const body = document.querySelector("div.a3s.aiL")?.innerText || "No body content found";

    const response = await fetch("http://127.0.0.1:8000/details/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "sender": sender,
            "subject": subject,
            "body": body,
            "link": getALink()
        })
    });

    const data = await response.json();

    data.at = Date.now();
    return data;
}

// Send extracted data to popup.js when it's ready
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractEmailData") {
        extractGmailData().then(emailData => {
          sendResponse(emailData);
        }).catch(error => {
          sendResponse(null);
        });
    }
    return true; // Keep the message channel open for async response
});

// Run once when Gmail page loads
// sendDemoScanFromGmail();
*/
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
