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
$container-width: 1200px;
$spacing-base: 1rem;

.footer {
  font-size: var(--font-size-base);

  background-color: var(--color-bg-grey);
  color: var(--color-text-light);
  padding: $spacing-base * 1.5 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

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
      color: var(--color-text-light);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
