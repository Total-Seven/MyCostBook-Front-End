import { toRaw } from "vue";
import { defineStore } from "pinia";
import { getUserInfos, addCategory, deleteCategory, gerAllAcount, addBook, delBook, updateBook, editUserInfos, addAcount, delAccount } from "@/service";

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
        editUser_Infos: {},

        add_category_info: {},
        delete_category_info: {},
        //
        // Account
        account_data: {},
        add_account_info: {},
        del_account_info: {},
        // Book
        add_book_info: {},
        del_book_info: {},
        update_book_info: {},
    }),
    actions: {
        async getUserInfos() {
            console.group('Profile,发送网络请求');
            console.time('Profile')
            console.log('...loading',);
            const result = await getUserInfos()
            if (result) {
                console.log('!!!,请求成功🔥');
                this.user_info = result.data
                console.log(toRaw(this.user_info))
                console.timeEnd('Profile')
                console.groupEnd('Profile,发送网络请求');
            }
        },
        async Post_editUserInfos() {
            console.group('editUserInfos,发送网络请求');
            console.time('editUserInfos')
            console.log('...loading',);
            const result = await editUserInfos(this.editUser_Infos)
            if (result) {
                console.log('!!!,请求成功🔥');
                console.log(this.user_info.userInfo.username, toRaw(result.data.new_username));
                this.user_info.userInfo.username = result.data.new_username
                console.timeEnd('editUserInfos')
                console.groupEnd('editUserInfos,发送网络请求');
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
        async post_addAccount() {
            console.group('post_addAccount,网络请求')
            console.log('正在加载...');
            console.time('post_addAccount')
            return new Promise(async (resolve, reject) => {
                const res = await addAcount(this.add_account_info)
                if (res.code == 200) {
                    console.log('成功🔥', res.data);
                    resolve(res.data.insertId)
                    console.timeEnd('post_addAccount')
                    console.groupEnd('post_addAccount,网络请求')
                }
                else {
                    console.log('失败', res);
                    reject()
                }
            })

        },
        async post_delAccount() {
            console.group('post_delAccount,网络请求')
            console.log('正在加载...');
            console.time('post_delAccount')
            return new Promise(async (resolve, reject) => {
                const res = await delAccount(this.del_account_info)
                if (res.code == 200) {
                    console.log('成功🔥', res.data);
                    resolve(res.data)
                    console.timeEnd('post_delAccount')
                    console.groupEnd('post_delAccount,网络请求')
                }
                else {
                    console.log('失败', res);
                    reject()
                }
            })

        },
        async post_addBook() {
            console.group('post_addBook,网络请求')
            console.log('正在加载...');
            console.time('post_addBook')
            return new Promise(async (resolve, reject) => {
                const res = await addBook(this.add_book_info)
                if (res.code == 200) {
                    console.log('成功🔥', res.data);
                    resolve(res.data.insertId)
                    console.timeEnd('post_addBook')
                    console.groupEnd('post_addBook,网络请求')
                }
                else {
                    console.log('失败', res);
                    reject()
                }
            })

        },
        async post_delBook() {
            return new Promise(async (resolve, reject) => {
                const res = await delBook(this.del_book_info)
                if (res.code == 200) {
                    console.log(res.data);
                    resolve()
                }
                else {
                    console.log('失败', res);
                    reject()
                }
            })

        },
        async post_updateBook() {
            console.group('post_updateBook,网络请求')
            console.log('正在加载...');
            console.time('post_updateBook')
            return new Promise(async (resolve, reject) => {
                const res = await updateBook(this.update_book_info)
                if (res.code == 200) {
                    console.log('更新成功', res.data);
                    console.timeEnd('post_updateBook')
                    resolve(res.data)
                    console.groupEnd('post_updateBook,网络请求')
                }
                else console.log('失败', res);
            })
        }
    },
})
export default useCenterStore