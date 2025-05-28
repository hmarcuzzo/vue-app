import { type NavigationGuardNext, type RouteLocationNormalized, useRouter } from "vue-router";

import { RoutesName } from "@/core/enums/routes.enum";
import { tokenUtil } from "@/core/utils/token.util";

export const loginGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = tokenUtil.getAuthToken() || tokenUtil.getRefreshToken();
  const router = useRouter();

  if (!token) return next();

  if (from.name) {
    next(false);
    router.back();
  } else {
    next({ name: RoutesName.HOME });
  }
};
