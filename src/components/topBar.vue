<script setup>
</script>

<template>
    <div class="topbar">
        <img src="../assets/img/Common/common_Top.svg" alt="">
        <div class="circle">
            <img src="../assets/img/Common/common_circle.png" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.topbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    img {
        width: 100vw;
    }

    .circle {
        img {
            /* Group 6 */
            position: absolute;
            width: 267px;
            height: 219px;
            top: -30px;
            left: -70px;
        }
    }
}
</style>