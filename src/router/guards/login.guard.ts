import { type NavigationGuardNext, type RouteLocationNormalized, useRouter } from "vue-router";

import { RoutesName } from "@/core/enums/routes.enum";
import { useAuthStore } from "@/stores/auth.store";

export const loginGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.token) return next();

  if (from.name) {
    next(false);
    router.back();
  } else {
    next({ name: RoutesName.HOME });
  }
};
