<template>
  <div class="voice-container">
    <div class="button-row">
      <q-btn
          round
          size=40%
          class="q-ma-sm button_light"
          color=""
          :class="chained? 'light_on': ''"
          @click="toggleChain"
      >
      </q-btn>
      <div>Voice</div>
      <q-btn-toggle
          v-model="voiceType"
          :toggle-color="color"
          color="black"
          dense
          outline
          push
          class="q-pa-xs  "
          size="xs"
          :options="[
              {label: 'synth', value: 'synth'},
              {label: 'sampler', value: 'sampler'},
              ]"
          @update:model-value="switchVoice"
      />

    </div>
    <div class="inner-voice">
      <synth-comp v-if="voiceType==='synth'" :output ="voice_out" :id="id" :color="color" ref="synth"></synth-comp>
      <sampler-comp :id="id" :output ="voice_out" v-else ref="sampler"></sampler-comp>
    </div>

  </div>

<!--  <div class="envelope-container">-->
<!--    <div class="button-row-envelope">-->
<!--      Envelope-->
<!--    </div>-->
<!--    <div class="envelope">-->
<!--&lt;!&ndash;      <envelope-comp :id="id" env-type="amp" :color="color"></envelope-comp>&ndash;&gt;-->
<!--    </div>-->

<!--  </div>-->

  <div class="filter-container ">
    <div class="filter">
        <filter-comp :id="id" :color="color" :input="filter_in" :output="filter_out" >
        </filter-comp>
    </div>
  </div>

</template>

<script>
import {reactive, ref, toRaw} from "vue";
import SamplerComp from "../sampler/Sampler.vue";
import EnvelopeComp from "../envelope/EnvelopeControl.vue";
import Knob from "../controls/Knob.vue";
import FilterComp from "../filter/filterComp.vue";

import VoiceControls from "../voices/sliders/voiceControls.vue";
import SynthComp from "@/components/synthetizer/Synth.vue";
import OscillatorComp from "@/components/oscillator/OscillatorComp.vue";
import * as Tone from "tone";

export default {
  name: "voiceModule",
  props: {
    id: {
      type: String,
      required: true
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
    },



  },
  components: {OscillatorComp, SynthComp, VoiceControls, FilterComp, Knob, EnvelopeComp, SamplerComp},

  setup(props){

    ////console.log("pro")
    const chained = ref(true);
    const octave = 0;

    const voice_out = new Tone.Gain();

    const filter_in = new Tone.Gain();
    const filter_out = new Tone.Gain();

    toRaw(voice_out).connect(filter_in);

    const pan = new Tone.Panner();
    filter_out.connect(pan);

    if(props.output){
      ////console.log("props.output",props.output)
      pan.connect(toRaw(props.output));
    }

    const voiceType = ref('synth');








    return{
      voice_out,
      filter_in,
      voiceType,
      filter_out,
      chained,
      octave,
      pan
    }
  },
  methods: {
    toRaw,
    toggleChain() {
      ////console.log("toggleChain",this.chained)
      if (this.chained) {
        ////console.log("disconnect")
        this.voice_out.disconnect(this.filter_in);
        ////console.log("disconnected")
      } else {
        ////console.log("connect")
        this.voice_out.connect(this.filter_in);

        ////console.log("connected")
      }
      this.chained = !this.chained;

    },

    switchVoice(newValue){
      ////console.log("switchVoice",newValue)
      // if(this.voiceType === "synth") {
      //   this.pattern.set({
      //     callback: (time, note) => {
      //       ////console.log("pattern", time, note)
      //       this.$refs.synthComp.playNote(Tone.Frequency(note).transpose(this.octave * 12), this.noteLength, time);
      //     }
      //   })
      // } else{
      //   this.pattern.set({
      //     callback: (time, note) => {
      //       ////console.log("pattern", time, note)
      //       this.$refs.samplComp.playNote(Tone.Frequency(note).transpose(this.octave * 12), this.noteLength, time);
      //     }
      //   })
      // }
    },

    playNote(note, noteLength) {
      if(this.voiceType==="synth" && this.$refs.synth){
        this.$refs.synth.playNote(Tone.Frequency(note).transpose(this.octave * 12), noteLength, "+4n");
      } else if(this.voiceType==="sampler" && this.$refs.sampler){
        this.$refs.sampler.playNote(Tone.Frequency(note).transpose(this.octave * 12), noteLength, "+4n");
      }

    },

    noteDown(note, velToGain) {
        let noteFreq = note.hasOwnProperty('frequency') ? note.frequency : note;
      if(this.$refs[this.voiceType])this.$refs[this.voiceType].noteDown(noteFreq, Tone.now(), velToGain);
    },
    noteUp(note) {
      let noteFreq = note.hasOwnProperty('frequency') ? note.frequency : note;
      if(this.$refs[this.voiceType])this.$refs[this.voiceType].noteUp(noteFreq, Tone.now());
    },
    updateControls(volume,octave, pan) {
      this.octave = octave;
      this.pan.pan.value = pan;

      if(this.$refs.synth)this.$refs.synth.updateVolume(volume);
      if(this.$refs.sampler)this.$refs.sampler.updateVolume(volume);

      //console.log("updateControls",volume,octave, pan)
      //console.log("voiceOut gain",this.voice_out)

    }
  }

}

</script>

<style lang="scss" scoped>



//.slider::-webkit-slider-thumb {
//    -webkit-appearance: none !important;
//    background-color: #272b2c;
//    @include filter-gradient(#272b2c, #272b2c, horizontal);
//    @include background-image(linear-gradient(left,  #272b2c 47%,#060707 48%,#272b2c 49%,#ffffff 51%,#ffffff 53%,#272b2c 53%));
//    box-shadow:
//      inset -0.5rem 0 0.6rem -0.4rem rgba(white,0.4),
//      inset 0.5rem 0 0.6rem -0.4rem rgba(white,0.4),
//      0 0 0.5rem rgba(black,0.4), -0.5rem 0 0.5rem rgba(black,0.3);
//    cursor: row-resize;
//    height: 3rem;
//    width: 2rem;
//    z-index: 10;
//  }
//}


.key{
  border-radius: 1.25px;
  background-image: radial-gradient(#544947 40%, transparent 70%), radial-gradient(#1D191A 30%, #483F40 45%, transparent 65%),
  radial-gradient(#77726E 30%, #9A968D 50%, transparent 65%),
  linear-gradient(#A29899, #C1B7B5, #C5BBB9, #C8BEBC 26%, #AAA09E 29%, #A19D92 32%, #A19C98, #9D9990 77%, #65605C 81%, #393335);
  background-size: 70px 25px, 20px 70px, 25px 70px, 100% 100%;
  background-position: -10px -19px, calc(100% + 14px) -10px, -17px -10px, top left;
  background-repeat: no-repeat;
  box-shadow: 0 -2.5px 2px -1.25px #131315 inset, 0 -2.75px 2.25px -1.25px #232426 inset, 0 10px 10px -10px #8C8280 inset
}


.voice-container{

  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.envelope-container{

  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
}


.filter-container{

  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.button-row{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 15%;
}

.button-row-envelope{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 15%;
  padding-left: 10px;
}

.inner-voice{
  height: 85%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.envelope{
  height: 85%;
  display: flex;
  flex-direction: column;

}

.filter{
  height: 100%;
  display: flex;
  flex-direction: column;

}
</style>
