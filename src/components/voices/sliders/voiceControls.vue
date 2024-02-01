

<template>
  <div class="background_metal rounded-borders full-height">
    <div class="row">
      <div class="col q-pl-lg q-pt-lg q-pr-md">
        <div>
          <q-badge outline :color="color" label="oct." class="q-pa-xs"/>
        </div>
        <q-slider
          v-model="octave"
          :min="-2"
          :max="2"
          :step="1"
          markers
          vertical
          reverse
          :color="color"
          :thumb-color="color"
          label-color="black"
          :label-text-color="color"
          marker-labels
          :marker-labels-class="'text-'+color"
          selection-color="transparent"
          class="q-py-md"
          @update:model-value="updateOctave"
        />

      </div>
      <div class="col q-pr-lg q-pt-lg q-pl-md">
        <div>
          <q-badge outline :color="color" label="volume" class="q-pa-xs"/>
        </div>
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
          class="q-py-md"
          @change="updateVolume"
        />

      </div>
    </div>
    <div class="row inline full-width q-px-md">
      <div>
        <q-badge outline :color="color" label="pan" class=""/>
      </div>
      <div class="col">
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
          class="q-px-sm"
          @update:model-value="updatePan"
        />
      </div>

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
      console.log("updatePan", newPan);
      AudioContextHandler.voices.setVoicePan(props.id, newPan);
    }

    const updateOctave = (newOctave) => {
      console.log("updateOctave", newOctave);
      AudioContextHandler.voices.setVoiceOctave(props.id, newOctave);
    }

    const updateVolume = (newVolume) => {
      console.log("updateVolume", newVolume);
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

</style>
