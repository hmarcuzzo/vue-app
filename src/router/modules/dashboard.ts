import type { RouteRecordRaw } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RoutesName.HOME,
    component: () => import("@/views/Home.vue"),
  },
];
