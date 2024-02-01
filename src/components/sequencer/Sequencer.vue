<template>
 <!--tone-u-i></tone-u-i-->
  <div>
    <q-select v-model="sequenceLength" :options="lengthOptions" label="Sequence Length" />
    <q-btn @click="play">Play</q-btn>
    <q-btn @click="stop">Stop</q-btn>
    <q-btn @click="addColumn">Add Column</q-btn>
    <q-btn @click="removeColumn">Remove Column</q-btn>
    <div class="columns-container">
      <SequencerColumn
          v-for="(buttons, index) in buttonColumns"
          :key="index"
          :column-size="numberOfRows"
          :column-index="index"
          :buttons="buttons"
          :isPlaying="buttons.isPlaying"
          @toggle-state="toggleButtonState(index,$event)"
      />
    </div>

  </div>
</template>

<script>


import SequencerColumn from "components/sequencer/SequencerColumn.vue";
let index = 0;
let synth;
export default {
  name: "SequencerModule",
  props : {
    numberOfRows : Number,
  },

  components : {
    SequencerColumn,

    // ToneStepSequencer: () => {
    //   return new Promise((resolve, reject) => {
    //     let script = document.createElement('script')
    //     script.onload = () => {
    //       resolve(import(ToneStepSequencer))
    //     }
    //     script.async = true
    //     script.src = 'src/components.js'
    //     document.head.appendChild(script)
    //   })
    // }
  },
  data() {
    return {
      buttonColumns: [],
      lengthOptions : ["4","8","16"],
      sequenceLength : "8",
        // Add more columns  as needed
    };
  },
  setup(){

  },
  mounted() {
    synth = new this.$tone.Synth();
    synth.oscillator.type = "sine";
    const gain = new this.$tone.Gain(0.7);
    gain.toDestination();
    synth.connect(gain);
    for (let i = 0; i < this.sequenceLength; i++) {
      this.addColumn(); // Add rows as per the initial count
    }
  },
  methods: {
    toggleButtonState(columnIndex,buttonIndex) {
      this.buttonColumns[columnIndex][buttonIndex].isActive = !this.buttonColumns[columnIndex][buttonIndex].isActive;

    },

    addColumn() {
      let column =[];
      for(let i=0; i<this.numberOfRows;i++){
        column.push({isActive : false})
      }
      this.buttonColumns.push(column);
    },
    removeColumn() {
      if (this.buttonColumns.length > 0) {
        this.buttonColumns.pop();
      }
    },
    play(){
      // this.synth = new this.$tone.Synth();

      this.$tone.Transport.scheduleRepeat(this.repeat, this.sequenceLength + "n" )
      this.$tone.Transport.start();
    },

    stop(){
      if(this.$tone.Transport.state === "started"){
        this.$tone.Transport.stop();
        this.$tone.Transport.cancel(0);
        index = 0;
        this.buttonColumns.forEach((column) => {column.isPlaying = false})
      }
    },
    repeat(time) {
      console.log("time: ",time)
      let step = index % this.sequenceLength;
      let previousStep = step===0 ? this.sequenceLength - 1 : step - 1;
        this.buttonColumns[step].filter((button) => button.isActive).forEach(() => {
        synth.triggerAttackRelease("A4", '8n', time)
      });
      this.buttonColumns[step].isPlaying = true;
      this.buttonColumns[previousStep].isPlaying = false;
      index++;
    },
  },
}
</script>



<style lang="scss">
.columns-container {
  display: flex; /* Display columns horizontally */
  justify-content: space-between; /* Adjust as needed to control spacing */
  margin: 10px 0; /* Add margin between columns */
}
</style>

