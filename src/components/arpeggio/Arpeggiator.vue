
<template>
  <div class="arp-control">
    <div class="select-controls">
      <q-select dense outlined dark class="select " v-model="type" :options="types" @update:model-value="updatePattern"/>
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
    <Keyboard :octave="octave" @note-selected="handleNoteSelected"></Keyboard>
  </div>

</template>

<script>
import {reactive, ref} from 'vue'
import AudioContextHandler from "@/components/AudioContextHandler.js";
import * as Tone from "tone";
import Keyboard from "../Octave.vue";

export default {
  name:'Arpeggiator',
  components: {Keyboard},
  data(){
    const playing = ref(false);
    const type = ref("up");
    const bpm = ref(Tone.Transport.bpm.value);
    const octave = ref(4);
    const length = ref("4n");
    const interval = ref("4n");
    const range = ref(1)
    const group = reactive([])
    let pattern = reactive(new Tone.Pattern(function (time, note) {
      AudioContextHandler.voices.playActiveVoices(note, octave.value, length.value)
    }, this.group,this.type));
    pattern.loop = true;
    pattern.interval = interval.value
    return {
      group,
      pattern,
      playing,
      type,
      bpm,
      octave,
      length,
      interval,
      range,
      types: ["up" , "down" , "upDown" , "downUp" , "alternateUp" , "alternateDown",  "random" , "randomOnce" , "randomWalk"],
      lengths:["1n","2n","4n","8n","16n","32n"],
    }
  },

  methods: {
    // ...
    handleNoteSelected(event) {
      // event.note, event.octave, and event.selected contain the emitted data
      console.log(" ciao",event.note, event.octave, event.selected);
      // You can now use the emitted data in your parent component
      let groupSet = new Set(this.group);
      // Add the note from the event and the same notes in octaves above to the group set
      for (let i = event.octave; i <= event.octave + this.range; i++) {
        if(event.selected){
          groupSet.add(event.note + i);
        }else{
          groupSet.delete(event.note + i);
        }
      }

      // Convert the group set back to an array
      this.group = Array.from(groupSet);

      // Sort the group array by ascending pitch
      this.group.sort((noteA, noteB) => {
        // Convert the notes to frequencies
        let freqA = Tone.Frequency(noteA).toFrequency();
        let freqB = Tone.Frequency(noteB).toFrequency();

        // Compare the frequencies
        return freqA - freqB;
      });

      console.log("group", this.group)
      this.updatePattern()
    },

    updatePattern() {
      console.log("updatePattern")
      console.log("this.group", this.group)

      this.pattern.set({
        values: this.group,
        pattern: this.type,
        callback: (time, note) => {
          AudioContextHandler.voices.playActiveVoices(note, this.length)
        },
        interval: this.interval
      })
    },

    togglePlay(playing){
      if (playing){
        Tone.Transport.start();
        this.pattern.start("0.05")
      } else {
        this.pattern.stop(0)
      }
    },

    updateBpm() {
      Tone.Transport.bpm.value = this.bpm;
    }
  },
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

