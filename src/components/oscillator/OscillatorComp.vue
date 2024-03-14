
<template>
    <div class="row q-py-sm q-pb-lg">

      <div class="col carrier column">
        <div class="row-2 flex flex-row ">
          <div style="font-size: small">OSC.</div>
        </div>
        <div class="row">
          <div class="column col justify-center">
            <div class="full-height col-6">
              <q-option-group
                  v-model="oscillator.baseType"
                  :toggle-color="color"
                  class="option-grid"
                  size="xs"
                  type="radio"
                  unelevated
                  :ripple="false"
                  :options="baseTypeOptions"
                  @update:model-value="updateOscillator"
              >

                <template v-slot:label-0="sine">
                  <div class="flex q-pa-sm" >

                    <q-badge rounded flat :class="oscillator.baseType===sine.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>
                    <div>
                      <q-icon name="mdi-sine-wave"  class="q-pa-xs"/>
                    </div>
                  </div>


                </template>

                <template v-slot:label-1="square">
                  <div class="flex q-pa-sm" >

                    <q-badge rounded flat  :class="oscillator.baseType===square.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>
                    <div>
                      <q-icon name="mdi-square-wave " class="q-pa-xs"/>
                    </div>
                  </div>

                </template>

                <template v-slot:label-2="triangle">
                  <div class="flex q-pa-sm" >

                    <q-badge rounded flat  :class="oscillator.baseType===triangle.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>
                    <div>
                      <q-icon name="mdi-triangle-wave" class="q-pa-xs"/>
                    </div>
                  </div>

                </template>

                <template v-slot:label-3="sawtooth">
                  <div class="flex q-pa-sm" >
                    <q-badge rounded flat  :class="oscillator.baseType===sawtooth.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>
                    <div>
                      <q-icon name="mdi-sawtooth-wave" class="q-pa-xs" />
                    </div>
                  </div>

                </template>
              </q-option-group>

            </div>

          </div>
          <div class="column col justify-center">
            <div class="knob-wrapper q-pa-xs">
              <Knob
                  :v-model="oscillator.phase"
                  id="phase"
                  :color="color"
                  :min="0"
                  :max="360"
                  :step="1"
                  :value="oscillator.phase"
                  :update="knobUpdate"/>
              <div>Phase</div>
            </div>
            <div class="knob-wrapper q-pa-xs">
              <Knob
                  :v-model="oscillator.partialCount"
                  id="partialCount"
                  :color="color"
                  :min="0"
                  :max="20"
                  :step="1"
                  :value="oscillator.partialCount"
                  :update="knobUpdate"/>
              <div>PART.</div>
            </div>
            <!--          </div>-->
            <!--          <div class="row col-6">-->
            <div class="knob-wrapper q-pa-xs">
              <Knob
                  :v-model="oscillator.detune"
                  id="detune"
                  :color="color"
                  :min="0"
                  :max="360"
                  :step="1"
                  :value="oscillator.detune.value"
                  :update="knobUpdate"/>
              <div>Detune</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col modulation column">
        <div class="row-2 flex flex-row ">
          <div style="font-size: small">Mod.</div>
        </div>
        <div class="row">
          <div class="column col justify-between">

            <!--          </div>-->
            <!--          <div class="row col-6">-->
            <div class="q-pa-xs">
              <q-option-group
                  v-model="sourceType"
                  size="sm"
                  unelevated
                  class="option-grid"
                  clearable
                  dense
                  stretch
                  spread
                  :options="sourceTypeOptions"
                  @update:model-value="updateOscillator"
                  @clear="update"
              >
                <template v-slot:label="src">
                  <div class="flex q-pa-sm">

                        <q-badge rounded flat  :class="sourceType===src.value?'light_on':'button_light'" @click="updateOscillator"/>
                    <div class="q-px-xs">

                        {{ src.value }}
                    </div>


                  </div>
                </template>
              </q-option-group>
            </div>
            <div class="knob-wrapper q-pa-xs">
              <Knob
                  :v-model="oscillator.harmonicity"
                  id="harmonicity"
                  :color="color"
                  :min="0"
                  :max="20"
                  :step="1"
                  :value="oscillator.harmonicity"
                  :update="knobUpdate"/>
              <div>Harm</div>
            </div>

          </div>

          <div class="column col justify-center">
            <div class="col full-height">
              <q-option-group
                  v-model="oscillator.modulationType"
                  :toggle-color="color"
                  size="xs"
                  unelevated
                  stretch
                  type="radio"
                  class="option-grid col-6"
                  clearable
                  :options="baseTypeOptions"
                  @update:model-value="updateOscillator"

              >
                <template v-slot:label-0="sine">
                  <div class="flex q-pa-sm" >
                    <div>
                      <q-icon name="mdi-sine-wave" size="" class="q-pa-xs"/>
                    </div>
                    <q-badge rounded :class="oscillator.modulationType===sine.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>


                  </div>
                </template>

                <template v-slot:label-1="square">
                  <div class="flex q-pa-sm" >
                    <div>
                      <q-icon name="mdi-square-wave" class="q-pa-xs"/>
                    </div>
                    <q-badge rounded flat  :class="oscillator.modulationType===square.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>


                  </div>
                </template>

                <template v-slot:label-2="triangle">
                  <div class="flex q-pa-sm" >
                    <div>
                      <q-icon name="mdi-triangle-wave" class="q-pa-xs"  />
                    </div>
                    <q-badge rounded flat  :class="oscillator.modulationType===triangle.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>

                  </div>
                </template>

                <template v-slot:label-3="sawtooth">
                  <div class="flex q-pa-sm" >
                    <div>
                      <q-icon name="mdi-sawtooth-wave" class="q-pa-xs" />
                    </div>
                    <q-badge rounded flat  :class="oscillator.modulationType===sawtooth.value?'light_on':'button_light'" @click="updateOscillator">
                    </q-badge>


                  </div>
                </template>
              </q-option-group>
            </div>
          </div>
        </div>
      </div>
    </div>
        <!--        <div class="row-4 modulation q-px-sm justify-around column">-->
