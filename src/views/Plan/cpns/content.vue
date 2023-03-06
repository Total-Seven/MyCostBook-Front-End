<script setup>
import { move } from '@antfu/utils';
import { is } from '@babel/types';
import { ref, reactive, watch, onMounted } from 'vue';
const Ref_content = ref()


const isShowLis = ref(false)
const arrow_down = '15px'

const shopping_list = ref([
    { isShow: false, goodsList: [{ name: '臭袜子', amount: 88, checked: false }, { name: '钵钵鸡', amount: 88, checked: false }, { name: '旅游', amount: 88, checked: false }, { name: '+', amount: 88, checked: false, isAddBtn: true }] },
    { isShow: false, goodsList: [{ name: '吃火锅', amount: 77, checked: false }, { name: 'DUnk', amount: 88, checked: false }, { name: '+', amount: 88, checked: false, isAddBtn: true }] },
    { isShow: false, goodsList: [{ name: '衣服', amount: 66, checked: false }, { name: '+', amount: 88, checked: false, isAddBtn: true }] }
])
// Touch事件
// ********
let targetDom = {}
// ********
const visualHeight = document.documentElement.clientHeight           // 视口高度
let isUp = true    //上拉
let isDown = false  //下拉
let start_y = ref()      //初始位置y
let moveY = ref()

// ********
const ideal = {
    start_top: 0,    //初始list距离视口顶部的高度
    current_y: 0,    //当前list距离视口顶部的高度
    start_bottom: 0,  //初始bottom
    excess_top(height) {
        const bottom = targetDom.getBoundingClientRect().bottom
        return bottom <= height
    },
    excess_bottom(height) {
        const top = targetDom.getBoundingClientRect().top
        return top >= height
    },
    redirecte() {
        // 判断是否到达终点，并修改方向
        if (this.excess_top(visualHeight - 35)) {
            isDown = true
            isUp = false
            this.current_y = targetDom.getBoundingClientRect().top
            console.log('到顶时距离视口高度：', this.current_y);
            console.log('到顶了:开始向下', isDown);
        } else if (this.excess_bottom(this.start_top)) {
            isDown = false
            isUp = true
            console.log('到底:开始向上', isUp);
        }
    },
    isfinish: false,  //是否达到理想位置
    edit_finish(distance, standard) {
        const promise = new Promise((resolve, reject) => {
            if (distance > visualHeight * standard) {
                resolve()
            } else {
                reject()
            }
        })
        return promise
        // 上拉的距离 > 可视窗口高度*标准 ？ 改写finish标识为true ： 改写为false .
    },

    autoScroll() {
        const promise = new Promise((resolve, reject) => {
            if (this.isfinish) resolve()
            else reject()
        })
        return promise
    },
    scrollTo() {
        if (isUp) {
            this.ScrolltoTop('-70%')
            console.log(`当前距离${ideal.isfinish}超过20%,且方向${isUp}为isUp,已自动跳转至最高处`);
        } else if (isDown) {
            this.ScrolltoBottom(0)
            console.log(`当前距离${ideal.isfinish}超过20%,且方向${isDown}为isDown,已自动跳转至最低处`);
        }
    },
    ScrolltoTop(autoDestination) {
        const text = `overflow-y:auto;transform: translate(${0}px, ${autoDestination});transition:transform;transition-duration: 0.5s;transition-timing-function: ease-out;`
        targetDom.style.cssText = text;
    },
    ScrolltoBottom(autoDestination) {
        const text = `overflow-y:auto;transform: translate(${0}px, ${autoDestination});transition:transform;transition-duration: 0.5s;transition-timing-function: ease-out;`
        targetDom.style.cssText = text;
    },
}
// ********
function handlerMounted() {
    // 基础：
    // 处理目标元素的初始信息：位置等
    targetDom = Ref_content.value                                // 实例

    // Ideal
    // 可删
    ideal.start_top = Math.floor(targetDom.getBoundingClientRect().top)    // 距离视口顶部的高度
    ideal.start_bottom = Math.floor(targetDom.getBoundingClientRect().bottom)    // 距离视口顶部的高度
}
onMounted(handlerMounted)


