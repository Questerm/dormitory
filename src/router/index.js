import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView'

const routes = [
  {
    path: '/',
    name: '/',
    component: LoginView
  },
  {
    path: '/shopHome',
    name: 'shopHome',
    component: () => import ('@/views/ShopHomeView'),
    meta: { '商家': true },
  },
  {
    path: '/order',
    name: 'order',
    component: () => import ('@/views/OrderView'),
    meta: { '用户': true },
  },
  {
    path: '/success',
    name: 'success',
    component: () => import ('@/views/SuccessView'),
    meta: { '用户': true },
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () => import ('@/views/GoodsDetailView'),
    meta: { '用户': true },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import ('@/views/FeedbackView'),
    meta: { '用户': true },
  },
  {
    path: '/adminComplaints',
    name: 'adminComplaints',
    component: () => import ('@/views/AdministratorComplaintsiView'),
    meta: { '管理员': true },
  },
  {
    path: '/adminiPerson',
    name: 'adminiPerson',
    component: () => import ('@/views/AdminiPersonView'),
    meta: { '管理员': true },
  },
  {
    path: '/adminMarki',
    name: 'adminMarki',
    component: () => import ('@/views/AdministratorMarkiView'),
    meta: { '管理员': true },
  },
  {
    path: '/adminShop',
    name: 'adminShop',
    component: () => import ('@/views/AdministratorShopView'),
    meta: { '管理员': true },
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: () => import ('@/views/AdministratorHomeView'),
    meta: { '管理员': true },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import ('@/views/HomeView'),
    meta: { '用户': true },
  },
  {
    path: '/shopinfo',
    name: 'shopinfo',
    component: () => import ('@/views/ShopInfoView'),
    meta: { '商家': true },
  },
  {
    path: '/shoppingCar',
    name: 'shoppingCar',
    component: () => import ('@/views/ShoppingCarView'),
    meta: { '用户': true },
  },
  {
    path: '/userperson',
    name: 'userperson',
    component: () => import ('@/views/UserPersonView'),
    meta: { '用户': true },
  },
  {
    path: '/shopperson',
    name: 'shopperson',
    component: () => import ('@/views/ShopPersonView'),
    meta: { '商家': true },
  },
  {
    path: '/markiperson',
    name: 'markiperson',
    component: () => import ('@/views/MarkiPersonView'),
    meta: { '骑手': true },
  },
  {
    path: '/suppleshopowner',
    name: 'suppleshopowner',
    component: () => import ('@/views/SuppleShopownerView'),
    
  },
  {
    path: '/supplemarki',
    name: 'supplemarki',
    component: () => import ('@/views/SuppleMarkiView')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('@/views/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import ('@/views/RegisterView')
  },
  {
    path: '/suppleuser',
    name: 'suppleuser',
    component: () => import ('@/views/SuppleUserView')
  },
  {
    path: '/markiHome',
    name: 'markiHome',
    component: () => import ('@/views/MarkiHomeView'),
    meta: { '骑手': true },
  },
  {
    path: '/orderShop',
    name: 'orderShop',
    component: () => import ('@/views/OrderShopView'),
    meta: { '商家': true },
  },
  {
    path: '/shopcomment',
    name: 'shopcomment',
    component: () => import ('@/views/ShopCommentView'),
    meta: { '商家': true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const cookieData = localStorage.getItem('token');
  if (to.name === "/" || to.name === "login" || to.name === "suppleshopowner" || to.name === "supplemarki" || to.name === "register" || to.name === "suppleuser") {
    if (cookieData) {
      if (localStorage.getItem('role') === '用户') {
        next({
          path: "/home"
        });
      } else if (localStorage.getItem('role') === '商家') {
        next({
          path: "/shopHome"
        });
      } else if (localStorage.getItem('role') === '管理员') {
        next({
          path: "/adminHome"
        });
      } else if (localStorage.getItem('role') === '骑手') {
        next({
          path: "/markiHome"
        });
      } 
    } else {
      next();
    } 
  } else {
    if (to.meta[localStorage.getItem('role')]) {
      next();
    } else {
      alert("暂无访问权限！")
      return;
    }
  }
})

export default router
