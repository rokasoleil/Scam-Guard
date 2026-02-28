const app = document.getElementById("app");

function renderNoResult() {
  app.innerHTML = `
    <div class="pill">NO SCAN YET</div>
    <p class="muted">We haven't scanned any email yet.</p>
    <button id="scan">Run scan</button>
  `;

  document.getElementById("scan").addEventListener("click", async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "extractEmailData" }, (resp) => {
              let r = JSON.parse(resp);
              renderResult(r);
            });
        });
    
  });
}

function renderResult(result) {
  alert("Reloading...")
  const time = 0; // new Date(result.at).toLocaleTimeString();
  app.innerHTML = `
    <div class="pill">${result.level.toUpperCase()} (${result.score})</div>
    <p class="muted">Last scan: ${time}</p>
    <h4>Reasons</h4>
    <ul>${result.reasons.map(r => `<li>${r}</li>`).join("")}</ul>
    <button id="clear">Clear</button>
  `;

  document.getElementById("clear").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "SET_LATEST_RESULT", payload: null }, () => load());
  });
}

function load() {
  chrome.runtime.sendMessage({ type: "GET_LATEST_RESULT" }, (result) => {
    if (!result) {
      renderNoResult();
      return;
    }
    renderResult(result);
  });
}

load();