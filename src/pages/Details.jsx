import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setWeather(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!weather) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h1>
      <p className="text-lg">{weather.weather[0].description}</p>
      <p className="text-lg">🌡 {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Details;
