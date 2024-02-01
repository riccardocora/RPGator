<template>
    <q-card-actions class="justify-between q-pa-none actions ">
<!--      <q-btn-toggle v-model="voiceType"
                    :toggle-color="color"
                    color="blue-grey-8"
                    dense
                    outline
                    no-caps
                    size="sm"
                    :options="[
                      {label: 'synth', value: 'synth'},
                      {label: 'sampler', value: 'sampler'},
                    ]"
                    @update:model-value="setVoiceType"
                  />-->
      <div>

      </div>
    </q-card-actions>
  <q-card-section horizontal >
    <q-card-section class="q-px-xs">
      <div class="background_metal full-height rounded-borders">
        <q-btn-toggle
          v-model="voiceType"
          :toggle-color="color"
          color="black"
          dense
          outline
          push
          class="q-pa-xs flip "
          size="sm"
          :options="[
            {label: 'synth', value: 'synth'},
            {label: 'sampler', value: 'sampler'},
          ]"
          @update:model-value="setVoiceType"
        />
        <q-badge outline :color="color" label="chain"/>
        <q-btn round
               size="xs"
               class="q-ma-sm"
               :outline="!chained"
               color="accent"
               :style="[chained ? 'background: accent' : 'color: accent]']"
               :class="chained? 'shadow-10': ''"
               @click="toggleChain"
        >
        </q-btn>
        <div class="voiceContainer transparent">
          <synth-comp v-if="voiceType==='synth'" :id="id" :color="color"></synth-comp>
          <sampler-comp :id="id" v-else></sampler-comp>
        </div>
      </div>

    </q-card-section>

    <q-card-section class="q-px-xs">
      <envelope-container :id="id" :color="color"></envelope-container>
    </q-card-section>
    <q-card-section class="q-px-xs">
      <filter-comp :id="id" color="primary">
      </filter-comp>
    </q-card-section>
    <q-card-section class="q-px-xs">
      <voice-controls :id="id" ></voice-controls>
    </q-card-section>
  </q-card-section>


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
import ToggleSwitch from "../controls/ToggleSwitch.vue";

import VoiceControls from "../voices/sliders/voiceControls.vue";

export default {
  name: "voiceModule",
  props: ['id', 'color'],
  components: {VoiceControls, FilterComp, Knob, EnvelopeContainer, EnvelopeComp, Slider, SamplerComp, SynthComp},

  setup(props){


    const octave =  ref(AudioContextHandler.voices.getVoice(props.id).octave);
    console.log("AudioContextHandler.voices.getVoice(props.id).gain",AudioContextHandler.voices.getVoice(props.id).gain)
    const volume = ref(AudioContextHandler.voices.getVoice(props.id).gain.gain.value);
    const voiceType = ref(AudioContextHandler.voices.getVoiceType(props.id));
    const chained = ref(AudioContextHandler.voices.getVoice(props.id).chained);
    const pan = ref(AudioContextHandler.voices.getVoice(props.id).pan.pan.value);

    const updatePan = (newPan) => {
      console.log("updatePan", newPan);
      AudioContextHandler.voices.setVoicePan(props.id,newPan);
    }

    const updateOctave = (newOctave) => {
      console.log("updateOctave", newOctave);
      AudioContextHandler.voices.setVoiceOctave(props.id,newOctave);
    }

    const updateVolume = (newVolume) => {
      console.log("updateVolume", newVolume);
      AudioContextHandler.voices.setVoiceVolume(props.id,newVolume);
    }

    const setVoiceType = (newVoiceType) => {
      console.log("setVoiceType", newVoiceType);
      AudioContextHandler.voices.switchType(props.id);
    }

    const toggleChain = () => {
      console.log("toggleChain")
     AudioContextHandler.voices.toggleChain(props.id);
      chained.value =!chained.value;
    }

    const playVoice= () => {
      console.log("playVoice")
      AudioContextHandler.voices.playVoice(props.id);
    };

    const stopVoice= () => {
      console.log("stopVoice")
      AudioContextHandler.voices.stopVoice(props.id);
    };


    return{
      octave,
      volume,
      voiceType,
      chained,
      updateOctave,
      updateVolume,
      setVoiceType,
      toggleChain,
      playVoice,
      stopVoice,
      pan,
      updatePan,
    }
  },

}

</script>

<style lang="scss" scoped>
.slide {
  padding-left: 0
}

.slider {
  width: 100%;
}
.pan-container {
  width: 100%;
}

.q-slider-thumb--h{
  background-image: url("assets/images/knob.png");
  border-radius: 10px;
}

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


.q-carousel--navigation-left.q-carousel--with-padding .q-carousel__slide, .q-carousel--navigation-left .q-carousel--padding, .q-carousel--arrows-horizontal.q-carousel--with-padding .q-carousel__slide, .q-carousel--arrows-horizontal .q-carousel--padding{
  padding-left: 0
}

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
.actions{
  //background-image: url("assets/images/metal.png");
  border-radius: 10px;
}

.voiceContainer{
  //background-image: url("assets/images/metal.png");
  border-radius: 0.5em;
}

</style>
