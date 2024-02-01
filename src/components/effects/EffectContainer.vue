<template>

    <q-checkbox v-model="active" @update:model-value="toggleChain(active)" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
      <template v-slot:default>
        <q-badge  :label="name" :color="active?'yellow':'black'" />
      </template>

    </q-checkbox>

    <div v-if="name === 'tremolo'">
        <tremolo-effect></tremolo-effect>
      </div>
      <div v-else-if="name === 'vibrato'">
        <vibrato-effect></vibrato-effect>
      </div>
      <div v-else-if="name === 'distortion'">
        <distortion-effect></distortion-effect>
      </div>
      <div v-else-if="name === 'chorus'">
        <chorus-effect></chorus-effect>
      </div>
      <div v-else-if="name === 'reverb'">
        <reverb-effect></reverb-effect>
      </div>
      <div v-else-if="name === 'delay'">
        <delay-effect></delay-effect>
      </div>



</template>
<script>


import TremoloEffect from "../effects/TremoloEffect.vue";
import VibratoEffect from "../effects/VibratoEffect.vue";
import DistortionEffect from "../effects/DistortionEffect.vue";
import ChorusEffect from "../effects/ChorusEffect.vue";
import ReverbEffect from "../effects/Reverb.vue";
import AudioContextHandler from "../AudioContextHandler.js";
import {ref} from "vue";
import Delay from "../effects/Delay.vue";
import DelayEffect from "../effects/Delay.vue";

export default {
  name : "EffectContainer",
  components: {DelayEffect, Delay, ChorusEffect, DistortionEffect, VibratoEffect, TremoloEffect,ReverbEffect},
  props: {
    // Define a prop for the input node
    name: {
      type: String,
      required: true
    },
  },
  setup (props) {
    const active = ref(false);
    console.log("isChained 1", active.value)

    const toggleChain = (active) => {
      console.log("chaining", active)
      if (active){
        AudioContextHandler.effectChain.chainEffect(props.name);
      } else {
        console.log("unchaining", props.name)
        AudioContextHandler.effectChain.unchainEffect(props.name);
      }
    }

    return {
    toggleChain,
      active
    }
  },
}
</script>
<style >
.q-checkbox__icon-container{
  display:none;
}
.q-checkbox__inner{
  display:none;
}

</style>
