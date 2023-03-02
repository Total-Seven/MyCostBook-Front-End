<script setup>
// Vue
import { ref, computed, toRaw } from 'vue';
// Router
import { useRouter } from 'vue-router';
// Utils
import { createURLObj } from '@/utils';
// 组件
import myDialog from '@/components/dialog.vue'
// 
// Store
import useCenterStore from '@/stores/modules/center';
import { storeToRefs } from 'pinia';
const centerStore = useCenterStore()
const { user_info,
    add_book_info,
    del_book_info,
    update_book_info, } = storeToRefs(centerStore)
// 
const router = useRouter()

const props = defineProps({
    test: {
        type: Object,
        default: () => { }
    },
    picture: {
        type: String,
        default: ''
    }
})
const data = computed(() => {
    return props.test
})
/**
 * 点击编辑，修改状态，实现动画
 **/
const isimgshark = ref(false)
const isClickEdit = () => {
    isimgshark.value == true ? isimgshark.value = false : isimgshark.value = true
}
/**
 * 点击提交表单
 */
const default_placeholder = ref('')
const update = (id, name) => {
    default_placeholder.value = name
    // 屏蔽编辑状态以外的点击
    if (isimgshark.value == false) return
    // 
    subMit_id.value = id
    showDialog.value = true
}
function delBook(id, name, $event) {
    $event.stopPropagation()
    const answer = window.confirm('Do you really want to Delete? Unable to recover!')
    if (!answer) return false
    console.log(id, name);
    del_book_info.value = createURLObj({ id: id })
    centerStore.post_delBook().then(res => {
        const targetIndex = user_info.value.books.findIndex(item => {
            return item.id == id
        })
        user_info.value.books.splice(targetIndex, 1)
        isimgshark.value == true ? isimgshark.value = false : isimgshark.value = true
    })
}
// PopUp
const showPopUpBottom = ref()
const subMit_name = ref()
const subMit_id = ref()
function submit() {
    add_book_info.value = createURLObj({ name: subMit_name.value, book_type: 0 })
    centerStore.post_addBook().then(res => {
        user_info.value.books.push({ id: res, name: subMit_name.value, book_type: 0 })
    })
    showPopUpBottom.value = false
}
// Dialog
const diaLog_title = ref('Edit Ledger')
const showDialog = ref(false)
function Close(action) {
    if (action == 'cancel') {
        showDialog.value = false
        return
    }
    if (action == 'confirm' && !subMit_name.value) {
        diaLog_title.value = '名称不可为空'
        setTimeout(() => {
            diaLog_title.value = 'Edit Ledger'
        }, 1500)
        return
    }
    if (action == 'confirm' && !(subMit_name.value.length < 7)) {
        console.log(subMit_name.value.length);
        diaLog_title.value = '需少于6个字符'
        setTimeout(() => {
            diaLog_title.value = 'Edit Ledger'
        }, 1500)
        return
    }
    else if (action == 'confirm') {
        update_book_info.value = createURLObj({ id: subMit_id.value, name: subMit_name.value })
        //
        centerStore.post_updateBook()
            .then(res => {
                // 
                const targetIndex = user_info.value.books.findIndex(item => {
                    return item.id == subMit_id.value
                })
                user_info.value.books[targetIndex].name = subMit_name.value
                showDialog.value = false
                isimgshark.value == true ? isimgshark.value = false : isimgshark.value = true
            })
    }
}
function watch_input(newV) {
    subMit_name.value = newV
}
</script>

<template>
    <div class="ledgerManager">
        <div class="inner">
            <div class="innerer">
                <div class="banner">
                    <div class="left" @click="router.back()"><van-icon name="arrow-left" size="20px" /></div>
                    <div class="middle">Ledger</div>
                    <div class="right" @click="isClickEdit"><van-icon name="edit" size="22" /></div>
                </div>
                <div class="content">
                    <div class="list">
                        <template v-for="(item, index) in data">
                            <div class="item" @click="update(item.id, item.name)">
                                <div class="ledger" :class="{ imgshark: isimgshark }">
                                    <img src='picture/2023/02/10/cZkBewG65J3SjHr.png' alt="">
                                    <span>{{ item.name }}</span>
                                </div>
                                <img v-if="isimgshark" @click="delBook(item.id, item.name, $event)" class="chacha"
                                    src="@/assets/img/Profile_Center/chacha.svg" alt="">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" @click="showPopUpBottom == true ? showPopUpBottom = false : showPopUpBottom = true"
            ref="Ref_Footer">
            <span>Add your Ledger</span>
        </div>
        <van-popup class="popup" v-model:show="showPopUpBottom" position="bottom" :style="{ height: '30%' }" round
            closeable>
            <div class="inner">
                <div class="banner">
                    <div class="left"><van-icon name="arrow-left" size="22" /></div>
                    <div class="middle">
                        <h2>Add Ledger</h2>
                    </div>
                </div>
                <div class="conten">
                    <div class="box icon">
                        <img src="picture/2023/02/10/cZkBewG65J3SjHr.png" alt="">
                        <div class="iright">
                            <div class=" box name line type">
                                <input type="text" v-model="subMit_name" placeholder="&ensp; Please enter a category name">
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
        <myDialog @update:amount="watch_input" :title="diaLog_title" :default_placeholder="default_placeholder"
            :show="showDialog" :Close="Close" />
    </div>
