
<template>
  <div class="container">
    <q-btn-toggle
        v-model="synthType"
        toggle-color="primary"
        class="btn-container"
        size="xs"
        unelevated
        :ripple="false"
        :options="synthTypes"
        @update:model-value="updateSynthType"
    />
    <div class="oscillatorContainer">
      <oscillator-comp :id="id" :color="color" :update="updateOscillator"></oscillator-comp>
    </div>
    <div class="envelopeContainer">
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
    const synthType = ref(Tone.MonoSynth);
    const synthTypes = [
      {
        label: "Mono",
        class:'checkmark',
        value: Tone.MonoSynth,
      },
      {
        label: "Membrane",
        class:'checkmark',
        value: Tone.MembraneSynth,
      },

    ]

    const synth = new Tone.PolySynth(synthType.value,{
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
    synth.maxPolyphony =1000;
    console.log("synth",synth)
    if(props.input){
      props.input.connect(synth);
    }
    if(props.output){
      synth.connect(toRaw(props.output));
    }

    return {
      synth,
      synthTypes,
      synthType
    }
  },
  methods: {
    async updateOscillator(newValue) {

      this.synth.set({oscillator: toRaw(newValue).get()});
    },
    updateEnvelope(newValue) {
      //////console.log("updateEnvelope", toRaw(newValue))
      this.synth.set({envelope: toRaw(newValue).get()});
    },

    updateSynthType(newValue) {
      console.log("updateSynthType",newValue)
      const prevSynth = this.synth.options;
      console.log("prevSynth",prevSynth)
      this.synth = new Tone.PolySynth(toRaw(newValue),prevSynth);
      console.log("newSynth",this.synth)
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
      //console.log('synth output',this.output)

      this.synth.triggerAttackRelease(note, duration,time);
    },
    updateVolume(volume) {
      //console.log('updateVolume',this.synth.volume,volume)
      this.synth.volume.value = volume;
    },
    noteUp(note,time){
      //console.log("noteUp synth",note,time)
      this.synth.triggerRelease(note,Tone.now());
    },
    noteDown(note,time,velToGain) {
      //console.log('noteDown',note,time)
      this.synth.triggerAttack(note,time,velToGain);
    }
  }
}

</script>

<style lang="scss" scoped>

.container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.oscillatorContainer{
  height:100%;
  width: 50%;
}

.envelopeContainer{
  height:100%;
  width: 50%;
}

.btn-container{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  height: 80%;
  width: 50%;
}

</style>
