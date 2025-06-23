<script setup lang="ts">
import HeaderLogo from "@/components/base/AppHeader/HeaderLogo.vue";
import HeaderSettings from "@/components/base/AppHeader/HeaderSettings.vue";
import HeaderSidebar from "@/components/base/AppHeader/HeaderSidebar.vue";
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-left">
        <HeaderSidebar></HeaderSidebar>
        <HeaderLogo></HeaderLogo>
      </div>

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
  position: sticky;
  top: 0;
  z-index: 10;
  height: 40px;
  max-height: 40px;
}

.header-content {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  height: 100%;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}
</style>
