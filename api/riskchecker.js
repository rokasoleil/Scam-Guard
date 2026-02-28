// riskchecker.js
// Simple, educational link risk checker (MVP)

const DEFAULT_ALLOWLIST = [
  "queensu.ca",
  "my.queensu.ca",
  "google.com",
  "accounts.google.com",
  "microsoft.com",
  "login.microsoftonline.com",
  "office.com",
  "outlook.com"
];

const SHORTENERS = new Set([
  "bit.ly", "tinyurl.com", "t.co", "ow.ly", "buff.ly", "cutt.ly", "rb.gy", "is.gd"
]);

const SENSITIVE_KEYWORDS = [
  "login", "signin", "sign-in", "verify", "verification", "password",
  "reset", "account", "security", "authenticate", "sso"
];

const REDIRECT_WORDS = [
  "redirect=", "url=", "next=", "continue=", "dest=", "destination=", "return=", "goto="
];

function safeUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function hostnameOf(url) {
  const u = safeUrl(url);
  return u ? u.hostname.toLowerCase() : "";
}

function inAllowlist(hostname, allowlist) {
  const h = hostname.toLowerCase();
  return allowlist.some(d => h === d || h.endsWith("." + d));
}

function looksLikeIp(hostname) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
}

function countSubdomains(hostname) {
  const parts = hostname.split(".").filter(Boolean);
  return Math.max(0, parts.length - 2);
}

function containsAny(text, words) {
  const t = text.toLowerCase();
  return words.some(w => t.includes(w));
}

function checkRisk(url, opts = {}) {
  const allowlist = opts.allowlist ?? DEFAULT_ALLOWLIST;

  const u = safeUrl(url);
  if (!u) {
    return {
      score: 70,
      level: "high",
      reasons: ["This link looks malformed or intentionally confusing."],
      hostname: "",
      finalUrl: url
    };
  }

  const hostname = u.hostname.toLowerCase();
  const href = u.href;

  let score = 0;
  const reasons = [];

  // Rule: not HTTPS
  if (u.protocol !== "https:") {
    score += 15;
    reasons.push("This link does not use HTTPS (secure connection).");
  }

  // Rule: URL shortener
  if (SHORTENERS.has(hostname)) {
    score += 25;
    reasons.push("This link uses a URL shortener, which hides the real destination.");
  }

  // Rule: unknown domain (not university / major providers)
  const trusted = inAllowlist(hostname, allowlist);
  if (!trusted) {
    score += 35;
    reasons.push("The destination domain is not a recognized university or major service domain.");
  }

  // Rule: login/verify/password keywords (especially dangerous if not trusted)
  if (containsAny(href, SENSITIVE_KEYWORDS) && !trusted) {
    score += 30;
    reasons.push("It asks for login/verification details on an untrusted domain.");
  } else if (containsAny(href, SENSITIVE_KEYWORDS)) {
    score += 10;
    reasons.push("It contains login/verification language—make sure you expected this.");
  }

  // Rule: redirect tricks
  if (containsAny(href, REDIRECT_WORDS)) {
    score += 15;
    reasons.push("It contains redirect parameters, which can hide where you’ll end up.");
  }

  // Rule: “looks like Queens” but isn’t official
  if (href.toLowerCase().includes("queens") && !inAllowlist(hostname, ["queensu.ca", "my.queensu.ca"])) {
    score += 20;
    reasons.push("It mentions the university but the domain is not official (could be an imitation).");
  }

  // Rule: raw IP address
  if (looksLikeIp(hostname)) {
    score += 25;
    reasons.push("It goes directly to an IP address (unusual for legitimate sign-in pages).");
  }

  // Rule: very deep subdomains
  if (countSubdomains(hostname) >= 3) {
    score += 10;
    reasons.push("It uses a very deep subdomain structure, which is sometimes used to mimic real sites.");
  }

  // Clamp 0–100
  score = Math.max(0, Math.min(100, score));

  let level = "low";
  if (score >= 60) level = "high";
  else if (score >= 30) level = "medium";

  // Deduplicate reasons
  const uniqueReasons = [...new Set(reasons)];

  return {
    score,
    level,
    reasons: uniqueReasons,
    hostname,
    finalUrl: href // later your API teammate can replace with expanded finalUrl after redirects
  };
}

module.exports = checkRisk;