import axios from "axios";
import "./App.css";
import WeatherData from "./components/WeatherData";
import CanvasTasks from "./components/CanvasTasks";
import StockData from "./components/StockData";
import Quotes from "./components/Quotes";
import stockStyles from "./components/StockData.module.css";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <main className="dashboardMain">
      <h1 className="title">Personal Dashboard</h1>
      <div className="dashboard-container">
        <div className="row">
          <WeatherData />
          <section className={stockStyles.stocksSection}>
            <h2>Stock Data</h2>
            <div className={stockStyles.allStocks}>
              <StockData ticker={"NVDA"} />
            </div>
          </section>
          <Quotes />
        </div>

        <CanvasTasks />
      </div>
    </main>
  );
}

export default App;
