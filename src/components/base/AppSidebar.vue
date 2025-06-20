<script setup lang="ts">
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import { reactive, watch, h, computed } from "vue";

import { useAppMetadataStore } from "@/stores/appMetadata.store.ts";
import { useAuthStore } from "@/stores/auth.store.ts";

const authStore = useAuthStore();
const appMetadataStore = useAppMetadataStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const state = reactive({
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});

const items = reactive([
  {
    key: "1",
    icon: () => h(PieChartOutlined),
    label: "Option 1",
    title: "Option 1",
  },
  {
    key: "2",
    icon: () => h(DesktopOutlined),
    label: "Option 2",
    title: "Option 2",
  },
  {
    key: "3",
    icon: () => h(InboxOutlined),
    label: "Option 3",
    title: "Option 3",
  },
  {
    key: "sub1",
    icon: () => h(MailOutlined),
    label: "Navigation One",
    title: "Navigation One",
    children: [
      {
        key: "5",
        label: "Option 5",
        title: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
        title: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
        title: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
        title: "Option 8",
      },
    ],
  },
  {
    key: "sub2",
    icon: () => h(AppstoreOutlined),
    label: "Navigation Two",
    title: "Navigation Two",
    children: [
      {
        key: "9",
        label: "Option 9",
        title: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
        title: "Option 10",
      },
      {
        key: "sub3",
        label: "Submenu",
        title: "Submenu",
        children: [
          {
            key: "11",
            label: "Option 11",
            title: "Option 11",
          },
          {
            key: "12",
            label: "Option 12",
            title: "Option 12",
          },
        ],
      },
    ],
  },
]);

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);
</script>

<template>
  <template v-if="isLoggedIn">
    <div class="sidebar-container" :aria-expanded="!appMetadataStore.menuExpanded">
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :inline-collapsed="appMetadataStore.menuExpanded"
        :items="items"
      ></a-menu>
    </div>
  </template>
</template>

<style scoped lang="scss">
.sidebar-container {
  display: flex;
  flex: 0 0 260px;
  transition:
    width 0.2s,
    max-width 0.2s;
}

.sidebar-container[aria-expanded="false"] {
  flex: 0 0 64px;
}
</style>
