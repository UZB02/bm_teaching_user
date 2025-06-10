<template>
  <div class="p-6 max-w-xl mx-auto">
    <div>Imtihonni Boshlash</div>
    <div class="">
      <form
        @submit.prevent="handleSubmit"
        class="space-y-6 grid grid-cols-2 items-center justify-center"
      >
        <div v-for="level in levels" :key="level.value" class="space-y-2">
          <div class="flex items-center gap-4">
            <Checkbox v-model="selectedLevels" :inputId="level.value" :value="level.value" />
            <label :for="level.value" class="min-w-[100px] font-medium">{{ level.label }}</label>
          </div>

          <div v-if="selectedLevels.includes(level.value)" class="ml-8">
            <label for="count" class="block text-sm text-gray-600 mb-1">Testlar soni</label>
            <InputNumber
              v-model="questionCounts[level.value]"
              inputId="count"
              inputClass="w-full"
              :min="1"
              :max="50"
              showButtons
              buttonLayout="horizontal"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              placeholder="Son"
            />
          </div>
        </div>

        <Button
          label="Testni Boshlash"
          icon="pi pi-play"
          type="submit"
          class="w-full mt-6"
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

const emit = defineEmits(['submit-request']) // 1. Hodisani e'lon qilish

const levels = [
  { label: 'Oson', value: 'Oson' },
  { label: "O'rta", value: "O'rta" },
  { label: 'Qiyin', value: 'Qiyin' },
  { label: 'Juda qiyin', value: 'Juda qiyin' },
]

const selectedLevels = ref([])
const questionCounts = reactive({
  Oson: 5,
  "O'rta": 5,
  Qiyin: 5,
  'Juda qiyin': 5,
})

const handleSubmit = () => {
  const request = {}
  selectedLevels.value.forEach((level) => {
    request[level] = questionCounts[level] || 0
  })

  emit('submit-request', request) // 2. Parentga yuborish
}
</script>

<style scoped>
/* Kerak bo'lsa qo'shimcha stil qo'shing */
</style>
