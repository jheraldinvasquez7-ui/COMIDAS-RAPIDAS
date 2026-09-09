import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/hamburguesas'
  },
  {
    path: '/hamburguesas',
    name: 'Hamburguesas',
    component: () => import('../views/Hamburguesas.vue'),
    meta: { title: 'Hamburguesas - Burger Bite' }
  },
  {
    path: '/perros',
    name: 'Perros',
    component: () => import('../views/Perros.vue'),
    meta: { title: 'Perros Calientes - Burger Bite' }
  },
  {
    path: '/pizzas',
    name: 'Pizzas',
    component: () => import('../views/Pizzas.vue'),
    meta: { title: 'Pizzas Artesanales - Burger Bite' }
  },
  {
    path: '/bebidas',
    name: 'Bebidas',
    component: () => import('../views/Bebidas.vue'),
    meta: { title: 'Bebidas & Malteadas - Burger Bite' }
  },
  {
    path: '/postres',
    name: 'Postres',
    component: () => import('../views/Postres.vue'),
    meta: { title: 'Postres - Burger Bite' }
  },
  {
    path: '/promociones',
    name: 'Promociones',
    component: () => import('../views/Promociones.vue'),
    meta: { title: 'Promociones & Combos - Burger Bite' }
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: () => import('../views/Nosotros.vue'),
    meta: { title: 'Sobre Nosotros - Burger Bite' }
  },
  {
    path: '/compras',
    name: 'Compras',
    component: () => import('../views/Compras.vue'),
    meta: { title: 'Gestión de Compras - Burger Bite' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/hamburguesas'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
