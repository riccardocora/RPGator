
<template>
  <div class="q-pa-none">
<!--    <div class="q-gutter-md">-->
<!--        <q-select v-model="instrument" :options="instrumentOptions" label="Select Instrument" validate @update:model-value="changeInstrument"/>-->
<!--    </div>-->
    <div class="button-grid">
      <q-btn
        v-for="button in buttons"
        :key="button.id"
        @click="changeInstrument(button.id)"
        :icon="'img:icons/'+button.instr+'/'+button.instr+'-96.png'"
        class="samplerButton blue transparent linear"
        :text-color="button.active ? 'white' : 'black'"
        dense
        size="lg"
      />
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'
  import AudioContextHandler from "../AudioContextHandler.js";
  import SoundLoader from "/src/SoundLoader.js";


  export default {
    name: "SamplerComp",
    props: {
      id: {
        type: String,
        required: true,
      },
    },


     setup(props) {
      const instrumentOptions = SoundLoader.getInstruments();
      const buttons = reactive(instrumentOptions.map(instrument => ({
         id : instrument,
         instr : instrument,
         active: instrument === "piano"
       })));


       const changeInstrument = (buttonId) => {
        console.log("changeInstrument", buttonId);
         buttons.forEach((button) => {
           button.active = button.id === buttonId;
         });
        AudioContextHandler.voices.setSamplerInstrument(props.id, buttonId)
      }
      return {
        instrument: ref("piano"),
        instrumentOptions,
        buttons,
        changeInstrument
      }
    },

    methods : {





      // generateScale(rootNote, scaleType, fromOctave, toOctave) {
      //   const scaleIntervals = {
      //     major: [0, 2, 4, 5, 7, 9, 11],
      //     minor: [0, 2, 3, 5, 7, 8, 10],
      //     maj7: [0, 2, 4, 5, 7, 9, 11],
      //   };
      //   const rootIndex = chromaticScale.indexOf(rootNote);
      //   if (rootIndex === -1) {
      //     return []; // Invalid root note
      //   }
      //   const notes = [];
      //   for (let octave = fromOctave; octave <= toOctave; octave++) {
      //     for (const interval of scaleIntervals[scaleType]) {
      //       const noteIndex = (rootIndex + interval) % chromaticScale.length;
      //       const note = chromaticScale[noteIndex] + (octave + Math.floor((rootIndex + interval) / chromaticScale.length));
      //       notes.push(note);
      //     }
      //   }
      //   console.log("notes:", notes);
      //   return notes;
      // },

    },
    mounted(){

    }
  }


</script>

<style lang="scss">
.button-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}
.samplerButton {
  /* Other styles */
  //box-shadow: 0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 20px rgba(0, 0, 0, 0.23);
  //transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

//.samplerButton:hover {
//  /* Other styles */
//  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.22);
//}

.samplerButton:active {
  /* Other styles */
  //box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15), 0 3px 10px rgba(0, 0, 0, 0.12);
}
//.samplerButton {
//  display: inline-block;
//  padding: 15px 45px;
//  color: #FCFBE7;
//  font-size: 2em;
//  text-align: center;
//  text-decoration: none;
//  position: relative;
//  margin-bottom: 30px;
//  text-transform: capitalize;
//  border-radius: 10px;
//}
//.blue {
//  background-color: #6DBCDB;
//  box-shadow: 1px 1px 0 #437487, 2px 2px 0 #437487, 3px 3px 0 #437487, 4px 4px 0 #437487;
//
//  text-shadow: 1px 2px rgba(67,116,135,.8);
//}
//
//.blue:hover {
//  margin-top: 1px;
//  box-shadow: 1 px 1px 0 #437487, 2px 2px 0 #437487;
//  margin-top: 2px;
//  margin-left: 2px;
//}
//
//
//.blue:active {
//  margin-top: 4px;
//  margin-left: 4px;
//}
//
//.samplerButton:active {
//  margin-top: 4px;
//  border: none;
//  box-shadow: none;
//}
</style>
