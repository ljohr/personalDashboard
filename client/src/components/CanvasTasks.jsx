import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./CanvasTasks.module.css";

const CanvasTasks = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchCanvasTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("api/canvas-tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCanvasTasks();
  }, [fetchCanvasTasks]);

  if (loading) return <></>;
  if (error) return <h2>Error Loading Data</h2>;

  return (
    <section className={styles.canvasSection}>
      <h2>Canvas Tasks</h2>
      <div className={styles.canvasInner}>
        {tasks.map((task, index) => {
          return (
            <div key={index} className={styles.taskSingle}>
              <h4>{task.course}</h4>
              <p>{task.taskTitle}</p>
              <p>{task.dueDate}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CanvasTasks;
