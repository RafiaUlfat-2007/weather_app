// async function getWeather() {
//     let city = document.getElementById("city").value.trim();
//     if (!city) {
//         document.getElementById("error").innerHTML = "❌ Please enter a city name.";
//         return;
//     }

//     let apiKey = "3a7c219a70a130d5a0bee11ecbad7e73";
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     // Show loading
//     document.getElementById("loading").style.display = "block";
//     document.getElementById("error").innerHTML = "";
//     document.getElementById("location").innerHTML = "";
//     document.getElementById("temp").innerHTML = "";
//     document.getElementById("humidity").innerHTML = "";
//     document.getElementById("weather").innerHTML = "";
//     document.getElementById("wind").innerHTML = "";
//     document.getElementById("icon").src = "";

//     try {
//         let response = await fetch(url);
//         let data = await response.json();

//         if (data.cod == "404") {
//             document.getElementById("error").innerHTML = "❌ City not found. Please enter a correct city.";
//             document.getElementById("loading").style.display = "none";
//             return;
//         }

//         document.getElementById("loading").style.display = "none";

//         let temp = Math.round(data.main.temp); // Celsius
//         let humidity = data.main.humidity;
//         let desc = data.weather[0].description;
//         let wind = data.wind.speed;
//         let icon = data.weather[0].icon;

//         document.getElementById("location").innerHTML = `${data.name}, ${data.sys.country}`;
//         document.getElementById("temp").innerHTML = `🌡️ Temperature: ${temp}°C`;
//         document.getElementById("humidity").innerHTML = `💧 Humidity: ${humidity}%`;
//         document.getElementById("weather").innerHTML = `🌤️ Weather: ${desc}`;
//         document.getElementById("wind").innerHTML = `💨 Wind Speed: ${wind} m/s`;
//         document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

//     } catch (error) {
//         document.getElementById("loading").style.display = "none";
//         document.getElementById("error").innerHTML = "⚠️ Something went wrong. Please try again.";
//     }
// }

// // Page load hone par default city ka weather
// window.addEventListener("load", () => {
//     document.getElementById("city").value = "Karachi"; // Default city
//     getWeather(); // Function call
// });


// 🟡 Function to get weather data
async function getWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();
    const errorEl = document.getElementById("error");
    const loadingEl = document.getElementById("loading");
    const locationEl = document.getElementById("location");
    const tempEl = document.getElementById("temp");
    const humidityEl = document.getElementById("humidity");
    const weatherEl = document.getElementById("weather");
    const windEl = document.getElementById("wind");
    const iconEl = document.getElementById("icon");

    // If no city entered
    if (!city) {
        errorEl.innerHTML = "❌ Please enter a city name.";
        cityInput.focus();
        return;
    }

    const apiKey = "3a7c219a70a130d5a0bee11ecbad7e73";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Show loading and reset previous data
    loadingEl.style.display = "block";
    errorEl.innerHTML = "";
    locationEl.innerHTML = "";
    tempEl.innerHTML = "";
    humidityEl.innerHTML = "";
    weatherEl.innerHTML = "";
    windEl.innerHTML = "";
    iconEl.src = "";
    iconEl.style.display = "none";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // If city not found
        if (data.cod != 200 && data.cod != "200") {
            errorEl.innerHTML = "❌ City not found. Please enter a correct city.";
            loadingEl.style.display = "none";
            cityInput.focus();
            return;
        }

        // Hide loading
        loadingEl.style.display = "none";

        // Extract data
        const temp = Math.round(data.main.temp); // Celsius
        const humidity = data.main.humidity; // %
        let desc = data.weather[0].description;
        desc = desc.charAt(0).toUpperCase() + desc.slice(1); // Capitalize first letter
        const wind = (data.wind.speed * 3.6).toFixed(1); // km/h
        const icon = data.weather[0].icon;

        // Display data
        locationEl.innerHTML = `${data.name}, ${data.sys.country}`;
        tempEl.innerHTML = `🌡️ Temperature: ${temp}°C`;
        humidityEl.innerHTML = `💧 Humidity: ${humidity}%`;
        weatherEl.innerHTML = `🌤️ Weather: ${desc}`;
        windEl.innerHTML = `💨 Wind Speed: ${wind} km/h`;
        iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconEl.style.display = "block";

    } catch (error) {
        loadingEl.style.display = "none";
        errorEl.innerHTML = "⚠️ Something went wrong. Please try again.";
        cityInput.focus();
        console.error("Weather API Error:", error);
    }
}

// 🟡 Default city on page load
window.addEventListener("load", () => {
    const defaultCity = "Karachi";
    document.getElementById("city").value = defaultCity;
    getWeather();
});

// 🟡 Search on Enter key
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});