<template>
  <div class="column full-height justify-center" >

    <div class="screen-container " ref="screenContainer">
      <canvas class="canvas" ref="visualizerCanvas"></canvas>
    </div>
  </div>
</template>

<script>

import {onMounted, onUnmounted, ref} from "vue";
import {getCssVar} from "quasar";

export default {
  name: 'FilterCurve',
  props: {
    id: {
      type: String,
      required: true
    },
    cutoff: {
      type: Number,
      required: true
    },
    rolloff: {
      type: Number,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    color:{
      type: String,
      required: true
    }
  },
  watch: {
    cutoff: function () {
      this.draw()
    },
    rolloff: function () {
      this.draw()
    },
    type: function () {
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
      const canvas = visualizerCanvas.value;
      const ctx = canvas.getContext("2d");
      let start = props.type==="lowpass"? 0: canvas.width;
      const tot_x = 4;


      ctx.clearRect(0, 0, canvas.width, canvas.height);


      // // Stroke
      ctx.lineWidth = 2;
      ctx.fillStyle = "black";

      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = getCssVar(props.color)
      ctx.shadowColor = "white";
      ctx.shadowBlur = 9;
      ctx.beginPath();
      ctx.moveTo(start, canvas.height/2); // Start from the origin on the vertical axis
      ctx.lineTo(
        (props.cutoff/tot_x)*canvas.width,
        canvas.height/2
      )


     //current+= props.type==="lowpass"? (props.cutoff/tot_x)*(canvas.width): canvas.width-(props.cutoff/tot_x)*(canvas.width);
      let current = (props.cutoff/tot_x)*canvas.width //+ (props.type==="lowpass" ? 0: -300);

      const curveResolution = 100; // Number of points to approximate the curve
      //Mapping coeff to rolloff value
      let coeff;
      switch (props.rolloff){
        case -12:
          coeff = 1/50;
          break;
        case -24:
          coeff = 1/35;
          break;
        case -48:
          coeff = 1/20;
          break;
        case -96:
          coeff = 1/5;
          break;
      }

      let x_i = current;
      let y = canvas.height/2;
      let x= x_i;



      while(y<canvas.height){
        x = x +(props.type==="lowpass" ? 1: -1);
        // x = x<0? 0: x;
        // x = x>canvas.width? canvas.width: x;
        const x_arg = (props.type==="lowpass" ? x-x_i: -(x -x_i));
        y= canvas.height/2 + coeff*Math.pow(x_arg, 1.7);

        ctx.lineTo(x, y);


      }
      ctx.lineTo(start, canvas.height)
      ctx.fillStyle = getCssVar(props.color);
      ctx.fill();


      //for (let i = 0; i <= curveResolution; i++) {
        //console.log(props.rolloff);
        //let x = current + (props.type==="lowpass"? (i / curveResolution) * (canvas.width - (props.cutoff / tot_x) * canvas.width)
         // : -(i / curveResolution) * ((props.cutoff / tot_x) * canvas.width));
        //let y = coeff* Math.pow(x - (props.cutoff / tot_x) * canvas.width, 1.7);
        //CHAT 1
        // let y = coeff * Math.pow((props.type === "lowpass" ? 1 : -1) * (x - (props.cutoff / tot_x) * canvas.width), 1.7);
        //let y = (canvas.height/2)-coeff * Math.pow(x - (props.cutoff / tot_x) * canvas.width, 1.7);
        //ctx.lineTo(x, y);
        //console.log("x:",x);
        //console.log("y;", y);
      //}

      ctx.stroke();
      //ctx.closePath();

    }
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
  justify-content: center;
  align-items: center;
  background-color: #bcb;
  margin: 0 0 0;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  align-self: center;
}
</style>
