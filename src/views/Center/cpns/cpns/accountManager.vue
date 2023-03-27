<script setup>
// Vue
import { ref, computed, toRaw, watch } from 'vue';
// Vant
import { showSuccessToast } from 'vant';
import 'vant/es/toast/style'
// 路由
import { useRouter } from 'vue-router';
// Util
import { createURLObj } from '@/utils';
// Store
import useCenterStore from '@/stores/modules/center';
import { storeToRefs } from 'pinia';
const centerStore = useCenterStore()
const { user_info, account_data, add_account_info, del_account_info } = storeToRefs(centerStore)
// Router
const router = useRouter()
// Props -- 由Index传入 （通过RouterView） 
const props = defineProps({
    test: {
        type: Object,
        default: () => { }
    }
})
// centerStore.Get_allAccount()
function account_detail(item, index) {
    console.log(toRaw(item, index))
}
// PopUp
const showPopUpBottom = ref(false)
const clickPopUp = () => {
    text_popupTtile.value = 'Create Account'
    showPopUpBottom.value = true
}
// 
const subMit_Id = ref()
const subMit_name = ref()
const subMit_amount = ref()

// 提交
function submit() {
    if (text_popupTtile.value === 'Modify Account') {
        const modifyAccount_info = createURLObj({ id: subMit_Id.value, name: subMit_name.value, amount: subMit_amount.value })
        centerStore.post_ModifyAccount(modifyAccount_info).then(data => {
            console.log('成功🔥', data);
            // 修改视图
            const targetIndex = user_info.value.account.findIndex(el => {
                return el.id === subMit_Id.value
            })
            user_info.value.account[targetIndex].name = subMit_name.value
            user_info.value.account[targetIndex].amount = subMit_amount.value
            // 还原
            showSuccessToast('修改成功');
            setTimeout(() => { showPopUpBottom.value = false }, 500);
        }).catch(reason => {
            showSuccessToast('失败!');
            console.error(reason)
        })
    }
    else {
        add_account_info.value = createURLObj({ name: subMit_name.value, pay_type: 0, amount: subMit_amount.value })
        centerStore.post_addAccount().then(res => {
            user_info.value.account.push({ id: res, name: subMit_name.value, pay_type: 0, user_id: user_info.value.userInfo.id, amount: subMit_amount.value })
        })
        setTimeout(() => {
            showPopUpBottom.value = false
        }, 500);
    }
}

// 打开修改账户弹出层
const popModifyUp = (item, index) => {
    text_popupTtile.value = 'Modify Account'
    subMit_Id.value = item.id
    subMit_name.value = item.name
    subMit_amount.value = item.amount
    console.log(`%c ${item}, ${index}`, 'background:green');
    showPopUpBottom.value = true
}

// 删除账户
function del(item, index) {
    console.log('del', index, item);
    del_account_info.value = createURLObj({ id: item.id })
    centerStore.post_delAccount().then(res => {
        console.log('Del_account:', res);
        const targetIndex = user_info.value.account.findIndex(el => {
            return el == item
        })
        user_info.value.account.splice(targetIndex, 1)
    })
}

const text_popupTtile = ref('Create Account')  //创建/修改账户


function clearPopup() {
    subMit_name.value = undefined
    subMit_amount.value = undefined
}

</script>

<template>
    <div class="accountMananger">
        <div class="banner">
            <div class="left" @click="router.back()"><van-icon name="arrow-left" size="16px" /></div>
            <div class="middle">Asset Management</div>
            <div class="right" @click="edit"></div>
        </div>
        <div class="top">
            <div class="box toop">
                <div class="net">
                    <div class="title">Net Assets</div>
                    <div class="amount">￥<span class="total">{{ account_data.net }}</span></div>
                </div>
            </div>
            <div class="box second money">
                <div class="left">
                    <span id="assets">assets</span>
                    <div class="progress"></div>
                </div>
                <span class="right" id="asset_amount"><span>+￥{{ account_data.assets }}</span></span>
            </div>
            <div class="box bottom money">
                <div class="left">
                    <span id="debt">debt</span>
                    <div class="progress"></div>
                </div>
                <span class="right" id="debt_amount"><span>-￥{{ account_data.debt }}</span></span>
            </div>
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="titleBanner">
                <div class="title">
                    <div>Asset Accounts</div>
                </div>
                <div class="icon">
                    <div><img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt=""></div>
                </div>
            </div>
            <div class="list">
                <template v-for="(item, index) in test">
                    <van-swipe-cell name="删除" :stop-propagation="true">
                        <div class="item" @click="account_detail(item, index)">
                            <div class="left">
                                <div><img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt=""></div>
                            </div>
                            <div class="middle">
                                <div>{{ item.name }}</div>
                            </div>
                            <div class="right">
                                <div class="amount"><span>￥{{ item.amount }}</span></div>
                            </div>
                        </div>
                        <template #right class="swipe-button-inner">
                            <van-button class="swipe-button" round type="danger" text="删除" @click="del(item, index)" />
                            <van-button @click="popModifyUp(item, index)" class="swipe-button" round color="#429690"
                                type="primary" text="修改" />
                        </template>
                    </van-swipe-cell>
                </template>
            </div>
            <div class="footer" @click="clickPopUp">
                <span>Add your Asset</span>
            </div>

        </div>
        <van-popup class="popup" @close="clearPopup" v-model:show="showPopUpBottom" position="bottom"
            :style="{ height: '30%' }" round>
            <div class="inner">
                <div class="banner">
                    <div class="left"><van-icon name="arrow-left" size="22" /></div>
                    <div class="middle">
                        <h2 v-html="text_popupTtile"></h2>
                    </div>
                </div>
                <div class="conten">
                    <div class="box icon">
                        <img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt="">
                        <div class="iright">
                            <div class="name type">
                                <input type="text" v-model="subMit_name" placeholder="&ensp; Please enter a account name">
                            </div>
                            <div class="amount type">
                                <input type="number" v-model="subMit_amount" placeholder="&ensp; amount">
                            </div>
                        </div>
                    </div>
                    <div class=" box submit">
                        <div class="btn" @click="submit">
                            <van-icon name="success" size="36" />
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<style lang="less">
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

