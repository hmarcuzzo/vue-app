<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="content">
        <a-typography-text class="copyright">© {{ currentYear }} NexyTech. All rights reserved.</a-typography-text>
        <nav class="links">
          <a-typography-link href="#" target="_blank">Privacy Policy</a-typography-link>
          <a-typography-link href="#" target="_blank">Terms of Service</a-typography-link>
          <a-typography-link href="#" target="_blank">Contact</a-typography-link>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$container-width: 1200px;
$spacing-base: 1rem;

.app-footer {
  background-color: var(--color-bg-grey);
  padding: $spacing-base * 1.5 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: auto;

  span,
  a {
    color: var(--color-text-light);
  }

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

    @media (min-width: $breakpoint-desktop) {
      margin-bottom: 0;
    }
  }

  .links {
    display: flex;
    gap: $spacing-base;

    a {
      transition: all 0.1s ease-in-out;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
