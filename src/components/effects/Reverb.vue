<template>
  <div class="knob-wrapper">
    <Knob id="preDelay" :color="color" :min="0" :max="1" :inner-max="1" :value="reverb.preDelay" :step="0.01" :thickness="0.1" @updateValue="update" />
    <div class="writings">PreDel.</div>
  </div>
  <div class="knob-wrapper">
      <Knob id="decay" :color="color" :min="0" :max="5" :inner-max="5" :value="reverb.decay" :step="0.01" :thickness="0.1" @updateValue="update" />
    <div class="writings">Decay</div>
  </div>
  <div class="knob-wrapper">
    <Knob id="wet" :color="color" :min="0" :max="1" :inner-max="1" :value="reverb.wet" :step="0.01" :thickness="0.1" @updateValue="update" />
    <div class="writings">Wet</div>
  </div>

</template>
<script>
import {ref,defineComponent} from "vue";
import AudioContextHandler from "../AudioContextHandler.js";
import Knob from "../controls/Knob.vue";
export default defineComponent({
  name:'ReverbEffect',
  components: {Knob},
  props: {
    color: {
      type: String,
      default: "primary"
    }
  },
  setup() {
    const reverb = ref({
      preDelay: AudioContextHandler.effectChain.getEffect("reverb").preDelay,
      decay: AudioContextHandler.effectChain.getEffect("reverb").decay,
      wet: AudioContextHandler.effectChain.getEffect("reverb").wet.value,
    });
    const update = ()=>{
      AudioContextHandler.effectChain.setEffect("reverb", reverb.value)

    }

    return {
      update,
      reverb
    }
  }
})



</script>
<style scoped>

</style>
