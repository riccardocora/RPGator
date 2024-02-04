<template>
<!--  <div class="span" >-->
<!--    <div class="container">-->
<!--      <Octave-->
<!--        ref="oct1"-->
<!--        :octaveNumber="1"-->
<!--        @virtualKeyDown="handleNoteDown"-->
<!--        @virtualKeyUp="handleNoteUp"-->
<!--      />-->
<!--    </div>-->
<!--    <div class="container">-->
<!--      <Octave-->
<!--        ref="oct2"-->
<!--        :octaveNumber="2"-->
<!--        @virtualKeyDown="handleNoteDown"-->
<!--        @virtualKeyUp="handleNoteUp"-->
<!--      />-->
<!--    </div>-->
<!--&lt;!&ndash;    <div class="container">&ndash;&gt;-->
<!--&lt;!&ndash;      <Octave&ndash;&gt;-->
<!--&lt;!&ndash;        ref="oct3"&ndash;&gt;-->
<!--&lt;!&ndash;        :octaveNumber="3"&ndash;&gt;-->
<!--&lt;!&ndash;        @virtualKeyDown="handleNoteDown"&ndash;&gt;-->
<!--&lt;!&ndash;        @virtualKeyUp="handleNoteUp"&ndash;&gt;-->
<!--&lt;!&ndash;      />&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <MIDIKeyboard @MIDIDown="handleMIDIDown" @MIDIUp="handleMIDIUp" />&ndash;&gt;-->
<!--  </div>-->
</template>

<script>
// import MIDIKeyboard from "./MIDIKeyboard.vue";
// import Octave from "./Octave.vue";
// import AudioKeys from "audiokeys";
// import * as Tone from "tone";
//
//
// export default {
//   name: "PianoKeyboard",
//   components: {
//     Octave,
//     // MIDIKeyboard,
//   },
//   data() {
//     return {
//       //From here we can transpose the whole keyboard by octaves
//       ocTranspose: 1,
//       // Object to track which keys are currently being held down
//       keysDown: {},
//       keys: "awsedftgyhujkolpòà",
//       notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
//       //Transposition amount (in octaves) for the computer keyboard
//       keyboardTranspose: 0,
//       mouseDown: false,
//     };
//   },
//   setup(){
//     const keyboard = new AudioKeys();
//     function map(value, sourceMin, sourceMax, targetMin, targetMax) {
//       // Scale the input value from the source range to the target range
//       return (value - sourceMin) / (sourceMax - sourceMin) * (targetMax - targetMin) + targetMin;
//     }
//     keyboard.down(note => {
//       const velToGain = map(note.velocity, 0, 127, 0, 1);
//       console.log("note", note)
//       const realNote = Tone.Frequency(note.note, "midi").toNote()
//       console.log("realNote", realNote)
//       // this.voices.forEach(voiceObj => {
//       //   voiceObj.voice[voiceObj.voiceType].triggerAttack(note.frequency, Tone.now(), velToGain);
//       // });
//     })
//     keyboard.up(note => {
//       // this.voices.forEach(voiceObj => {
//       //   voiceObj.voice[voiceObj.voiceType].triggerRelease(note.frequency, Tone.now())
//       // })
//     });
//   },
//
//   mounted() {
//
//   },
//   beforeDestroy() {
//     // Remove keydown and keyup event listeners from the window object
//
//   },
//
//   methods: {
//
//     },
//     // handleMIDIDown(note, octave, velocity) {
//     //   if (octave > 0 && octave < 4)
//     //     this.$refs["oct" + octave].switchColorPress(note);
//     //   this.synths.list.forEach(synth => {
//     //     //console.log("Play note: "+(note+octave)+" at velocity: "+velocity+" from MIDI")
//     //     synth.playNote(note+octave, velocity);
//     //   });
//     //   this.$emit("noteDown", note)
//     // },
//     // handleMIDIUp(note, octave) {
//     //   //console.log("MIDI released "+note+octave)
//     //   if (octave > 0 && octave < 4)
//     //     this.$refs["oct" + octave].switchColorRelease(note);
//     //   this.synths.list.forEach(synth => {
//     //     synth.stopNote(note+octave);
//     //   });
//     //
//     // },
//
// };
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
