<template>

    <q-layout view="lHh Lpr lFf">
      <q-header elevated>

      </q-header>


    <q-page-container>
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
