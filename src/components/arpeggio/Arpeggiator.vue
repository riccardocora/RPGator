
<template>
  <div class="q-py-md">
    <q-card class="arp-card" flat>
      <div class="row q-px-md q-pt-md justify-between">
        <div class="q-gutter-y-md column" style="max-width: 300px">
          <div class="q-pa-xxs q-ma-sm select">
            <q-select outlined class="" dense hide-dropdown-icon hide-bottom-space v-model="type" :options="types" @update:model-value="updatePattern"/>
          </div>
          <div class="q-pa-xxs q-ma-sm select">
            <q-select outlined class="" dense v-model="length" :options="lengths" hide-dropdown-icon hide-bottom-space @update:model-value="updatePattern"/>
          </div>
          <div class="q-pa-xxs q-ma-sm">
            <q-select outlined class="select" dense hide-dropdown-icon hide-bottom-space v-model="interval" :options="lengths"  @update:model-value="updatePattern"/>
          </div>
        </div>
<!--        <div class="row justify-between">-->
<!--          <div v-for="note in notes" :key="note.value">-->
<!--            <q-checkbox-->
<!--              v-model="group"-->
<!--              :val="note.value"-->
<!--              label-position="left"-->
<!--              size="xs"-->
<!--              @update:model-value="updatePattern"-->
<!--            >-->
<!--            <template v-slot:default>-->
<!--             <q-badge outline  :label="note.label" />-->
<!--            </template>-->

<!--            </q-checkbox>-->


<!--          </div>-->
<!--        </div>-->
        <div class="column q-px-lg">
          <q-slider
            v-model="octave"
            :min="1"
            :max="8"
            :step="1"
            label
            vertical
            reverse
            @update:model-value="updatePattern"
          >
          </q-slider>
          <div>
            <q-badge outline label="octave"/>
          </div>
        </div>
        <div class="column">
          <q-slider
            v-model="bpm"
            :min="40"
            :max="200"
            :step="1"
            label
            @update:model-value="updateBpm"
            vertical
            reverse
          >
          </q-slider>
          <div>
            <q-badge outline label="bpm"/>

          </div>

        </div>
          <div class="column">
            <Keyboard></Keyboard>
          </div>


        </div>
      <q-card-actions>
        <div class="col">
          <q-checkbox v-model="playing" @update:model-value="togglePlay" checked-icon="radio_button_checked"
                      unchecked-icon="radio_button_unchecked" color="yellow">
            <template v-slot:default>
              <q-badge outline  label="play" :color="playing?'yellow':'primary'" />
            </template>
          </q-checkbox>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import AudioContextHandler from "@/components/AudioContextHandler.js";
import * as Tone from "tone";
import audioContextHandler from "@/components/AudioContextHandler.js";
import Keyboard from "../keyboard.vue";

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
      console.log("group", group.value)
      console.log("type", type.value)
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
      console.log("playing", playing)
      if (playing){
        Tone.Transport.start();
        console.log("pattern",pattern)
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

<style scoped lang="sass">
.select
  background-image: url("assets/images/metal.png")
  border-radius: 3px

.arp-card
  background-color: transparent
  //background-image: url("assets/images/metal.png")


.q-option-group .q-field__control
  flex-direction: column-reverse

.q-option-group .q-field__control .q-field__native
  order: 2
</style>

