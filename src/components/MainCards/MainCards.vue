<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <div class="relative">
            <img
              src="@/imgs/logo.jpg"
              alt="Question Creator Logo"
              class="w-20 h-20 rounded-full shadow-lg border-4 border-white"
            />
          </div>
        </div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          <b class="text-yellow-300 text-shadow-2xs text-shadow-amber-500">BM</b> Savollar
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Turli xil savollarga javob bering va bilimingizni sinab ko'ring.
        </p>
      </div>

      <!-- Main Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Multiple Choice Card -->
        <Card
          class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
        >
          <template #header>
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-list text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Barcha Savollar</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">Savollar ro'yxati.</p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-database mr-2"></i>
                <span>{{ allQuestions.length }} ta savol</span>
              </div>
              <Button
                label="Boshlash"
                class="w-full bg-purple-500 hover:bg-purple-600 border-purple-500 hover:border-purple-600"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="router.push('/allquestions')"
              />
            </div>
          </template>
        </Card>

        <!-- True/False Card -->
        <Card
          class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
        >
          <template #header>
            <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-play text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Boshlash</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">Savollarni daraja bo'yicha taqsimlang.</p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>2-5 daqiqa</span>
              </div>
              <Button
                label="Boshlash"
                @click="router.push('/playquiz')"
                class="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card>
        <!-- options quizs Card -->
        <Card
          class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
        >
          <template #header>
            <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-play text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Boshlash</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">Savollarni daraja bo'yicha taqsimlang.</p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>Variantli testlar</span>
              </div>
              <Button
                label="Boshlash"
                @click="router.push('/playoptionquiz')"
                class="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <!-- Begin Dialog modal -->
  <Drawer
    v-model:visible="visibleRight"
    header="Right Drawer"
    position="right"
    class="!w-full md:!w-80 lg:!w-[30rem]"
  >
    <BeginForm></BeginForm>
  </Drawer>
  <!-- End Dialog modal -->
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import router from '@/router'
import 'primeicons/primeicons.css'
import axios from 'axios'
import Drawer from 'primevue/drawer'
import BeginForm from '../BeginQuestionForm/Main.vue'

const visibleRight = ref(false)
const allQuestions = ref([])
const admin = ref({})
const storedAdmin = sessionStorage.getItem('admin')
if (storedAdmin) {
  admin.value = JSON.parse(storedAdmin)
}

const fetchAllQuestions = async () => {
  try {
    const res = await axios.get(`/questions?adminId=${admin.value._id}`)
    allQuestions.value = res.data
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}


fetchAllQuestions()
</script>

<style scoped>
/* Custom animations and transitions */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Custom gradient backgrounds */
.gradient-purple {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-green {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.gradient-orange {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
