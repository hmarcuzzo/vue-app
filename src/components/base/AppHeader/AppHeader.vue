<script setup lang="ts">
import HeaderLogo from "@/components/base/AppHeader/HeaderLogo.vue";
import HeaderSettings from "@/components/base/AppHeader/HeaderSettings.vue";
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <HeaderLogo></HeaderLogo>

      <ul class="header-links">
        <HeaderSettings></HeaderSettings>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  width: 100%;
  background: var(--color-primary);
  border-bottom: 1px solid var(--color-primary-light);
}

.header-content {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
}

.header-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}
</style>
