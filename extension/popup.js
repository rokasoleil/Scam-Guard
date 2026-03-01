function render(result) {
  const status = document.getElementById("status");
  const score = document.getElementById("score");
  const reasons = document.getElementById("reasons");

  if (!result) {
    status.textContent = "Open an email in Gmail to scan it.";
    score.textContent = "-";
    reasons.innerHTML = "";
    return;
  }

  status.textContent = `Risk: ${result.risk ?? "unknown"}`;
  score.textContent = result.score ?? "?";

  const list = Array.isArray(result.reasons) ? result.reasons : [];
  reasons.innerHTML = list.length
    ? list.map(r => `<li>${r}</li>`).join("")
    : "<li>No reasons returned.</li>";
}

chrome.runtime.sendMessage({ type: "SCAM_GUARD_GET_LATEST" }, (res) => {
  render(res?.latest);
});
