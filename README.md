
# 🌦️ Weather Forecast App

A responsive weather application built with HTML, CSS, and JavaScript. Search for any city to view its current temperature, weather conditions, humidity, and wind speed.

## ✨ Features

- Search for cities worldwide.
- Display current temperature in Celsius.
- Show weather conditions with emojis.
- Display relative humidity.
- Display wind speed in km/h.
- Show the city's local weather time.
- Responsive design for mobile and desktop.
- Live weather data from the Open-Meteo API.
- No API key or account signup required.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Fetch API)
- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API

## 📁 Project Structure

```text
weather-forecast-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run Locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a browser.
4. Enter a city name, such as Bengaluru.
5. Click Search to view the weather.

If API requests fail when opening the file directly, run the project using VS Code Live Server or another local web server.

## 🌐 Weather API Setup

This project uses Open-Meteo, which provides a free API for non-commercial use without requiring an API key.

### Geocoding API

Converts a city name into geographical coordinates.

https://geocoding-api.open-meteo.com/v1/search?name=Bengaluru&count=1

### Weather Forecast API

Retrieves current weather using latitude and longitude.

https://open-meteo.com/en/docs

No API key or environment variables need to be configured.

## 📊 Weather Information

- Temperature: degrees Celsius (°C)
- Humidity: percentage (%)
- Wind speed: kilometres per hour (km/h)
- Conditions: decoded from weather codes returned by the API

## 🌍 Deploy on GitHub Pages

1. Upload all four files to your GitHub repository.
2. Open Settings → Pages.
3. Under Build and deployment, select Deploy from a branch.
4. Select the `main` branch and `/ (root)` folder.
5. Click Save.
6. Open the published website after deployment completes.

## 📜 Data Attribution

Weather data provided by
[Open-Meteo](https://open-meteo.com/).

Weather data is available under the Creative Commons
Attribution 4.0 International (CC BY 4.0) licence.
See the provider's terms for applicable usage requirements.

## 👨‍💻 Author

Created as a beginner-friendly web development project.

## 📄 License

This project code is available for learning and personal use.
Review the API provider's terms before using it commercially.

