import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import styles from "./Quotes.module.css";

const Quotes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("api/quotes");
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  if (loading) return <></>;
  if (error) return <h2>Error Loading Data</h2>;

  return (
    <section className={styles.quotesSection}>
      <h2>Quote of the Day</h2>
      <p className={styles.quoteContent}>{quote}</p>
      <p>{author}</p>
    </section>
  );
};

export default Quotes;
