import axios from "axios";

// https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&timeformat=unixtime

const parseCurrentWeather = ({ current, daily }) => {
  const {
    temperature_2m: currentTemp,
    apparent_temperature: feelsLike,
    wind_speed_10m: windspeed,
    relative_humidity_2m: humidity,
    precipitation,
    rain,
    showers,
    snowfall,
  } = current;

  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precipitationSum],
    sunrise: [sunrise],
    sunset: [sunset],
    weather_code: [weatherIcon],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    feelsLike: Math.round(feelsLike),
    windspeed: Math.round(windspeed),
    humidity,
    curPrecip: Math.round(precipitation * 100) / 100,
    curRain: rain,
    curShowers: showers,
    curSnowfall: snowfall,
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    maxFeelsLike: Math.round(maxFeelsLike),
    minFeelsLike: Math.round(minFeelsLike),
    precipitationSum,
    sunrise,
    sunset,
    iconCode: weatherIcon,
  };
};

const parseDailyWeather = ({ daily }) => {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000, // Change ms to s
      iconCode: daily.weather_code[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      minTemp: Math.round(daily.temperature_2m_min[index]),
    };
  });
};

const parseHourlyWeather = ({ hourly, current }) => {
  return hourly.time
    .map((time, index) => {
      return {
        temp: Math.round(hourly.temperature_2m[index]),
        timestamp: time * 1000, // Change ms to s
        iconCode: hourly.weather_code[index],
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        precip: Math.round(hourly.precipitation[index]),
        precipProb:
          Math.round(hourly.precipitation_probability[index] * 100) / 100,
        windspeed: Math.round(hourly.wind_speed_10m[index]),
      };
    })
    .filter(({ timestamp }) => timestamp >= current.time * 1000);
};

const getWeather = async (lat, lon, timezone) => {
  try {
    const res = await axios.get(
      "https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&timeformat=unixtime",
      {
        params: { latitude: lat, longitude: lon, timezone },
      }
    );
    return {
      current: parseCurrentWeather(res.data),
      daily: parseDailyWeather(res.data),
      hourly: parseHourlyWeather(res.data),
    };
  } catch (error) {
    console.log(error);
  }
};

export default getWeather;
