<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-2">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Kirish</h2>
      <form @submit.prevent="login()" class="space-y-5">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Email</label>
          <InputText
            v-model="email"
            type="email"
            class="w-full"
            placeholder="Email kiriting"
            required
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Parol</label>
          <Password
            v-model="password"
            class="w-full"
            inputClass="w-full"
            :feedback="false"
            toggleMask
            placeholder="Parol kiriting"
            required
          />
        </div>
        <Button label="Kirish" type="submit" class="w-full" />
      </form>
      <span
        @click="router.push('/register')"
        class="flex items-center justify-end cursor-pointer text-emerald-500 transition duration-100 hover:scale-[1.01]"
        >Ro'yxatdan o'tish</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('/admin/login', {
      email: email.value,
      password: password.value,
    })
    if (res.status == 200) {
      router.push('/')
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
    // optional: sessionStorage yoki auth store saqlash
    sessionStorage.setItem('authToken', res.data.token)
    sessionStorage.setItem('admin', JSON.stringify(res.data.admin))

    router.push('/')
  } catch (err) {
    console.error('Login xatoligi:', err.response?.data?.message || err.message)
  }
}
</script>

<style scoped></style>
