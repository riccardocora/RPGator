

<template>
  <div class="voice-controls">
    <div class="vertical-sliders">
        <q-slider
            v-model="octave"
            :min="-2"
            :max="2"
            :step="1"
            thumb-path=""
            vertical
            reverse
            class="control-slider "

            @update:model-value="updateOctave"
        />
      <q-slider
          v-model="volume"
          :min="0"
          :max="1"
          :step="0.01"
          thumb-path=""
          vertical
          reverse
          class="control-slider "
          @change="updateVolume"
      />
    </div>

    <div class="horizontal-slider-container">
      <q-slider
          v-model="pan"
          :min="-1"
          :max="1"
          :step="0.01"
          thumb-path=""
          class="horizontal-slider"
          @update:model-value="updatePan"
      />
    </div>
  </div>

</template>
<script>
import { ref } from "vue";
import AudioContextHandler from "@/components/AudioContextHandler.js";
export default {
  name: "VoiceControls",
  props: {
    id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "primary",
    },
  },
  setup(props) {
    const octave =  ref(AudioContextHandler.voices.getVoice(props.id).octave);
    const volume = ref(AudioContextHandler.voices.getVoice(props.id).gain.gain.value);
    const pan = ref(AudioContextHandler.voices.getVoice(props.id).pan.pan.value);

    const updatePan = (newPan) => {
      AudioContextHandler.voices.setVoicePan(props.id, newPan);
    }

    const updateOctave = (newOctave) => {
      AudioContextHandler.voices.setVoiceOctave(props.id, newOctave);
    }

    const updateVolume = (newVolume) => {
      AudioContextHandler.voices.setVoiceVolume(props.id, newVolume);
    }
    return {
      octave,
      volume,
      pan,
      updatePan,
      updateOctave,
      updateVolume,
    }
  }
};

</script>
<style scoped>
.vertical-sliders{
  display: flex;
  flex-direction: row;
  height: 80%;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.horizontal-slider-container{
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  height: 20%;
  width: 100%;
}

.horizontal-slider{
  max-height: 80%;
  max-width: 60%;
}


.control-slider{
  max-height: 80%;
  max-width: 80%;
}

.voice-controls{
  height: 100%;
  width: 100%;

}






</style>


