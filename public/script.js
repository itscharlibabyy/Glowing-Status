/* ---------------------------
   API HEALTH CHECK
----------------------------*/

async function checkAPI() {
  const indicator = document.getElementById("api-status-indicator");
  const text = document.getElementById("api-status-text");

  try {
    const res = await fetch("https://api.glowing-radiance.com/health", {
      method: "GET",
      headers: { "Accept": "application/json" }
    });

    // If API fails, go to catch
    if (!res.ok) throw new Error("Bad response from API");

    // If the API returns JSON, try to read it
    let data = {};
    try {
      data = await res.json();
    } catch (e) {
      // No JSON? Still considered OK
    }

    // Update UI
    indicator.style.background = "#d7c075";
    text.innerText = "Operational ✧";

    // Add log
    pushLog("API health check succeeded.");

  } catch (e) {
    indicator.style.background = "#a86a4a";
    text.innerText = "Offline / Unreachable ✦";

    // Add log
    pushLog("⚠ API unreachable.");
  }
}

// Run every 15 seconds
checkAPI();
setInterval(checkAPI, 15000);



/* ---------------------------
   LIVE LOG SYSTEM
----------------------------*/

const logStream = document.getElementById("log-stream");
const clearButton = document.getElementById("clear-log");

function pushLog(message) {
  const entry = document.createElement("div");
  entry.className = "log-entry new";
  entry.innerText = `⧉ ${new Date().toLocaleTimeString()} — ${message}`;

  logStream.appendChild(entry);

  // Scroll smoothly to bottom
  logStream.scrollTo({
    top: logStream.scrollHeight,
    behavior: "smooth"
  });

  // Remove glowing "new" after animation
  setTimeout(() => entry.classList.remove("new"), 1200);
}

// Simulated logs until real backend logs exist
function simulateLogs() {
  const samples = [
    "Checking API heartbeat…",
    "Worker responded in 87ms",
    "API latency normalized",
    "Background Worker cycle completed",
    "Edge Worker executed (region: EU-West)",
    "Cache warmed successfully",
    "Daily cleanup cron executed",
    "Sync event dispatched",
    "Security check passed"
  ];

  const random = samples[Math.floor(Math.random() * samples.length)];
  pushLog(random);
}

pushLog("This feature isnt currently available, Check back soon!")

// Generate a simulated log every 7–12 seconds
//setInterval(simulateLogs, Math.random() * 5000 + 7000);


// Clear logs button
clearButton.addEventListener("click", () => {
  logStream.innerHTML = `<div class="log-entry">⧉ Log cleared.</div>`;
});
