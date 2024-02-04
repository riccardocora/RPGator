
<template>
  <div class="effects-container">
    <div v-for="effect in effects" v-bind:key="effect" :key="effect" class="effect-container">
      <div class="arrows">
        <q-btn-group flat>
          <q-btn
              @click="moveLeft(effect)"
              icon="mdi-arrow-left"
              flat
              round
              dense
              color="primary"
              size="sm"
          />
          <q-btn
              @click="moveRight(effect)"
              icon="mdi-arrow-right"
              flat
              round
              dense
              color="primary"
              size="sm"
          />
        </q-btn-group>
      </div>


           <effect-container :name="effect"></effect-container>
    </div>
  </div>

</template>
<script>
import ChorusEffect from "../effects/ChorusEffect.vue";
import DistortionEffect from "../effects/DistortionEffect.vue";
import TremoloEffect from "../effects/TremoloEffect.vue";
import VibratoEffect from "../effects/VibratoEffect.vue";
import AudioContextHandler from "../AudioContextHandler.js";
import {ref} from "vue";
import EffectContainer from "../effects/EffectContainer.vue";

export default {
name: 'Effects',
  components: {EffectContainer, VibratoEffect, TremoloEffect, DistortionEffect, ChorusEffect},
  // computed:{
  //   getEffects() {
  //     return AudioContextHandler.effectChain.order
  //   }
  // },

  setup () {
    const effects = ref([...AudioContextHandler.effectChain.getOrder()])

    // const order = computed(() => {return effects.value})
    const moveRight= (effect)=>{
      console.log("effect: ", effect)
      console.log("effects initial: ", effects.value)

      const index = effects.value.indexOf(effect);
      console.log("index", index)
      if (index < effects.value.length - 1) {
        effects.value[index] = effects.value[index + 1];
        effects.value[index + 1] = effect;
      }
      AudioContextHandler.effectChain.moveEffectRight(effect);


      console.log("AudioContextHandler.effectChain.order final", AudioContextHandler.effectChain.order)
      // state.effects = AudioContextHandler.effectChain.order;
      console.log("effect final", effects.value)


    }
    const moveLeft= (effect)=>{
      console.log("effect: ", effect)
      console.log("effects initial", effects)
      const index = effects.value.indexOf(effect);
      console.log("index", index)
      if (index > 0) {
        effects.value[index] = effects.value[index - 1];
        effects.value[index - 1] = effect;
      }
      AudioContextHandler.effectChain.moveEffectLeft(effect);

      console.log("effects final", effects)
      console.log("AudioContextHandler.effectChain.order final", AudioContextHandler.effectChain.order)
    }

    return {
      effects,
      moveRight,
      moveLeft
    }
  },
  data () {
    return {
      tab: 'vibrato'
    }
  }
}
</script>

<style scoped lang="scss">
.effects-container{
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.effect-container{
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.11);
  border-left: 1px solid rgba(0, 0, 0, 0.11);
  width: 25%;
}

.arrows{
  display: flex;
  justify-content: center;
}
</style>
