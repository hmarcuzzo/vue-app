<script setup lang="ts">
import AppFooter from "@/components/base/AppFooter.vue";
import AppHeader from "@/components/base/AppHeader/AppHeader.vue";
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
      <main>
        <router-view />
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
  background-color: var(--color-bg-primary);
}
</style>
