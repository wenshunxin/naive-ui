<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="" mode="out-in" appear>
        <!-- <keep-alive
          v-if="keepAliveComponents"
          :includes="[]"
          :key="route.fullPath"
        >
          <component :is="Component" :key="route.fullPath"></component>
        </keep-alive> -->
        <component :is="Component" :key="route.fullPath"></component>
      </transition>
    </template>
  </router-view>
</template>

<script setup name="MainView">
import { ref } from "vue";
import { useProjectSetting } from "@/hooks/setting/useProjectSetting";

const keepAliveComponents = ref([]);
</script>

<style></style>
