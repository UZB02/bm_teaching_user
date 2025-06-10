<template>
  <section>
    <div>
      <RandomQuizForm @submit-request="handleRequestFromChild" />
    </div>
    <div>
      <RandomQuizCards :randomQuizs="randomQuizs"/>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import axios from 'axios'
import RandomQuizForm from '../../components/BeginQuestionForm/Main.vue'
import RandomQuizCards from '../../components/BeginQuestionForm/RandomQuizCards.vue'

const randomChanges=ref({})
const randomQuizs=ref([])

function handleRequestFromChild(data) {
  console.log('Childdan olingan request:', data)
  randomChanges.value=data
  fetchRandomQuestions()
}

const fetchRandomQuestions = async () => {
  try {
    const res = await axios.get('/questions/random', {
      params:randomChanges.value,
    })
    randomQuizs.value=res.data
    console.log('Random savollar:', randomQuizs.value)
  } catch (err) {
    console.error('Xatolik:', err)
  }
}
</script>
