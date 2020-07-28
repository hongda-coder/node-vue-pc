import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => { 
  NProgress.start() // 跳转之前
  document.title = getPageTitle(to.meta.title) 
  const hasToken = getToken() 
  if (hasToken) {
    next() // 如果有toekn  可以走下一步
    NProgress.done()
    await store.dispatch('user/getInfo')
  } else { 
    if (whiteList.indexOf(to.path) !== -1) { 
      next()
    } else { 
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
