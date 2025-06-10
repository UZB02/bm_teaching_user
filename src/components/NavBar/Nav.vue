
<template>
    <div class="container">
        <Menubar>
            <template #start>
                <img src="../../imgs/logo.jpg" class="w-[40px]" alt="">
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a class="flex items-center" v-bind="props.action">
                    <span>{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <Avatar icon="pi pi-user" shape="circle"  @click="toggle"/>
                    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menubar from 'primevue/menubar';
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Menu from "primevue/menu";
import { useRouter } from 'vue-router';
import 'primeicons/primeicons.css'

const router = useRouter();

// Adminni sessionStorage'dan JSON sifatida olish
const admin = ref({});
const storedAdmin = sessionStorage.getItem('admin');
if (storedAdmin) {
    admin.value = JSON.parse(storedAdmin);
}

// Menyuni sozlash
const menu = ref();
const items = ref([
    {
        label: admin.value.name + " " + admin.value.lastname || 'Admin',
        items: [
            {
                label: 'Chiqish',
                icon: 'pi pi-sign-out',
                command: () => {
                    sessionStorage.removeItem('authToken');
                    sessionStorage.removeItem('admin');
                    router.push('/login');
                }
            }
        ]
    }
]);

// Avatar bosilganda menyuni ochish
const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<style scoped>
.p-menubar {
  border: none !important;
  box-shadow: none !important;
}
</style>