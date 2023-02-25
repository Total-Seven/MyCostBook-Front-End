import { createRouter, createWebHistory } from 'vue-router'
import useTabBarStore from '@/stores/modules/Tabbar';
import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/register',
    },
    {
      path: '/loading',
      name: '加载中',
      component: () => import('@/components/loading.vue')
    },
    {
      path: '/register',
      name: '注册',
      component: () => import('@/components/register.vue'),
      meta: {
        is_hidden_tabbar: true,
        index: 0
      }
    },
    {
      path: '/login',
      name: '登入',
      component: () => import('@/components/login.vue'),
      meta: {
        is_hidden_tabbar: true,
        index: 0
      }
    },
    {
      path: '/home',
      name: '首页',
      component: () => import('@/views/Cost/Ledger/home.vue'),
      meta: {
        is_hidden_tabbar: false,
        index: 1
      }
    },
    {
      path: '/cost:bookname',
      name: '记账',
      component: () => import('@/views/Cost/cost/cost.vue'),
      meta: {
        is_hidden_tabbar: false,
        index: 1,
        activeimg: 'remove.png',
        JumpPath: '/',
        right: '25px',
        left: '25px',
        changeTabBar(tabBarStore, to, from) {
          const { isShowBigButton, isShowBoundaries, tabBar } = storeToRefs(tabBarStore)
          isShowBigButton.value = true
          isShowBoundaries.value = false
          tabBar.value[0].activeimg = to.meta.activeimg
          tabBar.value[0].JumpPath = to.meta.JumpPath
          tabBar.value[1].style.right = to.meta.right
          tabBar.value[2].style.left = to.meta.left
        },
      },
      beforeEnter(to, from) {
        const tabBarStore = useTabBarStore()
        to.meta.changeTabBar(tabBarStore, to)
      }
    },
    {
      path: '/Chart',
      name: '图表',
      component: () => import('@/views/Chart/index.vue')
      ,
      meta: {
        is_hidden_tabbar: false,
        index: 2
      }
    },
    {
      path: '/Plan',
      name: '金库',
      component: () => import('@/views/Plan/index.vue'),
      meta: {
        is_hidden_tabbar: false,
        index: 3
      }
    },
    {
      path: '/Center',
      name: '用户中心',
      component: () => import('@/views/Center/index.vue'),
      meta: {
        is_hidden_tabbar: false,
        index: 4
      },
      children: [
        {
          path: '/account',
          name: '账户管理',
          component: () => import('@/views/Center/cpns/cpns/accountManager.vue'),
          meta: {
            is_hidden_tabbar: true
          }
        },
        {
          path: '/books',
          name: '账本管理',
          component: () => import('@/views/Center/cpns/cpns/ledgerManager.vue'),
          meta: {
            is_hidden_tabbar: true
          }
        },
        {
          path: '/typess',
          name: '类别管理',
          component: () => import('@/views/Center/cpns/cpns/categoryManager.vue'),
          meta: {
            is_hidden_tabbar: true
          }
        },
        {
          path: '/logout',
          name: '退出登陆',
          component: () => import('@/views/Center/cpns/cpns/logOut.vue'),
          meta: {
            is_hidden_tabbar: false
          }
        }
      ]
    }
  ]
})

// 这是普通保安👇
router.beforeEach(async (to, from) => {
  console.warn('to.fullPath:', to.fullPath);            // /chart
  console.warn('to.hash:', to.hash);                    // 
  console.warn('to matched:', to.matched);              // [{path,redirect,name,,meta,components,children,aliasOf,beforeEnter,enterCallbacks}]
  console.warn('to.meta:', to.meta);                    // {is_hidden_tabbar: false, index: 2}
  console.warn('to.name:', to.name);                    // 图表
  console.warn('to.params:', to.params);                // {}
  console.warn('to.path:', to.path);                    // /chart
  console.warn('to.redirectedFrom:', to.redirectedFrom);// undefined
  // 有点像生命周期哈？在导航生效之前，执行的异步操作。
  // return false
  /**
   * 无法跳转页面，URL没有路径，返回from路径
   * 
   * 可以做什么？
   * --限制非权限用户的跳转
   */
  // 不return呢？
  /**
   * 正常跳转，一切OK！🆗
   */
  // return true呢？
  /**
   * return true
   * 
   * 正常跳转，一切OK！🆗
   */
  // 打印log呢？
  // console.log('123', to.name, from.name);
  /**
   * 123 首页 undefined
   */
  // 打印路径的各个参数？

  /**
   * Tabbar-Index
   */
  const tabBarStore = useTabBarStore()
  const { current_index } = storeToRefs(tabBarStore)
  if (to.path == '/home') current_index.value = 0
  else if (to.path == '/chart') current_index.value = 1
  else if (to.path == '/plan') current_index.value = 2
  else if (to.path == '/center') current_index.value = 3

  // 鉴权
  if (to.path == '/register') { console.log('1'); }
  else if (sessionStorage.token) {
    console.log('用户已登入过,放行', sessionStorage.token);
  }
  else if (to.name !== '登入') {
    console.log('没有登入过，重定向至登入');
    return '/login'
  }

})
// 这是解析保安👇
router.beforeResolve(async to => {
  // 获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
// 这是钩子👇
router.afterEach((to, from, failure) => {
  // 对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

  // console.log(to.fullPath)
})
export default router 
