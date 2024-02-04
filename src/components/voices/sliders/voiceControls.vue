

<template>
  <div class="voice-controls">
    <div class="vertical-sliders">
        <q-slider
            v-model="octave"
            :min="-2"
            :max="2"
            :step="1"
            markers
            vertical
            reverse
            class="control-slider"
            switch-marker-labels-side
            :color="color"
            :thumb-color="color"
            label-color="black"
            :label-text-color="color"
            marker-labels
            :marker-labels-class="'text-'+color"
            selection-color="transparent"
            @update:model-value="updateOctave"
        />

      <q-slider
          v-model="volume"
          :min="0"
          :max="1"
          :step="0.01"
          :markers="1"
          label
          vertical
          reverse
          :color="color"
          :thumb-color="color"
          label-color="black"
          :label-text-color="color"
          :marker-labels-class="'text-'+color"
          selection-color="transparent"
          class="control-slider"
          @change="updateVolume"
      />
    </div>

    <div class="horizontal-slider">
      <q-slider
          v-model="pan"
          :min="-1"
          :max="1"
          :step="0.01"
          :color="color"
          :thumb-color="color"
          label-color="black"
          :label-text-color="color"
          :marker-labels-class="'text-'+color"
          class="control-slider"
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
  background-color: #40c4ff;
  justify-content: space-around;
  align-items: center;
}
.horizontal-slider{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
}

.control-slider{
  max-height: 80%;
  max-width: 80%;

}
.voice-controls{
  height: 100%;
  width: 100%;
  background-color: #ff6d00;
}
</style>
