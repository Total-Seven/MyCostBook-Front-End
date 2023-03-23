<script setup>
// 
import { toRaw } from 'vue';
// 
import { useRouter } from 'vue-router';
// 网络请求
import LAxios from '@/service/request/index'
// Store
import useLoginStore from '@/stores/modules/login';
import { storeToRefs } from 'pinia';
// 
const loginStore = useLoginStore()
const { books, plan_list, user_info } = storeToRefs(loginStore)
const router = useRouter()
//
if (Object.prototype.toString.call(books.value) == '[object Object]' && Object.keys(books.value).length === 0) {
    const res = await LAxios.get({
        url: '/user/get_userinfo'
    })
    if (res.code == 200) {
        // 
        function del_shooping_book(raw_arr) {
            console.log(raw_arr);
            const targetIndex = raw_arr.findIndex(el => {
                return el.name == '购物清单'
            })
            return raw_arr.splice(targetIndex - 1, 1)
        }
        const new_books = del_shooping_book(res.data.books)
        console.log(new_books);
        // 
        books.value = new_books
        plan_list.value = res.data.plan
        user_info.value.infos.budget = res.data.userInfo.budget
        user_info.value.net = res.data.net
        user_info.value.saved_money = res.data.Saved_Money
    }
    else console.log(res);
}
function getUrl(img) {
    return new URL(`../../../../assets/img/home/${img}`, import.meta.url).href
}
const click = (bookName, bookId, bookType) => {
    // console.log(bookName, user.value.book.current_bookName);
    // if (bookName === user.value.book.current_bookName) {
    //     console.log(true);
    // }
    // else {
    //     // 发送网络请求，
    //     // 修改current_bookName
    //     user.value.book.current_bookName = bookName
    //     user.value.book.current_book_id = bookId
    //     user.value.book.current_book_type = bookType
    //     favorStore.get_bill_list(true)
    // }
    router.push('/cost:' + bookId)
}
</script>

<template>
    <div class="mybook">
        <template v-for="(book, index) in books" :key="book.id">
            <div class="book" @click="click(book.name, book.id, book.book_type)">
                <h2>{{ book.name }}</h2>
                <img :src="getUrl(book.img)" style="position: relative; display: block;" :style="book.style" />
                <img src="@/assets/img/home/default.svg" style="position: relative; display: block;left:25px"
                    :style="book.style" />
                <div class="foot"></div>
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
.mybook {
    position: relative;
    z-index: 2;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    top: 45px;
    color: #fff;

    // justify-content: space-evenly;
    // padding: 10px;
    &::-webkit-scrollbar {
        display: none;
    }

    .book {
        width: 105px;
        height: 130px;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        // align-items: center;
        flex-shrink: 0;
        // background-color: pink;
        background-color: #cfcfcf;
        border-color: #cfcfcfAA;
        border-radius: 25% 10% 10% 10%;
        box-shadow: 0 2px 2px #cfcfcfAA;
        margin-left: 20px;


        h2 {
            display: inline-block;
            padding: 10px;
            font-family: Inter;
            text-align: center;
            font-size: 16px;
            position: relative;
            top: -2px;
        }
    }

    .book::after {
        content: ' ';
        display: block;
        width: 105px;
        height: 130px;
        // background-color: aqua;
        border-radius: 0 0 10% 10%;
        position: absolute;
        bottom: 0;
    }
}
</style>