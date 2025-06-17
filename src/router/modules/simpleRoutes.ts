import type { RouteRecordRaw } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum";

export const simpleRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RoutesName.HOME,
    component: () => import("@/views/Home.vue"),
  },
];
