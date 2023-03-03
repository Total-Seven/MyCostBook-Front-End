<script setup>
// Vue
import { ref, toRaw } from 'vue';
// Store
import { storeToRefs } from 'pinia';
// 组件
import topBackground from '@/components/topBar.vue';
import banner from './cpns/banner.vue';
import photo from './cpns/photo.vue';
import list from './cpns/list.vue'
// 网络+Store
import useCenterStore from '@/stores/modules/center'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
const centerStore = useCenterStore()
const { user_info } = storeToRefs(centerStore)
// 发送网络请求
centerStore.getUserInfos()
const data = ref({})
//专用于子路由更新的路由保安                                                                                              
onBeforeRouteUpdate((to, from) => {
    const component_name = to.path.replace('/', '') // 获取path 与后端属性匹配,动态传递数据给子组件
    data.value = user_info.value[component_name]
})
</script>

<template>
    <div class="center">
        <RouterView :test="data" :picture="user_info.inconFaultAvatar"></RouterView> <!-- 用router-view假装切换页面 -->
        <topBackground />
        <banner />
        <photo />
        <list />
    </div>
</template>

<style lang="less" scoped>
.center {
    position: relative;
}
</style>