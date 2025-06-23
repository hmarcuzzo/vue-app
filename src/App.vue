<script setup lang="ts">
import { useThemeConfig } from "@/core/config/theme.config";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useAppMetadataStore } from "@/stores/appMetadata.store";

const appMetadataStore = useAppMetadataStore();
appMetadataStore.initAppMetadata();

const { themeConfig } = useThemeConfig();
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <DefaultLayout />
  </a-config-provider>
</template>

<style lang="scss">
@use "@/assets/scss/index" as *;
</style>
