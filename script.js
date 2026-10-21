
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const statusMessage = document.getElementById("status");
const weatherCard = document.getElementById("weather-card");

const cityName = document.getElementById("city-name");
const localTime = document.getElementById("local-time");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const updatedTime = document.getElementById("updated-time");

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

function getWeatherDescription(code, isDay) {
  const conditions = {
    0: ["Clear sky", isDay ? "☀️" : "🌙"],
    1: ["Mainly clear", isDay ? "🌤️" : "🌙"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Foggy", "🌫️"],
    48: ["Depositing rime fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Moderate drizzle", "🌦️"],
    55: ["Dense drizzle", "🌧️"],
    56: ["Light freezing drizzle", "🌧️"],
    57: ["Dense freezing drizzle", "🌧️"],
    61: ["Slight rain", "🌧️"],
    63: ["Moderate rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    66: ["Light freezing rain", "🌧️"],
    67: ["Heavy freezing rain", "🌧️"],
    71: ["Slight snowfall", "🌨️"],
    73: ["Moderate snowfall", "🌨️"],
    75: ["Heavy snowfall", "❄️"],
    77: ["Snow grains", "❄️"],
    80: ["Slight rain showers", "🌦️"],
    81: ["Moderate rain showers", "🌧️"],
    82: ["Violent rain showers", "⛈️"],
    85: ["Slight snow showers", "🌨️"],
    86: ["Heavy snow showers", "❄️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm with hail", "⛈️"],
    99: ["Thunderstorm with heavy hail", "⛈️"]
  };

  return conditions[code] || ["Weather unavailable", "🌡️"];
}

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather service is temporarily unavailable.");
  }

  return response.json();
}

async function searchWeather(city) {
  const geocodingURL = new URL(
    "https://geocoding-api.open-meteo.com/v1/search"
  );

  geocodingURL.search = new URLSearchParams({
    name: city,
    count: "10",
    language: "en",
    format: "json"
  });

  const locationData = await fetchJSON(geocodingURL);

  if (!locationData.results || locationData.results.length === 0) {
    throw new Error("City not found. Check the spelling and try again.");
  }

  // Prefer the most relevant result returned by the geocoding service.
  const place = locationData.results[0];

  const weatherURL = new URL(
    "https://api.open-meteo.com/v1/forecast"
  );

  weatherURL.search = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "weather_code",
      "is_day"
    ].join(","),
    timezone: "auto"
  });

  const weatherData = await fetchJSON(weatherURL);

  if (!weatherData.current) {
    throw new Error("No current weather data is available for this city.");
  }

  displayWeather(place, weatherData);
}

function displayWeather(place, data) {
  const current = data.current;
  const [description, icon] = getWeatherDescription(
    current.weather_code,
    current.is_day === 1
  );

  const placeDetails = [
    place.name,
    place.admin1,
    place.country
  ].filter(Boolean);

  // Avoid repeating the same name when city and region match.
  cityName.textContent = [...new Set(placeDetails)].join(", ");

  temperature.textContent =
    `${Math.round(current.temperature_2m)}°C`;

  condition.textContent = description;
  weatherIcon.textContent = icon;
  humidity.textContent = `${current.relative_humidity_2m}%`;
  windSpeed.textContent = `${current.wind_speed_10m} km/h`;

  localTime.textContent = current.time
    ? `Local time: ${current.time.replace("T", " ")}`
    : "";

  updatedTime.textContent =
    `Weather data time: ${current.time || "Not available"} · ` +
    `Timezone: ${data.timezone || "Local"}`;

  weatherCard.hidden = false;
}

searchForm.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    setStatus("Please enter a city name.", true);
    return;
  }

  searchButton.disabled = true;
  searchButton.textContent = "Searching...";
  setStatus("Finding city and fetching weather...");

  try {
    await searchWeather(city);
    setStatus("Weather loaded successfully.");
  } catch (error) {
    setStatus(
      error instanceof TypeError
        ? "Unable to connect. Check your internet and try again."
        : error.message || "Something went wrong. Please try again.",
      true
    );
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Search";
  }
});
  
