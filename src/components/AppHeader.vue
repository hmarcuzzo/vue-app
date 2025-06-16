<script setup lang="ts">
import { UserOutlined, SettingOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

import { RoutesName } from "@/core/constants/enums/routes.enum.ts";

const router = useRouter();

const showProfile = true;

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
          <a-button type="text" class="header-settings-btn">
            <template #icon><SettingOutlined class="header-settings-icon" /></template>
          </a-button>
          <template #overlay>
            <div class="custom-dropdown-overlay">
              <a-menu>
                <template v-if="showProfile">
                  <a-menu-item key="login" title="Login">
                    <template #icon>
                      <UserOutlined style="margin-right: 8px" />
                    </template>
                    Login
                  </a-menu-item>
                  <a-menu-divider />
                </template>

                <a-sub-menu key="theme" title="Theme">
                  <template #icon>
                    <UserOutlined style="margin-right: 8px" />
                  </template>

                  <a-menu-item key="light">
                    <template #icon>
                      <UserOutlined style="margin-right: 8px" />
                    </template>
                    Light
                  </a-menu-item>
                  <a-menu-item key="dark">
                    <template #icon>
                      <UserOutlined style="margin-right: 8px" />
                    </template>
                    Dark
                  </a-menu-item>
                  <a-menu-item key="browser">
                    <template #icon>
                      <UserOutlined style="margin-right: 8px" />
                    </template>
                    Browser
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div>
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
}

.header-content {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
}

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

.header-settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.header-settings-icon {
  color: var(--color-text-light);
  font-size: var(--font-size-xl);
}
</style>
