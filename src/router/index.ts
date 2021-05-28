import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect:'/semester'
  },{
    path: '/semester',
    name: 'Semester',
    component: () => import('../views/Semester.vue')
  },{
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },{
    path: '/day',
    name: 'Day',
    component: () => import('../views/Day.vue')
  },{
    path: '/week',
    name: 'Week',
    component: () => import('../views/Week.vue')
  },{
    path: '/month',
    name: 'Month',
    component: () => import('../views/Month.vue')
  },{
    path: '/part',
    name: 'Part',
    component: () => import('../views/Part.vue')
  },{
    path: '/109in',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },{
    path: '/back',
    name: 'Back',
    component: () => import('../views/Back.vue')
  },{
    path: '/8222021519/:token',
    name: 'AInputScore',
    component: () => import('../views/Admin/AInputScore.vue')
  },{
    path: '/9022021520/:token',
    name: 'AUpdateScore',
    component: () => import('../views/Admin/AUpdateScore.vue')
  },{
    path: '/9222021521/:token',
    name: 'ADetermineScore',
    component: () => import('../views/Admin/ADetermineScore.vue')
  },{
    path: '/10032021522/:token',
    name: 'AConfigOptions',
    component: () => import('../views/Admin/AConfigOptions.vue')
  },{
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//配置访问错误的路由
router.beforeEach(((to, from, next) => {
  if (to.matched.length === 0){
    from.name ? next({
      name:from.name
    }) : next('/404');
  }else{
    next();
  }
}))

export default router
