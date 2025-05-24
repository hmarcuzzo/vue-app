import type { ThemeConfig } from "ant-design-vue/es/config-provider/context";

import colours from "@/assets/modules/_colours.module.scss";
import typography from "@/assets/modules/_typography.module.scss";

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: colours.colorPrimary,
    colorSuccess: colours.colorSuccess,
    colorWarning: colours.colorWarning,
    colorError: colours.colorError,
    colorInfo: colours.colorInfo,
    colorTextBase: colours.colorTextPrimary,
    colorTextSecondary: colours.colorTextMuted,
    colorBgBase: colours.colorBgPrimary,
    colorBgContainer: colours.colorBgPrimary,
    colorBorder: colours.colorBorder,
    fontFamily: typography.fontFamily,
  },
};
