
<template>
    <OscillatorCurve :input="input" color="primary"/>
</template>
<script>


import {defineComponent} from "vue";
import OscillatorCurve from "../oscillator/OscillatorCurve.vue";
import * as Tone from "tone";

export default defineComponent({
  name: "VisualTrip",
  components: {OscillatorCurve},
  props: {
    input: {
      type: Tone.Gain,
      required: true
    },
    color: {
      type: String,
      default: "primary",
    }
  },
})
</script>

<style scoped>

</style>
