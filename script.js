const apiKey = "400a223ca92f21b862db2553668c11df";

const iconMap = {
  Clear: "wi-day-sunny",
  Rain: "wi-rain",
  Snow: "wi-snow",
  Clouds: "wi-cloudy",
  Thunderstorm: "wi-thunderstorm",
  Mist: "wi-fog"
};

const themes = {
  Clear: "linear-gradient(135deg,#f6d365,#fda085)",
  Rain: "linear-gradient(135deg,#2c3e50,#3498db)",
  Snow: "linear-gradient(135deg,#83a4d4,#b6fbff)",
  Thunderstorm: "linear-gradient(135deg,#141E30,#243B55)",
  Clouds: "linear-gradient(135deg,#bdc3c7,#2c3e50)"
};

document.getElementById("city").addEventListener("keypress", e => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = city.value;
  const loader = document.getElementById("loader");
  const card = document.getElementById("weather-card");
  const error = document.getElementById("error");
  const layer = document.getElementById("animation-layer");

  error.innerText = "";
  layer.innerHTML = "";
  card.style.display = "none";

  if (!city) {
    error.innerText = "Please enter a city";
    return;
  }

  loader.style.display = "block";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) throw new Error("City not found");

    const type = data.weather[0].main;

    document.getElementById("city-name").innerText = data.name;
    document.getElementById("temp").innerText = `${data.main.temp}°C`;
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `Wind: ${data.wind.speed} m/s`;

    const icon = document.getElementById("icon");
    icon.className = `wi ${iconMap[type] || "wi-day-sunny"}`;

    document.body.style.background = themes[type] || themes.Clear;

    if (type === "Rain") rain(layer);
    if (type === "Snow") snow(layer);
    if (type === "Thunderstorm") thunder(layer);

    card.style.display = "block";

  } catch {
    error.innerText = "City not found!";
  }

  loader.style.display = "none";
}

/* Animations */
function rain(layer) {
  for (let i = 0; i < 60; i++) {
    let d = document.createElement("div");
    d.className = "rain-drop";
    d.style.left = Math.random() * 100 + "%";
    layer.appendChild(d);
  }
}

function snow(layer) {
  for (let i = 0; i < 40; i++) {
    let s = document.createElement("div");
    s.className = "snow";
    s.style.left = Math.random() * 100 + "%";
    layer.appendChild(s);
  }
}

function thunder(layer) {
  rain(layer);
  let t = document.createElement("div");
  t.className = "thunder";
  layer.appendChild(t);
}
