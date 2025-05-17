import { createApp } from "vue";

import { routerConfig } from "@/router/router.config.ts";

import App from "./App.vue";

createApp(App).use(routerConfig).mount("#app");
