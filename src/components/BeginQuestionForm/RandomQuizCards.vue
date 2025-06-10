<template>
  <div class="min-h-screen">
    <div class="mx-auto">
      <h1 class="text-4xl font-bold text-center mb-2 text-white">Savol-Javob O'yini</h1>
      <p class="text-center text-blue-200 mb-8">Cardni bosing va savolni o'qing</p>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
        <div 
          v-for="(card, index) in cards" 
          :key="card._id"
          class="relative h-48 cursor-pointer perspective-1000"
          @click="toggleCard(card._id)"
        >
          <div 
            class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
            :class="{ 'rotate-y-180': flippedCards.includes(card._id) }"
          >
            <!-- Old tomoni -->
            <div class="absolute inset-0 w-full h-full backface-hidden">
              <div class="h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-4 border-white/20 hover:border-white/40">
                <div class="text-center">
                  <div class="text-6xl font-bold text-white mb-2">{{ index + 1 }}</div>
                  <div class="text-white/80 text-sm font-medium">SAVOL</div>
                </div>
              </div>
            </div>

            <!-- Orqa tomoni -->
            <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div class="h-full bg-white rounded-xl shadow-lg border-4 border-blue-500 p-4 flex flex-col">
                <div class="bg-blue-500 text-white p-2 rounded-lg text-center mb-3">
                  <i class="pi pi-question-circle text-lg mr-2"></i>
                  <span class="font-semibold">Savol {{ index + 1 }}</span>
                </div>

                <div class="flex-1 flex items-center justify-center">
                  <p class="text-gray-800 font-medium text-center text-sm leading-relaxed">
                    {{ card.text }}
                  </p>
                </div>

                <!-- Javob variantlari -->
                <div class="mt-3 grid grid-cols-1 gap-2">
                  <button 
                    v-for="answer in card.answers" 
                    :key="answer"
                    @click.stop="selectAnswer(card.id, answer)"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold py-1 px-3 rounded transition-all"
                    :class="{ 'bg-green-300': userAnswers[card.id] === answer && answer === card.correctAnswer, 'bg-red-300': userAnswers[card.id] === answer && answer !== card.correctAnswer }"
                  >
                    {{ answer }}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Statistikalar -->
      <div class="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div class="bg-white/20 rounded-lg p-4">
            <div class="text-2xl font-bold text-white">{{ answeredQuestions.length }}</div>
            <div class="text-blue-200 text-sm">Javob berilgan</div>
          </div>
          <div class="bg-white/20 rounded-lg p-4">
            <div class="text-2xl font-bold text-green-300">{{ correctAnswers }}</div>
            <div class="text-blue-200 text-sm">To'g'ri javoblar</div>
          </div>
          <div class="bg-white/20 rounded-lg p-4">
            <div class="text-2xl font-bold text-yellow-300">{{ resultPercent }}%</div>
            <div class="text-blue-200 text-sm">Natija</div>
          </div>
        </div> -->

        <div class="mt-4 flex justify-center space-x-4">
          <Button 
            label="Qayta boshlash" 
            icon="pi pi-refresh" 
            severity="warning"
            @click="resetGame"
          />
          <Button 
            label="Barchasini ko'rish" 
            icon="pi pi-eye" 
            @click="showAllQuestions"
            :disabled="flippedCards.length === cards.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
  randomQuizs: {
    type: Array,
    default: () => []
  }
})

const flippedCards = ref([])
const answeredQuestions = ref([])
const userAnswers = ref({})

const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const cards = ref(shuffleArray([...props.randomQuizs]))

const resetGame = () => {
  flippedCards.value = []
  answeredQuestions.value = []
  userAnswers.value = {}
  cards.value = shuffleArray([...props.randomQuizs])
}

const correctAnswers = computed(() => {
  return answeredQuestions.value.filter(_id => {
    const card = cards.value.find(c => c._id === _id)
    return card && userAnswers.value[_id] === card.correctAnswer
  }).length
})

const resultPercent = computed(() => {
  const total = answeredQuestions.value.length
  return total > 0 ? Math.round((correctAnswers.value / total) * 100) : 0
})

const toggleCard = (cardId) => {
  if (!flippedCards.value.includes(cardId)) {
    flippedCards.value.push(cardId)
  }
  console.log(cardId);
}

const selectAnswer = (cardId, answer) => {
  if (!userAnswers.value[cardId]) {
    userAnswers.value[cardId] = answer
    answeredQuestions.value.push(cardId)
  }
}

const showAllQuestions = () => {
  flippedCards.value = cards.value.map(card => card._id)
}

watch(() => props.randomQuizs, (newVal) => {
  cards.value = [...newVal]
  resetGame()
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