<!--          LFO-->

<!--          <div class="knob-wrapper">-->
<!--            <Knob-->
<!--                :v-model="lfo.frequency"-->
<!--                id="frequency"-->
<!--                :color="color"-->
<!--                :min="0.1"-->
<!--                :max="10"-->
<!--                :step="0.1"-->
<!--                :value="lfo.frequency.value"-->
<!--                :update="lfoUpdate"/>-->
<!--            <div>Freq.{{lfo.frequency.value}}</div>-->
<!--          </div>-->
<!--          <q-badge rounded flat  :class="lfoOn?'light_on':'button_light'" @click="toggleLFO"/>-->


<!--        </div>-->








</template>

<script>
import {reactive, ref, toRaw, watch} from "vue";
import OscillatorCurve from "../oscillator/OscillatorCurve.vue";
import Knob from "../controls/Knob.vue";
import * as Tone from "tone";
export default {
  name: "OscillatorComp",
  components: {Knob, OscillatorCurve},
  props: {
    id: {
      type: String,
      required: true
    },

    color: {
      type: String,
      required: false,
      default : "accent"
    },
    input : {
      type: Tone.Gain,
      required: false
    },
    output : {
      type: Tone.Gain,
      required: false
    },
    update : {
      type: Function,
      required: true
    }
  },

  setup(props){

    const sourceType = ref("oscillator");
    const baseType = ref("sine");
    const modulationType = ref("sine");
    // const oscillators = new Map();
    const oscillator = reactive(new Tone.OmniOscillator({
      baseType: baseType.value,
      sourceType: sourceType.value,
      modulationType: modulationType.value,
      phase: 100,
      partialCount: 0,
    }));
    // const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    // const octaves = ['0', '1', '2', '3', '4', '5', '6', '7'];

    // for (let octave of octaves) {
    //   for (let note of notes) {
    //     // Create a new oscillator for each note
    //     const osc = new Tone.OmniOscillator(oscillator.get());
    //     osc.set({frequency : Tone.Frequency(note + octave).toFrequency()});
    //     osc.connect(toRaw(props.output))
    //     // osc.start();
    //     // Add the oscillator to the Map, using the note as the key
    //     oscillators.set(note + octave, osc);
    //   }
    // }

    const baseTypeOptions = ([
      {
        value: "sine",
        slot: "sine",
        class:'checkmark',
      },
      {
        value: "square",
        class:'checkmark',
        slot: "square"

      },
      {
        value: "triangle",
        class:'checkmark',
        slot: "triangle"

      },
      {
        value: "sawtooth",
        class:'checkmark',
        slot: "sawtooth"
      },
    ]);
    const sourceTypeOptions = ( [
      // {
      //   label: "FAT",
      //   class:'checkmark',
      //   value: "fat",
      // },
      {
        label: "AM",
        class:'checkmark',
        value: "am",
      },
      {
        label: "FM",
        class:'checkmark',
        value: "fm",
      },
      // {
      //   label: "Pulse",
      //   class:'checkmark',
      //   value: "pulse",
      // },
      // {
      //   label: "PWM",
      //   class:'checkmark',
      //   value: "pwm",
      // },

    ]);

    // const lfo = reactive(new Tone.LFO({
    //   frequency: 4,
    //   type: "sine",
    //   min: 200,
    //   max: 1200
    // }));
    // const lfoOn = ref(false);
    console.log("ouput osc",props.output)
    // toRaw(lfo).connect(toRaw(oscillator).frequency).start();
    // toRaw(oscillator).toDestination().start();
    return {
      sourceTypeOptions,
      oscillator,
      // oscillators,
      baseTypeOptions,
      sourceType,
      // lfo,
      // lfoOn
    };
  },
  computed: {
    lightOnStyle(){
      return {
        background: `
          radial-gradient(circle, rgba(255, 255, 255, 0.2),rgba(0, 0, 0, 0.05)),
          linear-gradient(to right,rgba(0, 0, 0, 0.05) 0%, rgba(203, 203, 203, 0.2) 50%, rgba(0, 0, 0, 0.05) 100%),
          ${this.color} !important`,
        boxShadow: '0 0 8px 2px rgb(178, 149, 75), 0 0 0 2px var(--border_color)',
      };
    },
  },
  methods: {
    updateOscillator() {

      const source = this.sourceType === null ? "oscillator" : this.sourceType;
      toRaw(this.oscillator).sourceType = source;
      this.update(this.oscillator);
    },
    knobUpdate(newValue){
      console.log("knobUpdate",newValue)
      toRaw(this.oscillator).set({
        [newValue.id]: newValue.value
      })
      this.update(toRaw(this.oscillator));
    },

  },

    // async noteDown (note){
    //   console.log("oscillator noteDown",Tone.Frequency(note).toNote())
    //   this.oscillators.get(Tone.Frequency(note).toNote()).start();
    //   // this.oscillators.set(note._val, new Tone.OmniOscillator({
    //   //   baseType: this.oscillator.baseType,
    //   //   sourceType: this.oscillator.sourceType,
    //   //   modulationType: this.oscillator.modulationType,
    //   //   phase: this.oscillator.phase,
    //   //   partialCount: this.oscillator.partialCount,
    //   //   frequency: note
    //   // }).connect(this.output).start());
    // },
    //
    // async noteUp (note){
    //   const noteval = Tone.Frequency(note).toNote();
    //   if(!this.oscillators.has(noteval))return
    //   this.oscillators.get(noteval).stop();
    //   // this.oscillators.delete(note._val);
    // },
    // lfoUpdate(newValue){
    //   console.log("lfoUpdate",newValue)
    //   this.lfo.set({
    //     [newValue.id]: newValue.value
    //   })
    // },
    // toggleLFO(){
    //   this.lfoOn = !this.lfoOn;
    //   if(this.lfoOn){
    //     this.lfo.start();
    //   }else{
    //     this.lfo.stop();
    //   }
    // }


}

