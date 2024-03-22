import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import TransactionsDetailsView from '@/views/TransactionDetailsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView
    },
    {
      path: '/transaction-details/:id',
      name: 'transactions-details',
      component: TransactionsDetailsView
    }
  ]
})

export default router
