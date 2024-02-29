<template>
  <div class="knob-wrapper">
    <Knob id="frequency" :color="color" :min="10" :max="12000" :value="effect.frequency.value" :step="10" :thickness="0.1" :update="update"  />

    <div class="writings">Freq.</div>
  </div>

  <div class="knob-wrapper">
    <Knob id="depth" :color="color" :min="0" :max="1" :inner-max="1" :value="effect.depth.value" :step="0.01" :thickness="0.1" :update="update"  />
    <div class="writings">Depth</div>
  </div>

  <div class="knob-wrapper">
    <Knob id="wet" :color="color" :min="0" :max="1" :inner-max="1" :value="effect.wet.value" :step="0.1" :thickness="0.1" :update="update" />
    <div class="writings">Wet</div>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import Knob from "../controls/Knob.vue";
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
  setup() {

    const effect = new Tone.Vibrato();
    return {
      effect
    }
  },
  methods: {
    chain() {
      this.input.disconnect()
      this.input.connect(this.effect);
      this.effect.connect(this.output);
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
