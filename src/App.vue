<template>
  <n-config-provider :theme="appTheme" :theme-overrides="getThemeOverrides">
    <router-view />
  </n-config-provider>
</template>
<script setup>
import { ref, computed } from "vue";
import { NConfigProvider, darkTheme, lightTheme } from "naive-ui";
import Layout from "@/layout/index.vue";
import { useSettingsStore } from "@/store/settings";
import { useProjectSetting } from "@/hooks/setting/useProjectSetting.js";

const { getNavTheme } = useProjectSetting();

const settingsStore = useSettingsStore();
const appTheme = computed(() =>
  settingsStore.appTheme == "darkTheme" ? darkTheme : lightTheme
);
const getThemeOverrides = computed(() => {
  return {
    common: {
      primaryColor: settingsStore.primaryColor,
    },
  };
});
</script>
<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  & > div {
    height: 100%;
    & > div {
      height: 100%;
    }
  }
}
</style>
