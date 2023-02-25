import { toRaw } from "vue";

import { defineStore } from "pinia";

import { getUserInfos, addCategory, deleteCategory, gerAllAcount, addBook, delBook, updateBook } from "@/service";

const useCenterStore = defineStore('center', {
    state: () => ({
        isClicktoEdit: false,
        enterDetail: false,
        // 
        enterCategoryManner_count: 0,
        enterIncome_number: 0,
        isFirstEnterIncome: true,
        isFirstEnterExpend: false,
        current_option: 'Expend',
        // 
        user_info: {},

        add_category_info: {},
        delete_category_info: {},
        //
        // Account
        account_data: {},
        // Book
        add_book_info: {},
        del_book_info: {},
        update_book_info: {},

    }),
    actions: {
        async getUserInfos() {
            console.log('Send : getUserInfos',);
            const result = await getUserInfos()
            if (result) {
                this.user_info = result.data
            }
        },
        async Post_addCategory(first_id, type_name) {
            console.log('Send: addCategory', this.add_category_info);
            const result = await addCategory(this.add_category_info)
            if (result) {
                const target = result.data.target.flat()
                const index = this.user_info.typess[type_name].findIndex(item => {
                    return item.id == first_id
                })
                const target_arr = this.user_info.typess[type_name][index].list
                target_arr.splice(-1, 0, ...target)
            }
            else {
                console.log('出错了');
            }
        },
        async Post_deleteCategory(id) {
            console.log('Send: deleteCategory', id);
            const res = await deleteCategory(this.delete_category_info)
            if (res.code == 200) {
                console.log('成功', res);
                console.log('二级ID:', id, '一级ID:', res.data.type_id[0].type_id); //，
                // this.user_info.typess
                function findIn(obj) {
                    for (const key in obj) {
                        console.log('开始遍历对象：', key);
                        const element = obj[key];
                        element.forEach(item => {
                            if (item.id == res.data.type_id[0].type_id) {
                                console.log(item);
                                const targetIndex = item.list.findLastIndex(el => {
                                    return el.id == id
                                })
                                console.log('!!!找到第一分类', targetIndex, toRaw(item.list));
                                if (targetIndex) {
                                    console.log('找到二级分类索引');
                                    const targetElement = item.list.splice(targetIndex, 1)
                                    if (targetElement) {
                                        console.log('删除二级分类成功,targetElement:', targetElement);
                                    }
                                    else {
                                        console.log('失败--删除二级分类');
                                    }
                                } else {
                                    console.log('没有找到二级分类');
                                }
                            } else {
                                console.log('未找到一级分类');
                                return null
                            }
                        })
                    }
                }
                findIn(this.user_info.typess)
            }
            else {
                console.log('出错了');
            }
        },
        async Get_allAccount() {
            const res = await gerAllAcount()
            if (res.code == 200) {
                console.log(res.data);
                this.account_data = res.data
            }
            else {
                console.log('失败');
            }
        },
        async post_addBook() {
            const res = await addBook(this.add_book_info)
            if (res.code == 200) {
                console.log(res.data);
            }
            elseP
            console.log('失败', res);
        },
        async post_delBook() {
            const res = await delBook(this.del_book_info)
            if (res.code == 200) {
                console.log(res.data);
            }
            elseP
            console.log('失败', res);
        },
        async post_updateBook() {
            return new Promise(async (resolve, reject) => {
                const res = await updateBook(this.update_book_info)
                if (res.code == 200) {
                    console.log('更新成功', res.data);
                    resolve(res.data)
                }
                else console.log('失败', res);
            })
        }
    },
})
export default useCenterStore