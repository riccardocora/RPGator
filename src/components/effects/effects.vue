
<template>
  <div class="q-pa-xs">
    <q-card class="card transparent">
      <q-card-section horizontal>
        <q-list bordered class="" v-for="effect in effects" v-bind:key="effect" :key="effect">
        <q-card-section class="q-px-md ">
          <q-item class="q-px-none">
            <div class="justify-center">
              <div>
                <q-item-section> <effect-container :name="effect"></effect-container></q-item-section>
              </div>
              <div>
                <q-item-section>
                  <q-btn-group>
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
                </q-item-section>
              </div>

            </div>


          </q-item>
        </q-card-section>
        </q-list>
      </q-card-section>

<!--      <q-card-section horizontal>-->
<!--          <div v-for="effect in effects" :key="effect" >-->
<!--            <q-card-section  class="column q-pa-none">-->
<!--              &lt;!&ndash;<            <chorus-effect></chorus-effect>&ndash;&gt;-->
<!--              <q-card-section>-->
<!--                <q-btn-group>-->
<!--                  <q-btn-->
<!--                    @click="moveLeft(effect)"-->
<!--                    icon="mdi-arrow-left"-->
<!--                    flat-->
<!--                    round-->
<!--                    dense-->
<!--                    color="primary"-->
<!--                  />-->
<!--                  <q-btn-->
<!--                    @click="moveRight(effect)"-->
<!--                    icon="mdi-arrow-right"-->
<!--                    flat-->
<!--                    round-->
<!--                    dense-->
<!--                    color="primary"-->
<!--                  />-->
<!--                </q-btn-group>-->
<!--              </q-card-section>-->
<!--              <effect-container :name="effect"></effect-container>-->
<!--            </q-card-section>-->
<!--          </div>-->

<!--        <-->
<!--          <q-separator vertical inset/>-->
<!--          <q-card-section class="column q-pa-none">-->
<!--            <tremolo-effect></tremolo-effect>-->
<!--          </q-card-section>-->
<!--          <q-separator vertical inset/>-->
<!--          <q-card-section class="column q-pa-none">-->
<!--            <vibrato-effect></vibrato-effect>-->
<!--          </q-card-section>-->
<!--        <q-separator vertical inset/>-->
<!--        <q-card-section class="column q-pa-none">-->
<!--            <distortion-effect></distortion-effect>-->
<!--          </q-card-section>-->
<!--      </q-card-section>-->
<!--        <q-card-section class="column">-->


<!--        <q-tabs-->
<!--          v-model="tab"-->
<!--          dense-->
<!--          class="text-grey"-->
<!--          active-color="primary"-->
<!--          indicator-color="primary"-->
<!--          align="justify"-->
<!--        >-->
<!--          <q-tab name="vibrato" label="Mails" />-->
<!--          <q-tab name="distortion" label="Alarms" />-->
<!--          <q-tab name="tremolo" label="Movies" />-->
<!--        </q-tabs>-->

<!--        <q-separator />-->

<!--        <q-tab-panels v-model="tab" animated>-->
<!--          <q-tab-panel name="vibrato" class="q-pa-none">-->
<!--            -->
<!--          </q-tab-panel>-->
<!--        </q-tab-panels>-->
    </q-card>

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

<style scoped lang="sass">
.card
  background-image: url("assets/images/metal.png")
</style>
