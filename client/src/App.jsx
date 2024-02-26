import axios from "axios";
import "./App.css";
import WeatherData from "./components/Weather";
import CanvasTasks from "./components/CanvasTasks";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <main>
      <h1>Personal Dashboard</h1>
      <WeatherData />
      <CanvasTasks />
    </main>
  );
}

export default App;
