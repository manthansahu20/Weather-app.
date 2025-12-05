const apiKey = "400a223ca92f21b862db2553668c11df";

async function getWeather() {
    let city = document.getElementById("city").value;
    let errorBox = document.getElementById("error");
    let card = document.getElementById("weather-card");
    let animationLayer = document.getElementById("animation-layer");

    errorBox.innerText = "";
    animationLayer.innerHTML = "";

    if (city === "") {
        errorBox.innerText = "Please enter a city.";
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let res = await fetch(url);
    let data = await res.json();

    if (data.cod == 404) {
        card.style.display = "none";
        errorBox.innerText = "City not found!";
        return;
    }

    document.getElementById("city-name").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
    document.getElementById("wind").innerText = "Wind: " + data.wind.speed + " m/s";

    // Static Icons
    let iconCodes = {
        "Clear": "https://openweathermap.org/img/wn/01d.png",
        "Clouds": "https://openweathermap.org/img/wn/03d.png",
        "Rain": "https://openweathermap.org/img/wn/09d.png",
        "Thunderstorm": "https://openweathermap.org/img/wn/11d.png",
        "Snow": "https://openweathermap.org/img/wn/13d.png",
        "Mist": "https://openweathermap.org/img/wn/50d.png"
    };

    document.getElementById("icon").src =
        iconCodes[data.weather[0].main] || iconCodes["Clear"];

    /* WEATHER ANIMATION BASED ON CONDITION */
    let weatherType = data.weather[0].main;

    if (weatherType === "Rain") createRain(animationLayer);
    else if (weatherType === "Snow") createSnow(animationLayer);
    else if (weatherType === "Clouds") createClouds(animationLayer);
    else if (weatherType === "Mist") createFog(animationLayer);
    else if (weatherType === "Thunderstorm") createThunder(animationLayer);

    card.style.display = "block";
}


/* FUNCTIONS FOR ANIMATIONS */
function createRain(layer) {
    for (let i = 0; i < 80; i++) {
        let drop = document.createElement("div");
        drop.classList.add("rain-drop");
        drop.style.left = Math.random() * 100 + "%";
        drop.style.animationDuration = (0.4 + Math.random() * 0.5) + "s";
        layer.appendChild(drop);
    }
}

function createSnow(layer) {
    for (let i = 0; i < 50; i++) {
        let flake = document.createElement("div");
        flake.classList.add("snow-flake");
        flake.style.left = Math.random() * 100 + "%";
        flake.style.animationDuration = (2 + Math.random() * 2) + "s";
        layer.appendChild(flake);
    }
}

function createClouds(layer) {
    for (let i = 0; i < 3; i++) {
        let cloud = document.createElement("div");
        cloud.classList.add("cloud");
        cloud.style.top = (20 + i * 80) + "px";
        layer.appendChild(cloud);
    }
}

function createFog(layer) {
    let fog = document.createElement("div");
    fog.classList.add("fog");
    layer.appendChild(fog);
}

function createThunder(layer) {
    createRain(layer);
    let flash = document.createElement("div");
    flash.classList.add("thunder");
    layer.appendChild(flash);
}
