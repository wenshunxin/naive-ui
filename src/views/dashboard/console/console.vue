<template>
  <div class="w_100 h_100">
    <div id="map" class="w_100 h_100" ref="map"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { handleInitMap } from "./map";
import { getFarmInfo } from "@/api/map";
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();

const collapsed = computed(() => settingsStore.collapsed);
watch([collapsed], (collapse) => {
  console.log("走了吗", collapse);
  map.value.updateSize();
});

const map = ref(null);
onMounted(async () => {
  map.value = await handleInitMap();
  console.log(map.value);
});
</script>
