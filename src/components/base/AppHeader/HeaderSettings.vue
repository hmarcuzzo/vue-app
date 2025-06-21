<script setup lang="ts">
import {
  ArrowRightStartOnRectangleIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  MoonIcon,
  Squares2X2Icon,
  SunIcon,
  UserIcon,
  WindowIcon,
} from "@heroicons/vue/24/outline";
import type { MenuProps } from "ant-design-vue";
import { computed, h, ref } from "vue";

import { ThemeType } from "@/core/constants/enums/themeType.enum";
import { useAppMetadataStore } from "@/stores/appMetadata.store";
import { useAuthStore } from "@/stores/auth.store";

const selectedKeys = ref([]);
const openKeys = ref([]);

const showTooltip = ref(false);
const dropdownOpen = ref(false);

const handleButtonMouseEnter = () => {
  if (!dropdownOpen.value) showTooltip.value = true;
};
const handleButtonMouseLeave = () => {
  showTooltip.value = false;
};
const handleDropdownVisibleChange = (open: boolean) => {
  dropdownOpen.value = open;
  if (open) showTooltip.value = false;
};

const authStore = useAuthStore();
const appMetadataStore = useAppMetadataStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const items = computed(() => [
  ...(isLoggedIn.value ? [{ key: "profile", icon: () => h(UserIcon), label: "Profile", title: "Profile" }] : []),
  {
    key: "theme",
    icon: () => h(Squares2X2Icon),
    label: "Theme",
    title: "Theme",
    expandIcon: () => h(ChevronRightIcon),
    popupClassName: "settings-dropdown-submenu",
    children: [
      { key: "light_theme", icon: () => h(SunIcon), label: "Light", title: "Light" },
      { key: "dark_theme", icon: () => h(MoonIcon), label: "Dark", title: "Dark" },
      { key: "browser_theme", icon: () => h(WindowIcon), label: "Match Browser", title: "Match Browser" },
    ],
  },
  ...(isLoggedIn.value
    ? [
        { type: "divider" },
        { key: "logout", icon: () => h(ArrowRightStartOnRectangleIcon), label: "Logout", title: "Logout" },
      ]
    : []),
]);

const handleClick: MenuProps["onClick"] = async (menuInfo) => {
  switch (menuInfo.key) {
    case "profile":
      alert("Perfil selecionado!");
      break;

    case "light_theme":
      appMetadataStore.setTheme(ThemeType.LIGHT);
      break;

    case "dark_theme":
      appMetadataStore.setTheme(ThemeType.DARK);
      break;

    case "browser_theme":
      appMetadataStore.setTheme(ThemeType.SYSTEM);
      break;

    case "logout":
      alert("Logout realizado!");
      break;
  }
};
</script>

<template>
  <a-dropdown trigger="['click']" overlay-class-name="settings-dropdown" @visibleChange="handleDropdownVisibleChange">
    <a-tooltip title="Settings" :open="showTooltip">
      <a-button
        type="text"
        size="small"
        class="header-settings-btn"
        @mouseenter="handleButtonMouseEnter"
        @mouseleave="handleButtonMouseLeave"
      >
        <template #icon><Cog6ToothIcon class="header-settings-icon" /></template>
      </a-button>
    </a-tooltip>
    <template #overlay>
      <div class="settings-dropdown-overlay">
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :items="items"
          @click="handleClick"
        />
      </div>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.header-settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.header-settings-icon {
  width: var(--font-size-2xl);
  height: var(--font-size-2xl);
  color: var(--color-text-light);
}

.settings-dropdown-overlay {
  min-width: 220px;

  :deep(.ant-dropdown-menu-submenu-title) {
    padding: 5px 18px 5px 12px;
    display: flex;
    align-items: center;
  }
}
</style>

<style lang="scss">
.settings-dropdown,
.settings-dropdown-submenu {
  .ant-dropdown-menu-item-icon,
  .ant-dropdown-menu-submenu-title > svg {
    width: var(--font-size-base);
    height: var(--font-size-base);
  }

  .ant-dropdown-menu-sub {
    min-width: 190px;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
