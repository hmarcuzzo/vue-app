import axios from "axios";

import { settingsConfig } from "@/core/config/settings.config.ts";

const client = axios.create({
  baseURL: settingsConfig.apiBaseUrl,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

export default client;
