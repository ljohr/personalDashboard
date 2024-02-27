import fetchUpcomingEvents from "./api/canvasApi.js";
import fetchQuotes from "./api/quotableApi.js";
import { fetchStockData, fetchStockNews } from "./api/alphaVantageApi.js";
import express from "express";
import cors from "cors";
import getWeather from "./api/weatherApi.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    credentials: true,
    origin: "https://personaldashboard-3ayp.onrender.com",
  })
);

app.get("/api/canvas-tasks", async (req, res, next) => {
  try {
    const processedTasks = await fetchUpcomingEvents();
    res.json(processedTasks);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/stock-data", async (req, res, next) => {
  try {
    const ticker = req.query.ticker;
    const stockData = await fetchStockData(ticker);
    res.json(stockData["Global Quote"]);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/market-news", async (req, res, next) => {
  try {
    const topic = req.query.topic;
    const news = await fetchStockNews(topic);
    res.json(news);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/quotes", async (req, res, next) => {
  try {
    const quotes = await fetchQuotes();
    res.json(quotes);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/weather", async (req, res, next) => {
  try {
    const lat = Math.round(req.query.lat);
    const lon = Math.round(req.query.lon);
    const timezone = req.query.timezone;
    const weatherData = await getWeather(lat, lon, timezone);
    res.json(weatherData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
