import axios from "axios";
import "./App.css";
import WeatherData from "./components/WeatherData";
import CanvasTasks from "./components/CanvasTasks";
import StockData from "./components/StockData";
import Quotes from "./components/Quotes";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <main>
      <h1>Personal Dashboard</h1>
      <WeatherData />
      <CanvasTasks />
      <StockData ticker={"IBM"} />
      <Quotes />
    </main>
  );
}

export default App;
