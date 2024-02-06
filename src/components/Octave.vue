<template>
  <div class="octaves-container">
    <div v-for="octave in octaves" class="octave-container" :key="octave">

      <div class = "octave">

        <div id="C" ref="C" class="key div1">
            <q-btn :id="`C${octave}`" :ref="buttonRefs['C'+octave]" stack  push text-color="primary" class="w"  @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave" >
          </q-btn>

        </div>
        <div id="D" ref="D" class="key div2">
          <q-btn :id="`D${octave}`" :ref="buttonRefs['D'+octave]" push stack class="w" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>

        </div>
        <div id="E" ref="E" class="key div3" >
          <q-btn :id="`E${octave}`" :ref="buttonRefs['E'+octave]" push stack class="w" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>

        </div>
        <div id="F" ref="F" class="key div4" >
          <q-btn :id="`F${octave}`" :ref="buttonRefs['F'+octave]" push stack class="w" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>

        </div>
        <div id="G" ref="G" class="key div5">
          <q-btn :id="`G${octave}`" :ref="buttonRefs['G'+octave]" push stack class="w" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>
        </div>
        <div id="A" ref="A" class="key div6">
          <q-btn :id="`A${octave}`" :ref="buttonRefs['A'+octave]" push stack class="w" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>
        </div>
        <div id="B" ref="B" class="key div7" >
          <q-btn :id="`B${octave}`" :ref="buttonRefs['B'+octave]" push stack class="w" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>
        </div>
        <div id="C#" ref="Cs" class="key div8" >
          <q-btn :id="`C#${octave}`" :ref="buttonRefs['C#'+octave]" push stack class=" b" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>
        </div>
        <div id="D#" ref="Ds" class="key div9" >
          <q-btn :id="`D#${octave}`" :ref="buttonRefs['D#'+octave]" push stack class=" b" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>

        </div>
        <div id="F#" ref="Fs" class="key div10" >
          <q-btn :id="`F#${octave}`" :ref="buttonRefs['F#'+octave]" push stack class="b" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>

        </div>
        <div id="G#" ref="Gs" class="key div11" >
          <q-btn :id="`G#${octave}`" :ref="buttonRefs['G#'+octave]" push stack class=" b" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>

        </div>
        <div id="A#" ref="As" class="key div12">
          <q-btn :id="`A#${octave}`" :ref="buttonRefs['A#'+octave]" push stack class=" b" text-color="primary" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" @mouseleave="handleMouseLeave"/>
        </div>


        <div id="C" ref="C" class="div13">
          <q-checkbox v-model="selectedNotes['C'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('C',(octave - octaves[0]))"  checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">

            <template v-slot:default>
              <q-badge rounded flat :class="selectedNotes['C'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="D" ref="D" class=" div14">
          <q-checkbox v-model="selectedNotes['D'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('D',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat  :class="selectedNotes['D'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>

        </div>
        <div id="E" ref="E" class=" div15" >
          <q-checkbox v-model="selectedNotes['E'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('E',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat :class="selectedNotes['E'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>

        </div>
        <div id="F" ref="F" class="div16" >
          <q-checkbox v-model="selectedNotes['F'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('F',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat  :class="selectedNotes['F'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="G" ref="G" class="div17">
          <q-checkbox v-model="selectedNotes['G'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('G',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat  :class="selectedNotes['G'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="A" ref="A" class="div18">
          <q-checkbox v-model="selectedNotes['A'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('A',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat :class="selectedNotes['A'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="B" ref="B" class="div19" >
          <q-checkbox v-model="selectedNotes['B'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('B',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat  :class="selectedNotes['B'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="C#" ref="Cs" class="div20" >
          <q-checkbox v-model="selectedNotes['C#'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('C#',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat :class="selectedNotes['C#'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="D#" ref="Ds" class="div21" >
          <q-checkbox v-model="selectedNotes['D#'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('D#',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat :class="selectedNotes['D#'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="F#" ref="Fs" class="div22" >
          <q-checkbox v-model="selectedNotes['F#'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('F#',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat  :class="selectedNotes['F#'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="G#" ref="Gs" class="key div23" >
          <q-checkbox v-model="selectedNotes['G#'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('G#',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat  :class="selectedNotes['G#'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
        <div id="A#" ref="As" class="key div24">
          <q-checkbox v-model="selectedNotes['A#'+(octave - octaves[0])]" @update:model-value="handleNoteSelected('A#',(octave - octaves[0]))" checked-icon="none" unchecked-icon="none" color="yellow" class="justify-center">
            <template v-slot:default>
              <q-badge rounded flat  :class="selectedNotes['A#'+(octave - octaves[0])]?'light_on':'button_light'" />
            </template>
          </q-checkbox>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AudioKeys from "audiokeys";
import * as Tone from "tone";
import AudioContextHandler from "@/components/AudioContextHandler.js";
import {nextTick, onMounted, ref} from "vue";

export default {
  name: "Keyboard",
  props: {
    octave : Number,
  },


  data() {
    const octaves = [0,1];
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    const selectedNotes = {};
    for (let octave of octaves) {
      for (let note of notes) {
        selectedNotes[note + octave] = false;
      }
    }
    console.log("selelctednotes",selectedNotes)
    return {
      localOctave: this.octave,
      selectedNotes,

    }
  },
  watch: {
    octave(newVal) {
      console.log("newVal",newVal)
      this.localOctave = newVal;
      this.octaves = [this.localOctave,this.localOctave+1]

    },

  },
  setup(props){
    const octaves = [props.octave, props.octave + 1];
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const buttonRefs = {};

      for (let octave of [1, 2, 3, 4, 5, 6, 7]) {
      for (let note of notes) {
        buttonRefs[note + octave] = ref(null);
      }
    }

    onMounted(() => {
      nextTick(() => {
        const keyboard = new AudioKeys({polyphony: 4});
        AudioContextHandler.voices.connectKeyboard(keyboard);

        keyboard.down(key => {
          const note = Tone.Frequency(key.note, "midi").toNote();
          console.log("note",note)
          console.log("buttonRefs",buttonRefs)

          const btn = buttonRefs[note];
          console.log("btn",btn.value[0])
          console.log("btn.value.$el",btn.value[0].$el)
          btn.value[0].$el.click()
          // if (btn && btn.value[0] && btn.value[0].$el) {
          //   console.log("btn.value.$el",btn.value.$el)
          //   btn.value[0].$el.classList.add('active');
          // }

          // Access the q-btn element with ref="C4" and trigger a click event

        });


      });
    });



    const handleMouseDown = (evt) => {
      console.log("evt", evt.target);
      const note = Tone.Frequency(evt.target.id).toFrequency();
      console.log("note",note);
      if(note){
        AudioContextHandler.voices.noteDown(note);
      }
    };

    const handleMouseLeave = (evt) => {
      const note = Tone.Frequency(evt.target.id).toFrequency();
      AudioContextHandler.voices.noteUp(note);
    };

    return {
      handleMouseDown,
      handleMouseLeave,
      // selected: ref(false),
      octaves,
      buttonRefs,

    };
  },

  methods: {
    handleNoteSelected(note, octave) {
      console.log("handleNoteSelected");
      console.log("octave",octave)
      console.log("note",note)
      this.$emit('note-selected', { note, octave, selected: this.selectedNotes[note + octave] });
    },
    resetSelectedNotes() {
      for (let note in this.selectedNotes) {
        this.selectedNotes[note] = false;
      }
    },
    highlightNote(note){
      this.buttonRefs[note].value[0].$el.click();
    }
  },


}
</script>

<style scoped lang="scss">
.octaves-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  background-color: rgba(124, 77, 255, 0);
  width: 100%;

}

.octave-container{
  width: 100%;
  height: 100%;
  position: relative;
}


.octave{
  width: 100%;
  height: 100%;
  display: grid;
  position: relative;
  grid-template-columns: repeat(21, 1fr);
  grid-template-rows: 10% 45% 1fr 10%;
}
//.woctave{
//  position: relative;
//  display: flex;
//  width: 100%;
//  top: 0;
//  right: 0;
//  bottom: 0;
//  left: 0;
//}
//.boctave{
//  position: absolute;
//  top: 0;
//  right: 0;
//  bottom: 0;
//  left: 0;
//  display: grid;
//  grid-template-columns: repeat(21, 1fr);
//  grid-template-rows: 100%;
//  height: 60%;
//}

.key{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}


.b{
  background-color: black;
  z-index: 2;
  height: 100%;
}



.w{
  height: 100%;
  width: 100%;
  background-color: rgb(238, 238, 238);
  display: flex;
  z-index: 1;
}

//.w:active{
//  background-color: rgb(205, 255, 118);
//}
//
//.b:active{
//  background-color: rgb(205, 255, 118);
//
//}

.span {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}


.key > span {
  display: none;
}



.div1 { grid-area: 2 / 1 / 4 / 4; }
.div2 { grid-area: 2 / 4 / 4 / 7; }
.div3 { grid-area: 2 / 7 / 4 / 10; }
.div4 { grid-area: 2 / 10 / 4 / 13; }
.div5 { grid-area: 2 / 13 / 4 / 16; }
.div6 { grid-area: 2 / 16 / 4 / 19; }
.div7 { grid-area: 2 / 19 / 4 / 22; }
.div8 { grid-area: 2 / 3 / 3 / 5; }
.div9 { grid-area: 2 / 6 / 3 / 8; }
.div10 { grid-area: 2 / 12 / 3 / 14; }
.div11 { grid-area: 2 / 15 / 3 / 17; }
.div12 { grid-area: 2 / 18 / 3 / 20; }

.div13 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 4 / 1 / 5 / 4;
}
.div14 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 4 / 4 / 5 / 7;
}
.div15 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 4 / 7 / 5 / 10;
}
.div16 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 4 / 10 / 5 / 13;
}
.div17 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 4 / 13 / 5 / 16;
}
.div18 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 4 / 16 / 5 / 19;
}
.div19 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 4 / 19 / 5 / 22;
}
.div20 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 3 / 2 / 5;
}
.div21 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 6 / 2 / 8;
}
.div22 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 12 / 2 / 14;
}
.div23 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 15 / 2 / 17;
}
.div24 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 18 / 2 / 20;
}

   /* Default styling for the checkbox */
 input[type="checkbox"] {
   display: none; /* Hide the default checkbox */
 }

/* Custom styling for the checkbox label */
label.checkbox-label {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  border: 2px solid #ccc;
  border-radius: 5px;
}

/* Change background color when checkbox is checked */
input[type="checkbox"]:checked + label.checkbox-label {
  background-color: #8eff8e; /* Change this to the desired color */
  border-color: #5cb85c; /* Change this to the desired color */
}

.active{
  background-color: #8eff8e;
}
.light_on{
  background:
  radial-gradient(circle, rgba(255, 255, 255, 0.2),rgba(0, 0, 0, 0.05)),
  linear-gradient(to right,rgba(0, 0, 0, 0.05) 0%, rgba(203, 203, 203, 0.2) 50%, rgba(0, 0, 0, 0.05) 100%),
  $primary !important;
  box-shadow: 0 0 15px 5px rgb(244, 178, 94), 0 0 0 2px var(--border_color);
}


</style>
