<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/outline";
import { reactive, watch, computed, h, watchEffect } from "vue";
import { useRouter } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum.ts";
import { useAppMetadataStore } from "@/stores/appMetadata.store.ts";
import { useAuthStore } from "@/stores/auth.store.ts";

const authStore = useAuthStore();
const appMetadataStore = useAppMetadataStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);
const router = useRouter();

const state = reactive({
  selectedKeys: [] as Array<string | symbol>,
  openKeys: [] as Array<string | symbol>,
  preOpenKeys: [] as Array<string | symbol>,
});

const items = reactive([
  {
    key: RoutesName.HOME,
    icon: () => h(HomeIcon),
    label: RoutesName.HOME,
    title: RoutesName.HOME,
  },
]);

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);

watchEffect(() => {
  const currentRoute = router.currentRoute.value;
  state.selectedKeys = [currentRoute.name || ""];

  const selectedKey = state.selectedKeys[0];
  const parentItem = items.find((item) => item.children?.some((child) => child.key === selectedKey));

  if (parentItem) {
    state.openKeys = [parentItem.key];
    state.preOpenKeys = [parentItem.key];
  }
});
</script>

<template>
  <template v-if="isLoggedIn">
    <div class="sidebar-container" :aria-expanded="!appMetadataStore.menuCollapsed">
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :inline-collapsed="appMetadataStore.menuCollapsed"
        :items="items"
      ></a-menu>
    </div>
  </template>
</template>

<style scoped lang="scss">
.sidebar-container {
  position: fixed;
  top: 40px;
  height: calc(100% - 40px);
  width: $expanded-sidebar-width;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 10;
}

.ant-menu {
  min-height: 100%;
}

.sidebar-container[aria-expanded="false"] {
  display: none;
  width: $collapsed-sidebar-width;

  @media (min-width: $breakpoint-desktop-large) {
    display: block;
  }
}

.sidebar-container::-webkit-scrollbar {
  width: 8px;
}

.sidebar-container:hover::-webkit-scrollbar-thumb {
  background-color: var(--color-scrollbar-thumb);
  border-radius: $border-radius-sm;
}
</style>

<style lang="scss">
.sidebar-container {
  .ant-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;

    > svg,
    .ant-menu-item-icon {
      width: var(--font-size-2xl);
      height: var(--font-size-2xl);
    }

    .ant-menu-title-content {
      color: var(--color-text-primary);

      opacity: 1;
      overflow: hidden;
      white-space: nowrap;
      transition:
        opacity 0.2s ease,
        max-width 0.2s ease;
    }
  }

  &[aria-expanded="false"] .ant-menu-item {
    .ant-menu-item-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &[aria-expanded="false"] .ant-menu-title-content {
    max-width: 0;
    opacity: 0;
  }
}
</style>
