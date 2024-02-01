<template>
  <div class="row inline">
    <div class="q-py-sm">
      <Knob id="preDelay" :color="color" :min="0" :max="1" :inner-max="1" :value="reverb.preDelay" :step="0.01" :thickness="0.1" @updateValue="update" />
      <q-badge outline :color="color" label="preDel." class="q-ma-xs"/>
    </div>
    <div class="q-py-sm">
      <Knob id="decay" :color="color" :min="0" :max="5" :inner-max="5" :value="reverb.decay" :step="0.01" :thickness="0.1" @updateValue="update" />
      <q-badge outline :color="color" label="decay" class="q-ma-xs"/>
    </div>
  </div>
  <div class="row justify-center">
    <div class="q-py-sm inline">
      <Knob id="wet" :color="color" :min="0" :max="1" :inner-max="1" :value="reverb.wet" :step="0.01" :thickness="0.1" @updateValue="update" />
      <q-badge outline :color="color" label="wet" class="q-ma-xs"/>
    </div>
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
    console.log("reverb 1", AudioContextHandler.effectChain.getEffect("reverb"))
    const reverb = ref({
      preDelay: AudioContextHandler.effectChain.getEffect("reverb").preDelay,
      decay: AudioContextHandler.effectChain.getEffect("reverb").decay,
      wet: AudioContextHandler.effectChain.getEffect("reverb").wet.value,
    });
    const update = ()=>{
      AudioContextHandler.effectChain.setEffect("reverb", reverb.value)
      console.log("reverb 4", AudioContextHandler.effectChain.getEffect("reverb"))

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
