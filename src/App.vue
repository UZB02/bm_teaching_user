<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
import axios from 'axios'

// Tokenni olib, axiosga beramiz
const token = sessionStorage.getItem('authToken')
axios.defaults.baseURL = 'https://bm-teaching-backend.onrender.com/api'
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const route = useRoute()
const router = useRouter()

const layout = computed(() => route.meta.layout || AppLayout)

onMounted(() => {
  if (!token && route.path !== '/login') {
    router.push('/login')
  }
})
</script>


<template>
   <component :is="layout">
      <RouterView />
    </component>
</template>

<style scoped>

</style>
