

<template>
  <div class="button-column" :class="{playing: isPlaying }">
    <div v-for="(button, index) in buttons" :key="index">
      <SequencerButton :isActive="button.isActive" @toggle-state="setButtonState(index, $event)" />
<!--        <p>Button {{ index + 1 }} is Active: {{ button.isActive }}</p>-->
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import SequencerButton from "components/sequencer/SequencerButton.vue";

export default defineComponent({
  name : "SequencerColumn",
  components: {SequencerButton},

  props: {
    columnIndex : Number,
    buttons : [],
    isPlaying : Boolean
  },

  data(){
    // return {
    //   buttons: Array(this.columnSize).fill({ isActive: false }),
    // };
  },
  methods: {
    setButtonState(buttonIndex) {

      this.$emit('toggle-state',buttonIndex);
    },
    play(time){
      for(let i=0; i<this.buttons.length;i++){
        if(this.buttons[i].isActive){
          this.instruments[i].triggerAttackRelease("A4",'8n',time)
        }
      }
    },
  },
})
</script>

<style scoped>
.button-column {
  display: flex;
  flex-direction: column; /* Display buttons vertically in a column */
  margin: 0 10px; /* Add margin between columns */
}

.playing {
  background-color: lightblue;
}
</style>