function handleTouchstart(e) { // 开始拖拽
    console.log('start');
    // 基础：
    targetDom.style['overflow-y'] = 'hidden'      // 点击时，List不可滑动       
    const click_y = e.targetTouches[0].clientY
    if (click_y && start_y.value == undefined) {
        start_y.value = click_y
    }
    // ideal--可删
    else {
        ideal.current_y = click_y
    }
}
function handleTouchmove(e) { // 拖拽中
    // Ideal 
    // 可删
    if (isUp) {
        // 判断是否超出顶部，是则改isUp为false  然后return
        if (ideal.excess_top(visualHeight - 35) == true) return
    } else if (isUp == false) {
        // 判断是否超出，是则改isUp为true   然后return
        if (ideal.excess_bottom(ideal.start_top) == true) return
    }
    // 基础：
    // 正常的话，位移
    let realTimeClick_y = e.targetTouches[0].clientY
    moveY.value = realTimeClick_y - start_y.value                 // 根据初始 client 位置计算移动距离   // 移动的距离==-y
    targetDom.style.cssText = `overflow-y:hidden;transform: translate(${0}px, ${moveY.value}px);`;

    // Ideal 
    // 可删
    ideal.edit_finish(-moveY.value, 0.2)
        .then(() => { ideal.isfinish = true })
        .catch(() => { ideal.isfinish = false })
}
function handleTouchend(e) { // 拖拽结束
    // Ideal
    // 可删
    ideal.autoScroll().then(() => {
        ideal.scrollTo()
        // 导向(可删)
        ideal.redirecte()
    }).catch(() => {
        ideal.ScrolltoBottom(0)
        console.log(`当前距离${ideal.isfinish}未超过20%，回来把你`);
        // 导向(可删)
        ideal.redirecte()
    })
}


/**
 * 点击list
 */
const clickLi = () => {
    console.log('li');
}
const checked = ref(false)
function fold(item, index) {
    console.log(item, index);
    item.isShow = item.isShow == true ? false : true
}
/**一键记账 */
function charge() {
    console.log('charge');
    /**
     * （inventory_id）
     * 弹出选择框，选择扣款账户（account_id）
     * 账本默认为购物清单，分类也默认为购物清单
     * 金额 需要计算
     * /**
     *  *  根据复选框选中的item，计算总金额，并且将每个item的id提交（goods_list_id）
     *  *  服务器根据id列表，在goods表里，删除它们，并且在inventory里的include_number减去列表的长度.总金额也需扣掉 (goods_total_amount)
     *  *  完成inventory表和goods的变化后，再判断当前total_amount和include_number是否为0，是则 在subscription写入finish，返回
     *  *  前端根据subscription字段 选择不渲染此清单，而是转入已完成的地方。 
     *  */
}
function Delete_Inventory() {
    console.log('Delete');
}
/**Map 商品序号和名字 */
function map_goods_name(iten, indey) {
    if (iten.isAddBtn) return `${iten.name}`
    else return `No.${indey + 1} --   ${iten.name}    ￥${iten.amount}`
}
</script>

