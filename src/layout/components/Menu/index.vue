<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    show-trigger
    :inverted="inverted"
  >
    <n-menu :inverted="inverted" :collapsed-width="64" :options="menuOptions" />
  </n-layout-sider>
</template>

<script setup name="Menu">
import { ref, computed, h } from "vue";
import { NIcon } from "naive-ui";
import { useSettingsStore } from "@/store/settings";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
} from "@vicons/ionicons5";
const settingsStore = useSettingsStore();
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const inverted = computed(() => settingsStore.appTheme == "darkTheme");
const menuOptions = ref([
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    icon: renderIcon(BookIcon),
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    icon: renderIcon(PersonIcon),
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    icon: renderIcon(WineIcon),
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(HomeIcon),
  },
]);
</script>

<style></style>
