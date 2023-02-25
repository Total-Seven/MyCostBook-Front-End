<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import topBar from '@/components/topBar.vue';
import banner from './cpns/banner.vue';
import photo from './cpns/photo.vue';
import list from './cpns/list.vue'

// 网络+Store
import useCenterStore from '@/stores/modules/center'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
const centerStore = useCenterStore()
const { user_info } = storeToRefs(centerStore)
centerStore.getUserInfos()

const test = ref({})
//                                                                                              
onBeforeRouteUpdate((to, from) => {
    // 获取path 与后端属性匹配,动态传递数据给子组件
    const component_name = to.path.replace('/', '')
    test.value = user_info.value[component_name]
})

const picture = user_info.value.inconFaultAvatar
</script>

<template>
    <div class="center">
        <!-- 用router-view假装切换页面  注意：没有对应二级路径时，是否显示 -->
        <RouterView :test="test" :picture="picture"></RouterView>
        <topBar />
        <banner />
        <photo />
        <list />
    </div>
</template>

<style lang="less" scoped>
@first_color: rgba(66.17, 149.81, 143.75, 1);
@second_color: rgba(42.47, 124.31, 118.38, 1);

.center {
    position: relative;
}
</style>