<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
<style>
#app{
  max-width: 100vw;
  display: flex;
  max-height: 100vh;
}
</style>