import { useState } from "react";
import axios from "axios";
import { ICON_MAP } from "../utils/iconMap.js";
import styles from "./Weather.module.css";

const WeatherData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [curWeather, setCurWeather] = useState({
    currentTemp: null,
    feelsLike: null,
    windspeed: null,
    humidity: null,
    curPrecip: null,
    curRain: null,
    curShowers: null,
    curSnowfall: null,
    highTemp: null,
    lowTemp: null,
    maxFeelsLike: null,
    minFeelsLike: null,
    precipitationSum: null,
    sunrise: null,
    sunset: null,
    iconCode: null,
  });
  const [dailyWeather, setDailyWeather] = useState({
    timestamp: [],
    iconCode: [],
    maxTemp: [],
    minTemp: [],
  });
  const [hourlyWeather, setHourlyWeather] = useState({
    temp: [],
    timestamp: [],
    iconCode: [],
    feelsLike: [],
    precip: [],
    precipProb: [],
    windspeed: [],
  });

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const response = await axios.get(
            `/api/weather?lat=${lat}&lon=${lon}`
          );
          const current = response.data.current;
          const daily = response.data.daily;
          const hourly = response.data.hourly;
          setCurWeather({
            currentTemp: current.currentTemp,
            feelsLike: current.feelsLike,
            windspeed: current.windspeed,
            humidity: current.humidity,
            curPrecip: current.curPrecip,
            curRain: current.curRain,
            curShowers: current.curShowers,
            curSnowfall: current.curSnowfall,
            highTemp: current.highTemp,
            lowTemp: current.lowTemp,
            maxFeelsLike: current.maxFeelsLike,
            minFeelsLike: current.minFeelsLike,
            precipitationSum: current.precipitationSum,
            sunrise: current.sunrise,
            sunset: current.sunset,
            iconCode: current.iconCode,
          });
          setDailyWeather({
            timestamp: daily.timestamp,
            iconCode: daily.iconCode,
            maxTemp: daily.maxTemp,
            minTemp: daily.minTemp,
          });
          setHourlyWeather({
            temp: hourly.temp,
            timestamp: hourly.timestamp,
            iconCode: hourly.iconCode,
            feelsLike: hourly.feelsLike,
            precip: hourly.precip,
            precipProb: hourly.precipProb,
            windspeed: hourly.windspeed,
          });
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
        setError(error);
        setLoading(false);
      }
    );
  };

  if (loading) return <>Loading...</>;
  if (error) return <h2>Error Loading Data</h2>;

  return (
    <section>
      {!loading && !curWeather.currentTemp && (
        <button onClick={fetchWeather}>Get Weather</button>
      )}
      {curWeather.currentTemp && (
        <div className={styles.weatherToday}>
          <img
            className={styles.weatherIcon}
            src={ICON_MAP.get(curWeather.iconCode)}
            alt="weather-icon"
          />
          <h3>{curWeather.currentTemp}°C</h3>
          <p>Feels Like: {curWeather.feelsLike}°C</p>
          <p>
            {curWeather.highTemp}°C / {curWeather.lowTemp}°C
          </p>
        </div>
      )}
    </section>
  );
};

export default WeatherData;
