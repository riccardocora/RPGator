<template>
    <div class="voices-container">
      <q-carousel
          v-model="slide"
          swipeable
          animated
          keep-alive
          class="carousel"
          ref="carousel"
      >

        <q-carousel-slide :name="0" class="evidence slide">
          <voice-module id="0" color="primary"></voice-module>
        </q-carousel-slide>
        <q-carousel-slide :name="1" class="evidence slide">
          <voice-module id="1" color="secondary"></voice-module>
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
              position="top"
              :offset="[0,120]"
              class="carousel-control"
            >
            <q-btn-toggle size="xs" class="control-btn" v-model="slide" :options="[{label: 'Slide 1', value: 0}, {label: 'Slide 2', value: 1}]"></q-btn-toggle>
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
    <div class="control-container">
      <div class="control0">
<!--        <voice-controls id="0" color="primary"></voice-controls>-->
      </div>
      <div class="control1">
        <voice-controls id="1" color="secondary"></voice-controls>
      </div>
    </div>
<!--          <q-carousel-->
<!--              v-model="slide"-->
<!--              swipeable-->
<!--              animated-->
<!--              keep-alive-->
<!--              navigation-position="left"-->
<!--              navigation-->
<!--              height="min-content"-->
<!--              class="text-white carousel"-->
<!--          >-->
<!--            <template v-slot:navigation-icon="{ active, btnProps, onClick }">-->
<!--              <q-btn no-caps v-if="active" icon="radio_button_checked" flat :color=getSlideColor(slide) dense @click="onClick" >-->
<!--              </q-btn>-->
<!--              <q-btn v-else icon="radio_button_unchecked" size="sm" :color=getSlideColor(slide) flat round dense @click="onClick" />-->
<!--            </template>-->

<!--            <q-carousel-slide name="v0" class="column flex-center q-pa-none ">-->
<!--              <voice-module id="0" color="primary"></voice-module>-->
<!--            </q-carousel-slide>-->
<!--            <q-carousel-slide name="v1" class="column flex-center q-px-none q-py-none">-->
<!--              <voice-module id="1" color="secondary"></voice-module>-->
<!--            </q-carousel-slide>-->
<!--          </q-carousel>-->
<!--          <div class="row no-wrap">-->
<!--            <div class="column">-->
<!--              <voice-controls id="0" ></voice-controls>-->
<!--            </div>-->
<!--            <div class="column">-->
<!--              <voice-controls id="1" ></voice-controls>-->
<!--            </div>-->
<!--          </div>-->

</template>
<script>

import {ref} from "vue";
import VoiceModule from "../voices/voiceComp.vue";
import VoiceControls from "@/components/voices/sliders/voiceControls.vue";

export default{
  components: {VoiceControls, VoiceModule},
  setup () {
    const slide = ref(0);

    const updateSlide = (value) =>{
      console.log('slide updated',value)
      console.log('slide updated',slide)

    }

    return {
      slide,
      updateSlide
    }
  },
  computed: {
    getSlideColor() {
      return (slideName) => {
        switch (slideName) {
          case 0:
            return 'primary';
          case 1:
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

<style lang="scss" scoped>
.voices-container{
  width: 80%;
  height: 100%;
  background-color: pink;
}
.control-container{
  background-color: fuchsia;
  height: 100%;
  width: 20%;
}

.carousel{
  height: 100%;

}
.slide{
  display: flex ;
  flex-direction: row;
  overflow: hidden;
}
.carousel-control{
  background-color: #7b807d;
  flex-direction: row;
  display: flex;
  width:4%;
}
.control-btn{
  align-items: center;
  flex-direction: column;
  width: 5%;
}

.control0{
  height: 50%;
  max-height: 50%;
  background-color: #6016ff;
  display: flex;
  flex-direction: column;
}
.control1{
  height: 50%;
  max-height: 50%;
  background-color: #18962d;
  display: flex;
  flex-direction: column;
}
</style>
