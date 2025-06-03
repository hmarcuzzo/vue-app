<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import { themeConfig } from "@/core/config/theme.config";
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <div class="app-container">
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}
</style>
