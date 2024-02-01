<template>
    <q-card flat class="card ">
      <div>
        <q-carousel
          v-model="slide"
          swipeable
          animated
          keep-alive
          navigation-position="left"
          navigation
          padding
          height="min-content"
          class="text-white rounded-borders carousel"
        >
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn no-caps v-if="active" icon="radio_button_checked" flat :color=getSlideColor(slide) dense @click="onClick" >
            </q-btn>
            <q-btn v-else icon="radio_button_unchecked" size="sm" :color=getSlideColor(slide) flat round dense @click="onClick" />
          </template>

          <q-carousel-slide name="v0" class="column flex-center q-pa-none ">
            <voice-module id="0" color="primary"></voice-module>
          </q-carousel-slide>
          <q-carousel-slide name="v1" class="column flex-center q-px-none q-py-none">
            <voice-module id="1" color="secondary"></voice-module>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </q-card>

</template>
<script>

import {ref} from "vue";
import VoiceModule from "../voices/voiceComp.vue";

export default{
  components: {VoiceModule},
  setup () {


    return {
      slide: ref('v0'),
    }
  },
  computed: {
    getSlideColor() {
      return (slideName) => {
        switch (slideName) {
          case 'v0':
            return 'primary';
          case 'v1':
            return 'secondary';
          // Add more cases if you have more slides
          default:
            return 'white'; // Default color if no match is found
        }
      };
    },
  },

}
</script>

<style lang="sass" scoped>
.panel
  padding-bottom: 0
  padding-top: 0
.card
  background-color: transparent
  //width: 50em
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) /* Add this line */


.carousel
  background-color: transparent
  //background-image: url("assets/images/dust.png")
  //background-color: rgba(115, 112, 112, 0.95)
</style>
