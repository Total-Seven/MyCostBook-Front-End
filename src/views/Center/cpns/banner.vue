<script setup>
import banner from '@/components/banner.vue';
</script>

<template>
    <div class="center_banner">
        <banner>
            <template #left>
                <span></span>
            </template>
            <template #middle>
                <span>Profile</span>
            </template>
            <template #right>
                <div class="inner">
                    <img class="calendar" src="@/assets/img/Profile_Center/calendar.svg" alt="">
                </div>
            </template>
        </banner>
    </div>
</template>

<style lang="less" scoped>
.center_banner {
    .inner {
        padding: 8px;
        border-radius: 20px;
        background-color: rgba(215, 215, 215, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img.calendar {
        width: 20px;
        height: 20px;
        position: relative;
    }
}
</style>