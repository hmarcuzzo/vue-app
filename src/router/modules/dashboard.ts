import type { RouteRecordRaw } from "vue-router";

import { RoutesName } from "@/enums/routes.enum.ts";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RoutesName.HOME,
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },
];
