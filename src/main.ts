import Antd from "ant-design-vue";
import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";

import { routerConfig } from "@/router/router.config.ts";

import App from "./App.vue";

createApp(App).use(routerConfig).use(Antd).mount("#app");
