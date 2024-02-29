<template>
    <div class="screen-container selector " ref="screenContainer">

        <canvas class="canvas selector " ref="visualizerCanvas"></canvas>
        <div class="screen shadow-4">
          <div class="screen-frame "></div>

            <div class="screen-inset"></div>
          </div>
      </div>

</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import * as Tone from "tone";
import {getCssVar} from "quasar";

export default {
  name: "OscillatorCurve",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    input: {
      type: Tone.Gain,
      required: true
    }
  },

  setup(props) {
    const visualizerCanvas = ref(null);

    const waveform = new Tone.Waveform(1024)
    props.input.connect(waveform);
    //waveform.toDestination()
    const screenContainer = ref(null);

    const resizeHandler = () => {

      if (screenContainer.value) {
        screenContainer.value.style.height = `${screenContainer.value.offsetWidth}px`;
      }
    };


    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler);
    });

    onMounted(() => {
      window.addEventListener('resize', resizeHandler);
      resizeHandler();
      initializeAudio();
    });

    onUnmounted(() => {
      cancelAnimationFrame(animationId);
    });

    let animationId;

    const draw = () => {
      if (waveform) {
        const canvas = visualizerCanvas.value;
        const canvasContext = canvas.getContext("2d");
        const wavedata = waveform.getValue();

        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = getCssVar("positive");
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.shadowColor = getCssVar("secondary");
        canvasContext.shadowBlur = 3;
        canvasContext.lineWidth = 2 ;

        const gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", getCssVar("secondary"));
        gradient.addColorStop("0.333", getCssVar("primary"));
        gradient.addColorStop("0.666",getCssVar("primary") );
        gradient.addColorStop("1",getCssVar("secondary") );

        canvasContext.strokeStyle = gradient;


        // Begin a new path for the line graph
        canvasContext.beginPath();
        canvasContext.moveTo(0, canvas.height);
        const sliceWidth = (canvas.width)/ (wavedata.length) ;
        let x = 0;
        let y = canvas.height/2;
        let margin = 0;
        canvasContext.lineTo(x, y);
        for (let i = 0; i < wavedata.length; i++) {
          const v = (wavedata[i] +1) / 2; // Normalize to [0, 1]
          y = v * (canvas.height - margin) + margin / 2;

          canvasContext.lineTo(x, y);

          x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, (canvas.height) / 2);
        canvasContext.lineTo(canvas.width, canvas.height);

        canvasContext.fillStyle = getCssVar("positive");
        canvasContext.fill();
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
  width: 94%;
  height:94%;
  border-radius: 50%;
  align-self: center;
  //background-color: $primary;
}

.selector {

  border: #030303 1px solid;


  /* your existing styles */

  /* Add multiple inset box shadows to create an inner "screen" effect */
  //box-shadow: inset 0 0 8px 1px var(--select-shadow-color),
  //inset 0 0 15px 1px var(--select-shadow-color), /* inner shadow */
  //0 0 0 2px inset var(--select-border-color); /* inner shadow */

  ///* Add a radial gradient to simulate inner light */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
      var(--select-color);
  justify-content: flex-end;
  align-items: center;
  color: var(--select--text-color-on);

}


.screen-container {
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: $r2d-container;
  margin: 0 0 0;
  overflow: hidden;
  position: relative;
  width: 85%;
  height: 85%;
  border-radius: 50%;
}
.screen, .screen-inset, .screen-frame, canvas, img {
  position: absolute
}
.screen, .screen-inset {
  top: 2%;
  left: 2%;
  width: 96%;
  height: 96%;
  border-radius: 50%;
}
.screen {
  background-image:
  radial-gradient(50% 5% at 50% 1%, rgba(255, 255, 255, 0.29) 0.5%,#fff0),
  radial-gradient(110% 65% at 60% 150%, rgba(255, 255, 255, 0.71) 1%,#fff0),
  radial-gradient(100% 100% at 50% 50%,#0000 25%,#000 50%),
  radial-gradient(100% 100% at 50% 50%,#0000 20%,#000 80%);
}
.screen-inset {
  box-shadow: 0 -0.1em 0.1em 0.6em rgba(35, 34, 34, 0.42) inset;
}
//.screen-frame {
//  border-top: 2em solid #7b807d;
//  border-right: 2em solid #9da28f;
//  border-bottom: 2em solid #b0b5a0;
//  border-left: 2em solid #8c917e;
//  border-radius: 3em;
//  box-shadow: 0 0.1em 0.2em 0.2em #0007 inset;
//  top: 50%;
//  left: 50%;
//  width: calc(110%);
//  height: calc(130%);
//  transform: translate(-50%,-50%);
//}aaaaaaaaaaaaafff
</style>
