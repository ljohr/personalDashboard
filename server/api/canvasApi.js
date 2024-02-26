import axios from "axios";
import "dotenv/config";

const fetchUpcomingEvents = async () => {
  try {
    const response = await axios.get(
      `https://${process.env.CANVAS_DOMAIN}/api/v1/users/self/todo`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CANVAS_ACCESS_TOKEN}`,
        },
      }
    );

    // Remove tasks from the course I am TAing for
    const filteredTasks = response.data.filter(
      (task) => !task.context_name.includes("CSCI2254")
    );

    const processedTasks = filteredTasks.map((task) => {
      const course = task.context_name;
      const taskTitle = task.assignment.name;
      const dueAt = new Date(task.assignment.due_at);
      const formattedDate = dueAt.toLocaleString("en-US", {
        weekday: "long", // "Monday"
        year: "numeric", // "2024"
        month: "long", // "February"
        day: "numeric", // "26"
        hour: "numeric", // "3 PM" or "15" based on hour12 option
        minute: "numeric", // "00"
        hour12: true, // Use 12-hour time
      });

      return { course, taskTitle, dueDate: formattedDate };
    });
    return processedTasks;
  } catch (error) {
    console.error("Error fetching upcoming events from Canvas API:", error);
  }
};

export default fetchUpcomingEvents;
