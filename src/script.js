const API_URL = "https://api.glowing-radiance.com/health"; // change this

async function checkAPI() {
  const statusText = document.getElementById("api-status");
  const statusIcon = document.getElementById("status-icon");

  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      statusText.textContent = "Online";
      statusText.style.color = "green";
      statusIcon.style.background = "green";
    } else {
      statusText.textContent = "Error (" + res.status + ")";
      statusText.style.color = "red";
      statusIcon.style.background = "red";
    }
  } catch (err) {
    statusText.textContent = "Offline";
    statusText.style.color = "red";
    statusIcon.style.background = "red";
  }
}

checkAPI();
setInterval(checkAPI, 10000); // update every 10 seconds
