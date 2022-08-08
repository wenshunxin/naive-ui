<template>
  <n-layout has-sider class="w_100 h_100">
    <Menu />
    <n-layout class="flex flex_column">
      <n-layout-header style="height: 65px" bordered>
        <Header />
      </n-layout-header>
      <n-layout-content style="height: calc(100vh - 65px)">
        <Main />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup name="layout">
import Menu from "./components/Menu/index.vue";
import Header from "./components/Header/index.vue";
import Main from "./components/Main/index.vue";
</script>

<style></style>
