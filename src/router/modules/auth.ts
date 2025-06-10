import type { RouteRecordRaw } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum";
import { loginGuard } from "@/router/guards";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: RoutesName.LOGIN,
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: false },
    beforeEnter: loginGuard,
  },
];
