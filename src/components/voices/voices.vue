<template>
    <div class="voices-container">
      <q-carousel
          v-model="slide"
          swipeable
          animated
          keep-alive
          color="$r2d-container"
          class="carousel transparent"
          ref="carousel"
      >
        <q-carousel-slide  :name="0" class=" slide">
          <voice-module id="0" color="primary"></voice-module>
        </q-carousel-slide>
        <q-carousel-slide :name="1" class=" slide">
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
        <voice-controls id="0" color="primary"></voice-controls>
      </div>
      <div class="control1">
        <voice-controls id="1" color="secondary"></voice-controls>
      </div>
    </div>
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
  max-width: 80%;
  height: 100%;
  display: flex;
  background-color: $r2d-inner;
}

.control-container{
  max-height: 100%;
  height: 100%;
  width: 18%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  border: 0.5px solid rgba(255, 255, 255, 0.37);
}

.carousel{
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
}
.slide{
  display: flex ;
  flex-direction: row;
  overflow: hidden;
  border: 0.5px solid rgba(255, 255, 255, 0.37);
}
.carousel-control{

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
  height: 49.5%;
  max-height: 49.5%;
  display: flex;
  flex-direction: column;
  background-color: $r2d-inner;
}
.control1{
  height: 49.5%;
  max-height: 49.5%;
  display: flex;
  flex-direction: column;
  background-color: $r2d-inner;
  border-top: 0.3px solid rgba(255, 255, 255, 0.37);
}



</style>
