<script setup>
import { ref, onMounted, reactive, watch, toRaw } from 'vue';
// Util
import { createURLObj } from '@/utils';
// Store
import usePlanStore from '@/stores/modules/plan';
// Vant
import { showNotify } from 'vant';
import 'vant/es/notify/style'
import { showSuccessToast } from 'vant';
import 'vant/es/toast/style'
// HighCharts
import pies from '../Chart/cpns/pies.vue';
import Highcahrts from 'highcharts'
import planBanner from './cpns/banner.vue'
import content from './cpns/content.vue';
import dashBoard from './cpns/dashBoard.vue';
import { storeToRefs } from 'pinia';
import useTouch from '@/utils/touch';
// Store
const planStore = usePlanStore()
const { shopping_list, create_ShoppingList_info, add_goods_info } = storeToRefs(planStore)
/** */
planStore.get_all_inventory()
//  
const Ref_target = ref()
const { moveX, moveY } = useTouch(Ref_target, false)

const Red_Index = ref()
const Ref_content = ref()
watch([moveX, moveY], ([newV1, newV2], [oldV1, oldV2]) => {
    console.log(Math.floor(newV1), Math.floor(newV2));
})


// 大按钮功能
/**
 * 创建清单 -- 可选择添加商品
 */
const creating_shoppingList = ref({
    name,
    goods_list: [],
})

const showBottom_popup = ref(false)  //创建清单 -- PopUp
const show_addGoods_popUp = ref(false)  // 创建清单 AddGoods  -- PopUp
const text_add_title = ref('Add Goods')   // 创建清单 AddGoods  -- Title


// 创建清单 AddGoods  -- PopUp
const cur_item = ref()
const cur_indey = ref()

const cur_Goods_describe = ref()   //描述
const cur_Goods_amount = ref()    //金额
const cur_Goods_name = ref()     //名字
/**
 * 创建清单 -- PopUp
 * 
 * 提交清单
 * 
 * 提交商品
 */
function submit_inventory() {
    console.log('submit_inventory');
    /**添加图片，计算总金额 */
    const total = creating_shoppingList.value.goods_list.reduce((pre, cur) => {
        cur.picture = ''
        return pre += Number(cur.amount)
    }, 0)

    console.log('total', total);
    console.log('清单信息：', creating_shoppingList.value);
    /**转成JSON */
    const json_obj = JSON.stringify(creating_shoppingList.value)
    console.log('清单长度：', creating_shoppingList.value.goods_list.length, json_obj);
    /**赋值给Store里的提交对象， */
    create_ShoppingList_info.value = creating_shoppingList.value
    /**发送网络请求， */
    planStore.Post_Create_Shopping_list().then(data => {
        /**改变content的数组 */
        creating_shoppingList.value.goods_list.push({ name: '+', amount: 88, checked: false, isAddBtn: true })
        shopping_list.value.push({ id: data.inventory[0].id, isShow: false, total: total, icon: '', ...creating_shoppingList.value })
        console.log(data);
        /**弹窗 */
        showBottom_popup.value = false
        showSuccessToast('创建成功');
        /**初始化 */
        creating_shoppingList.value = { name, goods_list: [], }
        cur_Goods_describe.value = ''
        cur_Goods_name.value = null
        cur_Goods_amount.value = null
    })
    /**
     * 给每个商品添加list_name、
     * 后端需要添加user_id、list_id 
     */
}
function submit_addGoods() {
    if (!cur_Goods_name.value || !cur_Goods_amount.value) {
        text_add_title.value = '商品名和金额不能为空'
        setTimeout(() => {
            text_add_title.value = 'Add Goods'
        }, 1200);
        return
    }
    /**
      * 区分：  List点击 还是 Creating点击 
      */
    let goods_obj = {}
    let isSuccess = false
    if (showBottom_popup.value) {
        /**正在创建清单 */
        goods_obj = { name: cur_Goods_name.value, amount: cur_Goods_amount.value, describe: cur_Goods_describe.value }
        isSuccess = true
        if (!isSuccess) return
        /**finally */
        showNotify({ type: 'success', message: '添加成功' });
        show_addGoods_popUp.value = false
        creating_shoppingList.value.goods_list.push(goods_obj)
        cur_Goods_name.value = undefined
        cur_Goods_amount.value = undefined
        cur_Goods_describe.value = undefined
    }
    else if (!showBottom_popup.value) {
        goods_obj = { name: cur_Goods_name.value, amount: cur_Goods_amount.value, describe: cur_Goods_describe.value, list_id: cur_item.value.id, list_name: cur_item.value.name, picture: '' }
        console.log(goods_obj);
        add_goods_info.value = createURLObj(goods_obj)
        planStore.Post_Add_Goods().then(data => {
            console.log('!!!添加成功');
            const target_id = data.new_goods[0].id
            // 成功👇
            /**前端处理 */
            const new_obj = { id: target_id, ...goods_obj, checked: false }
            console.log(new_obj);
            cur_item.value.goods_list.splice(cur_indey.value, 0, new_obj)
            cur_item.value.total += Number(cur_Goods_amount.value)
            isSuccess = true
            console.log(isSuccess);
            if (!isSuccess) return
            /**finally */
            showNotify({ type: 'success', message: '添加成功' });
            show_addGoods_popUp.value = false
            cur_Goods_name.value = undefined
            cur_Goods_amount.value = undefined
            cur_Goods_describe.value = undefined
        })
    }

}
/**
 * 删除
 */
function del_goods(item, index) {
    console.log('del', item, index);
    creating_shoppingList.value.goods_list.splice(index, 1)
    showNotify({ type: 'warning', message: '删除成功' });
}


