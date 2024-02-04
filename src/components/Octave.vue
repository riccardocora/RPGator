<template>
  <div class="octaves-container">
    <div v-for="octave in octaves" class="octave" :key="octave">
      <div class="woctave">
        <div v-for="note in ['C', 'D', 'E', 'F', 'G', 'A', 'B']" :key="`${note}${octave}`" class="key" >
          <q-btn
              v-bind:id="`${note}${octave}`"
              :note="note"
              v-bind:ref="setKeyRef"
              :octave="octave"
              push
              class="w"
              @mousedown="handleMouseDown"
              @mouseup="handleMouseLeave"
              :ripple="false"
          >
<!--            <template v-slot:default style="display: none">-->
<!--              <span class="">{{note}}</span>-->
<!--            </template>-->
          </q-btn>
        </div>
      </div>
      <div class="boctave">
        <div id="C#" ref="Cs" class="key" style="grid-column: 3 / 5;">
          <q-btn :id="`C#${octave}`" push class="fit b" @mousedown="handleMouseDown" @mouseup="handleMouseLeave" />
        </div>
        <div id="D#" ref="Ds" class="key" style="grid-column: 6 / 8; ">
          <q-btn :id="`D#${octave}`" push  class="fit b" @mousedown="handleMouseDown" @mouseup="handleMouseLeave"/>

        </div>
        <div id="F#" ref="Fs" class="key" style="grid-column: 12 / 14;">
          <q-btn :id="`F#${octave}`" push class="fit b" @mousedown="handleMouseDown" @mouseup="handleMouseLeave"/>

        </div>
        <div id="G#" ref="Gs" class="key" style="grid-column: 15 / 17; ">
          <q-btn :id="`G#${octave}`" push  class="fit b" @mousedown="handleMouseDown" @mouseup="handleMouseLeave"/>

        </div>
        <div id="A#" ref="As" class="key" style="grid-column: 18 / 20;">
          <q-btn :id="`A#${octave}`" push class="fit b"  @mousedown="handleMouseDown" @mouseup="handleMouseLeave"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AudioKeys from "audiokeys";
import * as Tone from "tone";
import AudioContextHandler from "@/components/AudioContextHandler.js";
import {ref} from "vue";

export default {
  name: "Keyboard",
  props: {
    octave : Number,
  },
  setup(){
    const octaves = [1,2];
    const keyboard = new AudioKeys({polyphony: 4});
    AudioContextHandler.voices.connectKeyboard(keyboard);
    const keys = ref([]);
    const setKeyRef = (el) => {
      if (el) {
        console.log("el", el);
        keys.value.push({id: el.id, el});
      } else {
        console.error("DOM element is undefined");
      }
    }

    keyboard.down(key => {
      const note = Tone.Frequency(key.note, "midi").toNote();
      console.log("note", note)
      const btn = keys.value.find((btn) => btn.id === note);
      console.log("btn", btn)

      if (btn) {
        btn.el.click();
      }
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
      console.log("handleMouseLeave", evt.target.id)
      const note = Tone.Frequency(evt.target.id).toFrequency();
      AudioContextHandler.voices.noteUp(note);
    };

    return {
      octaves,
      setKeyRef,
      keys,
      handleMouseDown,
      handleMouseLeave,
    };
  },


}
</script>

<style scoped lang="scss">
.octaves-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  background-color: $primary;
  width: 100%;
}
.octave{
  width: 100%;
  height: 100%;
  display: flex;
  position:relative;
}
.woctave{
  position: relative;
  display: flex;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.boctave{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(21, 1fr);
  grid-template-rows: 100%;
  height: 60%;
}

.key{
  width: 100%;
}


.b{
  background-color: black;
  z-index: 2;
}



.w{
  height: 100%;
  width: 100%;
  background-color: rgb(238, 238, 238);

  z-index: 1;
}

.w:active{
  background-color: rgb(205, 255, 118);
}

.b:active{
  background-color: rgb(205, 255, 118);

}

.span {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}


.key > span {
  display: none;
}






</style>