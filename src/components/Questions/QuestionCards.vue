<template>
  <div class="mx-auto">
    <!-- Questions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="(item, itemKey) in questions"
        :key="item.id"
        class="group relative overflow-hidden border-0 bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer rounded-xl"
      >
        <template #content>
          <div class="relative z-10 p-5">
            <!-- Header -->
            <div class="flex justify-between items-start mb-2">
              <!-- Question title (badge) -->
              <Badge
                :value="item.difficulty"
                class="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm"
              />

              <!-- Desktop Actions -->
              <div
                class="hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Button
                  icon="pi pi-eye"
                  text
                  @click="infoToogle(item)"
                  rounded
                  size="small"
                  class="w-8 h-8 hover:bg-blue-50 hover:text-blue-600"
                  v-tooltip.top="'Javobni ko‘rish'"
                  aria-label="Javobni ko‘rish"
                />
                <Button
                  icon="pi pi-pencil"
                  text
                  @click="router.push(`/questions/edit/${item._id}`)"
                  rounded
                  size="small"
                  class="w-8 h-8 hover:bg-orange-50 hover:text-orange-600"
                  v-tooltip.top="'Tahrirlash'"
                  aria-label="Tahrirlash"
                />
                <Button
                  icon="pi pi-trash"
                  text
                  rounded
                  @click="openDeletModal(item)"
                  size="small"
                  class="w-8 h-8 hover:bg-red-50 hover:text-red-600"
                  v-tooltip.top="'O‘chirish'"
                  aria-label="O‘chirish"
                />
              </div>

              <!-- Mobile Actions -->
              <div class="sm:hidden">
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  @click="toggle($event, item)"
                  aria-haspopup="true"
                  :aria-controls="'overlay_menu_' + item.id"
                />
                <Menu
                  :ref="(el) => (menuRefs[item.id] = el)"
                  :id="'overlay_menu_' + item.id"
                  :model="menuItems"
                  :popup="true"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div
                  class="p-1 text-white bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                >
                  {{ itemKey + 1 }}
                </div>
                <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wide">Savol</h3>
              </div>

              <h2
                class="text-lg font-semibold text-gray-900 leading-relaxed group-hover:text-blue-700 transition-colors duration-300"
              >
                {{ item.text.slice(0, 40) + '...' }}
              </h2>
            </div>

            <!-- Question Stats -->
            <div
              class="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500"
            >
              <div class="flex items-center gap-1">
                <i class="pi pi-clock text-xs"></i>
                <span>{{ new Date(item.createdAt).toLocaleDateString('uz-UZ') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <i class="pi pi-user text-xs"></i>
                <span>{{ item.admin.name }}</span>
              </div>
            </div>

            <!-- Bottom accent line -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            ></div>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <!-- Begin view Info -->
 <Dialog
    v-model:visible="visible"
    modal
    :header="false"
    :style="{ width: '50vw', maxWidth: '650px' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="question-details-dialog"
  >
    <div class="p-4 sm:p-6">
      <!-- Header with close button -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800">Savol tafsilotlari</h2>
      </div>
      
      <div class="space-y-6">
        <!-- Savol -->
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="text-sm font-semibold text-blue-600 uppercase mb-2 flex items-center">
            <i class="pi pi-question-circle mr-2"></i>
            Savol
          </h3>
          <p class="text-lg text-gray-900 leading-relaxed">{{ question.text }}</p>
        </div>

        <!-- Javob -->
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="text-sm font-semibold text-green-600 uppercase mb-2 flex items-center">
            <i class="pi pi-check-circle mr-2"></i>
            Javob
          </h3>
          <p class="text-base text-gray-800 leading-relaxed">{{ question.answer }}</p>
        </div>

        <!-- Qo'shimcha ma'lumotlar -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center">
            <i class="pi pi-info-circle mr-2"></i>
            Qo'shimcha ma'lumotlar
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="flex items-center p-3 bg-white rounded-md shadow-sm">
              <i class="pi pi-calendar text-blue-500 mr-3 text-lg"></i>
              <div>
                <div class="text-xs text-gray-500 mb-1">Yaratilgan sana</div>
                <div class="font-medium">{{ formatDate(question.createdAt) }}</div>
              </div>
            </div>
            
            <div class="flex items-center p-3 bg-white rounded-md shadow-sm">
              <i class="pi pi-user text-green-500 mr-3 text-lg"></i>
              <div>
                <div class="text-xs text-gray-500 mb-1">Admin</div>
                <div class="font-medium">{{ question.admin?.name || 'Admin' }}</div>
              </div>
            </div>
            
            <div class="flex items-center p-3 bg-white rounded-md shadow-sm">
              <i class="pi pi-sitemap text-orange-500 mr-3 text-lg"></i>
              <div>
                <div class="text-xs text-gray-500 mb-1">Qiyinlik darajasi</div>
                <div class="font-medium">
                   {{ question.difficulty }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
  <!-- End view Info -->
  <!-- Begin Delet Modal -->
   <Dialog v-model:visible="deletModal" modal header="Tasdiqlash" :closable="false" class="w-96">
    <div class="text-center">
      <i class="pi pi-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
      <p>Haqiqatan ham bu ma'lumotni o‘chirmoqchimisiz?</p>
    </div>

    <template #footer>
      <Button label="Bekor qilish" icon="pi pi-times" class="p-button-text" @click="deletModal = false" />
      <Button label="Ha, o'chirilsin" icon="pi pi-check" class="p-button-danger" @click="deletQuestion()" />
    </template>
  </Dialog>
  <!-- End Delet Modal -->
</template>

<script setup>
import { ref, reactive } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Menu from 'primevue/menu'
import Dialog from 'primevue/dialog'
import axios from 'axios'
import formatDate from "../../utils/formatDate"
import router from '@/router'
const admin = ref({})
const storedAdmin = sessionStorage.getItem('admin')
if (storedAdmin) {
  admin.value = JSON.parse(storedAdmin)
}



// Menularni boshqarish uchun ref obyekt
const visible = ref(false)
const question = ref({})
const deletModal=ref(false)
const menuItems = ref([
  {
    label: 'Amallar',
    items: [
      { label: 'Ko‘rish', icon: 'pi pi-eye', command: () => visible.value=true },
      { label: 'Tahrirlash', icon: 'pi pi-pencil', command: () => router.push(`/questions/edit/${question.value._id}`) },
      { label: 'O‘chirish', icon: 'pi pi-trash', command: () => openDeletModal(question.value) },
    ],
  },
])

const infoToogle = (item) => {
  visible.value = true
  question.value = item
  console.log(item)
}
// Har bir Card uchun Menu referensiyalar ro'yxati
const menuRefs = reactive({})

const toggle = (event, item) => {
  question.value=item
  if (menuRefs[item.id]) {
    menuRefs[item.id].toggle(event)
  }
}

const openDeletModal=(item)=>{
  deletModal.value=true
  question.value=item
}

// Savollar
const questions = ref([])

const fetchQuestions = async () => {
  try {
    const res = await axios.get(`/questions?adminId=${admin.value._id}`)
    console.log(res)
    questions.value = res.data
  } catch (err) {
    console.log(err)
  }
}

fetchQuestions()

const deletQuestion = async (item) => {
  try {
    const res = await axios.delete(`/questions/delet/${question.value._id}`)
    if (res.status == 200) {
      fetchQuestions()
      deletModal.value=false
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped></style>