function clickAddGoods(item, indey) {
    console.log('plan,clickAddGoods');
    show_addGoods_popUp.value = true
    cur_item.value = item
    cur_indey.value = indey
}
</script>

<template>
    <div class="plan" ref="Red_Index">
        <div class="inner">
            <planBanner />
            <div class="del" ref="Ref_target" @touchmove.stop.prevent>来抓我呀</div>
            <dashBoard />
            <div class="options">
                <div class="one box" @click="showBottom_popup = true">Shopping List</div>
                <div class="two box">Saving Plan</div>
            </div>
            <content ref='Ref_content' @clickAddGoods="clickAddGoods" />
            <van-popup v-model:show="showBottom_popup" round position="bottom" :style="{ height: '70%' }">
                <div class="popUp-inner">
                    <div class="topBar">
                        <div class="icon_leave"><van-icon @click="showBottom_popup = false" size="20" name="arrow-left" />
                        </div>
                        <div class="title">Create ShoppingList</div>
                    </div>
                    <div class="infos">
                        <div class="icon"><img src="@/assets/img/cost/list/linkedin.svg" alt=""></div>
                        <div class="name">
                            <input style="font-weight: 700;" v-model="creating_shoppingList.name" type="text"
                                placeholder="Input your ShoppingList Name">
                        </div>
                    </div>
                    <div class="list">
                        <div class="nav"><span>Goods List</span></div>
                        <template v-for="(item, index) in creating_shoppingList.goods_list">
                            <div class="item">
                                <div class="icon"><img src="@/assets/img/cost/list/github.svg" alt=""></div>
                                <div class="middle">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="sub">{{ item.describe }}</div>
                                </div>
                                <div class="right">
                                    <div class="amount">￥{{ item.amount }}</div>
                                    <div class="btn" @click="del_goods(item, index)"><van-icon color="#555" name="cross"
                                            size="18" />
                                    </div>
                                </div>
                            </div>

                        </template>
                    </div>
                    <div class="btns">
                        <div class="btn add" @click="show_addGoods_popUp = true">Add Goods</div>
                        <div class="btn submit" @click="submit_inventory">Submit</div>
                    </div>
                </div>
            </van-popup>
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
                            <img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt="">
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
        </div>
    </div>
</template>

<style lang="less" scoped>
.plan {

    /**
      * margin-top传递问题:
      * 1.border: 1px solid transparent;
      * 2.padding-top: 1px;
      * 3.overflow: auto;
     */
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180.00deg, rgba(67, 136, 131, 0.3) 5%, rgba(67, 136, 131, 0.3) 97%);
    // overflow-y: auto;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;

    .inner {
        opacity: 0.9;
        width: 100%;
        height: 100%;

        .del {
            position: fixed;
            top: 15px;
            right: 15px;
        }
    }

    .options {
        margin-top: 5px;
        display: flex;
        overflow-x: auto;
        position: relative;
        // width: 200vw;
        padding: 40px 40px;

        &::-webkit-scrollbar {
            display: none;
        }

        .box {
            flex-shrink: 0;
            width: 70vw;
            height: 100px;
            backdrop-filter: blur(10px);
            border-radius: 36px;
            border: 1px solid #c6dbd9AA;
            box-shadow: inset 0 0 10px #ffffffAA;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .one {
            background-color: #027f87;
            margin-right: 30px;
        }

        .two {
            background-color: #57e3b9;
        }

    }

    .popUp-inner {
        box-sizing: border-box;
        padding: 20px;

        .topBar {
            display: grid;
            grid-template-columns: .7fr 2fr;

            .title {
                font-size: 20px;
                font-weight: 550;
            }
        }

        .infos {
            display: flex;
            padding: 20px;


            .icon {
                display: grid;
                width: 70px;
                height: 70px;
                background-color: bisque;
                border-radius: 24px;

                img {
                    place-self: center;
                    width: 50px;
                    height: 50px;
                }
            }

            .name {
                display: flex;
                flex: 1;
                align-items: center;
                margin-left: 10%;

                input {
                    flex: 1;
                    height: 80%;
                    text-align: center;
                    border: 0;
                    background-color: bisque;
                    border-radius: 24px;
                }
            }
        }

        .list {
            padding: 0 30px 15px;
            overflow-y: auto;
            height: 35vh;
            border-top: 2px solid #429690;
            border-radius: 12px;
            border-bottom: 2px solid #429690;

            .nav {
                // position: sticky;
                // top: 0;
                margin-top: 10px;
                display: flex;
                justify-content: center;
                // background-color: #fff;

                span {
                    position: relative;
                    right: 4px;
                    font-size: 20px;
                    font-weight: 550;
                    color: #027f87;
                }
            }

            .item {
                display: grid;
                grid-template-columns: .6fr 1fr .3fr;
                grid-template-rows: repeat(auto-fill 1fr);
                margin-top: 10px;
                padding: 10px;
                background-color: #fae3c6;
                border-radius: 24px;

                .icon {
                    img {
                        width: 50px;
                        height: 50px;
                    }
                }

                .middle {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: #7d7f7f;

                    .name {
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .sub {
                        margin-top: 6px;
                        font-size: 12px;
                    }
                }

                .right {
                    display: flex;
                    align-items: center;

                    .amount {
                        display: flex;
                        justify-content: flex-end;
                        width: 80px;
                        font-size: 18px;
                        font-weight: 550;
                        margin-right: 15px
                    }

                }
            }
        }

        .btns {
            padding: 20px;
            display: flex;
            justify-content: space-evenly;


            .btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 50px;
                font-size: 16px;
                font-weight: 600;
                text-shadow: 0 0 2px #eeeeee;
                background-color: #429690;
                border-radius: 24px;
                color: aliceblue;
                box-shadow: 0 0 5px #027f87;
            }
        }
    }

    .popup {
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