

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
            @update:model-value="updateControls"
        />

      <q-slider
          v-model="volume"
          :min="-48"
          :max="0"
          :step="1"
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
          @update:model-value="updateControls"
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
          @update:model-value="updateControls"
      />
    </div>
  </div>

</template>
<script>
import {reactive, ref} from "vue";
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
    update :{
      type: Function,
      required: true
    }
  },
  setup(props) {
    const octave = ref(0);
    const volume = ref(0);
    const pan = ref(0);

    const updateControls = ()=>{
      props.update(props.id, volume.value,octave.value,pan.value)
    }
    return {
      pan,
      volume,
      octave,
      updateControls
    }
  }
};

</script>
<style scoped>
.vertical-sliders{
  display: flex;
  flex-direction: row;
  height: 80%;
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

}
</style>
