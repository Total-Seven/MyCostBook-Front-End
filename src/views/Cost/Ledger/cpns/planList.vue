<script setup>

const planList = [
    {
        name: 'Saving a small vault',
        mode: '12 Deposit Slip',
        current_amount: 1000,
        total_amount: 18000,
        progress: 8,
        icon: 'money.svg',
    },
    {
        name: 'Saving a small vault',
        mode: '52 Weeks Deposit',
        current_amount: 800,
        total_amount: 16000,
        progress: 10,
        icon: 'building.svg',
    }, {
        name: 'Saving a small vault',
        mode: '365 Wdays Deposit',
        current_amount: 1000,
        total_amount: 18000,
        progress: 80,
        icon: 'letterBook.svg',
    }, {
        name: 'Saving a small vault',
        mode: '12 Save',
        current_amount: 800,
        total_amount: 16000,
        progress: 50,
        icon: 'coffee.svg',
    }, {
        name: 'Saving a small vault',
        mode: 'Quota',
        current_amount: 1000,
        total_amount: 18000,
        progress: 78,
        icon: 'hot.svg',
    }, {
        name: 'Saving a small vault',
        mode: 'Free',
        current_amount: 800,
        total_amount: 16000,
        progress: 0.10,
        icon: 'earphone.svg',
    }, {
        name: 'Saving a small vault',
        mode: 'flexible',
        current_amount: 1000,
        total_amount: 18000,
        progress: 44,
        icon: 'water.svg',
    },
]

function getUrl(img) {
    return new URL(`../../../../assets/img/home/SavePlan/${img}`, import.meta.url).href
}
</script>

<template>
    <div class="planList">
        <div class="title">
            <div class="left">
                <span>SaveMoney Plan</span>
                <van-icon name="arrow" />
            </div>
            <div class="right">
                <van-icon name="smile" color="rgba(66.17, 149.81, 143.75, 1) " size="2rem" />
            </div>
        </div>
        <div class="list">
            <template v-for="(item, index) in planList">
                <div class="item">
                    <div class="icon">
                        <img :src="getUrl(item.icon)" alt="">
                    </div>
                    <div class="content">
                        <div class="ctx top">
                            <span class="left">{{ item.name }}</span>
                            <span class="top_right"><span>{{ item.mode }}</span></span>
                        </div>
                        <div class="ctx middle">
                            <span class="current">deposited ￥{{ item.current_amount }}</span>
                            <span class="total">￥{{ item.total_amount }}</span>
                        </div>
                        <div class=" ctx foot">
                            <div class="progress">
                                <van-progress :percentage="item.progress"
                                    color="linear-gradient(to right,#42958F,#7AC5CD)" />
                                <!-- <van-progress :percentage="item.progress"
                                                                                                        color="linear-gradient(to right, #be99ff, #7232dd)" /> -->
                            </div>
                            <!-- <div div class=" rate">{{ item.progress }}</div> -->
                        </div>
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>

<style lang="less" scoped>
.planList {
    width: 370px;
    position: absolute;
    top: 350px;
    color: black;
    padding: 22px;
    margin-bottom: 80px;

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