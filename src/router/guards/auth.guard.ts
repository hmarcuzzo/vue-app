import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import { RoutesName } from "@/enums/routes.enum.js";

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // TODO: Replace this with your actual auth check
  const isAuthenticated = false; // This should be your actual auth check

  if (requiresAuth && !isAuthenticated) {
    next({ name: RoutesName.LOGIN });
  } else {
    next();
  }
};
