<template>
  <div class="r2d-container shade shadow-4 ">
    <div class="r2d ">
      <div class="top-row row ">
        <div class="voices text-info">
          <voices :output="voicesOut" ref="voices"></voices>
        </div>
        <div class="visual shade" >
          <visual-trip :input="gainOut"></visual-trip>
        </div>
      </div>
      <div class="row bottom-row text-info">
        <div class="arp ">
          <arpeggiator :update="updatePattern" :noteUp ="noteUp" :noteDown="noteDown"></arpeggiator>
        </div>
        <div class="effects shade">
          <effects :input="effectsIn" :output="effectsOut"></effects>
        </div>
      </div>
    </div>
  </div>
  <q-checkbox v-model="rec" @update:model-value="record" >

    <template v-slot:default>
      REC
      <q-btn size=40% round :class="rec ?'light_on':'button_light'" />
      {{formattedTime}}/10:00
    </template>
  </q-checkbox>
</template>

<script>

import Voices from "../components/voices/voices.vue";
import Effects from "../components/effects/effects.vue";
import Arpeggiator from "../components/arpeggio/Arpeggiator.vue";
import VisualTrip from "../components/visualUnit/visual.vue";
import * as Tone from "tone";
import {computed, reactive, ref} from "vue";

export default {
  name: 'RPGator',
  components: {
    VisualTrip,
    Arpeggiator,
    Effects,
    Voices,
  },
  setup() {

    const voicesOut = new Tone.Gain();
    const compressor = new Tone.Compressor(-30, 3)
    const effectsIn = new Tone.Gain();
    const effectsOut = new Tone.Gain();
    const gainOut = new Tone.Gain(0.5);
    const recorder = new Tone.Recorder();
    const recordingSeconds = ref(0);
    const formattedTime = computed(() => {
      const minutes = Math.floor(recordingSeconds.value / 60);
      const seconds = recordingSeconds.value % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
    const rec = ref(false);
    let intervalId = null;
    let timeoutId = null;
    let isRecording = null;
    voicesOut.connect(compressor);
    compressor.connect(effectsIn);
    effectsOut.connect(gainOut);
    gainOut.toDestination()
    gainOut.connect(recorder);



    return {
      voicesOut,
      effectsIn,
      effectsOut,
      gainOut,
      rec,
      recorder,
      recordingSeconds,
      isRecording,
      formattedTime,
      timeoutId,
      intervalId
    }

  },
  methods: {
    updatePattern(pattern, noteLength) {
      this.$refs.voices.updatePattern(pattern, noteLength);
    },

    noteUp(note){
      this.$refs.voices.noteUp(note);
    },
    noteDown(note,velToGain){
      this.$refs.voices.noteDown(note,velToGain);
    },
    async record(){
      if(this.rec){
        this.isRecording = await this.recorder.start();
        this.recordingSeconds = 0;
        this.intervalId = setInterval(() => {
          this.recordingSeconds++;
        }, 1000);
        this.timeoutId = setTimeout(async () => {
          const recording = await this.recorder.stop();
          const url = URL.createObjectURL(recording);
          const anchor = document.createElement("a");
          anchor.download = "recording.wav";
          anchor.href = url;
          anchor.click(); 
        }, 600000);

      } else if(this.isRecording !== null){
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        const recording = await this.recorder.stop();
        const url = URL.createObjectURL(recording);
        const anchor = document.createElement("a");
        anchor.download = "recording.wav";
        anchor.href = url;
        anchor.click();
        this.recordingSeconds = 0;
        this.isRecording = null;
      }

    }
  }
}
</script>
<style lang="scss" scoped>


.r2d-container{
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line */
  border: 10px solid $r2d-container;
  border-radius: 2%;
  aspect-ratio: 2/1 ;
  min-width: 85vw;
}

.r2d{
  height: 100%;
  width: 100%;
}
.top-row{
  height: 50%;
    max-height: 50%;
  justify-content: space-between;
  background-color: $r2d-container;
  padding: 1% 1% 1% 1%

}
.bottom-row{
  height: 50%;
  max-height: 50%;
  justify-content: space-between;
  background-color: $r2d-container;
  padding: 1% 1% 1% 1%
}
.voices{
  width: 75%;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  background-color: $r2d-container;
  justify-content: space-between;
}

.visual{
  width: 23.5%;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: $r2d-inner;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);
}

.arp{
  width: 70%;
  height: 100%;
  max-height: 110%;
  display: flex;
  flex-direction: row;
  align-items: start;

}

.effects{
  width: 30%;
  height: 100%;
  max-height: 100%;
  background-color: $r2d-inner;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);
}
</style>
