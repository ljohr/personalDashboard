import fetchUpcomingEvents from "./api/canvasApi.js";
import { fetchStockData, fetchStockNews } from "./api/alphaVantageApi.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
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
    console.log(topic);
    const news = await fetchStockNews(topic);
    res.json(news);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
