<script setup lang="ts">
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="app-container">
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
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
