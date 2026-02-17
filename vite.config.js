// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Включаем Babel с поддержкой TypeScript даже для .jsx файлов
      babel: {
        presets: [
          "@babel/preset-typescript", // ← это ключевая строка
        ],
        // Опционально: можно добавить другие плагины, если нужно
        // plugins: [...]
      },
    }),
  ],
});
