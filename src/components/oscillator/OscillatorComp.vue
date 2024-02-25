
<template>
    <div class="row full-height q-py-sm q-pb-lg">
      <div class="col-4">
        <q-btn-toggle
            v-model="oscillator.baseType"
            :toggle-color="color"
            class="btn-container"
            size="sm"
            unelevated
            :ripple="false"
            :options="baseTypeOptions"
            @update:model-value="updateOscillator"
            >
          <template v-slot:sine>
            <div class="">
              <q-icon name="mdi-sine-wave" />
            </div>
          </template>

          <template v-slot:square>
            <div class="">
              <q-icon name="mdi-square-wave" />
            </div>
          </template>

          <template v-slot:triangle>
            <div class="">
              <q-icon name="mdi-triangle-wave" />
            </div>
          </template>

          <template v-slot:sawtooth>
            <div class="">
              <q-icon name="mdi-sawtooth-wave" />
            </div>
          </template>
        </q-btn-toggle>
      </div>

      <div class="col-8 modulation q-px-sm ">
        <div class="q-px-md col">
          <q-btn-toggle
              v-model="sourceType"
              size="sm"
              unelevated
              class="btn-container"
              clearable
              dense
              stretch
              spread
              :options="sourceTypeOptions"
              @update:model-value="updateOscillator"
              @clear="updateOscillator"
          />
        </div>

        <div class="q-px-md col full-height">
          <q-btn-toggle
              v-model="oscillator.modulationType"
              :toggle-color="color"
              size="sm"
              unelevated
              stretch
              class="btn-container"
              clearable
              :options="baseTypeOptions"
              @update:model-value="updateOscillator"

          >
            <template v-slot:sine>
              <div class="">
                <q-icon name="mdi-sine-wave" />
              </div>
            </template>

            <template v-slot:square>
              <div class="">

                <q-icon name="mdi-square-wave" />
              </div>
            </template>

            <template v-slot:triangle>
              <div class="">
                <q-icon name="mdi-triangle-wave" />
              </div>
            </template>

            <template v-slot:sawtooth>
              <div class="">
                <q-icon name="mdi-sawtooth-wave" />
              </div>
            </template>
          </q-btn-toggle>

        </div>

        </div>
      </div>


</template>

<script>
import {reactive, ref, toRaw} from "vue";
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

  setup(){
    const sourceType = ref("oscillator");
    const baseType = ref("sine");
    const modulationType = ref("sine");
    const oscillator = reactive(new Tone.OmniOscillator({
      baseType: baseType.value,
      sourceType: sourceType.value,
      modulationType: modulationType.value,
    }));

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
      {
        label: "FAT",
        class:'checkmark',
        value: "fat",
      },
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
      {
        label: "Pulse",
        class:'checkmark',
        value: "pulse",
      },
      {
        label: "PWM",
        class:'checkmark',
        value: "pwm",
      },

    ]);


    return {
      sourceTypeOptions,
      oscillator,
      baseTypeOptions,
      sourceType,
    };
  },
  methods: {
    async updateOscillator() {
      //console.log("updateOscillator", toRaw(oscillator));
      //console.log("sourceType.value", sourceType.value);
      toRaw(this.oscillator).set({sourceType : this.sourceType === "null" ? 'oscillator' : this.sourceType.value});
      await this.update(this.oscillator);
    }

  }

}

</script>
<style lang="scss" scoped>

.actions {
  padding: 0
}

.voice-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  height: 100%;
  width: 100%;
  padding-left: 10%;

}

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--border-color_1);
  border-radius: 5px;
  //height: 90%;
  //width: 60%;

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





</style>
