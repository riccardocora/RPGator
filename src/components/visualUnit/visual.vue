
<template>
  <div class="q-pa-md">
    <q-card class="card">
      <q-card-section>
        <OscillatorCurve color="primary">
        </OscillatorCurve>
      </q-card-section>

    </q-card>
  </div>

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
