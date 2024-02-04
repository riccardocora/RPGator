<template>
  <div class="knob-wrapper">
    <Knob id="distortion" :color="color" :min="0" :max="1" :inner-max="1" :value="distortion.distortion" :step="0.1" :thickness="0.1" @updateValue="update" />
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
      const distortion = ref({
          distortion: AudioContextHandler.effectChain.getEffect("distortion").distortion,
      });
      const update = ()=>{
          AudioContextHandler.effectChain.setEffect("distortion", distortion.value)
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
