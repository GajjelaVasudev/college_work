document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "b29e3e0e6cbb724dbfa6f7c08d36b807"; // replace with your OpenWeatherMap API key
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeather");
  const weatherInfo = document.getElementById("weatherInfo");
  const errorDiv = document.getElementById("error");

  // Fetch weather using async/await
  async function fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      displayWeather(data);
      localStorage.setItem("lastCity", city); // save to localStorage
    } catch (error) {
      showError(error.message);
    }
  }

  // Display weather info in DOM
  function displayWeather(data) {
    errorDiv.textContent = "";
    weatherInfo.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>☁ Condition: ${data.weather[0].description}</p>
    `;
  }

  // Show error
  function showError(message) {
    weatherInfo.innerHTML = "";
    errorDiv.textContent = message;
  }

  // On button click
  getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    } else {
      showError("Please enter a city name.");
    }
  });

  // On page load, check localStorage
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    fetchWeather(lastCity);
    cityInput.value = lastCity;
  }
});
