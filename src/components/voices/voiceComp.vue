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
          @update:model-value="setVoiceType"
      />
    </div>
    <div class="inner-voice">
      <synth-comp v-if="voiceType==='synth'" :id="id" :color="color"></synth-comp>
      <sampler-comp :id="id" v-else></sampler-comp>
    </div>

  </div>

  <div class="envelope-container">
    <div class="button-row-envelope">
      Envelope
    </div>
    <div class="envelope">
      <envelope-comp :id="id" env-type="amp" :color="color"></envelope-comp>
    </div>

  </div>

  <div class="filter-container ">

    <div class="filter">
        <filter-comp :id="id" :color="color">
        </filter-comp>
    </div>
  </div>

<!--      <div class="background_metal full-height rounded-borders">-->

<!--        <div class="voiceContainer transparent">-->
<!--          <synth-comp v-if="voiceType==='synth'" :id="id" :color="color"></synth-comp>-->
<!--          <sampler-comp :id="id" v-else></sampler-comp>-->
<!--        </div>-->
<!--      </div>-->


<!--      <filter-comp :id="id" color="primary">-->
<!--      </filter-comp>-->



    <!--      <q-card-section>-->
<!--        <div class="row">-->

<!--            <div>-->
<!--              <q-badge outline :color="color" label="pan" class="q-pa-xs"/>-->
<!--            </div>-->
<!--            <q-slider-->
<!--              v-model="pan"-->
<!--              :min="-1"-->
<!--              :max="1"-->
<!--              :step="0.01"-->
<!--              :color="color"-->
<!--              :thumb-color="color"-->
<!--              label-color="black"-->
<!--              :label-text-color="color"-->
<!--              :marker-labels-class="'text-'+color"-->
<!--              selection-color=""-->
<!--              class="q-px-sm"-->
<!--              @update:model-value="updatePan"-->
<!--            />-->
<!--        </div>-->
<!--      </q-card-section>-->


          <!--      <envelope-comp :id="id" env-type="amp" :color="color"></envelope-comp>-->
<!--    </q-card-section>-->
<!--    <q-card-section>-->

<!--      <q-slider-->
<!--        v-model="volume"-->
<!--        :min="0"-->
<!--        :max="1"-->
<!--        :step="0.01"-->
<!--        :markers="1"-->
<!--        label-->
<!--        vertical-->
<!--        :color="color"-->
<!--        :thumb-color="color"-->
<!--        label-color="black"-->
<!--        :label-text-color="color"-->
<!--        :marker-labels-class="'text-'+color"-->
<!--        selection-color="transparent"-->
<!--        class="slider"-->
<!--        @change="updateVolume"-->
<!--      />-->
<!--      <div>-->
<!--        <q-badge outline :color="color" label="gain" class="q-pa-xs"/>-->
<!--      </div>-->
<!--    </q-card-section>-->
<!--  </q-card-section>-->
<!--  <Slider></Slider>-->
<!--  <Knob></Knob>-->

</template>

<script>
import {ref} from "vue";
import SynthComp from "../synthetizer/Synth.vue";
import SamplerComp from "../sampler/Sampler.vue";
import AudioContextHandler from "../AudioContextHandler.js";
import Slider from "../controls/Slider.vue";
import EnvelopeComp from "../envelope/EnvelopeControl.vue";
import EnvelopeContainer from "../envelope/EnvelopeContainer.vue";
import Knob from "../controls/Knob.vue";
import FilterComp from "../filter/filterComp.vue";

import VoiceControls from "../voices/sliders/voiceControls.vue";

export default {
  name: "voiceModule",
  props: ['id', 'color'],
  components: {VoiceControls, FilterComp, Knob, EnvelopeContainer, EnvelopeComp, Slider, SamplerComp, SynthComp},

  setup(props){


    const octave =  ref(AudioContextHandler.voices.getVoice(props.id).octave);

    const volume = ref(AudioContextHandler.voices.getVoice(props.id).gain.gain.value);
    const voiceType = ref(AudioContextHandler.voices.getVoiceType(props.id));
    const chained = ref(AudioContextHandler.voices.getVoice(props.id).chained);
    const pan = ref(AudioContextHandler.voices.getVoice(props.id).pan.pan.value);

    const updatePan = (newPan) => {

      AudioContextHandler.voices.setVoicePan(props.id,newPan);
    }

    const updateOctave = (newOctave) => {

      AudioContextHandler.voices.setVoiceOctave(props.id,newOctave);
    }

    const updateVolume = (newVolume) => {

      AudioContextHandler.voices.setVoiceVolume(props.id,newVolume);
    }

    const setVoiceType = (newVoiceType) => {

      AudioContextHandler.voices.switchType(props.id);
    }

    const toggleChain = () => {

     AudioContextHandler.voices.toggleChain(props.id);
      chained.value =!chained.value;
    }


    return{
      octave,
      volume,
      voiceType,
      chained,
      updateOctave,
      updateVolume,
      setVoiceType,
      toggleChain,
      pan,
      updatePan,
    }
  },

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

  width: 30%;
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
