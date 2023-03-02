<script setup>
// Vue
import { ref } from 'vue';
// Router
import { useRouter } from 'vue-router';
// Utils
import { createURLObj } from '@/utils';
import docCookies from '@/utils/docCookies';
// Vant
import 'vant/es/dialog/style'
import 'vant/es/toast/style'
import { showLoadingToast, closeToast } from 'vant';
// Store
import useCenterStore from '@/stores/modules/center';
import { storeToRefs } from 'pinia';
const centerStore = useCenterStore()
const { user_info, editUser_Infos } = storeToRefs(centerStore)
// 路由
const router = useRouter()

/**
 * 变量
 */
const show = ref(false);        // 确认退出？
const showBottom = ref(false)   // "修改用户信息" 以及 "退出登陆" 页面
const Ref_name = ref()
const inputname = ref()
/**
 * 方法
 */
const out = () => {      // 点击 退出登录 
    show.value = true
}
const confirm = () => {  // 确认 退出登录 
    console.log('退出登陆');
    sessionStorage.removeItem('token')
    router.push('/login')
}

const submit = () => {
    // 判断是否改变了名字、头像、默认账本
    // 否则不发送
    if (user_info.value.userInfo?.username == inputname.value) return
    // 是则发送网络请求
    else {

        console.log('Send');
        editUser_Infos.value = createURLObj({ new_username: inputname.value })
        centerStore.Post_editUserInfos()
        // 弹出提示 ：重新登陆
        const toast = showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请重新登录...3',
        });
        let second = 3;
        const timer = setInterval(() => {
            second--;
            if (second) {
                toast.message = `请重新登录... ${second}`;
            } else {
                clearInterval(timer);
                closeToast();
            }
        }, 1000);
        // 
        docCookies.removeItem('userName')
        docCookies.removeItem('password')
        setTimeout(() => {
            router.push('/login')
        }, 2800)
    }
}
const closed = () => {
    if (user_info.value.userInfo?.username != inputname.value) {
        inputname.value = ''
    }
}
</script>

<template>
    <div class="photo" @click="showBottom = true" @touchStart.stop.prevent>
        <img src="../../../assets/img/Profile_Center/Center_avatar.png" alt="">
        <span class="name">{{ user_info?.userInfo?.username }}</span>
        <span class="sign">@{{ user_info?.userInfo?.username }}</span>
        <van-popup class="popUp" @closed="closed" @click="$event.stopPropagation();"
            @click-overlay="$event.stopPropagation();" v-model:show="showBottom" position="bottom"
            :style="{ height: '52%' }" round>
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
                        <input v-model="inputname" class="inputname" type="text" :placeholder="user_info.userInfo?.username"
                            ref="Ref_name">
                        <div class="btn"> Name</div>
                    </div>
                    <div class=" box" id="two">
                        <input type="text" placeholder=" general" disabled>
                        <div class="btn">UserType</div>
                    </div>
                    <div class=" box" id="three">
                        <input type="text" placeholder=" Unbound Wechat" disabled>
                        <div class="btn">Bound</div>
                    </div>
                </div>
                <div class="submit">
                    <div class="btn" @click="submit">
                        <van-icon name="success" size="36" />
                    </div>
                </div>
            </div>
        </van-popup>
        <van-dialog @confirm="confirm" v-model:show="show" title="Really？" show-cancel-button
            confirm-button-color=" rgba(66.17, 149.81, 143.75, 1)">
            <template #title>
                <div>
                    <span>Really？</span>
                </div>
            </template>
        </van-dialog>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.photo {
    z-index: 3;
    position: absolute;
    .flex();
    flex-direction: column;
    top: 306px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 200px;
    height: 200px;

    img {
        width: 140px;
        height: 140px;
        border-radius: 60px;
        box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.04);
    }

    .name {
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
        margin-top: 5px;
        margin-right: 5px;
        color: rgb(67, 136, 131);
        font-family: Inter;
        font-size: 14px;
        font-weight: 600;
    }

    .popUp {
        position: relative;

        .inner {
            padding: 20px;

            .topBanner {
                .flex-between();

                .middle {
                    position: relative;
                    top: 2px;
                    font-size: 20px;
                    font-weight: 550;
                    color: #333;

                }

                .right {
                    .text {
                        .flex();
                        width: 50px;
                        height: 30px;
                        padding: 1px 5px;
                        color: #f3f3f3;
                        text-shadow: 0 0 1px #bfbfbf;
                        border-radius: 12px;
                        background-color: #da3f3fDD;
                    }
                }
            }

            .avatar {
                margin: 30px 0 20px 20px;

                img {
                    width: 80px;
                    height: 80px;
                    box-shadow: 0px 1px 15px #838383;
                }
            }

            .content {

                .box {
                    .flex-between();
                    box-sizing: border-box;
                    padding: 0 15px;
                    margin-top: 15px;

                    input[type="text"] {
                        width: 70%;
                        height: 35px;
                        text-align: center;
                        background-color: #bfbfbfAA;
                        outline: none;
                        border: 0;
                        border-radius: 16px;

                    }

                    input::-webkit-input-placeholder {
                        // input::-moz-placeholder、input:-moz-placeholder 、 input:-ms-input-placeholder
                        position: relative;
                        color: #111111;
                        // left: 10px;
                    }

                    .inputname:focus::placeholder {
                        opacity: 0;
                    }


                    .btn {
                        .flex();
                        flex: 1;
                        margin-left: 5px;
                        height: 35px;
                        border-radius: 16px;
                        background-color: #bfbfbfAA;
                    }
                }
            }

            .submit {
                display: flex;
                justify-content: flex-end;
                position: relative;
                left: -12px;
                margin-top: 20px;

                .btn {
                    width: 100px;
                    height: 50px;
                    border-radius: 24px;
                    background-color: #429690;
                    .flex();
                }
            }
        }

    }

}
</style>