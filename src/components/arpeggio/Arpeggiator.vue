
<template>
  <div class="arp-control">

    <div class="select-controls">

      <div class="select-container">
        Style
        <select class="selector" v-model="type" @change="updatePattern">
          <option class="option" v-for="type in types" :value="type">{{ type }}</option>
        </select>
      </div>

      <div class="select-container">
        Length
        <select class="selector" v-model="length" @change="updatePattern">
          <option class="option" v-for="length in lengths" :value="length">{{ length }}</option>
        </select>
      </div>

      <div class="select-container">
        Interval
        <select class="selector" v-model="interval" @change="updatePattern">
          <option class="option" v-for="length in lengths" :value="length">{{ length }}</option>
        </select>
      </div>

    </div>

    <div class="ranges-control">

      <div class="range-container">
        range
        <div class="range-control">
          <button class="range-button" @click="decreaseRange" >-</button>
          <div class="range-value" v-text="range"></div>
        <button class="range-button" @click="increaseRange">+</button>
       </div>
      </div>

      <div class="range-container">
        octave
        <div class="range-control">
          <button class="range-button" @click="decreaseOctave">-</button>
          <div class="range-value" v-text="octave"></div>
          <button class="range-button" @click="increaseOctave">+</button>
        </div>
      </div>

      <div class="range-container">
        bpm
        <div class="range-control">
          <button class="range-button" @click="bpm > 40 ? bpm-- : bpm" @mousedown="startDecreasingBpm" @mouseup="stopChangingBpm">-</button>
          <div class="range-value" v-text="bpm"></div>
          <button class="range-button" @click="bpm < 200 ? bpm++ : bpm" @mousedown="startIncreasingBpm" @mouseup="stopChangingBpm">+</button>
        </div>
      </div>

    </div>


    <div class="buttons">
      <q-checkbox v-model="playing" @update:model-value="togglePlay" checked-icon="radio_button_checked"
                  unchecked-icon="radio_button_unchecked" color="yellow">
        <template v-slot:default>
          <q-badge outline  label="play" :color="playing?'yellow':'primary'" />
        </template>
      </q-checkbox>
      <button class="checkmark reset"  @click="reset">Reset</button> <!-- Add this line -->

    </div>
  </div>

  <div class="keyboard-container">
    <Keyboard ref="keyboard" :octave="octave" @note-selected="handleNoteSelected"></Keyboard>
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
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  data(){
    const playing = ref(false);
    const type = ref("up");
    const bpm = ref(Math.trunc(Tone.Transport.bpm.value));
    const octave = ref(4);
    const length = ref("4n");
    const interval = ref("4n");
    const range = ref(1);
    const group = reactive([])
    const n_selected = ref(0);
    let pattern = reactive(new Tone.Pattern(function (time, note) {
      AudioContextHandler.voices.playActiveVoices(note, length.value)
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
      bpmChangeInterval: null,
      interval,
      range,
      types: ["up" , "down" , "upDown" , "downUp" , "alternateUp" , "alternateDown",  "random" , "randomOnce" , "randomWalk"],
      lengths:["1n","2n","4n","8n","16n","32n"],
      n_selected
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
      for (let i = event.octave; i < event.octave + this.range; i++) {
        const octave = this.octave + i;
        if(event.selected){
          groupSet.add(event.note + octave);
          this.n_selected++
        }else{
          groupSet.delete(event.note + octave);
          this.n_selected--
        }
      }
      // Convert the group set back to an array
      this.group = Array.from(groupSet);

      // Sort the group array by ascending pitch

      console.log("group", this.group)
      this.updatePattern()
    },

    updatePattern() {
      console.log("updatePattern")
      console.log("this.group", this.group)
      const tempGroup = this.group;
      tempGroup.sort((noteA, noteB) => {
        // Convert the notes to frequencies
        let freqA = Tone.Frequency(noteA).toFrequency();
        let freqB = Tone.Frequency(noteB).toFrequency();

        // Compare the frequencies
        return freqA - freqB;
      });
      console.log("this.group 2", this.group)

      this.pattern.set({
        values: tempGroup,
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
    },
    increaseRange() {
      if (this.range < 7 && this.octave + this.range < 8) { // Maximum range value
        this.range++;
        // Add the same notes at higher octaves
        let groupSet = new Set(this.group);
        for (let note of this.group) {
          let [noteValue, octave] = note.split(/(\d+)/);
          octave = parseInt(octave) + 1;
          groupSet.add(noteValue + octave);
        }
        this.group = Array.from(groupSet);
        this.updatePattern();
      }
    },
    decreaseRange() {
      if (this.range > 1) { // Minimum range value
        this.range--;
        this.group = this.group.slice(0,this.range * this.n_selected)
        this.updatePattern();
      }
    },
    // ...
    increaseOctave() {
      if (this.octave < 7 && this.octave + this.range <= 8) { // Maximum octave value
        this.octave++;
        console.log("this.group before increase", this.group)
        this.group = this.group.map(note => Tone.Frequency(note).transpose(12).toNote());
        console.log("this.group after increase", this.group)

        if (this.range > 1 && this.octave + this.range > 8) { // Decrease range if octave cannot be increased
          this.range = 1;
          this.group = this.group.slice(0,this.range * this.n_selected)
        }
        this.updatePattern();
      }
    },
    decreaseOctave() {
      if (this.octave > 1) { // Minimum octave value
        this.octave--;
        console.log("this.group before decrease", this.group)
        this.group = this.group.map(note => Tone.Frequency(note).transpose(-12).toNote());
        console.log("this.group after decrease", this.group)
        this.updatePattern();
      }
    },
    startIncreasingBpm() {
      this.stopChangingBpm();
      this.bpmChangeInterval = setInterval(() => {
        if (this.bpm < 200) { // Maximum BPM value
          this.bpm++;
          this.updateBpm();
        }
      }, 25); // Change the BPM value every 100 milliseconds
    },

    startDecreasingBpm() {
      this.stopChangingBpm();
      this.bpmChangeInterval = setInterval(() => {
        if (this.bpm > 40) { // Minimum BPM value
          this.bpm--;
          this.updateBpm();
        }
      }, 25); // Change the BPM value every 100 milliseconds
    },
    stopChangingBpm() {
      if (this.bpmChangeInterval) {
        clearInterval(this.bpmChangeInterval);
        this.bpmChangeInterval = null;
      }
    },
    reset() {
      this.group = []; // Clear the group array
      this.$refs.keyboard.resetSelectedNotes();
      this.updatePattern()
    },
    handleKeyDown(event) {
      switch (event.key) {
        case 'z':
          this.decreaseOctave();
          break;
        case 'x':
          this.increaseOctave();
          break;
        default:
          break;
      }
    },


  },
}
</script>

<style scoped lang="scss">

.arp-control{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: right;
    height: 95%;
  width: 20%;
/*  background-color: $r2d-inner;
  border: 0.5px solid rgba(255, 255, 255, 0.37);
  padding: 1%;*/
}

.select-controls{
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  align-items: center;

}
.ranges-control{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50%;
  //border: 1px solid #000;
}

/*.slider-controls{
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}*/

.buttons{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 10%;
  //border: 1px solid #000;

}
.arp-slider{
  width: 100%;
}

.keyboard-container{
  width: 100%;
  height: 108%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1.5% 0 1.5%;
}

.range-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  //border: 1px solid #000;
}

.range-control {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  padding: 2%;
  justify-content: space-between;
  //border: 1px solid #000;
}


.range-button {
  text-align: center;
  text-transform: uppercase;
  font-family: 'Courier Prime', monospace;
  border-radius: 6%;
  box-shadow: inset 0 0 8px 5px var(--shadow-color),
  inset 0 0 8px 5px var(--shadow-color), /* inner shadow */
  0 0 0 2px var(--border-color); /* inner shadow */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
      var(--btn-color);
  color: var(--text-color-on);
  appearance: none; /* Remove default appearance */
}

.range-value {
  display: flex;
  flex-direction: row;
  text-align: center;
  font-family: 'Courier Prime', monospace;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: inset 0 0 8px 5px var(--shadow-color),
  inset 0 0 8px 5px var(--shadow-color), /* inner shadow */
  0 0 0 2px var(--border-color); /* inner shadow */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
      var(--btn-color);
  color: var(--text-color-on);
  appearance: none; /* Remove default appearance */
}
//
//.selector {
//  text-align-last: center;
//  text-align: center;
//  text-transform: uppercase;
//  font-family: 'Courier Prime', monospace;
//  display: flex;
//  flex-direction: row;
//  height: 100%;
//  width: 100%;
//  //border-radius: 2%;
//  //margin: 3%;
//  /* your existing styles */
//
//  /* Add multiple inset box shadows to create an inner "screen" effect */
//  box-shadow: inset 0 0 8px 5px var(--shadow-color),
//  inset 0 0 8px 5px var(--shadow-color), /* inner shadow */
//  0 0 0 2px var(--border-color); /* inner shadow */
//
//  /* Add a radial gradient to simulate inner light */
//  background:
//      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
//      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
//      var(--btn-color);
//  justify-content: flex-end;
//  align-items: center;
//  color: var(--text-color-on);
//  position: relative;
//
//  /* border: solid 4px rgba(44, 44, 44, 0.794); */
//
//  appearance: none; /* Remove default appearance */
//  -webkit-appearance: none; /* Remove default appearance for Chrome */
//  -moz-appearance: none; /* Remove default appearance for Firefox */
//}



//.selector:hover {
//  /* Add your hover styles here */
//  background:
//      radial-gradient(ellipse at center, rgba(255, 255, 255, 0.344), rgba(0, 0, 0, 0.404)),
//      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
//      var(--btn-color);
//
//}



.select-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

}



.selector {
  text-align-last: center;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Courier Prime', monospace;
  display: flex;
  height: 90%;
  min-width: 50%;
  width: 50%;
  border-radius: 6%;
  border: #030303 1px solid;


  /* your existing styles */

  /* Add multiple inset box shadows to create an inner "screen" effect */
  box-shadow: inset 0 0 8px 1px var(--select-shadow-color),
  inset 0 0 15px 1px var(--select-shadow-color), /* inner shadow */
  0 0 0 2px inset var(--select-border-color); /* inner shadow */

  /* Add a radial gradient to simulate inner light */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
      var(--select-color);
  justify-content: flex-end;
  align-items: center;
  color: var(--select--text-color-on);
  padding-right: 0;
  position: relative;

  /* border: solid 4px rgba(44, 44, 44, 0.794); */

  appearance: none; /* Remove default appearance */
  -webkit-appearance: none; /* Remove default appearance for Chrome */
  -moz-appearance: none; /* Remove default appearance for Firefox */
}



.selector:hover {
  /* Add your hover styles here */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0.344), rgba(0, 0, 0, 0.404)),
      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
      var(--select-color);

}


</style>

