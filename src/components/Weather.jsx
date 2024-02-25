import { useEffect, useState } from "react";
import getWeather from "../api/weatherApi.js";

const WeatherData = () => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await getWeather(10, 10, timezone);
        const current = response.current;
        const daily = response.daily;
        const hourly = response.hourly;
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
    };

    fetchWeather();
  }, []);

  return <>{loading ? <></> : <h3>{curWeather.feelsLike}</h3>}</>;
};

export default WeatherData;
