<template>
  <div class="knob-wrapper">
    <Knob id="delayTime" :color="color" :min="0" :max="1" :inner-max="1" :value="delay.delayTime" :step="0.01" :thickness="0.1" @updateValue="update" />
    <div class="writings">Delay</div>
  </div>
  <div class="knob-wrapper">
    <Knob id="feedback" :color="color" :min="0" :max="1" :inner-max="1" :value="delay.feedback" :step="0.1" :thickness="0.1" @updateValue="update" />
    <div class="writings">Feedback</div>
  </div>
  <div class="knob-wrapper">
     <Knob id="wet" :color="color" :min="0" :max="1" :inner-max="1" :value="delay.wet" :step="0.1" :thickness="0.1" @updateValue="update" />
    <div class="writings">Wet</div>
  </div>
</template>
<script>
import {ref, defineComponent, reactive} from "vue";
import AudioContextHandler from "../AudioContextHandler.js";
import Knob from "../controls/Knob.vue";
export default defineComponent({
  name: "DelayEffect",
  components: {Knob},
  props: {
    color: {
      type: String,
      default: "primary"
    }
  },
  setup() {


    const delay = reactive({
      delayTime: AudioContextHandler.effectChain.getEffect("delay").delayTime.value,
      feedback: AudioContextHandler.effectChain.getEffect("delay").feedback.value,
      wet: AudioContextHandler.effectChain.getEffect("delay").wet.value,
    });
    const update = (newValue)=>{
      delay[newValue.id] = newValue.value;
      AudioContextHandler.effectChain.setEffect("delay", delay)
      // console.log("delay", AudioContextHandler.effectChain.getEffect("delay"))

    }


    return {
      update,
      delay
    }
  }
})



</script>
<style scoped>

</style>
