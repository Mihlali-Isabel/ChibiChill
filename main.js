// Login Page Logic
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  // Store username for dashboard
  localStorage.setItem("username", username);

  // Demo mode: Accept any input OR specific credentials
  if ((username && password) || (username === "chibi" && password === "1234")) {
    window.location.href = "dashboard.html";
  } else {
    alert("Try any username/password! (Demo mode)");
    // Or show an error message:
    document.querySelector("#error").textContent = "Hint: Use 'chibi' / '1234'";
  }
});

// Dashboard Logic (only runs on dashboard.html)
if (document.getElementById("username-display")) {
  // Display stored username
  const username = localStorage.getItem("username") || "Guest";
  document.getElementById("username-display").textContent = username;

  // Update date/time
  function updateDateTime() {
    document.getElementById("datetime").textContent = new Date().toLocaleString();
  }
  setInterval(updateDateTime, 1000);
  updateDateTime();

  // Wallpaper changer
  document.querySelectorAll('.wallpapers img').forEach(img => {
    img.addEventListener('click', () => {
      const bg = img.getAttribute('data-bg');
      document.body.style.backgroundImage = `url(assets/wallpapers/${bg})`;
    });
  });

let currentAudio = null;

document.querySelectorAll('.sound-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const soundType = btn.dataset.sound;
    
    // Stop previous sound
    if (currentAudio) {
      currentAudio.pause();
    }
    
    // Play new sound
    currentAudio = new Audio(sounds[soundType]);
    currentAudio.loop = true;
    currentAudio.play();
    
    // Visual feedback
    btn.style.backgroundColor = "#6a11cb";
    setTimeout(() => {
      btn.style.backgroundColor = "#FF85A2";
    }, 200);
  });
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page reload
  
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  // Demo credentials (any input works, or use these)
  if (username && password) { 
    window.location.href = "dashboard.html"; // Redirects
  } else {
    alert("Try any username/password! (Demo mode)");
  }
});

if (username === "chibi" && password === "1234") {
  window.location.href = "dashboard.html";
} else {
  document.querySelector("#error").textContent = "Hint: Use 'chibi' / '1234'";
}

// Auto-redirect after 3 seconds (for demo videos)
setTimeout(() => {
  window.location.href = "dashboard.html";
}, 3000);
}