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
        component: () => import('../views/admin/OurCar.vue')
    },
    {
        path: '/payments/addPayment',
        name: 'addpayment',
        component: () => import('../views/CreateEvidence.vue')
    },
    {
        path: '/showDetail/:car_id/:amountDay/:location/:dateStart/:dateEnd/:timeStart/:timeEnd',
        name: 'showDetail',
        component: () => import('../views/ShowDetail.vue')
    },
    {
        path: '/',
        name: 'selectCar',
        component: () => import('../views/SelectCar.vue')
    },
    {
        path: '/payments/getAllPayments',
        name: 'allPayment',
        component: () => import('../views/admin/AllPayment.vue')
    }
    // {
    //     path: '/payments',
    //     name: 'pay-ments',
    //     component: () => import('../views/admin/PaymentAll.vue')
    // },
   
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
