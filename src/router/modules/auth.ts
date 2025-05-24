import type { RouteRecordRaw } from "vue-router";

import { RoutesName } from "@/core/enums/routes.enum.ts";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: RoutesName.LOGIN,
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: false },
  },
];
