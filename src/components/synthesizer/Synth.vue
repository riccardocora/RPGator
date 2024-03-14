
<template>
  <div class="container row full-height">
    <div class="synth col-6 row">
<!--      <div class="btn-container col-2">-->
<!--        <q-toggle-->
<!--          :model-value="synthType"-->
<!--          size="sm"-->
<!--          dense-->
<!--          true-value="mono"-->
<!--          false-value="membrane"-->
<!--          :color="color"-->
<!--          toggle-text-color=""-->
<!--          style="flex-direction: column;"-->
<!--          :ripple="false"-->
<!--          @update:model-value="updateSynthType"-->

<!--      />-->
<!--      </div>-->
      <div class="oscillatorContainer col-12">
        <oscillator-comp :id="id" :color="color" :output="oscGainOut" :update="updateOscillator" ref="oscillator"></oscillator-comp>
      </div>
    </div>
    <div class="envelopeContainer col-6">
      <envelope-comp :id="id" :color="color"  :input="oscGainOut" :output="envelopeGainOut" :update="updateEnvelope" ref="envelope"></envelope-comp>
    </div>
  </div>




</template>

<script>
import EnvelopeComp from "../envelope/EnvelopeControl.vue";
import OscillatorComp from "../oscillator/OscillatorComp.vue";
import * as Tone from "tone";
import {reactive, ref, toRaw, watch} from "vue";
export default {
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
    }

  },
  name: "SynthComp",
  components: {OscillatorComp, EnvelopeComp},
  setup(props){
    const synthType = ref("mono");

    const polySynth =new Map();

    const synth = new Tone.PolySynth(Tone.MonoSynth,{
      oscillator: {
        type: "sine",
        frequency: 440
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8
      }
    })

    // const lfo = reactive(new Tone.LFO({
    //   frequency: 1,
    //   type: "sine",
    //   min: -20,
    //   max: 0
    // }));
    // console.log("synth",synth)
    // toRaw(lfo).connect(synth._dummyVoice.oscillator.frequency).start()
    // synth.volume.value = -6 ;
    // synth.maxPolyphony =1000;
    if(props.input){
      props.input.connect(synth);
    }

    if(props.output){
      synth.connect(toRaw(props.output));
    }

    return {
      synth,
      polySynth,
      // oscGainOut,
      // envelopeGainOut,
      synthType
    }
  },
  methods: {
    async updateOscillator(newValue) {
      let oscillatorObject = toRaw(newValue).get();
      console.log("updateOscillator", oscillatorObject)

      delete oscillatorObject.frequency;
      await this.synth.set({oscillator: oscillatorObject});
    },

    updateEnvelope(newValue) {
      //////console.log("updateEnvelope", toRaw(newValue))
      this.synth.set({envelope: toRaw(newValue).get()});
    },

    updateSynthType(newValue) {

      this.synthType = newValue;
      const prevSynth = this.synth.options;
      this.synth = newValue === "mono" ? new Tone.MonoSynth(prevSynth) : new Tone.MembraneSynth(prevSynth);
      // this.synth.maxPolyphony =1000;
      if (this.input) {
        this.input.disconnect();
        this.input.connect(this.synth);
      }
      if (this.output) {
        this.synth.connect(toRaw(this.output));
      }
    },

    playNote(note, duration, time) {
      this.synth.triggerAttackRelease(note, duration, time);
    },

    updateVolume(volume) {
      this.synth.volume.value = volume;
    },

    noteUp(note, time) {
      this.synth.triggerRelease(note,Tone.now());
      // const noteValue = Tone.Frequency(note).toNote();
      // console.log("noteUp", noteValue)
      //
      // if (!this.polySynth.has(noteValue)) return;
      //
      // this.polySynth.get(noteValue).synth.triggerRelease(Tone.now());
      // // this.removeSynth(noteValue);
      // console.log("polySynth", this.polySynth)
    },


    noteDown(note, time, velToGain) {
      this.synth.triggerAttack(note,time,velToGain);
      // const noteValue = Tone.Frequency(note).toNote();
      //
      // // If a synth with the same note is already present in the map
      // if (this.polySynth.has(noteValue)) {
      //   // Clear the previous timeout
      //   clearTimeout(this.polySynth.get(noteValue).timeoutId);
      //
      //   // Set a new timeout of 1 second before removing the synth
      //   const timeoutId = setTimeout(() => this.removeSynth(noteValue), 1000);
      //   this.polySynth.get(noteValue).timeoutId = timeoutId;
      // } else {
      //   // Create a new synth
      //   const newSynth = this.synthType === "mono" ? new Tone.MonoSynth(this.synth.get()) : new Tone.MembraneSynth(this.synth.get());
      //   newSynth.connect(this.output);
      //
      //   newSynth.set({
      //     onsilence: () => {
      //       // Set a timeout of 1 second before removing the synth
      //       const timeoutId = setTimeout(() => this.removeSynth(noteValue), 1000);
      //       this.polySynth.get(noteValue).timeoutId = timeoutId;
      //     }
      //   });
      //
      //   newSynth.triggerAttack(note, time, velToGain)
      //   this.addSynth(noteValue, newSynth, null);
      // }
    },

    addSynth(note, synth, timeoutId) {
      this.polySynth.set(note, {synth, timeoutId});
    },

    removeSynth(note) {
      const {synth, timeoutId} = this.polySynth.get(note);
      clearTimeout(timeoutId);
      synth.dispose();
      this.polySynth.delete(note);
    }
  }
}

</script>

<style lang="scss" scoped>

.synth{
  //display: flex;
  //flex-direction: column;
  //width: 50%
}
.container{
  //width: 100%;
  //display: flex;
  //flex-direction: row;
}
.oscillatorContainer{
  //display: flex;
  //flex-direction: column;
  //height:100%;
  //width: 80%;
}

.envelopeContainer{
  //height:100%;
  //width: 50%;
  //display: flex;
  //flex-direction: column;
}

.btn-container {
  //display: flex;
  //align-items: center;
  //justify-content: space-around;
  //height: 100%;
  //width: 20%;
}

</style>
