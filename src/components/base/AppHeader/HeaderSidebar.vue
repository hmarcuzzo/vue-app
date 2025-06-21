<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";

import { useAppMetadataStore } from "@/stores/appMetadata.store.ts";
import { useAuthStore } from "@/stores/auth.store.ts";

const appMetadataStore = useAppMetadataStore();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const toggleMenuState = () => {
  appMetadataStore.toggleMenuState();
};
</script>

<template>
  <template v-if="isLoggedIn">
    <a-button type="text" size="small" @click="toggleMenuState" class="header-sidebar-btn">
      <transition name="fade-scale">
        <MenuFoldOutlined v-if="appMetadataStore.menuExpanded" key="fold" class="header-sidebar-icon" />
        <MenuUnfoldOutlined v-else key="unfold" class="header-sidebar-icon" />
      </transition>
    </a-button>
  </template>
</template>

<style scoped lang="scss">
.header-sidebar-btn {
  display: flex;
  align-items: center;
  padding: 0;
}

.header-sidebar-icon {
  width: var(--font-size-2xl);
  height: var(--font-size-2xl);
  color: var(--color-text-light);
  display: flex;
  justify-content: center;
}
</style>
