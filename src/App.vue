<script setup lang="ts">
import Footer from "@/components/Footer";
import { themeConfig } from "@/core/config/theme.config";
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <div class="app-container">
      <main>
        <router-view />
      </main>
      <Footer />
    </div>
  </a-config-provider>
</template>

<style lang="scss">
@use "@/assets/_index" as *;

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}
</style>