</script>
<style lang="scss" scoped>

.actions {
  padding: 0
}

//.voice-container{
//  display: flex;
//  flex-direction: row;
//  justify-content: space-around;
//  align-items: start;
//  height: 100%;
//  width: 100%;
//  padding-left: 10%;
//
//}

.col-voice-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //height: 90%;
  //width: 30%;

}

.modulation{
  display: flex;
  //flex-direction: row;
  justify-content: start;
  align-items: center;
  border: 2px solid var(--border-color_1);
  border-radius: 5px;
  font-size: x-small;
  //height: 90%;
  //width: 60%;
}
.carrier{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--border-color_1);
  border-radius: 5px;
  font-size: x-small;

  //height: 100%;
  //width: 50%;
}
.col-voice-container-type{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //height: 100%;
  //width: 50%;
}

.col-voice-container-fm{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //height: 100%;
  //width: 50%;
}


.btn-container{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  //height: 80%;
  //width: 80%;
}
.btn-container-hor{
  display: flex;
  flex-direction: row;
  //height: 80%;
  //width: 80%;
}
.carrier{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.light_on{
  background:
      radial-gradient(circle, rgba(255, 255, 255, 0.2),rgba(0, 0, 0, 0.05)),
      linear-gradient(to right,rgba(0, 0, 0, 0.05) 0%, rgba(203, 203, 203, 0.2) 50%, rgba(0, 0, 0, 0.05) 100%),
          '$'+v-bind(color) !important;
  box-shadow: 0 0 8px 2px rgb(178, 149, 75), 0 0 0 2px var(--border_color);
}

.option-grid{
  display: flex;
  flex-direction: column;
  //grid-template-columns: repeat(1, 1fr);
  //grid-template-rows: repeat(1, 1fr);
  //align-content: center;
  justify-content: center;
  //align-items: center;
}

</style>
