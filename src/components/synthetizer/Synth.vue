
<template>
  <div class="container row full-height">
    <div class="synth col-6 row">
      <div class="btn-container col-2">
        <q-toggle
          :model-value="synthType"
          size="sm"
          dense
          true-value="mono"
          false-value="membrane"
          :color="color"
          toggle-text-color=""
          style="flex-direction: column;"
          :ripple="false"
          @update:model-value="updateSynthType"

      />
      </div>
      <div class="oscillatorContainer col-10">
        <oscillator-comp :id="id" :color="color" :update="updateOscillator"></oscillator-comp>
      </div>
    </div>
    <div class="envelopeContainer col-6">
      <envelope-comp :id="id" :color="color"  :update="updateEnvelope"></envelope-comp>
    </div>
  </div>




</template>

<script>
import EnvelopeComp from "../envelope/EnvelopeControl.vue";
import OscillatorComp from "../oscillator/OscillatorComp.vue";
import * as Tone from "tone";
import {ref, toRaw} from "vue";
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


    const synth = new Tone.PolySynth(Tone.MonoSynth,{
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8
      }
    })
    synth.volume.value = -6 ;
    synth.maxPolyphony =1000;
    //console.log("synth",synth)
    if(props.input){
      props.input.connect(synth);
    }
    if(props.output){
      synth.connect(toRaw(props.output));
    }

    return {
      synth,
      synthType
    }
  },
  methods: {
    async updateOscillator(newValue) {
      await this.synth.set({oscillator: toRaw(newValue).get()});
    },
    updateEnvelope(newValue) {
      //////console.log("updateEnvelope", toRaw(newValue))
      this.synth.set({envelope: toRaw(newValue).get()});
    },

    updateSynthType(newValue) {

      this.synthType = newValue;
      const prevSynth = this.synth.options;
      this.synth = new Tone.PolySynth(newValue==="mono" ? Tone.MonoSynth : Tone.MembraneSynth,prevSynth);
      this.synth.maxPolyphony =1000;
      if(this.input){
        this.input.disconnect();
        this.input.connect(this.synth);
      }
      if(this.output){
        this.synth.connect(toRaw(this.output));
      }
    },

    playNote(note,duration,time) {

      this.synth.triggerAttackRelease(note, duration,time);
    },
    updateVolume(volume) {
      this.synth.volume.value = volume;
    },
    noteUp(note,time){
      this.synth.triggerRelease(note,Tone.now());
    },
    noteDown(note,time,velToGain) {
      this.synth.triggerAttack(note,time,velToGain);
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
