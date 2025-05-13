<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer bg-gray-800 text-white py-6 mt-auto">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-sm">{{ currentYear }} NexyTech. All rights reserved.</p>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="footer__link">Privacy Policy</a>
          <a href="#" class="footer__link">Terms of Service</a>
          <a href="#" class="footer__link">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@reference "@/assets/css/index.css";

.footer {
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  &__link {
    @apply transition-colors;

    &:hover {
      @apply text-gray-300;
    }
  }
}
</style>
