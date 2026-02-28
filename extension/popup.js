const app = document.getElementById("app");

function renderNoResult() {
  app.innerHTML = `
    <div class="pill">NO SCAN YET</div>
    <p class="muted">We haven’t scanned any email yet.</p>
    <button id="demo">Run demo scan</button>
  `;

  document.getElementById("demo").addEventListener("click", () => {
    const demoResult = {
      level: "suspicious",
      score: 55,
      reasons: ["Urgent language detected", "Link looks unusual"],
      at: Date.now()
    };

    chrome.runtime.sendMessage(
      { type: "SET_LATEST_RESULT", payload: demoResult },
      () => load()
    );
  });
}

function renderResult(result) {
  const time = new Date(result.at).toLocaleTimeString();
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