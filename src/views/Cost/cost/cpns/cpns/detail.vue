<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
// Router
import { useRoute, useRouter } from 'vue-router';
// Utils

// 组件
import backGround from '@/components/topBar.vue';
import banner from '@/components/banner.vue';
// Store

/**
* var
*/
const route = useRoute()
const router = useRouter(0)
console.log(route.params, route.query);
/**
* function
*/
</script>

<template>
    <div class="detail">
        <div class="topBg">
            <backGround />
        </div>
        <div class="banner">
            <banner>
                <template #middle>
                    <div @click="router.back()" class="text" style="width:250px ;">
                        <span style="position: relative; right:55px">Transaction Details</span>
                    </div>
                </template>

                <template #left>
                    <div class="left">
                        <div class="btn">
                            <img src="@/assets/img/Profile_Center/Center_left_alllow.png" alt="">
                        </div>
                    </div>
                </template>
            </banner>

        </div>
        <div class="content">
            <div class="top">
                <div class="icon">
                    <img src="@/assets/img/Profile_Center/Center_avatar.png" alt="">
                </div>
                <div class="status"><span>Expense</span></div>
                <div class="amount">$85.00</div>
            </div>
            <div class="middle">
                <div class="first">
                    <div class="title">
                        <span>Transaction details</span>
                    </div>
                    <div class="line status"><span class="lineLeft">Status</span> <span>Expense</span></div>
                    <div class="line to"><span class="lineLeft">To</span> <span>Claire Jovalski</span></div>
                    <div class="line time"><span class="lineLeft">Time</span> <span>04:30 PM</span></div>
                    <div class="line date"><span class="lineLeft">Date</span> <span>Feb 29,2022</span></div>
                </div>
                <div class="second">
                    <div class="line remark"><span class="lineLeft">remark</span> <span>abcdefghijklmn</span></div>
                </div>
                <div class="third">
                    <div class="line tital"><span class="lineLeft">total</span> <span>$84.00</span></div>
                </div>
            </div>
            <div class="btn">
                <span>Confirm Edit</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.detail {
    position: relative;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: pink;

    .content {
        position: fixed;
        z-index: 1000;
        bottom: 0;
        width: 100vw;
        height: 85vh;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 20px;
        border-radius: 24px 24px 0 0;
        background-color: aliceblue;

        .top {
            display: flex;
            flex-direction: column;
            align-items: center;

            .icon {
                width: 120px;
                height: 120px;
            }

            .status {
                padding: 1px 5px;
                background-color: rgba(252, 174, 205, 0.5);
                border-radius: 12px;
                color: rgb(213, 28, 28);
            }

            .amount {
                font-size: 22px;
                font-weight: 600;
                margin-top: 10px;
            }
        }

        .middle {
            font-weight: 550;
            margin-top: 35px;

            .line {
                display: flex;
                justify-content: space-between;
                margin-top: 14px;


                .lineLeft {
                    color: #838383
                }
            }

            .first {


                .title {
                    font-size: 18px;
                    font-weight: 600;
                }

                .status {
                    color: rgb(213, 28, 28);
                    margin-top: 20px;
                }

                .date {
                    padding-bottom: 15px;
                    border-bottom: 1px solid #bfbfbf;
                }
            }

            .third {
                .tital {
                    padding-top: 15px;
                    border-top: 1px solid #bfbfbf;
                }
            }
        }

        .btn {
            width: 70%;
            .flex();
            position: relative;
            left: 10%;
            padding: 15px;
            margin-top: 50px;
            border-radius: 36px;
            border: 1px solid #429690;
            background-color: var(--primary--color);
            box-shadow: 0 0 10px #429690AA;

            span {
                font-size: 20px;
                font-weight: 600;
                color: aliceblue;
                text-shadow: 0 0 2px #ffffffAA;
            }
        }
    }
}
</style>