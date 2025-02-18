import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [locationWeather, setLocationWeather] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Function to fetch weather for searched city
  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please enter a valid city name.");
      setWeather(null);
    }
  };

  // Function to fetch weather of current location
  const fetchLocationWeather = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          setLocationWeather(response.data);
        } catch (err) {
          setLocationError("Failed to fetch weather for current location.");
        }
      },
      (error) => {
        setLocationError("Location access denied. Enable location for weather updates.");
      }
    );
  };

  // Convert timestamp to readable time adjusted for the location's timezone
  const formatTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000); // Adjust to timezone
    return date.toUTCString().split(" ")[4]; // Extract HH:MM:SS
  };

  // Reload page on refresh button click
  const refreshPage = () => {
    window.location.reload();
  };

  // Fetch location weather on first load
  useEffect(() => {
    fetchLocationWeather();
  }, []);

  return (
    <div className="bg-weather flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Weather Search Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Weather App 🌦</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 text-lg border rounded-lg w-80 text-center shadow"
          />
          <button
            onClick={fetchWeather}
            className="px-5 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
          >
            Get Weather
          </button>
          <button
            onClick={refreshPage}
            className="px-5 py-3 bg-blue-300 text-white text-lg rounded-lg hover:bg-blue-700 transition"
          >
            Refresh 🔄
          </button>
        </div>

        {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-2xl text-gray-700">{weather.weather[0].description}</p>
            <p className="text-5xl font-bold text-blue-500 mt-2">{weather.main.temp}°C</p>
            <p className="text-xl mt-4">💧 Humidity: {weather.main.humidity}%</p>
            <p className="text-xl">🌬 Wind: {weather.wind.speed} m/s</p>
            {weather.rain && <p className="text-xl">🌧 Precipitation: {weather.rain["1h"]} mm (last hour)</p>}
            {weather.snow && <p className="text-xl">❄ Snow: {weather.snow["1h"]} mm (last hour)</p>}
            <p className="text-xl">🌅 Sunrise: {formatTime(weather.sys.sunrise, weather.timezone)}</p>
            <p className="text-xl">🌇 Sunset: {formatTime(weather.sys.sunset, weather.timezone)}</p>
          </div>
        )}
      </div>

      {/* Show Current Location Weather Only When No Search */}
      {!city && (
        <div
          onClick={() => setShowLocationDetails(!showLocationDetails)}
          className="bg-white bg-opacity-80 rounded-lg p-6 text-center w-96 shadow-lg cursor-pointer transition hover:scale-105 hover:bg-opacity-90"
        >
          <h2 className="text-2xl font-bold text-gray-800">Weather of Current Location</h2>
          {locationError && <p className="text-red-500">{locationError}</p>}
          {locationWeather && (
            <>
              <h3 className="text-xl text-gray-700">
                {locationWeather.name}, {locationWeather.sys.country}
              </h3>

              {/* Show More Details When Clicked */}
              {showLocationDetails && (
                <div className="mt-3">
                  <p className="text-lg">{locationWeather.weather[0].description}</p>
                  <p className="text-4xl font-bold text-blue-500 mt-2">{locationWeather.main.temp}°C</p>
                  <p className="text-lg">Humidity: {locationWeather.main.humidity}%</p>
                  <p className="text-lg">Wind: {locationWeather.wind.speed} m/s</p>
                  {locationWeather.rain && <p className="text-lg">🌧 Precipitation: {locationWeather.rain["1h"]} mm (last hour)</p>}
                  {locationWeather.snow && <p className="text-lg">❄ Snow: {locationWeather.snow["1h"]} mm (last hour)</p>}
                  <p className="text-lg">🌅 Sunrise: {formatTime(locationWeather.sys.sunrise, locationWeather.timezone)}</p>
                  <p className="text-lg">🌇 Sunset: {formatTime(locationWeather.sys.sunset, locationWeather.timezone)}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
