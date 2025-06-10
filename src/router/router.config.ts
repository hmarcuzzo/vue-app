import { createWebHistory, createRouter, type RouteRecordRaw } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum";
import { authGuard } from "@/router/guards";
import { authRoutes, dashboardRoutes } from "@/router/modules";

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: "/:pathMatch(.*)*",
    name: RoutesName.NOT_FOUND,
    component: () => import("@/views/NotFound.vue"),
    meta: { requiresAuth: false },
  },
] as Array<RouteRecordRaw>;

export const routerConfig = createRouter({
  history: createWebHistory(),
  routes,
});

// Apply the auth guard
routerConfig.beforeEach(authGuard);
