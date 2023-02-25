<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// Utils
import { createURLObj } from '@/utils';
// Store
import useCenterStore from '@/stores/modules/center';
import { storeToRefs } from 'pinia';
const centerStore = useCenterStore()
const { add_book_info,
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
    console.log('edit');
    isimgshark.value == true ? isimgshark.value = false : isimgshark.value = true
}
/**
 * 点击提交表单
 * @param {*} id 
 * @param {*} name 
 */
const update = (id, name) => {
    // 屏蔽编辑状态以外的点击
    if (isimgshark.value == false) return
    update_book_info.value = createURLObj({ id: id, name: '王八蛋账本' })
    // Promise回调
    centerStore.post_updateBook().then(res => {
        const targetIndex = data.value.findIndex(el => {
            return el.id == id    // 一定要return 
        })
        data.value[targetIndex].name = '王八蛋账本'
    })
}
const addBook = () => {
    console.log('add');
}
</script>

<template>
    <div class="ledgerManager">
        <div class="inner">
            <div class="innerer">
                <div class="banner">
                    <div class="left" @click="router.back()"><span>返回</span></div>
                    <div class="middle">Ledger</div>
                    <div class="right" @click="isClickEdit"><span>修改</span></div>
                </div>
                <div class="content">
                    <div class="list">
                        <template v-for="(item, index) in data">
                            <div class="item" @click="update(item.id, item.name)">
                                <div class="ledger" :class="{ imgshark: isimgshark }">
                                    <img src='picture/2023/02/10/cZkBewG65J3SjHr.png' alt="">
                                    <span>{{ item.name }}</span>
                                </div>
                                <img v-if="isimgshark" class="chacha" src="@/assets/img/Profile_Center/chacha.svg" alt="">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" @click="addBook" ref="Ref_Footer">
            <span>Add your Ledger</span>
        </div>
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
                                font-size: 16px;
                                font-weight: 500;
                            }
                        }
                    }


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
        height: 80px;
        background-image: linear-gradient(120deg, #d7d7d7aa 100%, #616161aa 100%);
        display: flex;
        justify-content: center;
        align-items: center;

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