<script setup lang="ts">
import { useRouter } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum";

const router = useRouter();

async function goHome() {
  await router.push({ name: RoutesName.HOME });
}
</script>

<template>
  <a-button type="text" size="small" class="header-logo" @click="goHome">ERP Identity</a-button>
</template>

<style scoped lang="scss">
.header-logo {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-light);
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    color: var(--color-text-light);
  }

  :deep(span) {
    font-size: var(--font-size-xl);
  }
}
</style>