</template>

<style lang="less" scoped>
@keyframes shake-vertical {

    0% {
        transform: translateY(0);
    }

    10% {
        transform: translateY(-5px);
    }

    20% {
        transform: translateY(5px);
    }

    30% {
        transform: translateY(-5px);
    }

    40% {
        transform: translateY(5px);
    }

    50% {
        transform: translateY(-5px);
    }

    60% {
        transform: translateY(5px);
    }

    70% {
        transform: translateY(-5px);
    }

    80% {
        transform: translateY(6.4px);
    }

    90% {
        transform: translateY(-6.4px);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes shake-center {

    0% {
        transform: rotate(0deg);
        transform-origin: 50% 50%;
    }

    10% {
        transform: rotate(2deg);
    }

    20% {
        transform: rotate(-2deg);
    }

    30% {
        transform: rotate(2deg);
    }

    40% {
        transform: rotate(-2deg);
    }

    50% {
        transform: rotate(2deg);
    }

    60% {
        transform: rotate(-2deg);
    }

    70% {
        transform: rotate(2deg);
    }

    80% {
        transform: rotate(-2deg);
    }

    90% {
        transform: rotate(2deg);
    }

    100% {
        transform: rotate(0deg);
        transform-origin: 50% 50%;
    }
}

.imgshark {
    animation-name: shake-center;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ledgerManager {
    box-sizing: border-box;
    position: fixed;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(120deg, #5ad788 0%, #42a19b 100%);
    display: flex;
    flex-direction: column;
    font-family: Inter;

    .inner {
        height: 100%;
        padding: 20px;
        background-color: rgba(255, 255, 255, .1);
        filter: blur();

        .innerer {
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

            .content {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 30px;

                .list {
                    display: grid;
                    grid-template-rows: repeat(auto-fill, 1fr);
                    grid-template-columns: repeat(3, 1fr);
                    grid-row-gap: 20px;
                    grid-column-gap: 20px;

                    .item {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        width: 105px;
                        height: 105px;
                        background-color: #d7d7d7aa;
                        border-radius: 24px;
                        box-shadow: 0 0 12px rgba(0, 0, 0, .2);

                        img.chacha {
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            width: 26px;
                            height: 26px;
                        }

                        .ledger {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;

                            img {
                                background-color: bisque;
                                border-radius: 35px;
                                width: 55px;
                                height: 55px;
                                margin-bottom: 5px;
                            }

                            span {
                                text-align: center;
                                font-size: 16px;
                                font-weight: 500;
                            }
                        }
                    }


                }
            }
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
                grid-template-columns: 1fr 2fr 1fr;

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
                padding: 20px 10px 0 10px;

                .box {
                    .flex()
                }

                .icon {
                    display: flex;

                    .iright {
                        flex: 1;
                        margin-left: 20px;
                    }

                    img {
                        background-color: #bfbfbfAA;
                        border-radius: 50px;
                        width: 100px;
                        width: 100px;
                    }
                }

                .name {
                    .flex();

                    input {
                        width: 95%;
                        height: 50px;
                        border-radius: 24px;
                        background-color: #bfbfbfDD;
                        border: 0;
                        outline: none;
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

    .footer {
        z-index: 5;
        .flex();
        position: fixed;
        margin-top: 60px;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-image: linear-gradient(120deg, #d7d7d7aa 100%, #616161aa 100%);

        span {
            margin-top: 10px;
            font-weight: 550;
            font-size: 28px;
            color: aliceblue;
            text-shadow: 2px 2px #429690;
        }
    }

}
</style>