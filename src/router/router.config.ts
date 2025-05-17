import { createWebHistory, createRouter, type RouteRecordRaw } from "vue-router";

import { authGuard } from "@/router/guards";
import { authRoutes, dashboardRoutes } from "@/router/modules";

const routes = [...authRoutes, ...dashboardRoutes] as Array<RouteRecordRaw>;

export const routerConfig = createRouter({
  history: createWebHistory(),
  routes,
});

// Apply the auth guard
routerConfig.beforeEach(authGuard);
