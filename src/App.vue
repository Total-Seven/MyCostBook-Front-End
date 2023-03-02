<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router';
import login from '@/components/welcome.vue'
import tabbar from './components/tabbar.vue';
const route = useRoute();
</script>

<template>
  <div class="app">
    <login />
    <RouterView />
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
