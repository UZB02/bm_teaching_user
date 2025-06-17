<template>
  <div class="p-4 md:p-6">
    <div class="text-xl md:text-2xl font-bold mb-6 text-center text-white">Imtihonni Boshlash</div>
    <div class="max-w-3xl mx-auto">
      <form
        @submit.prevent="handleSubmit"
        class="space-y-6 md:space-y-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
      >
        <div 
          v-for="level in levels" 
          :key="level.value" 
          class="space-y-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg"
        >
          <div class="flex items-center gap-4">
            <Checkbox 
              v-model="selectedLevels" 
              :inputId="level.value" 
              :value="level.value" 
              class="h-5 w-5"
            />
            <label 
              :for="level.value" 
              class="min-w-[100px] font-medium text-sm sm:text-base text-white"
            >
              {{ level.label }}
            </label>
          </div>

          <div class="ml-8 mt-3">
            <label for="count" class="block text-sm text-white mb-1">Testlar soni</label>
            <InputNumber
              v-model="questionCounts[level.value]"
              inputId="count"
              inputClass="w-full text-sm sm:text-base"
              :min="1"
              :max="50"
              showButtons
              buttonLayout="horizontal"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              placeholder="Son"
              :disabled="!selectedLevels.includes(level.value)" 
            />
          </div>
        </div>

        <Button
          label="Testni Boshlash"
          icon="pi pi-play"
          type="submit"
          class="w-full mt-6 col-span-1 sm:col-span-2"
          :disabled="selectedLevels.length === 0"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const emit = defineEmits(['submit-request'])

const levels = [
  { label: 'Oson', value: 'Oson' },
  { label: "O'rta", value: "O'rta" },
  { label: 'Qiyin', value: 'Qiyin' },
  { label: 'Juda qiyin', value: 'Juda qiyin' },
]

const selectedLevels = ref([])
const questionCounts = reactive({
  Oson: 0,
  "O'rta": 0,
  Qiyin: 0,
  'Juda qiyin': 0,
})

const handleSubmit = () => {
  const request = {}
  selectedLevels.value.forEach((level) => {
    request[level] = questionCounts[level] || 0
  })

  emit('submit-request', request)
}
</script>

<style scoped>
/* Mobile-first responsive adjustments */
@media (max-width: 639px) {
  .p-inputnumber {
    width: 100%;
  }
  
  .p-inputnumber-input {
    width: 100%;
    font-size: 0.875rem;
  }
}
</style>