<template>
  <div class="q-py-sm inline">
    <Knob id="distortion" :color="color" :min="0" :max="1" :inner-max="1" :value="distortion.distortion" :step="0.1" :thickness="0.1" @updateValue="updateEnvelope" />

<!--    <q-knob-->
<!--          v-model="distortion.distortion"-->
<!--          size="md"-->
<!--          :min="0"-->
<!--          :max="1"-->
<!--          :step="0.1"-->
<!--          :color="color"-->
<!--          show-value-->
<!--          @change="update"-->
<!--        />-->
        <q-badge outline :color="color" label="value" class="q-ma-xs"/>
  </div>
</template>
<script>
import {ref,defineComponent} from "vue";
import AudioContextHandler from "@/components/AudioContextHandler.js";
import Knob from "../controls/Knob.vue";

export default defineComponent({
  components: {Knob},
  props: {
    color: {
      type: String,
      default: "primary"
    }
  },
  setup(){
      console.log("distortion 1", AudioContextHandler.effectChain.getEffect("distortion").distortion)
      const distortion = ref({
          distortion: AudioContextHandler.effectChain.getEffect("distortion").distortion,
      });
      console.log("distortion 2", distortion)
      const update = ()=>{
          console.log("distortion 3", distortion.value.distortion)
          AudioContextHandler.effectChain.setEffect("distortion", distortion.value)
          console.log("distortion 4", AudioContextHandler.effectChain.getEffect("distortion").distortion)

      }

      return {
          update,
          distortion
      }
  }
})

</script>
<style scoped>

</style>
