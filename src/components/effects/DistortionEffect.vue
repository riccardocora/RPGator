<template>
  <div class="knob-wrapper">
    <Knob id="distortion" :color="color" :min="0" :max="1" :inner-max="1" :value="distortion.distortion" :step="0.1" :thickness="0.1" @updateValue="update" />
    <div class="writings">Value</div>
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
      const distortion = ref({
          distortion: AudioContextHandler.effectChain.getEffect("dist").distortion,
      });
      const update = ()=>{
          AudioContextHandler.effectChain.setEffect("dist", distortion.value)
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
