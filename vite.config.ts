import { resolve } from "path";
import path from "path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  envDir: path.resolve(__dirname, "./src/core/config/envs"),
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/_index.scss" as *;`,
      },
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
});
