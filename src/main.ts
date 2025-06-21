import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";

import { routerConfig } from "@/router/router.config";
import { useAuthStore } from "@/stores/auth.store";

import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(routerConfig);
app.use(pinia);
app.use(Antd);

const authStore = useAuthStore();
await authStore.ensureAuth();

app.mount("#app");
