
<template>
  <div class="effects-container">
    <div v-for="effect in effects" v-bind:key="effect" :key="effect" class="effect-container">
      <div class="col-effect">

        <effect-container :name="effect" :input="getInput(effect)" :output="getOutput(effect)"></effect-container>
      </div>
      <div class="arrows">
          <q-btn
              @click="moveLeft(effect)"
              icon="chevron_left"
              flat
              dense
              color="primary "
              class="arrow"
              size="sm"
          />
          <q-btn
              @click="moveRight(effect)"
              icon="chevron_right"
              flat
              dense
              color="primary "
              class="arrow"
              size="sm"
          />
        </div>
    </div>
  </div>

</template>
<script>
import ChorusEffect from "../effects/ChorusEffect.vue";
import DistortionEffect from "../effects/DistortionEffect.vue";
import TremoloEffect from "../effects/TremoloEffect.vue";
import VibratoEffect from "../effects/VibratoEffect.vue";

import EffectContainer from "../effects/EffectContainer.vue";
import * as Tone from "tone";
import {reactive} from "vue";
import VisualTrip from "@/components/visualUnit/visual.vue";

export default {
name: 'Effects',
  components: {VisualTrip, EffectContainer, VibratoEffect, TremoloEffect, DistortionEffect, ChorusEffect},
  props :{
    input : {
      type: Tone.Gain,
      required: true
    },
    output : {
      type: Tone.Gain,
      required: true
    }
  },

  setup () {

    const effectMap = new Map([['delay',{input: new Tone.Gain() , output: new Tone.Gain() }],['dist',{input: new Tone.Gain(), output: new Tone.Gain() }],['reverb',{input: new Tone.Gain() , output: new Tone.Gain() }],['vibrato',{input: new Tone.Gain() , output: new Tone.Gain() }]]);
    const effects = reactive(['delay','dist','reverb','vibrato']);


    const moveRight= (effect)=>{


      const index = effects.indexOf(effect);
      if (index < effects.length - 1) {
        effects[index] = effects[index + 1];
        effects[index + 1] = effect;
      }


    }
    const moveLeft= (effect)=>{
      const index = effects.indexOf(effect);
      if (index > 0) {
        effects[index] = effects[index - 1];
        effects[index - 1] = effect;
      }

    }

    return {
      effects,
      moveRight,
      moveLeft,
      effectMap,

    }
  },
  methods:{
    getInput(effect) {
      console.log("getInpput effect",effect)
      const index = this.effects.indexOf(effect);
      console.log("index",index)
      if (index > 0) {
        console.log("previous effect",this.effects[index -1]);
        console.log("previous output ",this.effectMap.get(this.effects[index -1]).output)

        return this.effectMap.get(this.effects[index -1]).output;
      }
      console.log("previous effect(input)",this.input);

      return this.input
    },
    getOutput(effect) {
      console.log("getOutput effect",effect)
      const index = this.effects.indexOf(effect);
      if (index < this.effects.length - 1) {
        console.log("getOutput next effect ",this.effects[index + 1])



        return this.getInput(this.effects[index + 1])
      }
      console.log("getOutput next input (output)",this.output)

      return this.output
    },

  }
}
</script>

<style scoped lang="scss">
.effects-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}

.effect-container{
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.11);
  border-left: 1px solid rgba(0, 0, 0, 0.11);
  width: 25%;
}



.left-btn {
  height: 100%;
  max-width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.right-btn{
  height: 100%;
  max-width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.col-effect{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 5%;
}

.arrows{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  width: 80%;
}

.arrow{

}

</style>
