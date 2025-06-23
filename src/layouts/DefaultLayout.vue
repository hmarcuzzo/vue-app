<script setup lang="ts">
import AppFooter from "@/components/base/AppFooter.vue";
import AppHeader from "@/components/base/AppHeader/AppHeader.vue";
import AppSidebar from "@/components/base/AppSidebar.vue";
</script>

<template>
  <div class="app-container">
    <AppHeader />

    <AppSidebar />
    <main class="main-layout">
      <div class="main-content">
        <router-view />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  flex: 1 1 auto;
  margin-left: 0;
}

.main-content {
  flex: 1;
  margin: 48px 24px;
}

@media (min-width: $breakpoint-desktop-large) {
  .app-container:has(.sidebar-container[aria-expanded="false"]) .main-layout {
    margin-left: calc($collapsed-sidebar-width - 8px);
  }

  .app-container:has(.sidebar-container[aria-expanded="true"]) .main-layout {
    margin-left: $expanded-sidebar-width;
  }
}
</style>
