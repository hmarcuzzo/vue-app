import { createWebHistory, createRouter, type RouteRecordRaw } from "vue-router";

import { RoutesName } from "@/enums/routes.enum.ts";
import { authGuard } from "@/router/guards";

const routes = [
  {
    path: "/",
    name: RoutesName.HOME,
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: RoutesName.LOGIN,
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: false },
  },
] as Array<RouteRecordRaw>;

export const routerConfig = createRouter({
  history: createWebHistory(),
  routes,
});

// Apply the auth guard
routerConfig.beforeEach(authGuard);
