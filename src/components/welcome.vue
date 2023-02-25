<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const isthree = ref(false)
setTimeout(() => {
    isthree.value = false
    // router.push({
    //     path: '/register'
    // })
}, 3000)
</script>

<template>
    <div class="login" v-if="isthree">
    </div>
</template>

<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-image: url(@/assets/img/Common/Snipaste_2023-02-11_21-28-28.png);
    background-size: 100% 100%;
    position: relative;
    z-index: 9999;
}
</style>