import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/_index.scss" as *;`,
      },
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
});
