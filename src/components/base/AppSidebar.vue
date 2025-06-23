<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/outline";
import { reactive, watch, h, computed } from "vue";

import { useAppMetadataStore } from "@/stores/appMetadata.store.ts";
import { useAuthStore } from "@/stores/auth.store.ts";

const authStore = useAuthStore();
const appMetadataStore = useAppMetadataStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const state = reactive({
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});

const items = reactive([
  {
    key: "home",
    icon: () => h(HomeIcon),
    label: "Home",
    title: "Home",
  },
]);

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);
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

    > svg {
      width: var(--font-size-2xl);
      height: var(--font-size-2xl);
    }
  }

  .ant-menu-title-content {
    color: var(--color-text-primary);
  }
}
</style>
