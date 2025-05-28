import Antd from "ant-design-vue";
import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";

import App from "@/App";
import { routerConfig } from "@/router/router.config";

createApp(App).use(routerConfig).use(Antd).mount("#app");
