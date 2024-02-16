<template>
<!--  <div class="column full-height justify-center" >-->

    <div class="screen-container " ref="screenContainer">
      <canvas class="canvas" ref="visualizerCanvas"></canvas>
    </div>
<!--  </div>-->
</template>

<script>

import {onMounted, onUnmounted, ref} from "vue";
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
      //console.log("watching filter");
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
      // let start = props.type==="lowpass"? 0: canvas.width;
      // const tot_x = 4;


      ctx.fillStyle = "black";
      ctx.shadowColor = "white";
      ctx.shadowBlur = 15;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = getCssVar(props.color);
      //getCssVar(props.color)
      // Clear the canvas
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Begin a new path for the line graph
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


        // Add a point to the path at the calculated x and y coordinates
        ctx.lineTo(x, y);


      }

      // Stroke the path to draw the line graph
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fill();

      ctx.stroke();
      // ctx.closePath();

    }
      // Stroke the path to draw the line graph

      // //current+= props.type==="lowpass"? (props.cutoff/tot_x)*(canvas.width): canvas.width-(props.cutoff/tot_x)*(canvas.width);
     //  let current = (props.cutoff/tot_x)*canvas.width //+ (props.type==="lowpass" ? 0: -300);
     //
     //  const curveResolution = 100; // Number of points to approximate the curve
     //  //Mapping coeff to rolloff value
     //  let coeff;
     //  switch (props.rolloff){
     //    case -12:
     //      coeff = 1/50;
     //      break;
     //    case -24:
     //      coeff = 1/35;
     //      break;
     //    case -48:
     //      coeff = 1/20;
     //      break;
     //    case -96:
     //      coeff = 1/5;
     //      break;
     //  }
     //
     //  let x_i = current;
     //  let y = canvas.height/2;
     //  let x= x_i;
     //
     //
     //
     //  while(y<canvas.height){
     //    x = x +(props.type==="lowpass" ? 1: -1);
     //    // x = x<0? 0: x;
     //    // x = x>canvas.width? canvas.width: x;
     //    const x_arg = (props.type==="lowpass" ? x-x_i: -(x -x_i));
     //    y= canvas.height/2 + coeff*Math.pow(x_arg, 1.7);
     //
     //    ctx.lineTo(x, y);
     //
     //
     // //  }
     //  ctx.lineTo(start, canvas.height)
     //  ctx.fillStyle = getCssVar(props.color);
     //  ctx.fill();
     //

      //for (let i = 0; i <= curveResolution; i++) {
        ////console.log(props.rolloff);
        //let x = current + (props.type==="lowpass"? (i / curveResolution) * (canvas.width - (props.cutoff / tot_x) * canvas.width)
         // : -(i / curveResolution) * ((props.cutoff / tot_x) * canvas.width));
        //let y = coeff* Math.pow(x - (props.cutoff / tot_x) * canvas.width, 1.7);
        //CHAT 1
        // let y = coeff * Math.pow((props.type === "lowpass" ? 1 : -1) * (x - (props.cutoff / tot_x) * canvas.width), 1.7);
        //let y = (canvas.height/2)-coeff * Math.pow(x - (props.cutoff / tot_x) * canvas.width, 1.7);
        //ctx.lineTo(x, y);
        ////console.log("x:",x);
        ////console.log("y;", y);
      //}

      // ctx.stroke();
      //ctx.closePath();

    // }
    const initializeAudio = () => {
      // Start the initial drawing
      draw();
    };


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
  height: 100%;
  align-self: center;

}


</style>
