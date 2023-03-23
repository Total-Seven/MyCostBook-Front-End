<script setup>
// Vue
import { toRaw, defineEmits, computed } from 'vue';
// Utils
import { createURLObj } from '@/utils';
// 组件
import empty from '@/components/empty.vue'
// Vant
import { showSuccessToast } from 'vant'
import 'vant/es/toast/style'
// Router
import { useRouter } from 'vue-router';
// Store 
import { storeToRefs } from 'pinia';
import useLoginStore from '@/stores/modules/login';
import useCostStore from '@/stores/modules/cost';
const loginStore = useLoginStore()
const costStore = useCostStore()
const { plan_list } = storeToRefs(loginStore)
const { del_plan_info } = storeToRefs(costStore)
// 
const emit = defineEmits(["CreatePlan"])
// 
const router = useRouter()
// 
const isEmpty = computed(() => {
    if (Object.prototype.toString.call(plan_list.value) == '[object Array]' && plan_list.value.length === 0) return true
    else return false
})

// 
function getUrl(img) {
    return new URL(`../../../../assets/img/home/SavePlan/${img}`, import.meta.url).href
}
function toPercent(point) {
    var str = Number(point * 100).toFixed(1);
    // str += "%";
    return str;
}
// 
function clickPlan_Item(item, index) {
    console.log(toRaw(item), index);
    // /plan_detail/:id/name/:name
    router.push({
        path: '/plan_detail',
        name: '计划详情',
        query: {
            id: item.id,
            name: item.name,
            period: item.period,
            start_date: item.start_date,
            'end-date': item['end-date'],
            daily_money: item.daily_money,
            target_money: item.target_money,
            saved_money: item.saved_money,
            picture: item.picture,
            light_number: item.saved_money / item.daily_money,
        }
    })
}

function click() {
    console.log('click');
    emit("CreatePlan")
}
function Del_Plan_Item(item) {
    console.log(item);
    del_plan_info.value = createURLObj({ id: item.id })
    costStore.post_del_plan().then(data => {
        console.log(data);
        const target_index = plan_list.value.findIndex(el => {
            return el.id == data
        })
        plan_list.value.splice(target_index, 1)
        console.log('target_index:', target_index);
        showSuccessToast('成功删除');
    })
}
</script>

<template>
    <div class="planList">
        <div class="title">
            <div class="left">
                <span>SaveMoney Plan</span>
                <van-icon name=" arrow" />
            </div>
            <div class="right">
                <van-icon @click="click" name="smile" color="rgba(66.17, 149.81, 143.75, 1) " size="2rem" />
            </div>
        </div>
        <div v-if="!isEmpty" class="list">
            <template v-for="(item, index) in plan_list">
                <van-swipe-cell>
                    <div class="item" @click="clickPlan_Item(item, index)">
                        <div class="icon">
                            <img src="@/assets/img/home/SavePlan/coffee.svg" alt="">
                        </div>
                        <div class="content">
                            <div class="ctx top">
                                <span class="left">{{ item.name }}</span>
                                <span class="top_right"><span>{{ item.period }} Day</span></span>
                            </div>
                            <div class="ctx middle">
                                <span class="current">deposited ￥{{ item.saved_money }}</span>
                                <span class="total">￥{{ item.target_money }}</span>
                            </div>
                            <div class=" ctx foot">
                                <div class="progress">
                                    <van-progress :percentage="toPercent(item.saved_money / item.target_money)"
                                        color="linear-gradient(to right,#42958F,#7AC5CD)" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <van-button @click="Del_Plan_Item(item)" style="margin-left: 12px;height:100%;border-radius: 18px;"
                            square type="danger" text="Delete" />
                        <van-button style="margin-left: 4px;height:100%;border-radius: 18px;" color="#30827c" square
                            type="primary" text="Modify" />
                    </template>
                </van-swipe-cell>
            </template>
        </div>
        <empty v-if="isEmpty">
        </empty>
    </div>
</template>

<style lang="less" scoped>
.planList {
    width: 370px;
    height: 50vh;
    position: absolute;
    top: 350px;
    color: black;
    padding: 22px;
    margin-bottom: 80px;
    display: grid;
    grid-template-rows: .15fr 1fr;

    .title {
        font-size: 18px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
        margin-bottom: 10px;

        .left {
            span {
                margin-right: 10px;
            }
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        margin-bottom: 60px;

        .item {
            display: flex;
            margin-bottom: 20px;

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 65px;
                height: 65px;
                background-color: #c7bdbd;
                border-radius: 15px;

                img {
                    display: block;
                    width: 40px;
                    height: 40px
                }
            }

            .content {
                margin-left: 10px;
                width: 300px;

                .ctx {
                    margin-bottom: 6px;
                }

                .top {
                    font-size: 15px;
                    display: flex;
                    justify-content: space-between;

                    .top_right {
                        padding: 0 4px 0;
                        background-color: rgba(235, 67, 67, 0.4);
                        border-radius: 6px;

                        span {
                            font-size: 12px;
                            line-height: 18px;
                        }
                    }
                }

                .middle {
                    display: flex;
                    justify-content: space-between;
                    display: flex;

                    .current {
                        font-size: 12px;
                        color: var(--second--color)
                    }

                    .total {
                        font-weight: 900;
                        color: rgba(235, 67, 67, 0.797);
                        font-size: 16px;
                    }
                }

                .foot {
                    padding-top: 8px;
                    display: flex;
                    justify-content: space-between;

                    .progress {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>