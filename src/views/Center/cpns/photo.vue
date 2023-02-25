<script setup>
// Vue
import { ref } from 'vue';
// Router
import { useRouter } from 'vue-router';
// Store

// Setup
/**
 * 
 */
const router = useRouter()
/**
 * 变量
 */
const showBottom = ref(false)
/**
 * 方法
 */
const click = () => {
    console.log('popUp');
    showBottom.value = true
}
const overlay = (event) => {
    console.log('overlay');
    event.stopPropagation();
}
const out = () => {
    console.log('Out', sessionStorage.token);
    sessionStorage.removeItem('token')
    router.push('/login')
}
</script>

<template>
    <div class="photo" @click="click" @touchStart.stop.prevent>
        <img src="../../../assets/img/Profile_Center/Center_avatar.png" alt="">
        <span class="name">Enjelin Morgeana</span>
        <span class="sign">@Enjelin Morgeana</span>
        <van-popup class="popUp" @click="overlay" @click-overlay="overlay" v-model:show="showBottom" position="bottom"
            :style="{ height: '52%' }" round close-on-click-overlay=true>
            <div class="inner">
                <div class="topBanner">
                    <div class="left"><van-icon @click="showBottom = false" name="arrow-left" size="24" /></div>
                    <div class="middle"><span class="modify">Modify User</span></div>
                    <div class="right">
                        <div class="logOut" @click=out>
                            <div class="text">LogOut</div>
                        </div>
                    </div>
                </div>
                <div class="avatar">
                    <img src="../../../assets/img/Profile_Center/Center_avatar.png" alt="">
                </div>
                <div class="content">
                    <div class="box" id="one">
                        <input type="text" placeholder=" Rabbit much Money">
                        <div class="btn">Nickname</div>
                    </div>
                    <div class=" box" id="two">
                        <input type="text" placeholder=" general">
                        <div class="btn">UserType</div>
                    </div>
                    <div class=" box" id="three">
                        <input type="text" placeholder=" Unbound Wechat">
                        <div class="btn">Login</div>
                    </div>
                </div>
                <div class="submit">
                    <div class="btn" @click="submit">
                        <van-icon name="success" size="36" />
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<style lang="less" scoped>
.photo {
    width: 200px;
    height: 200px;
    position: absolute;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 306px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    img {
        /* Group 21 */
        // position: absolute;
        width: 140px;
        height: 140px;
        border-radius: 60px;
        box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.04);
    }

    .name {
        /* Enjelin Morgeana */
        width: 188px;
        height: 24px;

        color: rgb(34, 34, 34);
        font-family: Inter;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0%;
        text-align: center;
    }

    .sign {
        /* @enjelin_morgeana */
        // position: absolute;
        width: 144px;
        height: 17px;
        line-height: 17px;
        color: rgb(67, 136, 131);
        font-family: Inter;
        font-size: 14px;
        font-weight: 600;
        margin-top: 5px;
    }

    .popUp {
        position: relative;

        .inner {
            padding: 20px;

            .topBanner {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .middle {
                    position: relative;
                    top: 2px;
                    font-size: 20px;
                    font-weight: 550;
                    color: #333;

                }

                .right {
                    .text {
                        width: 50px;
                        height: 30px;
                        padding: 1px 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 12px;
                        background-color: #da3f3fDD;
                        color: #f3f3f3;
                        text-shadow: 0 0 1px #bfbfbf;
                    }
                }
            }

            .avatar {
                margin: 30px 0 20px 20px;

                img {
                    box-shadow: 0px 1px 15px #838383;
                    width: 80px;
                    height: 80px;
                }
            }

            .content {

                .box {
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 15px;
                    margin-top: 15px;

                    input[type="text"] {
                        // color: #fff;
                        background-color: #bfbfbfAA;
                        width: 70%;
                        height: 35px;
                        border: 0;
                        border-radius: 16px;
                        outline: none;
                    }

                    input::-webkit-input-placeholder {
                        // input::-moz-placeholder、input:-moz-placeholder 、 input:-ms-input-placeholder
                        color: #111111;
                        position: relative;
                        left: 10px;
                    }

                    .btn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 5px;
                        flex: 1;
                        height: 35px;
                        border-radius: 16px;
                        background-color: #bfbfbfAA;
                    }
                }
            }

            .submit {
                margin-top: 20px;
                display: flex;
                justify-content: flex-end;
                position: relative;
                left: -12px;

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
</style>