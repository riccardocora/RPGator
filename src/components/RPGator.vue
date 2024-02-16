<template>
  <div class="r2d-container shadow">
    <div class="r2d ">
      <div class="top-row row ">
        <div class="voices ">
          <voices :output="voicesOut" ref="voices"></voices>
        </div>
        <div class="visual shadow" >
          <visual-trip :input="effectsIn"></visual-trip>
        </div>
      </div>
      <div class="row bottom-row">
        <div class="arp ">
          <arpeggiator :update="updatePattern" :noteUp ="noteUp" :noteDown="noteDown"></arpeggiator>
        </div>
        <div class="effects shadow">
          <effects :input="effectsIn" :output="effectsOut"></effects>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Voices from "../components/voices/voices.vue";
import Effects from "../components/effects/effects.vue";
import Arpeggiator from "../components/arpeggio/Arpeggiator.vue";
import VisualTrip from "../components/visualUnit/visual.vue";
import * as Tone from "tone";
import {reactive, ref, toRaw} from "vue";

export default {
  name: 'RPGator',
  components: {
    VisualTrip,
    Arpeggiator,
    Effects,
    Voices,
  },
  computed:{

  },
  setup() {
    const voicesOut = new Tone.Gain();
    const effectsIn = new Tone.Gain();
    const effectsOut = new Tone.Gain();
    const gainOut = new Tone.Gain(0.5);
    voicesOut.connect(effectsIn);
    effectsOut.connect(gainOut);
    gainOut.toDestination()



    return {
      voicesOut,
      effectsIn,
      effectsOut,
      gainOut,
    }

  },
  methods: {
    updatePattern(pattern, noteLength) {
      ////console.log('pattern updated')
      this.$refs.voices.updatePattern(pattern, noteLength);
    },

    noteUp(note,velToGain){
      this.$refs.voices.noteUp(note,velToGain);
    },
    noteDown(note){
      this.$refs.voices.noteDown(note);
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
