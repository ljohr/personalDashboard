import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./StockData.module.css";

const StockData = ({ ticker }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stock, setStock] = useState([]);
  const fetchStockData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`api/stock-data?ticker=${ticker}`);
      setStock(response.data);
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
    <div className={styles.stockSingle}>
      {!stock && <h4>Reacted API rate limit</h4>}
      {stock && (
        <>
          <h4>{Math.round(stock["01. symbol"])}</h4>
          <p>${stock["05. price"]}</p>
          <p>{stock["10. change percent"]}</p>
        </>
      )}
    </div>
  );
};

export default StockData;
