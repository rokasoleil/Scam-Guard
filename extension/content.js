// v1: just prove the content script runs on Gmail
console.log("Email Safety Checker content script loaded");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getALink() {
  // Gmail message body container
  const bodyContainer = document.querySelector("div.a3s");

  if (!bodyContainer) {
    console.log("Email body not found.");
    return [];
  }
  let links = Array.from(bodyContainer.querySelectorAll("a"))
    .map(a => a.href)
    .filter(Boolean);

  /*
  const links = Array.from(anchors).map(a => ({
    text: a.innerText.trim(),
    href: a.href
  }));*/

  return links[getRandomInt(0, links.length)];
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
            "body": body,
            "link": getALink()
        })
    });

    const data = await response.json();

    data.at = Date.now();
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