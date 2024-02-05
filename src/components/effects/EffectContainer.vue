<template>
    <div class="effect-switch">
      <q-checkbox v-model="active" @update:model-value="toggleChain(active)" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
        <template v-slot:default>
          <q-btn size="40%" round :class="active?'light_on':'button_light'" />
        </template>
      </q-checkbox>
      <div>{{name}}</div>
    </div>


    <div class="effect">
      <div class="effect-col" v-if="name === 'tremolo'">
        <tremolo-effect></tremolo-effect>
      </div>
      <div class="effect-col" id="vibrato" v-else-if="name === 'vibrato'">
        <vibrato-effect></vibrato-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'dist'">
        <distortion-effect></distortion-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'chorus'">
        <chorus-effect></chorus-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'reverb'">
        <reverb-effect></reverb-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'delay'">
        <delay-effect></delay-effect>
      </div>
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
<style scoped>

.effect-switch{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 20%;
  color: white;

  //margin: 10px;
}

.effect{
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  font-size: 11px;

}

.effect-col{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.light_on{
  width: 10%;
}

.button_light{
  width: 10%;
}

</style>
