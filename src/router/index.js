import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Login = () =>
    import ("views/login/Login")

const Home = () =>
    import ('views/home/Home')

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home
    }
]

const router = new VueRouter({
    routes,
    mode: "history"
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
        //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
        next('/login')
    }
    next()
})

export default router