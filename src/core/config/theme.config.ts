import { theme } from "ant-design-vue";
import type { ThemeConfig } from "ant-design-vue/es/config-provider/context";
import { computed } from "vue";

import { getCssVar } from "@/core/utils/dom.util";
import { useAppMetadataStore } from "@/stores/appMetadata.store";

export const useThemeConfig = () => {
  const appMetadataStore = useAppMetadataStore();

  const themeConfig = computed<ThemeConfig>(() => {
    return {
      algorithm: appMetadataStore.isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: getCssVar("--color-primary"),
        colorSuccess: getCssVar("--color-success"),
        colorWarning: getCssVar("--color-warning"),
        colorError: getCssVar("--color-error"),
        colorInfo: getCssVar("--color-info"),
        colorTextBase: getCssVar("--color-text-primary"),
        colorTextSecondary: getCssVar("--color-text-muted"),
        colorBgBase: getCssVar("--color-bg-primary"),
        colorBgContainer: getCssVar("--color-bg-primary"),
        colorBorder: getCssVar("--color-border"),
        fontFamily: getCssVar("--font-family-base"),
      },
    };
  });

  return { themeConfig };
};
