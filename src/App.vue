<script setup>
import tabbar from './components/tabbar.vue';
import Plane from './components/Plane.vue';

import { RouterView, useRoute } from 'vue-router'

// Store
import useLoginStore from '@/stores/modules/login'
import { storeToRefs } from 'pinia';
const loginStore = useLoginStore()
const { isShowPlaneLoading } = storeToRefs(loginStore)
// 路由
const route = useRoute();
</script>

<template>
  <div class="app">
    <Plane v-if="isShowPlaneLoading" />
    <RouterView v-slot="{ Component }">
      <!-- <KeepAlive> -->
      <!-- <component :is="Component" :key="$route.name" v-if="$route.meta.KeepAlive" /> -->
      <!-- </KeepAlive> -->
      <component :is="Component" />
    </RouterView>
    <!--  -->
    <tabbar class="tabbar" v-if="!route.meta.is_hidden_tabbar" />
  </div>
</template>

<style lang="less" scoped>
@first_color: rgba(66.17, 149.81, 143.75, 1);
@second_color: rgba(42.47, 124.31, 118.38, 1);
@third_color: rgb(67, 136, 131);

.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow-x: hidden;
}

.tabbar {
  position: fixed;
  bottom: -15px;
  left: -25px;
  // right: 0;
  z-index: 999;
  // background-color: @first_color;
}
</style>
