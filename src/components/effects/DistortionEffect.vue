<template>
  <div class="knob-wrapper">
    <Knob id="distortion" :color="color" :min="0" :max="1" :inner-max="1" :value="effect.distortion" :step="0.1" :thickness="0.1" :update="update"  />
    <div class="writings">Value</div>
  </div>
  <div class="knob-wrapper">
    <Knob id="wet" :color="color" :min="0" :max="1" :inner-max="1" :value="effect.wet.value" :step="0.1" :thickness="0.1" :update="update" />
    <div class="writings">Wet</div>
  </div>
</template>
<script>
import {defineComponent, reactive, toRaw} from "vue";
import Knob from "../controls/Knob.vue";
import effectChain from "@/components/effects/effectChain.js";
import * as Tone from "tone";

export default defineComponent({
  components: {Knob},
  props: {
    color: {
      type: String,
      default: "primary"
    },
    input : {
      type: Tone.Gain,
      required: true
    },
    output : {
      type: Tone.Gain,
      required: true
    }
  },
  setup(props){

      const effect = new Tone.Distortion()
    console.log("dist", props.input,props.output)



    return {
      effect
    }
  },
  methods: {
    chain() {
      this.input.disconnect()
      this.input.connect(this.effect);
      toRaw(this.effect).connect(this.output);
    },
    unchain() {
      this.input.disconnect(this.effect);
      this.effect.disconnect(this.output);
      this.input.connect(this.output);
    },
    async update(newValue){
      this.effect.set({
        [newValue.id]: newValue.value

      })
    }

  }
})

</script>
<style scoped>

</style>
