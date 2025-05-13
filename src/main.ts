import { createApp } from "vue";

import { routerConfig } from "@/router/router.config.ts";

import App from "./App.vue";

// Tailwind CSS
// import "@/assets/css/index.css";

// Global CSS
// import "@/assets/scss/_index.scss";

createApp(App).use(routerConfig).mount("#app");
