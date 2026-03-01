const API_URL = "http://127.0.0.1:8000/details/";
let lastEmailKey = null;

function getEmailDataFromGmail() {
  const subjectEl = document.querySelector("h2.hP");
  const senderEl = document.querySelector("span.gD");
  const senderEmailEl = document.querySelector("span.gD");
  const bodyEl = document.querySelector("div.a3s");

  if (!subjectEl || !senderEl || !bodyEl) return null;

  const subject = subjectEl.textContent?.trim() || "";
  const senderName = senderEl.getAttribute("name") || senderEl.textContent?.trim() || "";
  const senderEmail = senderEmailEl.getAttribute("email") || "";
  const body = bodyEl.innerText?.trim() || "";

  // key so we don’t re-check the same email repeatedly
  const key = `${senderEmail}::${subject.slice(0, 40)}`;
  return { subject, senderName, senderEmail, body, key };
}

function removeBanner() {
  const existing = document.getElementById("scam-guard-banner");
  if (existing) existing.remove();
}

function showBanner(result) {
  removeBanner();

  const banner = document.createElement("div");
  banner.id = "scam-guard-banner";
  banner.style.position = "sticky";
  banner.style.top = "0";
  banner.style.zIndex = "99999";
  banner.style.padding = "12px 16px";
  banner.style.borderRadius = "10px";
  banner.style.margin = "10px";
  banner.style.fontFamily = "system-ui, -apple-system, Arial";
  banner.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";

  const risk = result?.risk ?? "unknown";
  const reasons = Array.isArray(result?.reasons) ? result.reasons : [];

  let bg = "#eef2ff"; // default
  let title = "Scam-Guard: checked";
  if (risk === "high") { bg = "#fee2e2"; title = "⚠️ High risk email"; }
  if (risk === "medium") { bg = "#fef9c3"; title = "⚠️ Medium risk email"; }
  if (risk === "low") { bg = "#dcfce7"; title = "✅ Low risk email"; }

  banner.style.background = bg;

  const reasonsHtml = reasons.length
    ? `<ul style="margin:8px 0 0 18px;">${reasons.map(r => `<li>${r}</li>`).join("")}</ul>`
    : `<div style="margin-top:8px; opacity:0.85;">No reasons returned.</div>`;

  banner.innerHTML = `
    <div style="font-weight:700; font-size:14px;">${title}</div>
    <div style="margin-top:4px; font-size:13px;">
      Score: <b>${result?.score ?? "?"}</b>
    </div>
    ${reasonsHtml}
  `;

  // Put it near top of the email view
  const container = document.querySelector("div.nH");
  if (container) container.prepend(banner);
}

async function analyzeEmail(emailData) {
  const payload = {
    subject: emailData.subject,
    sender_name: emailData.senderName,
    sender_email: emailData.senderEmail,
    body: emailData.body
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

async function checkIfEmailChanged() {
  const data = getEmailDataFromGmail();
  if (!data) return;

  if (data.key === lastEmailKey) return;
  lastEmailKey = data.key;

  // tell background we’re checking (so popup/badge can update)
  chrome.runtime.sendMessage({ type: "SCAM_GUARD_CHECKING" });

  try {
    const result = await analyzeEmail(data);

    // show banner
    showBanner(result);

    // send to background so popup can show latest + badge updates
    chrome.runtime.sendMessage({ type: "SCAM_GUARD_RESULT", result });

  } catch (e) {
    chrome.runtime.sendMessage({ type: "SCAM_GUARD_ERROR", error: String(e) });
  }
}

// Gmail is a single-page app, so use a MutationObserver
const observer = new MutationObserver(() => {
  checkIfEmailChanged();
});

observer.observe(document.body, { childList: true, subtree: true });

// also run once on load
checkIfEmailChanged();
