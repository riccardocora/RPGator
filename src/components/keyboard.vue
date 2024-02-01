<template>
  <div class="span" >
    <div class="container">
      <Octave
        ref="oct1"
        :octaveNumber="1"
        @virtualKeyDown="handleNoteDown"
        @virtualKeyUp="handleNoteUp"
      />
    </div>
    <div class="container">
      <Octave
        ref="oct2"
        :octaveNumber="2"
        @virtualKeyDown="handleNoteDown"
        @virtualKeyUp="handleNoteUp"
      />
    </div>
<!--    <div class="container">-->
<!--      <Octave-->
<!--        ref="oct3"-->
<!--        :octaveNumber="3"-->
<!--        @virtualKeyDown="handleNoteDown"-->
<!--        @virtualKeyUp="handleNoteUp"-->
<!--      />-->
<!--    </div>-->
<!--    <MIDIKeyboard @MIDIDown="handleMIDIDown" @MIDIUp="handleMIDIUp" />-->
  </div>
</template>

<script>
// import MIDIKeyboard from "./MIDIKeyboard.vue";
import Octave from "./Octave.vue";
import AudioKeys from "audiokeys";
import * as Tone from "tone";


export default {
  name: "PianoKeyboard",
  components: {
    Octave,
    // MIDIKeyboard,
  },
  data() {
    return {
      //From here we can transpose the whole keyboard by octaves
      ocTranspose: 1,
      // Object to track which keys are currently being held down
      keysDown: {},
      keys: "awsedftgyhujkolpòà",
      notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
      //Transposition amount (in octaves) for the computer keyboard
      keyboardTranspose: 0,
      mouseDown: false,
    };
  },
  setup(){
    const keyboard = new AudioKeys();
    function map(value, sourceMin, sourceMax, targetMin, targetMax) {
      // Scale the input value from the source range to the target range
      return (value - sourceMin) / (sourceMax - sourceMin) * (targetMax - targetMin) + targetMin;
    }
    keyboard.down(note => {
      const velToGain = map(note.velocity, 0, 127, 0, 1);
      console.log("note", note)
      const realNote = Tone.Frequency(note.note, "midi").toNote()
      console.log("realNote", realNote)
      // this.voices.forEach(voiceObj => {
      //   voiceObj.voice[voiceObj.voiceType].triggerAttack(note.frequency, Tone.now(), velToGain);
      // });
    })
    keyboard.up(note => {
      // this.voices.forEach(voiceObj => {
      //   voiceObj.voice[voiceObj.voiceType].triggerRelease(note.frequency, Tone.now())
      // })
    });
  },

  mounted() {

  },
  beforeDestroy() {
    // Remove keydown and keyup event listeners from the window object

  },

  methods: {
    handleMouseUp(){
      this.mouseDown = false
    },
    handleKeyDown(event) {
      // If the key is not currently being held down, handle the keydown event
      if (!this.keysDown[event.key] && this.keys.includes(event.key)) {
        let note = this.notes[this.keys.indexOf(event.key) % 12];
        let octave = parseInt(this.keys.indexOf(event.key) / 12, 10);
        this.handleNoteDown(note, 2 + octave + this.keyboardTranspose, 100);
        // Set keyDown flag to true
        this.keysDown[event.key] = true;
        // Change color on keyboard
        if (
          2 + octave + this.keyboardTranspose > 0 &&
          2 + octave + this.keyboardTranspose < 4
        )
          this.$refs[
          "oct" + (2 + octave + this.keyboardTranspose)
            ].switchColorPress(note);
      }
      // Change octave of computer keyboard with z or x
      if (!this.keysDown[event.key] && event.key == "z") {
        this.keyboardTranspose = this.keyboardTranspose - 1;
      }
      if (!this.keysDown[event.key] && event.key == "x") {
        this.keyboardTranspose = this.keyboardTranspose + 1;
      }
    },
    handleKeyUp(event) {
      // If the key is currently being held down, handle the keyup event
      if (this.keysDown[event.key]) {
        let note = this.notes[this.keys.indexOf(event.key) % 12];
        let octave = parseInt(this.keys.indexOf(event.key) / 12, 10);
        this.handleNoteUp(note, 2 + octave + this.keyboardTranspose);
        // Set keyDown flag to false
        this.keysDown[event.key] = false;
        // Change color on keyboard
        if (
          2 + octave + this.keyboardTranspose > 0 &&
          2 + octave + this.keyboardTranspose < 4
        )
          this.$refs[
          "oct" + (2 + octave + this.keyboardTranspose)
            ].switchColorRelease(note);
      }
    },
    // handleMIDIDown(note, octave, velocity) {
    //   if (octave > 0 && octave < 4)
    //     this.$refs["oct" + octave].switchColorPress(note);
    //   this.synths.list.forEach(synth => {
    //     //console.log("Play note: "+(note+octave)+" at velocity: "+velocity+" from MIDI")
    //     synth.playNote(note+octave, velocity);
    //   });
    //   this.$emit("noteDown", note)
    // },
    // handleMIDIUp(note, octave) {
    //   //console.log("MIDI released "+note+octave)
    //   if (octave > 0 && octave < 4)
    //     this.$refs["oct" + octave].switchColorRelease(note);
    //   this.synths.list.forEach(synth => {
    //     synth.stopNote(note+octave);
    //   });
    //
    // },

    handleNoteDown(note, octave, velocity = 100) {
      let finalOctave = parseInt(octave) + this.ocTranspose;
      //console.log(note+finalOctave+" pressed")
      this.synths.list.forEach(synth => {
        synth.playNote(note+finalOctave, velocity);
        //console.log(synth)
      });
      this.$emit("noteDown", note+finalOctave)
    },
    handleNoteUp(note, octave) {
      let finalOctave = parseInt(octave) + this.ocTranspose;
      //console.log(note+finalOctave+" released")
      this.synths.list.forEach(synth => {
        synth.stopNote(note+finalOctave);
      });
    },
  }

};
</script>

<style scoped>
.container {
  //background-color: white;
  width: 100%;
  height: 100%;
  //box-sizing: border-box;
  position: relative;
  //border-top: .1vw solid gray
}

.span {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  //grid-row: 1;
  //grid-column: span 2;
}
</style>
