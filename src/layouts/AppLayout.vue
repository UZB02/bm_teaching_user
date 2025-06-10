<template>
  <header class="shadow">
     <NavBar></NavBar>
  </header>
 <div class="">
  <RouterView></RouterView>
 </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar/Nav.vue";
</script>
<style scoped></style>
