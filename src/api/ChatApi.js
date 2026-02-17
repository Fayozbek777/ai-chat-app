// 📂src/api/ChatApi.js
import axios from "axios";

let isWaiting = false;

export const sendMessageToAI = async (message) => {
  if (isWaiting) return "Подождите, AI обрабатывает предыдущий запрос.";
  isWaiting = true;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
      },
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error.response?.status, error.message);
    return "AI недоступен. Попробуй через минуту или проверь ключ.";
  } finally {
    isWaiting = false;
  }
};
