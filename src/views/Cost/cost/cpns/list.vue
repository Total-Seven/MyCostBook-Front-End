<script setup>
const list = [
    { icon: 'bangzhushouce.svg', name: 'Upwork', amount: '850.00', date: 'Today', style: { color: 'red' } },
    { icon: 'gongwenbao.svg', name: 'Transfer', amount: '85.00', date: 'Yesterday', style: { color: 'green' } },
    { icon: 'jinggao.svg', name: 'Paypal', amount: '1,850.00', date: 'Jan 30,2022', style: { color: 'red' } },
    { icon: 'shezhi.svg', name: 'Youtube', amount: 850.00, date: 'Today', style: { color: 'green' } },
    { icon: 'houtaishuju.svg', name: 'ins', amount: '11.99', date: 'Yesterday', style: { color: 'green' } },
    { icon: 'shujuanquan.svg', name: 'Facebook', amount: 850.00, date: 'Jan 30,2022', style: { color: 'red' } },
    { icon: 'shouji-yidongduanxiazai.svg', name: 'Upwork', amount: 850.00, date: 'Today' },
    { icon: 'shujubiaoge.svg', name: 'Upwork', amount: 850.00, date: 'Jan 30,2022', style: { color: 'red' } },
    { icon: 'yuechi.svg', name: 'Upwork', amount: 850.00, date: 'Today', style: { color: 'green' } },
    { icon: 'ziyuan42.svg', name: 'Upwork', amount: 850.00, date: 'Yesterday', style: { color: 'red' } },
    { icon: 'ziyuan22.svg', name: '', amount: 850.00, date: 'Jan 30,2022', style: { color: 'green' } },
]


function getUrl(img) {
    return new URL(`../../../../assets/img/cost/list/other/${img}`, import.meta.url).href
}
</script>

<template>
    <div class="list">
        <div class="title">
            <div class="titleInner">
                <div class="left">
                    <h3>Transactions History</h3>
                </div>
                <div class="right"><span>See all</span></div>
            </div>
        </div>
        <div class="bills">
            <template v-for="(item, index) in list" :key="index">
                <van-swipe-cell>
                    <template #left>
                        <van-button square type="primary" text="标记" class="delete-button-left" />
                    </template>

                    <div class="item">
                        <div class="left">
                            <div class="picture">
                                <!-- <img src="../../../../assets/img/cost/list/airbnb.svg" alt="" -->
                                <!-- style="display: block;width: 44px;height:40px"> -->
                                <img :src="getUrl(item.icon)" alt="" style="display: block;width: 35px;height:35px">
                            </div>
                            <div class="infos">
                                <div class="top"><span>{{ item.name }}</span></div>
                                <div class="bottom"><span>{{ item.date }}</span></div>
                            </div>
                        </div>
                        <div class="amount" :style="item.style"><span>${{ item.amount }}</span></div>
                    </div>
                    <template #right>
                        <van-button square type="danger" text="删除" class="delete-button-right" />
                        <van-button square type="primary" text="退款" class="delete-button-right"
                            style="background-color: pink;border-color: pink;" />
                    </template>
                </van-swipe-cell>
            </template>

        </div>
</div>
</template>

<style lang="less" scoped>
.list {
    position: absolute;
    top: 370px;
    padding: 0 25px;
    width: 90vw;
    // 视口的高度-表格的bottom-（users顶部到页面视口的距离）
    // height: 100vh;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    .title {
        // box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

        .titleInner {
            display: flex;
            justify-content: space-between;
            // padding: 5px;
            box-sizing: border-box;

            .left {
                color: #222;
                font-size: 16px;
            }

            .right {
                color: #666666;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                position: relative;
                right: 10px;
            }
        }

    }

    .bills {
        display: flex;
        flex-direction: column;

        .delete-button-right {
            margin-left: 1px;
            height: 100%;
        }

        .delete-button-left {
            margin-right: 1px;
            height: 100%;
            background-color: var(--primary--color);
            border-color: var(--primary--color);
        }

        .item {
            display: flex;
            width: 100%;
            height: 66px;
            padding: 0 0 0 0;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            .left {
                display: flex;

                .picture {
                    display: flex;
                    position: relative;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    background-color: #D0E6E4FF;

                }

                .infos {
                    margin-left: 15px;
                    display: flex;
                    flex-direction: column;

                    .top {
                        font-size: 16px;
                        font-weight: 550;
                        color: #333;
                    }

                    .bottom {
                        color: #8c8686;
                        font-size: 12px;
                        margin-top: 10px;
                    }
                }
            }

            .amount {
                font-weight: 700;
                font-size: 16px;
                filter: blur(0.1px);
            }
        }

    }
}
</style>