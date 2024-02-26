import axios from "axios";

const fetchQuotes = async () => {
  try {
    const response = await axios.get(
      "https://api.quotable.io/quotes/random?maxLength=120&tags=happiness|wisdom|wellness|virtue|success|self-help|self|proverb|power-quotes|perseverance|opportunity|motivational|life|leadership|knowledge|inspirational|imagination|gratitutde|generosity|future|friendship|family|failure|ethics|courage|character|change"
    );
    const quotes = response.data[0];
    return quotes;
  } catch (error) {
    console.log(error);
  }
};

fetchQuotes();

export default fetchQuotes;
