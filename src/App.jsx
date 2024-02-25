import { useEffect, useState } from "react";
import getWeather from "./api/weatherApi.js";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await getWeather(10, 10, timezone);
        console.log(response);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      <h1>Personal Dashboard</h1>
    </>
  );
}

export default App;
