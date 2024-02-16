
<template>
  <div class="container">
    <div class="sampler">
      <div class="button-grid">
        <q-btn
            v-for="button in buttons"
            :key="button.id"
            @click="changeInstrument(button.id)"
            :icon="'img:icons/'+button.instr+'/'+button.instr+'-96.png'"
            class="checkmark"
            :color="button.active ? 'primary' : ''"
            :class="{'active-icon': button.active }"

        />
      </div>

    </div>
    <div class="envelope">
      <envelope-comp :id="id"  :input="envGainIn" :output="envGainOut" :update="updateEnvelope" ref="envelope"></envelope-comp>

    </div>
  </div>



</template>

<script>
import {reactive, ref, toRaw} from 'vue'
  import SoundLoader from "/src/SoundLoader.js";
import EnvelopeComp from "@/components/envelope/EnvelopeControl.vue";
import * as Tone from "tone";

  export default {
    name: "SamplerComp",
    components: {EnvelopeComp},
    props: {
      id: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: false,
        default: "primary"
      },
      input :{
        type: Tone.Gain,
        required: false
      },
      output : {
        type: Tone.Gain,
        required: false
      }

    },


     setup(props) {


      const sampler = SoundLoader.load({instruments: 'piano'});


      if(props.input){
        props.input.connect(toRaw(sampler));
      }
      if(props.output){
        sampler.connect(props.output);
        //console.log(" env out connected")
      }

      const instrumentOptions = SoundLoader.getInstruments();
      const buttons = reactive(instrumentOptions.map(instrument => ({
         id : instrument,
         instr : instrument,
         active: instrument === "piano"
       })));


       const changeInstrument = async(buttonId) => {
        //console.log("changeInstrument", buttonId);
         buttons.forEach((button) => {
           button.active = button.id === buttonId;
         });
         sampler.value = await SoundLoader.load({
           instruments: buttonId,
           onload: () => {

             //console.log('loaded');
           }
         });
      }
      return {
        instrument: ref("piano"),
        instrumentOptions,
        buttons,
        changeInstrument,
        sampler,
      }
    },

    methods : {
      updateEnvelope(newValue) {
        //console.log("updateEnvelope",newValue)
        this.sampler.set({attack: newValue.attack,
          release: newValue.release});
      },
      playNote(note,duration,time){
        //console.log("playNote sampler",note,duration,time)
        this.sampler.triggerAttackRelease(note, duration,time);
      },
      updateVolume(volume) {
        this.sampler.volume.value = volume;
      },

      noteUp(note,time){
        this.synth.triggerRelease(note,time);
      },
      noteDown(note,time,velToGain) {
        //console.log('noteDown',note,time)
        this.synth.triggerAttack(note,time,velToGain);
      }


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
      //   //console.log("notes:", notes);
      //   return notes;
      // },

    },

  }


</script>

<style lang="scss">
.button-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 90%;
  width: 85%;
  padding: 10px;
}

.container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.sampler{
  height:100%;
  width: 50%;
}
.envelope{
  height:100%;
  width: 50%;
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
.sampler-container{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
}

.active-icon {
    color: white !important;
    /* Add any other styles for the active state */
}

.checkmark{
  background-color: #2f2f2f ;
}

</style>
