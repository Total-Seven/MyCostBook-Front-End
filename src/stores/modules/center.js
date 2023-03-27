import { toRaw } from "vue";
import { defineStore } from "pinia";
import { getUserInfos, addCategory, deleteCategory, modifyCategory, gerAllAcount, modifyAcount, addBook, delBook, updateBook, editUserInfos, addAcount, delAccount } from "@/service";

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
        user_default_book_id: 0,
        // 
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
        /**
         * 用户
         */
        async getUserInfos() {
            console.group('Profile,发送网络请求');
            console.time('Profile')
            console.log('...loading',);
            const result = await getUserInfos()
            if (result) {
                console.log('!!!,请求成功🔥', result.data);
                this.user_info = result.data
                this.user_default_book_id = result.data.userInfo.default_book_id
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
        /**
         * 类别
         */
        async Post_addCategory(first_id, type_name, isCostPage = false) {
            console.group('Post_addCategory')
            return new Promise(async (resolve) => {
                const result = await addCategory(this.add_category_info)
                if (!result) {
                    console.error('出错了');
                    return
                }
                const target = result.data.target.flat()
                console.log('%c', this.user_info.typess, 'background:orange');
                if (!isCostPage) {
                    const index = this.user_info.typess[type_name].findIndex(item => {
                        return item.id == first_id
                    })
                    const target_arr = this.user_info.typess[type_name][index].list
                    target_arr.splice(-1, 0, ...target)
                }

                // 
                resolve(target[0].id)
                console.groupEnd('Post_addCategory')
            })

        },
        async Post_deleteCategory(id, first_id) {
            console.group('Send: deleteCategory', id);
            const res = await deleteCategory(this.delete_category_info)
            if (res.code == 200) {
                console.log('🔥删除成功🔥, res.data:', res.data);
                // console.log('二级ID:', id, '一级ID:', first_id); //，
                // this.user_info.typess
                function findIn(obj) {
                    for (const key in obj) {
                        // console.group('开始遍历对象的key:', key);
                        const element = obj[key];
                        f: for (let j = 0; j < element.length; j++) {
                            const item = element[j]
                            // }
                            //     element.forEach(item => {
                            if (item.id == first_id) {
                                const targetIndex = item.list.findLastIndex(el => {
                                    // console.group()
                                    // console.log(el.id);
                                    // console.groupEnd()
                                    return el.id == id
                                })
                                // console.warn('!!!找到第一分类', toRaw(item), '开始找二级索引');
                                if (targetIndex !== -1) {
                                    // console.warn('找到二级分类索引', targetIndex);
                                    const targetElement = item.list.splice(targetIndex, 1)
                                    if (targetElement) {
                                        // console.log('删除二级分类成功,targetElement:', toRaw(targetElement));
                                        // break f;
                                        return
                                    }
                                    else {
                                        console.log('失败--删除二级分类');
                                    }
                                } else {
                                    console.log('没有找到二级分类');
                                }
                            } else {
                                console.log('未找到一级分类');
                            }
                        }
                        console.groupEnd('开始遍历对象的key:', key);
                    }
                }
                findIn(this.user_info.typess)
            }
            else {
                console.log('出错了');
            }
            console.groupEnd('Send: deleteCategory', id);
        },
        async Post_Modify_CategoryName(first_id, type_name, data) {
            return new Promise(async (resolve) => {
                const result = await modifyCategory(data)
                if (!result) {
                    console.error('出错了');
                    return
                }
                else if (result.code === 200) {
                    resolve()
                }
            })
        },
        /**
         * 账户
         */
        async Get_allAccount() {
            const res = await gerAllAcount()
            if (res.code == 200) {
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
        async post_ModifyAccount(data) {
            console.group('post_ModifyAccount,网络请求')
            console.time('post_ModifyAccount')
            return new Promise(async (resolve, reject) => {
                const res = await modifyAcount(data)
                if (res.code == 200) {
                    resolve(res.data)
                    console.timeEnd('post_ModifyAccount')
                    console.groupEnd('post_ModifyAccount,网络请求')
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
        /**
        * 账本
        */
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