chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;

  chrome.tabs.sendMessage(tab.id, {
    type: "SHOW_PHISH_POPUP",
    payload: {
      risk: 78,
      domain: "queensu-verify.tk"
    }
  });
});
