<template>

    <q-layout view="lHh Lpr lFf" >

    <q-page-container class="page-container">
      <MainHost />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import MainHost from "@/pages/MainPage.vue";

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainHost

  },

  setup () {

    return {}
  }
})
</script>

<style>
.page-container{
}
</style>