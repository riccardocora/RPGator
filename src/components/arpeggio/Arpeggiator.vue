
<template>
  <div class="arp-control">
    <div class="select-controls">
      <q-select dense outlined dark class="select" v-model="type" :options="types" @update:model-value="updatePattern"/>
      <q-select dense outlined dark class="select" v-model="length" :options="lengths" @update:model-value="updatePattern"/>
      <q-select dense outlined  dark class="select" v-model="interval" :options="lengths"  @update:model-value="updatePattern"/>
    </div>
    <div class="slider-controls">
      <q-slider
          class="arp-slider"
          v-model="octave"
          :min="1"
          :max="8"
          :step="1"
          label
          @update:model-value="updatePattern"
      >
      </q-slider>
      <q-slider
          class="arp-slider"
          v-model="bpm"
          :min="40"
          :max="200"
          :step="1"
          label
          @update:model-value="updateBpm"
      >
      </q-slider>
    </div>
    <div class="buttons">
      <q-checkbox v-model="playing" @update:model-value="togglePlay" checked-icon="radio_button_checked"
                  unchecked-icon="radio_button_unchecked" color="yellow">
        <template v-slot:default>
          <q-badge outline  label="play" :color="playing?'yellow':'primary'" />
        </template>
      </q-checkbox>
    </div>
  </div>
  <div class="keyboard-container">
    <Keyboard></Keyboard>
  </div>

</template>

<script>
import { ref } from 'vue'
import AudioContextHandler from "@/components/AudioContextHandler.js";
import * as Tone from "tone";
import Keyboard from "../Octave.vue";

export default {
  name:'Arpeggiator',
  components: {Keyboard},
  setup () {
    const group = ref(['E', 'G', 'A', 'B']);
    const playing = ref(false);
    const type = ref("up");
    const bpm = ref(Tone.Transport.bpm.value);
    const octave = ref(4);
    const length = ref("4n");
    const interval = ref("4n");
    let pattern = new Tone.Pattern(function (time, note) {
      AudioContextHandler.voices.playActiveVoices(note, octave.value, length.value)
    }, group.value, type.value);
    pattern.loop = true;
    pattern.interval = interval.value


    const updatePattern = () => {

      pattern.set({
        values: group.value,
        pattern: type.value,
        callback: function (time, note) {
          AudioContextHandler.voices.playActiveVoices(note, octave.value, length.value)
        },
        interval: interval.value
      })

    }
    const togglePlay = (playing) => {
      if (playing){
        Tone.Transport.start();
        pattern.start("0.05")
      } else {
        pattern.stop(0)
      }

    }

    const updateBpm = () => {
      Tone.Transport.bpm.value = bpm.value;
    }
    return {
      updateBpm,
      togglePlay,
      updatePattern,
      group,
      playing,
      bpm,
      notes: [
        {
          label: 'C',
          value: 'C'
        },
        {
          label: 'C#',
          value: 'C#'
        },
        {
          label: 'D',
          value: 'D'
        },
        {
          label: 'D#',
          value: 'D#'
        },
        {
          label: 'E',
          value: 'E'
        },
        {
          label: 'F',
          value: 'F'
        },
        {
          label: 'F#',
          value: 'F#'
        },
        {
          label: 'G',
          value: 'G'
        },
        {
          label: 'G#',
          value: 'G#'
        },
        {
          label: 'A',
          value: 'A'
        },
        {
          label: 'A#',
          value: 'A#'
        },
        {
          label: 'B',
          value: 'B'
        },
      ],
      types: ["up" , "down" , "upDown" , "downUp" , "alternateUp" , "alternateDown",  "random" , "randomOnce" , "randomWalk"],
      type,
      lengths:["1n","2n","4n","8n","16n","32n"],
      length,
      octave,
      interval
    }
  }
}
</script>

<style scoped lang="scss">

.arp-control{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 20%;
}

.select-controls{
  display: flex;
  flex-direction: column;
  height: 55%;
  width: 100%;
  align-items: center;
}
.select{
  width:80%;
  padding: 3%;
}
.slider-controls{
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.buttons{

}
.arp-slider{
  width: 80%;
}

.keyboard-container{
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

