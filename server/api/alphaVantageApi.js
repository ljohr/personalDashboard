import axios from "axios";
import "dotenv/config";

const fetchStockData = async (symbol) => {
  try {
    const request = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchStockNews = async (topic) => {
  try {
    const request = await axios.get(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${topic}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchStockData, fetchStockNews };
