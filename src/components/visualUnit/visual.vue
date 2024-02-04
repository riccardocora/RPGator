
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
.card{
  background-image: url("@/assets/images/metal.png");
  border-radius: 50%;

}
</style>