// :root {

// }

.accountMananger {
    box-sizing: border-box;
    padding: 30px 20px 60px;
    position: fixed;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    background-color: #e2e2e2;
    display: flex;
    flex-direction: column;
    font-family: Inter;

    // align-items: center;
    .banner {
        width: 100%;
        height: 5vh;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .middle {
            font-weight: 600;
            font-size: 18px;
        }
    }

    .top {
        width: 100%;
        height: 20vh;
        display: flex;
        flex-direction: column;
        padding-top: 35px;

        .box {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .net {
                font-size: 16px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .title {
                    color: #919191;
                }

                .amount {
                    color: #429690;
                    position: relative;
                    right: 5px;
                    margin-top: 10px;
                    font-size: 26px;
                    font-weight: 600;
                    text-shadow: 1px 1px 2px #848484aa;
                }

                .amount::first-letter {
                    font-size: 16px;
                    font-weight: 500;
                }
            }
        }

        .toop {
            margin-bottom: 20px;
        }

        .money {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            .left {
                display: flex;
                align-items: center;
                width: 70%;
                color: #919191;

                span {
                    width: 20%;
                }

                .progress {
                    width: 50%;
                    height: 1vh;
                    border-radius: 12px;
                    background-image: linear-gradient(120deg, #68e696 0%, #429690 100%);
                }
            }



            .right {
                font-weight: 550;
                width: 30%;
                color: #429690DD;
                font-weight: 600;
                text-shadow: 0px 0px 1px #848484aa;

                span {
                    display: flex;
                    justify-content: flex-end;
                }
            }
        }
    }

    .line {
        position: relative;
        right: 20px;
        height: 10px;
        width: 100vw;
        background-color: #e8e8e8;
    }

    .content {
        margin-top: 25px;
        width: 100%;
        overflow-y: auto;


        .titleBanner {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                font-size: 22px;
                font-weight: 550;
            }

            .icon {
                img {
                    width: 50px;
                    height: 50px;
                }
            }
        }

        .list {
            margin-top: 10px;
            padding: 10px;

            --van-button-default-height: 100%;

            .item {
                color: #111111;
                text-shadow: 0 0 2px #6d6d6dAA;
                height: 60px;
                background: linear-gradient(120deg, #bbbbbb 0%, #bfbfbf 100%);
                border: 1px solid #bfbfbfAA;
                border-radius: 24px;
                box-shadow: 0px 0px 10px #bfbfbfCC;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                box-sizing: border-box;
                padding: 10px;

                .swipe-button-inner {
                    .flex();

                    .swipe-button {
                        .flex();
                        height: 100%;
                    }
                }


                .left {
                    width: 15%;
                    margin-right: 20px;

                    img {
                        background-color: var(--primary--color);
                        box-shadow: 0px 0px 20px rgba(66, 150, 144, .2);
                        border-radius: 50%;
                    }
                }

                .middle {
                    font-size: 16px;
                    width: 60%;
                }

                .right {
                    width: 30%;
                    height: 100%;
                    border-radius: 24px;
                    border: 2px solid #b7b7b7;
                    box-shadow: 0px 0px 15px #bfbfbfCC;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f7e36dDD;
                }
            }
        }
    }

    .footer {
        margin-top: 60px;
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-image: linear-gradient(120deg, #84fab0 0%, #429690 100%);
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-weight: 550;
            font-size: 20px;
            color: aliceblue;
            text-shadow: 2px 2px #429690;
        }
    }

    .popup {
        &.webkit-scroll {
            display: none;
        }

        .inner {
            padding: 10px;

            .banner {
                display: grid;
                grid-template-columns: 1fr 2.3fr 1fr;

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
                padding: 30px 10px 0 10px;

                .icon {
                    display: flex;

                    img {
                        background-color: #bfbfbfAA;
                        border-radius: 50px;
                        width: 100px;
                    }

                    .iright {
                        .flex();
                        flex-direction: column;
                        margin-left: 20px;

                        input {
                            width: 60vw;
                            height: 40px;
                            margin-bottom: 10px;
                            text-align: center;
                            border-radius: 24px;
                            background-color: #bfbfbfDD;
                            border: 0;
                            outline: none;
                        }
                    }
                }



                .submit {
                    display: flex;
                    justify-content: flex-end;

                    .btn {
                        width: 100px;
                        height: 50px;
                        border-radius: 24px;
                        background-color: #429690;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>