<template>
  <div class="knob-wrapper">
    <Knob id="frequency" :color="color" :min="100" :max="12000" :inner-max="1" :value="vibrato.frequency" :step="10" :thickness="0.1" @updateValue="update" />

    <q-badge outline :color="color" label="freq." class="q-ma-xs"/>
  </div>

  <div class="knob-wrapper">
    <Knob id="depth" :color="color" :min="0" :max="1" :inner-max="1" :value="vibrato.depth" :step="0.01" :thickness="0.1" @updateValue="update" />
    <q-badge outline :color="color" label="depth" class="q-ma-xs"/>
  </div>
</template>
<script>
import {ref,defineComponent} from "vue";
import AudioContextHandler from "../AudioContextHandler.js";
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
    const vibrato = ref({
      frequency: AudioContextHandler.effectChain.getEffect("vibrato").frequency.value,
      depth: AudioContextHandler.effectChain.getEffect("vibrato").depth.value,
    });
    const update = ()=>{
      AudioContextHandler.effectChain.setEffect("vibrato", vibrato.value)
    }

    return {
      vibrato,
      update,
    }
  }
})

</script>
<style scoped>

</style>
