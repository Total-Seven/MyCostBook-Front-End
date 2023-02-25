<script setup>
import { ref, } from 'vue'
</script>

<template>
    <div class="logOut-bg">
        <div class="logOut">
            <span>logOut</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.logOut-bg {
    position: fixed;
    z-index: 9;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);

    .logOut {
        position: fixed;
        width: 70vw;
        height: 30vh;
        background-color: pink;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-weight: 550;
            font-size: 20px;
        }
    }
}
</style>