<template>
    <!-- ref可判断当前组件位置 -->
    <div class="content" ref="Ref_content">
        <!-- 在整个Plan页面是foot -->
        <div class="foot">
            <!-- Touch事件触发口 -->
            <div class="FootBanner" @touchstart="handleTouchstart" @touchmove="handleTouchmove" @touchend="handleTouchend"
                @touchmove.stop.prevent>
                <div class="line"></div>
            </div>
            <!-- Touch事件触发口 -->
            <h2 class="title">Shopping List</h2>
            <!-- 清单列表 -->
            <div class="list">
                <template v-for="(item, index) in shopping_list" :key="index">
                    <!-- 滑动单元格--右滑删除 -->
                    <van-swipe-cell right-width="100">
                        <div class="item">
                            <div class="item-inner">
                                <!-- 图表、标题、总金额 -->
                                <div class="ul">
                                    <div class="left">
                                        <div class="icon"><img src="@/assets/img/cost/list/airbnb.svg" alt=""></div>
                                        <div class="name">Buy electronic product </div>
                                    </div>
                                    <div class="right">
                                        <div class="top">
                                            <div class="money">
                                                <img src="../img/money.svg" alt="">
                                            </div>
                                            <div class="amount">￥777.00</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 图表、标题、总金额 -->
                                <!-- 商品Goods列表 -->
                                <div class="lis" v-if="item.isShow">
                                    <van-cell-group inset>
                                        <van-cell :class="{ 'lastLi': iten.isAddBtn }"
                                            style="background-color: #c7dcda;text-shadow: 0 0 2px #799;"
                                            v-for="(iten, indey) in item.goodsList" :title="map_goods_name(iten, indey)"
                                            class="li" :key="iten">
                                            <template #right-icon>
                                                <van-checkbox v-if="!iten.isAddBtn" icon-size="24px"
                                                    style="border: 0;border-radius: 50%;box-shadow:0 1px 6px #799;"
                                                    v-model="iten.checked" checked-color="#ffda72FF" :name="item"
                                                    @click.stop />
                                            </template>
                                        </van-cell>
                                    </van-cell-group>
                                </div>
                                <!-- 商品Goods列表 -->
                                <!-- "展开"和"一键记账"按钮 -->
                                <div class="fooot">
                                    <div class="show" @click="isShowLis == true ? isShowLis = false : isShowLis = true">
                                        <van-icon @click="fold(item, index)" name="arrow-down" :size=arrow_down />
                                    </div>
                                    <div class="purchase" @click="charge"><span>一键记账</span></div>
                                </div>
                                <!-- "展开"和"一键记账"按钮 -->
                            </div>
                        </div>
                        <!-- 删除按钮 -->
                        <template #right>
                            <div style="height:100%;display: flex;justify-content: center;align-items: center;"
                                class="icon">
                                <van-icon @click="Delete_Inventory" name="photo-fail" size="35" />
                            </div>
                        </template>
                        <!-- 删除按钮 -->
                    </van-swipe-cell>
                    <!-- 滑动单元格--右滑删除 -->
                </template>
            </div>
            <!-- 清单列表 -->
        </div>
        <!-- 在整个Plan页面是foot -->
    </div>
    <!-- ref可判断当前组件位置 -->
</template>

<style lang="less" scoped>
.lastLi {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 100vw;
    height: 80%;
    position: fixed;
    bottom: -50%;
    border-radius: 40px 40px 0 0;
    overflow-y: auto;
    background-color: #ededed;

    &::-webkit-scrollbar {
        display: none;
    }

    .foot {

        .FootBanner {
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 5px;

            .line {
                // padding-top: 5px;
                width: 10%;
                height: 5px;
                border-radius: 15px;
                background-color: #333;
            }
        }

        .title {
            // color: #ffdf5aFF;
            padding: 2px 0 0 20px;
        }

        .list {
            .item {
                position: relative;
                margin: 10px 40px;
                padding: 10px 20px;
                background-color: #5baba5aa;
                border-radius: 15px;


                .ul {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .left {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .icon {
                            img {
                                width: 25px;
                                height: 25px;
                            }
                        }

                        .name {
                            margin-left: 15px;
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }

                    .right {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        .top {
                            // margin-top: 15px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .money {
                                img {
                                    width: 15px;
                                    height: 15px;
                                }
                            }

                            .amount {
                                font-weight: 700;
                                font-size: 16px;
                                color: #ffdf5aFF
                            }
                        }



                    }
                }

                .lis {
                    margin-top: 15px;
                    padding-left: 20px;

                    .li {

                        .number {
                            font-size: 16px;
                        }
                    }
                }

                .fooot {
                    margin-top: 15px;
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: flex-start;
                    align-items: center;

                    .show {
                        margin-top: 6px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        right: 50%;
                        transform: translate(50%);
                    }

                    .purchase {
                        // position: absolute;
                        // bottom: 8px;
                        // right: 15px;
                        position: relative;
                        left: 1.4rem;
                        width: 80px;
                        height: 20px;
                        border-radius: 12px;
                        background-color: #ffdf5aDD;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 1px;

                        span {
                            // color: rgba(255, 255, 255, 1);
                            color: #333;
                            font-weight: 800;
                        }
                    }

                }


            }
        }
    }
}
</style>