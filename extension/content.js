// v1: just prove the content script runs on Gmail
console.log("Email Safety Checker content script loaded");

function sendDemoScanFromGmail() {
  const demoEmail = {
    subject: "Urgent: Verify your account",
    senderEmail: "support@notreal-bank.com",
    bodyText: "Your account will be suspended unless you verify now.",
    links: ["http://192.168.0.1/login"]
  };

  // For now, we still create a fake analysis result
  const result = {
    level: "dangerous",
    score: 80,
    reasons: ["IP address link detected", "Urgent language detected"],
    at: Date.now()
  };

  chrome.runtime.sendMessage({ type: "SET_LATEST_RESULT", payload: result });
}

// Run once when Gmail page loads
sendDemoScanFromGmail();