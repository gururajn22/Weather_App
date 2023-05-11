
const apiKey = "8ff6d67a4da342db487ebda8e7a2173a";
const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const formE = document.querySelector("form");

formE.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather-icon">`;
        weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherData.querySelector(".description").textContent = description;
        weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = "";
        weatherData.querySelector(".temperature").textContent = "";
        weatherData.querySelector(".description").textContent = "An error occurred, please try again correctly";
        weatherData.querySelector(".details").innerHTML = "";
    }
}
