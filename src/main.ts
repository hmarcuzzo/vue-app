import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";

import { routerConfig } from "@/router/router.config";

import App from "./App.vue";

const pinia = createPinia();

createApp(App).use(routerConfig).use(Antd).use(pinia).mount("#app");
