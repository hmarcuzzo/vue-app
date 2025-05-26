import type { AppConfig, SettingsConfig } from "@/core/types/settings.type";

const dotEnv = import.meta.env;

const appConfig: AppConfig = {
  appName: dotEnv.VITE_APP_NAME || "My App",
  appVersion: dotEnv.VITE_APP_VERSION || "1.0.0",
  apiBaseUrl: dotEnv.VITE_API_BASE_URL || "",
  enableDebugMode: dotEnv.VITE_ENABLE_DEBUG_MODE === "true",
};

export const settingsConfig: SettingsConfig = { ...appConfig };
