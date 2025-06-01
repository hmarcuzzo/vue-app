import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import AuthService from "@/apis/auth.service.ts";
import { RoutesName } from "@/core/enums/routes.enum";
import { useAuthStore } from "@/stores/auth.store";

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const requiresAuth = !to.matched.some((record) => record.meta.requiresAuth === false);
  const authStore = useAuthStore();

  if (!requiresAuth) return next();

  if (authStore.token && authStore.isAuthenticated) {
    return next();
  }

  try {
    const data = (await AuthService.refresh()).data;
    authStore.setAuthentication({ token: data.access_token });
    return next();
  } catch (err) {
    console.warn("Token refresh failed: ", err);
  }

  authStore.clearAuthentication();
  next({ name: RoutesName.LOGIN });
};
