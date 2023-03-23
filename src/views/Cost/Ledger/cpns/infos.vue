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
        <div class="info save"><span style="font-size: 16px;">SaveMoney</span><span style="font-weight: 600;">￥{{
            total_infos.SaveMoney }}</span>
        </div>
        <div class="info budget"><span style="font-size: 16px;">Budget</span><span style="font-weight: 600;"> ￥{{
            total_infos.budget }}</span></div>
    </div>
</template>

<style lang="less" scoped>
.infos {
    position: relative;
    top: 10px;
    z-index: 2;
    width: 150px;
    margin-left: 20px;
    font-size: 18px;
    line-height: 26px;

    .info {
        margin-top: 3px;
    }

    .surplus {
        font-size: 20px;
        line-height: 30px;

        span {
            font-size: 22px;
            font-weight: 800;
        }
    }
}
</style>