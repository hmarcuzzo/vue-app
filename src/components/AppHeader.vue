<script setup lang="ts">
import { SettingOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum.ts";

const router = useRouter();

async function goHome() {
  await router.push({ name: RoutesName.HOME });
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <a-button type="text" class="header-logo" @click="goHome">ERP Identity</a-button>
      <ul class="header-links">
        <a-dropdown trigger="['click']">
          <a-button type="text">
            <template #icon><SettingOutlined /></template>
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item key="login">
                <router-link to="/login">Login</router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  background: var(--color-primary);
  border-bottom: 1px solid var(--color-primary-light);

  .header-content {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1.5rem;

    .header-logo {
      font-weight: var(--font-weight-bold);
      color: #fff;
    }

    .header-links {
      list-style: none;
      display: flex;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
