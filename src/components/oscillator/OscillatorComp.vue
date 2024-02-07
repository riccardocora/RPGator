
<template>
    <div class="voice-container">
      <div class="col-voice-container">
        <q-btn-toggle
            v-model="oscillator.baseType"
            toggle-color="primary"
            class="btn-container"
            size="xs"
            unelevated
            :ripple="false"
            :options="baseTypeOptions"
            @update:model-value="update">
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

      <div class="modulation">
        <div class="col-voice-container-type">
          <q-btn-toggle
              v-model="oscillator.sourceType"
              toggle-color="primary"
              size="xs"
              unelevated
              class="btn-container-type"
              clearable
              :options="sourceTypeOptions"
              @update:model-value="update"
              @clear="update"/>
        </div>
        <div class="col-voice-container-fm" >
          <q-btn-toggle
              v-model="oscillator.modulationType"
              toggle-color="primary"
              size="xs"
              unelevated
              class="btn-container-fm"
              clearable
              :options="baseTypeOptions"
              @update:model-value="update"
              @clear="update">
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
import {computed, reactive, ref} from "vue";
import AudioContextHandler from "../AudioContextHandler.js";
import OscillatorCurve from "../oscillator/OscillatorCurve.vue";
import Knob from "../controls/Knob.vue";

export default {
  name: "OscillatorComp",
  components: {Knob, OscillatorCurve},
  props: ['id','color'],

  setup(props){
    const oscillator = reactive({
      baseType: "sine",
      sourceType: "oscillator",
      modulationType: "sine",
    })
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
    const sourceTypeOptions = ([
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
    ]);



    const update = () => {


      AudioContextHandler.voices.setOscillator(props.id,oscillator)
    };


    return {
      sourceTypeOptions,
      oscillator,
      baseTypeOptions,
      update
    };
  }



// const initializeAudio = () => {
//   oscillator.connect(envelope)
//   envelope.connect(outputGain);
//   outputGain.connect(analyser);
//   analyser.toDestination()
// }
}

</script>
<style lang="scss" scoped>

.actions {
  padding: 0
}

//.switch {
//  display: block;
//  position: relative;
//  cursor: pointer;
//  -webkit-user-select: none;
//  -moz-user-select: none;
//  -ms-user-select: none;
//  user-select: none;
//}
//
//.custom-radio {
//  /* Add your custom styles for the radio buttons */
//  /* Example styles: */
//  width: 20px;
//  height: 20px;
//  //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Add box-shadow for a shadow effect */
//  border-radius: 50%; /* Make it a circle */
//}
//.checkmark{
//  border-color: #21BA45;
//
//}
//
//.custom-label {
//  /* Add your custom styles for the labels */
//  /* Example styles: */
//  display: inline-block;
//  cursor: pointer;
//}
//.container {
//  min-height: 100vh;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  font-family: 'Poppins', sans-serif;
//  background: var(--greyLight-1);
//}
//
//.components {
//  width: 75rem;
//  height: 40rem;
//  border-radius: 3rem;
//  box-shadow:.8rem .8rem 1.4rem var(--greyLight-2),
//  -.2rem -.2rem 1.8rem var(--white);
//  padding: 4rem;
//  display: grid;
//  grid-template-columns: 17.6rem 19rem 20.4rem;
//  grid-column-gap: 5rem;
//  grid-row-gap: 2.5rem;
//  align-items: center;
//}

//.btngroup {
//  /* Other styles */
//  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
//  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
//}

//.btngroup:hover {
//  /* Other styles */
//  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
//}

//.btngroup:active {
//  /* Other styles */
//  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15), 0 3px 3px rgba(0, 0, 0, 0.12);
//}



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
  height: 90%;
  width: 30%;

}

.modulation{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  height: 90%;
  width: 60%;

}
.col-voice-container-type{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
}

.col-voice-container-fm{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 50%;
}


.btn-container{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  height: 80%;
  width: 80%;
}

.btn-container-type{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 60%;
  width: 70%;
}

.btn-container-fm{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  height: 60%;
  width: 50%;
}



</style>
