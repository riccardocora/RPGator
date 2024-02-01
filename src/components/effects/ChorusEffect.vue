<template>
  <div class="row justify-between">
    <div class="q-py-sm inline">
      <Knob id="frequency" :color="color" :min="0" :max="20000" :inner-max="20000" :value="chorus.frequency" :step="1" :thickness="0.1" @updateValue="updateChorus" />
      <q-badge outline :color="color" label="freq." class="q-ma-xs"/>
    </div>
    <div class="q-py-sm inline">
      <Knob id="depth" :color="color" :min="0" :max="1" :inner-max="1" :value="chorus.depth" :step="0.1" :thickness="0.1" @updateValue="updateChorus" />
      <q-badge outline :color="color" label="depth" class="q-ma-xs"/>
    </div>
  </div>

  <div class="q-py-sm inline">
    <Knob id="delayTime" :color="color" :min="2" :max="20" :inner-max="20" :value="chorus.delayTime" :step="0.1" :thickness="0.1" @updateValue="updateChorus" />
    <q-badge outline :color="color" label="delay" class="q-ma-xs"/>
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
  setup() {
    const chorus = ref({
      frequency: AudioContextHandler.effectChain.getEffect("chorus").frequency.value,
      depth: AudioContextHandler.effectChain.getEffect("chorus").depth,
      delayTime: AudioContextHandler.effectChain.getEffect("chorus").delayTime,
    });
    const updateChorus = ()=>{
      AudioContextHandler.effectChain.setEffect("chorus", chorus.value)
      console.log("chorus 4", AudioContextHandler.effectChain.getEffect("chorus"))

    }

    return {
      updateChorus,
      chorus
    }
  }
})



</script>
<style scoped>

</style>
