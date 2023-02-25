<script setup>
// 响应式API
import { ref, watch } from 'vue';
// 路由
import { useRouter } from 'vue-router'
// Store
import useLoginStore from '@/stores/modules/login'
import { storeToRefs } from 'pinia';
// 组件
import loading from './loading.vue';
// Hook
import { createURLObj } from '@/utils/URLSearchParams';

const loginStore = useLoginStore()
const { submit_login, token, isShowanimation } = storeToRefs(loginStore)
// 路由
const router = useRouter()
const username = ref()
const password = ref()
// 
const text = ref('登入')
const title = ref('登入')
// ...
watch([username, password], ([newV1, newV2], [oldV1, oldV2]) => {
    console.log(newV1, newV2);
})

/**
 * 网络请求
 */
const click = () => {
    // 数值写入
    if (!username.value || !password.value) {
        title.value = '用户名和密码不能为空！'
        setTimeout(() => {
            title.value = '登入'
        }, 1000)
        return
    }
    submit_login.value = createURLObj({ username: username.value, password: password.value })
    // 发送请求
    loginStore.PostLogin().then(res => {
        title.value = `Let's Go`
        setTimeout(() => {
            console.log('1.登入,', res.data.token);
            sessionStorage.setItem('token', res.data.token)
            router.push('/home')
            isShowanimation.value = false
        }, 1000)
    }).catch(res => {
        text.value = res.msg
        setTimeout(() => {
            text.value = '登入'
            title.value = '忘记密码?'
        }, 1500)
    })
}

</script>

<template>
    <div class="login">
        <div class="pic" ref="Ref_pic">
            <img class="people" src="@/assets/img/login/loginperson.svg" alt="">
            <div class="title">
                <h1 v-html="title"></h1>
            </div>
            <form class="form">
                <div class="username glass">
                    <div class="icon"><img class="little" src="@/assets/img/register/user.svg" alt=""></div>
                    <div class="text"><input v-model="username" type="text" placeholder="用户名" name="name" id="name"
                            onfocus="if(this.value=='用户名'){this.value='';}" required autofocus>
                    </div>
                </div>
                <div class="password glass">
                    <div class="icon"><img class="little" src="@/assets/img/register/password.svg" alt=""></div>
                    <div class="text"><input v-model="password" type="text" placeholder="密码" name="name" id="name"
                            onfocus="if(this.value=='密码'){this.value='';}" required autofocus></div>
                </div>
                <div class="signUp" @click="click">
                    <span v-if="isShowanimation == false" v-html="text"></span>
                    <div class="loading" v-if="isShowanimation == true">
                        <loading />
                    </div>

                </div>
                <div class="tip">
                    <div>Have Not Account? <span @click="router.push('/')"> Sign up</span></div>
                </div>
                <!-- <div class="others">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class="box">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <img class="qq" src="@/assets/img/login/QQ.svg" alt="">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <img class="wechat" src="@/assets/img/login/wechat.svg" alt="">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div> -->


            </form>
        </div>
        <div class="halo">
            <img class="blur" src="@/assets/img/register/blur.svg" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.toast {
    z-index: 10000 !important
}

.login {
    position: relative;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    // background-color: #ffffffAA;
    // backdrop-filter: blur(16px);

    .halo {
        position: fixed;
        z-index: 0;
        bottom: -20px;
        right: 70px;

        .blur {
            transform: scale(2);
            // opacity: 0.9;
            width: 100%;
        }
    }

    .pic {

        position: relative;
        display: flex;
        z-index: 1;
        flex-direction: column;
        align-items: center;

        img.people {
            position: relative;
            width: 80%;
            margin-bottom: 20px;
            margin-top: 60px;
        }

        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            // color: #c1bebe;
        }

        .form {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .glass {
                width: 317.4px;
                height: 53.68px;
                background-color: rgba(255, 255, 255, 0.181);
                backdrop-filter: blur(100px);
                // filter: blur(16px);
                margin-bottom: 20px;
                border-radius: 25px;
                padding: 5px 12px;
                display: flex;
                // justify-content: center;
                align-items: center;

                .icon {
                    border-radius: 22.5px;
                    width: 40px;
                    height: 40px;
                    background-color: #fff;
                }

                .text {
                    margin-left: 20px;
                    color: rgba(255, 255, 255, 0.181);
                    font-size: 14px;
                    display: flex;
                    justify-content: center;
                    align-items: centers;

                    input {
                        width: 100%;
                        height: 100%;
                        color: rgba(0, 0, 0, 0.5);
                        background-color: transparent;
                        border: 0;
                    }

                    input:focus {
                        outline: none;
                    }
                }
            }

            .icon {

                display: flex;
                justify-content: center;
                align-items: center;

                .little {
                    // position: relative;
                    // top: 5px;
                    width: 18px;
                    height: 18px;
                }
            }

            .username {
                margin-top: 20px
            }

            .signUp {
                position: relative;
                margin-top: 15px;
                width: 317.4px;
                height: 53.68px;
                background-color: black;
                border-radius: 48px;
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    color: #fff;
                    font-weight: 600;
                }

                .loading {
                    width: 100%;
                    position: relative;
                    left: 6px; // margin: auto;
                    // transform: translate(50%);
                }
            }

            .signUp:active {
                background-color: rgba(0, 0, 0, 0.9);
            }

            .tip {
                position: absolute;
                bottom: -40px;

                div {
                    /* Already have account? Log In */
                    width: 209px;
                    height: 17px;
                    // color: rgb(68, 68, 68);
                    color: #7c7c7c;
                    font-family: Inter;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 17px;
                    text-align: center;

                    span {
                        font-weight: 600;
                    }
                }
            }

        }

        .others {
            width: 317.4px;
            height: 120px;
            // display: flex;
            // justify-content: center;
            // align-items: center;

            .box {
                margin-top: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;

            }
        }
    }
}
</style>