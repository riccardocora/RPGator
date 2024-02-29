<template>
    <div class="screen-container " ref="screenContainer">
      <canvas class="canvas" ref="visualizerCanvas"></canvas>
    </div>
</template>

<script>

import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import {getCssVar} from "quasar";
import  * as Tone from "tone";

export default {
  name: 'FilterCurve',
  props: {
    filter : {
      type: Tone.Filter,
      required: true
    },
    color:{
      type: String,
      required: true
    }
  },
  watch: {

    filter: function () {
      this.draw();
    }
  },

  setup (props) {
    const visualizerCanvas = ref(null);

    onMounted(() => {
      initializeAudio();
    });
    onUnmounted(() => {
      // Cleanup on component unmount
      cancelAnimationFrame(animationId);
    });


    let animationId;

    const draw = () => {
      const freqResp = props.filter.getFrequencyResponse(1024);
      const canvas = visualizerCanvas.value;
      if(canvas === null) return;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getCssVar(props.color);
      ctx.shadowColor = getCssVar(props.color);
      // ctx.shadowColor = getCssVar("primary");
      //
      ctx.shadowBlur = 3;
      ctx.lineWidth = 3;
      ctx.strokeStyle = getCssVar(props.color);
      //getCssVar(props.color)

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      // Find the minimum and maximum values in the freqResp array
      const minFreqResp = Math.min(...freqResp);
      const maxFreqResp = Math.max(...freqResp);

      // Iterate over the freqResp array
      for (let i = 0; i < freqResp.length; i++) {
        // Calculate the ratio of the index to the length of the freqResp array
        const r = i / freqResp.length;

        // Scale the ratio to the range of frequencies [20, 20000]
        const f = r * (20000 - 20) + 20;

        // Calculate the x-coordinate as a proportion of the canvas width
        const x = Math.log2(f / 20) / Math.log2(20000 / 20) * canvas.width;
        // if(i===0){
        //   ctx.lineTo(0, canvas.height)
        //
        // }

        // Normalize the frequency response value to the range [0, 1]
        const normalizedFreqResp = (freqResp[i] - minFreqResp) / (maxFreqResp - minFreqResp);

        // Scale the normalized value to the height of the canvas
        // Subtract from canvas.height to flip the y-axis
        const y = canvas.height - normalizedFreqResp * canvas.height * 0.8;


        ctx.lineTo(x, y);


      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      ctx.fill();

      ctx.stroke();

    }

    const initializeAudio = () => {
      draw();
    };

    watchEffect(() => {
      draw();
    });
    return {
      id: props.id,
      visualizerCanvas,
      initializeAudio,
      draw
    }
  }
}

</script>

<style lang="scss" scoped>
//.canvas {
//  height: 100%;
//  width: 100%;
//  border-radius: 2%;
//  background: radial-gradient(100% 175% at 50% 50%, #0000 32%, rgba(201, 201, 201, 0.11) 60%),
//  radial-gradient(175% 100% at 50% 53%, #0000 32%, rgba(203, 203, 203, 0.09) 60%);
//  box-shadow: 0 0 1px 7px rgb(150, 150, 150) inset; /*NOT WORKING*/
//}

.canvas{
  width: 100%;
  height: 100%;
  align-self: center;


}

.screen-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  //background-color: #bcb;
  margin: 0 0 0;
  overflow: hidden;
  position: relative;
  width: 100%;
  aspect-ratio: 14/9;
  align-self: center;
  max-height: 10em;


}


</style>
