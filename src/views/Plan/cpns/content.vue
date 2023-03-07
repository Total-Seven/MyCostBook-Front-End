<script setup>
import { move } from '@antfu/utils';
import { ref, onMounted, toRaw } from 'vue';
// Vant
import { showConfirmDialog, closeDialog } from 'vant';
import 'vant/es/dialog/style'
import { showNotify } from 'vant';
import 'vant/es/notify/style'
// Store
import usePlanStore from '@/stores/modules/plan';
import { storeToRefs } from 'pinia';
import { createURLObj } from '@/utils';
const planStore = usePlanStore()
const { shopping_list, delete_ShoppingList_info, add_goods_info, del_goods_info_id } = storeToRefs(planStore)

// Touch事件
const Ref_content = ref()
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
onMounted(handlerMounted)


/**展开与折叠 */
function fold(item, index) {
    item.isShow = item.isShow == true ? false : true
}
/**一键记账 */
function charge(item, index) {
    console.log('charge', item.name);
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
/**Map 商品序号和名字 */
function map_goods_name(iten, indey) {
    if (iten.isAddBtn) return `${iten.name}`
    else return `No.${indey + 1} --   ${iten.name}    ￥${iten.amount}`
}
/**删除购物清单 */
function Delete_list(item, index) {
    const beforeClose = (action) => {
        if (action === 'confirm') {
            delete_ShoppingList_info.value = createURLObj({ id: item.id })
            planStore.Post_Delete_Shopping_list().then(res => {
                shopping_list.value.splice(index, 1)
                showNotify({ type: 'success', message: '删除成功' });
                closeDialog()
            }).catch(() => {
                showNotify({ type: 'warning', message: '删除失败' });
                closeDialog()
            })
        }
        else {
            closeDialog()
        }
    }
    /**确认 */
    showConfirmDialog({
        message:
            `确定删除清单：${item.name}吗？`,
        beforeClose,
    });
    console.log(item, index);
}
/**点击+ */
const show_addGoods_popUp = ref(false)
const text_add_title = ref('Add Goods')
const cur_item = ref()
const cur_indey = ref()
function clickIten(item, index, iten, indey) {
    console.log('del_id:', iten.id);
    console.log(item.goods_list[indey]);
    if (iten.name !== '+') {
        console.log(toRaw(item), iten);
        const beforeClose = (action) => {
            if (action === 'confirm') {
                del_goods_info_id.value = iten.id
                planStore.Post_Del_Goods().then(res => {
                    item.goods_list.splice(indey, 1)
                    showNotify({ type: 'success', message: '删除成功' });
                    closeDialog()
                }).catch(() => {
                    showNotify({ type: 'warning', message: '删除失败' });
                    closeDialog()
                })
            }
            else {
                closeDialog()
            }
        }
        /**确认 */
        showConfirmDialog({
            message:
                `确定删除商品：${iten.name} 吗？`,
            beforeClose,
        });
    }
    else {
        cur_item.value = item
        cur_indey.value = indey
        console.log(toRaw(item.goods_list[indey - 1]), indey);
        show_addGoods_popUp.value = true
    }
}
const cur_Goods_describe = ref()
const cur_Goods_amount = ref()
const cur_Goods_name = ref()
function submit_addGoods() {
    console.log(cur_item.value, cur_indey.value);
    if (!cur_Goods_name.value || !cur_Goods_amount.value) {
        text_add_title.value = '商品名和金额不能为空'
        setTimeout(() => {
            text_add_title.value = 'Add Goods'
        }, 1200);
        return
    }
    const goods_obj = { name: cur_Goods_name.value, amount: cur_Goods_amount.value, describe: cur_Goods_describe.value, list_id: cur_item.value.id, list_name: cur_item.value.name, picture: '' }
    // /**网络请求 */
    add_goods_info.value = createURLObj(goods_obj)
    planStore.Post_Add_Goods().then(data => {
        const target_id = data.new_goods[0].id
        // 成功👇
        /**前端处理 */
        const new_obj = { id: target_id, ...goods_obj, checked: false }
        console.log(new_obj);
        cur_item.value.goods_list.splice(cur_indey.value, 0, new_obj)
        showNotify({ type: 'success', message: '添加成功' });
        show_addGoods_popUp.value = false
    })

    // creating_shoppingList.value.goods_list.push(goods_obj)
}
</script>

<template>
    <!-- ref可判断当前组件位置 -->
    <div class="content" ref="Ref_content">
        <!-- 在整个Plan页面中是foot -->
        <div id="foot" class="foot">
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
                                        <div class="icon">
                                            <img v-if="item.icon !== ''" :src="item.icon" alt="">
                                            <img v-else src="@/assets/img/cost/list/airbnb.svg" alt="">
                                        </div>
                                        <div class="name">{{ item.name }} </div>
                                    </div>
                                    <div class="right">
                                        <div class="top">
                                            <div class="money">
                                                <img src="../img/money.svg" alt="">
                                            </div>
                                            <div class="amount">￥{{ item.total }}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 图表、标题、总金额 -->
                                <!-- 商品Goods列表 -->
                                <div class="lis" v-if="item.isShow">
                                    <van-cell-group inset>
                                        <van-cell @click="clickIten(item, index, iten, indey)"
                                            :class="{ 'lastLi': iten.isAddBtn }"
                                            style="background-color: #c7dcda;text-shadow: 0 0 2px #799;"
                                            v-for="(iten, indey) in item.goods_list" :title="map_goods_name(iten, indey)"
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
                                    <div class="show">
                                        <van-icon v-if="!item.isShow" @click="fold(item, index)" name="arrow-down"
                                            size="15" />
                                        <van-icon v-else @click="fold(item, index)" name="arrow-up" size="15" />
                                    </div>
                                    <div class="purchase" @click="charge(item, index)"><span>一键记账</span></div>
                                </div>
                                <!-- "展开"和"一键记账"按钮 -->
                            </div>
                        </div>
                        <!-- 删除按钮 -->
                        <template #right>
                            <div @click="Delete_list(item, index)"
                                style="height:100%;display: flex;justify-content: center;align-items: center;" class="icon">
                                <img src="@/assets/img/Profile_Center/chacha.svg" style="width: 35px;height: 35px;" alt="">
                            </div>
                        </template>
                        <!-- 删除按钮 -->
                    </van-swipe-cell>
                    <!-- 滑动单元格--右滑删除 -->
                </template>
            </div>
            <!-- 清单列表 -->
        </div>
        <van-popup class="popup" v-model:show="show_addGoods_popUp" position="bottom" :style="{ height: '40%' }" round>
            <div class="inner">
                <div class="banner">
                    <div class="left" @click="show_addGoods_popUp = false"><van-icon name="arrow-left" size="22" />
                    </div>
                    <div class="middle">
                        <h2 v-html="text_add_title"></h2>
                    </div>
                    <div class=" box submit">
                        <div class="btn" @click="submit_addGoods">
                            <van-icon name="success" size="36" />
                        </div>
                    </div>
                </div>
                <div class="conten">
                    <div class="box icon">
                        <img src="picture/2023/02/10/cZkBewG65J3SjHr.png" alt="">
                        <div class="iright">
                            <div class="line type">
                                <span style="font-size: 12px;">金额:</span>
                                <input v-model="cur_Goods_amount" type="text" placeholder="￥">
                            </div>
                            <div class="line category">
                                <span style="font-size: 12px;">名称:</span>
                                <input v-model="cur_Goods_name" type="text">
                            </div>
                        </div>
                    </div>
                    <div class=" box describe">
                        <input v-model="cur_Goods_describe" type="text"
                            placeholder="Please describe the item  --  ( optional )">
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 在整个Plan页面中是foot -->
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

    .popup {
        position: absolute;
        bottom: 0;

        &.webkit-scroll {
            display: none;
        }

        .inner {
            box-sizing: border-box;
            padding: 10px;

            .banner {
                display: grid;
                grid-template-columns: .5fr 2fr 1fr;

                .submit {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    .btn {
                        width: 80px;
                        height: 40px;
                        border-radius: 24px;
                        background-color: rgb(255, 211, 158);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                .left {
                    display: flex;
                    align-items: center;
                }

                .middle {
                    display: flex;
                    justify-content: center;
                }
            }

            .conten {
                padding: 10px 10px 0 10px;

                .box {
                    margin-top: 25px;
                }

                .icon {
                    display: flex;

                    .iright {
                        flex: 1;
                        margin-left: 20px;
                        display: grid;
                        grid-template-rows: repeat(2, 1fr);
                        grid-row-gap: 10px;

                        .line {
                            position: relative;
                            width: 250px;
                            background-color: #bfbfbfAA;
                            border-radius: 24px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;

                            input {
                                margin-left: 20px;
                                border: 0;
                                background-color: #d6d8d8;
                            }

                            // margin-top   : 10px;
                            .color {
                                margin-left: 10px;
                                color: #1b1b1b;
                                font-weight: 550;
                                font-size: 16px;
                            }
                        }

                        span {
                            position: relative;
                            left: 15px;
                            color: #6d6d6d // display: block;
                                // background-color: pink;
                                // width: 200px;
                                // margin-top: 8px;
                                // padding-top: 20px;
                        }
                    }

                    img {
                        background-color: #bfbfbfAA;
                        border-radius: 50px;
                        width: 100px;
                        width: 100px;
                    }
                }

                .describe {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    input {
                        box-sizing: border-box;
                        width: 95%;
                        height: 50px;
                        padding-left: 20px;
                        border-radius: 24px;
                        background-color: #bfbfbfDD;
                        border: 0;
                        outline: none;
                    }

                    ::-webkit-input-placeholder {
                        font-weight: 400;
                    }

                }


            }
        }
    }
}
</style>