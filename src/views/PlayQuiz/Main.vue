<template>
  <section class="mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
    <div class="container">
      <div>
        <RandomQuizForm v-if="!refresh" :key="formKey" @submit-request="handleRequestFromChild" />
      </div>
      <div>
        <Button
          v-if="refresh"
          label="Qayta boshlash"
          icon="pi pi-refresh"
          severity="warning"
          @click="refreshQuizas()"
        />
        <RandomQuizCards :randomQuizs="randomQuizs" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import axios from 'axios'
import RandomQuizForm from '../../components/BeginQuestionForm/Main.vue'
import RandomQuizCards from '../../components/BeginQuestionForm/RandomQuizCards.vue'
import Button from 'primevue/button'

const randomChanges = ref({})
const randomQuizs = ref([])
const refresh = ref(false)

function handleRequestFromChild(data) {
  console.log('Childdan olingan request:', data)
  randomChanges.value = data
  fetchRandomQuestions()
}

const fetchRandomQuestions = async () => {
  try {
    const res = await axios.get('/questions/random', {
      params: randomChanges.value,
    })
    if (res.status == 200) {
      randomQuizs.value = res.data
      refresh.value = true
    }
    console.log('Random savollar:', randomQuizs.value)
  } catch (err) {
    console.error('Xatolik:', err)
  }
}

const formKey = ref(0)

const refreshQuizas = () => {
  refresh.value = false
  randomQuizs.value = []
  randomChanges.value = {}
  formKey.value++ // bu orqali <RandomQuizForm> butunlay qaytadan yaratiladi
}
console.log(randomQuizs.value)
</script>
