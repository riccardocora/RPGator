<template>
    <div class="voices-container shade ">
      <q-carousel
          v-model="slide"
          swipeable
          animated
          keep-alive
          color="$r2d-container"
          class="carousel transparent"
          ref="carousel"
      >
        <q-carousel-slide  :name="0" class="slide full-width full-height">
          <div class = "slide full-width full-height">
            <voice-module id="0" color="primary" :output="output"  ref="voice0"></voice-module>
          </div>
         </q-carousel-slide>
        <q-carousel-slide :name="1" class=" slide full-width full-height" >
          <div class = "slide full-width full-height">
            <voice-module id="1" color="secondary" :output="output" ref="voice1"></voice-module>
          </div>
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
              position="bottom-left"
              :offset="[20,20]"
              class="carousel-control"
            >

            <div class="control-btn-container">
            <q-btn-toggle square :color="getSlideColor" dense rounded :ripple="null" no-caps size="sm" class="checkmark btn " push v-model="slide" :options="[{label: 'V.1', value: 0}, {label: 'V.2', value: 1}]"></q-btn-toggle>
            </div>
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
    <div class="control-container">
      <div class="control0 shade ">
        <voice-controls id="0" color="primary" :update="updateVoice" ></voice-controls>
      </div>
      <div class="control1 shade">
        <voice-controls id="1" color="secondary" :update="updateVoice"></voice-controls>
      </div>
    </div>
</template>
<script>

import {ref} from "vue";
import VoiceModule from "../voices/voiceComp.vue";
import VoiceControls from "@/components/voices/sliders/voiceControls.vue";
import * as Tone from "tone";

export default{
  name: "Voices",
  components: {VoiceControls, VoiceModule},
  props : {

    output : Tone.Gain,

  },
  setup () {
    const slide = ref(0);




    return {
      slide,
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
  methods:{
    updatePattern(pattern, noteLength) {
      //console.log('pattern updated');
      pattern.set({
        values : pattern.values,
        callback : (time, value) => {
          if(this.$refs.voice0)this.$refs.voice0.playNote(value, noteLength);
          if(this.$refs.voice1)this.$refs.voice1.playNote(value, noteLength);
        }});
    },
    updateVoice(id,volume,octave,pan,transpose){
      switch (id) {
        case "0":
          if(this.$refs.voice0)this.$refs.voice0.updateControls(volume,octave,pan,transpose);
          break;
        case "1":
          if(this.$refs.voice1)this.$refs.voice1.updateControls(volume,octave,pan,transpose);
          break;
      }

    },

    noteDown(note, velToGain) {
      if(this.$refs.voice0){this.$refs.voice0.noteDown(note, velToGain)}
      if(this.$refs.voice1){this.$refs.voice1.noteDown(note, velToGain)}
    },
    noteUp(note) {
      if(this.$refs.voice0){this.$refs.voice0.noteUp(note)}
      if(this.$refs.voice1){this.$refs.voice1.noteUp(note)}
    }
  }
}
</script>

<style lang="scss" scoped>
.voices-container{
  max-width: 80%;
  min-width: 80%;
  height: 100%;
  display: flex;
  background-color: $r2d-inner;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);
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
  //border: 3px solid rgba(255, 255, 255, 0.04);
}

.carousel{
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;

}
.slide{
  //display: flex ;
  //flex-direction: row;
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
  flex-direction: row;
  width: 100%;
}

.control-btn-container{
  width: 100%;
  height: 100%;
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
