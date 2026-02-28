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
            "body": body
        })
    });

    const data = await response.json();

    // data.at = Date.now();
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