<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__copyright">
          <p class="footer__text">{{ currentYear }} NexyTech. All rights reserved.</p>
        </div>
        <div class="footer__links">
          <a href="#" class="footer__link">Privacy Policy</a>
          <a href="#" class="footer__link">Terms of Service</a>
          <a href="#" class="footer__link">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import "@/assets/css/index.css";

.footer {
  @apply bg-gray-800 text-white py-6 mt-auto shadow-[0_-2px_4px_rgba(0,0,0,0.1)];
}

.footer__container {
  @apply container mx-auto px-4;
}

.footer__content {
  @apply flex flex-col md:flex-row justify-between items-center;
}

.footer__copyright {
  @apply mb-4 md:mb-0;
}

.footer__text {
  @apply text-sm;
}

.footer__links {
  @apply flex space-x-4;
}

.footer__link {
  @apply transition-colors
      duration-100
      ease-in-out
      hover:text-gray-300;
}
</style>
