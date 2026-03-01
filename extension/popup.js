document.getElementById("safeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab && tab.id) {
    if (tab.url && tab.url !== "chrome://newtab/") {
      chrome.tabs.goBack(tab.id);
    }
  }

  window.close();
});

document.getElementById("proceedBtn").addEventListener("click", () => {
  window.close();
});
