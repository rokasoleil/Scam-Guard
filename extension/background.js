let latest = null;

function setBadge(risk, score) {
  let text = "";
  let color = "#64748b"; // gray

  if (risk === "high") { color = "#dc2626"; text = String(score ?? "!"); }
  if (risk === "medium") { color = "#ca8a04"; text = String(score ?? "!"); }
  if (risk === "low") { color = "#16a34a"; text = String(score ?? ""); }

  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SCAM_GUARD_CHECKING") {
    setBadge(null, "");
  }

  if (msg.type === "SCAM_GUARD_RESULT") {
    latest = msg.result;
    setBadge(latest?.risk, latest?.score);
  }

  if (msg.type === "SCAM_GUARD_ERROR") {
    latest = { risk: "unknown", score: "?", reasons: [msg.error] };
    setBadge(null, "!");
  }

  if (msg.type === "SCAM_GUARD_GET_LATEST") {
    sendResponse({ latest });
    return true;
  }
});
