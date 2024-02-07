

<template>
  <div class="voice-controls">
    <div class="vertical-sliders">
      <div class="octave">
        <q-slider
            v-model="octave"
            :min="-2"
            :max="2"
            :step="1"
            thumb-path=""
            markers
            vertical
            reverse
            label
            marker-labels
            switch-marker-labels-side
            class="control-slider marker-label "

            @update:model-value="updateOctave"
        />
        <div class="oct-label">
          <span>O</span>
          <span>C</span>
          <span>T</span>
          <span>A</span>
          <span>V</span>
          <span>E</span>
        </div>
      </div>

      <div class="gain">
        <q-slider
          v-model="volume"
          :min="0"
          :max="1"
          :step="0.01"
          thumb-path=""
          vertical
          label
          reverse
          class="control-slider "
          @change="updateVolume"
        />
        <div class="gain-label">
          <span>G</span>
          <span>A</span>
          <span>I</span>
          <span>N</span>
        </div>
      </div>


    </div>

    <div class="horizontal-slider-container">
      <div style="padding-right: 5px">L</div>
      <q-slider
          v-model="pan"
          :min="-1"
          :max="1"
          :step="0.01"
          thumb-path=""
          label
          class="horizontal-slider"
          @update:model-value="updatePan"
      />
      <div style="padding-left: 5px">R</div>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  color: #b2b2b2;

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

.marker-label{
  color: #b2b2b2;
  font-size: 8px;
}

.oct-label{
  color: #b2b2b2;
  font-size: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 40%;
  text-align: left;
}

.octave{
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 50%;
  justify-content: center;
  align-items: center;
}

.gain{
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
}


.gain-label{
  color: #b2b2b2;
  font-size: 8px;
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
  width: 20%;
}

</style>


