import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/allquestions',
      name: 'All Questions',
      component: () => import('../views/AllQuestions.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/playquiz',
      name: 'Play Quiz',
      component: () => import('../views/PlayQuiz/Main.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Auth/LoginView.vue'),
      meta: {
        layout: AuthLayout,
      },
    },
  ],
})

export default router
