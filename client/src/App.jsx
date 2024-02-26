import axios from "axios";
import "./App.css";
import WeatherData from "./components/Weather";
import CanvasTasks from "./components/CanvasTasks";
import StockData from "./components/StockData";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <main>
      <h1>Personal Dashboard</h1>
      <WeatherData />
      <CanvasTasks />
      <StockData ticker={"IBM"} />
    </main>
  );
}

export default App;
