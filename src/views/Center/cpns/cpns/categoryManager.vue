<script setup>
import { ref, computed, onMounted } from 'vue'
import useCenterStore from '@/stores/modules/center';
import categoryContent from './cpns/category_content.vue'
// Until
import { Myfor } from '@/utils'
// 
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const router = useRouter()

const centerStore = useCenterStore()
const { isClicktoEdit, current_option, enterCategoryManner_count } = storeToRefs(centerStore)

const props = defineProps({
    test: {
        type: Object,
        default: () => { }
    }
})
/* 改变props */
const typess = computed(() => props.test)
// 新增一个属性控制显示隐藏
function addProperty() {
    const for_cb = (element) => {
        element.hide = true
        if (element.list) {
            element.list.push({ id: 0, name: '+', type_id: 1, user_id: 2, avator: '0', noShark: true })
        }
        else {
            element.list = [{ id: 0, name: '+', type_id: 1, user_id: 2, avator: '0', noShark: true }]
        }
        // console.log(element);
    }
    const insert_Last_Button = (arr) => {
        Myfor(arr, for_cb)
    }
    // 
    if (enterCategoryManner_count.value == 0) {
        insert_Last_Button(typess.value['Expend'])
        insert_Last_Button(typess.value['Income'])
        enterCategoryManner_count.value++
    }
}
addProperty(0)
// 
const current_index = ref(0)
const shift = (index, key) => {
    console.log('shift', index, key);
    current_index.value = index
    current_option.value = key
}

const types = computed(() => {
    if (!typess.value) return       // 卸载时也会计算 ，需要返回
    return typess.value[current_option.value]
})

const edit = () => {
    isClicktoEdit.value == true ? isClicktoEdit.value = false : isClicktoEdit.value = true
}
</script>

<template>
    <div class="categoryManager">
        <div class="banner">
            <div class="left"><span>&ensp;&ensp;</span></div>
            <div class="middle">Categories</div>
            <div class="right"><span>&ensp;&ensp;</span></div>
        </div>
        <div class="options">
            <div class="Ol"><van-icon @click="router.back()" name="arrow-left" size="16px" /></div>
            <div class="Om">
                <div class="menu">
                    <template v-for="(value, key, index) in test" :key="index">
                        <div class=" item " :class="{ active: current_index == index }" @click="shift(index, key)"><span>{{
                            key
                        }}</span></div>
                    </template>
                </div>
            </div>
            <div class="Or"><van-icon @click="edit" name="edit" size="20" /></div>
        </div>
        <categoryContent :types="types" class="content" />
        <!-- <span>{{ test }}</span> -->
    </div>
</template>

<style lang="less" scoped>
.categoryManager {
    padding: 30px 20px 10px;
    box-sizing: border-box;
    position: fixed;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    background-color: #e2e2e2;
    display: flex;
    flex-direction: column;

    .banner {
        flex-shrink: 0;
        margin-top: 10px;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .middle {
            font-weight: 600;
            font-size: 20px;
        }
    }

    .options {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .menu {
            background-color: #dcdada;
            // 
            display: flex;
            justify-content: center;
            align-items: center;
            // 
            width: 160px;
            height: 30px;
            padding: 3px;
            // border: 1px solid #438883;
            border-radius: 12px;
            color: #438883;

            .item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
                height: 30px;
                // background-color: #ece9e9;
                border-radius: 8px;
            }

            .active {
                background-color: #fff;
            }

            span {
                line-height: 24px;
            }

            .icon {
                margin-left: 10px;
            }
        }
    }

    .content {
        margin-top: 25px;
        height: calc(100vh-10px-5vh-20px-30px);
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

}
</style>