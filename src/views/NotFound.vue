<script setup lang="ts">
import { useRouter } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum";

const router = useRouter();

async function goHome() {
  await router.push({ name: RoutesName.HOME });
}
</script>

<template>
  <div class="not-found-container">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a-button type="primary" @click="goHome">Back Home</a-button>
      </template>
    </a-result>
  </div>
</template>

<style scoped lang="scss">
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
