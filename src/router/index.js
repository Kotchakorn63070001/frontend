import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'home',
    //     component: () => import('../views/HomePage.vue')
    // },
    {
        path: '/cars/getAllCars',
        name: 'ourcar',
        meta: {login : true},
        component: () => import('../views/admin/OurCar.vue')
    },
    {
        // cus
        path: '/payments/addPayment',
        name: 'addpayment',
        meta: {guess: true},
        component: () => import('../views/CreateEvidence.vue')
    },
   {
    // cus
        path: '/showDetail/:car_id/:amountDay/:location/:dateStart/:dateEnd/:timeStart/:timeEnd',
        name: 'showDetail',
        meta: {guess: true},
        component: () => import('../views/ShowDetail.vue')
    },
    {
        // cus
        path: '/',
        name: 'selectCar',
        meta: {guess: true},
        component: () => import('../views/SelectCar.vue')
    },
    {
        // cus
        path: '/:order_carId/:type/:timeStart/:timeEnd/:dateStart/:dateEnd/:location',
        name: 'backToSelectCar',
        meta: {guess: true},
        component: () => import('../views/BackToSelectCar.vue')
    },
    {
        path: '/payments/getAllPayments',
        name: 'allPayment',
        meta: {login : true},
        component: () => import('../views/admin/AllPayment.vue')
    },
    {
        path: '/order',
        name: 'order',
        meta: {login : true},
        component: () => import('../views/admin/OrderAll.vue')
    },
    {
        path: '/admin/logIn',
        name: 'logIn',
        meta: {guess: true},
        component : () => import('../views/admin/LogInPage.vue')
    },
    {
        path: '/admin/signUp',
        name: 'singUp',
        meta: {guess: true},
        component: () => import('../views/admin/SignUpPage.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    
    const isLoggedIn = !!localStorage.getItem('Token')
    // console.log(isLoggedIn+"1")
    console.log(localStorage.getItem('Token'))
        if (to.meta.login && !isLoggedIn) {
      alert('Please login first!')
    //   console.log(isLoggedIn+"none")
      next({ path: '/admin/logIn' })
    }
   
   
    next()
})

export default router
