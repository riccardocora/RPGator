<template>
    <div class="voices-container shadow">
      <q-carousel
          v-model="slide"
          swipeable
          animated
          keep-alive
          transition-next="slide-up"
          transition-prev="slide-down"
          color="$r2d-container"
          class="carousel transparent"
          ref="carousel"
      >
        <q-carousel-slide  :name="0" class=" slide">
          <div class = "slide">
            <voice-module id="0" color="primary"></voice-module>
          </div>
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
            <div class="control-btn-container">
            <q-btn-toggle square dense size="md" class=" control-btn checkmark" v-model="slide" :options="[{label: 'V1', value: 0}, {label: 'V2', value: 1}]"></q-btn-toggle>
            </div>
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
    <div class="control-container">
      <div class="control0 shadow">
        <voice-controls id="0" color="primary"></voice-controls>
      </div>
      <div class="control1 shadow">
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
  border-radius: 3%;
  border-top: 3px solid rgba(255, 255, 255, 0.04);
}

.control-container{
  max-height: 100%;
  height: 100%;
  width: 18%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);
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
  padding: 1% 2% 1% 2%;
}
.carousel-control{

  flex-direction: row;
  display: flex;
  width:4%;
}

.control-btn{
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.control-btn-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%
}



.control0{
  height: 49.5%;
  max-height: 49.5%;
  display: flex;
  flex-direction: column;
  background-color: $r2d-inner;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);

}
.control1{
  height: 49.5%;
  max-height: 49.5%;
  display: flex;
  flex-direction: column;
  background-color: $r2d-inner;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);
}



</style>
