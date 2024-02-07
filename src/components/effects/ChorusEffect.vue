<template>

    <div class="knob-wrapper">
      <Knob id="frequency" :color="color" :min="0" :max="200" :inner-max="200" :value="chorus.frequency" :step="1" :thickness="0.1" @updateValue="updateChorus" />
      <div class="writings">Freq.</div>
    </div>
    <div class="knob-wrapper">
      <Knob id="depth" :color="color" :min="0" :max="1" :inner-max="1" :value="chorus.depth" :step="0.1" :thickness="0.1" @updateValue="updateChorus" />
      <div class="writings">Depth</div>
    </div>

  <div class="knob-wrapper">
    <Knob id="delayTime" :color="color" :min="2" :max="20" :inner-max="20" :value="chorus.delayTime" :step="0.1" :thickness="0.1" @updateValue="updateChorus" />
    <div class="writings">Delay</div>
  </div>


</template>
<script>
import {ref, defineComponent, reactive} from "vue";
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
    const chorus = reactive({
      frequency: AudioContextHandler.effectChain.getEffect("chorus").frequency.value,
      depth: AudioContextHandler.effectChain.getEffect("chorus").depth.value,
      delayTime: AudioContextHandler.effectChain.getEffect("chorus").delayTime,
    });
    const updateChorus = (newValue)=>{
      chorus[newValue.id] = newValue.value;
      console.log("chorus", chorus)
      AudioContextHandler.effectChain.setEffect("chorus", chorus)

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
