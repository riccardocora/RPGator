<template>
  <div class="knob-wrapper">
    <Knob id="preDelay" :color="color" :min="0" :max="1" :inner-max="1" :value="effect.preDelay" :step="0.01" :thickness="0.1" :update="update" />
    <div class="writings">PreDel.</div>
  </div>
  <div class="knob-wrapper">
      <Knob id="decay" :color="color" :min="0" :max="5" :inner-max="5" :value="effect.decay" :step="0.01" :thickness="0.1" :update="update" />
    <div class="writings">Decay</div>
  </div>
  <div class="knob-wrapper">
    <Knob id="wet"  :color="color" :min="0" :max="1" :inner-max="1" :value="effect.wet.value" :step="0.01" :thickness="0.1" :update="update" />
    <div class="writings">Wet</div>
  </div>

</template>
<script>
import {defineComponent, toRaw} from "vue";
import Knob from "../controls/Knob.vue";
import * as Tone from "tone";
export default defineComponent({
  name:'ReverbEffect',
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
  setup() {
    const effect = new Tone.Reverb()
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
    update(newValue){
      this.effect.set({
        [newValue.id]: newValue.value
      })
    }

  }
})

</script>
<style scoped>

</style>
