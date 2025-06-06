import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import { useAuth } from "@/composables/useAuth";
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

  const { error: authError, refresh } = useAuth();
  try {
    const data = (await refresh()).data;
    authStore.setAuthentication({ token: data.access_token });
    return next();
  } catch {
    console.warn(authError);
  }

  authStore.clearAuthentication();
  next({ name: RoutesName.LOGIN });
};
