<template>
  <div class="knob-wrapper">
    <Knob id="distortion" :color="color" :min="0" :max="1" :inner-max="1" :value="distortion.distortion" :step="0.1" :thickness="0.1" @updateValue="update" />
    <div class="writings">Value</div>
  </div>
</template>
<script>
import {ref, defineComponent, reactive} from "vue";
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
      const distortion = reactive({
          distortion: AudioContextHandler.effectChain.getEffect("dist").distortion,
      });
      const update = (newValue)=>{
          distortion[newValue.id] = newValue.value;

          AudioContextHandler.effectChain.setEffect("dist", distortion)
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
