import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";

import { routerConfig } from "@/router/router.config";

import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(routerConfig).use(Antd).use(pinia).mount("#app");
