import { route } from 'quasar/wrappers'
import { useUserStore } from 'src/stores/user-store'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach( async (to, from, next) => {
    // console.log(to.meta);
    const requiredAuth = to.meta.auth
    const userStore = useUserStore()

    if( requiredAuth ) {

      if(localStorage.getItem('user') || userStore.token) {
        await userStore.refreshToken()
        return next()
      }
      
      return next('/login')
    } else if(localStorage.getItem('user')) {
      if(!requiredAuth) return next('/')
    } else {
      return next()
    }    
  })

  return Router
})
