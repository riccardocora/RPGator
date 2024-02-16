
<template>
<!--  <q-carousel-->
<!--    v-model="envType"-->
<!--    swipeable-->
<!--    animated-->
<!--    keep-alive-->
<!--    :control-color="color"-->
<!--    navigation-position="right"-->
<!--    navigation-icon="radio_button_unchecked"-->
<!--    navigation-active-icon="radio_button_checked"-->
<!--    navigation-->
<!--    height="min-content"-->
<!--    width="min-content"-->
<!--    style="background-color: transparent"-->
<!--    padding-->
<!--    class="carousel text-white"-->

<!--  >-->
<!--    <q-carousel-slide name="amp" class="q-pa-none slide">-->
<!--      <envelope-comp :id="id" env-type="amp" :color="color" update=""></envelope-comp>-->
<!--    </q-carousel-slide>-->

<!--    <q-carousel-slide name="freq" class="q-pa-none slide">-->
<!--      <envelope-comp :id="id" env-type="freq" :color="color"></envelope-comp>-->
<!--    </q-carousel-slide>-->
<!--    <template v-slot:navigation-icon="{ active, btnProps, onClick }">-->
<!--      <q-btn no-caps v-if="active" flat round dense @click="onClick" >-->
<!--        <q-badge outline :color="color" class="q-pa-xs" :label="envType"/>-->
<!--      </q-btn>-->
<!--      <q-btn v-else icon="radio_button_unchecked" size="sm" flat round dense @click="onClick" />-->
<!--    </template>-->
<!--  </q-carousel>-->
</template>
<script>

import EnvelopeComp from "../envelope/EnvelopeControl.vue";
import {ref} from "vue";
export default {
  props: ['id','color'],
  name: "EnvelopeContainer",
  components: {EnvelopeComp},
  setup(){
    return{
      envType: ref('amp')
    }
  }
}

</script>
<style scoped>

</style>
