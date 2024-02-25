<template>
    <div class="effect-switch">
      <q-checkbox v-model="chained"  checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center" @update:model-value="toggleChain">
        <template v-slot:default>
          <q-btn size="40%" round :class="chained?'light_on':'button_light'" />
        </template>
      </q-checkbox>
      <div>{{name}}</div>
    </div>


    <div class="effect">
      <div class="effect-col" v-if="name === 'tremolo'">
        <tremolo-effect :input="gainIn" :output="gainOut" ref="tremolo"></tremolo-effect>
      </div>
      <div class="effect-col" id="vibrato" v-else-if="name === 'vibrato'" >
        <vibrato-effect :input="gainIn" :output="gainOut" ref="vibrato"></vibrato-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'dist'">
        <distortion-effect :input="gainIn" :output="gainOut"  ref="dist"></distortion-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'chorus'" >
        <chorus-effect :input="gainIn" :output="gainOut" ref="chorus"></chorus-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'reverb'" >
        <reverb-effect :input="gainIn" :output="gainOut" ref="reverb"></reverb-effect>
      </div>
      <div class="effect-col" v-else-if="name === 'delay'" >
        <delay-effect :input="gainIn" :output="gainOut" ref="delay"></delay-effect>
      </div>
    </div>

</template>
<script>


import TremoloEffect from "../effects/TremoloEffect.vue";
import VibratoEffect from "../effects/VibratoEffect.vue";
import DistortionEffect from "../effects/DistortionEffect.vue";
import ChorusEffect from "../effects/ChorusEffect.vue";
import ReverbEffect from "../effects/Reverb.vue";
import Delay from "../effects/Delay.vue";
import DelayEffect from "../effects/Delay.vue";
import * as Tone from "tone";
import {ref} from "vue";

export default {
  name : "EffectContainer",
  components: {DelayEffect, Delay, ChorusEffect, DistortionEffect, VibratoEffect, TremoloEffect,ReverbEffect},
  props: {
    // Define a prop for the input node
    name: {
      type: String,
      required: true
    },
    input :{
      type: Tone.Gain,
      required: true
    },
    output :{
      type: Tone.Gain,
      required: true
    }
  },
  watch: {

    input: function () {
      this.input.disconnect();
      this.input.connect(this.gainIn);
    },
    output: function () {
      this.gainOut.disconnect()
      this.gainOut.connect(this.output);
    }
  },
  setup (props) {
    // const ec = effectChain;
    console.log("effectName",props.name)
    console.log("input",props.input)
    console.log("output",props.output)

    // console.log("effectChain  ", ec.effects )
    // console.log("effectChain ", ec.effects.get(props.name) )

    // const effect = ec.effects.get(props.name)

    const chained = ref(false);

    const gainIn = new Tone.Gain();
    const gainOut = new Tone.Gain();

    props.input.connect(gainIn);
    gainOut.connect(props.output);

    gainIn.connect(gainOut);

    // console.log("effect.chained: ",effect)
    // effect.toggleChain()
    // const active = ref(false);
    //
    //
    // console.log("isChained 1", active.value)



    return {
      chained,
      gainOut,
      gainIn
    }
  },
  methods:{
    toggleChain(active){
      //console.log("isChained 2", active)
      if (active){
        //console.log("chaining")
        //console.log(this.$refs[this.name])
        this.$refs[this.name].chain();
      } else {
        //console.log("unchaining")
        this.$refs[this.name].unchain();
      }
    }
  }
}
</script>
<style scoped>

.effect-switch{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 20%;

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
