<template>
  <div class="column full-height justify-center" >

    <div class="screen-container" ref="screenContainer">

        <canvas class="canvas" ref="visualizerCanvas"></canvas>
  <!--      <div class="screen">-->
  <!--        <div class="screen-frame"></div>-->

    <!--        <div class="screen-inset"></div>-->
    <!--      </div>-->
      </div>
    </div>

</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import * as Tone from "tone";
import AudioContextHandler from "@/components/AudioContextHandler.js";
import {getCssVar} from "quasar";

export default {
  name: "OscillatorCurve",
  props: ["color"],
  setup(props) {
    const visualizerCanvas = ref(null);

    const waveform = new Tone.Waveform()
    AudioContextHandler.outputGain.connect(waveform);
    //waveform.toDestination()
    const screenContainer = ref(null);

    const resizeHandler = () => {
      console.log("resizeHandler", screenContainer.value);
      if (screenContainer.value) {
        screenContainer.value.style.height = `${screenContainer.value.offsetWidth}px`;
      }
    };


    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler);
    });

    onMounted(() => {
      window.addEventListener('resize', resizeHandler);
      // Call the handler once to set the initial height
      resizeHandler();
      initializeAudio();
    });

    onUnmounted(() => {
      // Cleanup on component unmount
      cancelAnimationFrame(animationId);
    });

    let animationId;

    const draw = () => {
      if (waveform) {
        const canvas = visualizerCanvas.value;
        const canvasContext = canvas.getContext("2d");
        const wavedata = waveform.getValue();
        //console.log("waveform:", waveform); // Log the waveform data
        canvasContext.fillStyle = "black";
        canvasContext.shadowColor = "white";
        canvasContext.shadowBlur = 15;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = getCssVar(props.color)
          //getCssVar(props.color)
        canvasContext.beginPath();

        const sliceWidth = (canvas.width)/ (wavedata.length) ;
        let x = 0;
        let margin = canvas.height * 0.75;
        for (let i = 0; i < wavedata.length; i++) {
          const v = (wavedata[i] +1) / 2; // Normalize to [0, 1]
          const y = v * (canvas.height - margin) + margin / 2;          //console.log("v",v)
          if (i === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, (canvas.height *0.8) / 2);
        canvasContext.stroke();

        animationId = requestAnimationFrame(draw);
      }
    };

    const initializeAudio = () => {
      // Start the initial drawing
      draw();
    };

    return {
      visualizerCanvas,
      initializeAudio,
      screenContainer
    };
  },
};
</script>


<style lang="scss" scoped>
.canvas{
  width: 93%;
  height:93%;
  border-radius: 50%;
  align-self: center;
}

.screen-container {
  background-image: url("@/assets/images/metal.png");
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bcb;
  margin: 0 0 0;
  overflow: hidden;
  position: relative;
  width: 85%;
  height: 85%;
  border-radius: 50%;
  align-self: center;
}
//.screen, .screen-inset, .screen-frame, canvas, img {
//  position: absolute
//}
//.screen, .screen-inset {
//  top: 0;
//  left: 0;
//  width: 100%;
//  height: 100%;
//}
//.screen {
//  background-image:
//  //radial-gradient(1em at 70% 4%,#fff 4%,#fff0),
//  //radial-gradient(9em 1em at 7% 10%,#fff 30%,#fff0),
//  radial-gradient(100% 100% at 50% 50%,#0000 25%,#000 50%),
//  radial-gradient(100% 100% at 50% 50%,#0000 20%,#000 80%);
//}
//.screen-inset {
//  box-shadow: 0 -0.1em 0.1em 0.6em rgba(35, 34, 34, 0.42) inset;
//}
//.screen-frame {
  //border-top: 2em solid #7b807d;
  //border-right: 2em solid #9da28f;
  //border-bottom: 2em solid #b0b5a0;
//  border-left: 2em solid #8c917e;
//  border-radius: 3em;
//  box-shadow: 0 0.1em 0.2em 0.2em #0007 inset;
//  top: 50%;
//  left: 50%;
//  width: calc(110%);
//  height: calc(130%);
//  transform: translate(-50%,-50%);
//}
</style>
