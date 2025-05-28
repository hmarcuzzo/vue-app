import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import { RoutesName } from "@/core/enums/routes.enum";
import { tokenUtil } from "@/core/utils/token.util";

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const requiresAuth = !to.matched.some((record) => record.meta.requiresAuth === false);

  if (!requiresAuth) return next();

  const authToken = tokenUtil.getAuthToken();
  if (authToken && tokenUtil.isTokenValid(authToken)) {
    return next();
  }

  const refreshToken = tokenUtil.getRefreshToken();
  if (refreshToken && tokenUtil.isTokenValid(refreshToken)) {
    // try {
    //   const { data } = await AuthService.refresh(refreshToken);
    //   tokenUtil.setTokens(data.token, data.refreshToken, tokenUtil.isKeyInLocalStorage(REFRESH_KEY));
    //   return next();
    // } catch (err) {
    //   console.warn("Token refresh failed: ", err);
    // }
  }

  tokenUtil.clearTokens();
  next({ name: RoutesName.LOGIN });
};
