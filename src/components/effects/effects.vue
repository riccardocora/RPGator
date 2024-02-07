
<template>
  <div class="effects-container">
    <div v-for="effect in effects" v-bind:key="effect" :key="effect" class="effect-container">
      <div class="col-effect">
        <effect-container :name="effect"></effect-container>
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


      const index = effects.value.indexOf(effect);

      if (index < effects.value.length - 1) {
        effects.value[index] = effects.value[index + 1];
        effects.value[index + 1] = effect;
      }
      AudioContextHandler.effectChain.moveEffectRight(effect);




    }
    const moveLeft= (effect)=>{

      const index = effects.value.indexOf(effect);

      if (index > 0) {
        effects.value[index] = effects.value[index - 1];
        effects.value[index - 1] = effect;
      }
      AudioContextHandler.effectChain.moveEffectLeft(effect);



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
