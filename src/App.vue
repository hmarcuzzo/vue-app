<script setup lang="ts">
import AppFooter from "@/components/base/AppFooter.vue";
import AppHeader from "@/components/base/AppHeader/AppHeader.vue";
import AppSidebar from "@/components/base/AppSidebar.vue";
import { useThemeConfig } from "@/core/config/theme.config";
import { useAppMetadataStore } from "@/stores/appMetadata.store";

const appMetadataStore = useAppMetadataStore();
appMetadataStore.initAppMetadata();

const { themeConfig } = useThemeConfig();
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <div class="app-container">
      <AppHeader />
      <main class="main-layout">
        <AppSidebar />
        <div class="main-content">
          <router-view />
        </div>
      </main>
      <AppFooter />
    </div>
  </a-config-provider>
</template>

<style lang="scss">
@use "@/assets/scss/index" as *;

.app-container {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  flex: 1 1 auto;
}

.main-content {
  flex: 1;
  margin: 24px 24px 48px 24px;
  //overflow-y: auto;
  //scrollbar-width: none;
}
</style>
