<template>
  <div class="q-py-sm inline">
    <Knob id="frequency" :color="color" :min="100" :max="12000" :inner-max="1" :value="vibrato.frequency" :step="10" :thickness="0.1" @updateValue="updateEnvelope" />

<!--    <q-knob-->
<!--        v-model="vibrato.frequency"-->
<!--        size="md"-->
<!--        :min="100"-->
<!--        :max="22000"-->
<!--        :step="100"-->
<!--        :color="color"-->
<!--        show-value-->
<!--        @change="update"-->
<!--      />-->
      <q-badge outline :color="color" label="freq." class="q-ma-xs"/>
  </div>

 <div class="q-py-sm inline">
   <Knob id="depth" :color="color" :min="0" :max="1" :inner-max="1" :value="vibrato.depth" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />

<!--   <q-knob-->
<!--        v-model="vibrato.depth"-->
<!--        size="md"-->
<!--        :step="0.01"-->
<!--        :min="0"-->
<!--        :max="1"-->
<!--        :color="color"-->
<!--        show-value-->
<!--        @change="update"-->
<!--      />-->
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
    console.log("vibrato1", AudioContextHandler.effectChain.getEffect("vibrato"))
    const vibrato = ref({
      frequency: AudioContextHandler.effectChain.getEffect("vibrato").frequency.value,
      depth: AudioContextHandler.effectChain.getEffect("vibrato").depth.value,
    });
    console.log("vibrato2", vibrato.value)
    const update = ()=>{
      console.log("vibrato", vibrato.value)
      AudioContextHandler.effectChain.setEffect("vibrato", vibrato.value)
      console.log("vibrato 4", AudioContextHandler.effectChain.getEffect("vibrato"))

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
