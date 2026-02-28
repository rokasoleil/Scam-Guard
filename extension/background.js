let latestResult = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SET_LATEST_RESULT") {
    latestResult = request.payload;
    sendResponse({ ok: true });
    return;
  }

  if (request.type === "GET_LATEST_RESULT") {
    sendResponse(latestResult);
    return;
  }

  if (request.type === "PING") {
    sendResponse({ ok: true });
    return;
  }
});