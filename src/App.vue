<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'App',
  setup () {
    const $q = useQuasar()

    // calling here; equivalent to when component is created
    $q.dark.set(true)
  }
})
</script>
<style>

</style>