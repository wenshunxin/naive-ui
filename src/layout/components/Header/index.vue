<template>
  <div>
    <n-switch
      v-model:value="active"
      @update:value="settingsStore.setAppTheme"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const active = ref(settingsStore.appTheme == "darkTheme");
</script>
