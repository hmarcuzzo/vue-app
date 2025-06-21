<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";

import { useAppMetadataStore } from "@/stores/appMetadata.store.ts";
import { useAuthStore } from "@/stores/auth.store.ts";

const appMetadataStore = useAppMetadataStore();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const toggleCollapsed = () => {
  appMetadataStore.toggleMenuCollapsed();
};
</script>

<template>
  <template v-if="isLoggedIn">
    <a-button type="text" size="small" @click="toggleCollapsed" class="header-menu-btn">
      <transition name="fade-scale">
        <MenuUnfoldOutlined v-if="appMetadataStore.menuCollapsed" key="unfold" class="header-menu-icon" />
        <MenuFoldOutlined v-else key="fold" class="header-menu-icon" />
      </transition>
    </a-button>
  </template>
</template>

<style scoped lang="scss">
.header-menu-btn {
  display: flex;
  align-items: center;
  padding: 0;
}

.header-menu-icon {
  width: var(--font-size-2xl);
  height: var(--font-size-2xl);
  color: var(--color-text-light);
  display: flex;
  justify-content: center;
}
</style>
