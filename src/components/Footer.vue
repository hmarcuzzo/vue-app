<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <p class="copyright">© {{ currentYear }} NexyTech. All rights reserved.</p>
        <nav class="links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$footer-bg: #1f2937;
$footer-text: white;
$footer-hover: #fcd34d;
$container-width: 1200px;
$spacing-base: 1rem;

.footer {
  background-color: $footer-bg;
  color: $footer-text;
  padding: $spacing-base * 1.5 0;
  margin-top: auto;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

  .container {
    width: 100%;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-base;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media (min-width: $breakpoint-desktop) {
      flex-direction: row;
    }
  }

  .copyright {
    margin-bottom: $spacing-base;
    font-size: 0.875rem;

    @media (min-width: $breakpoint-desktop) {
      margin-bottom: 0;
    }
  }

  .links {
    display: flex;
    gap: $spacing-base;

    a {
      transition: color 0.1s ease-in-out;
      color: $footer-text;

      &:hover {
        color: $footer-hover;
      }
    }
  }
}
</style>
