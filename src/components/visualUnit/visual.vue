
<template>
    <OscillatorCurve color="primary"/>
</template>
<script>


import {defineComponent} from "vue";
import OscillatorCurve from "../oscillator/OscillatorCurve.vue";

export default defineComponent({
  name: "VisualTrip",
  components: {OscillatorCurve}
})
</script>

<style scoped>

</style>
