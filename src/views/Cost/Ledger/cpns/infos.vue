<script setup>
defineProps({
    total_infos: {
        type: Object,
        default: () => { }
    }
})
</script>

<template>
    <div class="infos">
        <div class="info surplus">
            <div>Surplus</div>
            <span>￥{{ total_infos.surplus.net }}</span>
        </div>
        <div class="info save"><span>SaveMoney</span><span>￥{{ total_infos.SaveMoney }}</span></div>
        <div class="info budget"><span>Budget</span><span> ￥{{ total_infos.budget }}</span></div>
    </div>
</template>

<style lang="less" scoped>
.infos {
    position: relative;
    top: 30px;
    z-index: 2;
    width: 150px;
    margin-left: 20px;
    font-size: 16px;
    line-height: 26px;

    .info {
        margin-top: 3px;
    }

    .surplus {
        span {
            // margin-top: 22px;
            font-size: 20px;
            font-weight: 800;
        }
    }
}
</style>