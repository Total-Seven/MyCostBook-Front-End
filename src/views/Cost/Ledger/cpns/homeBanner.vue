<script setup>
import bannerVue from '@/components/banner.vue';

</script>

<template>
    <div class="banner">
        <bannerVue>
            <template #left>
                <div class='text'>
                    <img src="@/assets/img/home/sharpicons_Rabbit.svg" alt="">
                    <span>Little-Rabbit</span>
                </div>
            </template>
        </bannerVue>
    </div>
</template>

<style lang="less" scoped>
.banner {
    top: 25px;

    .text {
        display: flex;
        font-size: 16px;
        line-height: 32px;
        width: 135px;

        img {
            position: relative;
            display: block;
            width: 30px;
            height: 30px;
        }

        span {
            margin-left: 10px;
        }
    }


}
</style>