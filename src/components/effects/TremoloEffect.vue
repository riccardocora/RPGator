<template>
    <div class="q-py-sm inline">
      <Knob id="frequency" v-model="effect.frequency" :color="color" :min="50" :max="10000" :inner-max="10000" :value="effect.frequency" :step="1" :thickness="0.1" :update="update"  />


      <q-badge outline :color="color" label="freq." class="q-ma-xs"/>
    </div>

    <div class="q-py-sm inline">
      <Knob id="depth" v-model="effect.depth" :color="color" :min="0" :max="1" :inner-max="1" :value="effect.depth" :step="0.01" :thickness="0.1" :update="update"  />

      <q-badge outline :color="color" label="depth" class="q-ma-xs"/>
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
  setup(props) {

    const effect = new Tone.Distortion()
    //console.log("tremolo", props.input,props.output)


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
