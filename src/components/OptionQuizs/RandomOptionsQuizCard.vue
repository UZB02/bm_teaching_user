<template>
  <div class="min-h-screen">
    <div class="mx-auto">
      <h1 class="text-4xl font-bold text-center mb-2 text-white">Savol-Javob O'yini</h1>
      <p class="text-center text-blue-200 mb-8">Cardni bosing va savolni o'qing</p>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
        <div
          v-for="(card, index) in cards"
          :key="card._id"
          class="relative h-60 cursor-pointer perspective-1000"
          @click="toggleCard(card)"
        >
          <div
            class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
            :class="{ 'rotate-y-180': flippedCards.includes(card._id) }"
          >
            <!-- Old tomoni -->
            <div class="absolute inset-0 w-full h-full backface-hidden">
              <div
                class="h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-4 border-white/20 hover:border-white/40"
              >
                <div class="text-center">
                  <div class="text-6xl font-bold text-white mb-2">{{ index + 1 }}</div>
                  <div class="text-white/80 text-sm font-medium">SAVOL</div>
                </div>
              </div>
            </div>

            <!-- Orqa tomoni -->
            <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div
                class="h-full bg-white rounded-xl shadow-lg border-4 border-blue-500 p-4 flex flex-col"
              >
                <div
                  @click="visibleAnsver = true"
                  class="bg-blue-500 text-white p-2 rounded-lg text-center mb-3"
                >
                  <i class="pi pi-eye text-lg mr-2"></i>
                  <span class="font-semibold">Savol {{ index + 1 }}</span>
                </div>

                <div class="flex-1 flex items-center justify-center">
                  <p class="text-gray-800 font-medium text-center text-sm leading-relaxed">
                    {{ card.text }}
                  </p>
                </div>

                <div class="mt-3 grid grid-cols-2 gap-2">
                  <button
                    v-for="(answer, answerKey) in card.options"
                    :key="answerKey"
                    @click.stop="selectAnswer(card._id, answer)"
                    class="bg-blue-100 hover:bg-blue-200 text-sm text-blue-900 font-semibold py-1 px-3 rounded transition-all"
                    :class="{
                      'bg-green-300':
                        userAnswers[card._id] === answer && answer === card.correctAnswer,
                      'bg-red-300':
                        userAnswers[card._id] === answer && answer !== card.correctAnswer,
                    }"
                  >
                    <span class="font-semibold">{{ String.fromCharCode(65 + answerKey) }}.</span>
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
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
        </div>

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

    <!-- answer modal -->
    <Dialog
      v-model:visible="visibleAnsver"
      modal
      header="🧠 Savol Javobi"
      :style="{ width: '40rem' }"
      :breakpoints="{ '1199px': '80vw', '575px': '95vw' }"
      :pt="{
        root: { class: 'border-0 rounded-xl overflow-hidden shadow-2xl' },
        header: {
          class:
            'bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 text-xl font-semibold flex items-center gap-3',
        },
        content: { class: 'p-0' },
        mask: { class: 'backdrop-blur-sm' },
      }"
    >
      <div class="p-6 bg-white">
        <div class="flex items-start gap-4 mb-6">
          <i class="pi pi-check-circle text-green-600 text-2xl mt-1"></i>
          <p class="text-gray-800 text-base md:text-lg leading-relaxed">
            To‘g‘ri javob: <strong>{{ changeQuiz.correctAnswer }}</strong>
          </p>
        </div>
        <div class="flex justify-end">
          <Button
            label="Yopish"
            icon="pi pi-times-circle"
            @click="visibleAnsver = false"
            class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md transition-all duration-200"
          />
        </div>
      </div>
    </Dialog>
    <!-- correctAnswer modal -->
    <Dialog
      v-model:visible="correctAnsver"
      modal
      header=""
      :style="{ width: '45rem' }"
      :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
      :pt="{
        root: {
          class: 'border-0 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm',
        },
        header: { class: 'hidden' },
        content: { class: 'p-0 relative' },
        mask: { class: 'backdrop-blur-md bg-black/20' },
      }"
    >
      <!-- Background Pattern -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 opacity-10"
      >
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(
              circle at 25% 25%,
              rgba(255, 255, 255, 0.2) 2px,
              transparent 2px
            );
            background-size: 24px 24px;
          "
        ></div>
      </div>

      <!-- Floating Elements -->
      <div
        class="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
        style="animation-delay: 0.1s"
      ></div>
      <div
        class="absolute top-8 right-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
        style="animation-delay: 0.3s"
      ></div>
      <div
        class="absolute bottom-12 left-8 w-4 h-4 bg-purple-400 rounded-full animate-bounce"
        style="animation-delay: 0.5s"
      ></div>
      <div
        class="absolute bottom-6 right-12 w-2 h-2 bg-green-400 rounded-full animate-bounce"
        style="animation-delay: 0.7s"
      ></div>

      <!-- Main Content -->
      <div class="relative p-8 bg-white/95 backdrop-blur-sm">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <!-- Animated Trophy/Success Icon -->
          <div class="relative inline-block mb-6">
            <div
              class="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300"
            >
              <div
                class="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse"
              >
                <i class="pi pi-trophy text-white text-4xl"></i>
              </div>
            </div>
            <!-- Sparkle Effects -->
            <div class="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin">✨</div>
            <div class="absolute -bottom-1 -left-2 w-4 h-4 text-pink-400 animate-bounce">⭐</div>
            <div class="absolute top-2 -left-4 w-5 h-5 text-blue-400 animate-pulse">💫</div>
          </div>

          <!-- Title with Gradient -->
          <h1
            class="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 animate-pulse"
          >
            🎉 Ajoyib!
          </h1>

          <!-- Subtitle -->
          <p class="text-xl text-gray-700 font-medium mb-2">To'g'ri javob berdingiz!</p>
          <p class="text-gray-600">Tabriklaymiz, siz zo'r natija ko'rsatdingiz! 👏</p>
        </div>

        <!-- Points Section -->
        <div
          class="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-6 border border-emerald-200 shadow-inner"
        >
          <div class="text-center">
            <div class="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md">
              <div
                class="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <i class="pi pi-star-fill text-white text-sm"></i>
              </div>
              <span class="text-2xl font-bold text-gray-800">{{ changeQuiz.points }}</span>
              <span class="text-lg text-gray-600 font-medium">ball qo'lga kiritdingiz</span>
            </div>
          </div>
        </div>

        <!-- Correct Answer Section -->
        <div
          class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-200"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
            >
              <i class="pi pi-check text-white text-lg"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">To'g'ri javob:</h3>
              <div class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
                <p class="text-lg font-medium text-blue-800">{{ changeQuiz.correctAnswer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            label="Davom etish"
            icon="pi pi-arrow-right"
            @click="correctAnsver = false"
            class="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
            iconPos="right"
          />

          <!-- Optional: Add a secondary action -->
          <!-- <Button
          label="Statistikani ko'rish"
          icon="pi pi-chart-bar"
          @click="showStats"
          severity="secondary"
          outlined
          class="px-6 py-3 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
        /> -->
        </div>
      </div>
    </Dialog>
    <!-- incorrectAnswer modal -->
    <Dialog
  v-model:visible="incorrectAnswer"
  modal
  header=""
  :style="{ width: '45rem' }"
  :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  :pt="{
    root: {
      class: 'border-0 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm',
    },
    header: { class: 'hidden' },
    content: { class: 'p-0 relative' },
    mask: { class: 'backdrop-blur-md bg-black/30' },
  }"
>
  <!-- Background Pattern -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-red-400 via-pink-400 to-yellow-400 opacity-10"
  >
    <div
      class="absolute inset-0"
      style="
        background-image: radial-gradient(
          circle at 25% 25%,
          rgba(255, 255, 255, 0.15) 2px,
          transparent 2px
        );
        background-size: 24px 24px;
      "
    ></div>
  </div>

  <!-- Floating Elements -->
  <div
    class="absolute top-4 left-6 w-3 h-3 bg-red-500 rounded-full animate-bounce"
    style="animation-delay: 0.2s"
  ></div>
  <div
    class="absolute top-10 right-8 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
    style="animation-delay: 0.4s"
  ></div>
  <div
    class="absolute bottom-14 left-10 w-4 h-4 bg-pink-500 rounded-full animate-bounce"
    style="animation-delay: 0.6s"
  ></div>
  <div
    class="absolute bottom-6 right-14 w-2 h-2 bg-orange-400 rounded-full animate-bounce"
    style="animation-delay: 0.8s"
  ></div>

  <!-- Main Content -->
  <div class="relative p-8 bg-white/95 backdrop-blur-sm">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <!-- Error Icon -->
      <div class="relative inline-block mb-6">
        <div
          class="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse"
        >
          <div
            class="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center animate-shake"
          >
            <i class="pi pi-times-circle text-white text-4xl"></i>
          </div>
        </div>
        <!-- Sparkle Effects -->
        <div class="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin">💥</div>
        <div class="absolute -bottom-1 -left-2 w-4 h-4 text-pink-400 animate-bounce">⚠️</div>
      </div>

      <!-- Title with Gradient -->
      <h1
        class="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-3 animate-pulse"
      >
        ❌ Afsus!
      </h1>

      <!-- Subtitle -->
      <p class="text-xl text-gray-700 font-medium mb-2">To'g'ri javobni topa olmadingiz.</p>
      <p class="text-gray-600">Yana urinib ko‘ring, siz buni uddalay olasiz! 💪</p>
    </div>

    <!-- Correct Answer Display -->
    <div
      class="bg-gradient-to-r from-yellow-50 to-red-50 rounded-2xl p-6 mb-6 border border-red-200 shadow-inner"
    >
      <div class="flex items-start gap-4">
        <div
          class="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
        >
          <i class="pi pi-check text-white text-lg"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">To'g'ri javob:</h3>
          <div class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
            <p class="text-lg font-medium text-red-700">{{ changeQuiz.correctAnswer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        label="Qayta urinib ko'rish"
        icon="pi pi-refresh"
        @click="incorrectAnswer = false"
        class="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
        iconPos="right"
      />
    </div>
  </div>
</Dialog>

  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const props = defineProps({
  randomQuizs: {
    type: Array,
    default: () => [],
  },
})

const incorrectAnswer=ref(false)
const correctAnsver = ref(false)
const flippedCards = ref([])
const answeredQuestions = ref([])
const userAnswers = ref({})
const changeQuiz = ref({})
const visibleAnsver = ref(false)

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
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
  return answeredQuestions.value.filter((_id) => {
    const card = cards.value.find((c) => c._id === _id)
    return card && userAnswers.value[_id] === card.correctAnswer
  }).length
})

const resultPercent = computed(() => {
  const total = answeredQuestions.value.length
  return total > 0 ? Math.round((correctAnswers.value / total) * 100) : 0
})

const toggleCard = (item) => {
  if (!flippedCards.value.includes(item._id)) {
    flippedCards.value.push(item._id)
  }
  changeQuiz.value = item
}

const selectAnswer = (cardId, answer) => {
  if (!userAnswers.value[cardId]) {
    userAnswers.value[cardId] = answer
    answeredQuestions.value.push(cardId)

    const selectedCard = cards.value.find((card) => card._id === cardId)
    if (selectedCard && selectedCard.correctAnswer === answer) {
      changeQuiz.value = selectedCard
      setTimeout(() => {
        correctAnsver.value = true
      }, 500) // animatsiyaga vaqt berish
    }else{
      incorrectAnswer.value=true
    }
  }
}

const showAllQuestions = () => {
  flippedCards.value = cards.value.map((card) => card._id)
}

watch(
  () => props.randomQuizs,
  (newVal) => {
    cards.value = [...newVal]
    resetGame()
  },
)
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
