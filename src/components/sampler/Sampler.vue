
<template>
  <div class="container row">
    <div class="sampler col-6">
      <div class="button-grid">
        <div  v-for="button in buttons" class="checkbox-container">
          <button
              :key="button.id"
              @click="changeInstrument(button.id)"
              class="checkmark"
          >
            <img :src="'icons/'+button.instr+'/'+button.instr+'-50.png'" alt="Instrument Icon" class="sampler-icons">
          </button>
        </div>
      </div>

    </div>
    <div class="envelope col-6">
      <envelope-comp :id="id" :color="color"  :update="updateEnvelope" ref="envelope"></envelope-comp>
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


      let sampler = SoundLoader.load({instruments: 'piano'});


      if(props.input){
        props.input.connect(sampler);
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



      return {
        instrument: ref("piano"),
        instrumentOptions,
        buttons,
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
        if (this.sampler.loaded === false) return
        this.sampler.triggerAttackRelease(note, duration,time);
      },
      updateVolume(volume) {
        this.sampler.volume.value = volume;
      },

      noteUp(note,time){
        if (this.sampler.loaded === false) return

        this.sampler.triggerRelease(note,time);
      },
      noteDown(note,time,velToGain) {
        //console.log('noteDown',note,time)
        if (this.sampler.loaded === false) return

        this.sampler.triggerAttack(note,time,velToGain);
      },
      async changeInstrument(buttonId){
        //console.log("changeInstrument", buttonId);
        this.buttons.forEach((button) => {
          button.active = button.id === buttonId;
        });
        this.sampler  = await SoundLoader.load({
          instruments: buttonId,
          onload: () => {
            console.log('loaded');
          }

        });

        this.sampler.connect(this.output);

        // console.log("newsampl",newsampl.get())
        // sampler = newsampl;
        //console.log("sampler",this.sampler)

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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  aspect-ratio: 1/1;
      height: 90%;
      width: 85%;
}

.sampler-icons{
  height: 25px;
  width: 25px;
}

.sampler{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1%;
  height: 100%;
}

.checkmark {
  position: relative;
  pointer-events: auto;
  border-radius: 8%;
  background:
      radial-gradient(circle, rgba(164, 164, 164, 0),rgba(0, 0, 0, 0.349)),
      var(--select-color) !important;
  border: 1px solid rgba(26, 26, 26, 0.524);
  box-shadow: inset 0 0 3px 1px var(--btn-shadow-color) !important;
  /* Text */
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color-off) !important;
}


.checkmark:hover{
  background: var(--select-color) !important;
  box-shadow: inset 0 0 3px 1px var(--btn-shadow-color) !important;
}

.checkbox-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0;
}


</style>
