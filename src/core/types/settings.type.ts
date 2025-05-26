export interface AppConfig {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
  enableDebugMode: boolean;
}

export type SettingsConfig = AppConfig;
