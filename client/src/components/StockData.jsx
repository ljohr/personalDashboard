import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const StockData = ({ ticker }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stock, setStock] = useState([]);
  const fetchStockData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // const response = await axios.get(`api/stock-data?ticker=${ticker}`);
      // setStock(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  if (loading) return <></>;
  if (error) return <h2>Error Loading Data</h2>;

  return (
    <div>
      <h2>Stock Data</h2>
      <p>{stock["01. symbol"]}IBM</p>
      <p>{stock["05. price"]}32</p>
    </div>
  );
};

export default StockData;
